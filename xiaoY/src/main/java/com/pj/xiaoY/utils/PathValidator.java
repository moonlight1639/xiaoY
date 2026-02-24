package com.pj.xiaoY.utils;

import java.io.File;
import java.nio.file.InvalidPathException;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

/**
 * 路径合法性判断工具类
 */
public class PathValidator {

    // 1. 修正：移除 / 和 \（分隔符不是非法字符），只保留真正的非法字符
    private static final List<Character> ILLEGAL_CHARS = Arrays.asList(
            '<', '>', ':', '"', '|', '?', '*', '\0'
    );

    // 2. 修正：只拦截路径穿越关键字（去掉 //、\\\\，避免误伤）
    private static final List<String> TRAVERSAL_KEYWORDS = Arrays.asList(
            "../", "..\\", "./", ".\\"
    );

    /**
     * 判断字符串是否为合法的路径（适配 MinIO 路径，支持 / 结尾）
     * @param path 待判断的路径（如 avator/、test/123/、avatar）
     * @return true=合法，false=非法
     */
    public static boolean isLegalPath(String path) {
        // 步骤1：空值校验
        if (path == null || path.trim().isEmpty()) {
            return false;
        }
        String cleanPath = path.trim();

        // 步骤2：非法字符校验（仅拦截真正的非法字符，放行 /、\）
        for (char c : cleanPath.toCharArray()) {
            if (ILLEGAL_CHARS.contains(c)) {
                return false;
            }
        }

        // 步骤3：路径格式化（统一分隔符、去重连续 /，避免 // 误判）
        String formatPath = cleanPath.replace("\\", "/") // 统一为 /
                .replaceAll("/+", "/"); // 去重连续 /（如 avator// → avator/）

        // 步骤4：路径穿越校验（只拦截 ../、..\、./、.\）
        String lowerPath = formatPath.toLowerCase();
        for (String keyword : TRAVERSAL_KEYWORDS) {
            if (lowerPath.contains(keyword)) {
                return false;
            }
        }

        // 步骤5：语法格式校验（Paths.get() 核心作用）
        try {
            // 对格式化后的路径做语法校验
            Paths.get(formatPath);
            return true;
        } catch (InvalidPathException e) {
            return false;
        }
    }

    /**
     * （可选）判断路径是否真实存在（适用于本地文件路径，MinIO路径无需此校验）
     * @param path 待判断的路径字符串
     * @return true=路径存在，false=路径不存在/非法
     */
    public static boolean isPathExists(String path) {
        if (!isLegalPath(path)) {
            return false;
        }
        File file = new File(path);
        // 判断是目录/文件且存在
        return file.exists() && (file.isDirectory() || file.isFile());
    }
}

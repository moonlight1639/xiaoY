package com.pj.xiaoY.utils;
import java.io.IOException;
import java.lang.reflect.Field;
import java.nio.file.*;
import java.util.*;

public class JavaToTsGenerator {

    private static final Map<Class<?>, String> TYPE_MAP = new HashMap<>();

    static {
        TYPE_MAP.put(Integer.class, "number");
        TYPE_MAP.put(int.class, "number");
        TYPE_MAP.put(Long.class, "number");
        TYPE_MAP.put(long.class, "number");
        TYPE_MAP.put(Double.class, "number");
        TYPE_MAP.put(double.class, "number");
        TYPE_MAP.put(Float.class, "number");
        TYPE_MAP.put(float.class, "number");
        TYPE_MAP.put(String.class, "string");
        TYPE_MAP.put(Boolean.class, "boolean");
        TYPE_MAP.put(boolean.class, "boolean");
        TYPE_MAP.put(java.util.Date.class, "string");
        TYPE_MAP.put(java.time.LocalDate.class, "string");
        TYPE_MAP.put(java.time.LocalDateTime.class, "string");
        TYPE_MAP.put(java.math.BigDecimal.class, "string");
        TYPE_MAP.put(java.math.BigInteger.class, "string");
    }

    /** 生成 TS type */
    public static String generateTsType(Class<?> clazz) {
        StringBuilder sb = new StringBuilder();
        sb.append("export interface ").append(clazz.getSimpleName()).append(" {\n");

        for (Field field : clazz.getDeclaredFields()) {
            String tsType = TYPE_MAP.getOrDefault(field.getType(), field.getType().getSimpleName());
            sb.append(" ")
                    .append(field.getName())
                    .append(": ")
                    .append(tsType)
                    .append(";\n");
        }

        sb.append("};\n");
        return sb.toString();
    }

    /** 写入指定目录 */
    public static void writeToDir(Class<?> clazz, String outputDir) {
        try {
            String tsCode = generateTsType(clazz);

            Path dir = Paths.get(outputDir);
            Files.createDirectories(dir); // 自动创建目录

            Path file = dir.resolve(clazz.getSimpleName() + ".ts");
            Files.write(file, tsCode.getBytes());

            System.out.println("✅ TS 文件已生成: " + file.toAbsolutePath());

        } catch (IOException e) {
            throw new RuntimeException("生成 TS 文件失败", e);
        }
    }
    public static void writeToProjectDir(Class<?> clazz) {
        try {
            String tsCode = generateTsType(clazz);

            Path outputDir = Paths.get(
                    System.getProperty("user.dir"),
                    "src", "main", "resources", "ts"
            );

            Files.createDirectories(outputDir);

            Path file = outputDir.resolve(clazz.getSimpleName() + ".ts");
            Files.write(
                    file,
                    tsCode.getBytes(),
                    StandardOpenOption.CREATE,
                    StandardOpenOption.TRUNCATE_EXISTING
            );

            System.out.println("✅ TS 已生成: " + file.toAbsolutePath());

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}

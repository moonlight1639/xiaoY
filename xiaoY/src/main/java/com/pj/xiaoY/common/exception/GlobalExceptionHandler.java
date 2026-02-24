package com.pj.xiaoY.common.exception;
import com.pj.xiaoY.common.Result;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


import java.sql.SQLIntegrityConstraintViolationException;

/**
 * 全局异常处理类
 * Global Exception Handler
 */
@Slf4j
@RestControllerAdvice // 全局捕获Controller层异常，返回JSON（用@ControllerAdvice则返回视图）
public class GlobalExceptionHandler {

    /**
     * 处理自定义业务异常（优先级最高）
     * Handle custom business exceptions (highest priority)
     */
    @ExceptionHandler(GlobalException.class)
    public Result handleBusinessException(GlobalException e, HttpServletRequest request) {
        // 打印异常日志（含请求URL）
        log.error("业务异常 | 请求URL：{} | 异常码：{} | 异常信息：{}",
                request.getRequestURI(), e.getCode(), e.getMessage());
        // 返回自定义异常码和消息
        return Result.fail(e.getCode() + e.getMessage());
    }

    /**
     * 处理参数校验异常（如@Valid注解校验失败）
     * Handle parameter validation exceptions (e.g. @Valid validation failed)
     */
    @ExceptionHandler({MethodArgumentNotValidException.class, BindException.class})
    public Result handleValidException(Exception e) {
        String msg;
        if (e instanceof MethodArgumentNotValidException) {
            // @RequestBody参数校验失败
            msg = ((MethodArgumentNotValidException) e).getBindingResult().getFieldError().getDefaultMessage();
        } else {
            // @RequestParam/@PathVariable参数校验失败
            msg = ((BindException) e).getBindingResult().getFieldError().getDefaultMessage();
        }
        log.error("参数校验异常 | 异常信息：{}", msg, e);
        return Result.fail(400 + "参数错误：" + msg);
    }

    /**
     * 处理404异常（需配置spring.mvc.throw-exception-if-no-handler-found=true）
     * Handle 404 not found exception
     */
//    @ExceptionHandler(NoHandlerFoundException.class)
//    public Result handle404Exception(NoHandlerFoundException e, HttpServletRequest request) {
//        log.error("404异常 | 请求URL：{} | 异常信息：{}", request.getRequestURI(), e.getMessage());
//        return Result.fail(404 +  "请求路径不存在：" + request.getRequestURI());
//    }

    /**
     * 处理JSON解析异常（如请求体格式错误）
     * Handle JSON parse exception (e.g. invalid request body format)
     */
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public Result handleJsonParseException(HttpMessageNotReadableException e) {
        log.error("JSON解析异常 | 异常信息：{}", e.getMessage(), e);
        return Result.fail(400 + "请求体格式错误：请检查JSON格式是否正确");
    }

    /**
     * 处理数据库异常（如唯一键冲突）
     * Handle database exception (e.g. unique key conflict)
     */
    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    public Result handleDbException(SQLIntegrityConstraintViolationException e) {
        log.error("数据库异常 | 异常信息：{}", e.getMessage(), e);
        return Result.fail(400 + "数据操作失败：" + e.getMessage().split(":")[2].trim());
    }

    /**
     * 处理所有未捕获的系统异常（兜底）
     * Handle all uncaught system exceptions (fallback)
     */
    @ExceptionHandler(Exception.class)
    public Result handleSystemException(Exception e, HttpServletRequest request) {
        // 打印完整异常栈（方便排查问题）
        log.error("系统异常 | 请求URL：{}", request.getRequestURI(), e);
        // 生产环境可返回友好提示，避免暴露敏感信息
        return Result.fail(500 + "系统繁忙，请稍后再试");
    }
}

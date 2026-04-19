package com.pj.xiaoY.controller;

import com.pj.xiaoY.common.Result;
import com.pj.xiaoY.entity.vectorDb.Namespace;
import com.pj.xiaoY.entity.vectorDb.vo.BathUpdateRecordsVo;
import com.pj.xiaoY.entity.vectorDb.vo.InsertVectorRecord;
import com.pj.xiaoY.service.VectorDbService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("xiaoY/vector-db")
@Tag(name = "向量数据库管理", description = "向量库命名空间、记录增删改查以及切割预览接口")
public class VectorDbController {
    @Autowired
    private VectorDbService vectorDbService;

    @PostMapping("/batch-insert-records")
    @Operation(summary = "批量插入记录", description = "批量插入向量记录到数据库和向量库")
    public Result batchInsertRecords(@RequestBody BathUpdateRecordsVo bathUpdateRecordsVo) {
        vectorDbService.batchInsertRecords(bathUpdateRecordsVo);
        return Result.ok();
    }

    @DeleteMapping("/batch-delete-records")
    @Operation(summary = "批量删除记录", description = "批量删除向量记录")
    public Result batchDeleteRecords(@RequestBody BathUpdateRecordsVo bathUpdateRecordsVo) {
        vectorDbService.bathDeleteRecords(bathUpdateRecordsVo);
        return Result.ok();
    }

    @PostMapping("/insert-record")
    @Operation(summary = "插入记录", description = "插入单条向量记录到数据库和向量库")
    public Result insertRecord(@RequestBody InsertVectorRecord vectorRecord) {
        vectorDbService.insertRecord(vectorRecord);
        return Result.ok();
    }

    @DeleteMapping("/delete-record")
    @Operation(summary = "删除记录", description = "根据记录 ID 删除向量记录")
    public Result deleteRecord(@Parameter(description = "记录ID") @RequestParam String id) {
        vectorDbService.deleteRecord(id);
        return Result.ok();
    }

    @PostMapping("/insert-namespace")
    @Operation(summary = "插入命名空间", description = "创建一个新的向量命名空间")
    public Result insertNamespace(@RequestBody Namespace namespace) {
        vectorDbService.insertNamespace(namespace);
        return Result.ok();
    }

    @DeleteMapping("/delete-namespace")
    @Operation(summary = "删除命名空间", description = "根据命名空间 ID 删除命名空间")
    public Result deleteNamespace(@Parameter(description = "命名空间ID") @RequestParam String id) {
        vectorDbService.deleteNamespace(id);
        return Result.ok();
    }

    @GetMapping("/get-records")
    @Operation(summary = "获取记录列表", description = "查询所有向量记录")
    public Result getRecords() {
        return Result.ok(vectorDbService.getRecords());
    }

    @GetMapping("/get-namespaces")
    @Operation(summary = "获取命名空间列表", description = "查询所有命名空间")
    public Result getNamespaces() {
        return Result.ok(vectorDbService.getNamespaces());
    }

    @PutMapping("/update-namespace")
    @Operation(summary = "更新命名空间", description = "更新命名空间信息")
    public Result updateNamespace(@RequestBody Namespace namespace) {
        vectorDbService.updateNamespace(namespace);
        return Result.ok();
    }

    @PostMapping("/split-preview")
    @Operation(summary = "切割预览", description = "根据 isSplit 参数预览文本切割结果；0 不切割，1 递归带重叠切割")
    public Result splitPreview(@RequestBody InsertVectorRecord vectorRecord) {
        return Result.ok(vectorDbService.splitPreview(vectorRecord));
    }
}

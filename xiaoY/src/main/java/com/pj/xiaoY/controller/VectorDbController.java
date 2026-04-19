package com.pj.xiaoY.controller;

import com.pj.xiaoY.common.Result;
import com.pj.xiaoY.entity.vectorDb.Namespace;
import com.pj.xiaoY.entity.vectorDb.vo.BathUpdateRecordsVo;
import com.pj.xiaoY.service.VectorDbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.pj.xiaoY.entity.vectorDb.VectorRecord;
@RestController
@RequestMapping("xiaoY/vector-db")
public class VectorDbController {
    @Autowired
    private VectorDbService vectorDbService;

    @PostMapping("/batch-insert-records")
    public Result batchInsertRecords(@RequestBody BathUpdateRecordsVo bathUpdateRecordsVo) {
        vectorDbService.batchInsertRecords(bathUpdateRecordsVo);
        return Result.ok();
    }
    @DeleteMapping("/batch-delete-records")
    public Result batchDeleteRecords(@RequestBody BathUpdateRecordsVo bathUpdateRecordsVo) {
        vectorDbService.bathDeleteRecords(bathUpdateRecordsVo);
        return Result.ok();
    }
    @PostMapping("/insert-record")
    public Result insertRecord(@RequestBody VectorRecord vectorRecord) {
        vectorDbService.insertRecord(vectorRecord);
        return Result.ok();
    }
    @DeleteMapping("/delete-record")
    public Result deleteRecord(@RequestParam String id) {
        vectorDbService.deleteRecord(id);
        return Result.ok();
    }
    @PostMapping("/insert-namespace")
    public Result insertNamespace(@RequestBody Namespace namespace) {
        vectorDbService.insertNamespace(namespace);
        return Result.ok();
    }
    @DeleteMapping("/delete-namespace")
    public Result deleteNamespace(@RequestParam String id) {
        vectorDbService.deleteNamespace(id);
        return Result.ok();
    }

    @GetMapping("/get-records")
    public Result getRecords() {
        return Result.ok(vectorDbService.getRecords());
    }

    @GetMapping("/get-namespaces")
    public Result getNamespaces() {
        return Result.ok(vectorDbService.getNamespaces());
    }

    @PutMapping("/update-namespace")
    public Result updateNamespace(@RequestBody Namespace namespace) {
        vectorDbService.updateNamespace(namespace);
        return Result.ok();
    }
}

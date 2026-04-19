package com.pj.xiaoY.service;

import com.pj.xiaoY.entity.vectorDb.Namespace;
import com.pj.xiaoY.entity.vectorDb.vo.BathUpdateRecordsVo;
import com.pj.xiaoY.entity.vectorDb.VectorRecord;
import com.pj.xiaoY.entity.vectorDb.vo.InsertVectorRecord;

import java.util.List;

public interface VectorDbService {
    void insertNamespace(Namespace namespace);

    void deleteNamespace(String id);

    void deleteRecord(String id);

    void insertRecord(VectorRecord vectorRecord);

    void bathDeleteRecords(BathUpdateRecordsVo bathUpdateRecordsVo);

    void batchInsertRecords(BathUpdateRecordsVo bathUpdateRecordsVo);

    List<VectorRecord> getRecords();

    List<Namespace> getNamespaces();

    void updateNamespace(Namespace namespace);

    List<VectorRecord> splitPreview(InsertVectorRecord vectorRecord);

    void insertRecords(List<VectorRecord> vectorRecords);
}

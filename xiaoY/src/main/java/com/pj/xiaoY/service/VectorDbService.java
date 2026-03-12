package com.pj.xiaoY.service;

import com.pj.xiaoY.entity.vectorDb.Namespace;
import com.pj.xiaoY.entity.vectorDb.vo.BathUpdateRecordsVo;
import com.pj.xiaoY.entity.vectorDb.VectorRecord;

public interface VectorDbService {
    void insertNamespace(Namespace namespace);

    void deleteNamespace(Namespace namespace);

    void deleteRecord(VectorRecord vectorRecord);

    void insertRecord(VectorRecord vectorRecord);

    void bathDeleteRecords(BathUpdateRecordsVo bathUpdateRecordsVo);

    void batchInsertRecords(BathUpdateRecordsVo bathUpdateRecordsVo);
}

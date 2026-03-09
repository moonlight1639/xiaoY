package com.pj.xiaoY;

import dev.langchain4j.data.document.Document;
import dev.langchain4j.data.document.loader.FileSystemDocumentLoader;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UpLaodRulesTest {
    @Test
    public void test1() {
        String filename = "C:\\Users\\zzxcl\\Pictures\\素材\\科大小y\\我的科大\\中科大新生指北.pdf";
        System.out.println(filename);
        Document document = FileSystemDocumentLoader.loadDocument(filename);
        System.out.println(document.text());

    }
}

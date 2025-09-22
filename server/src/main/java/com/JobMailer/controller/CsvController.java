package com.JobMailer.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.JobMailer.Request.Recipient;
import com.JobMailer.service.CsvService;
import com.JobMailer.service.ResumeStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/resume")
@CrossOrigin(origins = "*") // 👈 Allow frontend
public class CsvController {


    private static final Logger log = LoggerFactory.getLogger(CsvController.class);
    private Recipient recipient;
    @Autowired
    private CsvService service;
//    sealed
    @Autowired
    private ResumeStorageService storageService;
    @PostMapping("/csv-upload")
    public ResponseEntity<List<Recipient>> CsvUpload(@RequestParam("file")MultipartFile file) throws Exception {
        storageService.setRecipients(service.parseCsv(file));
        List<Recipient> rc = new ArrayList<>();
        rc = storageService.getRecipients();
//        log.info(String.valueOf(rc));
        List<Recipient> response = storageService.getRecipients();
        return ResponseEntity.ok(response);
    }
}

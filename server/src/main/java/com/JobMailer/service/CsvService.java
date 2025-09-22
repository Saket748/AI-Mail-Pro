package com.JobMailer.service;

import com.JobMailer.Request.Recipient;
import com.opencsv.CSVReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;



@Service
public class CsvService {

    @Autowired
    private ResumeStorageService resumeStorageService;

    private static final Logger log = LoggerFactory.getLogger(CsvService.class);

    public List<Recipient> parseCsv(MultipartFile file) throws Exception {
        List<Recipient> recipients = new ArrayList<>();
//        log.info(recipients.toString());

        try (Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()));
             CSVReader csvReader = new CSVReader(reader)) {

            String[] nextLine;
            while ((nextLine = csvReader.readNext()) != null) {
                if (nextLine.length < 2) continue; // Expecting: Name, Email
                recipients.add(new Recipient(nextLine[0], nextLine[1]));
            }
        }
        resumeStorageService.setRecipients(recipients);
//        log.info(recipients.toString());

        List<Recipient> recipients1 = new ArrayList<>();

        return recipients;
    }
}

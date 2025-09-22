package com.JobMailer.controller;

import com.JobMailer.Request.BulkResponse;
import com.JobMailer.Request.EmailSendRequest;
import com.JobMailer.Request.Recipient;
import com.JobMailer.service.BulkMailService;
import com.JobMailer.service.CsvService;
import com.JobMailer.service.ResumeStorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/resume")
@CrossOrigin(origins = "*") // 👈 Allow frontend
public class BulkController {
    private static final Logger log = LoggerFactory.getLogger(BulkController.class);

    @Autowired
    private BulkMailService bulkMailService;

    @Autowired
    private ResumeStorageService storageService;

    EmailSendRequest emailSendRequest;
    @GetMapping("/send-bulk")
    public ResponseEntity<BulkResponse> sendBulkEmails() {
        try {
            // Corrected line: Get the list of recipients
            List<Recipient> recipients = storageService.getRecipients();
            log.info(storageService.getSaveEmailReply());
            // The log will now print because the line before it won't crash
            log.info("Successfully retrieved a list of {} recipients.", recipients.size());

            // Check if the list is empty before proceeding
            if (recipients.isEmpty()) {
                log.warn("Recipient list is empty. No emails will be sent.");
                return ResponseEntity.ok(new BulkResponse(Collections.emptyList()));
            }
            BulkResponse response = bulkMailService.sendBulk(recipients, "HIIIIIIIIIII", storageService.getSaveEmailReply() );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // This is a much better way to log the error to find out the real issue.
            log.error("An error occurred while sending bulk emails.", e);
            return ResponseEntity.internalServerError().build();
        }
    }
}
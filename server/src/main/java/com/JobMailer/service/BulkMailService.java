package com.JobMailer.service;

import com.JobMailer.Request.BulkResponse;
import com.JobMailer.Request.EmailSendRequest;
import com.JobMailer.Request.Recipient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class BulkMailService {

    @Autowired
    private ResumeStorageService storageService;
    @Autowired
    private EmailSendingService emailSendingService;

    private EmailSendRequest emailSendRequest;
    public BulkResponse sendBulk(List<Recipient> recipients, String subject, String body) {
        List<String> sent = new ArrayList<>();
        List<String> failed = new ArrayList<>();

        byte[] resumeFile = storageService.getLastResumeFileBytes();
        if (resumeFile == null) {
            // Instead of throwing 500, mark all emails as failed
            failed.addAll(recipients.stream().map(Recipient::getEmail).toList());
            BulkResponse response = new BulkResponse();
            response.setSent(sent);
            response.setFailed(failed);
            return response;
        }

        for (Recipient recipient : recipients) {
            try {
                String personalizedBody = body.replace("{name}", recipient.getName());
                emailSendingService.sendEmailWithAttachment(
                        recipient.getEmail(),
                        subject,
                        personalizedBody,
                        resumeFile
                );
                sent.add(recipient.getEmail());
            } catch (Exception e) {
                failed.add(recipient.getEmail());
            }
        }

        BulkResponse response = new BulkResponse();
        response.setSent(sent);
        response.setFailed(failed);
        return response;
    }

}

package com.JobMailer.service;

import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class EmailSendingService {
    private static final Logger log = LoggerFactory.getLogger(EmailSendingService.class);

    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private ResumeStorageService storageService;
    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendEmailWithAttachment(String to, String subject, String body, byte[] file) throws Exception {
        log.info("Preparing to send email to {} with subject: {}", to, subject);

        byte[] file1 = storageService.getLastResumeFileBytes();
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        String fileName = storageService.getLastResumeFileName();
        if (file1 != null) {
            log.debug("Adding attachment to the email. File name: {}", fileName);
            helper.addAttachment(Objects.requireNonNull(fileName), new ByteArrayResource(file1));
        } else {
            log.warn("No valid resume file provided. Sending email without an attachment.");
        }
        helper.setFrom(fromEmail);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(body);
//        helper.addAttachment(Objects.requireNonNull(fileName), new ByteArrayResource(file1.getBytes()));
        mailSender.send(message);
        log.info("Email successfully sent to {}.", to);
    }

}
package com.JobMailer.controller;

import com.JobMailer.Request.EmailSendRequest;
import com.JobMailer.service.ResumeService;
import com.JobMailer.service.ResumeStorageService;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/resume")
@CrossOrigin(origins = "*") // 👈 Allow frontend
public class ResumeController {

    @Autowired
    private ResumeService resumeService;
    @Autowired
    private ResumeStorageService storageService;

    private EmailSendRequest emailSendRequest;
    @PostMapping("/upload")
    public ResponseEntity<String> uploadResume(@RequestParam("file") MultipartFile file) {
        try {
            String cleanedText = resumeService.extractResumeText(file);
//            emailSendRequest.setFile(file);
            storageService.saveResume(cleanedText);
            storageService.setLastResumeFileName(file.getOriginalFilename());
            storageService.setLastResumeFile(file.getBytes(), file.getOriginalFilename());
            return ResponseEntity.ok(cleanedText);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error reading file: " + e.getMessage());
        }

    }
}

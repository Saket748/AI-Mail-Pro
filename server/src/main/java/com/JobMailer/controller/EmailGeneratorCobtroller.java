package com.JobMailer.controller;

import com.JobMailer.Request.EmailRequest;
import com.JobMailer.service.EmailGeneratorService;
import com.JobMailer.service.ResumeStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/resume")
@CrossOrigin(origins = "*") // 👈 Allow frontend
public class EmailGeneratorCobtroller {

    @Autowired
    private EmailGeneratorService emailGeneratorService;
    @Autowired
    private ResumeStorageService storageService;

    @PostMapping("/generate-mail")
    public ResponseEntity<String> generateEmail(){
        String resumeText = storageService.getResume();

        EmailRequest request = new EmailRequest();

        request.setResumeText(resumeText);

        request.setKeyword("Proffesional");

        if (resumeText == null) {
            return ResponseEntity.badRequest().body("No resume uploaded yet!");
        }

        String response = emailGeneratorService.genrateEmailReply(request,1);
        storageService.setSaveEmailReply(response);// just to store our latest email reply
        return ResponseEntity.ok(response);
    }

    @PostMapping("/generate-ATS")
    public ResponseEntity<String> generateEmailATsScore(){
        String resumeText = storageService.getResume();

        EmailRequest request = new EmailRequest();

        request.setResumeText(resumeText);

        request.setKeyword("Proffesional");

        if (resumeText == null) {
            return ResponseEntity.badRequest().body("No resume uploaded yet!");
        }

        String response = emailGeneratorService.genrateEmailReply(request,0);
        return ResponseEntity.ok(response);
    }


    @PostMapping("/update-mail")
    public ResponseEntity<String> updateEmail(@RequestBody String editedEmail) {
        if (editedEmail == null || editedEmail.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Edited email is empty!");
        }

        storageService.setSaveEmailReply(editedEmail); // overwrite stored email
        return ResponseEntity.ok("Email updated successfully!");
    }

}

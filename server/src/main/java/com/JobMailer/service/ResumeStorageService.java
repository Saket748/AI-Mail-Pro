package com.JobMailer.service;

import com.JobMailer.Request.Recipient;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
public class ResumeStorageService {
    private String lastResumeText;
    private String SaveEmailReply;
    private List<Recipient> recipients = new ArrayList<>();
    private byte[] lastResumeFileBytes;
    private String lastResumeFileName;


    public String getLastResumeFileName() {
        return lastResumeFileName;
    }

    public void setLastResumeFileName(String lastResumeFileName) {
        this.lastResumeFileName = lastResumeFileName;
    }

    // store file as byte[]
    public List<Recipient> getRecipients() {
        return recipients;
    }

    public void setRecipients(List<Recipient> recipients) {
        this.recipients = recipients;
    }

    public void setLastResumeFile(byte[] fileBytes, String fileName) {
        this.lastResumeFileBytes = fileBytes;
        this.lastResumeFileName = fileName;
    }

    public byte[] getLastResumeFileBytes() {
        return lastResumeFileBytes;
    }

    public String getSaveEmailReply() {
        return SaveEmailReply;
    }

    public void setSaveEmailReply(String saveEmailReply) {
        SaveEmailReply = saveEmailReply;
    }

    public void saveResume(String text) {
        this.lastResumeText = text;
    }
    public String getResume() {
        return lastResumeText;
    }
}

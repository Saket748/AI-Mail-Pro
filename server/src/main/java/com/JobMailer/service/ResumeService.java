package com.JobMailer.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.stream.Collectors;

@Service
public class ResumeService {

    public String extractResumeText(MultipartFile file) throws IOException {
        String extractedText = "";

        if (file.getOriginalFilename().endsWith(".pdf")) {
            try (PDDocument document = PDDocument.load(file.getInputStream())) {
                PDFTextStripper stripper = new PDFTextStripper();
                extractedText = stripper.getText(document);
            }
        } else if (file.getOriginalFilename().endsWith(".docx")) {
            try (XWPFDocument doc = new XWPFDocument(file.getInputStream())) {
                extractedText = doc.getParagraphs().stream()
                        .map(XWPFParagraph::getText)
                        .collect(Collectors.joining("\n"));
            }
        } else {
            throw new IllegalArgumentException("Unsupported file format. Please upload PDF or DOCX.");
        }

        // Clean and format extracted text
        return extractedText
                .replaceAll("\\s+", " ")   // collapse multiple spaces
                .replaceAll("\n+", "\n")   // collapse multiple newlines
                .trim();
    }
}
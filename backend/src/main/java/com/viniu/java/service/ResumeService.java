package com.viniu.backend.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ResumeService {

    public String analyzeResume(MultipartFile file) throws IOException {

        // Load PDF
        PDDocument document = PDDocument.load(file.getInputStream());

        // Extract text from PDF
        PDFTextStripper pdfStripper = new PDFTextStripper();

        String text = pdfStripper.getText(document);

        document.close();

        // Convert text to lowercase
        text = text.toLowerCase();

        // Dynamic skills detection
        List<String> skills = new ArrayList<>();

        String[] knownSkills = {
                "java",
                "python",
                "spring",
                "spring boot",
                "mysql",
                "docker",
                "kubernetes",
                "aws",
                "react",
                "javascript",
                "html",
                "css",
                "nodejs",
                "mongodb",
                "git",
                "github",
                "terraform",
                "jenkins",
                "linux",
                "c",
                "c++",
                "typescript",
                "angular",
                "firebase",
                "azure",
                "machine learning",
                "ai",
                "data structures",
                "sql"
        };

        int score = 50;

        for (String skill : knownSkills) {

            if (text.contains(skill.toLowerCase())) {

                skills.add(skill);

                score += 3;
            }
        }

        // Max score limit
        if (score > 100) {
            score = 100;
        }

        // Build Result
        StringBuilder result = new StringBuilder();

        result.append("Resume Analyzed Successfully\n\n");

        result.append("ATS Score: ")
                .append(score)
                .append("%\n\n");

        result.append("Skills Found:\n");

        if (skills.isEmpty()) {

            result.append("- No matching skills detected\n");

        } else {

            for (String skill : skills) {

                result.append("- ")
                        .append(skill.toUpperCase())
                        .append("\n");
            }
        }

        // Suggestions
        result.append("\nSuggestions:\n");

        if (score < 70) {
            result.append("- Add more technical skills\n");
        }

        if (!text.contains("project")) {
            result.append("- Add projects section\n");
        }

        if (!text.contains("certification")) {
            result.append("- Add certifications\n");
        }

        if (!text.contains("internship")) {
            result.append("- Add internship experience\n");
        }

        result.append("- Improve project descriptions\n");

        return result.toString();
    }
}
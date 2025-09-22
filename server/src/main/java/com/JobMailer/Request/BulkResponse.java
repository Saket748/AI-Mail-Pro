package com.JobMailer.Request;

import java.util.List;

public class BulkResponse {
    private List<String> sent;
    private List<String> failed;

    public BulkResponse() {
    }

    public BulkResponse(List<Object> objects) {
    }

    public List<String> getSent() {
        return sent;
    }

    public void setSent(List<String> sent) {
        this.sent = sent;
    }

    public List<String> getFailed() {
        return failed;
    }

    public void setFailed(List<String> failed) {
        this.failed = failed;
    }
}

package com.datamannen1013.javachattapp.server.database.models;

import java.sql.Timestamp;

public record Message(String id, String content, String sender, Timestamp timestamp) {

    // Builder pattern for more flexible construction
    public static class Builder {
        private String id;
        private String content;
        private String sender;
        private Timestamp timestamp;

        public Builder id(String id) {
            this.id = id;
            return this;
        }

        public Builder content(String content) {
            this.content = content;
            return this;
        }

        public Builder sender(String sender) {
            this.sender = sender;
            return this;
        }

        public Builder timestamp(Timestamp timestamp) {
            this.timestamp = timestamp;
            return this;
        }

        public Message build() {
            return new Message(id, content, sender, timestamp);
        }
    }
}

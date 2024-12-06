package com.datamannen1013.javachattapp.server.logger;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.logging.LogRecord;
import java.util.logging.SimpleFormatter;

/**
 * Custom formatter for log messages that extends SimpleFormatter.
 * Formats log entries with timestamp, log level, and message.
 */
public class CustomLogFormatter extends SimpleFormatter {

    /** Format pattern for the timestamp in log messages */
    private static final DateTimeFormatter DATE_FORMAT =
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");


    /**
     * Formats a log record into a standardized string format.
     * @param fRecord The log record to be formatted
     * @return A formatted string in the format: [timestamp] [level] message
     */
    @Override
    public String format(LogRecord fRecord) {
        LocalDateTime now = LocalDateTime.now();
        return String.format("[%s] [%s] %s%n",
                now.format(DATE_FORMAT),
                fRecord.getLevel(),
                fRecord.getMessage()
        );
    }
}

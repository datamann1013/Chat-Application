package com.datamannen1013.javachattapp.server;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.logging.*;

public class ServerLogger {
    private static final Logger logger = Logger.getLogger(ServerLogger.class.getName());
    private static FileHandler fileHandler;
    private static final DateTimeFormatter dateFormat =
            DateTimeFormatter.ofPattern("yyyy-MM-dd_HH-mm-ss");

    public static void setupLogger() {
        try {
            // Create logs directory if it doesn't exist
            File logsDir = new File("logs");
            if (!logsDir.exists()) {
                logsDir.mkdir();
            }

            // Create log file with timestamp
            String logFileName = String.format("logs/chat_log_%s.txt",
                    LocalDateTime.now().format(dateFormat));

            // Configure FileHandler
            fileHandler = new FileHandler(logFileName, true);

            // Create custom formatter
            SimpleFormatter formatter = new SimpleFormatter() {
                @Override
                public String format(LogRecord fRecord) {
                    LocalDateTime now = LocalDateTime.now();
                    return String.format("[%s] [%s] %s%n",
                            now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")),
                            fRecord.getLevel(),
                            fRecord.getMessage()
                    );
                }
            };

            fileHandler.setFormatter(formatter);

            // Remove existing handlers and add file handler
            logger.setUseParentHandlers(false);
            logger.addHandler(fileHandler);

            // Set logging level
            logger.setLevel(Level.ALL);

            logger.info("Logger initialized successfully");

        } catch (IOException e) {
            logError("Failed to initialize logger: " + e.getMessage(), e);

            System.err.println("Failed to initialize logger: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public static void logError(String error, Throwable throwable) {
        logger.log(Level.SEVERE, error, throwable);
    }

    public static void logInfo(String info) {
        logger.info(info);
    }

    public static void logWarning(String warning) {
        logger.warning(warning);
    }

    public static void close() {
        if (fileHandler != null) {
            fileHandler.close();
        }
    }
}
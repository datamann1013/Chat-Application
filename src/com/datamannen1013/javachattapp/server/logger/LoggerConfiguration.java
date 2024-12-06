package com.datamannen1013.javachattapp.server.logger;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.logging.FileHandler;

/**
 * Handles the configuration and setup of the logging system.
 * Responsible for creating log directories, files, and configuring the FileHandler.
 */
public class LoggerConfiguration {

    /** Format pattern for log file names */
    private static final DateTimeFormatter FILE_NAME_FORMAT =
            DateTimeFormatter.ofPattern("yyyy-MM-dd_HH-mm-ss");

    /** Directory where log files will be stored */
    private static final String LOG_DIRECTORY = "logs";

    /** Pattern for log file names */
    private static final String LOG_FILE_PATTERN = "logs/server_log_%s.txt";


    /** FileHandler instance for managing log files */
    private final FileHandler fileHandler;

    /**
     * Initializes the logging configuration.
     * Creates necessary directories and configures the FileHandler.
     * @throws IOException If there are issues with file operations
     */
    public LoggerConfiguration() throws IOException {
        createLogDirectory();
        this.fileHandler = createFileHandler();
        configureFileHandler();
    }

    /**
     * Creates the logs directory if it doesn't exist.
     */
    private void createLogDirectory() {
        File logsDir = new File(LOG_DIRECTORY);
        if (!logsDir.exists()) {
            logsDir.mkdir();
        }
    }

    /**
     * Creates a new FileHandler with a timestamp-based filename.
     * @return Configured FileHandler instance
     * @throws IOException If the file cannot be created
     */
    private FileHandler createFileHandler() throws IOException {
        String logFileName = String.format(LOG_FILE_PATTERN,
                LocalDateTime.now().format(FILE_NAME_FORMAT));
        return new FileHandler(logFileName, true);
    }

    /**
     * Configures the FileHandler with the custom formatter.
     */
    private void configureFileHandler() {
        fileHandler.setFormatter(new CustomLogFormatter());
    }

    /**
     * Gets the configured FileHandler instance.
     * @return The configured FileHandler
     */
    public FileHandler getFileHandler() {
        return fileHandler;
    }
}

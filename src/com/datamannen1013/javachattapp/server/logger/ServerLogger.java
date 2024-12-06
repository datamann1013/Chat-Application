package com.datamannen1013.javachattapp.server.logger;

import java.io.IOException;
import java.util.logging.*;

/**
 * Main logging utility class that provides static methods for logging at different levels.
 * This class serves as the primary interface for logging operations throughout the application.
 */
public class ServerLogger {

    /** The core logger instance */
    private static final Logger logger = Logger.getLogger(ServerLogger.class.getName());

    /** FileHandler for managing log files */
    private static FileHandler fileHandler;

    /**
     * Private constructor to prevent instantiation as this is a utility class.
     */
    private ServerLogger() {}

    /**
     * Initializes the logging system.
     * Sets up the logger with appropriate handlers and configuration.
     */
    public static void setupLogger() {
        try {
            LoggerConfiguration config = new LoggerConfiguration();
            fileHandler = config.getFileHandler();

            configureLogger();
            logger.info("Logger initialized successfully");
        } catch (IOException e) {
            handleSetupError(e);
        }
    }

    /**
     * Configures the logger with specific settings.
     * Disables parent handlers, adds file handler, and sets logging level.
     */
    private static void configureLogger() {
        logger.setUseParentHandlers(false);
        logger.addHandler(fileHandler);
        logger.setLevel(Level.ALL);
    }

    /**
     * Handles errors that occur during logger setup.
     * @param e The IOException that occurred during setup
     */
    private static void handleSetupError(IOException e) {
        String errorMessage = "Failed to initialize logger: " + e.getMessage();
        logError(errorMessage, e);
        System.err.println(errorMessage);
        e.printStackTrace();
    }

    /**
     * Logs an error message with an associated throwable.
     * @param error The error message to log
     * @param throwable The associated exception or error
     */
    public static void logError(String error, Throwable throwable) {
        logger.log(Level.SEVERE, error, throwable);
    }

    /**
     * Logs an informational message.
     * @param info The information message to log
     */
    public static void logInfo(String info) {
        logger.info(info);
    }

    /**
     * Logs a warning message.
     * @param warning The warning message to log
     */
    public static void logWarning(String warning) {
        logger.warning(warning);
    }

    /**
     * Closes the FileHandler and releases resources.
     * Should be called when the application is shutting down.
     */
    public static void close() {
        if (fileHandler != null) {
            fileHandler.close();
        }
    }
}
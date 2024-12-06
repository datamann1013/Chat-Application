package com.datamannen1013.javachattapp.server.database;

import com.datamannen1013.javachattapp.server.constants.ServerConstants;

public class DatabaseConfig {
    private static final String DB_URL = ServerConstants.DATABASE_URL;
    private static final String JDBC_DRIVER = "org.sqlite.JDBC";

    public static String getDbUrl() {
        return DB_URL;
    }

    public static String getJdbcDriver() {
        return JDBC_DRIVER;
    }
}

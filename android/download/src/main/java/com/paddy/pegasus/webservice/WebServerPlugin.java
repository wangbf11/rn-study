package com.paddy.pegasus.webservice;

import java.io.File;
import java.util.Map;

/**
 * @author wbf
 */
public interface WebServerPlugin {

    boolean canServeUri(String uri, File rootDir);

    void initialize(Map<String, String> commandLineOptions);

    NanoHTTPD.Response serveFile(String uri, Map<String, String> headers, NanoHTTPD.IHTTPSession session, File file, String mimeType);
}

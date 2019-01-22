package com.paddy.pegasus.webservice;

import java.io.ByteArrayInputStream;
import java.util.Map;


/**
 * @author Paul S. Hawke (paul.hawke@gmail.com) On: 9/15/13 at 2:52 PM
 */
public class InternalRewrite extends NanoHTTPD.Response {

    private final String uri;

    private final Map<String, String> headers;

    public InternalRewrite(Map<String, String> headers, String uri) {
        super(Status.OK, NanoHTTPD.MIME_HTML, new ByteArrayInputStream(new byte[0]), 0);
        this.headers = headers;
        this.uri = uri;
    }

    public Map<String, String> getHeaders() {
        return this.headers;
    }

    public String getUri() {
        return this.uri;
    }
}

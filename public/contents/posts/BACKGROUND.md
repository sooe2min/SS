---
title: 물음표 살인마 (BACKGROUND)
date: 2020-09-28
tags: JavaScript, XSS, CSRF, CORS
---

---

왜? 질문이 시작이다.

---

## [Cross-site scripting (XSS)](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)

Cross-site scripting (XSS) is a security exploit which allows an attacker to inject into a website malicious client-side code. This code is executed by the victims and lets the attackers bypass access controls and impersonate users.

These attacks succeed if the Web app does not employ enough validation or encoding. The user's browser cannot detect the malicious script is untrustworthy, and so gives it access to any cookies, session tokens, or other sensitive site-specific information, or lets the malicious script rewrite the HTML content.

The malicious content often includes JavaScript but sometimes HTML, Flash, or any other code the browser can execute. The variety of attacks based on XSS is almost limitless, but they commonly include transmitting private data like cookies or other session information to the attacker, redirecting the victim to a webpage controlled by the attacker, or performing other malicious operations on the user's machine under the guise of the vulnerable site.

### XSS Prevention Rules

- RULE #0 - Never Insert Untrusted Data Except in Allowed Locations[¶](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html#rule-0-never-insert-untrusted-data-except-in-allowed-locations)
- RULE #1 - HTML Encode Before Inserting Untrusted Data into HTML Element Content[¶](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html#rule-1-html-encode-before-inserting-untrusted-data-into-html-element-content)
- RULE #2 - Attribute Encode Before Inserting Untrusted Data into HTML Common Attributes[¶](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html#rule-2-attribute-encode-before-inserting-untrusted-data-into-html-common-attributes)

## [Cross-site request forgery (CSRF)](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)

Cross-Site Request Forgery (CSRF) is a type of attack that occurs when a malicious web site, email, blog, instant message, or program causes a user's web browser to perform an unwanted action on a trusted site when the user is authenticated. A CSRF attack works because browser requests automatically include all cookies including session cookies. Therefore, if the user is authenticated to the site, the site cannot distinguish between legitimate requests and forged requests.

In short, the following principles should be followed to defend against CSRF:

- Check if your framework has [built-in CSRF protection](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#use-built-in-or-existing-csrf-implementations-for-csrf-protection) and use it
  - **If framework does not have built-in CSRF protection add [CSRF tokens](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#token-based-mitigation) to all state changing requests (requests that cause actions on the site) and validate them on backend**
- Implement at least one mitigation from [Defense in Depth Mitigations](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#defense-in-depth-techniques) section
  - **[Use custom request headers](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#use-of-custom-request-headers)**
  - **[Verify the origin with standard headers](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#verifying-origin-with-standard-headers)**
  - **[Use double submit cookies](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#double-submit-cookie)**
- Remember that any Cross-Site Scripting (XSS) can be used to defeat all CSRF mitigation techniques!
  - **See the OWASP [XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html) for detailed guidance on how to prevent XSS flaws.**
- Do not use GET requests for state changing operations.
  - **If for any reason you do it, you have to also protect those resources against CSRF**

## Cross-Origin Resource Sharing (CORS)

**Cross-Origin Resource Sharing** (CORS) is a mechanism that uses additional HTTP headers to tell browsers to give a web application running at one origin, access to selected resources from a different origin. A web application executes a cross-origin HTTP request when it requests a resource that has a different origin (domain, protocol, or port) from its own.

For security reasons, browsers restrict cross-origin HTTP requests initiated from scripts. For example, `XMLHttpRequest` and the `Fetch API` follow the [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy). This means that a web application using those APIs can only request resources from the same origin the application was loaded from unless the response from other origins includes the right CORS headers.

The CORS mechanism supports secure cross-origin requests and data transfers between browsers and servers. Modern browsers use CORS in APIs such as `XMLHttpRequest` or `Fetch` to mitigate the risks of cross-origin HTTP requests.

### Functional overview

The Cross-Origin Resource Sharing standard works by adding new [HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) that let servers describe which origins are permitted to read that information from a web browser. Additionally, for HTTP request methods that can cause side-effects on server data (in particular, HTTP methods other than [`GET`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET), or [`POST`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) with certain MIME types), the specification mandates that browsers "preflight" the request, soliciting supported methods from the server with the HTTP [`OPTIONS`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS) request method, and then, upon "approval" from the server, sending the actual request. Servers can also inform clients whether "credentials" (such as [Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) and [HTTP Authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)) should be sent with requests.

### Examples of access control scenarios

**Simple requests**

Some requests don’t trigger a `CORS preflight`.

**Preflighted requests**

Unlike “simple requests” (discussed above), "preflighted" requests first send an HTTP request by the `OPTIONS` method to the resource on the other domain, to determine if the actual request is safe to send. Cross-site requests are preflighted like this since they may have implications to user data.

**Requests with credentials**

The most interesting capability exposed by both `XMLHttpRequest` or `Fetch` and CORS is the ability to make "credentialed" requests that are aware of HTTP cookies and HTTP Authentication information. By default, in cross-site `XMLHttpRequest` or `Fetch` invocations, browsers will **not** send credentials. A specific flag has to be set on the `XMLHttpRequest` object or the `Request` constructor when it is invoked.

By default, the invocation is made without Cookies. Since this is a simple `GET` request, it is not preflighted, but the browser will **reject** any response that does not have the `Access-Control-Allow-Credentials: true` header, and **not** make the response available to the invoking web content.

When responding to a credentialed request, the server **must** specify an origin in the value of the `Access-Control-Allow-Origin` header, instead of specifying the "`*`" wildcard.

### The HTTP response headers

**Access-Control-Allow-Origin**

`Access-Control-Allow-Origin` specifies either a single origin, which tells browsers to allow that origin to access the resource; or else — for requests **without** credentials — the "`*`" wildcard, to tell browsers to allow any origin to access the resource.

**Access-Control-Max-Age**

The `Access-Control-Max-Age` header indicates how long the results of a preflight request can be cached.

**Access-Control-Allow-Methods**

The `Access-Control-Allow-Methods` header specifies the method or methods allowed when accessing the resource. This is used in response to a preflight request.

**Access-Control-Allow-Headers**

The `Access-Control-Allow-Headers` header is used in response to a preflight request to indicate which HTTP headers can be used when making the actual request.

**Access-Control-Allow-Credentials**

The `Access-Control-Allow-Credentials` header Indicates whether or not the response to the request can be exposed when the `credentials` flag is true. When used as part of a response to a preflight request, this indicates whether or not the actual request can be made using credentials. Note that simple `GET` requests are not preflighted, and so if a request is made for a resource with credentials, if this header is not returned with the resource, the response is ignored by the browser and not returned to web content.

## Issue & Keyword

- [xss-game](https://xss-game.appspot.com/level1)
- [WAF](https://avinetworks.com/what-is-a-web-application-firewall/)
- [Security Headers](https://securityheaders.com/)

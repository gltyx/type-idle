const hackerCode = [
    `<span class="comment">// Attempting to breach mainframe security</span>
<span class="keyword">function</span> <span class="function">initializePayload</span>(<span class="variable">target</span>) {
    <span class="keyword">let</span> <span class="variable">seed</span> = <span class="string">'0x3D4C'</span>;
    <span class="keyword">let</span> <span class="variable">payload</span> = <span class="string">'aGFja2VyX2FkZHJlc3M='</span>; <span class="comment">// base64 encoded string</span>
    
    <span class="comment">// Decrypt the base64 data
</span>    <span class="keyword">let</span> <span class="variable">decodedPayload</span> = <span class="function">atob</span>(<span class="variable">payload</span>);

    <span class="keyword">for</span> (<span class="keyword">let</span> <span class="variable">i</span> = <span class="number">0</span>; <span class="variable">i</span> &lt; <span class="number">10</span>; <span class="variable">i</span>++) {
        <span class="function">console</span>.<span class="function">log</span>(<span class="string">'[DEBUG] Iteration: '</span> + <span class="variable">i</span>);
    }

    <span class="comment">// Injecting payload into the target
</span>    <span class="function">sendPacket</span>(<span class="variable">target</span>, <span class="variable">decodedPayload</span>, <span class="variable">seed</span>);
}

<span class="comment">// Simulate sending packet to target address</span>
<span class="keyword">function</span> <span class="function">sendPacket</span>(<span class="variable">address</span>, <span class="variable">data</span>, <span class="variable">authKey</span>) {
    <span class="keyword">try</span> {
        <span class="function">console</span>.<span class="function">log</span>(<span class="string">'[INFO] Sending packet to '</span> + <span class="variable">address</span>);
        <span class="keyword">return</span> <span class="function">encryptData</span>(<span class="variable">data</span>, <span class="variable">authKey</span>);
    } <span class="keyword">catch</span> (<span class="variable">error</span>) {
        <span class="function">console</span>.<span class="function">error</span>(<span class="string">'[ERROR] Packet transmission failed: '</span> + <span class="variable">error</span>);
    }
}

<span class="comment">// Simple encryption placeholder</span>
<span class="keyword">function</span> <span class="function">encryptData</span>(<span class="variable">data</span>, <span class="variable">key</span>) {
    <span class="keyword">return</span> <span class="variable">data</span>.<span class="function">split</span>(<span class="string">''</span>)
               .<span class="function">reverse</span>()
               .<span class="function">join</span>(<span class="string">''</span>) 
               + <span class="string">'#'</span> + <span class="variable">key</span>;
}`
,
`<span class="comment">// Initiating brute force attack</span>
<span class="keyword">function</span> <span class="function">bruteForce</span>(<span class="variable">target</span>, <span class="variable">passwordList</span>) {
    <span class="keyword">for</span> (<span class="keyword">let</span> <span class="variable">password</span> of <span class="variable">passwordList</span>) {
        <span class="function">console</span>.<span class="function">log</span>(<span class="string">'[INFO] Trying password: '</span> + <span class="variable">password</span>);
        <span class="keyword">if</span> (<span class="function">attemptLogin</span>(<span class="variable">target</span>, <span class="variable">password</span>)) {
            <span class="function">console</span>.<span class="function">log</span>(<span class="string">'[SUCCESS] Password found: '</span> + <span class="variable">password</span>);
            <span class="keyword">break</span>;
        }
    }
}

<span class="comment">// Simulate login attempt</span>
<span class="keyword">function</span> <span class="function">attemptLogin</span>(<span class="variable">target</span>, <span class="variable">password</span>) {
    <span class="keyword">return</span> <span class="variable">password</span> === <span class="string">'hunter2'</span>;
}`,
`<span class="comment">// Attempting to disrupt signals</span>
<span class="keyword">function</span> <span class="function">disruptComms</span>(<span class="variable">node</span>) {
    <span class="function">console</span>.<span class="function">log</span>(<span class="string">'[INFO] Jamming signals at '</span> + <span class="variable">node</span>);
    <span class="keyword">let</span> <span class="variable">jammed</span> = <span class="function">Math</span>.<span class="function">random</span>() &lt; <span class="number">0.5</span>;
    <span class="keyword">if</span> (<span class="variable">jammed</span>) {
        <span class="function">console</span>.<span class="function">log</span>(<span class="string">'[SUCCESS] Comms jammed.'</span>);
    } <span class="keyword">else</span> {
        <span class="function">console</span>.<span class="function">log</span>(<span class="string">'[FAIL] Jam attempt failed.'</span>);
    }
}`,
`<span class="comment">// Attempting memory infiltration</span>
<span class="keyword">function</span> <span class="function">memoryInfiltration</span>(<span class="variable">system</span>) {
    <span class="function">console</span>.<span class="function">log</span>(<span class="string">'[INFO] Mapping memory at '</span> + <span class="variable">system</span>);
    <span class="keyword">let</span> <span class="variable">sectors</span> = <span class="function">Math</span>.<span class="function">floor</span>(<span class="function">Math</span>.<span class="function">random</span>() * <span class="number">10</span>) + <span class="number">1</span>;
    <span class="keyword">for</span> (<span class="keyword">let</span> <span class="variable">i</span> = <span class="number">0</span>; <span class="variable">i</span> &lt; <span class="variable">sectors</span>; <span class="variable">i</span>++) {
        <span class="function">console</span>.<span class="function">log</span>(<span class="string">'[DEBUG] Sector '</span> + <span class="variable">i</span> + <span class="string">' infiltration complete.'</span>);
    }
}`,
`<span class="comment">// Stealth Ping Sweep</span>
<span class="keyword">function</span> <span class="function">stealthPing</span>(<span class="variable">address</span>) {
    <span class="keyword">let</span> <span class="variable">packetCount</span> = <span class="function">Math</span>.<span class="function">floor</span>(<span class="function">Math</span>.<span class="function">random</span>() * <span class="number">50</span>) + <span class="number">1</span>;
    <span class="function">console</span>.<span class="function">log</span>(<span class="string">'[INFO] Sending stealth pings to '</span> + <span class="variable">address</span>);
    <span class="keyword">while</span> (<span class="variable">packetCount</span>--) {
        <span class="function">console</span>.<span class="function">log</span>(<span class="string">'[TRACE] Ping sent.'</span>);
    }
}`,
`<span class="comment">// Data Masking</span>
<span class="keyword">function</span> <span class="function">maskData</span>(<span class="variable">data</span>) {
    <span class="keyword">return</span> <span class="variable">data</span>.<span class="function">replace</span>(/<span class="variable">[a-zA-Z0-9]/g</span>, <span class="string">'#'</span>);
}`,
`<span class="comment">// Keylogger Deployment</span>
<span class="keyword">function</span> <span class="function">deployKeylogger</span>(<span class="variable">machine</span>) {
    <span class="keyword">try</span> {
        <span class="function">console</span>.<span class="function">log</span>(<span class="string">'[INFO] Keylogger attached to '</span> + <span class="variable">machine</span>);
    } <span class="keyword">catch</span> (<span class="variable">err</span>) {
        <span class="function">console</span>.<span class="function">error</span>(<span class="string">'[ERROR] Deployment failed: '</span> + <span class="variable">err</span>);
    }
}`,
`<span class="comment">// Reconnaissance Tool</span>
<span class="keyword">function</span> <span class="function">runRecon</span>(<span class="variable">target</span>) {
    <span class="keyword">let</span> <span class="variable">ports</span> = [<span class="number">21</span>, <span class="number">22</span>, <span class="number">80</span>, <span class="number">443</span>];
    <span class="function">console</span>.<span class="function">log</span>(<span class="string">'[INFO] Checking open ports for '</span> + <span class="variable">target</span>);
    <span class="variable">ports</span>.<span class="function">forEach</span>((<span class="variable">port</span>) => {
        <span class="function">console</span>.<span class="function">log</span>(<span class="string">'[DEBUG] Port '</span> + <span class="variable">port</span> + <span class="string">' is open.'</span>);
    });
}`,
`<span class="comment">// DNS Spoofing Simulation</span>
<span class="keyword">function</span> <span class="function">simulateDNSSpoof</span>(<span class="variable">domain</span>) {
    <span class="function">console</span>.<span class="function">log</span>(<span class="string">'[INFO] Spoofing DNS for '</span> + <span class="variable">domain</span>);
    <span class="keyword">let</span> <span class="variable">spoofedIP</span> = <span class="string">'192.168.13.37'</span>;
    <span class="keyword">return</span> {
        domain: <span class="variable">domain</span>,
        ip: <span class="variable">spoofedIP</span>
    };
}`,
`<span class="comment">// Temporary Memory Overload Attack</span>
<span class="keyword">function</span> <span class="function">tempOverload</span>(<span class="variable">system</span>) {
    <span class="keyword">let</span> <span class="variable">load</span> = <span class="function">Array</span>(<span class="number">100000</span>).<span class="function">fill</span>(<span class="string">'#'</span>);
    <span class="function">console</span>.<span class="function">log</span>(<span class="string">'[INFO] Overloading memory on '</span> + <span class="variable">system</span>);
    <span class="keyword">return</span> <span class="variable">load</span>.<span class="function">length</span>;
}`,
`<span class="comment">// Firewall Evasion Test</span>
<span class="keyword">function</span> <span class="function">evadeFirewall</span>(<span class="variable">firewall</span>) {
    <span class="comment">// Simple random pass/fail simulation</span>
    <span class="keyword">if</span> (<span class="function">Math</span>.<span class="function">random</span>() &lt; <span class="number">0.3</span>) {
        <span class="function">console</span>.<span class="function">log</span>(<span class="string">'[SUCCESS] Evasion successful against '</span> + <span class="variable">firewall</span>);
    } <span class="keyword">else</span> {
        <span class="function">console</span>.<span class="function">log</span>(<span class="string">'[FAIL] Evasion detected by '</span> + <span class="variable">firewall</span>);
    }
}`,
`<span class="comment">// Secure Channel Disruption</span>
<span class="keyword">function</span> <span class="function">disruptSecureChannel</span>(<span class="variable">channel</span>) {
    <span class="keyword">try</span> {
        <span class="function">console</span>.<span class="function">log</span>(<span class="string">'[INFO] Attempting to disrupt secure channel: '</span> + <span class="variable">channel</span>);
        <span class="comment">// Fake disruption logic
</span>    } <span class="keyword">catch</span> (<span class="variable">err</span>) {
        <span class="function">console</span>.<span class="function">error</span>(<span class="string">'[ERROR] Disruption error: '</span> + <span class="variable">err</span>);
    }
}`,
`<span class="comment">// Packet Sniffer Demo</span>
<span class="keyword">function</span> <span class="function">startSniffer</span>(<span class="variable">networkInterface</span>) {
    <span class="function">console</span>.<span class="function">log</span>(<span class="string">'[INFO] Initiating packet capture on '</span> + <span class="variable">networkInterface</span>);
    <span class="keyword">for</span> (<span class="keyword">let</span> <span class="variable">i</span> = <span class="number">0</span>; <span class="variable">i</span> &lt; <span class="number">5</span>; <span class="variable">i</span>++) {
        <span class="function">console</span>.<span class="function">log</span>(<span class="string">'[CAPTURE] Packet '</span> + <span class="variable">i</span>);
    }
}`
];
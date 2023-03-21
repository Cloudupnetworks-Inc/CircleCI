function FindProxyForURL(url, host) {
	var proxy_no = "DIRECT";

    if(shExpMatch(host, "*." + "usw2.lkt.cloud") || shExpMatch(host, "*." + "edge.lkt.cloud")) {
        return proxy_no;
    }

                var ztnaProxyUrl = "fp-z-usw2p662.zproxy.edge.lkt.cloud:443";
                var ztna_proxy_yes = "HTTPS " + ztnaProxyUrl;
                var ztna_proxy_list = Array(
                     // Cloud: enterprise_apps
                     "axelor.lookoutdemo.com::5",
                             "jumphost.lookoutdemo.com::5",
                             "wordpress.lookoutdemo.com::5"
                    
                );

                for(var iter = 0; iter < ztna_proxy_list.length; ++iter) {
                    var split =  ztna_proxy_list[iter].split("::");
                    if(shExpMatch(host, split[0]) || shExpMatch(host, "*."+split[0])) {
                        if (split.length > 1) {
                            ztna_proxy_yes = ztna_proxy_yes.replace('z', split[1]);
                        }
                        return ztna_proxy_yes;
                    }
                }

                    var exclude_ip_list = Array(
                         // Exclude IPs
                         "192.168.225.1"
                        
                    );

                    var resolved_ip = dnsResolve(host);
                    for(var iter = 0; iter < exclude_ip_list.length; ++iter) {
                        if(shExpMatch(resolved_ip, exclude_ip_list[iter])) {
                            return proxy_no;
                        }
                    }


    //resolved IP in the range of CIDRs
    const ip4ToInt = ip =>
      ip.split('.').reduce((int, oct) => (int << 8) + parseInt(oct, 10), 0) >>> 0;

    const isIp4InCidr = ip => cidr => {
      const [range, bits = 32] = cidr.split('/');
      const mask = ~(2 ** (32 - bits) - 1);
      return (ip4ToInt(ip) & mask) === (ip4ToInt(range) & mask);
    };

    const isIp4InCidrs = (ip, cidrs) => cidrs.some(isIp4InCidr(ip));

            var exclude_cidrs_list = Array(
                 // Exclude CIDRs

            );

            var resolved_ip = dnsResolve(host);
            if(isIp4InCidrs(resolved_ip, exclude_cidrs_list)) {
                return proxy_no;
            }




            var exclude_list = Array(

                // Excluded domains for cloud: dropbox
                "connectivitycheck.getdropbox.com",
                    "dropboxcaptcha.com"
                ,
                // Excluded domains for cloud: envFPExcludeDomains
                "evernote.com",
                    "citrix.com",
                    "m.google.com",
                    "wvd.microsoft.com",
                    "webex.com",
                    "ciscospark.com",
                    "oktapreview.com",
                    "adobelogin.com",
                    "ocsp.digicert.com",
                    "mzstatic.com",
                    "api.scheduler.teams.microsoft.com",
                    "oktacdn.com",
                    "cdn-apple.com",
                    "icloud.com",
                    "3adobe.io",
                    "ciphercloud.io",
                    "icloud-content.com",
                    "rdweb.wvd.microsoft.com",
                    "icloud.com.cn",
                    "captive.apple.com",
                    "detectportal.firefox.com",
                    "zoom.us",
                    "hulu.com",
                    "apple.com.edgesuite.net",
                    "lookout.okta.com",
                    "outlook.office365.com",
                    "apple.com",
                    "wbx2.com",
                    "itunes.com",
                    "apidata.googleusercontent.com",
                    "crl3.digicert.com",
                    "crl4.digicert.com",
                    "www.vmware.com",
                    "2adobe.com"
                ,
                // Excluded domains for cloud: Default
                "wbx2.com",
                    "ocsp.digicert.com",
                    "webex.com",
                    "crl3.digicert.com",
                    "crl4.digicert.com",
                    "ciscospark.com"
                ,
                // Excluded domains for cloud: gsuite
                "apidata.googleusercontent.com",
                    "tools.google.com"
                

            );
            for(var iter = 0; iter < exclude_list.length; ++iter) {
                if(host.endsWith(exclude_list[iter])) {
                    return proxy_no;
                }
            }

    var csgProxyUrl = "fp-usw2p662.proxy.edge.lkt.cloud:443";
    return "HTTPS " + csgProxyUrl;
}
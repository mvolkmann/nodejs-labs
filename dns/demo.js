'use strict';
var dns = require('dns');

function report(domain, address, family) {
  console.log(domain, address, 'IPv' + family);
}

//var domain = 'www.ociweb.com';
var domain = 'www.google.com';

dns.lookup(domain, function (err, address, family) {
  if (err) {
    throw err;
  }
  report(domain, address, family);

  console.log('getting domain of', address);
  dns.reverse(address, function (err, domains) {
    if (err) {
      console.error('reverse lookup failed');
    } else {
      console.log(domains);
    }
  });
});

/*
var recordTypes = {
  A: 'IPv4',
  AAAA: 'IPv6',
  MX: 'mail exchange',
  TXT: 'text',
  SRV: 'SRV',
  PTR: 'reverse IP lookups',
  NS: 'name server',
  CNAME: 'canonical name'
};
// Only A and CNAME work for OCI.
Object.keys(recordTypes).forEach(function (recordType) {
  try {
    dns.resolve(domain, recordType, function (err, addresses) {
      if (err) {
        console.error('error for', recordType, err);
      } else {
        console.log(recordType, '=', addresses);
      }
    });
  } catch (e) {
    console.error('throw for', recordType, e);
  }
});
*/

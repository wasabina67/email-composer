const fs = require('fs').promises;
const path = require('path');

function parseEmailList(csvString) {
  return csvString
    .split(',')
    .map(email => email.trim())
    .filter(email => email.length > 0);
}

async function readMailData(directory) {
  const basePath = __dirname;

  try {
    const toContent = (await fs.readFile(path.join(basePath, 'email', 'to.md'), 'utf-8')).split('\n')[0];
    const ccContent = (await fs.readFile(path.join(basePath, 'email', 'cc.md'), 'utf-8')).split('\n')[0];
    const toEmails = parseEmailList(toContent);
    const ccEmails = parseEmailList(ccContent);

    const subjectContent = (await fs.readFile(path.join(basePath, directory, 'subject.md'), 'utf-8')).split('\n')[0];
    const bodyContent = await fs.readFile(path.join(basePath, directory, 'body.md'), 'utf-8');

    return {
      to: toEmails,
      cc: ccEmails,
      subject: subjectContent,
      body: bodyContent,
    };
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}

function generateMailtoLink(mailData) {
  const to = mailData.to.map(email => encodeURIComponent(email)).join(',');
  const MAX_URL_LENGTH = 2000; // Conservative limit for email client compatibility

  const params = [];
  if (mailData.cc.length > 0) params.push(`cc=${encodeURIComponent(mailData.cc.join(','))}`);
  if (mailData.subject) params.push(`subject=${encodeURIComponent(mailData.subject)}`);
  
  // Calculate base URL length without body
  const baseUrl = `mailto:${to}`;
  const baseParams = params.join('&');
  const baseLength = baseUrl.length + (baseParams ? 1 + baseParams.length : 0); // +1 for '?'
  
  // Add body only if it fits within the URL length limit
  if (mailData.body) {
    const encodedBody = encodeURIComponent(mailData.body);
    const bodyParam = `body=${encodedBody}`;
    const totalLength = baseLength + (params.length > 0 ? 1 : 0) + bodyParam.length; // +1 for '&'
    
    if (totalLength <= MAX_URL_LENGTH) {
      params.push(bodyParam);
    }
    // If body is too long, it will be omitted from the mailto link
  }
  
  const queryString = params.join('&');
  return `mailto:${to}${queryString ? '?' + queryString : ''}`;
}

module.exports = {
  readMailData,
  generateMailtoLink,
};

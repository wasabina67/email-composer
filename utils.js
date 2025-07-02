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

  const params = [];
  if (mailData.cc.length > 0) params.push(`cc=${encodeURIComponent(mailData.cc.join(','))}`);
  if (mailData.subject) params.push(`subject=${encodeURIComponent(mailData.subject)}`);
  if (mailData.body) params.push(`body=${encodeURIComponent(mailData.body)}`);
  const queryString = params.join('&');

  return `mailto:${to}${queryString ? '?' + queryString : ''}`;
}

module.exports = {
  readMailData,
  generateMailtoLink,
};

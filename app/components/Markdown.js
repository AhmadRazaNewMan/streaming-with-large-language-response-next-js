

import React from 'react';
import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';

const md = new MarkdownIt();

const Markdown = ({ text }) => {
  const htmlContent = md.render(text);
  const sanitized = DOMPurify.sanitize(htmlContent);

  return (
    <div dangerouslySetInnerHTML={{ __html: sanitized }} />
  );
};

export default Markdown;

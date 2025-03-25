
import React from 'react';

interface CustomHTMLTemplateProps {
  content?: string;
  htmlContent?: string;
  userData?: Record<string, any>;
}

const CustomHTMLTemplate: React.FC<CustomHTMLTemplateProps> = ({
  content = '',
  htmlContent = '',
  userData = {}
}) => {
  return (
    <div className="bg-white text-black rounded-md shadow-md overflow-hidden border border-slate-200">
      {/* If HTML content is provided, render it */}
      {htmlContent ? (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      ) : (
        /* Otherwise show the content in a default format */
        <div className="p-8">
          <div className="whitespace-pre-line">
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomHTMLTemplate;

import React from "react";
import { Editor } from "@tinymce/tinymce-react";

function TextEditor({
  label,
  id,
  value,
  onChange,
  placeholder,
  isRequired,
  aiButton,
  description,
  handleGenerate,
  generatingDescription,
}) {
  const handleEditorChange = (content, editor) => {
    onChange({ target: { name: id, value: content } });
  };

  return (
    <div>
      <label htmlFor={id} className="font-medium flex justify-between my-2.5">
        <div className="flex items-center">
          {label}
          {isRequired && <span className="text-gray-500 ml-2">*</span>}
        </div>
        {aiButton && (
          <div className="flex justify-end">
            <span
              className={`bg-black w-36 py-1 px-1 text-xs text-white text-center rounded cursor-pointer ${generatingDescription ? "hover:cursor-wait" : ""
                }`}
              onClick={handleGenerate}
            >
              {generatingDescription
                ? "Generating... ⏳"
                : "✨ Generate using AI"}
            </span>
          </div>
        )}
      </label>
      {description && (
        <span className="text-gray-500 text-sm ml-1.5 ">{description}</span>
      )}
      <Editor
        id={id}
        apiKey={import.meta.env.VITE_TINY_MCE_API}
        value={value}
        onEditorChange={handleEditorChange}
        init={{
          plugins: [
            "anchor", "autolink", "charmap", "codesample", "emoticons", "link", "lists", "media", "searchreplace", "table", "visualblocks", "wordcount",
            "checklist", "mediaembed", "casechange", "formatpainter", "pageembed", "a11ychecker", "tinymcespellchecker", "permanentpen", "powerpaste", "advtable", "advcode", "advtemplate", "ai", "uploadcare", "mentions", "tinycomments", "tableofcontents", "footnotes", "mergetags", "autocorrect", "typography", "inlinecss", "markdown", "importword", "exportword", "exportpdf"
          ],
          toolbar: "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
          ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
          uploadcare_public_key: "a7498fd19d7cd18505e6",
          branding: false,
          menubar: false,
          height: "20rem",
        }}
      />
    </div>
  );
}

export default TextEditor;

import React from 'react';

export default function OralHistory({ title, transcript, audio }) {
  return (
    <section>
      <h2>{title}</h2>
      {audio && (
        <section>
          <h3>Audio</h3>
          <ol>
            {audio?.map((file, index) => {
              const fileName = file.src.substring(file.src.lastIndexOf('/') + 1);
              return (
                <li key={`${fileName}-${index}`}>
                  <figure>
                    <audio controls preload="none" src={file.src}>
                      Your browser does not support the<code>audio</code> element.
                    </audio>
                    <figcaption>{file.label ?? fileName}</figcaption>
                  </figure>
                </li>
              );
            })}
          </ol>
        </section>
      )}
      {transcript && (
        <section>
          <h3>Transcript</h3>
          {transcript.map((file, index) => (
            <p key={`${index}`}>
              <a href={file.src} target="_blank" rel="noopener noreferrer">
                {file.label ?? `${title} Transcript (PDF)`}
              </a>
            </p>
          ))}
        </section>
      )}
    </section>
  );
}

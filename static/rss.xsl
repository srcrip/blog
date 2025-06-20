<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head>
        <title><xsl:value-of select="rss/channel/title"/> - RSS Feed</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style>
          body {
            font-family: 'Courier New', monospace;
            line-height: 1.4;
            color: #333;
            margin: 0;
            padding: 20px;
            background: #fff;
            white-space: pre-wrap;
            word-wrap: break-word;
            overflow-wrap: break-word;
          }
          @media (max-width: 600px) {
            body {
              padding: 10px;
              font-size: 14px;
            }
          }
        </style>
      </head>
      <body>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;rss version="2.0"&gt;
  &lt;channel&gt;
    &lt;title&gt;<xsl:value-of select="rss/channel/title"/>&lt;/title&gt;
    &lt;description&gt;<xsl:value-of select="rss/channel/description"/>&lt;/description&gt;
    &lt;link&gt;<xsl:value-of select="rss/channel/link"/>&lt;/link&gt;<xsl:for-each select="rss/channel/item">
    &lt;item&gt;
      &lt;title&gt;<xsl:value-of select="title"/>&lt;/title&gt;
      &lt;link&gt;<xsl:value-of select="link"/>&lt;/link&gt;
      &lt;pubDate&gt;<xsl:value-of select="pubDate"/>&lt;/pubDate&gt;
      &lt;description&gt;<xsl:value-of select="description"/>&lt;/description&gt;
    &lt;/item&gt;</xsl:for-each>
  &lt;/channel&gt;
&lt;/rss&gt;</body>
    </html>
  </xsl:template>
</xsl:stylesheet>

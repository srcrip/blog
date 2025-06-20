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
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #fff;
          }
          .header {
            border-bottom: 1px solid #eee;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .header h1 {
            margin: 0 0 10px 0;
            color: #2c3e50;
          }
          .header p {
            margin: 0;
            color: #666;
          }
          .item {
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid #f0f0f0;
          }
          .item:last-child {
            border-bottom: none;
          }
          .item h2 {
            margin: 0 0 10px 0;
          }
          .item h2 a {
            color: #2c3e50;
            text-decoration: none;
          }
          .item h2 a:hover {
            text-decoration: underline;
          }
          .item-meta {
            color: #666;
            font-size: 0.9em;
            margin-bottom: 10px;
          }
          .item-description {
            color: #555;
          }
          .rss-info {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 30px;
            font-size: 0.9em;
          }
          @media (max-width: 600px) {
            body {
              padding: 10px;
            }
            .header h1 {
              font-size: 1.5em;
            }
            .item h2 {
              font-size: 1.2em;
            }
          }
        </style>
      </head>
      <body>
        <div class="rss-info">
          📡 This is an RSS feed. You can subscribe to it in your favorite RSS reader or news aggregator.
        </div>

        <div class="header">
          <h1><xsl:value-of select="rss/channel/title"/></h1>
          <p><xsl:value-of select="rss/channel/description"/></p>
          <p><a href="{rss/channel/link}">Visit Website</a></p>
        </div>

        <div class="items">
          <xsl:for-each select="rss/channel/item">
            <div class="item">
              <h2><a href="{link}"><xsl:value-of select="title"/></a></h2>
              <div class="item-meta">
                <xsl:value-of select="pubDate"/>
              </div>
              <div class="item-description">
                <xsl:value-of select="description"/>
              </div>
            </div>
          </xsl:for-each>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

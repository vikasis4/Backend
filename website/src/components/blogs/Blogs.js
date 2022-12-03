import React from 'react';
import './blog.css';
import img from '../course/10088.jpg'
import Footer from '../footer/Footer.js'


const Blogs = () => {


  return (
    <>
      <div className="blog-main">
        <div className="videopage-gap"></div>
        <div className="blog-one">
          <h1>RankBoost - Blogs</h1>
          <h2>Heading</h2>
        </div>
        <div className="blog-content">
          <img src={img}></img>
          <h1>
            We have seen how to place an image and run text around it, but the aforementioned methods still don’t have the layout elegance that’s possible with a desktop publishing program. For one thing, the text tends to be too close to the image. A buffer space would be nice, and that’s where HSPACE and VSPACE come into play. HSPACE creates a buffer along the right side and left side of the image, whereas VSPACE creates a buffer along the image’s top and bottom.
            These attributes, introduced by Netscape, were ones that the W3C (World Wide Web Consortium) adopted in 1996 for the HTML 3.2 specification. The HTML 3.2 specification also let Web designers employ tables and applets.
            If you wish, you can even set the horizontal and vertical buffer spaces using measurements in pixels. For example, the markup code for a 50-pixel buffer looks like this:
            The problem with HSPACE is that it inserts a buffer on both sides of the image, so if you want the image flush against the margin, you are out of luck.We have seen how to place an image and run text around it, but the aforementioned methods still don’t have the layout elegance that’s possible with a desktop publishing program. For one thing, the text tends to be too close to the image. A buffer space would be nice, and that’s where HSPACE and VSPACE come into play. HSPACE creates a buffer along the right side and left side of the image, whereas VSPACE creates a buffer along the image’s top and bottom.
            These attributes, introduced by Netscape, were ones that the W3C (World Wide Web Consortium) adopted in 1996 for the HTML 3.2 specification. The HTML 3.2 specification also let Web designers employ tables and applets.
            If you wish, you can even set the horizontal and vertical buffer spaces using measurements in pixels. For example, the markup code for a 50-pixel buffer looks like this:
            The problem with HSPACE is that it inserts a buffer on both sides of the image, so if you want the image flush against the margin, you are out of luck.
            We have seen how to place an image and run text around it, but the aforementioned methods still don’t have the layout elegance that’s possible with a desktop publishing program. For one thing, the text tends to be too close to the image. A buffer space would be nice, and that’s where HSPACE and VSPACE come into play. HSPACE creates a buffer along the right side and left side of the image, whereas VSPACE creates a buffer along the image’s top and bottom.
            These attributes, introduced by Netscape, were ones that the W3C (World Wide Web Consortium) adopted in 1996 for the HTML 3.2 specification. The HTML 3.2 specification also let Web designers employ tables and applets.
            If you wish, you can even set the horizontal and vertical buffer spaces using measurements in pixels. For example, the markup code for a 50-pixel buffer looks like this:
            The problem with HSPACE is that it inserts a buffer on both sides of the image, so if you want the image flush against the margin, you are out of luck.
            We have seen how to place an image and run text around it, but the aforementioned methods still don’t have the layout elegance that’s possible with a desktop publishing program. For one thing, the text tends to be too close to the image. A buffer space would be nice, and that’s where HSPACE and VSPACE come into play. HSPACE creates a buffer along the right side and left side of the image, whereas VSPACE creates a buffer along the image’s top and bottom.
            These attributes, introduced by Netscape, were ones that the W3C (World Wide Web Consortium) adopted in 1996 for the HTML 3.2 specification. The HTML 3.2 specification also let Web designers employ tables and applets.
            If you wish, you can even set the horizontal and vertical buffer spaces using measurements in pixels. For example, the markup code for a 50-pixel buffer looks like this:
            The problem with HSPACE is that it inserts a buffer on both sides of the image, so if you want the image flush against the margin, you are out of luck.
          </h1>
          <div className="videopage-gap"></div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Blogs
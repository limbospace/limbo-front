import React, { useEffect, useRef, useState } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import ReactMarkdown from "react-markdown"

import * as expositionStyles from "../templates/exposition.module.sass"
import { Link } from "gatsby"



const Exposition = (props) => {
    const [pageWidth, setPageWidth] = useState(0)
    useEffect(() => {
        setPageWidth(window.innerWidth)
        window.addEventListener("resize", () => {
            setPageWidth(window.innerWidth)
        })
        return () => {
            window.removeEventListener("resize", () => {
            })
        }
    }, [])


    let currentExpo = props.currentExpo

    let expositionColorStyles = {
        color: currentExpo.text_color_HEX,
        backgroundColor: currentExpo.background_color_HEX
    }

    let startDate = Date.parse(currentExpo.start_date)
    let endDate = Date.parse(currentExpo.end_date)

    let formattedDate
    if (startDate !== endDate) {
        formattedDate = `${currentExpo.start_date.substring(8, 10)}.${currentExpo.start_date.substring(5, 7)} - ${currentExpo.end_date.substring(8, 10)}.${currentExpo.end_date.substring(5, 7)}.${currentExpo.end_date.substring(2, 4)}`
    } else {
        formattedDate = `${currentExpo.end_date.substring(8, 10)}.${currentExpo.end_date.substring(5, 7)}.${currentExpo.end_date.substring(2, 4)}`
    }
    console.log(currentExpo.main_picture)
    let mainImage = (currentExpo.main_picture != null ? <GatsbyImage image={getImage(currentExpo.main_picture)} alt={""} className={expositionStyles.mainImage} /> : undefined)

    let bigPicture1 = (currentExpo.big_picture_1 != null ? <GatsbyImage image={getImage(currentExpo.big_picture_1)} alt={""} className={expositionStyles.bigImage1} /> : undefined)
    let bigPicture2 = (currentExpo.big_picture_2 != null ? <GatsbyImage image={getImage(currentExpo.big_picture_2)} alt={""} className={expositionStyles.bigImage2} /> : undefined)

    let gallery = []
    for (let galleryImage of currentExpo.gallery_image) {
        let artistName = galleryImage.artist_name
        let artworkTitle = galleryImage.artwork_title
        let artworkDate = galleryImage.artwork_date
        let artworkMaterials = pageWidth >= 720 ? galleryImage.artwork_materials : ""
        let imageWidth = getImage(galleryImage.image_file).width
        let imageHeight = getImage(galleryImage.image_file).height
        let galleryPost
        if (imageHeight > imageWidth) {
            galleryPost = <div className={expositionStyles.galleryElement} key={galleryImage.id}>
                <h3 className={expositionStyles.galleryArtistName}>{artistName}</h3>
                <GatsbyImage image={getImage(galleryImage.image_file)} alt={""} className={expositionStyles.galleryImage} />
                <h3 className={expositionStyles.galleryArtworkTitle}>{artworkTitle}</h3>
                <p className={expositionStyles.galleryArtworkMaterials}>{artworkMaterials}</p>
            </div>
        } else {
            galleryPost = <div className={expositionStyles.galleryElementWidth} key={galleryImage.id}>
                <h3 className={expositionStyles.galleryArtistName}>{artistName}</h3>
                <GatsbyImage image={getImage(galleryImage.image_file)} alt={""} className={expositionStyles.galleryImage} />
                <h3 className={expositionStyles.galleryArtworkTitle}>{artworkTitle}</h3>
                <p className={expositionStyles.galleryArtworkMaterials}>{artworkMaterials}</p>
            </div>
        }


        gallery.push(galleryPost)
    }



    //   let formattedArtists = []
    //   let artistsList = []
    //   for (let currentArtist of exposition.artist) {
    //     artistsList.push(<h4 key={currentArtist.id}>{currentArtist.name}</h4>)
    //     let artistImages = []
    //     for (let currentArtistImage of currentArtist.image) {
    //       artistImages.push(
    //         <GatsbyImage image={getImage(currentArtistImage.image_file)} alt={""} className={expositionStyles.artistImageSmall} key={currentArtistImage.id} />
    //       )
    //     }
    //     formattedArtists.push(
    //       <div className={expositionStyles.artistContainer} key={currentArtist.id}>
    //         <h3 className={expositionStyles.artistName}>{currentArtist.name}</h3>
    //         {/*<p className={expositionStyles.artistBio}>{currentArtist.biography}</p>*/}
    //         {/*{artistImages}*/}
    //       </div>
    //     )
    //   }


    console.log(currentExpo)

    return (
        <div key={currentExpo.strapiId} className={expositionStyles.expositionContainer} style={expositionColorStyles}>
            <div className={`${expositionStyles.infoContainer} `} style={expositionColorStyles}>
                <div className={expositionStyles.titleContainer}>
                    <h1 className={expositionStyles.title}>{currentExpo.title}</h1>
                    <h2 className={expositionStyles.date}>{formattedDate}</h2>
                    <h3 className={expositionStyles.address}>{currentExpo.address}</h3>
                </div>
                {mainImage}
            </div>
            <div className={expositionStyles.descriptionContainer} style={expositionColorStyles}>
                <ReactMarkdown className={expositionStyles.description}>{currentExpo.description}</ReactMarkdown>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            {bigPicture1}
            <div className={expositionStyles.descriptionContainer} style={expositionColorStyles}>
                <ReactMarkdown className={expositionStyles.indication}>{currentExpo.indications}</ReactMarkdown>
                <div></div>
            </div>
            {bigPicture2}
            <div className={expositionStyles.galleryContainer} style={expositionColorStyles}>
                {gallery}
            </div>
            {/*             <div className={expositionStyles.posterZone}>
                <Link className={expositionStyles.posterLinkWrapper} to={`/${currentExpo.URL}`}>
                    <div className={expositionStyles.posterContainer}>
                        <GatsbyImage image={getImage(currentExpo.poster)} alt={""} className={expositionStyles.posterImage} />
                        <h1>{currentExpo.title}</h1>
                        <h4>{formattedDate}</h4>
                    </div>
                </Link>
            </div>
             */}
        </div>
    )
}

export default Exposition
/* global adsbygoogle */


import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const AdsComponent = (props) => {
    const { dataAdSlot } = props;
    const location = useLocation();
    
    // useEffect(() => {
    //     try {
    //         const script = document.createElement('script');
    //         script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8691989155273243';
    //         script.crossOrigin = 'anonymous';
    //         script.async = true;
    //         document.body.appendChild(script);

    //         (window.adsbygoogle = window.adsbygoogle || []).push({});
    //         window.adBreak = window.adConfig = function(o) { adsbygoogle.push(o); };
    //         // var adBreak = adConfig = function(o) {adsbygoogle.push(o);}
    //     }
    //     catch (e) {
    //         console.log('window.adsbygoogle', window.adsbygoogle)
    //         console.log(e)
    //     }
    // }, [location]);


    return (
        <>
            <ins className="adsbygoogle"
                style={{ display: 'block', width: '450px', height: "250px" }}
                data-ad-client="ca-pub-8691989155273243"
                data-ad-slot={dataAdSlot}
                data-ad-format="auto"
                data-full-width-responsive="true">
            </ins>
        </>
    );
};

export default AdsComponent;


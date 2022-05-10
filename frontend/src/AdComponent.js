import React from 'react';

export default class AdComponent extends React.Component {
    componentDidMount() {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }

    render() {
        return (

            <ins class="adsbygoogle"
                style={{ display: "inline-block", width: "728px", height: "90px" }}
                data-ad-client="ca-pub-4513666647383140"
                data-ad-slot="1152527856"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        );
    }
}

{/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4513666647383140"
     crossorigin="anonymous"></script>


<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4513666647383140"
     crossorigin="anonymous"></script>
<!-- Right ads unit -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4513666647383140"
     data-ad-slot="9753906753"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>


<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4513666647383140"
     crossorigin="anonymous"></script>
<!-- Left Ads unit -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4513666647383140"
     data-ad-slot="1152527856"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script> */}
import $ from 'jquery';
import { Route } from './router.js';
import { PageRouter, ProductPage, ShopPage} from '../routes.js';

export class AboutRoute extends Route {
    fetchedTweets;
    constructor() {
		super('AboutUs');
	}

    get tweets() {
		return this.fetchedTweets.data.map(elem => {
            elem.user = this.fetchedTweets.includes.users.find(user => user.id === elem.author_id);
            return elem;
        });
	}

    async onSelect(content,params) {

        await this.fetchTweets();


        $(content)
        .append(
            this.genAboutHeader()
        )
        .append(
            this.genDetails()
        )
        .append(
            this.genVideo()
        )
        .append(
            this.genSelllersMaps()
        )
        .append(
            this.genTwiConteiner()
        )

    }

    async fetchTweets() {
		this.fetchedTweets = {
            "data": [
                {
                    "author_id": "2495815027",
                    "edit_history_tweet_ids": [
                        "1582015077103767552"
                    ],
                    "id": "1582015077103767552",
                    "text": "RT @holiday_onahama: Twitterキャンペーン\n\n毎月1日～末日までの間に\nフォロー＆リツイートして頂くと\n毎月5名様にAmazonギフト券3000円分プレゼント！\n\nよろしくお願いします‼️\n\n#amazon ギフト券3000円分\n#プレゼント #キャン…"
                },
                {
                    "author_id": "1537230849132974080",
                    "edit_history_tweet_ids": [
                        "1582015076621393920"
                    ],
                    "id": "1582015076621393920",
                    "text": "NEW FREE ALBUM Ball - MixtapeKid\n\nFree Download \n\nhttps://t.co/nntG9r8N3U\n\nStream MixtapeKid's Music On  All Streaming Platforms! \n\nhttps://t.co/dyGIVtXMS1\n\n#spotify   #bandcamp   #music  #radio  #dj  #applemusic  #googleplay #itunes   #youtube  #amazon #playlist #blog"
                },
                {
                    "author_id": "1293705357152284672",
                    "edit_history_tweet_ids": [
                        "1582015075639910402"
                    ],
                    "id": "1582015075639910402",
                    "text": "Samsung Made This Powerful Galaxy Smartphone Feature Even More Amazing! https://t.co/N9GQOFXAOi - @jspring86az\n\nWhitestone - Pellicola Protettiva in Vetro Ez per Samsung Galaxy Z Flip 4 [Facile da installare] https://t.co/WIl04N4bCL #Amazon via @Amazon"
                },
                {
                    "author_id": "3141882135",
                    "edit_history_tweet_ids": [
                        "1582015072024633346"
                    ],
                    "id": "1582015072024633346",
                    "text": "Hayward BS7403/16 3/16-Inch Perforated Stainless Steel Basket Replacement for Hayward SB Series 4-Inch Basket Strainer https://t.co/o634okg6t2 #Amazon via @Amazon https://t.co/ApNRqFEGi0"
                },
                {
                    "author_id": "1542429457079992320",
                    "edit_history_tweet_ids": [
                        "1582015049945620481"
                    ],
                    "id": "1582015049945620481",
                    "text": "【10/17 Toys Ranking No.10❗】\nSquishmallows 14-Inch Purple Octopus with Multi-Colored Tentacles, and Flower Pl\nhttps://t.co/6RBtbK3XVx\n #amazon"
                },
                {
                    "author_id": "2882662054",
                    "edit_history_tweet_ids": [
                        "1582015048666710019"
                    ],
                    "id": "1582015048666710019",
                    "text": "#RT #IARTG #EARTG #ASMSG #INDIEBOOKSBESEEN #BookBoost #indieauthors #indiebooks Contemporary Romance #Romance \n\n#ebooks 1-4 #series ALL #amazon #1 #bestsellers \n\n#smashwords #Nook #Google #Apple #D2D #Kobo https://t.co/6Lxm8a1GEs"
                },
                {
                    "author_id": "2152429759",
                    "edit_history_tweet_ids": [
                        "1582015041477320705"
                    ],
                    "id": "1582015041477320705",
                    "text": "RT @eiki_present: ／\n🔥10万円🔥Amazon.PayPay\nギフト券大放出プレゼント🎁　\n＼\n\n応募者の皆様に5日間\n抽選で毎日2万円分ギフトを贈ります🔥\n\n　　🔶応募方法🔶\nフォロー&amp;この投稿をリツイート✨\n\n🚨更にRTと＋引用RTどちらもした人にもう1万…"
                },
                {
                    "author_id": "1451464257531301890",
                    "edit_history_tweet_ids": [
                        "1582015040928223233"
                    ],
                    "id": "1582015040928223233",
                    "text": "TikTokをダウンロードすれば、4000円分のクーポンを貰えます！\n#Amazonギフト券 #Amazon #懸賞 \nhttps://t.co/TcSayw8ER0"
                },
                {
                    "author_id": "1451464257531301890",
                    "edit_history_tweet_ids": [
                        "1582015039929667584"
                    ],
                    "id": "1582015039929667584",
                    "text": "TikTokをインストールしてAmazonギフト券1000円分をゲット！\n\n招待コード【 AB12085292 】\n\n登録時にご入力ください！\n#Amazonギフト券 #Amazon #懸賞"
                },
                {
                    "author_id": "1380792544456404995",
                    "edit_history_tweet_ids": [
                        "1582015038659137538"
                    ],
                    "id": "1582015038659137538",
                    "text": "RT @eiki_present: ／\n🔥10万円🔥Amazon.PayPay\nギフト券大放出プレゼント🎁　\n＼\n\n応募者の皆様に5日間\n抽選で毎日2万円分ギフトを贈ります🔥\n\n　　🔶応募方法🔶\nフォロー&amp;この投稿をリツイート✨\n\n🚨更にRTと＋引用RTどちらもした人にもう1万…"
                }
            ],
            "includes": {
                "users": [
                    {
                        "name": "Libera",
                        "profile_image_url": "https://pbs.twimg.com/profile_images/1445056491535306755/U4AwUTOc_normal.jpg",
                        "username": "Libera2636",
                        "id": "2495815027"
                    },
                    {
                        "name": "DOPE RECORDINGS",
                        "profile_image_url": "https://pbs.twimg.com/profile_images/1570901660687384585/FjXHo2tK_normal.jpg",
                        "username": "dope_recordings",
                        "id": "1537230849132974080"
                    },
                    {
                        "name": "Whitestone_EU",
                        "profile_image_url": "https://pbs.twimg.com/profile_images/1481135723755769856/BRpA4i7v_normal.png",
                        "username": "WhitestoneEU",
                        "id": "1293705357152284672"
                    },
                    {
                        "name": "Fabco Plastics Jim 🇨🇦",
                        "profile_image_url": "https://pbs.twimg.com/profile_images/1505880434458177539/LEzwn-cG_normal.jpg",
                        "username": "FABCOJim",
                        "id": "3141882135"
                    },
                    {
                        "name": "followback100💯",
                        "profile_image_url": "https://pbs.twimg.com/profile_images/1542430187601956865/osTD_q3o_normal.jpg",
                        "username": "comic_rankin",
                        "id": "1542429457079992320"
                    },
                    {
                        "name": "Carole Mortimer",
                        "profile_image_url": "https://pbs.twimg.com/profile_images/534706936222978048/gdZDkBJi_normal.jpeg",
                        "username": "carole_mortimer",
                        "id": "2882662054"
                    },
                    {
                        "name": "ハチハナママ🌻",
                        "profile_image_url": "https://pbs.twimg.com/profile_images/726053646106918915/1zWosJnT_normal.jpg",
                        "username": "amsa_y",
                        "id": "2152429759"
                    },
                    {
                        "name": "TikTokインストール・メルカリShops開設で2000円ゲット！",
                        "profile_image_url": "https://pbs.twimg.com/profile_images/1552931027814739968/OgiOL846_normal.jpg",
                        "username": "TikTokPromotion",
                        "id": "1451464257531301890"
                    },
                    {
                        "name": "WAIDA",
                        "profile_image_url": "https://pbs.twimg.com/profile_images/1380792827580280832/XlUkz443_normal.jpg",
                        "username": "WAIDA98761819",
                        "id": "1380792544456404995"
                    }
                ]
            },
            "meta": {
                "newest_id": "1582015077103767552",
                "oldest_id": "1582015038659137538",
                "result_count": 10,
                "next_token": "b26v89c19zqg8o3fpzeka1qcerdz1erjdue3ebedjy5q5"
            }
        };
	}

    genAboutHeader() {
		return $('<section>')
			.attr('id', 'about-header')
			.append($('<h1>').text('About Us'))
			.append($('<h2>').text('NAT - Global fashion store'))
	}

    genDetails(){
        return $('<section>')
            .attr('id', 'about-text')
            .addClass('section-p1')
            .append($('<img>')
                .attr('src', '/public/img/about/a6.jpg')
                .attr('alt','')
            )
            .append($('<div>')
                .attr('id', 'hwr')
                .append($('<h2>').text('Who We Are?'))
                .append($('<span>').text('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id estlaborum.'))
            )
    }

    genVideo(){
        return $('<section>')
            .attr('id', 'about-text')
            .addClass('section-p1')
            .append($('<div>')
                .attr('id','soon')
                .append($('<h2>').text('Our New App Coming Soon!'))
                .append($('<h4>').text('Starting at the beginning of 2023 The app will be available in all app stores.'))
            )
            .append($('<div>')
                .addClass('video')
                .append($('<video>')
                    .attr('src', '/public/img/about/1.mp4')
                    .prop('autoplay', true)
                    .prop('muted', true)
                    .prop('loop', true)
                )
            )
    }

    genSelllersMaps(){
        return $('<section>')
        .attr('id', 'about-text')
        .addClass('section-p1')
        .append($('<div>')
            .addClass('map')
            .append($('<div>')
                .addClass('mapouter')
                .append($('<div>')
                    .addClass('gmap_canvas')
                    .append($('<iframe>')
                        .attr('id','gmap_canvas')
                        .attr('src','https://maps.google.com/maps?q=&output=embed')
                        .attr('width','547')
                        .attr('height','500')
                        .attr('frameborder','0')
                        .attr('scrolling','no')
                        .attr('marginheight','0')
                        .attr('marginwidth','0')
                    )
                )
            ))
        .append($('<div>')
                .attr('id','soon')
                .append($('<h2>').text('Our Seller world Wide'))
                .append($('<h4>').text('Here you can see our sellers location.'))
            )
    }

    genTweerts(){
        return $('<section>')
            .addClass('twi-container')
            .append(this.tweets.map(p => this.genTweetText(p)))

    }

    genTweetText(tweet)
    {
        return $('<div>')
            .addClass('quote_frame')
            .append($('<h2>').text(tweet.user.name))
            .append($('<div>').append($('<h4>').text(tweet.text)))
            
    }
    genTwiConteiner() {
		return $('<section>')
			.attr('id', 'twiters')
			.addClass('section-p1')
			.append(
				$('<div>')
					.addClass('twi-container')
					.append(this.tweets.map(p => this.genTwiElement(p)))
			);
	}

	genTwiElement(tweet) {
		return $('<div>')
			.addClass('twi')
			.append(
				$('<img>')
					.attr('src', tweet.user.profile_image_url)
					.attr('alt','')
			)
            .append(
				$('<div>')
					.addClass('des')
					.append($('<span>').text(tweet.user.name))
					.append($('<h5>').text(tweet.text))
			).append($('<a>').append(
				$('<i>').addClass('bi bi-twitter twit')
			));
	}
}
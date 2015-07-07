/**
 * Copyright (c) 2015 QUp World Inc. All Rights Reserved.
 *
 * This document contains proprietary and confidential information of QUp World.
 * It may not be used for any other purposes, reproduced in whole or in part, nor passed to any organization or person
 * without the specific permission in writing of the Technical Director, QUp World.
 *
 * @author QUp World
 *
 * @see http://qupworld.com/terms
 * @see http://qupworld.com/privacy
 *
 * Description
 *
 */
module.exports = {
    dbUrl: 'mongodb://192.168.2.85/test_choi',
    authentication: {
        'facebookAuth' : {
            'clientID'      : '118013808536072', // your App ID
            'clientSecret'  : 'e353885817cc9822f9c5073551c3d9e5', // your App Secret
            'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
        },
        'twitterAuth' : {
            'consumerKey'       : 'eTBDc5mXX1wegQ05WqbxKuMue',
            'consumerSecret'    : 'mGUTMescOmbTRDLiH5Pljx0JxTzcO3m5gC6BStqyP8bb7TpkdT',
            'callbackURL'       : 'http://localhost:3000/auth/twitter/callback'
        },
        'googleAuth' : {
            'clientID'      : '382869699194-mjklra026g9k9cfonmvi4k5pmlbq88ma.apps.googleusercontent.com',
            'clientSecret'  : 'hfM0IWHNIL7k4JRcBN4BDqk4',
            'callbackURL'   : 'http://localhost:3000/auth/google/callback'
        }
    }
}
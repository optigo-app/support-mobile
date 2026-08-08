<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Home.aspx.cs" Inherits="MyApps.app.Home" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">

    <%-- <title>Optigo : <%= hdnappname.Value %> </title>--%>
    <%--favicon--%>
    <link rel="icon" href="../image/favicon.ico">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=9" />
    <meta http-equiv="Cache-Control" content="no-cache" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    <meta name="theme-color" content="#f5dc00">
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="white" />
    <meta name="apple-mobile-web-app-title" content="Optigo App" />

    <link href="../fonts/LatoFont.css" rel="stylesheet" />
    <link rel="apple-touch-icon" href="http://cdn2.optigoapps.com/lib/icon/mobile-web-app-user-logo.jpg" />
    <link rel="apple-touch-startup-image" href="http://cdn2.optigoapps.com/lib/icon/mobile-web-app-user-logo.jpg" />
    <link href="<%=(uSystem.uWebconfig.UploadLogicalPath!=null?uSystem.uWebconfig.UploadLogicalPath.ToString().Trim()+uKey.ToString().Trim():"")%>companylogo/favicon.ico" rel="shortcut icon" type="image/x-icon" />
    <link href="<%=uSystem.uWebconfig.jojsPath.ToString().Trim() + "/easyui/themes/black/easyui.css"%>" rel="stylesheet" type="text/css" />
    <link href="<%=uSystem.uWebconfig.jojsPath.ToString().Trim() + "/easyui/themes/icon1.css"%>" rel="stylesheet" type="text/css" />
    <link href="<%=uSystem.uWebconfig.jojsPath.ToString().Trim() + "/css/jquery.contextmenu.css"%>" rel="stylesheet" type="text/css" />
    <link href="<%=uSystem.uWebconfig.jojsPath.ToString().Trim() + "/css/LatoFonts.css"%>" rel="stylesheet" type="text/css" />
    <script src="<%=uSystem.uWebconfig.jojsPath.ToString().Trim() + "/js/jquery-1.8.2.js"%>" type="text/javascript"></script>
    <script src="<%=uSystem.uWebconfig.jojsPath.ToString().Trim() + "/js/jquery-ui.js"%>" type="text/javascript"></script>
    <script src="<%=uSystem.uWebconfig.jojsPath.ToString().Trim() + "/js/jquery.contextMenu.js"%>" type="text/javascript"></script>
    <script src="<%=uSystem.uWebconfig.jojsPath.ToString().Trim() + "/easyui/jquery.easyui.min.js"%>" type="text/javascript"></script>
    <script src="<%=uSystem.uWebconfig.jojsPath.ToString().Trim() + "/js/jquery.ui.position.js"%>" type="text/javascript"></script>
    <script src="<%=uSystem.uWebconfig.jojsPath.ToString().Trim() + "/js/jquery.address-1.5.js"%>" type="text/javascript"></script>
    <script src="<%=uSystem.uWebconfig.jojsPath.ToString().Trim() + "/offline/offline.min.js"%>" type="text/jscript"></script>
    <link href="<%=uSystem.uWebconfig.jojsPath.ToString().Trim() + "/offline/themes/offline-language-english.css"%>" rel="stylesheet" />
    <link href="<%=uSystem.uWebconfig.jojsPath.ToString().Trim() + "/offline/themes/offline-theme-slide.css"%>" rel="stylesheet" />
    <link href="<%=uSystem.uWebconfig.jojsPath.ToString().Trim() + "/css/jquery-ui.css"%>" rel="stylesheet" type="text/css" />
    <link href="<%=uSystem.uWebconfig.jojsPath.ToString().Trim() + "/css/style.css"%>" rel="stylesheet" type="text/css" />
    <link href="<%=uSystem.uWebconfig.jojsPath.ToString().Trim() + "/css/scrollbar.css"%>" rel="stylesheet" type="text/css" />
    <script src="<%=uSystem.uWebconfig.jojsPath.ToString().Trim() + "/js/CommonJSForValidationETC.js"%>" type="text/javascript"></script>
    <link href="<%=uSystem.uWebconfig.jojsPath.ToString().Trim() + "/css/common.css"%>" rel="stylesheet" type="text/css" />
    <link href="<%=uSystem.uWebconfig.jojsPath.ToString().Trim() + "/css/Notification.css"%>" rel="stylesheet" type="text/css" />
    <script src="<%=uSystem.uWebconfig.jojsPath.ToString().Trim() + "/help/help.js"%>" type="text/javascript"></script>
    <%--<script src="../UserDefineJS/ComboListArray.js" type="text/javascript"></script>--%>
    <script src="<%=uSystem.uWebconfig.jojsPath.Trim()%><%=(objUser!=null?objUser.UDJSFolName:"")%>/UserDefineJS/ComboListArray.js" type="text/javascript"></script>
    <script src="<%=uSystem.uWebconfig.jojsPath.Trim()%><%=(objUser!=null?objUser.UDJSFolName:"")%>/UserDefineJS/BindComboList.js" type="text/javascript"></script>
    <script src="<%=uSystem.uWebconfig.jojsPath.ToString().Trim() + "/uitab/uitsome-tab.js"%>" type="text/javascript"></script>
    <link href="<%=uSystem.uWebconfig.jojsPath.ToString().Trim() + "/uitab/uitsome-tab.css"%>" rel="stylesheet" type="text/css" />
    <link rel="manifest" href="<%=uSystem.uWebconfig.jojsPath.ToString().Trim() + "/pwa/manifest.json"%>" />
    <script src="<%=uSystem.uWebconfig.jojsPath.ToString().Trim() + "/js/SessionValidation.js"%>" type="text/javascript"></script>
    <script src="<%=uSystem.uWebconfig.Socket_URL %>/socket.io/socket.io.js"></script>

    <style type="text/css">
        /* The invisible glass shield */
        .bckDisable {
            display: none; /* Hidden by default */
            position: fixed; /* Fixed to cover entire screen even if scrolled */
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: transparent; /* Invisible */
            z-index: 99998 !important; /* Extremely high to sit ON TOP of iframes */
        }

        /* The Menu must be higher than the glass shield */
        .dropdown_menu_optigo_new {
            z-index: 99999 !important; /* Highest priority */
        }

        .helpheader {
            height: 42px;
            background-color: gray;
            background-image: linear-gradient(to right,#008CCF, #009CDF);
            font-size: 25px;
            vertical-align: bottom;
            padding-top: 13px;
            padding-left: 11px;
            padding-right: 14px;
            color: white;
        }

        .cls_menupage:hover {
            background-color: whitesmoke;
        }


        .cls-submenu-name:hover {
            text-decoration: underline;
        }
        /*.cls_menupage{
            padding: 1px 1px 1px 1px;
          
        }*/

        .MenuContainer > .OneMenuFullDiv > .cls_ulmenus > .MenuPageName > ul {
            padding-right: 20px !important;
        }

            .MenuContainer > .OneMenuFullDiv > .cls_ulmenus > .MenuPageName > ul > .cls_menupage {
                display: flex;
            }

                .MenuContainer > .OneMenuFullDiv > .cls_ulmenus > .MenuPageName > ul > .cls_menupage > .cls-submenu-name {
                    width: max-content !important;
                }

                .MenuContainer > .OneMenuFullDiv > .cls_ulmenus > .MenuPageName > ul > .cls_menupage > .cls-app-name,
                .MenuContainer > .OneMenuFullDiv > .cls_ulmenus > .MenuPageName > ul > .cls_menupage > .cls-menu-name {
                    position: relative;
                    top: 4px;
                }

                .MenuContainer > .OneMenuFullDiv > .cls_ulmenus > .MenuPageName > ul > .cls_menupage > .cls-app-name {
                    left: 7px;
                }

                .MenuContainer > .OneMenuFullDiv > .cls_ulmenus > .MenuPageName > ul > .cls_menupage > .cls-menu-name {
                    left: 14px;
                }

        .clsipadview .dropdown {
            width: max-content !important;
        }

        .MenuContainer > .OneMenuFullDiv {
            min-height: 38px;
        }

        @media (max-width: 1200px) {
            #divQuickFavourite {
                -webkit-margin-start: 10px !important;
                -webkit-display: flex !important;
                -webkit-flex-wrap: wrap !important;
                margin-left: 10px !important;
                display: flex !important;
                flex-wrap: wrap !important;
            }

            .search_icon {
                -ms-position: absolute !important;
                -webkit-transform: translateY(-50%) !important;
                -moz-transform: translateY(-50%) !important;
                -ms-transform: translateY(-50%) !important;
                -o-transform: translateY(-50%) !important;
                position: absolute !important;
                top: 50%;
                transform: translateY(-50%);
            }

            #divheadeprojectlogo {
                width: 120px !important;
                -webkit-width: 120px !important;
                -moz-width: 120px !important;
                -ms-width: 120px !important;
            }

            .LinkMenu {
                margin: 0 10px !important;
                -webkit-margin: 0 10px !important;
                -moz-margin: 0 10px !important;
                -ms-margin: 0 10px !important;
            }

            .class1.clsipadview {
                display: flex !important;
                -webkit-display: flex !important;
            }

                .class1.clsipadview .dropdown #myInput {
                    max-width: max-content !important;
                    -webkit-max-width: max-content !important;
                    -moz-max-width: max-content !important;
                    -ms-max-width: max-content !important;
                }
        }

        @media (min-width: 768px) and (max-width:1024px) {
            .panel-header {
                padding: 10px !important;
            }

            .xs {
                top: 25px !important;
            }
        }


        #reloadbtn {
            position: absolute;
            margin-top: 2.3%;
            margin-left: 25.2%;
            width: 70px;
            height: 30px;
            /*background-color: #6699FF;
            color: white;*/
            border: 1px solid #FFEB3B;
            color: #000;
            text-shadow: 0 1px rgba(0,0,0,0.1);
            background-color: #4d90fe;
            background-image: -webkit-gradient(linear,left top,left bottom,from(#4d90fe),to(#4787ed));
            background-image: -webkit-linear-gradient(top,#FFEB3B,#FFEB3B);
            background-image: -moz-linear-gradient(top,#4d90fe,#4787ed);
            background-image: -ms-linear-gradient(top,#4d90fe,#4787ed);
            background-image: -o-linear-gradient(top,#4d90fe,#4787ed);
            background-image: linear-gradient(top,#4d90fe,#4787ed);
            font-weight: normal;
            cursor: pointer;
            border-width: 0;
            border-radius: 3px 3px;
        }

            #reloadbtn:hover {
                border: 1px solid #dac404;
                color: #000;
                text-shadow: 0 1px rgba(0,0,0,0.1);
                background-color: #FFEB3B;
                background-image: -webkit-gradient(linear,left top,left bottom,from(#4d90fe),to(#357ae8));
                background-image: -webkit-linear-gradient(top,#FFEB3B,#FFEB3B);
                background-image: -moz-linear-gradient(top,#4d90fe,#357ae8);
                background-image: -ms-linear-gradient(top,#4d90fe,#357ae8);
                background-image: -o-linear-gradient(top,#4d90fe,#357ae8);
                background-image: linear-gradient(top,#4d90fe,#357ae8);
                -webkit-box-shadow: inset 0 0 0 1px #fff;
                -moz-box-shadow: inset 0 0 0 1px #fff;
                box-shadow: inset 0 0 0 1px #fff;
                font-weight: normal;
                box-shadow: 0 3px 8px 0 rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08);
            }

        #contactme_dialog_close {
            z-index: 9;
        }

        #contactme_dialog {
            top: 100px !important;
        }
        /* ai button css */
        .ai-btn {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 4px 14px;
            font-size: 14px;
            font-weight: 600;
            color: white;
            background: linear-gradient(135deg, #8A4FFF 0%, #6832E3 100%);
            border: none;
            border-radius: 50px; /* Pill shape */
            cursor: pointer;
            text-decoration: none;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            /*box-shadow: inset 0 2px 0 rgba(255, 255, 255, 0.2),*/ /* Top inner highlight */
            /*inset 0 -2px 0 rgba(0, 0, 0, 0.2),*/ /* Bottom inner shade */
            /*0 0 0 4px rgba(138, 79, 255, 0.2),*/ /* Outer ring */
            /*0 8px 20px rgba(111, 44, 255, 0.4),*/ /* Colored glow */
            /*0 15px 30px rgba(0, 0, 0, 0.4);*/ /* Deep shadow */
            overflow: hidden;
            letter-spacing: 0.5px;
            margin-right: 15px;
        }


            .ai-btn::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient( 90deg, transparent, rgba(255, 255, 255, 0.2), transparent );
                transform: skewX(-20deg);
                animation: shine 4s infinite;
            }

            .ai-btn svg {
                width: 24px;
                height: 24px;
                fill: white;
                filter: drop-shadow(0 0 5px rgba(255,255,255,0.6));
                transition: transform 0.4s ease;
            }

        .star-1 {
            animation: twinkle 3s infinite ease-in-out;
        }

        .star-2 {
            animation: twinkle 3s infinite ease-in-out 1s;
        }

        .star-3 {
            animation: twinkle 3s infinite ease-in-out 2s;
        }

        .ai-btn:hover {
            /* transform: translateY(-4px) scale(1.02);*/
            background: linear-gradient(135deg, #9b66ff 0%, #7c4af0 100%);
            box-shadow: inset 0 2px 0 rgba(255, 255, 255, 0.3), inset 0 -2px 0 rgba(0, 0, 0, 0.2), 0 0 0 4px rgba(155, 102, 255, 0.4), 0 12px 30px rgba(138, 79, 255, 0.6), 0 20px 40px rgba(0, 0, 0, 0.5);
        }

            .ai-btn:hover svg {
                transform: rotate(15deg) scale(1.1);
            }

        .ai-btn:active {
            transform: translateY(2px) scale(0.98);
            box-shadow: inset 0 2px 0 rgba(0,0,0,0.1), 0 0 0 4px rgba(138, 79, 255, 0.2), 0 4px 10px rgba(111, 44, 255, 0.3);
        }

        @keyframes shine {
            0% {
                left: -100%;
                opacity: 0;
            }

            50% {
                opacity: 1;
            }

            100% {
                left: 200%;
                opacity: 0;
            }
        }

        @keyframes twinkle {
            0%, 100% {
                opacity: 0.7;
                transform: scale(1);
            }

            50% {
                opacity: 1;
                transform: scale(1.2);
            }
        }

        .bg-star {
            position: absolute;
            background: white;
            border-radius: 50%;
            opacity: 0.2;
            animation: pulse 4s infinite;
        }

        /* ai button css end here */



        /*<%--start of notificatoin ui divya--%>*/
        .notify_Popup {
            width: 330px;
            top: 56px; /* aligned below header */
            right: 16px; /* default fallback */
            position: fixed;
            min-height: 162px;
            height: auto;
            background-color: white;
            display: none;
            /*margin: 0 auto;*/
            top: 55px;
            box-shadow: 0px 0px 4px 1px #eee;
            animation: pop-out 0.5s 1 linear;
            z-index: 99999;
            border-radius: 15px;
        }

            .notify_Popup::after {
                content: '';
                display: block;
                position: absolute;
                bottom: 100%;
                width: 0px;
                margin-left: 292px;
                height: 0;
                border: 10px solid transparent;
                border-bottom-color: white;
            }


        .header1 {
            height: 40px;
            border-bottom: 1px solid #EBEBEB;
            width: 100%;
        }

        .notifyTitle {
            background-color: #fff;
            width: 100%;
            height: 30px;
            border-bottom: 1px solid #ebebeb;
            text-align: center;
            font-size: 13px;
            /*margin-left: 130px;*/
            margin-top: 12px;
            font-family: Lucida Sans Unicode, Arial, Helvetica, sans-serif;
        }



        .task1 {
            height: 80px;
            width: 100%;
            border-bottom: 1px solid #EBEBEB;
        }

        .cls_active {
            position: absolute;
            background-color: #fff;
            height: 35px;
            width: 30px;
            margin-left: 25px;
            margin-top: 3px;
            border-bottom: 2px solid #272c32;
        }

            .cls_active img {
                width: 19px;
                position: absolute;
                margin-top: 5px;
                margin-left: 5px;
                cursor: pointer;
            }

        #close_notify {
            height: 12px;
            width: 12px;
            margin-top: 15px;
            float: right;
            margin-right: 22px;
        }



        .main {
            position: relative;
            background-color: #FCFCFC;
            min-height: 45px;
            /* margin-top: 82px; */
            width: 100%;
            /* margin-bottom: 114px; */
            padding-bottom: 0;
            max-height: 417px;
            overflow-y: auto;
            overflow-x: hidden;
        }

        .main1 {
            color: #373737;
            font-family: Lucida Sans Unicode, Arial, Helvetica, sans-serif;
            font-size: 12px;
            width: 100%;
            font-weight: 600;
            cursor: pointer;
        }

            .main1 span {
                text-decoration: none !important;
            }

        .main2 {
            position: absolute;
            color: #999;
            font-size: 11px;
            font-family: Lucida Sans Unicode, Arial, Helvetica, sans-serif;
            padding-left: 5px;
        }

        .main img {
            height: 35px;
            width: 35px;
        }

        @-webkit-keyframes pop-out {
            0% {
                opacity: 0;
            }

            1% {
                opacity: 0;
                -webkit-transform: scale(0.98) translateY(-15px);
            }

            80% {
                -webkit-transform: scale(1);
            }

            100% {
                -webkit-transform: translateY(0);
            }
        }

        .subject {
            font-size: 12px;
            font-family: Lucida Sans Unicode, Arial, Helvetica, sans-serif;
            color: #a2a2a2;
            font-weight: 500;
        }



        .name {
            font-size: 12px;
            font-family: Lucida Sans Unicode, Arial, Helvetica, sans-serif;
            color: #999;
            cursor: pointer;
            font-weight: 600;
        }

        .clsnotifiunread {
            height: 13px !important;
            width: 13px !important;
            content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiAw0NOiOthI58AAAA50lEQVQoz4WRsU4CQRRFz5usFn4AiR/g8gGzSrMxMVrbGmwoKaU2JGJDT0G0s9I/IP7AEnkyU9DqZ2yyFWQsWOOCxdzyndybvHuFWppyi8UCHs9b52t7F4AgeidjvkOBAzLJOQn3nYkEajzTUvs0pH0tdRYEgMVAy2WbPS3bWi4GgKZa7bobKZWm6EhX/9HnJYCu9MFgQ7GHR0zlECAUZAaLA5i33HGNh9I7fQfAYZNfX3Kzefy4MtcMpXf2+peX4Ml4gerp6NzMOdjBGd7gJQe4WFddeabbdEuOi78ZLSpWdXQsic39A41OeUI4v+EIAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTAzLTEzVDEzOjU4OjM1KzAxOjAw6Eyu+AAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0wMy0xM1QxMzo1ODozNSswMTowMJkRFkQAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC);
        }

        .clsnotifiread {
            height: 13px !important;
            width: 13px !important;
            content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAVFBMVEUAAABrw1dqwVppwlhqwlkA/wBrwllqwllqwllqwllqwllrwllmzE1qwVdqw1hmu1Vqwllqwllqw1lowVlV1VVrwllqwlltwlVqv1xqwllqwlkAAADXUwBiAAAAGnRSTlMAJoCz5gFw9rXG8L0KRn8PyOq6Qgax0hUk/CpuxOUAAAABYktHRACIBR1IAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH4gMOBhEkW3CmuQAAAHFJREFUGNNlj1cOgDAMQ9NBy94U8P0PSjooCPz3LDmxiVhCKq2VFBRVGIsga4rAJbJK7xi8ZDhvM1U1rCCZuWk7oCf18DACijQwzZmhvbGs281scMTta5+YI/6o2ykxHw1v3ZGY38Zi51PsX/037jP/Ap+aEDp+WdPQAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTAzLTE0VDA2OjE3OjM2KzAxOjAw5a82egAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0wMy0xNFQwNjoxNzozNiswMTowMJTyjsYAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC);
        }

        .time {
            height: 14px !important;
            width: 14px !important;
            content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiAw8HGSez3nBZAAABRklEQVQoz21RPUhCYRQ998uHQlIKERXYUtLgkIH6oB+ioQikpaUGG4Rydoh+3KKhzVFag1oCoaUtEJpC74c/4JBuUWBNQkI/vtfXoD0zO8uFc869cO4hWMg4BvyYoPv38uxbh6XWyE1RCgvQ0IQGE+dfB6FaSxEAIONUQD9FhA8J8tIOFkWFw9YRuc6KDy/7ALnKKu8CqnY+49esHwDAQ/wsT9vWtgHI2HI3XFEECIrBcOziD5YMsQ+vnANsKoSMr4EeKA9qak+6BYJKWuy8ujWX2/FiGKE1FRVdWw4AFzKZdwHNTZRR0LaIr9AIRH4sWY8I4xgGxgNNHtXM6RfIBD+Vnb/vlNy8XbUrURzuidkBD/IdX/c8qkv+ZN3qQsbVCYqUFNn6o1OnFWxgTEWD6f/KMmDDB9LmkV7patOqe5IeqDRT77DfLryAx4Z0OTIAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDMtMTVUMDc6MjU6MzkrMDE6MDD9Dri7AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTAzLTE1VDA3OjI1OjM5KzAxOjAwjFMABwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=);
        }

        .clsdel {
            content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAG1BMVEUAAAD0WFj1WFj0WFjzV1f0WFj0V1f0WVkAAAAF42HsAAAACHRSTlMAqWj9af7+vm5FaSwAAAABYktHRACIBR1IAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH4gMOBgIC6JJi1gAAAENJREFUCNdjEGIAA0UGZQcQzWLEwGICYjg7QDCYByKcHSDCEGmgEESAgcE1BUIzuIUwoErBFMO1wwyEWwG3tAiiVR0A3SAKkKKblAAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDMtMTRUMDY6MDI6MDIrMDE6MDC4yAEOAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTAzLTE0VDA2OjAyOjAyKzAxOjAwyZW5sgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=);
        }

        .defProfile {
            content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABdFBMVEUAAADb29va3una3+ra3+na3+na3+na3+na4Onb3+na3+nZ4OrMzP/c3Oja4OnZ3unf3+ra4Ona3+na3unj4+Pb3una3+rc3Oja3+na3+na3+na3+ni5u7u8fX4+fr////u8fXh5e3s7/Pr7vPi5u7z9fj5+/z7/P3c4Orc4evj5+/j5u7j5+3a3+nb4Or////e4eva3+na3+nv8vbm6vDa3+rd4ur3+Pra4Or3+Prf5Ozg5O34+fza3+nb3un////a3+n3+Pne4uza3+nb4Oj09fjc4evW4Ov3+Prc4era3+ne3uba3+ra3unb4OjZ3+nn6vD+/v/z9Pja3+m/v//e3una4On8/P3z9Pja3+nc3OXZ4+za3+nf4+z5+vzb4Ona3+rX3+ft7fb////+/v7m5u7////////////////////////////////////////////////////////////////////////////a3+n///8AAAAKOsxIAAAAeXRSTlMAB0WQwtju99u9mEkFFvOVGIL0fQnEyizm8eH+wMTf/sXEwMPB0OTm0da9xb3t1v3P9tXFv9bR27PaxsXb/UYD6dfL6JPQ1BnXzvUfbnTL9L/0z88EF/vqzt4dG93I39XiIB25tR5O3NhKB3jz73EFDE2Tx970kUkK5EdDZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiAw0LKi6depwiAAABcElEQVQ4y31TZXdCMQwt9nB3GDBB5j7mY8rcjbm7D9jW9+sHVFLkcD8l9942TU+CEIdCqVJrJK1ObzCaUDXMKgvmkKy2Ctlkd+AyWJwuUbe5cRU8wiVeH6f9fh4GvPx8gDDBhlA4Egk3NlGHj97h8lC9WaZoCRLGTbpx0gNRmSNKKXupAGsvBoYYpRzmgsHKHhUHQ5xxqsIPSPUMFgUy4noGrEQGHifAkMBQQ8/CVllAG2PVSMfCdtHQwVgN0rKws6ZBQl0s7O4RDL2M7UP9/D0DoA8GGTkEj8RJrg9zHY8IbeJRZhgDToWUkIxTfWISuCmUmoZshhhmgZlLITQP6QIxpMUKCC3CkC0RwzInVlaLA7HG0jT9iRBvYr00UamNUrK5tc262EkSfXePDOW+BuOD6KH41Zmi5eiYjfXJ6dm5XIHMxeUVLMb1jVyF27uy3bt/KJcfnyqX9/nlFeS3948a+/359Z3N5fO57M/vH7D/nyRdY9AFDbwAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDMtMTNUMTE6NDI6NDYrMDE6MDBlkUc+AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTAzLTEzVDExOjQyOjQ2KzAxOjAwFMz/ggAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=);
        }

        #delete {
            height: 10px;
            width: 10px;
            margin-top: 2px;
            margin-left: 15px;
            display: none;
        }

        #read {
            height: 13px;
            width: 13px;
            display: none;
        }

        .task1:hover #delete {
            display: block;
        }

        .clsBackDisable {
            position: absolute;
            top: 0px;
            left: 0px;
            opacity: 0.2;
            width: 100%;
            height: 100%;
            z-index: 99991;
            background-color: #000;
            display: none;
        }

        /* <%-- divya code ends here --%>*/


        /*Layouts code starts from here*/
        .holds-the-iframe {
            background: url(../image/ajax-loader.gif) center center no-repeat;
        }

        .NotiFyBox {
            display: none !important;
        }
        /*.LinkMenu {
            width: 116px;
            height: 16px;
            padding: 5px 10px 5px 10px;
            z-index: 99999;
            border: 1px solid #131212;
            margin: 5px 10px 5px 4px;
        }*/
        ::-webkit-scrollbar {
            background-color: #e7e7e7;
        }

        .LinkMenu {
            width: 116px;
            height: 16px;
            padding: 5px 10px 5px 10px;
            z-index: 99999;
            margin: 5px 10px 5px 4px;
            margin: 0 23px 0 23px !important;
            display: inline-block !important;
            width: 18px;
            background: url('<%=uSystem.uWebconfig.jojsPath.ToString().Trim() + "/images/svgicons.svg"%>') no-repeat -48px -131px;
            padding: 0 !important;
            height: 33px;
            opacity: .8;
            vertical-align: middle;
        }

            .LinkMenu img {
                vertical-align: sub;
            }

        /*.LinkMenu:hover {
                border: 1px solid #CCC;
                border-radius: 3px;
                background-color: #525252;
                box-shadow: 0px 0px 18px #DBCFCF;
            }*/

        .classphno {
            /*background-color: #FFE400;
            float: right;
            margin-top: -5px;
            line-height: 28px;
            padding-left: 9px;
            padding-right: 9px;
            border-radius: 2px;
            font-size: 11px;
            font-weight: bold;
            position: absolute;
            width: 40px;
            height: 40px;
            margin-top: 5px;
            margin-right: 40px;
            margin-left: 35px;*/
            float: right;
            display: flex !important;
            gap: 15px;
        }

        .classUserIcon {
            position: static;
            height: 35px;
            width: 35px;
            cursor: pointer;
            border-radius: 50%;
            border: none !important;
        }

        .bckDisable {
            position: absolute;
            top: 0px;
            left: 0px;
            opacity: 0.2;
            width: 100%;
            height: 100%;
            z-index: 99991;
            background-color: #000;
        }

        .bckDisablesearch {
            position: absolute;
            top: 0px;
            left: 0px;
            opacity: 0.2;
            width: 100%;
            height: 100%;
            z-index: 99;
            background-color: #000;
        }

        .rightMenu {
            width: 200px;
            display: none;
            position: absolute;
            border: 1px solid #ccc;
            top: 55px;
            /*right: 5px;*/
            /*left: 706px !important;*/
            z-index: 99993;
            box-shadow: 6px 6px 2px #756C6C;
            overflow: auto;
            max-height: 550px;
        }

        .arrow-up {
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 11px solid #fff;
            position: absolute;
            margin-top: 26px;
            margin-left: 720px;
        }


        .rightMenu a:hover {
            background-color: #e7e7e7;
        }

        .rightMenu a {
            display: block;
            background-color: #FFF;
            padding: 7px 20px 7px 21px;
            color: #000;
            text-decoration: none;
            font-size: 12px;
            font-family: sans-serif;
            font-weight: bold;
        }


        .loadbg {
            display: none;
            padding: 10px;
            text-align: center;
            font-family: sans-serif;
            width: 200px;
            font-size: 12px;
            height: auto;
            border: 4px solid #CCC;
            background: white;
            border-radius: 10px;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            position: absolute;
            left: 44%;
            top: 35%;
            z-index: 2000000;
        }

        .backDisable {
            position: absolute;
            top: 0px;
            left: 0px;
            opacity: 0.2;
            width: 100%;
            height: 100%;
            z-index: 99991;
            background-color: #000;
        }

        #centerdiv {
            height: auto !important;
        }


        #Left_MenuBar div div.innerdiv:hover {
            color: #ffffff;
            cursor: pointer;
            background: #7C8B92;
        }

        #user div div.innerdiv:hover {
            color: #000000;
        }

        #Left_MenuBar div div[title] {
            background-color: #A0ADB3;
            background-repeat: repeat no-repeat !important;
        }


        #loadtext {
            font-weight: bold;
            color: black;
            margin-left: 7px;
            margin-top: 18px;
        }

        .class1 div {
            display: inline;
        }

        #divQuickFavourite select {
            display: none;
        }

        #welcomeid {
            display: none;
        }

        div[id*='myapps'] {
            width: auto !important;
        }

        @media (max-width: 768px) {

            #divQuickFavourite span {
                display: none;
            }

            #divQuickFavourite select {
                display: block !important;
                background: #f5f5f5;
            }

                #divQuickFavourite select option {
                    margin: 5px;
                    background: #f5f5f5;
                }
        }

        @media (max-width: 400px) {
            #welcomeid {
                display: none;
            }

            .divrightarrow {
                margin: 10px;
                margin-top: 0;
            }

            #divheadeprojectlogo {
                display: none;
            }
        }

        .tabs-tool {
            display: none;
        }

        .tabs-wrap {
            /*margin-right:20px !important;*/
            width: auto !important;
        }

        @font-face {
            font-family: 'Fertigo Pro';
            /*src: url('../fonts/Fertigo Pro.otff');*/
            src: url('../fonts/Fertigo_PRO.otf');
        }

        h1 {
            position: relative;
            color: rgba(0, 0, 0, .3);
            font-size: 3em;
        }

            h1:before {
                content: attr(data-text);
                position: absolute;
                overflow: hidden;
                max-width: 11em;
                white-space: nowrap;
                color: grey;
                animation: loading 8s linear infinite;
            }

        @keyframes loading {
            0% {
                max-width: 0;
            }
        }




        .zcrmp-lodingCont {
            top: 34px;
            display: none;
            background-color: #fff;
            z-index: 4;
            /*width: 1000px;
            height: 508px;*/
        }

        .dialogContainer {
            display: none;
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 100;
            text-align: left;
        }

        /**, *:before, *:after {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
        }*/

        .zcrmp-plusloading {
            /*text-transform: uppercase;*/
            letter-spacing: 10px;
            display: inline-block;
            position: absolute;
            top: 45%;
            left: 47%;
            width: auto;
            margin: 0 0 0 0px;
        }

            .zcrmp-plusloading span {
                display: block;
                font-family: 'Fertigo Pro';
                font-size: 25px;
                letter-spacing: 0;
                margin: 0 auto;
                text-shadow: 0 0 80px rgba(255, 255, 255, 0.5);
                background: url('<%=uSystem.uWebconfig.jojsPath.ToString().Trim() + "/images/loaderpng.png"%>') repeat-x;
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
                -webkit-animation: aitf 8s linear infinite;
                -webkit-transform: translate3d(0, 0, 0);
                -webkit-backface-visibility: hidden;
                font-weight: 500;
                position: relative;
            }

        @-webkit-keyframes aitf {
            0% {
                background-position: -7% 0%;
            }

            100% {
                background-position: -112% 0%;
            }
        }

        .layout-button-left {
            margin-top: 14px !important;
        }



        .expose {
            position: relative;
        }

        #overlay {
            background: rgba(0,0,0,0.3);
            display: none;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1000;
        }

        /*layout realted code ends here*/
    </style>
    <style type="text/css">
        #Left_MenuBar div div.innerdiv {
            color: #6E6E6E;
        }
        /* Start Code For Left Stripe menu hide show*/
        .LeftSideHideMenuPane {
            width: 5px;
            height: 100%;
            position: absolute;
            cursor: pointer;
            z-index: 999;
            top: 0;
            /*background-color: #D4D5D0;*/
            display: none;
            visibility: hidden;
        }

        .layout-expand {
            /*background-color: #ffe400;*/
            background-color: #FFEB3B;
            /*               display: block;*/
            left: -1px !important;
            top: 0px;
            width: 6px !important;
            display: none !important;
        }

        .layout-expand-over {
            /*background-color: #ffe400;*/
            background-color: #FFEB3B;
        }

        .LeftSideHideMenuPane:hover {
            /* background-color: #3580A9;*/
            /*background-color: #ffe400;*/
            background-color: #FFEB3B;
        }

        .panel-split {
            display: none;
        }

        .QuickSearchcls {
            /*color: Black;*/
            border-radius: 10px;
            /* border: 1px solid gainsboro; */
            color: #fff;
            list-style: none;
            outline: none;
            text-decoration: none;
            vertical-align: middle;
            display: inline-block;
            position: relative;
            cursor: pointer;
            letter-spacing: 0.7px;
        }

            .QuickSearchcls:hover {
                background: #fff;
                color: #000;
            }

            .QuickSearchcls:active {
                background: #fff;
                color: #000;
            }

        .supportrolecombo {
            opacity: 1 !important;
            width: 150px;
            padding: 3px 3px;
            background: rgb(243, 243, 243) !important;
            border: 1px solid gainsboro !important;
            font-size: 10.6px;
            color: #333;
            border-radius: 2px;
        }

        #popupbox_role {
            z-index: 1000;
            background-color: white;
            position: absolute;
            margin: 35px 0px 0px 1px;
            border: 2px solid gainsboro;
            border-radius: 2px;
            left: 2%;
            box-shadow: rgba(0,0,0,.6) 0px 2px 12px;
            -moz-box-shadow: rgba(0,0,0,.6) 0px 2px 12px;
            -webkit-box-shadow: rgba(0,0,0,.6) 0px 2px 12px;
            min-width: 362px;
            line-height: 13px !important;
            font: normal 12px Lucida Sans Unicode, "Arial", Arial, Helvetica, sans-serif;
            font-size: 12px !important;
        }

            #popupbox_role td {
                font-size: 13px !important;
            }

            #popupbox_role a {
                text-decoration: none;
            }

        label.popuparrow {
            background: url(<%=uSystem.uWebconfig.jojsPath.ToString().Trim()%>/images/popuparrow.png) no-repeat 100% 57%;
            cursor: pointer;
            padding-right: 12px;
        }


        .btndiv {
            position: absolute;
            width: 100.5%;
            height: 28%;
            margin-left: -6.2%;
            border-top-color: rgba(0,0,0,.2);
            border-top: 1px solid rgba(0,0,0,.2);
            background: #F5F5F5;
            margin-top: 28%;
        }

        .infodiv {
            width: 100.5%;
            position: absolute;
            height: 78%;
            margin-left: -6.3%;
            /* background: gray; */
            margin-top: -7%;
        }

        .classuserPopup {
            position: absolute;
            background-color: #fefefe;
            padding: 20px;
            border: none;
            width: 300px;
            height: 122px;
            /*margin-left: 80%;*/
            display: inline-block;
            border: 1px solid transparent;
            text-decoration: none;
            box-shadow: 0 0 10px #9ecaed;
            /*box-shadow: 5px 5px 5px #535353;*/
            /*z-index: 10;*/
        }

            .classuserPopup:after {
                content: '';
                display: block;
                position: absolute;
                left: 90%;
                bottom: 100%;
                width: 0;
                height: 0;
                border: 9px solid transparent;
                border-bottom-color: white;
            }

        .profile {
            position: absolute;
            width: 95px;
            height: 95px;
            margin-top: 3.5%;
            margin-left: 3.5%;
            border-radius: 50%;
        }

        .name {
            position: absolute;
            color: black;
            top: 0%;
            left: 35%;
            text-transform: capitalize;
            /*font-weight: bold;
            font-size: 19px;*/
            /*line-height: 28px;*/
        }

        .Email {
            position: absolute;
            color: gray;
            top: 4%;
            left: 35%;
            /*line-height: 12px;*/
            /*font-size: 15px;*/
        }

        .designation {
            position: absolute;
            color: gray;
            top: 20%;
            left: 35%;
            text-transform: capitalize;
        }

        .clsdc {
            position: absolute;
            color: gray;
            left: 35%;
            text-transform: capitalize;
        }

        #logBtn {
            position: absolute;
            margin-top: 2.3%;
            margin-left: 74.2%;
            width: 70px;
            height: 30px;
            /*background-color: #6699FF;
            color: white;*/
            border: 1px solid #FFEB3B;
            color: #000;
            text-shadow: 0 1px rgba(0,0,0,0.1);
            background-color: #4d90fe;
            background-image: -webkit-gradient(linear,left top,left bottom,from(#4d90fe),to(#4787ed));
            background-image: -webkit-linear-gradient(top,#FFEB3B,#FFEB3B);
            background-image: -moz-linear-gradient(top,#4d90fe,#4787ed);
            background-image: -ms-linear-gradient(top,#4d90fe,#4787ed);
            background-image: -o-linear-gradient(top,#4d90fe,#4787ed);
            background-image: linear-gradient(top,#4d90fe,#4787ed);
            font-weight: normal;
            cursor: pointer;
            border-width: 0;
            border-radius: 3px 3px;
        }

            #logbtn:hover {
                border: 1px solid #dac404;
                color: #000;
                text-shadow: 0 1px rgba(0,0,0,0.1);
                background-color: #FFEB3B;
                background-image: -webkit-gradient(linear,left top,left bottom,from(#4d90fe),to(#357ae8));
                background-image: -webkit-linear-gradient(top,#FFEB3B,#FFEB3B);
                background-image: -moz-linear-gradient(top,#4d90fe,#357ae8);
                background-image: -ms-linear-gradient(top,#4d90fe,#357ae8);
                background-image: -o-linear-gradient(top,#4d90fe,#357ae8);
                background-image: linear-gradient(top,#4d90fe,#357ae8);
                -webkit-box-shadow: inset 0 0 0 1px #fff;
                -moz-box-shadow: inset 0 0 0 1px #fff;
                box-shadow: inset 0 0 0 1px #fff;
                font-weight: normal;
                box-shadow: 0 3px 8px 0 rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08);
            }

        #editbtn {
            position: absolute;
            margin-top: 2.3%;
            margin-left: 5.5%;
            width: 50px;
            height: 30px;
            /*background-color: #6699FF;
            color: white;*/
            /*background-color: #FFEB3B;
            color: black;*/
            border: 1px solid #FFEB3B;
            color: #000;
            text-shadow: 0 1px rgba(0,0,0,0.1);
            background-color: #4d90fe;
            background-image: -webkit-gradient(linear,left top,left bottom,from(#4d90fe),to(#4787ed));
            background-image: -webkit-linear-gradient(top,#FFEB3B,#FFEB3B);
            background-image: -moz-linear-gradient(top,#4d90fe,#4787ed);
            background-image: -ms-linear-gradient(top,#4d90fe,#4787ed);
            background-image: -o-linear-gradient(top,#4d90fe,#4787ed);
            background-image: linear-gradient(top,#4d90fe,#4787ed);
            font-weight: normal;
            cursor: pointer;
            border-width: 0;
            border-radius: 3px 3px;
        }

            #editbtn:hover {
                border: 1px solid #dac404;
                color: #000;
                text-shadow: 0 1px rgba(0,0,0,0.1);
                background-color: #FFEB3B;
                background-image: -webkit-gradient(linear,left top,left bottom,from(#4d90fe),to(#357ae8));
                background-image: -webkit-linear-gradient(top,#FFEB3B,#FFEB3B);
                background-image: -moz-linear-gradient(top,#4d90fe,#357ae8);
                background-image: -ms-linear-gradient(top,#4d90fe,#357ae8);
                background-image: -o-linear-gradient(top,#4d90fe,#357ae8);
                background-image: linear-gradient(top,#4d90fe,#357ae8);
                -webkit-box-shadow: inset 0 0 0 1px #fff;
                -moz-box-shadow: inset 0 0 0 1px #fff;
                box-shadow: inset 0 0 0 1px #fff;
                font-weight: normal;
                box-shadow: 0 3px 8px 0 rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08);
            }

        .clsmsgcnt {
            background: red;
            border-radius: 47%;
            display: block;
            font-size: 12px;
            font-weight: 100;
            color: white;
            height: 18px;
            left: 15px;
            line-height: 19px;
            margin: auto;
            position: absolute;
            right: 20px;
            text-align: center;
            top: -5px;
            width: 18px;
            text-indent: -2px;
        }

        .clsntfcnt {
            background: red;
            border-radius: 47%;
            display: block;
            font-size: 12px;
            font-weight: 100;
            color: white;
            height: 17px;
            left: 5px;
            line-height: 19px;
            margin: auto;
            position: relative;
            right: 2px;
            text-align: center;
            top: -30px;
            width: 17px;
            text-indent: -2px;
        }

        .notify {
            width: 25px;
            height: 25px;
            margin: 0 0 0 11px;
            background: url('<%=uSystem.uWebconfig.jojsPath.ToString().Trim() + "/images/svgicons.svg"%>') no-repeat -209px -60px;
            vertical-align: text-top;
            display: inline-block;
        }

        .clscallreq {
            width: 25px;
            height: 25px;
            margin: 0 0 0 11px;
            vertical-align: text-top;
            display: inline-block;
            color: white;
            background-color: #ffeb3b;
            border-radius: 50%;
            padding-top: 5px;
            padding-left: 5px;
            z-index: 9999999
        }


        .clscallreq-shake {
            -webkit-animation-name: bounceIn;
            animation-name: bounceIn;
            -webkit-animation-duration: .75s;
            animation-duration: .75s;
            -webkit-animation-duration: 1s;
            animation-duration: 1s;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
        }

        @-webkit-keyframes bounceIn {
            0%, 20%, 40%, 60%, 80%, 100% {
                -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
                transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
            }

            0% {
                opacity: 0;
                -webkit-transform: scale3d(.3, .3, .3);
                transform: scale3d(.3, .3, .3);
            }

            20% {
                -webkit-transform: scale3d(1.1, 1.1, 1.1);
                transform: scale3d(1.1, 1.1, 1.1);
            }

            40% {
                -webkit-transform: scale3d(.9, .9, .9);
                transform: scale3d(.9, .9, .9);
            }

            60% {
                opacity: 1;
                -webkit-transform: scale3d(1.03, 1.03, 1.03);
                transform: scale3d(1.03, 1.03, 1.03);
            }

            80% {
                -webkit-transform: scale3d(.97, .97, .97);
                transform: scale3d(.97, .97, .97);
            }

            100% {
                opacity: 1;
                -webkit-transform: scale3d(1, 1, 1);
                transform: scale3d(1, 1, 1);
            }
        }

        @keyframes bounceIn {
            0%, 20%, 40%, 60%, 80%, 100% {
                -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
                transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
            }

            0% {
                opacity: 0;
                -webkit-transform: scale3d(.3, .3, .3);
                transform: scale3d(.3, .3, .3);
            }

            20% {
                -webkit-transform: scale3d(1.1, 1.1, 1.1);
                transform: scale3d(1.1, 1.1, 1.1);
            }

            40% {
                -webkit-transform: scale3d(.9, .9, .9);
                transform: scale3d(.9, .9, .9);
            }

            60% {
                opacity: 1;
                -webkit-transform: scale3d(1.03, 1.03, 1.03);
                transform: scale3d(1.03, 1.03, 1.03);
            }

            80% {
                -webkit-transform: scale3d(.97, .97, .97);
                transform: scale3d(.97, .97, .97);
            }

            100% {
                opacity: 1;
                -webkit-transform: scale3d(1, 1, 1);
                transform: scale3d(1, 1, 1);
            }
        }


        .mail {
            background: url('<%=uSystem.uWebconfig.jojsPath.ToString().Trim() + "/images/svgicons.svg"%>') no-repeat;
            background-position: -84px -93px;
            width: 23px;
            height: 27px;
            margin: -2px 11px;
            vertical-align: text-top;
            display: inline-block;
        }

        .clsTaskManagement {
            background-image: url('<%=uSystem.uWebconfig.jojsPath.ToString().Trim() + "/images/svgicons.svg"%>');
            background-position: 0px -2456px;
            background-repeat: no-repeat;
            width: 23px;
            height: 27px;
            margin: -6px 11px;
            vertical-align: text-top;
            display: inline-block;
            zoom: 1.3;
        }


        .clsHelp {
            background-image: url('<%=uSystem.uWebconfig.jojsPath.ToString().Trim() + "/images/svgicons.svg"%>');
            background-position: -294px -2165px;
            background-repeat: no-repeat;
            width: 35px;
            height: 35px;
            margin: 0px 0px 0px 16px;
            vertical-align: text-top;
            display: inline-block;
            zoom: 0.8;
        }
        /* End Code For Left Stripe menu hide show*/
        #cls_notification {
            overflow-y: auto;
            overflow-x: hidden;
            max-height: 451px;
        }

            #cls_notification::-webkit-scrollbar {
                width: 5px;
            }

            /* Track */
            #cls_notification::-webkit-scrollbar-track {
                box-shadow: inset 0 0 5px grey;
                border-radius: 10px;
            }

            /* Handle */
            #cls_notification::-webkit-scrollbar-thumb {
                background: #ffeb3b;
                border-radius: 10px;
            }

                /* Handle on hover */
                #cls_notification::-webkit-scrollbar-thumb:hover {
                    background: #b30000;
                }
    </style>


    <style type="text/css">
        .clsvtd {
            display: flex;
            flex-direction: row;
        }

        .dropbtn {
            background-color: #4CAF50;
            color: white;
            padding: 16px;
            font-size: 16px;
            border: none;
            cursor: pointer;
        }

            .dropbtn:hover, .dropbtn:focus {
                background-color: #3e8e41;
            }

        #myInput {
            font-size: 16px;
            padding: 2px 19px 0px 18px;
            border-bottom: 1px solid #ddd;
            background-color: #F1F3F4;
            opacity: 1;
            max-width: 522px;
            border: none;
            border-radius: 2px;
            box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
            height: 34px;
            outline: none;
            transition: box-shadow 200ms cubic-bezier(0.4,0.0,0.2,1);
            width: 360px !important;
            background-color: rgba(255,255,255,.1);
            color: #fff;
        }

            #myInput:hover {
                border: none;
                box-shadow: 0 3px 8px 0 rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08);
            }

            #myInput:focus {
                /*outline: 3px solid #ddd;*/
                outline: 0;
            }

        .dropdown {
            position: relative;
            /* display: inline-block; */
            z-index: 999;
            margin: 0 auto;
            width: 40%;
            margin-left: 10px;
            top: 2px;
        }

        body {
            font-family: Calibri;
        }

        .selected_li {
            background: #eee;
        }

        .MenuContainer {
            width: 358px !important;
            max-height: 283px;
            border: 1px solid #D3DCE6;
            display: none;
            overflow-y: auto;
            position: absolute;
            z-index: 10;
            left: 0;
            border-radius: 2px;
            margin: 0;
            padding: 0;
        }

        .OneMenuFullDiv {
            border-bottom: 1px solid #D3DCE6;
            background: #fff;
        }

        .cls_ulmenus {
            margin: 0;
            padding: 0;
        }

        .HeadMenuName {
            background: #F5F8FA;
            color: #33475b;
            font-weight: 600;
            border-bottom: 1px solid #D3DCE6;
            height: 29px;
            line-height: 1.9;
            text-indent: 15px;
            letter-spacing: 0.5px;
            font-size: 16px;
            color: #33475b;
            font-size: 15px;
            font-weight: 600;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            font-smoothing: antialiased;
            text-shadow: 0 0 1px transparent;
        }

        .SubheadMenuName {
            -webkit-font-smoothing: antialiased;
            font-size: 15px;
            font-weight: 500;
            color: #33475b;
            line-height: 1.5rem;
            margin: 0;
            padding: 0;
            border: 0;
            vertical-align: baseline;
            transition: none;
            text-shadow: 0 0 1px transparent;
            box-sizing: border-box;
            text-indent: 15px;
        }

        .MenuPageName ul {
            margin: 0;
            margin-top: 5px;
            margin-bottom: 9px;
            color: #7c98b6;
            text-overflow: ellipsis;
            display: block;
            white-space: nowrap;
            overflow: hidden;
            font-size: 13px;
            line-height: 1.5;
            text-shadow: 0 0 1px transparent;
        }

            .MenuPageName ul li:hover {
                /*background-color: #ddd;*/
                text-decoration: underline;
                cursor: pointer;
            }

        .search_icon {
            width: 25px;
            height: 25px;
            margin: -9px 0 0 -31px;
            background: url('<%=uSystem.uWebconfig.jojsPath.ToString().Trim() + "/images/svgicons.svg"%>') no-repeat -144px -62px;
            vertical-align: text-top;
            display: inline-block;
            zoom: 0.9;
        }


        @media screen and (min-width: 1600px) {
            .dropdown {
                width: 100% !important;
            }

            #myInput {
                width: 573px !important;
            }

            .MenuContainer {
                width: 521px !important;
            }
        }

        @media screen and (min-width: 1900px) {
            .dropdown {
                width: 100% !important;
            }

            #myInput {
                width: 573px !important;
            }

            .MenuContainer {
                width: 521px !important;
            }
        }
        /*.show {
                display: block;
            }*/


        /* --- Command K Modern UI Styles --- */
        #cmd-k-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6); /* Dim background */
            backdrop-filter: blur(2px);
            z-index: 1000000; /* Highest priority */
            display: none;
            /* Center Content Perfectly */
            display: none; /* Keep hidden by default */
            align-items: flex-start;
            justify-content: center; /* Horizontally Center */
            padding-top: 10vh;
        }

            #cmd-k-overlay[style*="display: block"],
            #cmd-k-overlay[style*="display: inline"] {
                display: flex !important;
            }

        .cmd-k-modal {
            background: #fff;
            width: 600px;
            max-width: 90%;
            border-radius: 8px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            overflow: hidden;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            animation: cmdPopIn 0.2s ease-out;
            /* Ensure it doesn't touch edges on small screens */
            margin: 20px;
            max-height: 80vh; /* Prevent it from being taller than screen */
            display: flex;
            flex-direction: column;
            height: 520px; /* ✅ FIXED HEIGHT */
        }


        @keyframes cmdPopIn {
            from {
                transform: scale(0.98);
                opacity: 0;
            }

            to {
                transform: scale(1);
                opacity: 1;
            }
        }

        .cmd-k-header {
            display: flex;
            align-items: center;
            padding: 16px;
            border-bottom: 1px solid #eee;
        }

        .cmd-k-icon {
            font-size: 18px;
            margin-right: 12px;
            opacity: 0.5;
        }

        #cmd-k-input {
            flex: 1;
            border: none;
            background: transparent;
            font-size: 18px;
            color: #333;
            font-weight: 600;
            outline: none;
            outline: none;
        }

        .cmd-k-esc {
            font-size: 10px;
            background: #eee;
            padding: 4px 8px;
            border-radius: 4px;
            color: #888;
            border: 1px solid #ddd;
        }

        .cmd-k-body {
            flex: 1; /* ✅ Takes remaining space */
            overflow-y: auto;
            padding: 8px;
            min-height: 0; /* Important for flex scrolling */
        }

        .cmd-k-initial {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px;
            padding: 8px;
        }

        @media (max-width: 640px) {
            .cmd-k-initial {
                grid-template-columns: 1fr;
            }
        }

        .cmd-k-panel {
            border-radius: 14px;
            background: #fff;
            padding: 12px;
            display: flex;
            flex-direction: column;
            min-height: 0;
            background: #dddddd17;
        }

        .cmd-k-panel-title {
            font-size: 11px;
            font-weight: 700;
            color: #a1a1aa;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .cmd-k-panel-body {
            flex: 1;
            min-height: 0;
            overflow-y: auto;
        }

        .cmd-k-section-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }



        #cmd-k-results {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .cmd-k-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 9px 10px;
            border-radius: 8px;
            cursor: pointer;
            color: #444;
            transition: background 0.1s;
            border-left: 3px solid transparent;
        }

            .cmd-k-item:hover {
                background: #f5f6f8;
            }

            .cmd-k-item.active {
                background: #f0f4ff;
                border-left: 3px solid #901aa7;
            }

        .cmd-k-item-main {
            font-size: 15px;
            font-weight: 500;
        }

        .cmd-k-item-sub {
            font-size: 12px;
            color: #999;
            margin-left: 10px;
        }

        .app-name {
            font-size: 11px;
            background: #e0e0e0;
            padding: 2px 6px;
            border-radius: 10px;
            color: #555;
        }

        .cmd-k-tag {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .fav-icon {
            cursor: pointer;
        }

        .pagefav-icon {
            color: #f5c518;
            transition: color 0.2s ease;
        }

        .pagenotfav-icon {
            color: white;
            transition: color 0.2s ease;
            stroke: black;
        }

        .cmd-k-empty {
            text-align: center;
            padding: 40px;
            color: #999;
        }

        .cmd-k-footer {
            padding: 8px 16px;
            background: #f9f9f9;
            border-top: 1px solid #eee;
            font-size: 11px;
            color: #aaa;
            display: flex;
            gap: 15px;
        }

        /* Custom Scrollbar */
        .cmd-k-body::-webkit-scrollbar {
            width: 6px;
        }

        .cmd-k-body::-webkit-scrollbar-thumb {
            background-color: #ccc;
            border-radius: 4px;
        }



        /* Search trigger button */
        .search-trigger-de {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 5px 11px;
            font-size: 14px;
            color: #333;
            border-radius: 33px;
            cursor: pointer;
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4);
            transition: all 0.3s ease;
            cursor: pointer;
            font-size: 15px;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 8px;
            width: 100%;
            justify-content: space-between;
            color: #fff;
        }

            .search-trigger-de svg {
                color: #fff;
            }

            .search-trigger-de .label {
                margin-right: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
            }

        .dev svg {
            color: black !important;
        }

        /* Key Hint */
        .key-hint {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 2px 6px;
            font-size: 12px;
            color: #555;
            background: #f2f3f5;
            border: 1px solid #d0d7de;
            border-radius: 4px;
        }

        .search-trigger-de:hover {
            box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
            transform: translateY(-1px);
        }

        /* Style for the Favorite Chips at the bottom */
        .cmd-k-fav-chip {
            display: inline-flex;
            align-items: center;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 6px 12px;
            font-size: 13px;
            color: #475569;
            cursor: pointer;
            transition: all 0.1s ease;
            box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            user-select: none;
        }

            .cmd-k-fav-chip:hover {
                background: #f1f5f9;
                border-color: #cbd5e1;
                color: #0f172a;
                transform: translateY(-1px);
                box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            }

            .cmd-k-fav-chip:active {
                transform: translateY(0);
                background: #e2e8f0;
            }

        :root {
            /* Light Mode Color Palette */
            --bg-surface: #ffffff; /* Menu Background */
            --bg-body: #f3f4f6; /* Page Background (Light Gray) */
            --text-main: #111827; /* Almost Black for strong contrast */
            --text-secondary: #6b7280; /* Dark Gray for secondary text/icons */
            --hover-bg: #f3f4f6; /* Light hover state */
            --accent-green: #4e9f3d; /* Kept the same */
            --border-color: #e5e7eb; /* Very subtle border */
            --shadow-color: rgba(0, 0, 0, 0.1); /* Soft shadow for light mode */
            --badge-bg: #e5e7eb;
            --badge-text: #374151;
        }
        /* The Menu Itself */
        .dropdown_menu_optigo_new {
            display: none; /* Hidden by default */
            position: fixed;
            top: 55px;
            left: 0;
            width: 280px;
            background-color: var(--bg-surface);
            border-radius: 8px;
            /* Softer shadow for light mode */
            box-shadow: 0 4px 20px var(--shadow-color);
            overflow: hidden;
            padding: 8px 0;
            z-index: 1000;
            border: 1px solid var(--border-color);
        }

        /* Sections */
        .menu_section_optigo_new {
            padding: 4px 0;
        }

        .border_bottom_optigo_new {
            border-bottom: 1px solid var(--border-color);
            margin-bottom: 4px;
            padding-bottom: 4px;
        }

            .border_bottom_optigo_new a {
                color: black !important;
            }

        .section_title_optigo_new {
            font-size: 12px;
            font-weight: 600;
            color: var(--text-secondary);
            padding: 8px 16px 4px 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

            .section_title_optigo_new .badge_optigo_new_pro {
                padding: 3px 6px;
                border-radius: 8px;
                font-size: 12px;
                font-weight: 600;
                color: var(--badge-text);
                background-color: var(--badge-bg);
            }

        /* Menu Items */
        .menu_item_optigo_new {
            display: flex;
            align-items: center;
            padding: 8px 16px;
            color: var(--text-main);
            text-decoration: none;
            transition: background 0.2s;
            cursor: pointer;
        }

            .menu_item_optigo_new:hover {
                background-color: var(--hover-bg) !important;
                color: black !important;
            }

        .menu_item_optigo_new_move {
            position: relative;
            display: flex;
            align-items: center;
            padding: 8px 16px;
            color: var(--text-main);
            text-decoration: none;
            cursor: pointer;
            overflow: hidden;
            border-radius: 12px;
            transition: background-color 0.25s ease, color 0.25s ease;
        }

            .menu_item_optigo_new_move::before {
                content: "";
                position: absolute;
                width: 44px;
                height: 44px;
                right: 14px;
                top: 10px;
                background: rgba(139, 92, 246, 0.6);
                border-radius: 999px;
                filter: blur(18px);
                opacity: 0.65;
                animation: glowFloatPrimary 10s ease-in-out infinite;
                z-index: 0;
            }


            .menu_item_optigo_new_move::after {
                content: "";
                position: absolute;
                width: 68px;
                height: 68px;
                right: 34px;
                top: 18px;
                background: rgba(244, 114, 182, 0.45);
                border-radius: 999px;
                filter: blur(24px);
                opacity: 0.55;
                animation: glowFloatSecondary 14s ease-in-out infinite;
                z-index: 0;
            }

        @keyframes glowFloatPrimary {
            0%, 100% {
                transform: translateX(0) translateY(0) scale(1);
                opacity: 0.55;
            }

            50% {
                transform: translateX(-26px) translateY(10px) scale(1.15);
                opacity: 0.9;
            }
        }

        @keyframes glowFloatSecondary {
            0%, 100% {
                transform: translateX(0) scale(1);
                opacity: 0.45;
            }

            50% {
                transform: translateX(-44px) scale(1.1);
                opacity: 0.7;
            }
        }


        /* ─── IDLE ANIMATIONS (subtle, slow) ─── */
        @keyframes idlePulse {
            0%, 100% {
                transform: scale(1) translateY(0);
                opacity: 0.12;
            }

            50% {
                transform: scale(1.05) translateY(-2px);
                opacity: 0.18;
            }
        }

        @keyframes idleDrift {
            0%, 100% {
                transform: translateX(0);
                opacity: 0.08;
            }

            50% {
                transform: translateX(-6px);
                opacity: 0.14;
            }
        }

        .menu_item_optigo_new_move:hover {
            background-color: var(--hover-bg);
            color: black;
        }

            /* ─── HOVER MOTION (confident) ─── */
            .menu_item_optigo_new_move:hover::before {
                animation: none;
                opacity: 0.9;
                transform: translateX(-26px) translateY(10px) scale(1.15);
            }

            .menu_item_optigo_new_move:hover::after {
                animation: none;
                opacity: 0.7;
                transform: translateX(-44px) scale(1.1);
            }

        .menu_item_optigo_new_move > * {
            position: relative;
            z-index: 1;
        }



        /* Icons and Text */
        .icon_optigo_new {
            width: 20px;
            text-align: center;
            margin-right: 12px;
            color: var(--text-main); /* Changed to main text color for high contrast */
            font-size: 16px;
        }

        .text_optigo {
            font-size: 14px;
            flex-grow: 1;
            font-weight: 500; /* Added slightly more weight for legibility in light mode */
        }

        .ml-auto_optigo_new {
            margin-left: auto;
        }

        .arrow-icon {
            font-size: 12px;
            color: var(--text-secondary);
        }

        /* User Profile Specifics */
        .user_card_optigo_new {
            display: flex;
            align-items: center;
        }

        .user-img {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            margin-right: 12px;
            object-fit: cover;
        }

        .gold-border {
            border: 2px solid #ffd700;
        }

        .team-avatar_optigo {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background-color: #e7d800;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            margin-right: 12px;
        }

        .user_info_optigo_new {
            flex-grow: 1;
        }

            .user_info_optigo_new .name_optigo {
                font-size: 14px;
                font-weight: 600;
                color: var(--text-main);
            }

            .user_info_optigo_new .email_optigo {
                font-size: 12px;
                color: var(--text-secondary);
                margin-top: 2px;
            }

        /* Beta Badge */
        .badge_optigo_new {
            background-color: var(--badge-bg);
            color: var(--badge-text);
            font-size: 10px;
            padding: 2px 6px;
            border-radius: 4px;
            margin-left: 8px;
            margin-right: 8px;
            font-weight: 700;
        }

        .badge_optigo_new_pro {
            background-color: goldenrod;
            color: #fff;
            font-size: 10px;
            padding: 2px 6px;
            border-radius: 4px;
            margin-left: 8px;
            margin-right: 8px;
            font-weight: 700;
        }

        .logout_optigo {
            background-color: rgba(255, 0, 0, 0.055);
        }

            .logout_optigo:hover {
                background-color: rgba(255, 0, 0, 0.377);
            }

        .user_card_optigo_new {
            cursor: pointer;
        }



        #centerontainer {
            cursor: pointer;
            position: absolute;
            top: 12px;
            display: flex;
            left: 200px;
        }

        .cmd-k-fav-list {
            overflow-y: auto !important;
        }

            /* Chrome, Edge, Safari */
            .cmd-k-fav-list::-webkit-scrollbar {
                width: 8px !important;
            }

            .cmd-k-fav-list::-webkit-scrollbar-track {
                background: #f0f0f0 !important;
                border-radius: 4px !important;
            }

            .cmd-k-fav-list::-webkit-scrollbar-thumb {
                background: #c0c0c0 !important;
                border-radius: 4px !important;
            }

                .cmd-k-fav-list::-webkit-scrollbar-thumb:hover {
                    background: #a0a0a0 !important;
                }
    </style>


    <%-- Upgrade Schedule css --%>
    <style>
        #maintenanceOverlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #1f2330;
            z-index: 999999;
            display: none;
        }

        .maintenanceContent {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            width: 600px;
            text-align: center;
            color: white;
            font-family: Segoe UI;
        }

        .maintenanceIcon {
            font-size: 70px;
        }

        .maintenanceTitle {
            font-size: 28px;
            font-weight: bold;
            margin-top: 15px;
        }

        .maintenanceMessage {
            margin-top: 15px;
            font-size: 16px;
        }

        .maintenanceTimer {
            font-size: 70px;
            font-weight: bold;
            margin-top: 25px;
        }

        .maintenanceProgress {
            width: 100%;
            height: 12px;
            background: #444;
            border-radius: 10px;
            margin-top: 25px;
            overflow: hidden;
        }

        .maintenanceProgressBar {
            width: 0%;
            height: 100%;
            background: #ff6b6b;
        }
        /* #toastContainer{
            position:fixed;
            bottom:20px;
            right:20px;
            z-index:9999;
        }

        .upgradeToast{
            width:320px;
            background:#2f3147;
            color:white;
            border-radius:12px;
            padding:22px;
            box-shadow:0 12px 30px rgba(0,0,0,0.4);
            transform:translateX(420px);
            opacity:0;
            transition:all 0.4s ease;
            font-family:'Segoe UI';
        }

        .upgradeToast.show{
            transform:translateX(0);
            opacity:1;
        }

        .toastIcon{
            font-size:32px;
            text-align:center;
        }

        .toastTitle{
            text-align:center;
            font-size:18px;
            margin-top:6px;
            font-weight:600;
        }

        .toastVersion{
            text-align:center;
            font-size:13px;
            opacity:0.8;
        }

        .toastTimer{
            text-align:center;
            font-size:42px;
            font-weight:bold;
            margin-top:10px;
        }

        .toastMessage{
            text-align:center;
            font-size:13px;
            margin-top:10px;
            opacity:0.9;
        }

        .progress{
            height:6px;
            background:#3e4060;
            border-radius:4px;
            margin-top:15px;
            overflow:hidden;
        }

        .progressBar{
            height:100%;
            width:0%;
            background:#ff6b6b;
            transition:width 1s linear;
        }*/

        #toastContainer {
            position: fixed;
            top: 60px;
            right: 24px;
            z-index: 99999;
        }

        .clean-toast-wrapper {
            transform: translateX(450px);
            opacity: 0;
            transition: all 0.5s ease;
            margin-bottom: 15px;
        }

            .clean-toast-wrapper.show {
                transform: translateX(0);
                opacity: 1;
            }

        /*  .clean-toast {
            width: 360px;
            background: #ffffff;
            border: 1px solid #eaeaea;
            border-radius: 12px;
            padding: 18px;
            box-shadow: 0 12px 30px rgba(0,0,0,.08);
            position: relative;

            display: flex;
            align-items: flex-start;
        }
*/
        .clean-toast {
            width: 360px;
            background: #ffffff;
            border: 1px solid #eaeaea;
            border-radius: 12px;
            padding: 18px;
            box-shadow: 0 12px 30px rgba(0,0,0,.08);
            position: relative;
        }

        .alert-toast {
            display: flex;
            align-items: flex-start;
        }

        .countdown-toast {
            display: block;
        }

        .toast-header-group {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 8px;
        }

        .toast-dot-indicator {
            width: 8px;
            height: 8px;
            background: #6400b8;
            border-radius: 50%;
        }

        .toast-title {
            font-size: 14px;
            font-weight: 600;
            color: #111;
        }

        .toast-desc {
            font-size: 13px;
            color: #666;
            line-height: 1.6;
        }

        .toast-hairline {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 3px;
            width: 100%;
            background: linear-gradient(90deg,#6400b8,#8d0096);
        }

        .countdown-number {
            text-align: center;
            font-size: 42px;
            font-weight: bold;
            margin-top: 15px;
            color: #6400b8;
        }

        .progress {
            height: 6px;
            background: #f2f2f2;
            border-radius: 4px;
            margin-top: 15px;
            overflow: hidden;
        }

        .progressBar {
            height: 100%;
            width: 0%;
            background: linear-gradient(90deg,#6400b8,#8d0096);
            transition: width 1s linear;
        }

        /* ONLY ALERT TOAST */

        .alert-toast .toast-main-content {
            flex: 1;
        }

        .alert-toast .toast-controls {
            margin-left: 10px;
        }

        .alert-toast .toast-minimize-btn {
            width: 24px;
            height: 24px;
            border: none;
            border-radius: 6px;
            background: #f3f3f3;
            cursor: pointer;
            font-size: 16px;
            line-height: 20px;
        }

            .alert-toast .toast-minimize-btn:hover {
                background: #e8e8e8;
            }

        .alert-toast .minimized-indicator {
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            justify-content: center;
            align-items: center;
            font-size: 26px;
            color: #6400b8;
        }

        .alert-toast.collapsed {
            width: 60px !important;
            height: 60px !important;
            border-radius: 50%;
            padding: 0;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
        }

            .alert-toast.collapsed .toast-main-content,
            .alert-toast.collapsed .toast-controls,
            .alert-toast.collapsed .toast-hairline {
                display: none;
            }

            .alert-toast.collapsed .minimized-indicator {
                display: flex;
            }
    </style>

    <script type="text/javascript">
        var di = '<%=ufcc.ToString().Trim()%>';
        var En_ufcc = '<%=En_ufcc.ToString().Trim()%>';
        var En_UI = '<%=En_UId.ToString().Trim()%>';
        var En_UN = '<%=En_UName.ToString().Trim()%>';
        var En_UC = '<%=ccode.ToString().Trim()%>';
        var En_IMP = '<%=En_IMP.ToString().Trim()%>';
        var En_DIN = '<%=En_DIN.ToString().Trim()%>';
        var address = '<%= uSystem.uWebconfig.Socket_Address %>/optiogo-backend';
        var SoPath = '<%= uSystem.uWebconfig.Socket_Path %>';
        var arrdontshowme_pageid = new Array();
        var iTaskCallBackURL = '';
        var _VC = '<%=(objUser!=null? EncodeString.EncodeString.Encode(objUser.VC.ToString().Trim()):"")%>';
        var _ProjectVersion = '<%=(objUser!=null && objUser.ProjectVersion!=null ? objUser.ProjectVersion.ToString().Trim():"")%>';
        var _UploadLogicalPath = '<%=uSystem.uWebconfig.UploadLogicalPath.ToString().Trim()%>';
        var _UserDomain = "<%=UserDomain.ToString().Trim()%>";
        var _AdminDomain = "<%=AdminDomain.ToString().Trim()%>";
        var _SystemLoginId = '<%=(objUser!=null? objUser.id:0)%>';
        var LTKN = '<%=(objUser != null && objUser.UserID != null && objUser.ToString() != ""?EncodeString.EncodeString.Encode(objUser.Logintoken):"")%>';

    </script>
    <%--<script src="../UserDefineJS/Web_Socket.js" type="text/javascript"></script>--%>
    <script src="<%=uSystem.uWebconfig.jojsPath.Trim()%><%=(objUser!=null?objUser.UDJSFolName:"")%>/UserDefineJS/Web_Socket.js" type="text/javascript"></script>
    <script src="<%=uSystem.uWebconfig.jojsPath.Trim()%><%=(objUser!=null?objUser.UDJSFolName:"")%>/UserDefineJS/Upgrade_Schedule.js" type="text/javascript"></script>
    <script type="text/javascript">

        var ADPT = '<%=Auto_DomainPath.ToString().Trim()%>';
        var searchArr = [];
        var helpuser = 'User';
        var menu_index = 1;
        function inc(container, value) {
            var returnValue = false;
            var pos = container.indexOf(value);
            if (pos >= 0) {
                returnValue = true;
            }
            return returnValue;
        }
        function Fn_PageRights() {
            for (var m = 0; m < _AppUserPageRights.length; m++) {
                //if ($.trim(parent._AppUserPageRights[m][0]).toLowerCase() == $.trim(myAppname).toLowerCase()) {
                var MTSP = $.trim(_AppUserPageRights[m][1]).split("#@#-#@#");
                var _appsname = _AppUserPageRights[m][0];
                var _menuname = MTSP[0];
                var _title = MTSP[1];
                var _submenuname = MTSP[2];
                var _pagename_url = MTSP[3];

                var _pagename = MTSP[4];
                var _formappsid = MTSP[5];
                var _id = MTSP[6];
                var _IsGroupedMenu = MTSP[7];
                var _IsBeta = MTSP[8];
                var _IsNew = MTSP[9];
                var _IsFav = ConToIntVal(MTSP != null && MTSP.length > 15 ? MTSP[15] : 0);
                var _FavOrder = ConToIntVal(MTSP != null && MTSP.length > 16 ? MTSP[16] : 0);
                var _FU_Cnt = ConToIntVal(MTSP != null && MTSP.length > 17 ? MTSP[17] : 0);

                if (_formappsid != undefined && _formappsid != null && !_formappsid == "0" && !_formappsid == "") {

                    if (_formappsid == "17") {
                        //_pagename_url = _pagename_url + "/" + _YC + "/" + _SV;
                    }
                    else {
                        if ($.trim(_pagename_url).indexOf("?") != -1) {
                            _pagename_url = _pagename_url + "&-=" + _LT;
                        }
                        else {
                            _pagename_url = _pagename_url + "?-=" + _LT;
                        }
                    }

                }

                if (_AppUserPageRights[m][0] != 'C_MFG' && _AppUserPageRights[m][0] != 'ORAIL_ADMIN' && _AppUserPageRights[m][0] != 'MYACCOUNT'
                    || (_vroleid == '-2' && _AppUserPageRights[m][0] == 'ORAIL_ADMIN' && _AppUserPageRights[m][0] != 'C_MFG' && _AppUserPageRights[m][0] != 'MYACCOUNT')) {
                    searchArr.push({
                        appsname: _appsname
                        , menuname: _menuname
                        , title: _title
                        , submenuname: _submenuname
                        , pagename_url: _pagename_url
                        , pagename: _pagename
                        , formappsid: _formappsid
                        , id: _id
                        , IsGroupedMenu: _IsGroupedMenu
                        , IsBeta: _IsBeta
                        , IsNew: _IsNew
                        , IsFav: _IsFav
                        , FavOrder: _FavOrder
                        , FUCnt: _FU_Cnt
                    });

                }
            }
            localStorage.setItem('searchArr', JSON.stringify(searchArr));


            searchArr.sort(function (a, b) {
                var nameA = a.appsname.toLowerCase(), nameB = b.appsname.toLowerCase()
                if (nameA < nameB) //sort string ascending
                    return -1
                if (nameA > nameB)
                    return 1
                return 0 //default return value (no sorting)
            });
        }
        $(document).ready(function () {
            localStorage.setItem("IsUserUpdate", "0");

            fill_arrdontshowme_pageid();
            Fn_PageRights();


            $('iframe').load(function () {
                $(".loading").remove();
                //alert("iframe is done loading")
            }).show();

            $('#myInput').keyup(function (e) {

                if (e.keyCode == 40) {   //down     
                    if ($('.selected_li').length <= 0) {
                        $('#sp_page_1').addClass('selected_li');
                        $("#myInput").val($('.selected_li').data("value"));
                    } else if ($('#sp_page_' + (menu_index + 1) + '').length > 0) {
                        $('#sp_page_' + menu_index + '').removeClass('selected_li');
                        menu_index++;
                        $('#sp_page_' + menu_index + '').addClass('selected_li');
                        $("#myInput").val($('.selected_li').data("value"));
                    }
                    else {
                        $('.selected_li').removeClass('selected_li');
                        $('#sp_page_1').addClass('selected_li');
                        $("#myInput").val($('.selected_li').data("value"));
                        menu_index = 1;
                    }

                    $(".MenuContainer").scrollTop(0);//set to top
                    $(".MenuContainer").scrollTop($('.selected_li').offset().top - $(".MenuContainer").height());

                } else if (e.keyCode == 38) {  //up      
                    if (menu_index > 0) {
                        $('#sp_page_' + menu_index + '').removeClass('selected_li');
                        menu_index--;
                        $('#sp_page_' + menu_index + '').addClass('selected_li');
                        $("#myInput").val($('.selected_li').data("value"));


                        $(".MenuContainer").scrollTop(0);//set to top
                        $(".MenuContainer").scrollTop($('.selected_li').offset().top - $(".MenuContainer").height());
                    }
                } else if (e.keyCode == 13) {
                    var s = $.trim($('#myInput').val());
                    if (s != "" && $.trim(s.replace('/', '')) != "" && !isNaN(parseInt(s.replace('/', '') / 10))) {
                        JobQuickSearch(s);
                    }
                }
                else {
                    $('.selected_li').removeClass('selected_li');
                    menu_index = 1;
                    var _value = $.trim($('input#myInput').val());
                    if ($.trim(_value).length == 0 || $.trim(_value).length > 1) {
                        filterFunction('search');
                    }
                }
            });




        });


        $(document).keydown(function (e) {
            if (e.keyCode == 13) {
                if ($('.selected_li').length > 0) {
                    $('.selected_li').click();
                }
            }
        });


        function fill_arrdontshowme_pageid() {

            $.ajax({
                url: '../Ajax/Ajax_versionhelp.aspx',
                type: 'POST',
                data: 'mode=getdontshowme',
                dataType: 'json',
                success: function (data) {
                    if (data != undefined && data != null) {

                        if (data.length > 0
                        ) {
                            $.each(data, function (e, res) {
                                arrdontshowme_pageid.push(res['pageid']);
                            });
                        }

                    }
                }
            });
        }

        function filterFunction(type) {
            var FilteredMenuDetails = '';
            var filterdata = '';

            var value = $.trim($('input#myInput').val());
            $('#myDropdown').html('');

            var appstr = '';
            var menustr = '';
            var menupage = '';
            var dotIndex = value.indexOf('..');
            var slashIndex = value.indexOf('/');
            var tempArr = [];
            var tempArr2 = [];


            if (type == 'fav' || value == "") {
                FilteredMenuDetails = searchArr.filter(function (X) { return X.IsFav == 1 }).sort(function (a, b) {
                    var nameA = a.FavOrder, nameB = b.FavOrder
                    if (nameA < nameB) //sort string ascending
                        return -1
                    if (nameA > nameB)
                        return 1
                    return 0 //default return value (no sorting)
                });
            }
            else {
                if (dotIndex != -1 || slashIndex != -1) {
                    if (dotIndex != -1 && slashIndex != -1 && dotIndex > slashIndex) {
                        //-  pagename/appname..menuname
                        //-  /appname..menuname;

                        tempArr = value.split('..');
                        tempArr2 = tempArr[0].split('/');
                        menupage = tempArr2[0];
                        menustr = tempArr[1];
                        appstr = tempArr2[1];
                    } else if (dotIndex != -1 && slashIndex != -1 && slashIndex > dotIndex) {
                        //-  pagename..menuname/appname
                        //-  ..menuname/appname
                        tempArr = value.split('/');
                        tempArr2 = tempArr[0].split('..');
                        menupage = tempArr2[0];
                        //menustr = tempArr[1];
                        menustr = tempArr[0].split("..")[1];
                        appstr = tempArr[1];

                    } else if (dotIndex == -1 && slashIndex != -1) {
                        //-  /appname
                        //-  pagename/appname
                        tempArr = value.split('/');
                        menupage = tempArr[0];
                        menustr = "";
                        appstr = tempArr[1];
                    } else if (slashIndex == -1 && dotIndex != -1) {
                        //-  ..menuname
                        //-  pagename..menuname
                        tempArr = value.split('..');
                        menupage = tempArr[0];
                        menustr = tempArr[1];
                        appstr = "";
                    }
                    else {
                        menupage = value;
                    }
                }
                else {
                    //-  pagename
                    menupage = value;
                }
                menupage = $.trim(menupage);
                menustr = $.trim(menustr);
                appstr = $.trim(appstr);


                //FilteredMenuDetails = searchArr.filter(X => ( X.appsname.toLowerCase().inc($.trim(appstr.toLowerCase())) || X.menuname.toLowerCase().inc($.trim(menustr.toLowerCase())) ||  X.submenuname.toLowerCase().inc($.trim(menupage.toLowerCase())) ) );         
                FilteredMenuDetails = searchArr.filter(function (X) { return inc(X.submenuname.toLowerCase(), $.trim(menupage.toLowerCase())) });

                if (menupage.indexOf(' ') != -1) {

                    var spaceArr = menupage.split(' ');

                    if (spaceArr.length > 1) {
                        var regex = ''; //(/^r.*\sa.*\sr.*/i)    
                        for (var si = 0; si < spaceArr.length; si++) {
                            if (si == spaceArr.length - 1) {
                                regex = regex + spaceArr[si].toLowerCase() + '.*';
                                regex = regex + spaceArr[si].toLowerCase() + '.*';
                            }
                            else {
                                regex = regex + spaceArr[si].toLowerCase() + '.*\\s';
                            }

                        }
                        //regex = regex + '/i';                   
                        var rx = new RegExp(regex, 'i');

                        FilteredMenuDetails = searchArr.filter(function (X) { return (X.submenuname.toLowerCase().match(rx)) });
                        //FilteredMenuDetails = searchArr.filter(X => (  X.appsname.toLowerCase().match(rx) ||  X.menuname.toLowerCase().match(rx) || X.submenuname.toLowerCase().match(rx)  )) ;
                    }
                }



                if (menustr) {
                    if (FilteredMenuDetails.length > 0) {
                        FilteredMenuDetails = FilteredMenuDetails.filter(function (X) { return inc(X.menuname.toLowerCase(), $.trim(menustr)) });
                    }
                    else {
                        FilteredMenuDetails = searchArr.filter(function (X) { return inc(X.menuname.toLowerCase(), $.trim(menustr)) });
                    }
                }

                if (appstr) {
                    if (FilteredMenuDetails.length > 0) {
                        FilteredMenuDetails = FilteredMenuDetails.filter(function (X) { return inc(X.appsname.toLowerCase(), $.trim(appstr)) });
                    }
                    else {
                        FilteredMenuDetails = searchArr.filter(function (X) { return inc(X.appsname.toLowerCase(), $.trim(appstr)) });
                    }
                }
            }




            var MenuBlock = [];
            var AppBlock = [];
            var k = 1;

            for (var i = 0; i < FilteredMenuDetails.length; i++) {
                if (MenuBlock.filter(function (X) { return (X.appsname == FilteredMenuDetails[i]["appsname"] && X.menuname == FilteredMenuDetails[i]["menuname"]) }).length < 1) {
                    var FilterSubmenu = '';
                    filterdata += '<li class="OneMenuFullDiv" style="display: block;">'
                        + '<ul class="cls_ulmenus">';
                    if (AppBlock.indexOf(FilteredMenuDetails[i]["appsname"]) == -1) {
                        //filterdata += '<li class="HeadMenuName" style="display: block;">' + FilteredMenuDetails[i]["appsname"] +'</li>';                       
                        AppBlock.push(FilteredMenuDetails[i]["appsname"]);
                    }

                    //filterdata += '  <li class="SubheadMenuName" style="display: block;">' + FilteredMenuDetails[i]["menuname"] +'</li>'
                    filterdata += '  <li class="MenuPageName" style="display: block;">'
                        + '  <ul style="display: block;line-height:1.2;">';
                    MenuBlock.push({ appsname: FilteredMenuDetails[i]["appsname"], menuname: FilteredMenuDetails[i]["menuname"] });

                    FilterSubmenu = FilteredMenuDetails.filter(function (X) { return (X.appsname == FilteredMenuDetails[i]["appsname"] && X.menuname == FilteredMenuDetails[i]["menuname"]) });
                    var _pagenameurl = '', _formappsid = '';
                    for (var j = 0; j < FilterSubmenu.length; j++) {
                        _pagenameurl = FilterSubmenu[j]["pagename_url"];
                        _formappsid = FilterSubmenu[j]["formappsid"];

                        if (_formappsid != undefined && _formappsid != null && !_formappsid == "0" && !_formappsid == "") {
                            if (_formappsid == "17") {
                                //_pagenameurl = _pagenameurl + "/" + _YC + "/" + _SV;
                            } else {
                                if ($.trim(_pagenameurl).indexOf("?") != -1) {
                                    _pagenameurl = _pagenameurl + "&-=" + _LT;
                                }
                                else {
                                    _pagenameurl = _pagenameurl + "?-=" + _LT;
                                }
                            }

                        }
                        //---------1
                        filterdata += '<li class="cls_menupage" style="margin-top:5px" data-value="' + FilterSubmenu[j]["submenuname"] + '" id="sp_page_' + k + '" onclick="PageUselog(\'' + FilterSubmenu[j]["title"] + '\',\'icon-' + FilterSubmenu[j]["submenuname"].replace(/ /g, '') + '\',\'' + _pagenameurl + '\',\'' + FilterSubmenu[j]["id"] + '\',\'' + FilterSubmenu[j]["IsGroupedMenu"] + '\',\'' + _formappsid + '\')">' + '<div class="cls-submenu-name" >' + FilterSubmenu[j]["submenuname"] + '</div>' + '<br><div class="cls-app-name" style="padding:0px 0px 0px 10px !important;">/' + FilteredMenuDetails[i]["appsname"] + '</div>' + '  <div class="cls-menu-name" >..' + FilteredMenuDetails[i]["menuname"] + '</div>' + '</li>';

                        k++;
                    }

                    filterdata += '</ul></ul></li>';
                }
            }
            $('#myDropdown').append(filterdata);

            if (filterdata) {
                $('#myDropdown').css('display', 'block');
                $('.bckDisablesearch').css('display', 'block');
                $('#myInput').css({ 'z-index': '999999', 'background-color': '#fff', 'color': 'black' });
                $('#myDropdown').css('z-index', '999999');
            } else {
                $('#myDropdown').hide();
                $('.bckDisablesearch').css('display', 'none');
                $('#myInput').css({ 'z-index': '0', 'background-color': 'rgba(255,255,255,.1)', 'color': '#fff' });
                $('#myDropdown').css('z-index', '10');
            }
        }

    </script>
    <script type="text/javascript">
        var _dy = '<%=_dy.ToString().Trim()%>';
        var _IPaddress = '<%=_IPaddress.ToString().Trim()%>';
        var loginid = "<%=loginid.ToString().Trim()%>";
        var _uf = '<%=_enc_ufcc.ToString().Trim()%>';
        var _Extension = '<%=uSystem.uWebconfig.Extension.ToString().Trim()%>';
        var _cid = '<%=cid.ToString().Trim()%>';
        var _cuid = '<%=cuid.ToString().Trim()%>';
        var _ccode = '<%=ccode.ToString().Trim()%>';
        var _rid = '<%=rid.ToString().Trim()%>';
        var _ltkn = '<%=ltkn.ToString().Trim()%>';
        var _hostname = '<%=hostname.ToString().Trim()%>';
        var isNotOff = 0;
        var isVersionNotOff = 0;
        var dataStore = window.sessionStorage;
        var JJPT = "<%=(uSystem.uWebconfig.jojsPath!=null?uSystem.uWebconfig.jojsPath.ToString().Trim():"")%>";
        var _ItemMaster_isDiamondAllowed =<%=(ItemMaster_isDiamondAllowed!=null?ItemMaster_isDiamondAllowed.ToString().Trim():"")%>;
        var _ItemMaster_isColorStoneAllowed =<%=(ItemMaster_isColorStoneAllowed!=null?ItemMaster_isColorStoneAllowed.ToString().Trim():"")%>;
        var _ItemMaster_IsMetalAllowed =<%=(ItemMaster_IsMetalAllowed!=null?ItemMaster_IsMetalAllowed.ToString().Trim():"")%>;
        var _ItemMaster_isMountAllowed =<%=(ItemMaster_isMountAllowed!=null?ItemMaster_isMountAllowed.ToString().Trim():"")%>;
        var _ItemMaster_isFindingAllowed =<%=(ItemMaster_isFindingAllowed!=null?ItemMaster_isFindingAllowed.ToString().Trim():"")%>;
        var _ItemMaster_isMiscAllowed =<%=(ItemMaster_isMiscAllowed!=null?ItemMaster_isMiscAllowed.ToString().Trim():"")%>;

        dataStore.setItem("LOGINURL_JSSession", ADPT + "login/");
        dataStore.setItem("ajaxloaderimg", JJPT + '/images/ajax-loader.gif');
        dataStore.setItem("isDiamondAllowed_JSSession", _ItemMaster_isDiamondAllowed);
        dataStore.setItem("isColorStoneAllowed_JSSession", _ItemMaster_isColorStoneAllowed);
        dataStore.setItem("IsMetalAllowed_JSSession", _ItemMaster_IsMetalAllowed);
        dataStore.setItem("isMountAllowed_JSSession", _ItemMaster_isMountAllowed);
        dataStore.setItem("isFindingAllowed_JSSession", _ItemMaster_isFindingAllowed);
        dataStore.setItem("isMiscAllowed_JSSession", _ItemMaster_isMiscAllowed);
        dataStore.setItem("jojsPath", JJPT);
        dataStore.setItem("hostname", _hostname);

    </script>



    <script>
        //$(document).ready(function(){
        //    $('.expose').css('z-index', '99999');
        //    $('#overlay').fadeIn(300);

        //    $('#overlay').click(function (e) {
        //        $('#overlay').fadeOut(300, function () {
        //            $('.expose').css('z-index', '1');
        //        });
        //    });
        //})
        $(window).load(function () {

            setTimeout(function () {
                $('#callbackbutton').show();
            }, 5000)



            $('.clscallreq').addClass('clscallreq-shake');
            setInterval(function () {
                $('.clscallreq').toggleClass('clscallreq-shake');
            }, 1500)
        });




    //$('.expose').click(function (e) {
    //    $(this).css('z-index', '99999');
    //    $('#overlay').fadeIn(300);
    //});

    //$('#overlay').click(function (e) {
    //    $('#overlay').fadeOut(300, function () {
    //        $('.expose').css('z-index', '1');
    //    });
    //});
    </script>


    <%--HeaderDropDown for mobile view starts..--%>
    <script type="text/javascript">
        var _vroleid = "<%=mastermanagement_roleid.Value.ToString().Trim()%>";
        var _hdnIsShowHelp = "<%=hdnIsShowHelp.Value.ToString().Trim()%>";
        var _LT = "<%=LT.ToString().Trim()%>";
        var _LL = "<%=LL.ToString().Trim()%>";
        var pageX = 0, pageY = 0;
        $(document).mousedown(function (e, event) {
            pageX = e.clientX;
            pageY = e.clientY;
        });
        var FavOrder = 0;
        function fn_BindHeaderDropDown() {
            // Create the dropdown base
            $("<select />").appendTo("#divQuickFavourite");
            // Create default option "Go to..."
            $("<option />", {
                "selected": "selected",
                "value": "0",
                "text": "Tabs"
            }).appendTo("#divQuickFavourite select");
            // Populate dropdown with menu items
            $("#divQuickFavourite span").each(function () {
                var el = $(this);

                $("<option />", {
                    "value": el.text().replace(/ /g, '_'),
                    "text": el.text()
                }).appendTo("#divQuickFavourite select");
                var ind = searchArr.findIndex(function (x) {
                    return x.submenuname == $.trim(el.text());
                });
                if (ind != -1) {
                    searchArr[ind]["IsFav"] = 1;
                    searchArr[ind]["FavOrder"] = FavOrder;
                    FavOrder++;
                }
            });
            // To make dropdown actually work
            $("#divQuickFavourite select").change(function () {
                var spnid = $(this).find("option:selected").val();
                if (spnid != "0") {
                    $('#spn' + spnid).click();
                }
            });
        }
    </script>
    <%--HeaderDropDown for mobile view ends..--%>
    <script type="text/javascript">
        var apparr = new Array();
        $(window).load(function () {

            //show();
            //$('#iframeLoading').show();
        });
        function show() {
            //$('#dvLoading').hide();

            $('#iframeLoading').hide();
            $('#myInput').show();

        };
        var preloadedFont = new Image();
        preloadedFont.onload = function () {
            preloadedFont = null;
        };
        preloadedFont.src = JJPT + '/images/loading_bar0.gif';
        var NotCloseTab = ['My Apps', 'WELCOME'];
        var printWin; //do not remove from hear
        $(document).ready(function () {
            $('.accordion-body').css('background', 'url(' + JJPT + '/images/subbg.jpg) #a0adb3 repeat-x');
            setTimeout(function () {
                //$('.layout-button-left').click();
                $('.LeftSideHideMenuPane').click();

            }, 1100);
            setTimeout(show, 1600);
        });


        function menupanel(mymenuname) {
            if ($('#' + mymenuname.toString().replace(/ /g, '').replace(/\//g, '')).css('display') == 'block') {
                $('#' + mymenuname.toString().replace(/ /g, '').replace(/\//g, '')).css('display', 'none');
            } else {
                $('#' + mymenuname.toString().replace(/ /g, '').replace(/\//g, '')).css('display', 'block');
            }
        }
        function windowresize() {
            var opera = (navigator.userAgent.indexOf("Opera") >= 0) ? true : false;
            var ie = (document.all && !opera) ? true : false;
            var winHeight;
            var winWidth;
            if (parseInt(navigator.appVersion) > 3) {
                if (ie) {
                    document.body.scroll = 'no';
                    winHeight = document.documentElement.clientHeight - 35;
                }
                else {
                    document.body.scroll = 'no';
                    winHeight = window.innerHeight - 35;
                }
            }
            //$('.iframe_container_tab').each(function () {
            //    // Force the height on the new library's iframes
            //    $(this).height(winHeight);
            //});
            $('iframe').each(function () {

                if ($(this).attr("src") && $(this).attr("src").indexOf('/myapps/') != -1) {
                }
                else {
                    $(this).height(winHeight);
                }
            });
        }
    </script>


    <script type="text/javascript">

        // Start Code For Left Stripe menu hide show
        $(document).ready(function () {

            var LeftSideHideMenuPaneflg = true;


            $('.LeftSideHideMenuPane').on('click', function () {
                var t_ele = $(this);
                if (!isDoubleClicked(t_ele)) {
                    try {
                        var $button = $(this);
                        if ($button.data('alreadyclicked')) {
                            $button.data('alreadyclicked', false); // reset

                            if ($button.data('alreadyclickedTimeout')) {
                                clearTimeout($button.data('alreadyclickedTimeout')); // prevent this from happening
                            }
                            // do what needs to happen on double click. 
                            if (LeftSideHideMenuPaneflg) {
                                $('.layout-button-left').click().after(function () {
                                    $('.panel-split').hide();
                                });
                                LeftSideHideMenuPaneflg = false;
                            }
                            else {
                                $('.panel-body').click();
                                //$('.layout-split-west').css({'display': 'block', 'left': '0px'}); 
                                //$('.layout-panel-center').css({'width': '1421px', 'left': '179px'}); 
                                //$('.layout-button-right').click();                   
                                LeftSideHideMenuPaneflg = true;
                                $('#divheadeprojectlogo,#divrightimage').css('display', 'none');
                                $('#divQuickFavourite').css('margin-left', '0px');
                            }
                            clearSelection();
                        } else {
                            $button.data('alreadyclicked', true);
                            var alreadyclickedTimeout = setTimeout(function () {
                                $button.data('alreadyclicked', false); // reset when it happens
                                if (LeftSideHideMenuPaneflg) {
                                    $('.layout-button-left').click().after(function () {
                                        $('.panel-split').hide();
                                    });
                                    LeftSideHideMenuPaneflg = false;
                                }
                                else {
                                    $('.panel-body').click();
                                    //$('.layout-split-west').css({'display': 'block', 'left': '0px'}); 
                                    //$('.layout-panel-center').css({'width': '1421px', 'left': '179px'}); 
                                    //$('.layout-button-right').click();                   
                                    LeftSideHideMenuPaneflg = true;
                                    $('#divheadeprojectlogo,#divrightimage').css('display', 'none');
                                    $('#divQuickFavourite').css('margin-left', '0px');
                                }
                                // do what needs to happen on single click. 
                                // use el instead of $(this) because $(this) is 
                                // no longer the element
                            }, 200); // <-- dblclick tolerance here
                            $button.data('alreadyclickedTimeout', alreadyclickedTimeout); // store this id to clear if necessary
                        }
                        removeDoubleClicked(t_ele);
                        return false;
                    }
                    catch (err) {
                        removeDoubleClicked(t_ele);
                    }
                }
            });

            $('.layout-button-left').click(function () {
                $('#divheadeprojectlogo,#divrightimage').css('display', '');
                LeftSideHideMenuPaneflg = false;
                $('#divQuickFavourite').css('margin-left', '40px');
            });
            $('#divprojectlogo').click(function () {
                var t_ele = $(this);
                if (!isDoubleClicked(t_ele)) {
                    try {
                        $('#divheadeprojectlogo,#divrightimage').css('display', '');
                        $('#divQuickFavourite').css('margin-left', '40px');
                        $('.layout-button-left').click();
                        removeDoubleClicked(t_ele);
                        //$('.layout-panel-center').css({'width': '1595px', 'left': '5px'});
                    }
                    catch (err) {
                        removeDoubleClicked(t_ele);
                    }
                }

            });
            $('#divheadeprojectlogo,#divrightimage').click(function () {
                $('#divheadeprojectlogo,#divrightimage').css('display', 'none');
                $('#divQuickFavourite').css('margin-left', '0px');
                $('.LeftSideHideMenuPane').click();

            });
            var _IsBeta = "<%=IsBeta.ToString().Trim()%>";
            if (_IsBeta == "1") {
                $('#lblreleasecopy').text('Beta');
            }
            else {
                $('#lblreleasecopy').text('');
            }
            $('.LinkMenu').click(function () {
                $('#rightMenudiv').css({ 'left': (pageX - 10), 'top': (pageY) + 20 });
            });




        });  // End Code For Left Stripe menu hide show

        function removeSelectedAppCookie() {
            document.cookie = "selectedApp=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }


        function centralizelogout(isSchedular, isupgrade, scheduleid) {
            sessionStorage.clear();
            var temp_cnt = 0;
            var isgradingpage = 0;
            removeSelectedAppCookie();
            if (isupgrade == "" || isupgrade == null || isupgrade == undefined) {
                isupgrade = "0";
            }
            if (scheduleid == "" || scheduleid == null || scheduleid == undefined) {
                scheduleid = "0";
            }
            $('iframe').each(function () {
                if ($(this).attr("src") && ($(this).attr("src").indexOf('InventoryManagement_DiamondGradingInfo_temp') != -1
                    || $(this).attr("src").indexOf('InventoryManagement_ColorStoneGradingInfo') != -1
                    || $(this).attr("src").indexOf('InventoryManagement_MetalGradingInfo_temp') != -1
                    || $(this).attr("src").indexOf('InventoryManagement_MountGradingInfo_temp') != -1
                    || $(this).attr("src").indexOf('InventoryManagement_findingGradingInfo_temp') != -1)) {
                    isgradingpage = 1;
                    $.ajax({
                        url: ADPT + 'mfg/Ajax/Ajax_InventoryManagement_DiamondGradingInfo_temp' + _Extension + '',
                        data: 'mode=UnloackData&-=' + _LT,
                        type: 'POST',
                        success: function (data) {
                            if (data == "Unlocked") {
                                var myloc = ADPT + "myapp/app/Logout" + _Extension + "?logout=logout&l=" + _LL
                                    + "&iPower=" + $('#hdnIspower').val() + "&-=" + _LT + "&uf=" + _uf
                                    + "&ched=" + isSchedular.toString().trim() + "&loginid=" + loginid.toString().trim() + "&isupgrade=" + isupgrade + "&scheduleid=" + scheduleid;
                                window.top.location.href = myloc;
                            }
                        }
                    });
                }
                temp_cnt = temp_cnt + 1;
            });


            if ($('iframe').length == temp_cnt && isgradingpage == 0) {
                var myloc = ADPT + "myapp/app/Logout" + _Extension + "?logout=logout&l=" + _LL
                    + "&iPower=" + $('#hdnIspower').val() + "&-=" + _LT + "&uf=" + _uf
                    + "&ched=" + isSchedular + "&loginid=" + loginid + "&isupgrade=" + isupgrade + "&scheduleid=" + scheduleid;
                window.top.location.href = myloc;
            }


        }
        var NotCloseTab = ['My Apps', 'WELCOME'];
        var Arrry_AllMenuName = new Array();
        var tabtype = "";
        function fn_FillAllMenuNameArray() {
            $.ajax({
                url: '../Ajax/Ajax_LeftMenuBar_Built' + _Extension + '',
                data: 'mode=allmenuname',
                type: 'POST',
                dataType: 'json',
                success: function (data) {

                    if (data.length > 0) {
                        if (data != undefined && data != null && $.trim(data) != "NODATA") {
                            var cur_menuname = '';
                            if (data != null) {
                                if (data) {
                                    $(data).each(function (e, res) {
                                        Arrry_AllMenuName.push($.trim(res['menuname']));
                                    });
                                }
                            }
                        }
                    }
                }
            });
        }
        function fn_UnlockGradingBag() {
            $('iframe').each(function () {
                if ($(this).attr("src").indexOf('InventoryManagement_DiamondGradingInfo_temp') != -1
                    || $(this).attr("src").indexOf('InventoryManagement_ColorStoneGradingInfo') != -1
                    || $(this).attr("src").indexOf('InventoryManagement_MetalGradingInfo_temp') != -1
                    || $(this).attr("src").indexOf('InventoryManagement_MountGradingInfo_temp') != -1
                    || $(this).attr("src").indexOf('InventoryManagement_findingGradingInfo_temp') != -1) {
                    $.ajax({
                        url: ADPT + 'mfg/Ajax/Ajax_InventoryManagement_DiamondGradingInfo_temp',
                        data: 'mode=UnloackData&-=' + _LT,
                        type: 'POST',
                        success: function (data) {
                            if (data == "Unlocked") {
                                return false;
                            }
                        }
                    });
                }
            });
        }

        $(document).ready(function () {
            <%--if ('<%=objUser.IsPower.ToString().Trim()%>' == 1 || _vroleid == -1 || _vroleid == -2) {
                $('#editbtn').hide();
            }--%>
            $('.accordion-header-selected').removeClass('accordion-header-selected');
            $('.accordion-body').css('display', 'none');

            totalNotificationCnt = parseInt($('#hdnnotificationcount').val());
            if ($('#hdnnotificationcount').val() == "0") {
                $('.clsntfcnt').hide();
            } else {
                $('.clsntfcnt').show();
            }

            if ($('#hdnmsgcount').val() == "0") {
                $('.clsmsgcnt').hide();
            } else {
                $('.clsmsgcnt').show();
            }

            fn_FillAllMenuNameArray();

            addLeft_MenuBar($('#hdnappname').val(), '', _LT, '', _LL, _vroleid);



            sesionbindallapp();


            $('#bdy').scroll(function () {
                $(window).resize();
            });
            $(window).resize();
            var UserRole = $('#hdnMemberType').val();
            $(window).resize(function () {
                resizepanel();

            });
            $(function () {
                $('#tt').tabs({
                    tools: [{

                    }]
                });

            });

        });
        function RefreshGrid(title, gridid) {
            var tmpTitle = title.toString().replace(/ /g, '');
            if ($('#' + tmpTitle.replace(/\//g, '')).length != 0 && $('#' + tmpTitle)[0].contentWindow.$('#' + gridid).flexReload) {
                $('#' + tmpTitle.replace(/\//g, ''))[0].contentWindow.$('#' + gridid).flexReload();
            }
        }
        function Refreshfunction(title, functionname, calllfunction) {
            var tTitle = title.toString().replace(/ /g, '');
            if ($('#' + tTitle.replace(/\//g, '')).length != 0 && $.trim(functionname) != "") {
                var _tTitle = tTitle.replace(/\//g, '');
                var _tConWin = $('#' + _tTitle)[0].contentWindow;
                if ($.trim(functionname).toLowerCase() == "getdata" && calllfunction != undefined && calllfunction != null && calllfunction != "") {
                    var FnPar = calllfunction;
                    _tConWin.GetData('TagModificationWt', FnPar);
                }
                //else if ($.trim(functionname).toLowerCase() == "getdesid" && calllfunction != undefined && calllfunction != null && calllfunction != "") {
                //    var FnPar = calllfunction;
                //    _tConWin.GetDesId('TagModificationWt', FnPar);
                //}
                else {
                    if (_tConWin != undefined && _tConWin != null && _tConWin[functionname] != undefined && _tConWin[functionname] != null) {
                        if ($.trim(functionname).toLowerCase() == "getdesid" && calllfunction != undefined && calllfunction != null && calllfunction != "") {
                            _tConWin[functionname](calllfunction);
                        }
                        else if (calllfunction == 'mstupdate') {
                            _tConWin[functionname]('mstupdate');
                        }
                        else {
                            _tConWin[functionname]();
                        }
                    }
                }
            }
        }
        function SelectTab(title, link, pageid) {
            if (printWin) {
                printWin.close();
            }
            $('#tt').tabs('select', title);
            var ttl = title.split(' ').join('').replace(/\//g, '');
            var iframe = document.getElementById(ttl);
            if (iframe != null) {

                if (link != iframe.src && $.trim(link) != "" && (iframe.attributes["pageid"].value == "undefined" || iframe.attributes["pageid"].value == pageid || pageid == undefined)) {
                    if (link && link.indexOf("?") > -1) {
                        link = link + "&ifid=" + ttl + "&pid=" + pageid;
                    }
                    else {
                        link = link + "?ifid=" + ttl + "&pid=" + pageid;
                    }
                    iframe.src = link;
                }
                else {
                    iframe.src = iframe.src;
                    iframe.attributes["pageid"].value = pageid != null && pageid != undefined ? pageid : iframe.attributes["pageid"].value;
                }
            }
        }
        function CloseAllTab() {
            for (var icount = 0; icount < $('#tt').tabs('tabs').length; icount++) {
                CloseTab($('#tt').tabs('tabs')[icount].panel('options').title);
            }
        }
        function CloseTab(title) {
            if (printWin) {
                printWin.close();
            }
            if (NotCloseTab.indexOf(title) == -1) {
                $('#tt').tabs('close', title);
            }
        }
        function Remove_AllMenuBar() {
            $.each(Arrry_AllMenuName, function (e, res) {
                $('#Left_MenuBar').accordion('remove', $.trim(res));
                $('#Left_MenuBar').accordion('remove', $.trim(res));
                $('#Left_MenuBar').accordion('remove', $.trim(res));
                $('#Left_MenuBar').accordion('remove', $.trim(res));
                $('#Left_MenuBar').accordion('remove', $.trim(res));
                $('#Left_MenuBar').accordion('remove', $.trim(res));
            });
        }
        function close_all_accordion() {
            var panels = $('#Left_MenuBar').accordion('panels');
            $.each(panels, function () {
                this.panel('collapse');
            });
        }
        var myapp_addLeft_MenuBar = 0;
        function addLeft_MenuBar(appstype, url, kbm, query, l, Roleid) {

            myapp_addLeft_MenuBar = 0;

            //$('head title', window.parent.document).text('Optigo : ' + appstype);

            query = query ? query : "";
            if (appstype == 'icontact') {
                window.open(url + '?appstype=' + appstype + '&' + query, '_blank');
            }
            else if (appstype == 'ipadecom') {
                window.open(url + '?appstype=' + appstype + '&t=' + query, '_blank');
            }
            else {
                var varlocation = url + '?appstype=' + appstype + '&t=' + query + '&-=' + kbm + "&l=" + l;
                if ($('#hdnRoleid1').val() == "4") {
                    varlocation += "&checkcookie=0";
                }
                $('.accordion-header-selected').removeClass('accordion-header-selected');
                $('.accordion-body').css('display', 'none');
                Remove_AllMenuBar();

                if (_AppUserPageRights.length > 0) {
                    var myAppname = "";
                    if (_vroleid == '40') {
                        myAppname = "C_MFG";
                    }
                    else {
                        myAppname = appstype;
                    }
                    if (_vroleid == '-2' || Roleid == "-2") {
                        myAppname = "ORAIL_ADMIN";
                    }
                    var cur_menuname = '';
                    var bind_menu = '';
                    $('.accordion-header-selected').removeClass('accordion-header-selected');
                    $('.accordion-body').css('display', 'none');

                    for (var m = 0; m < _AppUserPageRights.length; m++) {
                        if ($.trim(_AppUserPageRights[m][0]).toLowerCase() == $.trim(myAppname).toLowerCase()) {

                            var MTSP = $.trim(_AppUserPageRights[m][1]).split("#@#-#@#");
                            var _appsname = _AppUserPageRights[m][0];
                            var _menuname = MTSP[0];
                            var _title = MTSP[1];
                            var _submenuname = MTSP[2];
                            var _pagename_url = MTSP[3];
                            var _pagename = MTSP[4];
                            var _formappsid = MTSP[5];
                            var _id = MTSP[6];
                            var _IsGroupedMenu = MTSP[7];
                            var _IsBeta = MTSP[8];
                            var _IsNew = MTSP[9];


                            if (_formappsid != undefined && _formappsid != null && !_formappsid == "0" && !_formappsid == "") {

                                if (_formappsid == "17") {
                                }
                                else {
                                    if ($.trim(_pagename_url).indexOf("?") != -1) {
                                        _pagename_url = _pagename_url + "&-=" + kbm;
                                    }
                                    else {
                                        _pagename_url = _pagename_url + "?-=" + kbm;
                                    }
                                }

                            }
                            //-------------- 2
                            if (cur_menuname != $.trim(_menuname)) {
                                if (cur_menuname != '' && bind_menu != '') {
                                    $('#Left_MenuBar').accordion('add', { title: cur_menuname, content: bind_menu, collapsible: true, active: false });

                                    bind_menu = '';
                                }
                                cur_menuname = $.trim(_menuname);
                                bind_menu += '      <div  class="innerdiv" style="font-size :15px;padding:5px 5px 5px 20px; " ><span onclick="PageUselog(\'' + $.trim(_title) + '\',\'icon-' + $.trim(_submenuname).replace(/ /g, '') + '\',\'' + $.trim(_pagename_url) + '\',\'' + $.trim(_id) + '\',\'' + $.trim(_IsGroupedMenu) + '\',\'' + _formappsid + '\')">' + $.trim(_submenuname) + ' ' + (parseInt(_IsBeta) == 1 ? '<sup class=\'beta\'>Beta</sup>' : (parseInt(_IsNew) == 1 ? '<sup class=\'new\'>New</sup>' : '')) + '</span><a class="clsHelpIcon" onclick="fn_helpforuser(\'' + $.trim(_title) + '\', \'' + helpuser + '\', \'' + $.trim(_id) + '\',\'' + _formappsid + '\')">?</a></div>';

                            } else {
                                bind_menu += '      <div class="innerdiv" style="font-size :15px;padding:5px 5px 5px 20px; " ><span onclick="PageUselog(\'' + $.trim(_title) + '\',\'icon-' + $.trim(_submenuname).replace(/ /g, '') + '\',\'' + $.trim(_pagename_url) + '\',\'' + $.trim(_id) + '\',\'' + $.trim(_IsGroupedMenu) + '\',\'' + _formappsid + '\')"" >' + $.trim(_submenuname) + ' ' + (parseInt(_IsBeta) == 1 ? '<sup class=\'beta\'>Beta</sup>' : (parseInt(_IsNew) == 1 ? '<sup class=\'new\'>New</sup>' : '')) + '</span><a class="clsHelpIcon" onclick="fn_helpforuser(\'' + $.trim(_title) + '\', \'' + helpuser + '\', \'' + $.trim(_id) + '\',\'' + _formappsid + '\')">?</a></div>';
                            }

                        }
                    }
                    $('#Left_MenuBar').accordion('add', { title: cur_menuname, content: bind_menu, collapsible: true, active: false });
                }

                $('.accordion-collapse').removeClass('accordion-expand');
                $('.accordion-collapse').addClass('accordion-expand');
                $('.accordion-header-selected').removeClass('accordion-header-selected');
                $('.accordion-body').css('display', 'none');


                var myurl = '';
                switch (appstype) {
                    case 'MFG':
                        myurl = ADPT + 'mfg/';
                        break;
                    case 'report':
                        myurl = ADPT + 'report/';
                        break;
                    case 'SALESCRM':
                        myurl = ADPT + 'salescrm/';
                        break;
                    case 'OptigoServices':
                        myurl = ADPT + 'salescrm/';
                        break;
                    case 'PD':
                        myurl = ADPT + 'salescrm/';
                        break;
                    case 'USER':
                        myurl = ADPT + 'login/';
                        break;
                    case 'MIS':
                        myurl = ADPT + 'login/';
                        break;
                    case 'KYC':
                        myurl = ADPT + 'login/';
                        break;
                    case 'MASTERS_POLICY':
                        myurl = ADPT + 'master/';
                        break;
                    case 'ACCOUNT':
                        myurl = ADPT + 'account/';
                        break;
                    case 'ECATALOG_BACKOFFICE':
                        myurl = ADPT + 'b2c/';
                        break;
                    case 'SYSTEM_ADMIN':
                        myurl = ADPT + 'salescrm/';
                        break;
                    case 'VENDOR':
                        myurl = ADPT + 'login/';
                        break;
                    case 'INVENTORY':
                        myurl = ADPT + 'login/';
                        break;
                    case 'DIAMONDSTORE':
                        myurl = ADPT + 'diamondstore/';
                        break;
                    case 'PAYROLL':
                        myurl = ADPT + 'payroll/';
                        break;
                    case 'TASKMGT':
                        myurl = ADPT + 'task/';
                        break;
                    case 'IPADECOM':
                        myurl = ADPT + 'login/';
                        break;
                    //case 'MOBILEECOM':
                    //    myurl = ADPT + 'login/';
                    //    break;
                    case 'IPAD_BACK_OFFICE':
                        myurl = ADPT + 'ipadbackoffice/';
                        break;
                    case 'IMPORT':
                        myurl = ADPT + 'upload/';
                        break;
                    default:
                        myurl = ADPT + 'login/';
                }

                myurl = myurl + 'app/Centralizeloginpagenew' + _Extension + '';
                $.ajax({
                    url: myurl,
                    data: 'appstype=' + appstype + '&url=' + url
                        + '&t=' + query + '&-=' + kbm + "&l=" + l
                        + "&Roleid=" + Roleid
                        + "&VC=" + _VC,
                    type: 'post',
                    dataType: 'json',
                    success: function (data) {
                    }
                });
            }
        }

        function sesionbindallapp() {
            apparr.push([ADPT + 'mfg/', 'MFG', '', '', _LT, _LL, _vroleid]);
            //apparr.push([ADPT + 'report/', 'report', '', '', _LT, _LL, _vroleid]);
            apparr.push([ADPT + 'salescrm/', 'SALESCRM', '', '', _LT, _LL, _vroleid]);
            apparr.push([ADPT + 'login/', 'USER', '', '', _LT, _LL, _vroleid]);
            apparr.push([ADPT + 'master/', 'MASTERS_POLICY', '', '', _LT, _LL, _vroleid]);
            apparr.push([ADPT + 'account/', 'ACCOUNT', '', '', _LT, _LL, _vroleid]);
            apparr.push([ADPT + 'b2c/', 'ECATALOG_BACKOFFICE', '', '', _LT, _LL, _vroleid]);
            apparr.push([ADPT + 'diamondstore/', 'DIAMONDSTORE', '', '', _LT, _LL, _vroleid]);
            apparr.push([ADPT + 'payroll/', 'PAYROLL', '', '', _LT, _LL, _vroleid]);
            apparr.push([ADPT + 'task/', 'TASKMGT', '', '', _LT, _LL, _vroleid]);
            apparr.push([ADPT + 'ipadbackoffice/', 'IPAD_BACK_OFFICE', '', '', _LT, _LL, _vroleid]);
            apparr.push([ADPT + 'upload/', 'IMPORT', '', '', _LT, _LL, _vroleid]);
            if (apparr.length > 0) {
                for (var n = 0; n < apparr.length; n++) {
                    sesionbindapp(apparr[n][0], apparr[n][1], apparr[n][2], apparr[n][3], apparr[n][4], apparr[n][5], apparr[n][6]);
                }
            }
        }
        function sesionbindapp(myurl, appstype, url, query, kbm, logid, Roleid) {

            myurl = myurl + 'app/Centralizeloginpagenew' + _Extension + '';
            $.ajax({
                url: myurl,
                data: 'appstype=' + appstype + '&url=' + url + '&t=' + query + '&-=' + kbm + "&l=" + logid + "&Roleid=" + Roleid,
                type: 'post'
            });
        }
        var timemasterarry = new Array();
        var mainarray = new Array();
        var masterarry = new Array();
        var timeoutvar;
        function getformagain() {
            if (timemasterarry.length !== 0) {
                var icount = 0;
                var flg = true;
                for (icount = 0; icount < $('#tt').tabs('tabs').length; icount++) {
                    if ($('#tt').tabs('tabs')[icount].panel('options').title == timemasterarry[0].title) {
                        flg = false;
                        break;
                    }
                }
                if (flg) {
                    $('#tt').tabs('add', {
                        title: timemasterarry[0].title,
                        content: '<iframe frameborder="0" id="' + timemasterarry[0].title.replace(/ /g, '') + '" src="' + timemasterarry[0].lnk + '" onload="ResizeFrame(this)" style="width:100%;height:100%; " ></iframe>',
                        iconCls: timemasterarry[0].icon,
                        closable: true
                    });
                }
                timemasterarry.splice(0, 1);
                setTimeout("getformagain()", 300);
            }
        }
        function reloadtabs(title) {
            SelectTab(title, '');
        }
        // remove all the specific tab
        function removecookie(title) {
            $.address.value('/');
            $.each($('#tt').tabs('tabs'), function () {
                if (NotCloseTab.indexOf(this.panel('options').title) == -1) {
                    $.address.parameter('a', this.panel('options').title, true);
                }
            });
            $.address.update();
        }
        // remove all the specific tab
        function removecookieWithTitle(title) {
            $.address.value('/');
            $.each($('#tt').tabs('tabs'), function () {
                if (NotCloseTab.indexOf(this.panel('options').title) == -1 && this.panel('options').title != title) {
                    $.address.parameter('a', this.panel('options').title, true);
                }
            });
            $.address.update();
        }
        function addNewTabInBrowser(title, icon, lnk, flg) {
            window.open(lnk, '_blank');
            window.focus();
        }
        function fnhide(pageid, isclose) {

            if ($("#chkdontshowmeagain").is(':checked') == true) {
                arrdontshowme_pageid.push(pageid);
            }

            $.ajax({
                url: '../Ajax/Ajax_versionhelp.aspx',
                data: 'mode=saveclick&pageid=' + pageid
                    + '&isclose=' + isclose
                    + '&chkdontshowmeagain=' + $("#chkdontshowmeagain").is(':checked'),
                type: 'POST',
                dataType: 'json',
                success: function (data) {
                    if (data != undefined && data != null) {
                        $('#divhide' + pageid).hide();
                    }
                }
            });
        }
        function checkValue(value, arr) {
            var status = 0;

            for (var i = 0; i < arr.length; i++) {
                var name = arr[i];
                if (name == value) {
                    status = 1;
                    break;
                }
            }

            return status;
        }


        window.addEventListener("message", function (event) {
            //debugger; not calling
            if (event.data && event.data.type === "OPEN_TAB") {
                const { title, icon, url, id, isGrouped } = event.data.payload;

                if (typeof PageUselog === "function") {
                    PageUselog(title, icon, url, id, isGrouped);
                }
                if (typeof addTab === "function") {
                    if (title === "Quotation" || title === "Sales Order") {
                        CloseTab("Quotation");
                        CloseTab("Sales Order");
                    }

                    addTab(title, icon, url, id, isGrouped, false);
                } else {
                    console.warn("addTab function not found.");
                }
            }
        });

        window.addEventListener("message", function (event) {

            if (!event || !event.data) return;

            var data = event.data;


            //console.log(data);
            if (typeof data === "string") {
                try { data = JSON.parse(data); } catch { return; }
            }
            //console.log(data);
            if (data != undefined && data.type != undefined) {
                if (data.type === "ADD_TAB") {
                    var PL;
                    if (data.payload != undefined && data.payload != null) {
                        PL = data.payload;
                    }
                    if ($.trim(data.evt).toLowerCase() == "dynamicreport") {
                        var TabName = (PL != undefined && PL != null && PL.TabName != undefined ? PL.TabName : "");
                        var TabUrl = (PL != undefined && PL != null && PL.TabUrl != undefined ? PL.TabUrl : "");
                        CloseTab(TabName);
                        addTab(TabName, 'icon-QuoteSale', TabUrl);
                    }
                    //else if ($.trim(data.evt).toLowerCase() == "setup-waba") {
                    //    var TabName = "setup-waba";
                    //    var TabUrl = "http://waba.web/onboarding";
                    //    CloseTab(TabName);
                    //    addTab(TabName, 'icon-QuoteSale', TabUrl);
                    //}
                    else if ($.trim(data.evt).toLowerCase() == "dynamicreportold") {
                        var TabName = (PL != undefined && PL != null && PL.TabName != undefined ? PL.TabName : "");
                        var TabUrl = (PL != undefined && PL != null && PL.TabUrl != undefined ? PL.TabUrl : "");
                        CloseTab(TabName);
                        addTab(TabName, 'icon-QuoteSale', TabUrl);
                    }
                    else {
                        if (typeof addTab === "function") {
                            if ($.trim(data.evt).toLowerCase() == "quotation") {
                                var DSID = (PL != undefined && PL != null && PL.code != undefined ? PL.code : "");
                                CloseTab('Quotation');
                                CloseTab('Sales Order');
                                addTab('Quotation', 'icon-QuoteSale', ADPT + 'salescrm/app/JobManagement_QuickOrderProcess_QuoteSale_ForSpeed1?encoded=1&IsAlbumEcomOther=0&DesignsIds=' + DSID + '&QueryStringid=' + DSID + '&isForQuote=true&mode=Like');
                            }
                            else if ($.trim(data.evt).toLowerCase() == "order") {
                                var DSID = (PL != undefined && PL != null && PL.code != undefined ? PL.code : "");
                                CloseTab('Quotation');
                                CloseTab('Sales Order');
                                addTab('Sales Order', 'icon-QuoteSale', ADPT + 'salescrm/app/JobManagement_QuickOrderProcess_QuoteSale_ForSpeed1?encoded=1&IsAlbumEcomOther=0&DesignsIds=' + DSID + '&QueryStringid=' + DSID + '&isForQuote=false&mode=Like');
                            }
                            else if ($.trim(data.evt).toLowerCase() == "album") {
                                var DSID = (PL != undefined && PL != null && PL.code != undefined ? PL.code : "");
                                newthickbox = {
                                    url: ADPT + "salescrm/app/JobManagement_QuickOrderProcess_CreateAlbum", //url                                       
                                    data: "QueryStringid=" + DSID + "&-=" + _LT, //data
                                    width: 420, //width
                                    height: 350, //height
                                    title: "New Album"//title
                                };
                                $('#New_thickbox').click();
                            }
                            else if ($.trim(data.evt).toLowerCase() == "estimate_quote") {
                                var skuno = (PL != undefined && PL != null && PL.code != undefined ? PL.code : "");
                                CloseTab('Quotation');
                                CloseTab('Quote List');
                                addTab('Quote List', 'icon-QuoteSale', ADPT + 'salescrm/app/Quotationmanagement_QuotationSKUWiselist?skuno=' + skuno +'&isFromAi=true');
                            }
                            else if ($.trim(data.evt).toLowerCase() == "retailquote") {
                                var UniqueNo = (PL != undefined && PL != null && PL.code != undefined ? PL.code : "");
                                parent.CloseTab('New Order');
                                parent.CloseTab('Update Order');
                                parent.addTab('New Order', 'icon-StockManagement_Supplier_Outward_Add', ADPT + 'payroll/app/POS_Bill_Save?uniqueno=' + UniqueNo + '&IFO=1&isForQuote=1&isFromAi=1');
                            }
                            else if ($.trim(data.evt).toLowerCase() == "pdorder") {
                                var UniqueNo = (PL != undefined && PL != null && PL.code != undefined ? PL.code : "");
                                parent.CloseTab('Add Customize Job');
                                parent.addTab('Add Customize Job', 'icon-CADManagement_AddCustomizeJob', ADPT + 'salescrm/app/CADManagement_AddCustomizeJob?isAdd=1&uniqueno=' + UniqueNo + '&isFromAi=1');
                            }

                        }
                        else if (typeof parent.addTab === "function") {
                            if ($.trim(data.evt).toLowerCase() == "quotation") {
                                var DSID = (PL != undefined && PL != null && PL.code != undefined ? PL.code : "");
                                parent.CloseTab('Quotation');
                                parent.CloseTab('Sale');
                                parent.addTab('Quotation', 'icon-QuoteSale', ADPT + 'salescrm/app/JobManagement_QuickOrderProcess_QuoteSale_ForSpeed1?encoded=1&IsAlbumEcomOther=0&DesignsIds=' + DSID + '&QueryStringid=' + DSID + '&isForQuote=true&mode=Like');
                            } else if ($.trim(data.evt).toLowerCase() == "album") {
                                var DSID = (PL != undefined && PL != null && PL.code != undefined ? PL.code : "");
                                newthickbox = {
                                    url: ADPT + "salescrm/app/JobManagement_QuickOrderProcess_CreateAlbum", //url                                       
                                    data: "QueryStringid=" + DSID + "&-=" + _LT, //data
                                    width: 420, //width
                                    height: 350, //height
                                    title: "New Album"//title
                                };
                                $('#New_thickbox').click();
                            }
                            else if ($.trim(data.evt).toLowerCase() == "estimate_quote") {
                                var skuno = (PL != undefined && PL != null && PL.code != undefined ? PL.code : "");
                                CloseTab('Quotation');
                                CloseTab('Quote List');
                                addTab('Quote List', 'icon-QuoteSale', ADPT + 'salescrm/app/Quotationmanagement_QuotationSKUWiselist?skuno=' + skuno + '&isFromAi=true');
                            }
                            else if ($.trim(data.evt).toLowerCase() == "retailquote") {
                                var UniqueNo = (PL != undefined && PL != null && PL.code != undefined ? PL.code : "");
                                parent.CloseTab('New Order');
                                parent.CloseTab('Update Order');
                                parent.addTab('New Order', 'icon-StockManagement_Supplier_Outward_Add', ADPT + 'payroll/app/POS_Bill_Save?uniqueno=' + UniqueNo + '&IFO=1&isForQuote=1&isFromAi=1');
                            }
                            else if ($.trim(data.evt).toLowerCase() == "pdorder") {
                                var UniqueNo = (PL != undefined && PL != null && PL.code != undefined ? PL.code : "");
                                parent.CloseTab('Add Customize Job');
                                parent.addTab('Add Customize Job', 'icon-CADManagement_AddCustomizeJob', ADPT + 'salescrm/app/CADManagement_AddCustomizeJob?isAdd=1&uniqueno=' + UniqueNo + '&isFromAi=1');
                            }
                        }
                    }
                }
            }
        });




        function attachFocusProxy(iframeId) {
            const iframe = document.getElementById(iframeId);
            const proxy = document.getElementById('focusProxy');

            // Whenever the iframe is clicked or focused, move focus to proxy
            iframe.addEventListener('mousedown', () => {
                proxy.focus({ preventScroll: true });
            });

            iframe.addEventListener('focus', () => {
                proxy.focus({ preventScroll: true });
            });
        }


        //function addTab(title, icon, lnk, pageid, IsGroupedMenu, flg) {



        //    //console.log("Iframe bind")
        //    if (title != undefined && title != null
        //        && ($.trim(title).toLowerCase() == "product making guide"
        //            || $.trim(title).toLowerCase() == "estimate"
        //            || $.trim(title).toLowerCase() == "sales counter"
        //            || $.trim(title).toLowerCase() == "employee wise issue wt"
        //            || $.trim(title).toLowerCase() == "wip report print" && inc(lnk.toLowerCase(), "reportmanagement_wipreport_print1")
        //            || ($.trim(title).toLowerCase() == "design mis" && lnk.toLowerCase().indexOf("master") > -1 && lnk.toLowerCase().indexOf("dash") > -1)
        //            || ($.trim(title).toLowerCase() == "production mis" && lnk.toLowerCase().indexOf("master") > -1 && lnk.toLowerCase().indexOf("dasha") > -1)
        //            || ($.trim(title).toLowerCase() == "sales analysis" && lnk.toLowerCase().indexOf("master") > -1 && lnk.toLowerCase().indexOf("dashb") > -1)
        //            || ($.trim(title).toLowerCase() == "account mis" && lnk.toLowerCase().indexOf("master") > -1 && lnk.toLowerCase().indexOf("dashc") > -1)
        //        )) {

        //        var LinkSpl = lnk.split('?');
        //        var Pagelink = LinkSpl.length > 0 ? LinkSpl[0] : lnk;
        //        var strvar = LinkSpl.length > 1 ? LinkSpl[1] : "";

        //        redirectPost(Pagelink, strvar, '_blank');

        //    } else if (
        //        title != undefined && title != null
        //        && $.trim(title).toLowerCase() == "call back") {

        //        getcallrequest();
        //    }
        //    else {
        //        if (printWin) {
        //            printWin.close();
        //        }
        //        var icount = 0;
        //        for (icount = 0; icount < $('#tt').tabs('tabs').length; icount++) {
        //            if ($('#tt').tabs('tabs')[icount].panel('options').title == title) {
        //                if (!(flg)) {
        //                    SelectTab(title, lnk, pageid);
        //                }
        //                tabm();
        //                return;
        //            }
        //        }
        //        if (lnk == 'Login') {
        //            centralizelogout('0');
        //        }
        //        else {
        //            var ttl = title.split(' ').join('');
        //            var data = { title: null, icon: null, lnk: null };
        //            data.title = title;
        //            data.icon = icon;
        //            data.lnk = lnk;
        //            if (JSON.stringify(mainarray).indexOf('"' + title + '"') == -1) {
        //                mainarray[mainarray.length] = data;
        //            }
        //            else {

        //                $.each(mainarray, function (e, res) {
        //                    if (res.title == title) {
        //                        mainarray[e].title = title;
        //                        mainarray[e].icon = icon;
        //                        mainarray[e].lnk = lnk;
        //                        mainarray[e].pageid = pageid;
        //                    }
        //                });
        //            }
        //            document.cookie = "filelog=" + Base64.encode(JSON.stringify(mainarray));
        //            var ttl = title.split(' ').join('').replace(/\//g, '');

        //            if (ttl != 'BulkPurchase') {
        //                if (lnk && lnk.indexOf("?") > -1) {
        //                    lnk = lnk + "&ifid=" + ttl + "&pid=" + pageid;
        //                }
        //                else {
        //                    lnk = lnk + "?ifid=" + ttl + "&pid=" + pageid;
        //                }
        //            }
        //            var divHelp = '';

        //            var arrhelppageid = fillhelpArray(_ProjectVersion);


        //            var mypage = pageid + "_" + ttl;

        //            if (checkValue(mypage, arrhelppageid) == 1) {

        //                if (checkValue(pageid, arrdontshowme_pageid) != 1) {
        //                    var p = ttl;
        //                    var pagefullname = _UploadLogicalPath + "/" + _ProjectVersion + "/" + pageid + "_" + ttl + ".html";
        //                    divHelp = '<div><div id="divhide' + pageid + '" style="width:100%;height:1850px; "><div class="helpheader">Update : ' + title + '<div style="float: right;font-size: 16px;"><span><input type="checkbox" id="chkdontshowmeagain" name="chkdontshowmeagain" value="0"><label for="chkdontshowmeagain" style="font-size: 12px;padding-right: 10px;"> Dont Show Me Again</label></span><span><button id="idClose" style="color: black;padding: 4px;background: white;border: solid gray;border-radius: 15px;width: 98px;" onclick="return fnhide(' + pageid + ',1);">CLOSE ME</button></span></div></div><iframe pageid="' + pageid + '" name="' + title + '" src="' + pagefullname + '" frameborder="0" onload="ResizeFrame(this)" style="width:100%;height:100%"></iframe></div></div>';
        //                }
        //            }

        //            if (pageid == 1416) {
        //                $('#tt').tabs('add', {
        //                    title: title, //+ '<p style="display:none;">' + pageid + '</p>'                        
        //                    content: divHelp + '<iframe CusAtt="ifm" id="' + ttl + '" pageid="' + pageid + '" name="' + title + '" IsGroupedMenu="' + IsGroupedMenu + '" src="' + lnk + '" frameborder="0" onload="ResizeFrame(this)" style="width:100%;height:0px;"></iframe>'
        //                        + '<center><div style="width:100%;height:850px;"></div></center>'

        //                    , //class="holds-the-iframe"
        //                    iconCls: icon,
        //                    closable: true
        //                });

        //            } else {

        //                $('#tt').tabs('add', {
        //                    title: title, //+ '<p style="display:none;">' + pageid + '</p>'                        
        //                    content: divHelp + '<iframe CusAtt="ifm" id="' + ttl + '" pageid="' + pageid + '" name="' + title + '" IsGroupedMenu="' + IsGroupedMenu + '" src="' + lnk + '" frameborder="0" onload="ResizeFrame(this)" style="width:100%;height:0px;"></iframe>'
        //                        + '<center><div style="width:100%;height:850px;"><h1 data-text="Please Wait Page loading...">Please Wait Page loading...</h1><img src="../image/square_loader.gif"></div></center>'

        //                    , //class="holds-the-iframe"
        //                    iconCls: icon,
        //                    closable: true
        //                });
        //            }
        //            attachFocusProxy(ttl);



        //            tabm();pageuselog
        //            if (!(flg)) {
        //                $.address.value('/');
        //                $.each($('#tt').tabs('tabs'), function () {
        //                    if (NotCloseTab.indexOf(this.panel('options').title) == -1) {
        //                        $.address.parameter('a', this.panel('options').title, true);
        //                    }
        //                });
        //                $.address.update();
        //            }
        //        }
        //        tabm();
        //    }
        //}

        function PageUselog(title, icon, pagename_url, pageid, IsGroupedMenu) {
            //debugger;
            $.ajax({
                url: '../Ajax/Ajax_PageUselog' + _Extension + '',
                data: 'mode=pagelog&pageid=' + pageid,
                type: 'post',
                success: function (data) {
                    PageUselog(title, icon, pagename_url, pageid, IsGroupedMenu);

                    $('#myInput').removeAttr('value');;
                    $('#myDropdown').hide();
                    $('.bckDisablesearch').css('display', 'none');
                    $('#myInput').css({ 'z-index': '0', 'background-color': 'rgba(255,255,255,.1)', 'color': '#fff' });
                    $('#myDropdown').css('z-index', '10');

                }
            });
        }



        //function fn_helpforuser(title, actionname, pageid) {
        //    if (title.indexOf("help -") < 0) {
        //        var ttl = title.split(' ').join('').replace(/\//g, '');
        //        var id = document.getElementById(ttl);
        //        if (id) {
        //            pageid = $.trim($(id).attr('pageid'));
        //        }
        //        $.ajax({
        //            url: '../Ajax/Ajax_PageUselog' + _Extension + ''
        //            ,
        //            data: "mode=getHelpPage&pageid=" + pageid
        //                + "&actionname=" + actionname
        //                + "&title=" + title,
        //            type: 'post',
        //            success: function (data) {
        //                var icon = 'print.png';
        //                $('#bdy .context-menu-root li:nth-child(7)').remove();
        //                title = actionname + ' help - ' + title + '';
        //                CloseTab(title);
        //                addTab(title, icon, data, pageid, 0);

        //            }
        //        });
        //    }

        //}


        //function fn_helpforuser(title, actionname, pageid) {
        //    // Validate inputs
        //    if (!title || !title.trim() || !actionname || !pageid) return;

        //    // Clean title and actionname
        //    title = title.trim();
        //    actionname = actionname.trim();

        //    // Construct tab title safely
        //    const tabTitle = `Help - ${actionname} ${title}`;

        //    // Check if tab is already open
        //    const isTabOpen = $.uitsomeTab.getAllTabs().some(t => t.title === tabTitle);
        //    if (isTabOpen) {
        //        // Optionally focus the tab instead of opening new
        //        $.uitsomeTab.selectTab(tabTitle);
        //        return;
        //    }
        //        $.ajax({
        //            url: '../Ajax/Ajax_PageUselog' + _Extension + '',
        //            data: "mode=getHelpPage&pageid=" + pageid + "&actionname=" + actionname + "&title=" + title,
        //            type: 'post',
        //            success: function (data) {
        //                addTab(tabTitle, 'file', data, pageid, 0);

        //            }
        //        });

        //}

        function fn_helpforuser(title, actionname, pageid) {
            if (!title || !actionname || !pageid) return;

            // 1. CLEAN THE TITLE
            // This Regex removes any existing "Help - Admin", "Help - User", etc. from the start of the string.
            // It prevents "Help - Admin Help - Admin Company" duplication.
            let baseTitle = $.trim(title).replace(/^Help\s-\s(Admin|User|Support|User)\s+/i, "");

            const cleanAction = $.trim(actionname);

            // 2. CONSTRUCT THE TARGET TITLE
            // This is the "Unique Key" for your tab
            const targetTabTitle = "Help - " + cleanAction + " " + baseTitle;

            // 3. ROBUST TAB CHECK
            // Get all open tabs from the library
            const allTabs = $.uitsomeTab.getAllTabs();

            // Look for an exact match
            const existingTab = allTabs.find(function (t) {
                return t.title === targetTabTitle;
            });

            if (existingTab) {
                // If it exists, focus it and STOP. Do not open a new one.
                console.log("Help tab already open, focusing: " + targetTabTitle);
                $.uitsomeTab.selectTab(targetTabTitle);
                return;
            }

            // 4. PROCEED WITH AJAX ONLY IF TAB IS NOT OPEN
            $.ajax({
                url: '../Ajax/Ajax_PageUselog' + _Extension,
                data: "mode=getHelpPage&pageid=" + pageid + "&actionname=" + cleanAction + "&title=" + baseTitle,
                type: 'post',
                success: function (data) {
                    // Final safety check to prevent double-click race conditions
                    if ($.uitsomeTab.getAllTabs().some(t => t.title === targetTabTitle)) {
                        $.uitsomeTab.selectTab(targetTabTitle);
                        return;
                    }

                    // Open the new tab
                    addTab(targetTabTitle, 'file', data, pageid, 0);
                },
                error: function (err) {
                    console.error("Help system error:", err);
                }
            });
        }

        function isCmdPaletteShortcut(e) {

            const isCtrlOrCmd = e.ctrlKey || e.metaKey;

            const key = (e.key || '').toLowerCase();   // SAFE
            const code = e.code || '';
            const keyCode = e.keyCode || 0;

            const isCtrlK = key === 'k';
            const isCtrlSpace = code === 'Space' || key === ' ' || keyCode === 32;

            return isCtrlOrCmd && (isCtrlK || isCtrlSpace);

            //const isCtrlOrCmd = e.ctrlKey || e.metaKey;

            //const isCtrlK = e.key.toLowerCase() === 'k';
            //const isCtrlSpace =
            //    e.code === 'Space' || e.key === ' ' || e.keyCode === 32;

            //return isCtrlOrCmd && (isCtrlK || isCtrlSpace);
        }
        function resizeGridFromHome(_obj) {
            var iframe = _obj;
            if (!iframe || !iframe.contentWindow) return;

            var iframeDoc = iframe.contentWindow.document;
            var IsInTabCon = 0;
            var $grid = $(iframeDoc).find('.container').find('.flexigrid');

            if ($grid.length !== 0) {
                IsInTabCon = 1;
            }

            $grid = $(iframeDoc).find('.flexigrid');

            if ($grid.length === 0) return;

            var gridTop = $grid.offset().top;
            var gridWidth = $(window).width();

            if ($grid && $grid.width() != undefined && $grid.width() == 0) {
                $grid.css({
                    width: gridWidth + 'px'
                });
            }
            var $hDiv = $grid.find('.hDiv');
            var hHeight = $hDiv.outerHeight(true) || 0;
            var hHDif = 0;
            if (hHeight != undefined && hHeight != null && ConToIntVal(hHeight) > 29) {
                hHDif = ConToIntVal(hHeight) + 2 - 29;
            }

            var gridHeight = $(window).height() - gridTop - 137 - hHDif;

            if (IsInTabCon == 1) {
                gridHeight = $(window).height() - gridTop - 260;
                if (gridHeight > 350) {
                    gridHeight = 350;
                }
            }

            //$grid.css({
            //    height: gridHeight + 'px',
            //});

            var $pDiv = $grid.find('.pDiv');
            var pHeight = $pDiv.outerHeight(true) || 0;

            $grid.find('.bDiv').css({
                height: (gridHeight - pHeight) + 'px'
            });

        }
        function ResizeFrame(obj) {
            try {
                if (obj.contentWindow && obj.contentWindow.document) {
                    var newWindow = obj.contentWindow;

                    newWindow.removeEventListener('keydown', handleIframeKeydown);
                    newWindow.addEventListener('keydown', handleIframeKeydown);

                    function handleIframeKeydown(e) {
                        const isCmdPalette = isCmdPaletteShortcut(e);
                        if (isCmdPalette) {
                            e.preventDefault();
                            e.stopPropagation();
                            openCmdPalette();
                            if (window.openCmdPalette) {
                                window.openCmdPalette();
                            }
                        }

                        // Check for Escape to close
                        if (e.key === "Escape") {
                            $('#cmd-k-overlay').fadeOut(150);
                            if (window.closeCmdPalette) {
                                window.closeCmdPalette();
                            }
                        }
                    }
                }
            } catch (err) {
                // This catches "Cross-origin" errors if you load external sites
                console.log("Could not attach hotkey to iframe: " + err);
            }

            var opera = (navigator.userAgent.indexOf("Opera") >= 0) ? true : false;
            var ie = (document.all && !opera) ? true : false;
            if (parseInt(navigator.appVersion) > 3) {
                if (ie) {
                    document.body.scroll = 'no';
                    document.getElementById(obj.id).height = document.documentElement.clientHeight - 35;
                }
                else {
                    document.body.scroll = 'no';
                    document.getElementById(obj.id).height = window.innerHeight - 35;
                }
            }
            if (!$(obj).parent().hasClass('cm_form_inner')) {
                if ($(obj).attr("src") && $(obj).attr("src").indexOf('/myapps/') != -1) {
                    $(obj).height($(window).height() - 75);
                }
                else {
                    $(obj).height($(window).height() - 35);
                }
            }
            try {

                resizeGridFromHome(obj);


            } catch (e) {
                // silent fail
            }

            if (_vroleid == "3" && $.trim($('#designation').val().toLowerCase()) == "admin" && _hdnIsShowHelp == "1") {
                $('#bdy .context-menu-root li:nth-child(7)').remove();
                if (_UserDomain == "0") {
                    $("#bdy .context-menu-root li:nth-child(n):contains(Help For User)").filter(function () {
                        return $(this).children("span").length > 0;
                    }).remove();
                }
                if (_AdminDomain == "0") {
                    $("#bdy .context-menu-root li:nth-child(n):contains(Help For Admin)").filter(function () {
                        return $(this).children("span").length > 0;
                    }).remove();
                }
                //helpuser = 'Admin';
            } else if (_vroleid == "3" && _hdnIsShowHelp == "1") {
                $('#bdy .context-menu-root li:nth-child(7)').remove();
                $('#bdy .context-menu-root li:nth-child(6)').remove();
                if (_UserDomain == "0") {
                    $("#bdy .context-menu-root li:nth-child(n):contains(Help For User)").filter(function () {
                        return $(this).children("span").length > 0;
                    }).remove();
                }
                //helpuser = 'User';
            } else if ((_vroleid == "-2" || _vroleid == "-1") && _hdnIsShowHelp == "1") {
                if (_UserDomain == "0") {
                    $("#bdy .context-menu-root li:nth-child(n):contains(Help For User)").filter(function () { return $(this).children("span").length > 0; }).remove();
                }
                if (_AdminDomain == "0") {
                    $("#bdy .context-menu-root li:nth-child(n):contains(Help For Admin)").filter(function () { return $(this).children("span").length > 0; }).remove();
                }
                if (_AdminDomain == "0") {
                    $("#bdy .context-menu-root li:nth-child(n):contains(Help For Support)").filter(function () { return $(this).children("span").length > 0; }).remove();
                }
                //helpuser = 'Support';
            } else {

                $("#bdy .context-menu-root li:nth-child(n):contains(Help For User)").filter(function () { return $(this).children("span").length > 0; }).remove();
                $("#bdy .context-menu-root li:nth-child(n):contains(Help For Admin)").filter(function () { return $(this).children("span").length > 0; }).remove();
                $("#bdy .context-menu-root li:nth-child(n):contains(Help For Support)").filter(function () { return $(this).children("span").length > 0; }).remove();
                //helpuser = 'Support';
            }
            //}
        }
        function resizepanel() {
            $('.panel-body-noheader').css('width', 'auto');
            $('.tabs-wrap').css('width', 'auto');
        }
        $(window).resize(function () {

            var opera = (navigator.userAgent.indexOf("Opera") >= 0) ? true : false;
            var ie = (document.all && !opera) ? true : false;
            var winHeight;
            var winWidth;
            if (parseInt(navigator.appVersion) > 3) {
                if (ie) {
                    document.body.scroll = 'no';
                    winHeight = document.documentElement.clientHeight - 35;
                }
                else {
                    document.body.scroll = 'no';
                    winHeight = window.innerHeight - 35;
                }
            }


            $('iframe').each(function () {
                var Tobj = this;
                if ($(this).attr("src") && $(this).attr("src").indexOf('/myapps/') != -1) {
                    $(this).height(winHeight - 50);
                }
                else {
                    $(this).height(winHeight);
                }
                try {
                    setTimeout(function () {
                        resizeGridFromHome(Tobj);
                    }, 100);

                } catch (e) {
                    // silent fail
                }
            });

        });
    </script>
    <script type="text/javascript">


        $(document).ready(function () {
            $('.layout-panel-center').css("position", "fixed");
            $('.layout-panel-center').css("display", "none");




            if ($('#sessionvariable').val() != 'sessionexpired') {
                var tempcookie = getCookie('filelog');
                if (tempcookie) {// && tempcookietitle
                    try {
                        mainarray = $.parseJSON(Base64.decode(tempcookie));
                    } catch (e) {
                        mainarray = new Array();
                    }
                }
                $.address.autoUpdate(false).change(function (event) {
                    var params = event.parameters['a'] ? event.parameters['a'] : "";
                    if (params.length != 0 && mainarray.length != 0) {//timemasterarry.length != 0 ||
                        if ($.isArray(params)) {
                            $.each(params, function (e, res) {
                                params[e] = decodeURI(res);
                            });
                        }
                        else {
                            params = decodeURI(params);
                        }
                        var timeout = 500;
                        $.each(mainarray, function () {
                            if (JSON.stringify(params).indexOf('"' + this.title + '"') != -1) {
                                addTab(this.title, this.icon, this.lnk, this.pageid, this.IsGroupedMenu, true);
                            }
                            else {
                                CloseTab(this.title);
                            }
                            setTimeout(show, 1600);
                        });
                        setTimeout(function () {
                            $('#tt').tabs('select', typeof (params) != 'string' ? params[params.length - 1] : params);
                        }, timeout);
                    }
                    else {
                        if ($.address.value() != '/') {
                            $.address.value('/');
                            $.address.update();
                        }
                        CloseAllTab();
                    }
                });
            }
        });
        $(function () {
            $(".tabs").sortable();
            $(".tabs").disableSelection();
        });
        function tabm() {
            $(".tabs").sortable();
            $(".tabs").disableSelection();

        }

        function clearSelection() {
            if (document.selection && document.selection.empty) {
                document.selection.empty();
            } else if (window.getSelection) {
                var sel = window.getSelection();
                sel.removeAllRanges();
            }
        }

    </script>
    <link href="<%=uSystem.uWebconfig.jojsPath.ToString().Trim() + "/NewThickbox/css/newthickbox.css"%>" rel="stylesheet" type="text/css" />
    <script src="<%=uSystem.uWebconfig.jojsPath.ToString().Trim() + "/NewThickbox/tab.js"%>" type="text/javascript"></script>

    <script type="text/javascript">
        function changerpassword() {
            newthickbox = {
                url: ADPT + "login/app/UserManagement_changepassword" + _Extension + "?-=" + _LT + "'", //url
                data: "", //data
                width: 550, //width
                height: 350, //height
                title: "CHANGE PASSWORD"//title
            };
            $('#New_thickbox').click();
        }
    </script>
    <script type="text/javascript">
        var totalNotificationCnt = 0;


        function EditProfile() {
            CloseTab('Edit Profile');
            if ($('#editprofilediv').length != 0) {
                $('#editprofilediv').click();
            }
        }

        function viewDetails() {
            console.log("View details is called adpt : ", ADPT);
            //function addTab(title, icon, lnk, pageid, IsGroupedMenu, flg)
            CloseTab('Coming Soon');
            addTab('My Account', 'icon-Messanger', ADPT + "task/app/CentralApi.aspx?PRT=10");

            //addTab('Coming Soon', 'icon-Messanger', JJPT + '/ComingSoon/ComingSoon.html');
        }


        function RedirectToPerosalQr() {
            console.log("View details is called adpt : ", ADPT);
            const link = "<%=((Auto_DomainPath!=null?Auto_DomainPath.ToString().Trim() + "login/app/Usermanagement_PersonalQR"+uSystem.uWebconfig.Extension.ToString().Trim():"")+"?p="+ objUser.IsPower.ToString().Trim() +"&appstype=user&appno="+(uSystem.uConvert.ToInt32(objUser.appno.ToString().Trim()).ToString().Trim() == "22" ? "10" : uSystem.uConvert.ToInt32(objUser.appno.ToString().Trim()).ToString().Trim())+"&l="+objUser.Login_LogId+"&-="+(objUser!=null && objUser.Logintoken!=null?EncodeString.EncodeString.Encode(objUser.Logintoken.ToString().Trim()):"")) %>?rtm=home";
            addTab('Personal QR', 'icon-Messanger', link);
        }


        function viewDetails() {
            console.log("View details is called adpt : ", ADPT);
            //function addTab(title, icon, lnk, pageid, IsGroupedMenu, flg)
            CloseTab('Coming Soon');
            addTab('My Account', 'icon-Messanger', ADPT + "task/app/CentralApi.aspx?PRT=10");

            //addTab('Coming Soon', 'icon-Messanger', JJPT + '/ComingSoon/ComingSoon.html');
        }


        function getMsgCount() {
            $.ajax({
                url: ADPT + 'login/Ajax/Ajax_Messagemanagement_Message',
                data: "mode=getmsgcount&-=" + _LT,
                type: 'POST',
                success: function (data) {
                    if (data != undefined && data != null && $.trim(data).toLowerCase() != "sessionexpired" && $.trim(data).toLowerCase() != "fail") {
                        $('#msgcount').html(data);
                        if (data != "" && !isNaN(parseInt(data / 10)) && parseInt(data) > 0) {
                            $('.clsmsgcnt').show();
                        }
                        else {
                            $('.clsmsgcnt').hide();
                        }
                    }
                    else {
                        $('.clsmsgcnt').hide();
                    }
                }
            });
        }

        function getNotificationCount() {
            $.ajax({
                url: ADPT + 'task/Ajax/Ajax_Messagemanagement_Notification',
                data: "-=" + LTKN + "&mode=getnotificationcount",
                type: 'POST',
                success: function (data) {
                    if (data != undefined && data != null && $.trim(data).toLowerCase() != "sessionexpired" && $.trim(data).toLowerCase() != "fail") {
                        $('#notificationcount').html(data);
                        totalNotificationCnt = parseInt(data);
                    }
                }
            });
        }

        $(document).ready(function () {
            $('.popuparrow').hover(function () {
                $('#popupbox_role').css('left', $('.popuparrow').css('left'));
                // $('#popupbox_role').css('width', (parseInt($('.popuparrow').width()) + 5) + 'px');
                $('#popupbox_role').show();
                //$('#supportrolecombo').focus();
            });
            $('#popupbox_role,.class1').mouseleave(function () {
                $('#popupbox_role').hide();
            });
            if ($('#editprofilediv').length == 0) {
                $('#editprofiletr').hide();
            }
            //Bdet();
        });

        function getMsg() {
            CloseTab('Message Box');
            addTab('Message Box', 'icon-Messanger', ADPT + 'login/app/Messagemanagement_Message' + _Extension + '?isFromShortcutIcon=1');
        }

        function MoveToOld() {

            var eventName = "Switch to Classic Optigo";
            $.ajax({
                url: '../Ajax/Ajax_PageUselog' + _Extension + '',
                data: "mode=pagelog&eventName=" + eventName,
                type: 'post',
                success: function (data) {
                    console.log("eventName : ", eventName);
                }
            });

            var Oldlink = '<%=((Auto_DomainPath!=null?Auto_DomainPath.ToString().Trim() + "myapp/app/Home1"+uSystem.uWebconfig.Extension.ToString().Trim():"")+"?p="+ objUser.IsPower.ToString().Trim() +"&appstype=user&appno="+(uSystem.uConvert.ToInt32(objUser.appno.ToString().Trim()).ToString().Trim() == "22" ? "10" : uSystem.uConvert.ToInt32(objUser.appno.ToString().Trim()).ToString().Trim())+"&l="+objUser.Login_LogId+"&-="+(objUser!=null && objUser.Logintoken!=null?EncodeString.EncodeString.Encode(objUser.Logintoken.ToString().Trim()):"")) %>? rtm = home';
            $(location).attr('href', Oldlink);
        }

        function getNotification() {
            initialiseNotification();
            $('#notify_Popupdiv').show();
            $('.clsBackDisable').show();
            //$('#notify_Popupdiv').css({ "left": $('.notify').offset().left - 292 });
            //$('#rightMenudiv').css({ "left": $('.LinkMenu')[0].offsetLeft + 146 });
            const $btn = $('.uitsome-icon-btn'); // bell button
            const rect = $btn[0].getBoundingClientRect();

            $('#notify_Popupdiv')
                .css({
                    top: rect.bottom + 8 + 'px',
                    left: rect.right - 330 + 'px'
                })
                .fadeIn(120);

            $('.clsBackDisable').fadeIn(120);

        }

        function getcallrequest() {
            GetWebConFlag();
            var isSupport = '<%=objUser.isSupport.ToString().Trim()%>';
            if (
                iTaskCallBackURL != undefined
                && iTaskCallBackURL != null
                && iTaskCallBackURL != ''
                && isSupport == '1'

            ) {

                CloseTab('Call Back Request');
                addTab('Call Back Request', 'icon-Messanger', iTaskCallBackURL + '/app/callback.aspx?En_ufcc=' + En_ufcc + '&En_UI=' + En_UI + '&En_UN=' + En_UN + '&En_UC=' + En_UC + '&En_IMP=' + En_IMP + '&En_DIN=' + En_DIN);

            } else {
                CloseTab('Call Back Request');
                addTab('Call Back Request', 'icon-Messanger', 'callbackdemo.aspx');

            }
        }
        function GetWebConFlag() {
            iTaskCallBackURL = getWebConKey('iTaskCallBackURL');
        }

        function msgRedirect(id, pageid, JsonData, notificationsubject) {
            var queryParams = '';
            var pid = 0;
            var fullURL = '';
            if (notificationsubject != undefined) {
                if ($.trim(notificationsubject).toLowerCase() == 'new customer registration') {
                    pid = 1301;
                    queryParams = "&ifid=Customer";

                    fullURL = ADPT + 'login/app/UserManagement_customer'
                        + "?-=" + LTKN
                        + queryParams;

                    parent.CloseTab('Customer');
                    parent.addTab(
                        'Customer',
                        'icon-Customer',
                        fullURL,
                        pid
                    );
                }
                else {
                    //pid = 1100;

                    //// ADDED: &ifid=MetalPrice back into the string to ensure the tab framework routes correctly
                    //queryParams = "&ifid=MetalPrice&searchField=" + encodeURIComponent(purity) + "&metaltypename=" + encodeURIComponent(metal);

                    //fullURL = ADPT + 'master/app/MasterManagement_MetalPurityMaster'
                    //    + "?-=" + LTKN
                    //    + queryParams;

                    //console.log("Redirecting to: " + fullURL);

                    //// 1. Handle Tabs
                    //parent.CloseTab('Metal Price');
                    //parent.addTab(
                    //    'Metal Price',
                    //    'icon-JobManagement_ManufacturerPO_Report_Print',
                    //    fullURL,
                    //    pid
                    //);
                }
            }
            // 2. Mark as read in database
            msgread1(id);

            // 3. Close the popup UI
            closeNotification();
        }

        function msgread1(id) {
            // 1. Encode the ID (e.g., 822 becomes ODly)
            // The server likely requires this because the parameter is named 'encodedid'
            //var safeId = btoa(id);

            //console.log("Marking notification ID as read (Encoded): " + id);

            $.ajax({
                url: ADPT + 'task/Ajax/Ajax_Messagemanagement_Notifications_Inbox' + (typeof _Extension !== 'undefined' ? _Extension : ''),
                data: "mode=readmsg&tid=" + id, // Send the encoded version
                type: 'POST',
                // Removed dataType: 'json' because if the server returns a plain string, 
                // jQuery will trigger the error block even if the database update worked.
                success: function (data) {

                    $(obj).removeClass('clsnotifiunread');
                    $(obj).addClass('clsnotifiread');
                    $('#notificationcount').text(parseInt($('#notificationcount').text()) - 1);
                    parseInt($('#notificationcount').text()) === 0 ? $('.clsntfcnt').hide() : $('.clsntfcnt').show();
                    //console.log("Server Response:", data);
                    //console.log("Message marked as read successfully.");

                    // Update the UI: find the tick mark and make it blue instantly
                    // This provides immediate feedback to the user
                    $('#noti_' + id).find('span[title="Unread"]').css('color', '#0056b3').attr('title', 'Read');
                },
                error: function (xhr, status, error) {
                    console.error("Failed to mark message as read.");
                    console.error("Status Code:", xhr.status);
                    console.error("Server Message:", xhr.responseText);
                }
            });
        }

        function closeNotification() {
            $(".clsBackDisable").hide();
            $(".notifyContant").hide();
            // Or if you use IDs:
            // $("#notify_Popupdiv").hide();
        }

        function msgopen(id, enid) {
            newthickbox = {
                url: ADPT + "task/app/Messagemanagement_Notification_Add?id=" + enid, //url
                data: "", //data
                width: 800, //width
                height: 500, //height
                title: "Received Notification"//title
            };
            $('#New_thickbox').click();

            $('#msgStatus_' + id + '').addClass('clsnotifiread');
        }

        function closeNotification() {
            $('#notify_Popupdiv').hide();
            $('.clsBackDisable').hide();
        }
        function fn_ResetAllPassword() {
            newthickbox = {
                url: ADPT + "login/app/UserManagement_ResetPassword" + _Extension + "?-=" + _LT + "'", //url
                data: "",
                width: 500, //width
                height: 330, //height
                title: "Reset Password"
            };
            $('#New_thickbox').click();
        }
        function fn_ResetActivationDate() {
            newthickbox = {
                url: ADPT + "login/app/UserManagement_CustomerActivationDate_Reset" + _Extension + "?-=" + _LT + "'", //url
                data: "",
                width: 450, //width
                height: 330, //height
                title: "Reset Activation Date"
            };
            $('#New_thickbox').click();
        }

        setInterval(function () {
            fn_Login_check();
        }, 600000);


        function fn_Login_check() {
            $.ajax({
                url: '../Ajax/ajax_login' + _Extension + '',
                data: "mode=IsLogin_check&cid=" + _cid + "&cuid=" + _cuid + "&ccode=" + _ccode
                    + "&rid=" + _rid + "&ycd=" + _dy + "&ltkn=" + _ltkn,
                type: 'POST',
                success: function (data) {
                    if (data != undefined && data != null) {
                        if (data == "0") {
                            centralizelogout('1');
                        }
                        else {
                        }
                    }
                    else {
                        centralizelogout('1');
                    }
                }
            });
        }
        //--- Start Notifiction Code

        function checkHelpBar() {
            //var $bar = $('.uitsome-helpbar');
            //if ($bar.children(':visible').length > 0) {
            //    $bar.removeClass('hidden').show();
            //}
        }

        var clrsetint;
        var clrsetint_version;
        function fn_notoff() {
            $('#divnotification').remove();
            isNotOff = 1;
            clearInterval(clrsetint);
            checkHelpBar(); // <-- Hide UI if no other messages exist

        }
        function fn_versionnotoff() {
            $('#divversionupdate').remove();
            isVersionNotOff = 1;
            clearInterval(clrsetint_version);
            checkHelpBar();
        }



        fn_getnote();
        function fn_getnote() {

            if (isNotOff == 0) {
                $.ajax({
                    url: '../Ajax/ajax_login' + _Extension,
                    data: "mode=getnote",
                    type: 'POST',
                    success: function (data) {
                        if (data != undefined && data != null && $.trim(data) != "NODATA") {

                            // 1. Store it globally so ANY iframe can access it at any time
                            window.top.__Notification_Bar = data;

                            // 2. Show it in the parent UI (if you have one)
                            $('#divnotmsg').html(data);
                            $('#divnotification').hide();

                            // 3. PUSH the update to the Home_New.aspx iframe if it's already open
                            broadcastNotificationToIframes(data);

                        } else {
                            window.top.__Notification_Bar = null; // clear it
                            $('#divnotification').hide();
                        }
                        checkHelpBar();
                    }
                });
            }

            function broadcastNotificationToIframes(htmlData) {
                // Look through all iframes on the page
                $('iframe').each(function () {
                    try {
                        // Check if the iframe has our special update function defined
                        if (this.contentWindow && typeof this.contentWindow.updateLocalNotification === 'function') {
                            this.contentWindow.updateLocalNotification(htmlData);
                        }
                    } catch (e) {
                        // Ignore Cross-Origin errors if external links are loaded
                        console.warn("Could not push notification to iframe", e);
                    }
                });
            }

            if (isVersionNotOff == 0) {
                $.ajax({
                    url: '../Ajax/ajax_login' + _Extension,
                    data: "mode=getnote_version",
                    type: 'POST',
                    success: function (data) {
                        if (data != undefined
                            && data != null
                            && $.trim(data) != "NODATA"
                            && $.trim(data) != "") {
                            $('#divversionupdatemsg').html(data);
                            $('#divversionupdate').show();
                        }
                        else {
                            $('#divversionupdate').hide();
                        }
                        checkHelpBar(); // <-- Trigger UI Update
                    }
                });
            }

        }
        //--- End Notifiction Code

        function fun_TaskManagement() {
            CloseTab('Task(s)');
            addTab('Task(s)', 'icon-Task(s)', ADPT + 'task/app/TaskManagement_Task_New<%=uSystem.uWebconfig.Extension.ToString().Trim()%>');
        }

        function openHelpPage() {
            CloseTab('Help');
            //addTab('Help', 'icon-Help', '../Help/Help.html');
            addTab('Help', 'icon-Help', JJPT + '/Help/Help.html');
        }



    </script>


</head>
<%--<body id="bdy" class="easyui-layout" onunload="bodyUnload();" onclick="clicked=true;">--%>
<body id="bdy" class="easyui-layout">
    <div id="app"></div>

    <input type="hidden" id="hdnsession" name="hdnsession" runat="server" />
    <input type="hidden" id="sessionvariable" runat="server" />
    <input type="hidden" id="mastermanagement_roleid" runat="server" />
    <input type="hidden" id="hdnIsShowHelp" runat="server" />
    <input type="hidden" id="designation" runat="server" />
    <input type="hidden" id="ordertrackflg" runat="server" />

    <input type="hidden" id="hdnLogin_token" runat="server" />
    <input type="hidden" id="hdnLogin_Logid" runat="server" />
    <input type="hidden" id="hdnmsgcount" runat="server" />
    <input type="hidden" id="hdnnotificationcount" runat="server" />
    <input type="hidden" id="hdnUnReadNotificationcount" runat="server" />

    <input type="hidden" id="hdnIframe1" name="hdnIframe1" runat="server" />
    <input type="hidden" id="hdnissesrun" value="0" runat="server" />
    <input type="hidden" id="hdnIspower" value="0" runat="server" />
    <input type="hidden" id="hdnappname" name="hdnappname" runat="server" />


    <table style="display: none;">
        <tr>
            <td>
                <span id="New_thickbox" style="display: none;">&nbsp;</span>
            </td>
        </tr>
    </table>
    <div class="LeftSideHideMenuPane">
        <%--<div>
            &nbsp;</div>--%>
    </div>
    <div region="west" split="true"
        title="<div id='divprojectlogo' class='class1'  style='cursor:pointer;margin:5px 0px 5px -20px;background: url(<%=LPDL.Trim()%>) no-repeat 16% 20%;'><label style='cursor:pointer;font-size:13px;color:#AAA;opacity:0'>  ::<!--project-->Istore orail<!--endofpr--> ::  </label><div><label style='color:white; font-size:10px; position:relative; top:6px; left:20px;display:none;' id='lblreleasecopy'></label></div></div>"
        style="overflow: auto; font-size: 16px; background: #D4D5D0; width: 188px; height: 375px; margin: -1px;">
        <div class="easyui-accordion" fit="true" border="true" id="Left_MenuBar" runat="server">
        </div>
        <div>&nbsp;</div>
    </div>


    <%--<div id="dvLoading"> 
   </div>--%>


    <div id="iframeLoading" class="dialogContainer zcrmp-lodingCont" style="display: block;">
        <div class="zcrmp-plusloading"><span id="fullpageloadingtext">Optigo...</span></div>
    </div>



    <div id="centerdiv" region="center" title=''>
        <div class="class1 clsipadview" style="margin-bottom: 45px; text-align: left;">
        </div>
        <div class="dropdown">
        </div>

        <div class="xs" id="centerontainer">
            <input id="focusProxy" type="text" style="position: absolute; top: -9999px; left: -9999px;">


            <button class="ai-btn" onclick="NavigateToAiPage()">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="#f9f9f9" d="m9.96 9.137l.886-3.099c.332-1.16 1.976-1.16 2.308 0l.885 3.099a1.2 1.2 0 0 0 .824.824l3.099.885c1.16.332 1.16 1.976 0 2.308l-3.099.885a1.2 1.2 0 0 0-.824.824l-.885 3.099c-.332 1.16-1.976 1.16-2.308 0l-.885-3.099a1.2 1.2 0 0 0-.824-.824l-3.099-.885c-1.16-.332-1.16-1.976 0-2.308l3.099-.885a1.2 1.2 0 0 0 .824-.824m8.143 7.37c.289-.843 1.504-.844 1.792 0l.026.087l.296 1.188l1.188.297c.96.24.96 1.602 0 1.842l-1.188.297l-.296 1.188c-.24.959-1.603.959-1.843 0l-.297-1.188l-1.188-.297c-.96-.24-.96-1.603 0-1.842l1.188-.297l.297-1.188zm.896 2.29a1 1 0 0 1-.203.203a1 1 0 0 1 .203.203a1 1 0 0 1 .203-.203a1 1 0 0 1-.203-.204M4.104 2.506c.298-.871 1.585-.842 1.818.087l.296 1.188l1.188.297c.96.24.96 1.602 0 1.842l-1.188.297l-.296 1.188c-.24.959-1.603.959-1.843 0l-.297-1.188l-1.188-.297c-.96-.24-.96-1.603 0-1.842l1.188-.297l.297-1.188zM5 4.797a1 1 0 0 1-.203.202A1 1 0 0 1 5 5.203a1 1 0 0 1 .203-.204A1 1 0 0 1 5 4.796" />
                </svg>
                AI Magic
            </button>

            <div style="width: 500px;">
                <div style="margin-top: 0px; cursor: pointer;" title="Search (Ctrl+K)">
                    <button class="search-trigger-de" onclick="openCmdPalette()">


                        <span class="label">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                    d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314" />
                            </svg>
                            Search</span>

                        <span class="key-hint dev">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5" d="M15 9v6H9V9zm0 6h3a3 3 0 1 1-3 3zm-6 .002H6a3 3 0 1 0 3 3zM15 9V6a3 3 0 1 1 3 3zM9 9V6a3 3 0 1 0-3 3z" />
                            </svg>
                            K
                        </span>
                    </button>
                </div>
            </div>
        </div>

        <div class="classphno">
            <div style="width: 35px;" class="classUserIcon">
                <div style="margin-left: -4px; margin-top: 7px; cursor: pointer;" onclick="getNotification()">
                    <span class="notify"></span>
                    <span class="clsntfcnt">
                        <label id="notificationcount"><%=hdnnotificationcount.Value %></label></span>
                </div>
                <div style="margin-left: 35px; cursor: pointer;">
                    <span style="color: White;"></span>
                </div>
            </div>
            <img class="classUserIcon" id="iconInfo" src="<%=DefaultImageLogoPath.ToString().Trim()%>" onerror="onerrimg(this);" />
        </div>

    </div>

    <div id="divexpirealert" style="background: orange; color: white; padding: 3px 0px 3px 2%; display: none;" runat="server"></div>
    <div id="divnotify" style="background: yellow; color: black; padding: 3px 0px 3px 2%; display: none;" runat="server"></div>

    <div class="bckDisable" style="display: none;"></div>
    <div class="bckDisablesearch" style="display: none;"></div>

    <div style="display: none;" id="divnotification" class="clsdivnotification" runat="server">
        <div id="divnotmsg" class="clsdivnotmsg" runat="server"></div>
        <div title="Close" class="clsdivnotoff" onclick="fn_notoff();"></div>
    </div>

    <div style="display: none;" id="divversionupdate" class="clsdivversionupdate" runat="server">
        <div id="divversionupdatemsg" class="clsdivnotmsg" runat="server"></div>
        <div title="Close" class="clsdivnotoff" onclick="fn_versionnotoff();"></div>
    </div>


    <div id="tt"
        style="display: none; visibility: hidden !important;"
        class="easyui-tabs">

        <%if (mastermanagement_roleid.Value == "1" || mastermanagement_roleid.Value == "-1" || mastermanagement_roleid.Value == "3")
            {
        %>


        <%if (isWelcomePage == 1)
            { %>
        <%--<div id="WELCOME" title="WELCOME" iconcls="icon-MyApps" closable="true">
                <iframe id="Iframe2" frameborder="0" onload="ResizeFrame(this);" src="welcome.aspx" style="width: 100%; display: inline;"></iframe>                       
            </div>--%>
        <%} %>

        <div id="myapps" title="My Apps" iconcls="icon-MyApps" closable="false">
            <iframe id="Iframe1" frameborder="0" onload="ResizeFrame(this);" src="" style="width: 100%; display: inline;"></iframe>
            <script type="text/javascript">
                $(document).ready(function () {
                    setTimeout(function () {
                        var myapppath = "";
                        if ($('#hdnIframe1').val() == "") {
                            myapppath = "<%=((Auto_DomainPath!=null?Auto_DomainPath.ToString().Trim() + "myapp/app/myapps"+uSystem.uWebconfig.Extension.ToString().Trim():"")+"?p="+ objUser.IsPower.ToString().Trim() +"&appstype=user&appno="+(uSystem.uConvert.ToInt32(objUser.appno.ToString().Trim()).ToString().Trim() == "22" ? "10" : uSystem.uConvert.ToInt32(objUser.appno.ToString().Trim()).ToString().Trim())+"&l="+objUser.Login_LogId+"&-="+(objUser!=null && objUser.Logintoken!=null?EncodeString.EncodeString.Encode(objUser.Logintoken.ToString().Trim()):"")) %>";
                        }
                        else {
                            myapppath = $('#hdnIframe1').val();
                        }
                        $('#Iframe1').attr('src', myapppath);
                    }, 500);
                });
            </script>
        </div>

        <%} %>
    </div>
    </div>



    <div class="classuserPopup" id="usrpopup" style="display: none;">
        <div class="infodiv">
            <img class="profile" src="<%=DefaultImageLogoPath.ToString().Trim() + "?u=" + DateTime.Now.ToString("ddMMyyyyHHmmss")%>" onerror="onerrimg(this);" />
            <h5 class="name" style="font-family: Calibri;"><%= (objUser != null ? objUser.firstname.ToString().Trim() : "") + " " +  (objUser != null ? objUser.lastname.ToString().Trim() : "") %></h5>
            <h6 class="Email" style="font-family: Calibri;"><%= objUser.UserID.ToString().Trim() %></h6>
            <h6 class="designation" style="font-family: Calibri;"><%= objUser.designation.ToString().Trim() %></h6>
            <h6 class="clsdc" style="top: 35%; font-family: Calibri;"><%= DefaultCompany.Trim() %></h6>
            <%--<h6 class="clsdc" style="top: 50%; font-family: Calibri;"><%= ufcc.ToString().Trim() +" " + objUser.WhatsAppPackageName.ToString().Trim() %></h6>--%>
            <h6 class="clsdc" style="top: 50%; font-family: Calibri;"><%= ufcc.ToString().Trim() %></h6>
        </div>

        <div class="btndiv">
            <input id="logBtn" type="button" value="Log out" onclick="centralizelogout('0');" class="" />
            <input id="reloadbtn" type="button" value="Reload" />
            <input id="editbtn" type="button" value="Edit" onclick="EditProfile();" />
        </div>
    </div>


    <!-- Command K Modern UI Overlay -->
    <div id="cmd-k-overlay" style="display: none;">
        <div class="cmd-k-modal">
            <div class="cmd-k-header">
                <span class="cmd-k-icon">
                    <svg fill="#000000" height="20px" width="20px" version="1.1" id="search" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" xml:space="preserve">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
                            <g>
                                <path d="M20.031,20.79c0.46,0.46,1.17-0.25,0.71-0.7l-3.75-3.76c1.27-1.41,2.04-3.27,2.04-5.31 c0-4.39-3.57-7.96-7.96-7.96s-7.96,3.57-7.96,7.96c0,4.39,3.57,7.96,7.96,7.96c1.98,0,3.81-0.73,5.21-1.94L20.031,20.79z M4.11,11.02c0-3.84,3.13-6.96,6.96-6.96c3.84,0,6.96,3.12,6.96,6.96c0,3.84-3.12,6.96-6.96,6.96C7.24,17.98,4.11,14.86,4.11,11.02 z"></path>
                            </g>
                        </g></svg>
                </span>
                <input type="text" id="cmd-k-input" placeholder="" autocomplete="off">
                <span class="cmd-k-esc">ESC</span>
                <span class="cmd-k-icon close_cmd_btn" style="margin-left: 10px; cursor: pointer;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 16 16">
                        <path fill="#000" d="m8.707 8l3.646-3.646a.5.5 0 0 0-.707-.707L8 7.293L4.354 3.647a.5.5 0 0 0-.707.707L7.293 8l-3.646 3.646a.5.5 0 0 0 .708.707l3.646-3.646l3.646 3.646a.5.5 0 0 0 .708 0a.5.5 0 0 0 0-.707L8.709 8z" />
                    </svg>
                </span>
            </div>
            <div class="cmd-k-body">
                <div id="cmd-k-initial" class="cmd-k-initial" style="display: none;">
                    <div class="cmd-k-panel">
                        <div class="cmd-k-panel-title">FAVOURITES</div>
                        <div class="cmd-k-panel-body">
                            <ul id="cmd-k-fav-list" class="cmd-k-section-list"></ul>
                        </div>
                    </div>
                    <div class="cmd-k-panel">
                        <div class="cmd-k-panel-title">Most searched pages</div>
                        <div class="cmd-k-panel-body">
                            <ul id="cmd-k-most-list" class="cmd-k-section-list"></ul>
                        </div>
                    </div>
                </div>
                <ul id="cmd-k-results">
                    <!-- Fuse.js results will be injected here -->
                </ul>
                <div id="cmd-k-placeholder" class="cmd-k-empty" style="display: none;">
                    <p>Type to search across apps, menus, and pages...</p>
                </div>
            </div>



            <!-- Container -->
            <div class="cmd-k-footer" style="display: flex; justify-content: flex-start; align-items: center; gap: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; font-weight: 500; color: #94a3b8; /* soft muted gray text */
  user-select: none; /* prevents text selection */
  cursor: default; /* standard cursor, not a pointer */">

                <!-- Navigation Group -->
                <span style="display: flex; align-items: center; gap: 8px;">
                    <!-- The "Key" Container -->
                    <strong style="display: flex; align-items: center; gap: 4px; padding: 4px 8px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; box-shadow: 0 2px 0 #cbd5e1; /* the 'button' 3d effect */
      color: #475569; /* darker gray for icons */">
                        <!-- Up Arrow -->
                        <svg viewBox="-0.5 0 25 25" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 13.8599L10.87 10.8C11.16 10.48 11.57 10.3 12 10.3C12.43 10.3 12.84 10.48 13.13 10.8L16 13.8599" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                            <path d="M3 7.42V17.42C3 19.63 4.79 21.42 7 21.42H17C19.21 21.42 21 19.63 21 17.42V7.42C21 5.21 19.21 3.42 17 3.42H7C4.79 3.42 3 5.21 3 7.42Z" stroke="currentColor" stroke-width="1.8" />
                        </svg>
                        <!-- Down Arrow -->
                        <svg viewBox="-0.5 0 25 25" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 10.99L13.13 14.05C12.84 14.37 12.43 14.55 12 14.55C11.57 14.55 11.16 14.37 10.87 14.05L8 10.99" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                            <path d="M21 17.42V7.42C21 5.21 19.21 3.42 17 3.42H7C4.79 3.42 3 5.21 3 7.42V17.42C3 19.63 4.79 21.42 7 21.42H17C19.21 21.42 21 19.63 21 17.42Z" stroke="currentColor" stroke-width="1.8" />
                        </svg>
                    </strong>
                    to navigate
                </span>

                <!-- Selection Group -->
                <span style="display: flex; align-items: center; gap: 8px;">
                    <strong style="display: flex; align-items: center; justify-content: center; padding: 4px 8px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; box-shadow: 0 2px 0 #cbd5e1; color: #475569;">
                        <!-- Enter Icon -->
                        <svg viewBox="0 0 28 28" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 6.75C8 6.34 8.34 6 8.75 6H15.75C20.25 6 23 8.9 23 12.5C23 16.1 20.25 19 15.75 19H7.56L10.78 22.22C11.07 22.51 11.07 22.99 10.78 23.28C10.49 23.57 10.01 23.57 9.72 23.28L5.22 18.78C5.08 18.64 5 18.45 5 18.25C5 18.05 5.08 17.86 5.22 17.72L9.72 13.22C10.01 12.93 10.49 12.93 10.78 13.22C11.07 13.51 11.07 13.99 10.78 14.28L7.56 17.5H15.75C18.9 17.5 21.5 15.4 21.5 12.5C21.5 9.6 18.9 7.5 15.75 7.5H8.75C8.34 7.5 8 7.16 8 6.75Z" fill="currentColor" />
                        </svg>
                    </strong>
                    to select
                </span>

                <!-- Close Group -->
                <span style="display: flex; align-items: center; gap: 8px;">
                    <strong style="padding: 2px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; box-shadow: 0 2px 0 #cbd5e1; font-size: 11px; line-height: 1.5; font-weight: 700; color: #475569; letter-spacing: 0.5px;">ESC</strong>
                    to close
                </span>

            </div>
        </div>
    </div>



    <!-- start from here -->

    <div class="dropdown_menu_optigo_new" id="dropdownMenu_optigo_new" style="display: none;">
        <!-- Section: Accounts -->
        <div class="menu_section_optigo_new border_bottom_optigo_new">
            <div class="section_title_optigo_new">
                My Account
            <span class="badge_optigo_new_pro"><%= ufcc.ToString().Trim() %></span>
            </div>

            <div class="menu_item_optigo_new user_card_optigo_new" style="align-items: flex-start">

                <div class="team-avatar_optigo">
                    <img style="width: 100%; height: 100%; border-radius: 50%;" src="<%=DefaultImageLogoPath.ToString().Trim() + "?u=" + DateTime.Now.ToString("ddMMyyyyHHmmss")%>" onerror="onerrimg(this);" />
                    <%-- <%= (!string.IsNullOrWhiteSpace(objUser.firstname)
    ? objUser.firstname.Trim()[0].ToString().ToUpper()
    : "") %>--%>
                </div>

                <div class="user_info_optigo_new">
                    <div class="name_optigo">
                        <%= (objUser != null ? objUser.firstname.ToString().Trim() : "") + " " +  (objUser != null ? objUser.lastname.ToString().Trim() : "") %>
                    </div>

                    <div class="email_optigo"><%= objUser.UserID.ToString().Trim() %></div>

                    <div style="font-size: 12px; color: #6b7280">
                        <div><%= DefaultCompany.Trim() %></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Section: Main Options -->
        <div class="menu_section_optigo_new border_bottom_optigo_new">
            <div class="section_title_optigo_new">Settings</div>
            <a href="javascript:void(0);" class="menu_item_optigo_new" onclick="EditProfile();">
                <svg class="icon_optigo_new" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 640 640">
                    <path fill="currentColor" d="M256.1 312c66.3 0 120-53.7 120-120s-53.7-120-120-120s-120 53.7-120 120s53.7 120 120 120m-29.7 56c-98.5 0-178.3 79.8-178.3 178.3c0 16.4 13.3 29.7 29.7 29.7h196.5l10.9-54.5c4.3-21.7 15-41.6 30.6-57.2l67.3-67.3c-28-18.3-61.4-28.9-97.4-28.9h-59.4zm105.9 162.9l-11.9 59.6c-.2.9-.3 1.9-.3 2.9c0 8 6.5 14.6 14.6 14.6c1 0 1.9-.1 2.9-.3l59.6-11.9c12.4-2.5 23.8-8.6 32.7-17.5l118.9-118.9l-80-80l-118.9 118.9c-8.9 8.9-15 20.3-17.5 32.7zm267.8-123c22.1-22.1 22.1-57.9 0-80s-57.9-22.1-80 0l-28.8 28.8l80 80z" />
                </svg>
                <span class="text_optigo">Edit Profile</span>
            </a>
            <a href="javascript:void(0);" class="menu_item_optigo_new" onclick="viewDetails();">
                <svg class="icon_optigo_new" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" d="M13 3.002Q12.295 3 11.5 3C7.022 3 4.782 3 3.391 4.391S2 8.021 2 12.5c0 4.478 0 6.718 1.391 8.109S7.021 22 11.5 22c4.478 0 6.718 0 8.109-1.391S21 16.979 21 12.5q0-.795-.002-1.5" />
                        <path stroke-linejoin="round" d="m18.5 2l.258.697c.338.914.507 1.371.84 1.704c.334.334.791.503 1.705.841L22 5.5l-.697.258c-.914.338-1.371.507-1.704.84c-.334.334-.503.791-.841 1.705L18.5 9l-.258-.697c-.338-.914-.507-1.371-.84-1.704c-.334-.334-.791-.503-1.705-.841L15 5.5l.697-.258c.914-.338 1.371-.507 1.704-.84c.334-.334.503-.791.841-1.705z" />
                        <path stroke-linecap="round" d="M7 17.5c2.332-2.442 6.643-2.557 9 0M13.995 10c0 1.38-1.12 2.5-2.503 2.5A2.5 2.5 0 0 1 8.988 10c0-1.38 1.12-2.5 2.504-2.5a2.5 2.5 0 0 1 2.503 2.5Z" />
                    </g>
                </svg>
                <span class="text_optigo">Manage Accounts</span>
            </a>

            <a href="javascript:void(0);" class="menu_item_optigo_new" onclick="RedirectToPerosalQr();">
                <svg class="icon_optigo_new" width="24" height="24" xmlns="http://www.w3.org/2000/svg" width="{36}" height="{36}" viewBox="0 0 36 36">
                    <path fill="#4b4b4b" d="M5.6 4A1.6 1.6 0 0 0 4 5.6V12h8V4Zm4.4 6H6V6h4Z" className="clr-i-outline clr-i-outline-path-1"></path><path fill="#4b4b4b" d="M4 30.4A1.6 1.6 0 0 0 5.6 32H12v-8H4ZM6 26h4v4H6Z" className="clr-i-outline clr-i-outline-path-2"></path><path fill="#4b4b4b" d="M24 32h6.4a1.6 1.6 0 0 0 1.6-1.6V24h-8Zm2-6h4v4h-4Z" className="clr-i-outline clr-i-outline-path-3"></path><path fill="#4b4b4b" d="M30.4 4H24v8h8V5.6A1.6 1.6 0 0 0 30.4 4m-.4 6h-4V6h4Z" className="clr-i-outline clr-i-outline-path-4"></path><path fill="#4b4b4b" d="M20 10V8h-4v4h2v-2z" className="clr-i-outline clr-i-outline-path-5"></path><path fill="#4b4b4b" d="M12 12h2v2h-2z" className="clr-i-outline clr-i-outline-path-6"></path><path fill="#4b4b4b" d="M14 14h4v2h-4z" className="clr-i-outline clr-i-outline-path-7"></path><path fill="#4b4b4b" d="M20 6v2h2V4h-8v4h2V6z" className="clr-i-outline clr-i-outline-path-8"></path><path fill="#4b4b4b" d="M4 14h2v4H4z" className="clr-i-outline clr-i-outline-path-9"></path><path fill="#4b4b4b" d="M12 16v2h-2v-4H8v4H6v2H4v2h4v-2h2v2h2v-2h2v-4z" className="clr-i-outline clr-i-outline-path-10"></path><path fill="#4b4b4b" d="M20 16h2v2h2v-2h2v-2h-4v-4h-2v2h-2v2h2z" className="clr-i-outline clr-i-outline-path-11"></path><path fill="#4b4b4b" d="M18 30h-4v2h8v-2h-2v-2h-2z" className="clr-i-outline clr-i-outline-path-12"></path><path fill="#4b4b4b" d="M22 20v-2h-2v-2h-2v2h-2v2h2v2h2v-2z" className="clr-i-outline clr-i-outline-path-13"></path><path fill="#4b4b4b" d="M30 20h2v2h-2z" className="clr-i-outline clr-i-outline-path-14"></path><path fill="#4b4b4b" d="M22 20h6v2h-6z" className="clr-i-outline clr-i-outline-path-15"></path><path fill="#4b4b4b" d="M30 14h-2v2h-2v2h2v2h2v-2h2v-2h-2z" className="clr-i-outline clr-i-outline-path-16"></path><path fill="#4b4b4b" d="M20 22h2v6h-2z" className="clr-i-outline clr-i-outline-path-17"></path><path fill="#4b4b4b" d="M14 28h2v-2h2v-2h-2v-4h-2z" className="clr-i-outline clr-i-outline-path-18"></path><path fill="none" d="M0 0h36v36H0z"></path></svg>
                <span class="text_optigo">Personal QR</span>
            </a>


        </div>
        <div class="menu_section_optigo_new border_bottom_optigo_new">
            <a href="javascript:void(0);" class="menu_item_optigo_new" onclick="fun_TaskManagement()">
                <svg class="icon_optigo_new" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M17.75 3A3.25 3.25 0 0 1 21 6.25V13h-4.75A3.25 3.25 0 0 0 13 16.25V21H6.25A3.25 3.25 0 0 1 3 17.75V6.25A3.25 3.25 0 0 1 6.25 3zm2.81 11.5l-6.06 6.06v-4.31c0-.966.784-1.75 1.75-1.75z" />
                </svg>
                <span class="text_optigo">Tasks</span>
            </a>
            <a href="javascript:void(0);" class="menu_item_optigo_new" onclick="getMsg()">
                <svg class="icon_optigo_new" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M23 4.5C23 6.43 21.43 8 19.5 8S16 6.43 16 4.5S17.57 1 19.5 1S23 2.57 23 4.5M19.5 10A5.51 5.51 0 0 1 14 4.5c0-.5.08-1 .21-1.5H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14c1.11 0 2-.89 2-2V9.79c-.5.13-1 .21-1.5.21" />
                </svg>
                <span class="text_optigo">Messages</span>
            </a>
            <a href="javascript:void(0);" class="menu_item_optigo_new_move" onclick="MoveToOld()">
                <svg class="icon_optigo_new" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5">
                        <path stroke-linecap="round" d="M17.478 9h.022a4.5 4.5 0 0 1 2.064 8.5M17.478 9q.021-.247.022-.5a5.5 5.5 0 0 0-10.98-.477M17.478 9a5.5 5.5 0 0 1-1.235 3M6.52 8.023A5 5 0 0 0 4.818 17.5M6.52 8.023Q6.757 8 7 8c1.126 0 2.165.372 3 1" />
                        <path d="m12 14l.258.697c.338.914.507 1.371.84 1.704c.334.334.791.503 1.705.841l.697.258l-.697.258c-.914.338-1.371.507-1.704.84c-.334.334-.503.791-.841 1.705L12 21l-.258-.697c-.338-.914-.507-1.371-.84-1.704c-.334-.334-.791-.503-1.705-.841L8.5 17.5l.697-.258c.914-.338 1.371-.507 1.704-.84c.334-.334.503-.791.841-1.705z" />
                    </g></svg>
                <span class="text_optigo">Switch to Classic Optigo</span>
            </a>
        </div>
        <div class="menu_section_optigo_new border_bottom_optigo_new">
            <div class="section_title_optigo_new">Others Settings</div>

            <a href="javascript:void(0);" class="menu_item_optigo_new" id="reload_btn_event">
                <svg class="icon_optigo_new" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                        <path d="M20.945 13q.055-.492.055-1A9 9 0 0 0 5 6.343M3.055 11A9 9 0 0 0 19 17.657" />
                        <path d="M8 7H7c-1.414 0-2.121 0-2.56-.44C4 6.122 4 5.415 4 4V3m12 14h1c1.414 0 2.121 0 2.56.44c.44.439.44 1.146.44 2.56v1" />
                    </g>
                </svg>
                <span class="text_optigo">Refresh Cache</span>
            </a>

            <a href="javascript:void(0);" class="menu_item_optigo_new">
                <svg class="icon_optigo_new" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19 15q.3-.3.713-.3t.712.3L22 16.6q.3.3.3.7t-.3.7t-.7.3t-.7-.3L19 16.425q-.3-.3-.3-.712T19 15m1-12q.3.3.3.713t-.3.712L18.425 6q-.3.3-.712.3T17 6t-.3-.712t.3-.713L18.6 3q.3-.3.7-.3t.7.3M4 3q.3-.3.713-.3t.712.3L7 4.6q.3.3.3.7T7 6t-.712.3t-.713-.3L4 4.425q-.3-.3-.3-.712T4 3m1 12q.3.3.3.713t-.3.712L3.425 18q-.3.3-.712.3T2 18t-.3-.712t.3-.713L3.6 15q.3-.3.7-.3t.7.3m7 2.275l-4.15 2.5q-.275.175-.575.15t-.525-.2t-.35-.437t-.05-.588l1.1-4.725L3.775 10.8q-.25-.225-.312-.513t.037-.562t.3-.45t.55-.225l4.85-.425l1.875-4.45q.125-.3.388-.45t.537-.15t.537.15t.388.45l1.875 4.45l4.85.425q.35.05.55.225t.3.45t.038.563t-.313.512l-3.675 3.175l1.1 4.725q.075.325-.05.588t-.35.437t-.525.2t-.575-.15z" />
                </svg>
                <span class="text_optigo">Upgrade Plans</span>
                <span class="badge_optigo_new_pro">Pro</span>
            </a>
            <a href="javascript:void(0);" class="menu_item_optigo_new" onclick="openHelpPage()">
                <svg class="icon_optigo_new" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M12.028 17.23q.332 0 .56-.228t.228-.56t-.23-.56q-.228-.228-.56-.228t-.56.229t-.227.56q0 .332.228.56q.23.228.561.228M12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709m.059-13.262q.76 0 1.308.472q.55.471.55 1.178q0 .55-.31.995q-.308.444-.714.819q-.514.466-.905 1.025q-.391.56-.449 1.232q-.019.197.123.328q.14.132.33.132q.201 0 .339-.135q.137-.134.174-.317q.1-.506.402-.899q.301-.393.662-.745q.519-.515.921-1.124q.403-.608.403-1.357q0-1.102-.836-1.818q-.835-.716-1.96-.716q-.834 0-1.553.39q-.718.39-1.149 1.08q-.098.166-.063.343t.19.269q.198.104.4.048t.356-.232q.333-.414.784-.69q.45-.278.997-.278" />
                </svg>
                <span class="text_optigo">Help and Support</span>
            </a>
        </div>

        <!-- Section: Logout W -->
        <div class="menu_section_optigo_new">
            <a href="javascript:void(0);" class="menu_item_optigo_new logout_optigo" onclick="centralizelogout('0');">
                <svg class="icon_optigo_new" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5">
                        <path d="M20 7c-.077-1.418-.288-2.336-.864-3.038a4 4 0 0 0-.554-.554c-1.107-.908-2.75-.908-6.038-.908H12c-3.771 0-5.657 0-6.828 1.171S4 6.73 4 10.5v3c0 3.771 0 5.657 1.172 6.828S8.229 21.5 12 21.5h.544c3.288 0 4.932 0 6.038-.908q.304-.25.554-.555c.576-.702.787-1.62.864-3.037" />
                        <path stroke-linejoin="round" d="M16 8s4 2.946 4 4s-4 4-4 4m3.5-4H9" />
                    </g>
                </svg>
                <span class="text_optigo">Log out</span>
            </a>
        </div>
    </div>


    <!-- ends here -->



    <div class="clsBackDisable"></div>
    <div class="notifyContant">
        <div class="notify_Popup" id="notify_Popupdiv">
            <div class="header1">
                <div class="cls_active">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiAw0KGSJhZd8OAAABYElEQVQ4y5WTsUsCURzHv+95Ibg5tQRB7k6KECE0OiTRECeGQ0OIThKIW/+AGgguDk4d964hgtC1JZqcPHAQLggarkkcdNHj11Bo3r277DscvN/3fe73/fHeY5Do/shpAKHr8xevp8gAp0E3gNNACttJ0PrrFvOWnpXPBbsCqLO7c7x0u9xdMIq2jTElKIGxbRvFwA5PkfkjQsvL/Pv3WttXunAipydzv+wtvUMbvyCmd0TLJ5KRRmZRYRujMlpUkDHSUoBU1Aszd9fCDHVS5UMn+UAWlA+QlANxmNLRTMTlI0sPyu1w/FMrQIti4rtrokU9AI/B8gUsHvNGSmHkC4zW93YFsDLv+ubusrKrpGeFiQAJU8/+6tAPsybVggCqsWY/vAKmVTbM9YKAXI8Np1Xg53oLCwf4W29qTFoXJdEGANEWJa8reaJ3e8ornQHsYXl48bEFAIg8KgBuVc3rfQESKmwaVDFQQAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0wMy0xM1QxMDoyNTozNCswMTowMC80V7EAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDMtMTNUMTA6MjU6MzQrMDE6MDBeae8NAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg==" />
                </div>
                <img id="close_notify" onclick="closeNotification()" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiAw0KKTKjlPmZAAAAyElEQVQ4y6WUsQ7CIBBA31HTD3IycWLv4N6hP+HeuPsTHdgdOpdRF/2gJg1OmtIClXgjvHccHCDDkSultLonGbZyF0bOMtw5AJM02iTw2nUUwENRAlC4ztabOJRKWqa0MsMnaZXupUkpHt7oXgKDJoobkNhEbFTiucJJJLY8hMucCb4C4V15gqcQwlfCQgn0X5EZ/5WUuenfjnWXaNxHKVxnWTQu82pkXr44HlLEVu4Wx1fKSYYn+xS+UF6KcQsHbb6vcpTcb+YNkZq2almLyd4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDMtMTNUMTA6NDE6NTArMDE6MDD8ShAcAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTAzLTEzVDEwOjQxOjUwKzAxOjAwjReooAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=" />
            </div>
            <div class="notifyTitle">
                Notifications
            </div>
            <div id="cls_notification">
            </div>
        </div>
    </div>

    <%
        bool canOpenWelcomeTab =
            (mastermanagement_roleid.Value == "1" ||
             mastermanagement_roleid.Value == "-1" ||
             mastermanagement_roleid.Value == "3")
            && isWelcomePage == 1;
    %>

    <script>



        $(document).ready(function () {
            // Initialize UitsomeTab with Canva-style UI
            // 1. Prepare My Apps URL (Cleanly separated)
            var myAppsLink = "<%=((Auto_DomainPath!=null?Auto_DomainPath.ToString().Trim() + "myapp/app/myapps"+uSystem.uWebconfig.Extension.ToString().Trim():"")+"?p="+ objUser.IsPower.ToString().Trim() +"&appstype=user&appno="+(uSystem.uConvert.ToInt32(objUser.appno.ToString().Trim()).ToString().Trim() == "22" ? "10" : uSystem.uConvert.ToInt32(objUser.appno.ToString().Trim()).ToString().Trim())+"&l="+objUser.Login_LogId+"&-="+(objUser!=null && objUser.Logintoken!=null?EncodeString.EncodeString.Encode(objUser.Logintoken.ToString().Trim()):"")) %>";



            $.uitsomeTab.init({
                container: "#app",
                // LEFT: Just the home button (built-in)
                showHomeButton: false,
                leftContent: `
          <div id="divheadeprojectlogo" class="class1" oncontextmenu="return false;" style="user-select: none; -webkit-user-select: none; cursor: pointer; margin: 5px 0px 5px 10px; background: url(<%=LPDL.Trim()%>) 0% 50% / contain no-repeat; width: 110px; height: 35px; float: left;"><label style="font-size:13px;color:#AAA;opacity:0;cursor:pointer;">  ::<!--project-->Istore orail<!--endofpr--> ::  </label></div>
          `,

                // RIGHT: Notification and User icons
                rightContent: `
        <input id="focusProxy" type="text" style="position:absolute;top:-9999px;left:-9999px;">

    <button class="ai-btn" onclick="NavigateToAiPage()">
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#f9f9f9" d="m9.96 9.137l.886-3.099c.332-1.16 1.976-1.16 2.308 0l.885 3.099a1.2 1.2 0 0 0 .824.824l3.099.885c1.16.332 1.16 1.976 0 2.308l-3.099.885a1.2 1.2 0 0 0-.824.824l-.885 3.099c-.332 1.16-1.976 1.16-2.308 0l-.885-3.099a1.2 1.2 0 0 0-.824-.824l-3.099-.885c-1.16-.332-1.16-1.976 0-2.308l3.099-.885a1.2 1.2 0 0 0 .824-.824m8.143 7.37c.289-.843 1.504-.844 1.792 0l.026.087l.296 1.188l1.188.297c.96.24.96 1.602 0 1.842l-1.188.297l-.296 1.188c-.24.959-1.603.959-1.843 0l-.297-1.188l-1.188-.297c-.96-.24-.96-1.603 0-1.842l1.188-.297l.297-1.188zm.896 2.29a1 1 0 0 1-.203.203a1 1 0 0 1 .203.203a1 1 0 0 1 .203-.203a1 1 0 0 1-.203-.204M4.104 2.506c.298-.871 1.585-.842 1.818.087l.296 1.188l1.188.297c.96.24.96 1.602 0 1.842l-1.188.297l-.296 1.188c-.24.959-1.603.959-1.843 0l-.297-1.188l-1.188-.297c-.96-.24-.96-1.603 0-1.842l1.188-.297l.297-1.188zM5 4.797a1 1 0 0 1-.203.202A1 1 0 0 1 5 5.203a1 1 0 0 1 .203-.204A1 1 0 0 1 5 4.796"/></svg>
         AI Magic
    </button>
   <div style="margin-top: 0px;cursor: pointer;" title="Search (Ctrl+K)">
          <button class="search-trigger-de" onclick="openCmdPalette()">


      <span class="label">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
          d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"/>
      </svg>
        Search</span>

      <span class="key-hint dev">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5" d="M15 9v6H9V9zm0 6h3a3 3 0 1 1-3 3zm-6 .002H6a3 3 0 1 0 3 3zM15 9V6a3 3 0 1 1 3 3zM9 9V6a3 3 0 1 0-3 3z"/></svg>
        K
      </span>
    </button>
        </div>
            <button class="uitsome-icon-btn"  onclick="getNotification()">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="#f7f7f7" d="M5 18h14v-6.969C19 7.148 15.866 4 12 4s-7 3.148-7 7.031zm7-16c4.97 0 9 4.043 9 9.031V20H3v-8.969C3 6.043 7.03 2 12 2M9.5 21h5a2.5 2.5 0 0 1-5 0"/>
              </svg>
              <span class="uitsome-badge"><%=hdnUnReadNotificationcount.Value %></span>
            </button>

            <button  id="iconInfo"  class="uitsome-user-btn classUserIcon" title="Profile">
                <img style="width:100%;height:100%;border-radius:50%;" src="<%=DefaultImageLogoPath.ToString().Trim() + "?u=" + DateTime.Now.ToString("ddMMyyyyHHmmss")%>" onerror="onerrimg(this);" />
            </button>
          `,


                showAddButton: true,
                contextMenu: true,
                contextMenuBuilder: function (tab) {


                    function getParamFromUrl(url, paramName) {
                        if (!url || !paramName) return null;

                        // Remove everything before ?, if any
                        const queryStart = url.indexOf("?");
                        if (queryStart === -1) return null;

                        const queryString = url.slice(queryStart + 1);

                        // Split into key=value pairs
                        const pairs = queryString.split("&");

                        for (let i = 0; i < pairs.length; i++) {
                            const [key, value] = pairs[i].split("=");
                            if (key && key.trim() === paramName) {
                                // Decode URI safely
                                try {
                                    return value ? decodeURIComponent(value) : "";
                                } catch (e) {
                                    return value || ""; // return raw if decode fails
                                }
                            }
                        }

                        return null; // not found
                    }


                    var items = [];

                    const tabPageId = getParamFromUrl(tab?.url, "pid");
                    const tabTitle = tab?.title || "";
                    if (tabPageId) {
                        console.log(tabPageId, "tab.pageid")
                        if (_vroleid === "3") {
                            items.push({
                                label: "Help For User",
                                action: "User",
                                pageId: tabPageId,
                                title: tabTitle
                            });
                        }

                        if (_vroleid === "-1" || _vroleid === "-2") {
                            items.push({
                                label: "Help For Support",
                                action: "Support",
                                pageId: tabPageId,
                                title: tabTitle
                            });
                        }

                        items.push({ separator: true });

                        items.push({
                            label: "Help For Admin",
                            action: "Admin",
                            pageId: tabPageId,
                            title: tabTitle
                        });
                    }

                    return items;
                },

                // Callbacks
                onTabAdd: function (tab) {
                    console.log("Tab added:", tab.title);
                },
                onTabSelect: function (tab) {
                    console.log("Tab:", tab);
                    console.log("Tab selected:", tab.title);

                    var ttl = "";
                    if (tab.title) {
                        ttl = tab.title?.split(' ')?.join('')?.replace(/\//g, '');
                    }
                    var tobj = $('#' + ttl);
                    if (tobj != undefined && tobj != null) {
                        if (tobj.length > 0) {
                            tobj = tobj[0];
                            setTimeout(function () {
                                resizeGridFromHome(tobj);
                            }, 100);
                        }
                    }
                },
                onTabClose: function (tab) {
                    console.log("Tab closed:", tab.title);
                },
                onHomeClick: function () {
                    $.uitsomeTab.addTab({
                        title: "Home",
                        icon: "layout",
                        url: 'Home_New.aspx',
                        closable: true,
                    });
                },
                onAddClick: function () {
                    var newId = Date.now();
                    $.uitsomeTab.addTab({
                        title: "Add New",
                        icon: "layout",
                        url: "<%=((Auto_DomainPath!=null?Auto_DomainPath.ToString().Trim() + "myapp/app/Home_New"+uSystem.uWebconfig.Extension.ToString().Trim():"")+"?p="+ objUser.IsPower.ToString().Trim() +"&appstype=user&appno="+(uSystem.uConvert.ToInt32(objUser.appno.ToString().Trim()).ToString().Trim() == "22" ? "10" : uSystem.uConvert.ToInt32(objUser.appno.ToString().Trim()).ToString().Trim())+"&l="+objUser.Login_LogId+"&-="+(objUser!=null && objUser.Logintoken!=null?EncodeString.EncodeString.Encode(objUser.Logintoken.ToString().Trim()):"")) %>?rtm=home",
                        closable: true,
                        mode: "new"   // 👈 explicit
                    });
                },
            });

            $.uitsomeTab.addTab({
                title: "Home",
                icon: "layout",
                url: "<%=((Auto_DomainPath!=null?Auto_DomainPath.ToString().Trim() + "myapp/app/Home_New"+uSystem.uWebconfig.Extension.ToString().Trim():"")+"?p="+ objUser.IsPower.ToString().Trim() +"&appstype=user&appno="+(uSystem.uConvert.ToInt32(objUser.appno.ToString().Trim()).ToString().Trim() == "22" ? "10" : uSystem.uConvert.ToInt32(objUser.appno.ToString().Trim()).ToString().Trim())+"&l="+objUser.Login_LogId+"&-="+(objUser!=null && objUser.Logintoken!=null?EncodeString.EncodeString.Encode(objUser.Logintoken.ToString().Trim()):"")) %>",
                closable: false,

            });


            //setTimeout(function () {
            //    var $helpbar = $('.uitsome-helpbar');
            //    $helpbar.append($('#divexpirealert'));
            //    $helpbar.append($('#divnotify'));
            //    $helpbar.append($('#divnotification'));
            //    $helpbar.append($('#divversionupdate'));
            //    window.__Notification_Bar = data;
            //     Check if the server rendered a text message initially, if so, show it
            //    if ($('#divexpirealert').text().trim() !== '') $('#divexpirealert').show();
            //    if ($('#divnotify').text().trim() !== '') $('#divnotify').show();

            //    checkHelpBar();
            //    fn_getnote();
            //}, 500);

        });

        // Helper functions
        function openTab(title, url, icon) {
            $.uitsomeTab.addTab({
                title: title,
                url: url,
                icon: icon || "file",
                closable: true,
            });
        }



        // API functions matching your existing codebase
        function addTab(title, icon, lnk, pageid, IsGroupedMenu, flg) {
            // ---------------------------------------------------------
            // 1. Handle Special External Links / Redirects (Logic from old code)
            // ---------------------------------------------------------
            if (title != undefined && title != null &&
                ($.trim(title).toLowerCase() == "product making guide" ||
                    $.trim(title).toLowerCase() == "estimate" ||
                    $.trim(title).toLowerCase() == "sales counter" ||
                    $.trim(title).toLowerCase() == "employee wise issue wt" ||
                    ($.trim(title).toLowerCase() == "wip report print" && inc(lnk.toLowerCase(), "reportmanagement_wipreport_print1")) ||
                    ($.trim(title).toLowerCase() == "design mis" && lnk.toLowerCase().indexOf("master") > -1 && lnk.toLowerCase().indexOf("dash") > -1) ||
                    ($.trim(title).toLowerCase() == "production mis" && lnk.toLowerCase().indexOf("master") > -1 && lnk.toLowerCase().indexOf("dasha") > -1) ||
                    ($.trim(title).toLowerCase() == "sales analysis" && lnk.toLowerCase().indexOf("master") > -1 && lnk.toLowerCase().indexOf("dashb") > -1) ||
                    ($.trim(title).toLowerCase() == "account mis" && lnk.toLowerCase().indexOf("master") > -1 && lnk.toLowerCase().indexOf("dashc") > -1)
                )) {

                var LinkSpl = lnk.split('?');
                var Pagelink = LinkSpl.length > 0 ? LinkSpl[0] : lnk;
                var strvar = LinkSpl.length > 1 ? LinkSpl[1] : "";

                // Open in new window/tab
                redirectPost(Pagelink, strvar, '_blank');
                return;
            }

            // ---------------------------------------------------------
            // 2. Handle specific actions like "Call Back" or "Login"
            // ---------------------------------------------------------
            if (title != undefined && title != null && $.trim(title).toLowerCase() == "call back") {
                getcallrequest();
                return;
            }

            if (lnk == 'Login') {
                centralizelogout('0');
                return;
            }


            var ttl = "";
            if (title) {
                ttl = title.split(' ').join('').replace(/\//g, '');
            }


            if (ttl != 'BulkPurchase') {
                var safePageId = (pageid !== undefined && pageid !== null) ? pageid : "";

                if (lnk) {
                    if (lnk.indexOf("?") > -1) {
                        lnk = lnk + "&ifid=" + ttl + "&pid=" + safePageId;
                    } else {
                        lnk = lnk + "?ifid=" + ttl + "&pid=" + safePageId;
                    }
                }
            }
            //if (lnk != undefined && lnk != null) {
            //    //lnk = encodeURI(lnk);
            //}
            $.uitsomeTab.addTab({
                title: title,
                url: lnk,
                icon: icon,
                closable: true,
                IsGroupedMenu,
                flg
            });
        }

        function SelectTab(title, link, pageid) {
            if ($.uitsomeTab.hasTab(title)) {
                $.uitsomeTab.selectTab(title);
            } else if (link) {
                $.uitsomeTab.addTab({
                    title: title,
                    url: link,
                    closable: true,
                });
            }
        }

        function CloseTab(title) {
            $.uitsomeTab.closeTab(title);
        }

        function CloseAllTab() {
            $.uitsomeTab.closeAllTabs();
        }

        // For iframe communication

        function PageUselog(title, icon, pagename_url, pageid, IsGroupedMenu, flg) {


            var link;
            var ttl = "";
            if (title) {
                ttl = title?.split(' ')?.join('')?.replace(/\//g, '');
            }
            if (title != undefined && title != null &&
                ($.trim(title).toLowerCase() == "product making guide" ||
                    $.trim(title).toLowerCase() == "estimate" ||
                    $.trim(title).toLowerCase() == "sales counter" ||
                    $.trim(title).toLowerCase() == "employee wise issue wt"
                )) {
                window.open(pagename_url, '_blank');
                return;
            }

            // Append 'ifid' and 'pid' to the URL
            if (ttl != 'BulkPurchase') {
                var safePageId = (pageid !== undefined && pageid !== null) ? pageid : "";

                if (link) {
                    if (lnk.indexOf("?") > -1) {
                        // If params exist, append with '&'
                        link = link + "&ifid=" + ttl + "&pid=" + safePageId;
                    } else {
                        // If no params, start with '?'
                        link = link + "?ifid=" + ttl + "&pid=" + safePageId;
                    }
                }
            }
            link = pagename_url + "&ifid=" + ttl + "&pid=" + safePageId;

            $.ajax({
                url: '../Ajax/Ajax_PageUselog' + _Extension + '',
                data: 'mode=pagelog&pageid=' + pageid
                    + '&isnewui=1',
                type: 'post',
                success: function (data) {
                    $.uitsomeTab.addTab({
                        title: title,
                        url: link,
                        icon: icon,
                        closable: true,
                        IsGroupedMenu,
                        flg
                    });

                }
            });
        }

        window.PageUselog = function (title, icon, pagename_url, pageid, IsGroupedMenu, flg) {
            //debugger;
            //amrut 01/07/2026
            var link;
            var ttl = "";
            if (title) {
                ttl = title.split(' ').join('').replace(/\//g, '');
            }

            if (title != undefined && title != null &&
                ($.trim(title).toLowerCase() == "product making guide" ||
                    $.trim(title).toLowerCase() == "estimate" ||
                    $.trim(title).toLowerCase() == "sales counter" ||
                    $.trim(title).toLowerCase() == "employee wise issue wt"
                )) {
                window.open(pagename_url, '_blank');
                return;
            }

            // Append 'ifid' and 'pid' to the URL
            if (ttl != 'BulkPurchase') {
                var safePageId = (pageid !== undefined && pageid !== null) ? pageid : "";

                if (link) {
                    if (lnk.indexOf("?") > -1) {
                        // If params exist, append with '&'
                        link = link + "&ifid=" + ttl + "&pid=" + safePageId;
                    } else {
                        // If no params, start with '?'
                        link = link + "?ifid=" + ttl + "&pid=" + safePageId;
                    }
                }
            }
            link = pagename_url + "&ifid=" + ttl + "&pid=" + safePageId;

            $.ajax({
                url: '../Ajax/Ajax_PageUselog' + _Extension + '',
                data: 'mode=pagelog&pageid=' + pageid + '&isnewui=1',
                type: 'post',
                success: function (data) {
                    $.uitsomeTab.addTab({
                        title: title,
                        url: link,
                        icon: icon,
                        closable: true,
                        IsGroupedMenu, flg
                    });

                }
            });
        }




    </script>



    <script type="text/javascript">


        function NavigateToAiPage() {
            console.log("View details is called adpt : ", ADPT);
            CloseTab('AI Magic');
            addTab('AI Magic', 'icon-Help', JJPT + '/AiMagic/AiMagic.html');
        }




        var varsettmout;
        function onerrimg(obj) {
            $(obj).attr('src', '<%=uSystem.uWebconfig.jojsPath.ToString().Trim() + "/images/empface.png"%>');
        }

        function setdefaultprof(obj) {
            $(obj).addClass('defProfile');
        }

        $(document).ready(function () {


        //$('#iconInfo').attr('src', '<%=DefaultImageLogoPath.ToString().Trim()%>');


            //$('.classuserPopup').hide(); 
            $('.dropdown_menu_optigo_new').hide();

            $('#iconInfo').click(function () {
                // $('.classuserPopup').toggle();
                $("#dropdownMenu_optigo_new").fadeToggle(200); // 200ms smooth fade
                $('.bckDisable').show();
            });


            $('#dropdownMenu_optigo_new').on('click', 'a', function () {
                $('#dropdownMenu_optigo_new').fadeOut(200);
                $('.bckDisable').hide();
            });


            $('#reloadbtn').click(function () {
                $('#reloadbtn').attr('disable', true);
                clearTimeout(varsettmout);
                varsettmout = setTimeout(function () {
                    $.ajax({
                        url: '../Ajax/ajax_reloadsession.aspx',
                        type: 'post',
                        dataType: 'json',
                        data: 'mode=reloadsession',
                        success: function (data) {

                            if (data.length > 0) {
                                $('#reloadbtn').attr('disable', false);

                                if (data != undefined && data != null && $.trim(data[0]['msg']) == 'success') {

                                    localStorage.removeItem("searchArr");
                                    searchArr = [];
                                    searchArr.length = 0;
                                    _AppUserPageRights = new Array;

                                    filterFunction('search');
                                    filterFunction('fav');

                                    location.reload();
                                    parent.location.reload();
                                    parent.parent.location.reload();
                                }
                            }
                        }
                    });

                }, 1000);
                return false;
            });



            $('#reload_btn_event').click(function () {
                $('#reload_btn_event').attr('disable', true);
                clearTimeout(varsettmout);
                varsettmout = setTimeout(function () {
                    $.ajax({
                        url: '../Ajax/ajax_reloadsession.aspx',
                        type: 'post',
                        dataType: 'json',
                        data: 'mode=reloadsession',
                        success: function (data) {

                            if (data.length > 0) {
                                $('#reload_btn_event').attr('disable', false);

                                if (data != undefined && data != null && $.trim(data[0]['msg']) == 'success') {

                                    localStorage.removeItem("searchArr");
                                    searchArr = [];
                                    searchArr.length = 0;
                                    _AppUserPageRights = new Array;

                                    filterFunction('search');
                                    filterFunction('fav');

                                    location.reload();
                                    parent.location.reload();
                                    parent.parent.location.reload();
                                }
                            }
                        }
                    });

                }, 1000);
                return false;
            });

            $(function () {
                var initialTop = null;
                $(window).resize(function () {


                    var popupwt = $(window)[0].innerWidth - 320;
                    //$('.classuserPopup').css('margin-left', (popupwt + 'px'))

                    var popupht = $('.dropdown_menu_optigo_new')[0].offsetTop + 51;
                    //$('.classuserPopup').css('top', (popupht + 'px'))
                    if (initialTop === null) {
                        initialTop = $('.dropdown_menu_optigo_new')[0].offsetTop + 51;
                    }

                    $('.dropdown_menu_optigo_new').css({ top: initialTop, left: popupwt, position: "fixed" });
                }).resize();
            });


            $(window).blur(function () {
                // If the menu is open and user clicks into an iframe (window blurs)
                if ($("#dropdownMenu_optigo_new").is(':visible')) {
                    $("#dropdownMenu_optigo_new").fadeOut(200);
                    $(".bckDisable").hide();
                }
            });




            $(document).mouseup(function (e) {
                var $accountMenu = $("#dropdownMenu_optigo_new");
                var clickedAccountBtn = $(e.target).closest('#iconInfo').length > 0;
                var clickedAccountMenu = $(e.target).closest('#dropdownMenu_optigo_new').length > 0;

                if ($accountMenu.is(':visible')) {
                    // If we clicked OUTSIDE the menu AND OUTSIDE the button, close it.
                    if (!clickedAccountMenu && !clickedAccountBtn) {
                        $accountMenu.fadeOut(200);
                        $('.bckDisable').hide();
                    }
                }

                var notiPopup = $("#notify_Popupdiv");
                var notiBtn = $(e.target).closest('[onclick*="getNotification"], .notify, .uitsome-icon-btn, .classUserIcon');

                if (!notiPopup.is(e.target) && notiPopup.has(e.target).length === 0 && notiBtn.length === 0) {
                    if (notiPopup.is(':visible')) {
                        closeNotification();
                    }
                }
            });


            $(document).mouseup(function (e) {
                var upopupsrch = $("#myDropdown")
                if (!$('#myInput').is(e.target) && !upopupsrch.is(e.target) && upopupsrch.has(e.target).length == 0) {
                    $("#myDropdown").hide();
                    $('.bckDisablesearch').hide();
                    $('#myInput').removeAttr('value');;
                    $('#myInput').css({ 'z-index': '0', 'background-color': 'rgba(255,255,255,.1)', 'color': '#fff' });
                    $('#myDropdown').css('z-index', '10');
                }
            });
            $('#editbtn').click(function () {
                $(".dropdown_menu_optigo_new").hide();
                $('.bckDisable').hide();

            });

        });

    </script>
    <script type="text/javascript">
        $(document).ready(function () {

            setTimeout(function () {

                if ($('#divnotmsg') != undefined
                    && $('#divnotmsg').text() != undefined
                    && $('#divnotmsg').text() != "") {
                    $('#divnotification').show();
                }

                if ($('#divversionupdatemsg') != undefined
                    && $('#divversionupdatemsg').text() != undefined
                    && $('#divversionupdatemsg').text() != "") {
                    $('#divversionupdate').show();
                }

                getQuickAccessMenu();
            }, 800);

            $('#myInput').focus(function () {
                filterFunction('fav');
            });

        });
        function getQuickAccessMenu() {

        }

        function JobQuickSearch(StockBarcode) {
            $.ajax({
                url: '../Ajax/Ajax_UserManagement_QuickAccess' + _Extension + '',
                data: "mode=CheckJob&StockBarcode=" + StockBarcode,
                type: 'POST',
                success: function (data) {
                    if (data != undefined && data != null && $.trim(data) == "1") {
                        //StockBarcode = Base64.encode(StockBarcode);
                        CloseTab('Search Job');
                        addTab('Search Job', 'icon-SearchJob', ADPT + 'mfg/app/ProductionManagement_QuickSearchJob?serialjobno=' + $.trim(StockBarcode) + '&-=' + _LT);
                    }
                    else {
                        StockBarcode = Base64.encode(StockBarcode);
                        CloseTab('Quick Search');
                        addTab('Quick Search', 'icon-QuickSearch', ADPT + 'salescrm/app/JobManagement_QuickSearch?StockBarcode=' + $.trim(StockBarcode) + '&-=' + _LT);
                    }
                }
            })

        }
    </script>
    <span class="pic arrow-up" style="display: none;"></span>
    <div class="rightMenu" id="rightMenudiv">

        <%if (objUser.mastermanagement_roleid.ToString().Trim().Equals("-1"))
            { %>
        <a href="javascript:void(0)" onclick="fn_ResetAllPassword()">Reset Password </a>
        <a href="javascript:void(0)" onclick="fn_ResetActivationDate()">Reset Activation Date </a>
        <%} %>
        <a href="javascript:void(0)" onclick="HideMenu()">Exit </a>

    </div>
    <div class="backDisable" style="display: none;"></div>
    <input name="hdnUserId" type="hidden" id="hdnUserId" />
    <input name="hdnMemberType" type="hidden" id="hdnMemberType" />
    <script type="text/javascript">
        var deski = true;
        $(document).ready(function () {
            $('#lblsession').html($('#hdnsession').val());
            $('.panel-tool').click(function () {
                $(".layout-expand div.panel-body").html("<div class='panel-splitdiv'><span class='panel-split'></span></div>");
                resizepanel();
            });
            if ($('#ordertrackflg').val() == 1) {
                $('#DeskBoard').attr('src', 'Deskboard');
                setTimeout(function () {
                    tabm();
                }, 2000);
            }
            else {
                $('#DeskBoard').attr('src', 'Deskboard');
                tabm();
            }
        });
        $('#DeskBoard').attr('src', 'Deskboard');
        function relaod() {
            tabm();
        }
    </script>
    <form runat="server"></form>
    <script type="text/javascript">
        function toggleFullScreen(_iframeid) {
            var _element = document.getElementById(_iframeid);

            if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) ||
                (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) ||
                (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
                if (_element.requestFullScreen) {
                    _element.requestFullScreen();


                } else if (_element.mozRequestFullScreen) {
                    _element.mozRequestFullScreen();

                } else if (_element.webkitRequestFullScreen) {
                    _element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);

                } else if (_element.msRequestFullscreen) {
                    _element.msRequestFullscreen();
                }

            } else {
                if (document.cancelFullScreen) {
                    document.cancelFullScreen();

                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();

                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }

            }

        }
        document.addEventListener('webkitfullscreenchange', fullscreenChange);

        function fullscreenChange() {

            if (document.fullscreenEnabled ||
                document.webkitIsFullScreen ||
                document.mozFullScreen ||
                document.msFullscreenElement) {
                //console.log('enter fullscreen');               
            }
            else {

                //console.log('exit fullscreen');
                var iframeId = $(document)[0].activeElement.id;
                $('#' + iframeId + '')[0].contentWindow["exitFullScreen"]();
            }

        }
        function initialiseNotification() {
            console.log(totalNotificationCnt);
            $.ajax({
                url: ADPT + 'task/Ajax/Ajax_Messagemanagement_Notifications_Inbox' + _Extension + '',
                data: 'mode=getNotificationAlerts&page=1&rp=' + totalNotificationCnt + '&sortname=isnull(IsRead,0) ,notificationdate&sortorder=desc',
                type: 'POST',
                dataType: 'json',
                success: function (data) {
                    var notifypopup = '';
                    $('#cls_notification').html('');

                    if (data.Notification.length > 0) {
                        console.log("if");
                        //notificationsubject
                        //New Customer Registration
                        //if (data.Notification[i]["notificationtype"] == "Redirect") {
                        //    onclick = '<div class="main1" onclick="msgRedirect(\'' + data.Notification[i]["id"] + '\',\'' + data.Notification[i]["pageid"] + '\',\'' + data.Notification[i]["JsonData"] + '\');">' + data.Notification[i]["notificationsubject"] + '</div>'
                        //} else {
                        //    onclick = '<div class="main1" onclick="msgopen(\'' + data.Notification[i]["id"] + '\',\'' + data.Notification[i]["eid"] + '\',\'' + data.Notification[i]["notificationtype"] + '\');">' + data.Notification[i]["notificationsubject"] + '</div>'
                        //}
                        for (var i = 0; i < data.Notification.length; i++) {

                            var tonclick = "";
                            var subject = $.trim(data.Notification[i]["notificationsubject"]);
                            if ($.trim(data.Notification[i]["notificationtype"]) === "Redirect") {
                                tonclick = 'onclick="msgRedirect(\'' +
                                    $.trim(data.Notification[i]["id"]) + '\',\'' +
                                    $.trim(data.Notification[i]["pageid"]) + '\',\'' +
                                    encodeURIComponent(data.Notification[i]["JsonData"]) + '\',\'' +
                                    subject +
                                    '\');"';
                            }


                            
                            var body = data.Notification[i]["notificationbody"];
                            var isRead = data.Notification[i]["IsRead"];

                            var rawDate = data.Notification[i]["notificationdate"];
                            var displayTime = formatNotificationTime(rawDate);

                            var tickColor = (isRead == 1 || isRead == "1" || isRead == true) ? "#0056b3" : "#b0b0b0";
                            var tickMark = '<span style="color: ' + tickColor + '; font-size: 13px; margin-left: 6px;" title="' + (isRead == 1 ? 'Read' : 'Unread') + '">✔</span>';

                            notifypopup += '<div class="main" style="border: 1px solid #ddd; border-radius: 8px; margin: 8px; padding: 12px; font-family: Arial, sans-serif; background-color: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.05); display: block; width: auto; max-width: 350px; min-width: 250px; height: auto; overflow: hidden;">'
                                + '    <div class="task1" id="noti_' + data.Notification[i]["id"] + '" style="height: auto; cursor:pointer;" ' + tonclick + '>'

                                // LINE 1: Title (Uses notificationsubject)
                                + '        <div style="font-weight: bold; font-size: 14px; color: #0056b3; padding-bottom: 6px; margin-bottom: 6px; border-bottom: 1px solid #eee;">'
                                + subject
                                + '        </div>'

                                // LINE 2: Body (Uses notificationbody)
                                // Added 'white-space: pre-wrap;' so that \n in your database text renders as actual line breaks in HTML
                                + '        <div style="font-size: 13px; color: #444; margin-bottom: 8px; white-space: pre-wrap; line-height: 1.4;">'
                                + body
                                + '        </div>'

                                // LINE 3: Date & Footer
                                + '        <div style="font-size: 11px; color: #888; border-top: 1px dotted #eee; padding-top: 6px; display: flex; justify-content: space-between;">'
                                + '            <span>' + displayTime + '</span>'
                                + '            <span style="font-style: italic; display: flex; align-items: center;">' + tickMark + '</span>'
                                + '        </div>'

                                + '    </div>'
                                + '</div>';

                        }
                        $("#cls_notification").append(notifypopup);
                    }
                }
            });
        }

        function formatNotificationTime(dateString) {
            if (!dateString) return "";

            var date = new Date(dateString);
            var now = new Date();

            var diffMs = now - date;
            var diffMins = Math.floor(diffMs / 60000);
            var diffHrs = Math.floor(diffMs / 3600000);

            var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            var startOfDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            var diffDays = Math.round((startOfToday - startOfDate) / (1000 * 60 * 60 * 24));

            var hours = date.getHours();
            var mins = date.getMinutes();
            var ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            mins = mins < 10 ? '0' + mins : mins;
            var timeStr = hours + ':' + mins + ' ' + ampm;


            if (diffDays > 7) {
                var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                var day = date.getDate();
                var month = months[date.getMonth()];
                var year = date.getFullYear().toString().substring(2);
                return day + ' ' + month + ' ' + year + ', ' + timeStr;
            }

            if (diffDays >= 2 && diffDays <= 7) {
                return diffDays + ' days ago ' + timeStr;
            }

            if (diffDays === 1) {
                return 'Yesterday ' + timeStr;
            }

            if (diffDays === 0) {
                if (diffMins < 60) {
                    return diffMins === 0 ? "Just now" : diffMins + ' minutes ago';
                } else {
                    return diffHrs + ' hours ago';
                }
            }

            return dateString;
        }

        function msgread(obj, id) {
            $.ajax({
                url: ADPT + 'task/Ajax/Ajax_Messagemanagement_Notifications_Inbox' + _Extension + '',
                data: "-=" + LTKN + "&mode=readmsg&encodedid=" + id,
                type: 'POST',
                dataType: 'json',
                success: function (data) {
                    if (data.Notification.length > 0) {
                        if (data.Notification[0]["msg"] == "success") {
                            $(obj).removeClass('clsnotifiunread');
                            $(obj).addClass('clsnotifiread');
                            $('#notificationcount').text(parseInt($('#notificationcount').text()) - 1);
                            parseInt($('#notificationcount').text()) === 0 ? $('.clsntfcnt').hide() : $('.clsntfcnt').show();
                        }
                    }
                }
            });
        }
        function DelSingle(encodedid, notificationsubject, id) {
            if (confirm("Are You Sure Want To Delete " + notificationsubject + "?")) {
                $.ajax({
                    url: ADPT + 'task/Ajax/Ajax_Messagemanagement_Notifications_Inbox',
                    data: "-=" + LTKN + "&mode=del&encodedid=" + encodedid
                        + "&notificationsubject=" + notificationsubject,
                    type: 'POST',
                    dataType: 'json',
                    success: function (data) {
                        if (data.Notification.length > 0) {
                            if (data.Notification[0]["msg"] == "success") {
                                $('#noti_' + id + '').parent().remove();
                            }
                        }
                    }
                });
                return false;
            }
        }
    </script>



    <script>
        (function (w, $) {
            // 1. Efficient Zoom Detection
            function getZoom() {
                var ratio = 1;
                // Modern Browsers (Chrome, Edge, Opera, Desktop Safari)
                if (w.outerWidth && w.innerWidth) {
                    ratio = w.outerWidth / w.innerWidth;
                }
                // IE8+ 
                else if (screen.logicalXDPI && screen.systemXDPI) {
                    ratio = screen.deviceXDPI / screen.logicalXDPI;
                }
                // Firefox / Standard Fallback
                else if (w.devicePixelRatio) {
                    ratio = w.devicePixelRatio;
                }
                return Math.round(ratio * 100) / 100;
            }

            // 2. Application Logic
            function updateLayout() {
                var zoom = getZoom().toFixed(2);

                // Configuration: Add more zoom levels here if needed
                // Format: 'ZOOM_LEVEL': { inputWidth: '...', menuWidth: '...' }
                var styles = {
                    "1.00": { input: "460px", menu: "458px" },
                    "1.10": { input: "267px", menu: "266px" }
                };

                var currentStyle = styles[zoom];

                // Only apply if we have a match for this zoom level
                if (currentStyle) {
                    $('#myInput').css({ "width": currentStyle.input, "margin-left": "0" });
                    $('.MenuContainer').css({ "width": currentStyle.menu });
                }
            }

            // 3. Run on Load + Debounced Resize
            var resizeTimer;
            $(document).ready(function () {
                updateLayout();

                $(w).on('resize', function () {
                    clearTimeout(resizeTimer);
                    resizeTimer = setTimeout(updateLayout, 100);
                });
            });

        })(window, jQuery);
    </script>

    <script type="text/javascript">

        var cmdSelectedIndex = -1;

        // keyword stroke Pattern Generator
        //function isCmdPaletteShortcut(e) {
        //    const isCtrlOrCmd = e.ctrlKey || e.metaKey;

        //    const isCtrlK = e.key.toLowerCase() === 'k';
        //    const isCtrlSpace =
        //        e.code === 'Space' || e.key === ' ' || e.keyCode === 32;

        //    return isCtrlOrCmd && (isCtrlK || isCtrlSpace);
        //}


        function openCmdPalette() {
            if ($('#cmd-k-overlay').is(':hidden')) {
                $('#cmd-k-overlay').css('display', 'flex').hide().fadeIn(150);
                $('#cmd-k-input').val('').focus();
                $('#cmd-k-results').empty();
                $('#cmd-k-placeholder').hide();
                cmdSelectedIndex = -1; // Reset to no selection
                renderFixedFavorites();
                renderMostSearched();
                $('#cmd-k-initial').show();
            }
        }

        function closeCmdPalette() {
            $('#cmd-k-overlay').fadeOut(150, function () {
                $('#cmd-k-input').val('');
                $('#cmd-k-results').empty();
                $('#cmd-k-initial').hide();
            });
        }


        $('.close_cmd_btn').on('click', function () {
            closeCmdPalette();
        });



        function renderFixedFavorites() {
            var finalFavs = [];
            var seenNames = [];

            if (typeof searchArr !== 'undefined') {
                var standardFavs = searchArr.filter(function (x) {
                    return x.IsFav == 1;
                }).sort(function (a, b) {
                    return a.FavOrder - b.FavOrder;
                });

                $.each(standardFavs, function (i, data) {
                    // Construct the standard click action
                    var clickAction = "PageUselog('" + data.title + "', 'icon-" + data.submenuname.replace(/ /g, '') + "', '" + data.pagename_url + "', '" + data.id + "', '" + data.IsGroupedMenu + "', '" + data.formappsid + "'); $('#cmd-k-overlay').fadeOut();";

                    finalFavs.push({
                        name: data.submenuname,
                        action: clickAction
                    });
                    seenNames.push($.trim(data.submenuname).toLowerCase());
                });
            }

            // 2. Scrape the "Right Menu" for missing items (Like "Code Error", "SP Error")
            $('#rightMenudiv a').each(function () {
                var text = $.trim($(this).text());
                var onclick = $(this).attr('onclick');

                // Skip "Exit" or "Reset" if you don't want them, otherwise keep them
                if (text.toLowerCase() === 'exit') return;

                // If this item wasn't already added from searchArr, add it now
                if (seenNames.indexOf(text.toLowerCase()) === -1 && text !== "") {

                    // If the scraped onclick doesn't close the overlay, add that behavior
                    var safeAction = onclick;
                    if (safeAction && safeAction.indexOf('cmd-k-overlay') === -1) {
                        safeAction = safeAction + "; $('#cmd-k-overlay').fadeOut();";
                    }

                    finalFavs.push({
                        name: text,
                        action: safeAction
                    });
                    seenNames.push(text.toLowerCase());
                }
            });

            // 3. Render Combined List
            if (finalFavs.length > 0) {
                var html = '';
                //$.each(finalFavs, function (i, item) {
                //    html += '<li class="cmd-k-item" onclick="' + item.action + '">';
                //    html += '  <div>';
                //    html += '    <span class="cmd-k-item-main">' + item.name + '</span>';
                //    html += '  </div>';
                //    html += '</li>';
                //});

                $.each(finalFavs, function (i, item) {
                    html += '<li class="cmd-k-item" onclick="' + item.action + '">';

                    html += '  <div style="display:flex; align-items:center; gap:10px;">';
                    html += `
        <svg xmlns="http://www.w3.org/2000/svg" 
             width="18" height="18" 
             viewBox="0 0 24 24" 
             class="pagefav-icon">
            <path fill="currentColor"
                d="m8.243 7.34l-6.38.925l-.113.023a1 1 0 0 0-.44 1.684l4.622 4.499l-1.09 6.355l-.013.11a1 1 0 0 0 1.464.944l5.706-3l5.693 3l.1.046a1 1 0 0 0 1.352-1.1l-1.091-6.355l4.624-4.5l.078-.085a1 1 0 0 0-.633-1.62l-6.38-.926l-2.852-5.78a1 1 0 0 0-1.794 0z"/>
        </svg>
    `;

                    // TEXT
                    html += '    <span class="cmd-k-item-main">' + item.name + '</span>';

                    html += '  </div>';
                    html += '</li>';
                });

                $('#cmd-k-fav-list').html(html);
            } else {
                $('#cmd-k-fav-list').html('<li class="cmd-k-empty">No favorites yet.</li>');
            }
        }

        function renderMostSearched() {
            var finalMostViewed = [];
            var seenNames = [];

            if (typeof searchArr !== 'undefined' && searchArr && searchArr.length) {
                var sortedItems = searchArr
                    .filter(function (x) {
                        return x.FUCnt > 0;
                    })
                    .sort(function (a, b) {
                        return b.FUCnt - a.FUCnt;
                    })
                    .slice(0, 10);

                if (sortedItems.length < 10) {
                    var missingItems = searchArr.filter(function (x) {
                        return !sortedItems.some(function (sortedItem) {
                            return sortedItem.submenuname === x.submenuname;
                        });
                    });
                    sortedItems = sortedItems.concat(missingItems.slice(0, 10 - sortedItems.length)); // Add remaining items
                }

                var html = '';
                $.each(sortedItems, function (i, it) {
                    var clickAction = "PageUselog('" + it.title + "', 'icon-" + it.submenuname.replace(/ /g, '') + "', '" + it.pagename_url + "', '" + it.id + "', '" + it.IsGroupedMenu + "', '" + it.formappsid + "'); $('#cmd-k-overlay').fadeOut();";
                    html += '<li class="cmd-k-item" onclick="' + clickAction + '">';
                    html += '  <div>';
                    html += '    <span class="cmd-k-item-main">' + it.submenuname + '</span>';
                    html += '  </div>';
                    html += '</li>';
                });
                if (html === '') {
                    html = '<li class="cmd-k-empty">No items found.</li>';
                }

                $('#cmd-k-most-list').html(html);
            } else {

                $('#cmd-k-most-list').html('<li class="cmd-k-empty">No items available.</li>');
            }
        }

        document.addEventListener(
            'keydown',
            function (e) {
                const isCmdPalette = isCmdPaletteShortcut(e);
                if (isCmdPalette) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    openCmdPalette();
                }
            },
            true // 👈 capture phase (important)
        );


        $(document).ready(function () {

            const proxy = document.getElementById('focusProxy');

            proxy.addEventListener('keydown', function (e) {
                // Ctrl+K or Cmd+K
                if (isCmdPaletteShortcut(e)) {
                    e.preventDefault();
                    openCmdPalette(); // Your command palette function
                }

                // Escape closes command palette
                if (e.key === 'Escape') {
                    closeCmdPalette();
                }
            });


            // Window Shortcut (Ctrl+K)
            $(window).keydown(function (e) {
                if (isCmdPaletteShortcut(e)) {
                    e.preventDefault();
                    e.stopPropagation();
                    openCmdPalette();
                    return false;
                }
                if (e.key === "Escape") {
                    $('#cmd-k-overlay').fadeOut(150);
                }
            });

            // Close on clicking overlay
            $('#cmd-k-overlay').click(function (e) {
                if (e.target.id === 'cmd-k-overlay') {
                    $(this).fadeOut(150);
                }
            });

            // Input Handling
            $('#cmd-k-input').on('input', function () {
                var query = $(this).val();
                cmdSelectedIndex = -1; // CHANGE 2: Reset selection on typing

                if (!query || $.trim(query) === "") {
                    $('#cmd-k-results').empty();
                    $('#cmd-k-placeholder').hide();
                    renderFixedFavorites();
                    renderMostSearched();
                    $('#cmd-k-initial').show();
                    return;
                }

                $('#cmd-k-placeholder').hide();
                $('#cmd-k-initial').hide();

                var results = getLegacySearchResults(query);
                renderCmdResults(results);
            });

            // Navigation Handling (Arrows & Enter)
            $('#cmd-k-input').keydown(function (e) {
                var items = $('.cmd-k-item:visible');
                if (items.length === 0) return;

                if (e.keyCode === 40) { // Down
                    e.preventDefault();
                    if (cmdSelectedIndex === -1) {
                        cmdSelectedIndex = 0;
                    } else {
                        cmdSelectedIndex = (cmdSelectedIndex + 1) % items.length;
                    }
                    updateCmdSelection();
                } else if (e.keyCode === 38) { // Up
                    e.preventDefault();
                    if (cmdSelectedIndex <= 0) {
                        cmdSelectedIndex = items.length - 1;
                    } else {
                        cmdSelectedIndex--;
                    }
                    updateCmdSelection();
                }

                else if (e.keyCode === 13) {
                    e.preventDefault();
                    var indexToTrigger = (cmdSelectedIndex === -1) ? 0 : cmdSelectedIndex;
                    if (items[indexToTrigger]) {
                        $(items[indexToTrigger]).click();
                    }
                }
            });
        });


        function updateSearchArrIsFav(pageId, isFav) {
            for (var i = 0; i < searchArr.length; i++) {
                if (searchArr[i].id == pageId) {
                    searchArr[i].IsFav = isFav;   // 1 or 0
                    break;
                }
            }
            localStorage.setItem('searchArr', JSON.stringify(searchArr));
        }


        function toggleFavorite(event, el, appName, PageId) {
            // 🔴 Prevent li click + overlay close
            event.stopPropagation();
            event.preventDefault();
            const isActive = el.getAttribute('data-active') === 'true';
            const newIsFav = isActive ? 0 : 1;

            // Toggle state
            var _PageId = PageId;
            var _mode = 'add';
            var _TIsFav = 0;
            if (isActive) {
                _mode = 'delete';
                var $svg = $('#svg_' + _PageId);
                $svg.removeAttr('class');
                $svg.attr('class', 'pagenotfav-icon');
            }
            else {
                var $svg = $('#svg_' + _PageId);
                $svg.removeAttr('class');
                $svg.attr('class', 'pagefav-icon');
            }
            el.setAttribute('data-active', !isActive);
            updateSearchArrIsFav(PageId, newIsFav);
            var FArr = [];
            FArr.push({
                mode: _mode
                , PageId: _PageId
                , SystemLoginId: _SystemLoginId
            });
            $.ajax({
                url: '../Ajax/Ajax_PageUselog' + _Extension + '',
                data: 'mode=favourite&FArr=' + encodeURIComponent(FArr != undefined && FArr != null && FArr.length > 0 ? JSON.stringify(FArr) : ""),
                type: 'post',
                success: function (data) {
                }
            });
        }



        function getLegacySearchResults(value) {

            var FilteredMenuDetails = [];
            var appstr = ''; var menustr = ''; var menupage = '';
            var dotIndex = value.indexOf('..');
            var slashIndex = value.indexOf('/');
            var tempArr = []; var tempArr2 = [];

            if (dotIndex != -1 || slashIndex != -1) {
                if (dotIndex != -1 && slashIndex != -1 && dotIndex > slashIndex) {
                    tempArr = value.split('..'); tempArr2 = tempArr[0].split('/');
                    menupage = tempArr2[0]; menustr = tempArr[1]; appstr = tempArr2[1];
                } else if (dotIndex != -1 && slashIndex != -1 && slashIndex > dotIndex) {
                    tempArr = value.split('/'); tempArr2 = tempArr[0].split('..');
                    menupage = tempArr2[0]; menustr = tempArr[0].split("..")[1]; appstr = tempArr[1];
                } else if (dotIndex == -1 && slashIndex != -1) {
                    tempArr = value.split('/'); menupage = tempArr[0]; menustr = ""; appstr = tempArr[1];
                } else if (slashIndex == -1 && dotIndex != -1) {
                    tempArr = value.split('..'); menupage = tempArr[0]; menustr = tempArr[1]; appstr = "";
                } else { menupage = value; }
            } else { menupage = value; }

            menupage = $.trim(menupage); menustr = $.trim(menustr); appstr = $.trim(appstr);

            FilteredMenuDetails = searchArr.filter(function (X) {
                return inc(X.submenuname.toLowerCase(), $.trim(menupage.toLowerCase()))
            });

            if (menupage.indexOf(' ') != -1) {
                var spaceArr = menupage.split(' ');
                if (spaceArr.length > 1) {
                    var regex = '';
                    for (var si = 0; si < spaceArr.length; si++) {
                        if (si == spaceArr.length - 1) regex = regex + spaceArr[si].toLowerCase() + '.*';
                        else regex = regex + spaceArr[si].toLowerCase() + '.*\\s';
                    }
                    var rx = new RegExp(regex, 'i');
                    FilteredMenuDetails = searchArr.filter(function (X) { return (X.submenuname.toLowerCase().match(rx)) });
                }
            }

            if (menustr) {
                var existing = FilteredMenuDetails.length > 0 ? FilteredMenuDetails : searchArr;
                FilteredMenuDetails = existing.filter(function (X) { return inc(X.menuname.toLowerCase(), $.trim(menustr)) });
            }
            if (appstr) {
                var existing = FilteredMenuDetails.length > 0 ? FilteredMenuDetails : searchArr;
                FilteredMenuDetails = existing.filter(function (X) { return inc(X.appsname.toLowerCase(), $.trim(appstr)) });
            }
            if (value && value.length > 0) {
                var s = $.trim(value);
                // Valid job number: digits / digits, optionally ending with exactly one letter
                // e.g. 1/589754, 58/454, 1/123A  →  Valid
                // e.g. 454, 1A/123, 1/A1254, A1/1235, 1/123A45  →  Invalid
                var jobNoRegex = /^\d+\/\d+[A-Za-z]?$/;
                if (s != "" && jobNoRegex.test(s)) {

                    // Add to the VERY TOP (unshift)
                    FilteredMenuDetails.unshift({
                        submenuname: "Search Job #" + s,
                        menuname: "Global Search / Barcode",
                        appsname: "Action",
                        isJobSearch: true, // Flag to identify this in renderer
                        jobQuery: s
                    });
                }
            }

            return FilteredMenuDetails;
        }

        function renderCmdResults(results) {
            var html = '';
            if (!results || results.length === 0) {
                html = '<li class="cmd-k-empty">No results found.</li>';
            } else {
                $.each(results, function (i, data) {
                    var clickAction = "";
                    var iconHtml = "";
                    var activeClass = "";

                    if (data.isJobSearch) {
                        // Call your existing function and close the overlay
                        clickAction = "JobQuickSearch('" + data.jobQuery + "'); $('#cmd-k-overlay').fadeOut();";

                        // Different Icon for Search
                        iconHtml = '<svg style="margin-right:10px; color:#4d90fe;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>';

                        // Highlight the row slightly differently
                        html += '<li class="cmd-k-item ' + activeClass + '" style="background-color:#fdfdfd; border-bottom:1px solid #eee;" onclick="' + clickAction + '">';
                        html += '  <div style="display:flex; align-items:center;">';
                        html += iconHtml;
                        html += '    <div>';
                        html += '       <span class="cmd-k-item-main" style="color:#000;">' + data.submenuname + '</span>';
                        html += '       <div class="cmd-k-item-sub" style="margin-left:0;">' + data.menuname + '</div>';
                        html += '    </div>';
                        html += '  </div>';
                        html += `
                          <div class="cmd-k-tag">
                            <span class="app-name"  style="background:#4d90fe; color:white;">${data.appsname}</span>                               
                          </div>
                        `;

                        html += '</li>';

                    } else {
                        var Is_Fav = (data.IsFav == 1 ? 'true' : 'false');
                        var Is_Fav_Cls = (data.IsFav == 1 ? 'pagefav-icon' : 'pagenotfav-icon');
                        // STANDARD MENU ITEM
                        clickAction = "PageUselog('" + data.title + "', 'icon-" + data.submenuname.replace(/ /g, '') + "', '" + data.pagename_url + "', '" + data.id + "', '" + data.IsGroupedMenu + "', '" + data.formappsid + "'); $('#cmd-k-overlay').fadeOut();";

                        html += '<li class="cmd-k-item ' + activeClass + '" onclick="' + clickAction + '">';
                        html += '  <div>';
                        html += '    <span class="cmd-k-item-main">' + data.submenuname + '</span>';
                        html += '    <span class="cmd-k-item-sub">' + data.menuname + '</span>';
                        html += '  </div>';
                        html += `
                          <div class="cmd-k-tag">
                            <span class="app-name">${data.appsname}</span>
                            <span class="fav-icon" onclick="toggleFavorite(event, this, '${data.appsname}', '${data.id}')" data-active='${Is_Fav}'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="svg_${data.id}" class='${Is_Fav_Cls}'>
                                <path fill="currentColor"
                                  d="m8.243 7.34l-6.38.925l-.113.023a1 1 0 0 0-.44 1.684l4.622 4.499l-1.09 6.355l-.013.11a1 1 0 0 0 1.464.944l5.706-3l5.693 3l.1.046a1 1 0 0 0 1.352-1.1l-1.091-6.355l4.624-4.5l.078-.085a1 1 0 0 0-.633-1.62l-6.38-.926l-2.852-5.78a1 1 0 0 0-1.794 0z"/>
                              </svg>
                            </span>
                          </div>
                        `;

                        html += '</li>';
                    }
                });
            }
            $('#cmd-k-results').html(html);
        }

        function updateCmdSelection() {
            $('.cmd-k-item').removeClass('active');
            if (cmdSelectedIndex > -1) {
                var items = $('.cmd-k-item:visible');
                var activeItem = $(items[cmdSelectedIndex]);
                activeItem.addClass('active');
                if (activeItem.length > 0) {
                    activeItem[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        }
    </script>
    <script>
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function () {
                navigator.serviceWorker.register('<%=uSystem.uWebconfig.jojsPath.ToString().Trim() + "/pwa/sw.js"%>', {
                    scope: '/lib/jo/28/pwa/'
                }).then(function (registration) {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                }, function (err) {
                    console.log('ServiceWorker registration failed: ', err);
                });
            });
        }
    </script>


    <div id="toastContainer"></div>

    <div id="maintenanceOverlay">

        <div class="maintenanceContent">

            <div class="maintenanceIcon">
                ⚙
            </div>

            <div class="maintenanceTitle">
                System Upgrade In Progress
            </div>

            <div class="maintenanceMessage">
                Please wait while the system is being upgraded.
                <br />
                You will be logged out automatically.
            </div>

            <div class="maintenanceTimer" id="maintenanceTimer">
                15
            </div>

            <div class="maintenanceProgress">
                <div class="maintenanceProgressBar"
                    id="maintenanceProgressBar">
                </div>
            </div>

        </div>

    </div>

</body>
</html>

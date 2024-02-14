PGDMP      3                |            mmapp    16.0    16.0 Z   �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    59243    mmapp    DATABASE     x   CREATE DATABASE mmapp WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE mmapp;
                postgres    false                        3079    59244 	   adminpack 	   EXTENSION     A   CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;
    DROP EXTENSION adminpack;
                   false            �           0    0    EXTENSION adminpack    COMMENT     M   COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';
                        false    2            1           1255    59254    next_transaction_id()    FUNCTION     �   CREATE FUNCTION public.next_transaction_id() RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE
    next_id INT;
BEGIN
    SELECT nextval('transactions_id_seqs') INTO next_id;
    RETURN next_id; 
END;
$$;
 ,   DROP FUNCTION public.next_transaction_id();
       public          postgres    false            �            1259    59255    apploadingscreen    TABLE     [   CREATE TABLE public.apploadingscreen (
    id integer NOT NULL,
    apploading_url text
);
 $   DROP TABLE public.apploadingscreen;
       public         heap    postgres    false            �            1259    59260    apploadingscreen_id_seq    SEQUENCE     �   CREATE SEQUENCE public.apploadingscreen_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.apploadingscreen_id_seq;
       public          postgres    false    216            �           0    0    apploadingscreen_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.apploadingscreen_id_seq OWNED BY public.apploadingscreen.id;
          public          postgres    false    217            �            1259    59261 
   attributes    TABLE     �   CREATE TABLE public.attributes (
    attribute_id integer NOT NULL,
    attribute_name character varying(255) NOT NULL,
    attribute_values text[],
    category text,
    subcategory text
);
    DROP TABLE public.attributes;
       public         heap    postgres    false            �            1259    59266    attributes_attribute_id_seq    SEQUENCE     �   CREATE SEQUENCE public.attributes_attribute_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.attributes_attribute_id_seq;
       public          postgres    false    218            �           0    0    attributes_attribute_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.attributes_attribute_id_seq OWNED BY public.attributes.attribute_id;
          public          postgres    false    219            �            1259    59267    audioheadphones    TABLE     	  CREATE TABLE public.audioheadphones (
    product_ah_id integer NOT NULL,
    ad_title text NOT NULL,
    currency_symbol text NOT NULL,
    city text,
    state text,
    country text,
    brand text,
    category text,
    vendorid integer,
    is_featured boolean DEFAULT false NOT NULL,
    is_sold boolean DEFAULT false NOT NULL,
    is_negotiable boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    rejection_reason text,
    status integer DEFAULT 0,
    updated_at_product timestamp without time zone,
    uniquepid character varying(50),
    category_type character varying(255),
    subcategory text,
    condition text,
    skuid character varying(255),
    mrp numeric(10,2),
    sellingprice numeric(10,2),
    localdeliverycharge numeric(10,2),
    zonaldeliverycharge numeric(10,2),
    nationaldeliverycharge numeric(10,2),
    weightkg numeric(10,2),
    lengthcm numeric(10,2),
    breadthcm numeric(10,2),
    heightcm numeric(10,2),
    countryoforigin character varying(255),
    manufacturername character varying(255),
    packerdetails character varying(255),
    driversize character varying(255),
    impedance character varying(255),
    frequencyrange character varying(255),
    additionaldescription text,
    searchkeywords character varying(255),
    keyfeatures text,
    videourl character varying(255),
    salespackage character varying(255),
    isvariant text,
    quantity integer,
    postalcode text,
    inthebox text,
    images text[]
);
 #   DROP TABLE public.audioheadphones;
       public         heap    postgres    false            �            1259    59277 "   audio_headphones_product_ah_id_seq    SEQUENCE     �   CREATE SEQUENCE public.audio_headphones_product_ah_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.audio_headphones_product_ah_id_seq;
       public          postgres    false    220            �           0    0 "   audio_headphones_product_ah_id_seq    SEQUENCE OWNED BY     h   ALTER SEQUENCE public.audio_headphones_product_ah_id_seq OWNED BY public.audioheadphones.product_ah_id;
          public          postgres    false    221            �            1259    59278    cameraphotography    TABLE     ;  CREATE TABLE public.cameraphotography (
    product_cp_id integer NOT NULL,
    ad_title text NOT NULL,
    currency_symbol text NOT NULL,
    city text,
    state text,
    country text,
    brand text,
    category text,
    vendorid integer,
    is_featured boolean DEFAULT false NOT NULL,
    is_sold boolean DEFAULT false NOT NULL,
    is_negotiable boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    subcategory character varying(255),
    rejection_reason text,
    status integer DEFAULT 0,
    updated_at_product timestamp without time zone,
    uniquepid character varying(50),
    category_type character varying(255),
    condition text,
    skuid character varying(255),
    mrp numeric(10,2),
    sellingprice numeric(10,2),
    localdeliverycharge numeric(10,2),
    zonaldeliverycharge numeric(10,2),
    nationaldeliverycharge numeric(10,2),
    weightkg numeric(10,2),
    lengthcm numeric(10,2),
    breadthcm numeric(10,2),
    heightcm numeric(10,2),
    countryoforigin character varying(255),
    manufacturername character varying(255),
    packerdetails character varying(255),
    modelname character varying(255),
    storagetype character varying(255),
    storagecapacity character varying(255),
    displaysize character varying(255),
    screenresolution character varying(255),
    connectivityports character varying(255),
    batterylife character varying(255),
    dimensions character varying(255),
    weight numeric(10,2),
    warrantyinformation character varying(255),
    additionaldescription text,
    searchkeywords character varying(255),
    keyfeatures text,
    videourl character varying(255),
    salespackage character varying(255),
    isvariant text,
    quantity integer,
    postalcode text,
    inthebox text,
    images text[]
);
 %   DROP TABLE public.cameraphotography;
       public         heap    postgres    false            �            1259    59288 $   camera_photography_product_cp_id_seq    SEQUENCE     �   CREATE SEQUENCE public.camera_photography_product_cp_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.camera_photography_product_cp_id_seq;
       public          postgres    false    222            �           0    0 $   camera_photography_product_cp_id_seq    SEQUENCE OWNED BY     l   ALTER SEQUENCE public.camera_photography_product_cp_id_seq OWNED BY public.cameraphotography.product_cp_id;
          public          postgres    false    223            �            1259    59289    cart    TABLE     �  CREATE TABLE public.cart (
    cart_id integer NOT NULL,
    customer_id integer,
    vendor_id integer,
    product_uniqueid character varying(255) NOT NULL,
    category character varying(255),
    subcategory character varying(255),
    quantity integer NOT NULL,
    addeddate timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updateddate timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    variantlabel text,
    mrp text,
    sellingprice text
);
    DROP TABLE public.cart;
       public         heap    postgres    false            �            1259    59296    cart_cart_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cart_cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.cart_cart_id_seq;
       public          postgres    false    224            �           0    0    cart_cart_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.cart_cart_id_seq OWNED BY public.cart.cart_id;
          public          postgres    false    225            �            1259    59297 
   categories    TABLE     �  CREATE TABLE public.categories (
    category_id integer NOT NULL,
    category_name character varying(255) NOT NULL,
    category_description text,
    category_image_url character varying(255),
    category_status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    category_type character varying(255),
    attribute_cat_id integer[]
);
    DROP TABLE public.categories;
       public         heap    postgres    false            �            1259    59305    categories_category_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categories_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.categories_category_id_seq;
       public          postgres    false    226            �           0    0    categories_category_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.categories_category_id_seq OWNED BY public.categories.category_id;
          public          postgres    false    227            �            1259    59306    clothing    TABLE     �  CREATE TABLE public.clothing (
    product_fac_id integer NOT NULL,
    ad_title character varying(255) NOT NULL,
    additionaldescription text,
    countryoforigin character varying(255) NOT NULL,
    manufacturername character varying(255) NOT NULL,
    packerdetails character varying(255) NOT NULL,
    searchkeywords text,
    keyfeatures text,
    videourl character varying(255),
    salespackage character varying(255) NOT NULL,
    city character varying(255),
    state character varying(255),
    mrp double precision,
    sellingprice double precision,
    quantity integer,
    inthebox character varying(255),
    isvariant character varying(255),
    status integer DEFAULT 0,
    category_type character varying(255),
    currency_symbol text,
    uniquepid text,
    vendorid integer,
    postalcode text,
    country text,
    category text,
    subcategory text,
    skuid text,
    images text[]
);
    DROP TABLE public.clothing;
       public         heap    postgres    false            �            1259    59312    conversations    TABLE     �   CREATE TABLE public.conversations (
    conversation_id integer NOT NULL,
    customer_id integer NOT NULL,
    vendor_id integer NOT NULL,
    conversation_user_type text NOT NULL
);
 !   DROP TABLE public.conversations;
       public         heap    postgres    false            �            1259    59317 !   conversations_conversation_id_seq    SEQUENCE     �   CREATE SEQUENCE public.conversations_conversation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.conversations_conversation_id_seq;
       public          postgres    false    229            �           0    0 !   conversations_conversation_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.conversations_conversation_id_seq OWNED BY public.conversations.conversation_id;
          public          postgres    false    230            �            1259    59318    coupons    TABLE     >  CREATE TABLE public.coupons (
    coupon_id integer NOT NULL,
    coupon_code character varying(20) NOT NULL,
    discount_type character varying(20) NOT NULL,
    discount_amount numeric(10,2) NOT NULL,
    expiration_date date NOT NULL,
    vendorid integer,
    associated_products text[],
    created_date date
);
    DROP TABLE public.coupons;
       public         heap    postgres    false            �            1259    59323    coupons_coupon_id_seq    SEQUENCE     �   CREATE SEQUENCE public.coupons_coupon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.coupons_coupon_id_seq;
       public          postgres    false    231            �           0    0    coupons_coupon_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.coupons_coupon_id_seq OWNED BY public.coupons.coupon_id;
          public          postgres    false    232            �            1259    59324    currency_values    TABLE     �   CREATE TABLE public.currency_values (
    id integer NOT NULL,
    usd numeric,
    kes numeric,
    eur numeric,
    etb numeric,
    sos numeric,
    inr numeric
);
 #   DROP TABLE public.currency_values;
       public         heap    postgres    false            �            1259    59329    currency_values_id_seq    SEQUENCE     �   CREATE SEQUENCE public.currency_values_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.currency_values_id_seq;
       public          postgres    false    233            �           0    0    currency_values_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.currency_values_id_seq OWNED BY public.currency_values.id;
          public          postgres    false    234            �            1259    59330    customer_address    TABLE     C  CREATE TABLE public.customer_address (
    address_id integer NOT NULL,
    customer_id integer,
    given_name_address character varying(50),
    family_name_address character varying(50),
    email_address character varying(100),
    phone_address character varying(20),
    country_address character varying(50),
    zip_address character varying(15),
    city_address character varying(50),
    subregion_address character varying(50),
    region_address character varying(50),
    note_address text,
    default_address boolean,
    apt_address text,
    phone_code text
);
 $   DROP TABLE public.customer_address;
       public         heap    postgres    false            �            1259    59335    customer_address_address_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customer_address_address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.customer_address_address_id_seq;
       public          postgres    false    235            �           0    0    customer_address_address_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.customer_address_address_id_seq OWNED BY public.customer_address.address_id;
          public          postgres    false    236            �            1259    59336    customer_delivery_address    TABLE       CREATE TABLE public.customer_delivery_address (
    id integer NOT NULL,
    customer_id integer,
    first_name character varying(255),
    last_name character varying(255),
    selected_country character varying(255),
    street_address text,
    apartment character varying(255),
    selected_city character varying(255),
    selected_state character varying(255),
    zip_code character varying(20),
    email character varying(255),
    phone_number character varying(20),
    orderid integer,
    unique_order_id integer
);
 -   DROP TABLE public.customer_delivery_address;
       public         heap    postgres    false            �            1259    59341     customer_delivery_address_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customer_delivery_address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.customer_delivery_address_id_seq;
       public          postgres    false    237            �           0    0     customer_delivery_address_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.customer_delivery_address_id_seq OWNED BY public.customer_delivery_address.id;
          public          postgres    false    238            �            1259    59342    customer_follows    TABLE     �   CREATE TABLE public.customer_follows (
    follow_id integer NOT NULL,
    follower_id integer NOT NULL,
    following_id integer NOT NULL,
    follow_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 $   DROP TABLE public.customer_follows;
       public         heap    postgres    false            �            1259    59346    customer_follows_follow_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customer_follows_follow_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.customer_follows_follow_id_seq;
       public          postgres    false    239            �           0    0    customer_follows_follow_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.customer_follows_follow_id_seq OWNED BY public.customer_follows.follow_id;
          public          postgres    false    240            �            1259    59347    customer_transactions    TABLE     �  CREATE TABLE public.customer_transactions (
    transaction_id integer NOT NULL,
    customer_id integer NOT NULL,
    datetime timestamp without time zone NOT NULL,
    description text NOT NULL,
    amount numeric NOT NULL,
    closing_balance numeric NOT NULL,
    wallet_txn_id character varying(20) NOT NULL,
    send_to_user character varying(100),
    invoiceid integer,
    status text,
    transaction_wallet_id text
);
 )   DROP TABLE public.customer_transactions;
       public         heap    postgres    false            �            1259    59352 (   customer_transactions_transaction_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customer_transactions_transaction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ?   DROP SEQUENCE public.customer_transactions_transaction_id_seq;
       public          postgres    false    241            �           0    0 (   customer_transactions_transaction_id_seq    SEQUENCE OWNED BY     u   ALTER SEQUENCE public.customer_transactions_transaction_id_seq OWNED BY public.customer_transactions.transaction_id;
          public          postgres    false    242            �            1259    59353    customer_wishlist    TABLE     {  CREATE TABLE public.customer_wishlist (
    wishlist_id integer NOT NULL,
    customer_id integer NOT NULL,
    uniqueid character varying(255),
    label character varying(255),
    category character varying(50),
    subcategory character varying(50),
    vendor_id integer,
    mrp double precision,
    sellingprice double precision,
    created_on character varying(255)
);
 %   DROP TABLE public.customer_wishlist;
       public         heap    postgres    false            �            1259    59358 !   customer_wishlist_wishlist_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customer_wishlist_wishlist_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.customer_wishlist_wishlist_id_seq;
       public          postgres    false    243            �           0    0 !   customer_wishlist_wishlist_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.customer_wishlist_wishlist_id_seq OWNED BY public.customer_wishlist.wishlist_id;
          public          postgres    false    244            �            1259    59359    customerclaim    TABLE     :  CREATE TABLE public.customerclaim (
    customer_claim_id integer NOT NULL,
    customer_id integer,
    customer_claim_description text NOT NULL,
    customer_claim_status character varying(50) DEFAULT 'Pending'::character varying NOT NULL,
    customer_claim_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    customer_reply_description text,
    customer_reply_date timestamp without time zone,
    customer_closure_description text,
    customer_closure_date timestamp without time zone,
    customer_image_files jsonb,
    customer_video_files text
);
 !   DROP TABLE public.customerclaim;
       public         heap    postgres    false            �            1259    59366 #   customerclaim_customer_claim_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customerclaim_customer_claim_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public.customerclaim_customer_claim_id_seq;
       public          postgres    false    245            �           0    0 #   customerclaim_customer_claim_id_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public.customerclaim_customer_claim_id_seq OWNED BY public.customerclaim.customer_claim_id;
          public          postgres    false    246            �            1259    59367 	   customers    TABLE     5  CREATE TABLE public.customers (
    customer_id integer NOT NULL,
    given_name character varying(50) NOT NULL,
    family_name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    phone_number character varying(20),
    address_line_1 character varying(100),
    address_line_2 character varying(100),
    city character varying(100),
    state character varying(100),
    zip_code character varying(100),
    country character varying(100),
    bio text,
    verified_with text[],
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status integer DEFAULT 0 NOT NULL,
    picture character varying(255),
    google_id character varying(255),
    facebook_id character varying(255),
    verification_code integer,
    verification_expire_date timestamp without time zone,
    customer_loggedid text,
    customer_interest text[],
    apple_id text,
    mogadishudistrict_customer text,
    nile_pin integer
);
    DROP TABLE public.customers;
       public         heap    postgres    false            �            1259    59375    customers_customer_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customers_customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.customers_customer_id_seq;
       public          postgres    false    247            �           0    0    customers_customer_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.customers_customer_id_seq OWNED BY public.customers.customer_id;
          public          postgres    false    248            �            1259    59376 "   fashionclothing_product_fac_id_seq    SEQUENCE     �   CREATE SEQUENCE public.fashionclothing_product_fac_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.fashionclothing_product_fac_id_seq;
       public          postgres    false    228            �           0    0 "   fashionclothing_product_fac_id_seq    SEQUENCE OWNED BY     b   ALTER SEQUENCE public.fashionclothing_product_fac_id_seq OWNED BY public.clothing.product_fac_id;
          public          postgres    false    249            �            1259    59377 
   homebanner    TABLE     p   CREATE TABLE public.homebanner (
    id integer NOT NULL,
    banner_url text,
    title text,
    link text
);
    DROP TABLE public.homebanner;
       public         heap    postgres    false            �            1259    59382    homebanner_new_id_seq    SEQUENCE     �   CREATE SEQUENCE public.homebanner_new_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.homebanner_new_id_seq;
       public          postgres    false    250            �           0    0    homebanner_new_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.homebanner_new_id_seq OWNED BY public.homebanner.id;
          public          postgres    false    251            �            1259    59383    items_not_arrived    TABLE     �  CREATE TABLE public.items_not_arrived (
    id integer NOT NULL,
    vendor_id integer NOT NULL,
    product_uniqueid character varying(255) NOT NULL,
    customer_id integer NOT NULL,
    request_text text NOT NULL,
    selected_option character varying(255) NOT NULL,
    created_at_request timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    response_text_from_seller text,
    order_id integer
);
 %   DROP TABLE public.items_not_arrived;
       public         heap    postgres    false            �            1259    59389    items_not_arrived_id_seq    SEQUENCE     �   CREATE SEQUENCE public.items_not_arrived_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.items_not_arrived_id_seq;
       public          postgres    false    252            �           0    0    items_not_arrived_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.items_not_arrived_id_seq OWNED BY public.items_not_arrived.id;
          public          postgres    false    253            �            1259    59390    laptopcomputers    TABLE     <  CREATE TABLE public.laptopcomputers (
    product_lc_id integer NOT NULL,
    ad_title text NOT NULL,
    currency_symbol text NOT NULL,
    city text,
    state text,
    country text,
    brand text,
    category text,
    vendorid integer,
    is_featured boolean DEFAULT false NOT NULL,
    is_sold boolean DEFAULT false NOT NULL,
    is_negotiable boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    subcategory character varying(255),
    rejection_reason text,
    status integer DEFAULT 0,
    updated_at_product timestamp without time zone,
    uniquepid character varying(50),
    category_type character varying(255),
    condition text,
    skuid text,
    mrp text,
    sellingprice text,
    localdeliverycharge text,
    zonaldeliverycharge text,
    nationaldeliverycharge text,
    weightkg text,
    lengthcm text,
    breadthcm text,
    heightcm text,
    countryoforigin text,
    manufacturername text,
    packerdetails text,
    additionaldescription text,
    searchkeywords text,
    salespackage text,
    keyfeatures text,
    videourl text,
    modelname text,
    processor text,
    ram text,
    storagetype text,
    storagecapacity text,
    displaysize text,
    screenresolution text,
    graphicscard text,
    operatingsystem text,
    connectivityports text,
    batterylife text,
    keyboardtype text,
    touchpad text,
    dimensions text,
    weight text,
    warrantyinformation text,
    isvariant text,
    quantity integer,
    postalcode text,
    inthebox text,
    images text[]
);
 #   DROP TABLE public.laptopcomputers;
       public         heap    postgres    false            �            1259    59400 !   laptopcomputers_product_lc_id_seq    SEQUENCE     �   CREATE SEQUENCE public.laptopcomputers_product_lc_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.laptopcomputers_product_lc_id_seq;
       public          postgres    false    254            �           0    0 !   laptopcomputers_product_lc_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.laptopcomputers_product_lc_id_seq OWNED BY public.laptopcomputers.product_lc_id;
          public          postgres    false    255                        1259    59401    media_library    TABLE       CREATE TABLE public.media_library (
    media_id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    file_path character varying(255) NOT NULL,
    creation_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    vendor_id integer
);
 !   DROP TABLE public.media_library;
       public         heap    postgres    false                       1259    59407    media_library_media_id_seq    SEQUENCE     �   CREATE SEQUENCE public.media_library_media_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.media_library_media_id_seq;
       public          postgres    false    256            �           0    0    media_library_media_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.media_library_media_id_seq OWNED BY public.media_library.media_id;
          public          postgres    false    257                       1259    59408    messages    TABLE       CREATE TABLE public.messages (
    message_id integer NOT NULL,
    conversation_id integer NOT NULL,
    sender_id integer NOT NULL,
    recipient_id integer NOT NULL,
    content text NOT NULL,
    user_type text NOT NULL,
    "timestamp" timestamp with time zone
);
    DROP TABLE public.messages;
       public         heap    postgres    false                       1259    59413    messages_message_id_seq    SEQUENCE     �   CREATE SEQUENCE public.messages_message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.messages_message_id_seq;
       public          postgres    false    258            �           0    0    messages_message_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.messages_message_id_seq OWNED BY public.messages.message_id;
          public          postgres    false    259                       1259    59414    mobileelectronics    TABLE     ,  CREATE TABLE public.mobileelectronics (
    product_me_id integer NOT NULL,
    ad_title character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    city character varying(100),
    state character varying(100),
    country character varying(100),
    currency_symbol character varying(10),
    category character varying(100),
    subcategory character varying(100),
    condition character varying(50),
    brand character varying(100),
    is_featured boolean DEFAULT false,
    vendorid integer,
    rejection_reason text,
    status integer DEFAULT 0,
    uniquepid character varying(50),
    category_type character varying(255),
    modelname text,
    storagetype text,
    storagecapacity text,
    displaysize text,
    connectivityports text,
    batterylife text,
    dimensions text,
    weight text,
    warrantyinformation text,
    skuid character varying(255),
    mrp numeric(10,2),
    sellingprice numeric(10,2),
    localdeliverycharge numeric(10,2),
    zonaldeliverycharge numeric(10,2),
    nationaldeliverycharge numeric(10,2),
    weightkg numeric(10,2),
    lengthcm numeric(10,2),
    breadthcm numeric(10,2),
    heightcm numeric(10,2),
    countryoforigin character varying(255),
    manufacturername character varying(255),
    packerdetails character varying(255),
    additionaldescription text,
    searchkeywords character varying(255),
    keyfeatures text,
    videourl character varying(255),
    salespackage character varying(255),
    isvariant text,
    quantity integer,
    processor text,
    ram text,
    graphicscard text,
    operatingsystem text,
    keyboardtype text,
    postalcode text,
    simcard text,
    unlockstatus text,
    cameraresolution text,
    inthebox text,
    images text[]
);
 %   DROP TABLE public.mobileelectronics;
       public         heap    postgres    false                       1259    59423    mobilehomebanner    TABLE       CREATE TABLE public.mobilehomebanner (
    id integer NOT NULL,
    mobilebanner_url character varying(255) DEFAULT NULL::character varying,
    title character varying(100) DEFAULT NULL::character varying,
    link character varying(255) DEFAULT NULL::character varying
);
 $   DROP TABLE public.mobilehomebanner;
       public         heap    postgres    false                       1259    59431    mobilehomebanner_id_seq    SEQUENCE     �   CREATE SEQUENCE public.mobilehomebanner_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.mobilehomebanner_id_seq;
       public          postgres    false    261            �           0    0    mobilehomebanner_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.mobilehomebanner_id_seq OWNED BY public.mobilehomebanner.id;
          public          postgres    false    262                       1259    59432    notifications    TABLE     �   CREATE TABLE public.notifications (
    notification_id integer NOT NULL,
    notification_type character varying(255) NOT NULL,
    message text NOT NULL,
    customer_id integer,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
 !   DROP TABLE public.notifications;
       public         heap    postgres    false                       1259    59438 !   notifications_notification_id_seq    SEQUENCE     �   CREATE SEQUENCE public.notifications_notification_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.notifications_notification_id_seq;
       public          postgres    false    263            �           0    0 !   notifications_notification_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.notifications_notification_id_seq OWNED BY public.notifications.notification_id;
          public          postgres    false    264            	           1259    59439    payments    TABLE     B  CREATE TABLE public.payments (
    payment_id integer NOT NULL,
    customer_id integer NOT NULL,
    order_id integer NOT NULL,
    payment_date timestamp without time zone NOT NULL,
    payment_method character varying(255) NOT NULL,
    payment_amount numeric(10,2) NOT NULL,
    payment_status character varying(50) NOT NULL,
    billing_address text,
    billing_city character varying(100),
    billing_state character varying(100),
    billing_zip character varying(20),
    currency_code character(3),
    payment_source character varying(255),
    vendor_id integer
);
    DROP TABLE public.payments;
       public         heap    postgres    false            
           1259    59444    payments_payment_id_seq    SEQUENCE     �   CREATE SEQUENCE public.payments_payment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.payments_payment_id_seq;
       public          postgres    false    265            �           0    0    payments_payment_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.payments_payment_id_seq OWNED BY public.payments.payment_id;
          public          postgres    false    266                       1259    59445 ,   product_mobile_electronics_product_me_id_seq    SEQUENCE     �   CREATE SEQUENCE public.product_mobile_electronics_product_me_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 C   DROP SEQUENCE public.product_mobile_electronics_product_me_id_seq;
       public          postgres    false    260            �           0    0 ,   product_mobile_electronics_product_me_id_seq    SEQUENCE OWNED BY     t   ALTER SEQUENCE public.product_mobile_electronics_product_me_id_seq OWNED BY public.mobileelectronics.product_me_id;
          public          postgres    false    267                       1259    59446    product_order_cancel    TABLE     �  CREATE TABLE public.product_order_cancel (
    cancel_id integer NOT NULL,
    customer_id integer NOT NULL,
    vendor_id integer NOT NULL,
    product_id integer NOT NULL,
    label character varying(255) NOT NULL,
    selected_reason character varying(255) NOT NULL,
    refund_amount numeric(10,2) NOT NULL,
    total_amount numeric(10,2) NOT NULL,
    detail_charges jsonb,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    order_id text
);
 (   DROP TABLE public.product_order_cancel;
       public         heap    postgres    false                       1259    59452 "   product_order_cancel_cancel_id_seq    SEQUENCE     �   CREATE SEQUENCE public.product_order_cancel_cancel_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.product_order_cancel_cancel_id_seq;
       public          postgres    false    268            �           0    0 "   product_order_cancel_cancel_id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.product_order_cancel_cancel_id_seq OWNED BY public.product_order_cancel.cancel_id;
          public          postgres    false    269                       1259    59453    products    TABLE        CREATE TABLE public.products (
    id integer NOT NULL,
    ad_title character varying(255),
    city character varying(255),
    state character varying(255),
    country character varying(255),
    currency_symbol character varying(255),
    category character varying(255),
    subcategory character varying(255),
    vendorid integer,
    uniquepid integer,
    skuid character varying(255),
    mrp numeric(10,2),
    sellingprice numeric(10,2),
    countryoforigin character varying(255),
    manufacturername character varying(255),
    packerdetails text,
    additionaldescription text,
    searchkeywords text,
    keyfeatures text,
    videourl character varying(255),
    category_type character varying(255),
    quantity integer,
    postalcode character varying(255),
    salespackage text,
    brand character varying(255),
    condition character varying(255),
    isvariant text,
    status integer DEFAULT 0,
    updated_at_product timestamp with time zone,
    rejection_reason text,
    slug_subcat text,
    slug_cat text,
    images text[],
    attributes_specification json DEFAULT '{}'::json,
    prod_slug text,
    width text,
    length text,
    height text,
    weight text,
    product_ship_from character varying(255),
    estimate_delivery_by character varying(255),
    nested_subcat text,
    nested_subcat_slug text,
    additional_condition text,
    mogadishudistrict_ship_from character varying(255),
    additonal_condition text,
    product_policy_id integer,
    somali_ad_title text,
    somali_additionaldescription text
);
    DROP TABLE public.products;
       public         heap    postgres    false                       1259    59460    products_id_seq    SEQUENCE     �   CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.products_id_seq;
       public          postgres    false    270            �           0    0    products_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;
          public          postgres    false    271                       1259    59461    ratings_and_reviews    TABLE     !  CREATE TABLE public.ratings_and_reviews (
    id integer NOT NULL,
    vendor_id integer,
    customer_id integer,
    rating integer,
    review_text text,
    medias text[],
    created_at timestamp without time zone,
    product_uniqueid text,
    label text,
    rate_order_id text
);
 '   DROP TABLE public.ratings_and_reviews;
       public         heap    postgres    false                       1259    59466    ratings_and_reviews_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ratings_and_reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.ratings_and_reviews_id_seq;
       public          postgres    false    272            �           0    0    ratings_and_reviews_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.ratings_and_reviews_id_seq OWNED BY public.ratings_and_reviews.id;
          public          postgres    false    273                       1259    59467    return_order    TABLE     �   CREATE TABLE public.return_order (
    return_id integer NOT NULL,
    reason_return character varying(255),
    order_id integer,
    medias_return text[],
    detail_text text,
    return_status character varying(50)
);
     DROP TABLE public.return_order;
       public         heap    postgres    false                       1259    59472    return_order_return_id_seq    SEQUENCE     �   CREATE SEQUENCE public.return_order_return_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.return_order_return_id_seq;
       public          postgres    false    274            �           0    0    return_order_return_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.return_order_return_id_seq OWNED BY public.return_order.return_id;
          public          postgres    false    275                       1259    59473    social_logins    TABLE     �   CREATE TABLE public.social_logins (
    login_id integer NOT NULL,
    customer_id integer NOT NULL,
    provider character varying(50) NOT NULL,
    provider_user_id character varying(255) NOT NULL
);
 !   DROP TABLE public.social_logins;
       public         heap    postgres    false                       1259    59476    social_logins_login_id_seq    SEQUENCE     �   CREATE SEQUENCE public.social_logins_login_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.social_logins_login_id_seq;
       public          postgres    false    276            �           0    0    social_logins_login_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.social_logins_login_id_seq OWNED BY public.social_logins.login_id;
          public          postgres    false    277                       1259    59477    subcategories    TABLE     �  CREATE TABLE public.subcategories (
    subcategory_id integer NOT NULL,
    subcategory_name character varying(255) NOT NULL,
    subcategory_description text,
    subcategory_image_url character varying(255),
    parent_category_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    isfeatured boolean,
    subcat_status boolean,
    nested_subcategories jsonb
);
 !   DROP TABLE public.subcategories;
       public         heap    postgres    false                       1259    59484     subcategories_subcategory_id_seq    SEQUENCE     �   CREATE SEQUENCE public.subcategories_subcategory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.subcategories_subcategory_id_seq;
       public          postgres    false    278            �           0    0     subcategories_subcategory_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.subcategories_subcategory_id_seq OWNED BY public.subcategories.subcategory_id;
          public          postgres    false    279                       1259    59485 
   superadmin    TABLE       CREATE TABLE public.superadmin (
    id integer NOT NULL,
    email character varying(255),
    password character varying(255),
    "userId" character varying(255),
    role_id integer[],
    "position" character varying(255),
    name character varying(255),
    secret_key text
);
    DROP TABLE public.superadmin;
       public         heap    postgres    false                       1259    59490    superadmin_id_seq    SEQUENCE     �   CREATE SEQUENCE public.superadmin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.superadmin_id_seq;
       public          postgres    false    280            �           0    0    superadmin_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.superadmin_id_seq OWNED BY public.superadmin.id;
          public          postgres    false    281                       1259    59491    transactions    TABLE     �  CREATE TABLE public.transactions (
    id integer NOT NULL,
    transaction_id text NOT NULL,
    customer_id integer NOT NULL,
    transaction_external_id character varying(255) NOT NULL,
    amount numeric(15,2) NOT NULL,
    currency_code character varying(3) NOT NULL,
    transaction_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    is_verified boolean DEFAULT false,
    verification_date timestamp with time zone,
    payment_method character varying(50),
    notes text,
    CONSTRAINT ck_amount CHECK ((amount > (0)::numeric)),
    CONSTRAINT ck_currency_code CHECK ((char_length((currency_code)::text) = 3)),
    CONSTRAINT ck_payment_method CHECK (((payment_method IS NULL) OR (char_length((payment_method)::text) <= 50)))
);
     DROP TABLE public.transactions;
       public         heap    postgres    false                       1259    59501    transactions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.transactions_id_seq;
       public          postgres    false    282            �           0    0    transactions_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.transactions_id_seq OWNED BY public.transactions.id;
          public          postgres    false    283                       1259    59502    transactions_id_seqs    SEQUENCE     }   CREATE SEQUENCE public.transactions_id_seqs
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.transactions_id_seqs;
       public          postgres    false                       1259    59503    variantproducts    TABLE       CREATE TABLE public.variantproducts (
    variant_id integer NOT NULL,
    product_uniqueid character varying(255),
    variant_mrp numeric(10,2),
    variant_sellingprice numeric(10,2),
    variant_skuid character varying(255),
    variant_quantity integer,
    variantsvalues text,
    label text,
    vendori_id integer,
    variant_category text,
    variant_subcategory text
);
 #   DROP TABLE public.variantproducts;
       public         heap    postgres    false                       1259    59508    variantproducts_variant_id_seq    SEQUENCE     �   CREATE SEQUENCE public.variantproducts_variant_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.variantproducts_variant_id_seq;
       public          postgres    false    285            �           0    0    variantproducts_variant_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.variantproducts_variant_id_seq OWNED BY public.variantproducts.variant_id;
          public          postgres    false    286                       1259    59509    vendor_product_policies    TABLE     H  CREATE TABLE public.vendor_product_policies (
    policy_id integer NOT NULL,
    vendor_id integer,
    policy_name character varying(255),
    policy_type character varying(50),
    policy_description text,
    policy_status character varying(20),
    policy_created_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
 +   DROP TABLE public.vendor_product_policies;
       public         heap    postgres    false                        1259    59515 %   vendor_product_policies_policy_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vendor_product_policies_policy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE public.vendor_product_policies_policy_id_seq;
       public          postgres    false    287            �           0    0 %   vendor_product_policies_policy_id_seq    SEQUENCE OWNED BY     o   ALTER SEQUENCE public.vendor_product_policies_policy_id_seq OWNED BY public.vendor_product_policies.policy_id;
          public          postgres    false    288            !           1259    59516    vendorbulkupload    TABLE     �   CREATE TABLE public.vendorbulkupload (
    bulk_id integer NOT NULL,
    datetime timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    vendor_id integer NOT NULL,
    productids integer[],
    status text
);
 $   DROP TABLE public.vendorbulkupload;
       public         heap    postgres    false            "           1259    59522    vendorbulkupload_bulk_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vendorbulkupload_bulk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.vendorbulkupload_bulk_id_seq;
       public          postgres    false    289            �           0    0    vendorbulkupload_bulk_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.vendorbulkupload_bulk_id_seq OWNED BY public.vendorbulkupload.bulk_id;
          public          postgres    false    290            #           1259    59523    vendorclaim    TABLE     �  CREATE TABLE public.vendorclaim (
    claim_id integer NOT NULL,
    vendor_id integer,
    claim_description text NOT NULL,
    claim_status character varying(50) DEFAULT 'Pending'::character varying,
    claim_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    reply_description text,
    reply_date timestamp without time zone,
    closure_description text,
    closure_date timestamp without time zone,
    image_files jsonb,
    video_files text
);
    DROP TABLE public.vendorclaim;
       public         heap    postgres    false            $           1259    59530    vendorclaim_claim_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vendorclaim_claim_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.vendorclaim_claim_id_seq;
       public          postgres    false    291            �           0    0    vendorclaim_claim_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.vendorclaim_claim_id_seq OWNED BY public.vendorclaim.claim_id;
          public          postgres    false    292            0           1259    66956    vendorclaimbuyerissue    TABLE     �  CREATE TABLE public.vendorclaimbuyerissue (
    id integer NOT NULL,
    vendor_id character varying(255) NOT NULL,
    customer_id character varying(255) NOT NULL,
    order_id character varying(255) NOT NULL,
    selected_reason character varying(255) NOT NULL,
    report_reason text NOT NULL,
    product_uniqueid character varying(255) NOT NULL,
    report_approved_by_admin boolean DEFAULT false,
    showcountofactionbyadmin integer DEFAULT 0,
    adminresponse jsonb
);
 )   DROP TABLE public.vendorclaimbuyerissue;
       public         heap    postgres    false            /           1259    66955    vendorclaimbuyerissue_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vendorclaimbuyerissue_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.vendorclaimbuyerissue_id_seq;
       public          postgres    false    304            �           0    0    vendorclaimbuyerissue_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.vendorclaimbuyerissue_id_seq OWNED BY public.vendorclaimbuyerissue.id;
          public          postgres    false    303            %           1259    59531    vendorpolicies    TABLE     �   CREATE TABLE public.vendorpolicies (
    vendorpolicy_id integer NOT NULL,
    shipping_information character varying(5000),
    return_policy character varying(5000),
    business_policy character varying(5000),
    vendor_id integer
);
 "   DROP TABLE public.vendorpolicies;
       public         heap    postgres    false            &           1259    59536 "   vendorpolicies_vendorpolicy_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vendorpolicies_vendorpolicy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.vendorpolicies_vendorpolicy_id_seq;
       public          postgres    false    293            �           0    0 "   vendorpolicies_vendorpolicy_id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.vendorpolicies_vendorpolicy_id_seq OWNED BY public.vendorpolicies.vendorpolicy_id;
          public          postgres    false    294            '           1259    59537    vendorproductorder    TABLE     B  CREATE TABLE public.vendorproductorder (
    order_id integer NOT NULL,
    vendor_id integer,
    product_uniqueid integer,
    customer_id integer,
    total_amount numeric(10,2),
    order_status character varying(50),
    rejection_reason text,
    product_name character varying(255),
    customer_name character varying(255),
    product_image text,
    customer_email character varying(255),
    customer_phone_number character varying(20),
    currency_symbol character varying(10),
    payment_method character varying(50),
    payment_status character varying(50),
    city character varying(100),
    state character varying(100),
    country character varying(100),
    brand character varying(100),
    category character varying(100),
    subcategory character varying(100),
    product_type character varying(50),
    transaction_id character varying(255) DEFAULT NULL::character varying,
    commission_fee numeric,
    withdrawal_amount numeric,
    refund_amount numeric,
    fees_paid numeric,
    tax_collected numeric,
    orderid text,
    quantity integer,
    label text,
    tentative_delivery_date text,
    skuid_order text,
    ispickup boolean,
    seller_otp text,
    customer_otp text,
    order_date timestamp with time zone,
    created_at timestamp with time zone,
    shipping_fee text,
    sell_price text
);
 &   DROP TABLE public.vendorproductorder;
       public         heap    postgres    false            (           1259    59543    vendorproductorder_order_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vendorproductorder_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.vendorproductorder_order_id_seq;
       public          postgres    false    295            �           0    0    vendorproductorder_order_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.vendorproductorder_order_id_seq OWNED BY public.vendorproductorder.order_id;
          public          postgres    false    296            )           1259    59544    vendors    TABLE     J	  CREATE TABLE public.vendors (
    id integer NOT NULL,
    country_code character varying(10) NOT NULL,
    mobile_number character varying(20) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    brand_name character varying(255),
    business_model character varying(255),
    products jsonb,
    trademark_certificate jsonb,
    company_name character varying(255),
    company_city character varying(255),
    company_state character varying(255),
    company_country character varying(255),
    company_zip_code character varying(255),
    shipping_address character varying(255),
    bank_name character varying(255),
    bank_account_number character varying(50),
    bank_routing_number character varying(50),
    bank_account_name character varying(255),
    bank_branch character varying(255),
    bank_swift_code character varying(50),
    registration_date character varying(255),
    mobile_verification_status boolean,
    email_verification_status boolean,
    status integer DEFAULT 0,
    business_type character varying(255),
    registration_number character varying(50),
    tax_id_number character varying(255),
    business_address character varying(255),
    business_phone character varying(255),
    business_email character varying(255),
    business_website character varying(255),
    business_description character varying(255),
    facebook_url character varying(255),
    instagram_url character varying(255),
    twitter_url character varying(255),
    linkedin_url character varying(255),
    business_logo_url character varying(255),
    business_license_url character varying(255),
    return_policy text,
    shipping_policy text,
    terms_and_conditions text,
    payment_info text,
    shipping_info text,
    support_contact character varying(100),
    categories text,
    average_rating numeric(3,2),
    total_products integer,
    total_sales numeric(10,2),
    support_contact_1 character varying(255),
    support_contact_2 character varying(255),
    vendor_profile_picture_url jsonb,
    brand_logo jsonb,
    useridvendor character varying(255),
    vendorname text,
    email_otp character varying(4),
    mobile_otp character varying(4),
    reset_otp text,
    followers integer,
    following integer,
    vendor_username text,
    company_district character varying(255)
);
    DROP TABLE public.vendors;
       public         heap    postgres    false            *           1259    59550    vendors_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vendors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.vendors_id_seq;
       public          postgres    false    297            �           0    0    vendors_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.vendors_id_seq OWNED BY public.vendors.id;
          public          postgres    false    298            +           1259    59551    vendors_notifications    TABLE     �   CREATE TABLE public.vendors_notifications (
    id integer NOT NULL,
    vendor_id integer NOT NULL,
    type character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    message text NOT NULL,
    date text NOT NULL
);
 )   DROP TABLE public.vendors_notifications;
       public         heap    postgres    false            ,           1259    59556    vendors_notifications_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vendors_notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.vendors_notifications_id_seq;
       public          postgres    false    299            �           0    0    vendors_notifications_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.vendors_notifications_id_seq OWNED BY public.vendors_notifications.id;
          public          postgres    false    300            -           1259    59557    withdrawals    TABLE       CREATE TABLE public.withdrawals (
    withdrawal_id integer NOT NULL,
    vendor_id integer NOT NULL,
    currency_code character varying(100) NOT NULL,
    amount numeric(10,2) NOT NULL,
    withdrawal_date date NOT NULL,
    status character varying(20) NOT NULL,
    bank_account_number character varying(20) NOT NULL,
    bank_name character varying(100) NOT NULL,
    bank_branch character varying(100),
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);
    DROP TABLE public.withdrawals;
       public         heap    postgres    false            .           1259    59562    withdrawals_withdrawal_id_seq    SEQUENCE     �   CREATE SEQUENCE public.withdrawals_withdrawal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.withdrawals_withdrawal_id_seq;
       public          postgres    false    301            �           0    0    withdrawals_withdrawal_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.withdrawals_withdrawal_id_seq OWNED BY public.withdrawals.withdrawal_id;
          public          postgres    false    302            �           2604    59563    apploadingscreen id    DEFAULT     z   ALTER TABLE ONLY public.apploadingscreen ALTER COLUMN id SET DEFAULT nextval('public.apploadingscreen_id_seq'::regclass);
 B   ALTER TABLE public.apploadingscreen ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216            �           2604    59564    attributes attribute_id    DEFAULT     �   ALTER TABLE ONLY public.attributes ALTER COLUMN attribute_id SET DEFAULT nextval('public.attributes_attribute_id_seq'::regclass);
 F   ALTER TABLE public.attributes ALTER COLUMN attribute_id DROP DEFAULT;
       public          postgres    false    219    218            �           2604    59565    audioheadphones product_ah_id    DEFAULT     �   ALTER TABLE ONLY public.audioheadphones ALTER COLUMN product_ah_id SET DEFAULT nextval('public.audio_headphones_product_ah_id_seq'::regclass);
 L   ALTER TABLE public.audioheadphones ALTER COLUMN product_ah_id DROP DEFAULT;
       public          postgres    false    221    220            �           2604    59566    cameraphotography product_cp_id    DEFAULT     �   ALTER TABLE ONLY public.cameraphotography ALTER COLUMN product_cp_id SET DEFAULT nextval('public.camera_photography_product_cp_id_seq'::regclass);
 N   ALTER TABLE public.cameraphotography ALTER COLUMN product_cp_id DROP DEFAULT;
       public          postgres    false    223    222                       2604    59567    cart cart_id    DEFAULT     l   ALTER TABLE ONLY public.cart ALTER COLUMN cart_id SET DEFAULT nextval('public.cart_cart_id_seq'::regclass);
 ;   ALTER TABLE public.cart ALTER COLUMN cart_id DROP DEFAULT;
       public          postgres    false    225    224                       2604    59568    categories category_id    DEFAULT     �   ALTER TABLE ONLY public.categories ALTER COLUMN category_id SET DEFAULT nextval('public.categories_category_id_seq'::regclass);
 E   ALTER TABLE public.categories ALTER COLUMN category_id DROP DEFAULT;
       public          postgres    false    227    226            	           2604    59569    clothing product_fac_id    DEFAULT     �   ALTER TABLE ONLY public.clothing ALTER COLUMN product_fac_id SET DEFAULT nextval('public.fashionclothing_product_fac_id_seq'::regclass);
 F   ALTER TABLE public.clothing ALTER COLUMN product_fac_id DROP DEFAULT;
       public          postgres    false    249    228                       2604    59570    conversations conversation_id    DEFAULT     �   ALTER TABLE ONLY public.conversations ALTER COLUMN conversation_id SET DEFAULT nextval('public.conversations_conversation_id_seq'::regclass);
 L   ALTER TABLE public.conversations ALTER COLUMN conversation_id DROP DEFAULT;
       public          postgres    false    230    229                       2604    59571    coupons coupon_id    DEFAULT     v   ALTER TABLE ONLY public.coupons ALTER COLUMN coupon_id SET DEFAULT nextval('public.coupons_coupon_id_seq'::regclass);
 @   ALTER TABLE public.coupons ALTER COLUMN coupon_id DROP DEFAULT;
       public          postgres    false    232    231                       2604    59572    currency_values id    DEFAULT     x   ALTER TABLE ONLY public.currency_values ALTER COLUMN id SET DEFAULT nextval('public.currency_values_id_seq'::regclass);
 A   ALTER TABLE public.currency_values ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    234    233                       2604    59573    customer_address address_id    DEFAULT     �   ALTER TABLE ONLY public.customer_address ALTER COLUMN address_id SET DEFAULT nextval('public.customer_address_address_id_seq'::regclass);
 J   ALTER TABLE public.customer_address ALTER COLUMN address_id DROP DEFAULT;
       public          postgres    false    236    235                       2604    59574    customer_delivery_address id    DEFAULT     �   ALTER TABLE ONLY public.customer_delivery_address ALTER COLUMN id SET DEFAULT nextval('public.customer_delivery_address_id_seq'::regclass);
 K   ALTER TABLE public.customer_delivery_address ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    238    237                       2604    59575    customer_follows follow_id    DEFAULT     �   ALTER TABLE ONLY public.customer_follows ALTER COLUMN follow_id SET DEFAULT nextval('public.customer_follows_follow_id_seq'::regclass);
 I   ALTER TABLE public.customer_follows ALTER COLUMN follow_id DROP DEFAULT;
       public          postgres    false    240    239                       2604    59576 $   customer_transactions transaction_id    DEFAULT     �   ALTER TABLE ONLY public.customer_transactions ALTER COLUMN transaction_id SET DEFAULT nextval('public.customer_transactions_transaction_id_seq'::regclass);
 S   ALTER TABLE public.customer_transactions ALTER COLUMN transaction_id DROP DEFAULT;
       public          postgres    false    242    241                       2604    59577    customer_wishlist wishlist_id    DEFAULT     �   ALTER TABLE ONLY public.customer_wishlist ALTER COLUMN wishlist_id SET DEFAULT nextval('public.customer_wishlist_wishlist_id_seq'::regclass);
 L   ALTER TABLE public.customer_wishlist ALTER COLUMN wishlist_id DROP DEFAULT;
       public          postgres    false    244    243                       2604    59578    customerclaim customer_claim_id    DEFAULT     �   ALTER TABLE ONLY public.customerclaim ALTER COLUMN customer_claim_id SET DEFAULT nextval('public.customerclaim_customer_claim_id_seq'::regclass);
 N   ALTER TABLE public.customerclaim ALTER COLUMN customer_claim_id DROP DEFAULT;
       public          postgres    false    246    245                       2604    59579    customers customer_id    DEFAULT     ~   ALTER TABLE ONLY public.customers ALTER COLUMN customer_id SET DEFAULT nextval('public.customers_customer_id_seq'::regclass);
 D   ALTER TABLE public.customers ALTER COLUMN customer_id DROP DEFAULT;
       public          postgres    false    248    247                       2604    59580    homebanner id    DEFAULT     r   ALTER TABLE ONLY public.homebanner ALTER COLUMN id SET DEFAULT nextval('public.homebanner_new_id_seq'::regclass);
 <   ALTER TABLE public.homebanner ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    251    250                       2604    59581    items_not_arrived id    DEFAULT     |   ALTER TABLE ONLY public.items_not_arrived ALTER COLUMN id SET DEFAULT nextval('public.items_not_arrived_id_seq'::regclass);
 C   ALTER TABLE public.items_not_arrived ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    253    252                       2604    59582    laptopcomputers product_lc_id    DEFAULT     �   ALTER TABLE ONLY public.laptopcomputers ALTER COLUMN product_lc_id SET DEFAULT nextval('public.laptopcomputers_product_lc_id_seq'::regclass);
 L   ALTER TABLE public.laptopcomputers ALTER COLUMN product_lc_id DROP DEFAULT;
       public          postgres    false    255    254            $           2604    59583    media_library media_id    DEFAULT     �   ALTER TABLE ONLY public.media_library ALTER COLUMN media_id SET DEFAULT nextval('public.media_library_media_id_seq'::regclass);
 E   ALTER TABLE public.media_library ALTER COLUMN media_id DROP DEFAULT;
       public          postgres    false    257    256            &           2604    59584    messages message_id    DEFAULT     z   ALTER TABLE ONLY public.messages ALTER COLUMN message_id SET DEFAULT nextval('public.messages_message_id_seq'::regclass);
 B   ALTER TABLE public.messages ALTER COLUMN message_id DROP DEFAULT;
       public          postgres    false    259    258            '           2604    59585    mobileelectronics product_me_id    DEFAULT     �   ALTER TABLE ONLY public.mobileelectronics ALTER COLUMN product_me_id SET DEFAULT nextval('public.product_mobile_electronics_product_me_id_seq'::regclass);
 N   ALTER TABLE public.mobileelectronics ALTER COLUMN product_me_id DROP DEFAULT;
       public          postgres    false    267    260            ,           2604    59586    mobilehomebanner id    DEFAULT     z   ALTER TABLE ONLY public.mobilehomebanner ALTER COLUMN id SET DEFAULT nextval('public.mobilehomebanner_id_seq'::regclass);
 B   ALTER TABLE public.mobilehomebanner ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    262    261            0           2604    59587    notifications notification_id    DEFAULT     �   ALTER TABLE ONLY public.notifications ALTER COLUMN notification_id SET DEFAULT nextval('public.notifications_notification_id_seq'::regclass);
 L   ALTER TABLE public.notifications ALTER COLUMN notification_id DROP DEFAULT;
       public          postgres    false    264    263            2           2604    59588    payments payment_id    DEFAULT     z   ALTER TABLE ONLY public.payments ALTER COLUMN payment_id SET DEFAULT nextval('public.payments_payment_id_seq'::regclass);
 B   ALTER TABLE public.payments ALTER COLUMN payment_id DROP DEFAULT;
       public          postgres    false    266    265            3           2604    59589    product_order_cancel cancel_id    DEFAULT     �   ALTER TABLE ONLY public.product_order_cancel ALTER COLUMN cancel_id SET DEFAULT nextval('public.product_order_cancel_cancel_id_seq'::regclass);
 M   ALTER TABLE public.product_order_cancel ALTER COLUMN cancel_id DROP DEFAULT;
       public          postgres    false    269    268            5           2604    59590    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    271    270            8           2604    59591    ratings_and_reviews id    DEFAULT     �   ALTER TABLE ONLY public.ratings_and_reviews ALTER COLUMN id SET DEFAULT nextval('public.ratings_and_reviews_id_seq'::regclass);
 E   ALTER TABLE public.ratings_and_reviews ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    273    272            9           2604    59592    return_order return_id    DEFAULT     �   ALTER TABLE ONLY public.return_order ALTER COLUMN return_id SET DEFAULT nextval('public.return_order_return_id_seq'::regclass);
 E   ALTER TABLE public.return_order ALTER COLUMN return_id DROP DEFAULT;
       public          postgres    false    275    274            :           2604    59593    social_logins login_id    DEFAULT     �   ALTER TABLE ONLY public.social_logins ALTER COLUMN login_id SET DEFAULT nextval('public.social_logins_login_id_seq'::regclass);
 E   ALTER TABLE public.social_logins ALTER COLUMN login_id DROP DEFAULT;
       public          postgres    false    277    276            ;           2604    59594    subcategories subcategory_id    DEFAULT     �   ALTER TABLE ONLY public.subcategories ALTER COLUMN subcategory_id SET DEFAULT nextval('public.subcategories_subcategory_id_seq'::regclass);
 K   ALTER TABLE public.subcategories ALTER COLUMN subcategory_id DROP DEFAULT;
       public          postgres    false    279    278            >           2604    59595    superadmin id    DEFAULT     n   ALTER TABLE ONLY public.superadmin ALTER COLUMN id SET DEFAULT nextval('public.superadmin_id_seq'::regclass);
 <   ALTER TABLE public.superadmin ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    281    280            ?           2604    59596    transactions id    DEFAULT     r   ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);
 >   ALTER TABLE public.transactions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    283    282            B           2604    59597    variantproducts variant_id    DEFAULT     �   ALTER TABLE ONLY public.variantproducts ALTER COLUMN variant_id SET DEFAULT nextval('public.variantproducts_variant_id_seq'::regclass);
 I   ALTER TABLE public.variantproducts ALTER COLUMN variant_id DROP DEFAULT;
       public          postgres    false    286    285            C           2604    59598 !   vendor_product_policies policy_id    DEFAULT     �   ALTER TABLE ONLY public.vendor_product_policies ALTER COLUMN policy_id SET DEFAULT nextval('public.vendor_product_policies_policy_id_seq'::regclass);
 P   ALTER TABLE public.vendor_product_policies ALTER COLUMN policy_id DROP DEFAULT;
       public          postgres    false    288    287            E           2604    59599    vendorbulkupload bulk_id    DEFAULT     �   ALTER TABLE ONLY public.vendorbulkupload ALTER COLUMN bulk_id SET DEFAULT nextval('public.vendorbulkupload_bulk_id_seq'::regclass);
 G   ALTER TABLE public.vendorbulkupload ALTER COLUMN bulk_id DROP DEFAULT;
       public          postgres    false    290    289            G           2604    59600    vendorclaim claim_id    DEFAULT     |   ALTER TABLE ONLY public.vendorclaim ALTER COLUMN claim_id SET DEFAULT nextval('public.vendorclaim_claim_id_seq'::regclass);
 C   ALTER TABLE public.vendorclaim ALTER COLUMN claim_id DROP DEFAULT;
       public          postgres    false    292    291            S           2604    66959    vendorclaimbuyerissue id    DEFAULT     �   ALTER TABLE ONLY public.vendorclaimbuyerissue ALTER COLUMN id SET DEFAULT nextval('public.vendorclaimbuyerissue_id_seq'::regclass);
 G   ALTER TABLE public.vendorclaimbuyerissue ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    304    303    304            J           2604    59601    vendorpolicies vendorpolicy_id    DEFAULT     �   ALTER TABLE ONLY public.vendorpolicies ALTER COLUMN vendorpolicy_id SET DEFAULT nextval('public.vendorpolicies_vendorpolicy_id_seq'::regclass);
 M   ALTER TABLE public.vendorpolicies ALTER COLUMN vendorpolicy_id DROP DEFAULT;
       public          postgres    false    294    293            K           2604    59602    vendorproductorder order_id    DEFAULT     �   ALTER TABLE ONLY public.vendorproductorder ALTER COLUMN order_id SET DEFAULT nextval('public.vendorproductorder_order_id_seq'::regclass);
 J   ALTER TABLE public.vendorproductorder ALTER COLUMN order_id DROP DEFAULT;
       public          postgres    false    296    295            M           2604    59603 
   vendors id    DEFAULT     h   ALTER TABLE ONLY public.vendors ALTER COLUMN id SET DEFAULT nextval('public.vendors_id_seq'::regclass);
 9   ALTER TABLE public.vendors ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    298    297            O           2604    59604    vendors_notifications id    DEFAULT     �   ALTER TABLE ONLY public.vendors_notifications ALTER COLUMN id SET DEFAULT nextval('public.vendors_notifications_id_seq'::regclass);
 G   ALTER TABLE public.vendors_notifications ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    300    299            P           2604    59605    withdrawals withdrawal_id    DEFAULT     �   ALTER TABLE ONLY public.withdrawals ALTER COLUMN withdrawal_id SET DEFAULT nextval('public.withdrawals_withdrawal_id_seq'::regclass);
 H   ALTER TABLE public.withdrawals ALTER COLUMN withdrawal_id DROP DEFAULT;
       public          postgres    false    302    301            c          0    59255    apploadingscreen 
   TABLE DATA           >   COPY public.apploadingscreen (id, apploading_url) FROM stdin;
    public          postgres    false    216   �      e          0    59261 
   attributes 
   TABLE DATA           k   COPY public.attributes (attribute_id, attribute_name, attribute_values, category, subcategory) FROM stdin;
    public          postgres    false    218   �      g          0    59267    audioheadphones 
   TABLE DATA           r  COPY public.audioheadphones (product_ah_id, ad_title, currency_symbol, city, state, country, brand, category, vendorid, is_featured, is_sold, is_negotiable, created_at, rejection_reason, status, updated_at_product, uniquepid, category_type, subcategory, condition, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, driversize, impedance, frequencyrange, additionaldescription, searchkeywords, keyfeatures, videourl, salespackage, isvariant, quantity, postalcode, inthebox, images) FROM stdin;
    public          postgres    false    220         i          0    59278    cameraphotography 
   TABLE DATA           �  COPY public.cameraphotography (product_cp_id, ad_title, currency_symbol, city, state, country, brand, category, vendorid, is_featured, is_sold, is_negotiable, created_at, subcategory, rejection_reason, status, updated_at_product, uniquepid, category_type, condition, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, modelname, storagetype, storagecapacity, displaysize, screenresolution, connectivityports, batterylife, dimensions, weight, warrantyinformation, additionaldescription, searchkeywords, keyfeatures, videourl, salespackage, isvariant, quantity, postalcode, inthebox, images) FROM stdin;
    public          postgres    false    222   �      k          0    59289    cart 
   TABLE DATA           �   COPY public.cart (cart_id, customer_id, vendor_id, product_uniqueid, category, subcategory, quantity, addeddate, updateddate, variantlabel, mrp, sellingprice) FROM stdin;
    public          postgres    false    224   +      m          0    59297 
   categories 
   TABLE DATA           �   COPY public.categories (category_id, category_name, category_description, category_image_url, category_status, created_at, updated_at, category_type, attribute_cat_id) FROM stdin;
    public          postgres    false    226   �      o          0    59306    clothing 
   TABLE DATA           q  COPY public.clothing (product_fac_id, ad_title, additionaldescription, countryoforigin, manufacturername, packerdetails, searchkeywords, keyfeatures, videourl, salespackage, city, state, mrp, sellingprice, quantity, inthebox, isvariant, status, category_type, currency_symbol, uniquepid, vendorid, postalcode, country, category, subcategory, skuid, images) FROM stdin;
    public          postgres    false    228   |      p          0    59312    conversations 
   TABLE DATA           h   COPY public.conversations (conversation_id, customer_id, vendor_id, conversation_user_type) FROM stdin;
    public          postgres    false    229   >      r          0    59318    coupons 
   TABLE DATA           �   COPY public.coupons (coupon_id, coupon_code, discount_type, discount_amount, expiration_date, vendorid, associated_products, created_date) FROM stdin;
    public          postgres    false    231   �      t          0    59324    currency_values 
   TABLE DATA           K   COPY public.currency_values (id, usd, kes, eur, etb, sos, inr) FROM stdin;
    public          postgres    false    233   j      v          0    59330    customer_address 
   TABLE DATA             COPY public.customer_address (address_id, customer_id, given_name_address, family_name_address, email_address, phone_address, country_address, zip_address, city_address, subregion_address, region_address, note_address, default_address, apt_address, phone_code) FROM stdin;
    public          postgres    false    235   �      x          0    59336    customer_delivery_address 
   TABLE DATA           �   COPY public.customer_delivery_address (id, customer_id, first_name, last_name, selected_country, street_address, apartment, selected_city, selected_state, zip_code, email, phone_number, orderid, unique_order_id) FROM stdin;
    public          postgres    false    237   ~$      z          0    59342    customer_follows 
   TABLE DATA           ]   COPY public.customer_follows (follow_id, follower_id, following_id, follow_date) FROM stdin;
    public          postgres    false    239   �$      |          0    59347    customer_transactions 
   TABLE DATA           �   COPY public.customer_transactions (transaction_id, customer_id, datetime, description, amount, closing_balance, wallet_txn_id, send_to_user, invoiceid, status, transaction_wallet_id) FROM stdin;
    public          postgres    false    241   �$      ~          0    59353    customer_wishlist 
   TABLE DATA           �   COPY public.customer_wishlist (wishlist_id, customer_id, uniqueid, label, category, subcategory, vendor_id, mrp, sellingprice, created_on) FROM stdin;
    public          postgres    false    243   W&      �          0    59359    customerclaim 
   TABLE DATA           !  COPY public.customerclaim (customer_claim_id, customer_id, customer_claim_description, customer_claim_status, customer_claim_date, customer_reply_description, customer_reply_date, customer_closure_description, customer_closure_date, customer_image_files, customer_video_files) FROM stdin;
    public          postgres    false    245   t&      �          0    59367 	   customers 
   TABLE DATA           �  COPY public.customers (customer_id, given_name, family_name, email, password, phone_number, address_line_1, address_line_2, city, state, zip_code, country, bio, verified_with, created_at, updated_at, status, picture, google_id, facebook_id, verification_code, verification_expire_date, customer_loggedid, customer_interest, apple_id, mogadishudistrict_customer, nile_pin) FROM stdin;
    public          postgres    false    247   �'      �          0    59377 
   homebanner 
   TABLE DATA           A   COPY public.homebanner (id, banner_url, title, link) FROM stdin;
    public          postgres    false    250   \;      �          0    59383    items_not_arrived 
   TABLE DATA           �   COPY public.items_not_arrived (id, vendor_id, product_uniqueid, customer_id, request_text, selected_option, created_at_request, response_text_from_seller, order_id) FROM stdin;
    public          postgres    false    252   �;      �          0    59390    laptopcomputers 
   TABLE DATA           #  COPY public.laptopcomputers (product_lc_id, ad_title, currency_symbol, city, state, country, brand, category, vendorid, is_featured, is_sold, is_negotiable, created_at, subcategory, rejection_reason, status, updated_at_product, uniquepid, category_type, condition, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, additionaldescription, searchkeywords, salespackage, keyfeatures, videourl, modelname, processor, ram, storagetype, storagecapacity, displaysize, screenresolution, graphicscard, operatingsystem, connectivityports, batterylife, keyboardtype, touchpad, dimensions, weight, warrantyinformation, isvariant, quantity, postalcode, inthebox, images) FROM stdin;
    public          postgres    false    254   <      �          0    59401    media_library 
   TABLE DATA           j   COPY public.media_library (media_id, title, description, file_path, creation_date, vendor_id) FROM stdin;
    public          postgres    false    256    >      �          0    59408    messages 
   TABLE DATA           y   COPY public.messages (message_id, conversation_id, sender_id, recipient_id, content, user_type, "timestamp") FROM stdin;
    public          postgres    false    258   #A      �          0    59414    mobileelectronics 
   TABLE DATA             COPY public.mobileelectronics (product_me_id, ad_title, created_at, updated_at, city, state, country, currency_symbol, category, subcategory, condition, brand, is_featured, vendorid, rejection_reason, status, uniquepid, category_type, modelname, storagetype, storagecapacity, displaysize, connectivityports, batterylife, dimensions, weight, warrantyinformation, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, additionaldescription, searchkeywords, keyfeatures, videourl, salespackage, isvariant, quantity, processor, ram, graphicscard, operatingsystem, keyboardtype, postalcode, simcard, unlockstatus, cameraresolution, inthebox, images) FROM stdin;
    public          postgres    false    260   �G      �          0    59423    mobilehomebanner 
   TABLE DATA           M   COPY public.mobilehomebanner (id, mobilebanner_url, title, link) FROM stdin;
    public          postgres    false    261   5J      �          0    59432    notifications 
   TABLE DATA           n   COPY public.notifications (notification_id, notification_type, message, customer_id, "timestamp") FROM stdin;
    public          postgres    false    263   �J      �          0    59439    payments 
   TABLE DATA           �   COPY public.payments (payment_id, customer_id, order_id, payment_date, payment_method, payment_amount, payment_status, billing_address, billing_city, billing_state, billing_zip, currency_code, payment_source, vendor_id) FROM stdin;
    public          postgres    false    265   �L      �          0    59446    product_order_cancel 
   TABLE DATA           �   COPY public.product_order_cancel (cancel_id, customer_id, vendor_id, product_id, label, selected_reason, refund_amount, total_amount, detail_charges, created_at, order_id) FROM stdin;
    public          postgres    false    268   �M      �          0    59453    products 
   TABLE DATA           �  COPY public.products (id, ad_title, city, state, country, currency_symbol, category, subcategory, vendorid, uniquepid, skuid, mrp, sellingprice, countryoforigin, manufacturername, packerdetails, additionaldescription, searchkeywords, keyfeatures, videourl, category_type, quantity, postalcode, salespackage, brand, condition, isvariant, status, updated_at_product, rejection_reason, slug_subcat, slug_cat, images, attributes_specification, prod_slug, width, length, height, weight, product_ship_from, estimate_delivery_by, nested_subcat, nested_subcat_slug, additional_condition, mogadishudistrict_ship_from, additonal_condition, product_policy_id, somali_ad_title, somali_additionaldescription) FROM stdin;
    public          postgres    false    270   �M      �          0    59461    ratings_and_reviews 
   TABLE DATA           �   COPY public.ratings_and_reviews (id, vendor_id, customer_id, rating, review_text, medias, created_at, product_uniqueid, label, rate_order_id) FROM stdin;
    public          postgres    false    272   }�      �          0    59467    return_order 
   TABLE DATA           u   COPY public.return_order (return_id, reason_return, order_id, medias_return, detail_text, return_status) FROM stdin;
    public          postgres    false    274   y�      �          0    59473    social_logins 
   TABLE DATA           Z   COPY public.social_logins (login_id, customer_id, provider, provider_user_id) FROM stdin;
    public          postgres    false    276   ��      �          0    59477    subcategories 
   TABLE DATA           �   COPY public.subcategories (subcategory_id, subcategory_name, subcategory_description, subcategory_image_url, parent_category_id, created_at, updated_at, isfeatured, subcat_status, nested_subcategories) FROM stdin;
    public          postgres    false    278   ��      �          0    59485 
   superadmin 
   TABLE DATA           j   COPY public.superadmin (id, email, password, "userId", role_id, "position", name, secret_key) FROM stdin;
    public          postgres    false    280   O�      �          0    59491    transactions 
   TABLE DATA           �   COPY public.transactions (id, transaction_id, customer_id, transaction_external_id, amount, currency_code, transaction_date, is_verified, verification_date, payment_method, notes) FROM stdin;
    public          postgres    false    282   ��      �          0    59503    variantproducts 
   TABLE DATA           �   COPY public.variantproducts (variant_id, product_uniqueid, variant_mrp, variant_sellingprice, variant_skuid, variant_quantity, variantsvalues, label, vendori_id, variant_category, variant_subcategory) FROM stdin;
    public          postgres    false    285   ��      �          0    59509    vendor_product_policies 
   TABLE DATA           �   COPY public.vendor_product_policies (policy_id, vendor_id, policy_name, policy_type, policy_description, policy_status, policy_created_date) FROM stdin;
    public          postgres    false    287   ��      �          0    59516    vendorbulkupload 
   TABLE DATA           \   COPY public.vendorbulkupload (bulk_id, datetime, vendor_id, productids, status) FROM stdin;
    public          postgres    false    289   ��      �          0    59523    vendorclaim 
   TABLE DATA           �   COPY public.vendorclaim (claim_id, vendor_id, claim_description, claim_status, claim_date, reply_description, reply_date, closure_description, closure_date, image_files, video_files) FROM stdin;
    public          postgres    false    291   �      �          0    66956    vendorclaimbuyerissue 
   TABLE DATA           �   COPY public.vendorclaimbuyerissue (id, vendor_id, customer_id, order_id, selected_reason, report_reason, product_uniqueid, report_approved_by_admin, showcountofactionbyadmin, adminresponse) FROM stdin;
    public          postgres    false    304   a�      �          0    59531    vendorpolicies 
   TABLE DATA           z   COPY public.vendorpolicies (vendorpolicy_id, shipping_information, return_policy, business_policy, vendor_id) FROM stdin;
    public          postgres    false    293   �      �          0    59537    vendorproductorder 
   TABLE DATA           F  COPY public.vendorproductorder (order_id, vendor_id, product_uniqueid, customer_id, total_amount, order_status, rejection_reason, product_name, customer_name, product_image, customer_email, customer_phone_number, currency_symbol, payment_method, payment_status, city, state, country, brand, category, subcategory, product_type, transaction_id, commission_fee, withdrawal_amount, refund_amount, fees_paid, tax_collected, orderid, quantity, label, tentative_delivery_date, skuid_order, ispickup, seller_otp, customer_otp, order_date, created_at, shipping_fee, sell_price) FROM stdin;
    public          postgres    false    295   ��      �          0    59544    vendors 
   TABLE DATA           �  COPY public.vendors (id, country_code, mobile_number, email, password, brand_name, business_model, products, trademark_certificate, company_name, company_city, company_state, company_country, company_zip_code, shipping_address, bank_name, bank_account_number, bank_routing_number, bank_account_name, bank_branch, bank_swift_code, registration_date, mobile_verification_status, email_verification_status, status, business_type, registration_number, tax_id_number, business_address, business_phone, business_email, business_website, business_description, facebook_url, instagram_url, twitter_url, linkedin_url, business_logo_url, business_license_url, return_policy, shipping_policy, terms_and_conditions, payment_info, shipping_info, support_contact, categories, average_rating, total_products, total_sales, support_contact_1, support_contact_2, vendor_profile_picture_url, brand_logo, useridvendor, vendorname, email_otp, mobile_otp, reset_otp, followers, following, vendor_username, company_district) FROM stdin;
    public          postgres    false    297   _�      �          0    59551    vendors_notifications 
   TABLE DATA           Z   COPY public.vendors_notifications (id, vendor_id, type, title, message, date) FROM stdin;
    public          postgres    false    299   U      �          0    59557    withdrawals 
   TABLE DATA           �   COPY public.withdrawals (withdrawal_id, vendor_id, currency_code, amount, withdrawal_date, status, bank_account_number, bank_name, bank_branch, created_at, updated_at) FROM stdin;
    public          postgres    false    301   �      �           0    0    apploadingscreen_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.apploadingscreen_id_seq', 1, false);
          public          postgres    false    217            �           0    0    attributes_attribute_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.attributes_attribute_id_seq', 24, true);
          public          postgres    false    219            �           0    0 "   audio_headphones_product_ah_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.audio_headphones_product_ah_id_seq', 45, true);
          public          postgres    false    221            �           0    0 $   camera_photography_product_cp_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.camera_photography_product_cp_id_seq', 41, true);
          public          postgres    false    223            �           0    0    cart_cart_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.cart_cart_id_seq', 1007, true);
          public          postgres    false    225            �           0    0    categories_category_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.categories_category_id_seq', 74, true);
          public          postgres    false    227            �           0    0 !   conversations_conversation_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.conversations_conversation_id_seq', 34, true);
          public          postgres    false    230            �           0    0    coupons_coupon_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.coupons_coupon_id_seq', 9, true);
          public          postgres    false    232            �           0    0    currency_values_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.currency_values_id_seq', 1, true);
          public          postgres    false    234            �           0    0    customer_address_address_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.customer_address_address_id_seq', 152, true);
          public          postgres    false    236            �           0    0     customer_delivery_address_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.customer_delivery_address_id_seq', 168, true);
          public          postgres    false    238            �           0    0    customer_follows_follow_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.customer_follows_follow_id_seq', 19, true);
          public          postgres    false    240            �           0    0 (   customer_transactions_transaction_id_seq    SEQUENCE SET     V   SELECT pg_catalog.setval('public.customer_transactions_transaction_id_seq', 9, true);
          public          postgres    false    242            �           0    0 !   customer_wishlist_wishlist_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.customer_wishlist_wishlist_id_seq', 155, true);
          public          postgres    false    244            �           0    0 #   customerclaim_customer_claim_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.customerclaim_customer_claim_id_seq', 3, true);
          public          postgres    false    246            �           0    0    customers_customer_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.customers_customer_id_seq', 196, true);
          public          postgres    false    248            �           0    0 "   fashionclothing_product_fac_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.fashionclothing_product_fac_id_seq', 8, true);
          public          postgres    false    249                        0    0    homebanner_new_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.homebanner_new_id_seq', 10, true);
          public          postgres    false    251                       0    0    items_not_arrived_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.items_not_arrived_id_seq', 1, false);
          public          postgres    false    253                       0    0 !   laptopcomputers_product_lc_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.laptopcomputers_product_lc_id_seq', 121, true);
          public          postgres    false    255                       0    0    media_library_media_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.media_library_media_id_seq', 49, true);
          public          postgres    false    257                       0    0    messages_message_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.messages_message_id_seq', 216, true);
          public          postgres    false    259                       0    0    mobilehomebanner_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.mobilehomebanner_id_seq', 10, true);
          public          postgres    false    262                       0    0 !   notifications_notification_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.notifications_notification_id_seq', 17, true);
          public          postgres    false    264                       0    0    payments_payment_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.payments_payment_id_seq', 119, true);
          public          postgres    false    266                       0    0 ,   product_mobile_electronics_product_me_id_seq    SEQUENCE SET     \   SELECT pg_catalog.setval('public.product_mobile_electronics_product_me_id_seq', 365, true);
          public          postgres    false    267            	           0    0 "   product_order_cancel_cancel_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.product_order_cancel_cancel_id_seq', 2, true);
          public          postgres    false    269            
           0    0    products_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.products_id_seq', 4508, true);
          public          postgres    false    271                       0    0    ratings_and_reviews_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.ratings_and_reviews_id_seq', 123, true);
          public          postgres    false    273                       0    0    return_order_return_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.return_order_return_id_seq', 1, false);
          public          postgres    false    275                       0    0    social_logins_login_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.social_logins_login_id_seq', 1, false);
          public          postgres    false    277                       0    0     subcategories_subcategory_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.subcategories_subcategory_id_seq', 383, true);
          public          postgres    false    279                       0    0    superadmin_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.superadmin_id_seq', 28, true);
          public          postgres    false    281                       0    0    transactions_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.transactions_id_seq', 15, true);
          public          postgres    false    283                       0    0    transactions_id_seqs    SEQUENCE SET     C   SELECT pg_catalog.setval('public.transactions_id_seqs', 15, true);
          public          postgres    false    284                       0    0    variantproducts_variant_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.variantproducts_variant_id_seq', 133, true);
          public          postgres    false    286                       0    0 %   vendor_product_policies_policy_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.vendor_product_policies_policy_id_seq', 1, true);
          public          postgres    false    288                       0    0    vendorbulkupload_bulk_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.vendorbulkupload_bulk_id_seq', 1, false);
          public          postgres    false    290                       0    0    vendorclaim_claim_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.vendorclaim_claim_id_seq', 17, true);
          public          postgres    false    292                       0    0    vendorclaimbuyerissue_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.vendorclaimbuyerissue_id_seq', 1, true);
          public          postgres    false    303                       0    0 "   vendorpolicies_vendorpolicy_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.vendorpolicies_vendorpolicy_id_seq', 1, true);
          public          postgres    false    294                       0    0    vendorproductorder_order_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.vendorproductorder_order_id_seq', 231, true);
          public          postgres    false    296                       0    0    vendors_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.vendors_id_seq', 116, true);
          public          postgres    false    298                       0    0    vendors_notifications_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.vendors_notifications_id_seq', 44, true);
          public          postgres    false    300                       0    0    withdrawals_withdrawal_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.withdrawals_withdrawal_id_seq', 6, true);
          public          postgres    false    302            Z           2606    59636 &   apploadingscreen apploadingscreen_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.apploadingscreen
    ADD CONSTRAINT apploadingscreen_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.apploadingscreen DROP CONSTRAINT apploadingscreen_pkey;
       public            postgres    false    216            \           2606    59638    attributes attributes_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.attributes
    ADD CONSTRAINT attributes_pkey PRIMARY KEY (attribute_id);
 D   ALTER TABLE ONLY public.attributes DROP CONSTRAINT attributes_pkey;
       public            postgres    false    218            ^           2606    59640 %   audioheadphones audio_headphones_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.audioheadphones
    ADD CONSTRAINT audio_headphones_pkey PRIMARY KEY (product_ah_id);
 O   ALTER TABLE ONLY public.audioheadphones DROP CONSTRAINT audio_headphones_pkey;
       public            postgres    false    220            `           2606    59642 )   cameraphotography camera_photography_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.cameraphotography
    ADD CONSTRAINT camera_photography_pkey PRIMARY KEY (product_cp_id);
 S   ALTER TABLE ONLY public.cameraphotography DROP CONSTRAINT camera_photography_pkey;
       public            postgres    false    222            b           2606    59644    cart cart_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (cart_id);
 8   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_pkey;
       public            postgres    false    224            d           2606    59646    categories categories_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public            postgres    false    226            h           2606    59648 5   conversations conversations_customer_id_vendor_id_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_customer_id_vendor_id_key UNIQUE (customer_id, vendor_id);
 _   ALTER TABLE ONLY public.conversations DROP CONSTRAINT conversations_customer_id_vendor_id_key;
       public            postgres    false    229    229            j           2606    59650     conversations conversations_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_pkey PRIMARY KEY (conversation_id);
 J   ALTER TABLE ONLY public.conversations DROP CONSTRAINT conversations_pkey;
       public            postgres    false    229            l           2606    59652    coupons coupons_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_pkey PRIMARY KEY (coupon_id);
 >   ALTER TABLE ONLY public.coupons DROP CONSTRAINT coupons_pkey;
       public            postgres    false    231            n           2606    59654 $   currency_values currency_values_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.currency_values
    ADD CONSTRAINT currency_values_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.currency_values DROP CONSTRAINT currency_values_pkey;
       public            postgres    false    233            p           2606    59656 &   customer_address customer_address_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.customer_address
    ADD CONSTRAINT customer_address_pkey PRIMARY KEY (address_id);
 P   ALTER TABLE ONLY public.customer_address DROP CONSTRAINT customer_address_pkey;
       public            postgres    false    235            r           2606    59658 8   customer_delivery_address customer_delivery_address_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public.customer_delivery_address
    ADD CONSTRAINT customer_delivery_address_pkey PRIMARY KEY (id);
 b   ALTER TABLE ONLY public.customer_delivery_address DROP CONSTRAINT customer_delivery_address_pkey;
       public            postgres    false    237            t           2606    59660 &   customer_follows customer_follows_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.customer_follows
    ADD CONSTRAINT customer_follows_pkey PRIMARY KEY (follow_id);
 P   ALTER TABLE ONLY public.customer_follows DROP CONSTRAINT customer_follows_pkey;
       public            postgres    false    239            v           2606    59662 0   customer_transactions customer_transactions_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public.customer_transactions
    ADD CONSTRAINT customer_transactions_pkey PRIMARY KEY (transaction_id);
 Z   ALTER TABLE ONLY public.customer_transactions DROP CONSTRAINT customer_transactions_pkey;
       public            postgres    false    241            z           2606    59664 (   customer_wishlist customer_wishlist_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.customer_wishlist
    ADD CONSTRAINT customer_wishlist_pkey PRIMARY KEY (wishlist_id);
 R   ALTER TABLE ONLY public.customer_wishlist DROP CONSTRAINT customer_wishlist_pkey;
       public            postgres    false    243            }           2606    59666     customerclaim customerclaim_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.customerclaim
    ADD CONSTRAINT customerclaim_pkey PRIMARY KEY (customer_claim_id);
 J   ALTER TABLE ONLY public.customerclaim DROP CONSTRAINT customerclaim_pkey;
       public            postgres    false    245                       2606    59668    customers customers_email_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_email_key UNIQUE (email);
 G   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_email_key;
       public            postgres    false    247            �           2606    59670    customers customers_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (customer_id);
 B   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_pkey;
       public            postgres    false    247            f           2606    59672    clothing fashionclothing_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.clothing
    ADD CONSTRAINT fashionclothing_pkey PRIMARY KEY (product_fac_id);
 G   ALTER TABLE ONLY public.clothing DROP CONSTRAINT fashionclothing_pkey;
       public            postgres    false    228            �           2606    59674    homebanner homebanner_new_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.homebanner
    ADD CONSTRAINT homebanner_new_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.homebanner DROP CONSTRAINT homebanner_new_pkey;
       public            postgres    false    250            �           2606    59676 (   items_not_arrived items_not_arrived_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.items_not_arrived
    ADD CONSTRAINT items_not_arrived_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.items_not_arrived DROP CONSTRAINT items_not_arrived_pkey;
       public            postgres    false    252            �           2606    59678 $   laptopcomputers laptopcomputers_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.laptopcomputers
    ADD CONSTRAINT laptopcomputers_pkey PRIMARY KEY (product_lc_id);
 N   ALTER TABLE ONLY public.laptopcomputers DROP CONSTRAINT laptopcomputers_pkey;
       public            postgres    false    254            �           2606    59680     media_library media_library_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.media_library
    ADD CONSTRAINT media_library_pkey PRIMARY KEY (media_id);
 J   ALTER TABLE ONLY public.media_library DROP CONSTRAINT media_library_pkey;
       public            postgres    false    256            �           2606    59682    messages messages_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (message_id);
 @   ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_pkey;
       public            postgres    false    258            �           2606    59684 &   mobilehomebanner mobilehomebanner_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.mobilehomebanner
    ADD CONSTRAINT mobilehomebanner_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.mobilehomebanner DROP CONSTRAINT mobilehomebanner_pkey;
       public            postgres    false    261            �           2606    59686     notifications notifications_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (notification_id);
 J   ALTER TABLE ONLY public.notifications DROP CONSTRAINT notifications_pkey;
       public            postgres    false    263            �           2606    59688    payments payments_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (payment_id);
 @   ALTER TABLE ONLY public.payments DROP CONSTRAINT payments_pkey;
       public            postgres    false    265            �           2606    59690 1   mobileelectronics product_mobile_electronics_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public.mobileelectronics
    ADD CONSTRAINT product_mobile_electronics_pkey PRIMARY KEY (product_me_id);
 [   ALTER TABLE ONLY public.mobileelectronics DROP CONSTRAINT product_mobile_electronics_pkey;
       public            postgres    false    260            �           2606    59692 .   product_order_cancel product_order_cancel_pkey 
   CONSTRAINT     s   ALTER TABLE ONLY public.product_order_cancel
    ADD CONSTRAINT product_order_cancel_pkey PRIMARY KEY (cancel_id);
 X   ALTER TABLE ONLY public.product_order_cancel DROP CONSTRAINT product_order_cancel_pkey;
       public            postgres    false    268            �           2606    59694    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    270            �           2606    59696 ,   ratings_and_reviews ratings_and_reviews_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.ratings_and_reviews
    ADD CONSTRAINT ratings_and_reviews_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.ratings_and_reviews DROP CONSTRAINT ratings_and_reviews_pkey;
       public            postgres    false    272            �           2606    59698 &   return_order return_order_order_id_key 
   CONSTRAINT     e   ALTER TABLE ONLY public.return_order
    ADD CONSTRAINT return_order_order_id_key UNIQUE (order_id);
 P   ALTER TABLE ONLY public.return_order DROP CONSTRAINT return_order_order_id_key;
       public            postgres    false    274            �           2606    59700    return_order return_order_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.return_order
    ADD CONSTRAINT return_order_pkey PRIMARY KEY (return_id);
 H   ALTER TABLE ONLY public.return_order DROP CONSTRAINT return_order_pkey;
       public            postgres    false    274            �           2606    59702 4   social_logins social_logins_customer_id_provider_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.social_logins
    ADD CONSTRAINT social_logins_customer_id_provider_key UNIQUE (customer_id, provider);
 ^   ALTER TABLE ONLY public.social_logins DROP CONSTRAINT social_logins_customer_id_provider_key;
       public            postgres    false    276    276            �           2606    59704     social_logins social_logins_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.social_logins
    ADD CONSTRAINT social_logins_pkey PRIMARY KEY (login_id);
 J   ALTER TABLE ONLY public.social_logins DROP CONSTRAINT social_logins_pkey;
       public            postgres    false    276            �           2606    59706     subcategories subcategories_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.subcategories
    ADD CONSTRAINT subcategories_pkey PRIMARY KEY (subcategory_id);
 J   ALTER TABLE ONLY public.subcategories DROP CONSTRAINT subcategories_pkey;
       public            postgres    false    278            �           2606    59708    superadmin superadmin_email_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.superadmin
    ADD CONSTRAINT superadmin_email_key UNIQUE (email);
 I   ALTER TABLE ONLY public.superadmin DROP CONSTRAINT superadmin_email_key;
       public            postgres    false    280            �           2606    59710    superadmin superadmin_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.superadmin
    ADD CONSTRAINT superadmin_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.superadmin DROP CONSTRAINT superadmin_pkey;
       public            postgres    false    280            �           2606    59712    transactions transactions_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.transactions DROP CONSTRAINT transactions_pkey;
       public            postgres    false    282            �           2606    59714    products unique_skuid_vendorid 
   CONSTRAINT     d   ALTER TABLE ONLY public.products
    ADD CONSTRAINT unique_skuid_vendorid UNIQUE (skuid, vendorid);
 H   ALTER TABLE ONLY public.products DROP CONSTRAINT unique_skuid_vendorid;
       public            postgres    false    270    270            �           2606    59716 $   variantproducts variantproducts_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.variantproducts
    ADD CONSTRAINT variantproducts_pkey PRIMARY KEY (variant_id);
 N   ALTER TABLE ONLY public.variantproducts DROP CONSTRAINT variantproducts_pkey;
       public            postgres    false    285            �           2606    59718 4   vendor_product_policies vendor_product_policies_pkey 
   CONSTRAINT     y   ALTER TABLE ONLY public.vendor_product_policies
    ADD CONSTRAINT vendor_product_policies_pkey PRIMARY KEY (policy_id);
 ^   ALTER TABLE ONLY public.vendor_product_policies DROP CONSTRAINT vendor_product_policies_pkey;
       public            postgres    false    287            �           2606    59720 &   vendorbulkupload vendorbulkupload_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.vendorbulkupload
    ADD CONSTRAINT vendorbulkupload_pkey PRIMARY KEY (bulk_id);
 P   ALTER TABLE ONLY public.vendorbulkupload DROP CONSTRAINT vendorbulkupload_pkey;
       public            postgres    false    289            �           2606    59722    vendorclaim vendorclaim_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.vendorclaim
    ADD CONSTRAINT vendorclaim_pkey PRIMARY KEY (claim_id);
 F   ALTER TABLE ONLY public.vendorclaim DROP CONSTRAINT vendorclaim_pkey;
       public            postgres    false    291            �           2606    66965 0   vendorclaimbuyerissue vendorclaimbuyerissue_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.vendorclaimbuyerissue
    ADD CONSTRAINT vendorclaimbuyerissue_pkey PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public.vendorclaimbuyerissue DROP CONSTRAINT vendorclaimbuyerissue_pkey;
       public            postgres    false    304            �           2606    59724 "   vendorpolicies vendorpolicies_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.vendorpolicies
    ADD CONSTRAINT vendorpolicies_pkey PRIMARY KEY (vendorpolicy_id);
 L   ALTER TABLE ONLY public.vendorpolicies DROP CONSTRAINT vendorpolicies_pkey;
       public            postgres    false    293            �           2606    59726 *   vendorproductorder vendorproductorder_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.vendorproductorder
    ADD CONSTRAINT vendorproductorder_pkey PRIMARY KEY (order_id);
 T   ALTER TABLE ONLY public.vendorproductorder DROP CONSTRAINT vendorproductorder_pkey;
       public            postgres    false    295            �           2606    59728 0   vendors_notifications vendors_notifications_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.vendors_notifications
    ADD CONSTRAINT vendors_notifications_pkey PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public.vendors_notifications DROP CONSTRAINT vendors_notifications_pkey;
       public            postgres    false    299            �           2606    59730    vendors vendors_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.vendors
    ADD CONSTRAINT vendors_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.vendors DROP CONSTRAINT vendors_pkey;
       public            postgres    false    297            �           2606    59732    withdrawals withdrawals_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.withdrawals
    ADD CONSTRAINT withdrawals_pkey PRIMARY KEY (withdrawal_id);
 F   ALTER TABLE ONLY public.withdrawals DROP CONSTRAINT withdrawals_pkey;
       public            postgres    false    301            �           1259    59733    idx_customer_id    INDEX     V   CREATE INDEX idx_customer_id ON public.ratings_and_reviews USING btree (customer_id);
 #   DROP INDEX public.idx_customer_id;
       public            postgres    false    272            w           1259    59734 %   idx_customer_transactions_customer_id    INDEX     n   CREATE INDEX idx_customer_transactions_customer_id ON public.customer_transactions USING btree (customer_id);
 9   DROP INDEX public.idx_customer_transactions_customer_id;
       public            postgres    false    241            x           1259    59735 "   idx_customer_transactions_datetime    INDEX     h   CREATE INDEX idx_customer_transactions_datetime ON public.customer_transactions USING btree (datetime);
 6   DROP INDEX public.idx_customer_transactions_datetime;
       public            postgres    false    241            {           1259    59736 !   idx_customer_wishlist_customer_id    INDEX     f   CREATE INDEX idx_customer_wishlist_customer_id ON public.customer_wishlist USING btree (customer_id);
 5   DROP INDEX public.idx_customer_wishlist_customer_id;
       public            postgres    false    243            �           1259    59737    idx_transaction_external_id    INDEX     g   CREATE INDEX idx_transaction_external_id ON public.transactions USING btree (transaction_external_id);
 /   DROP INDEX public.idx_transaction_external_id;
       public            postgres    false    282            �           1259    59738    idx_vendor_id    INDEX     R   CREATE INDEX idx_vendor_id ON public.ratings_and_reviews USING btree (vendor_id);
 !   DROP INDEX public.idx_vendor_id;
       public            postgres    false    272            �           2606    59739    cart cart_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 D   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_customer_id_fkey;
       public          postgres    false    224    4993    247            �           2606    59744    cart cart_vendor_id_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);
 B   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_vendor_id_fkey;
       public          postgres    false    224    297    5052            �           2606    59749 ,   conversations conversations_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 V   ALTER TABLE ONLY public.conversations DROP CONSTRAINT conversations_customer_id_fkey;
       public          postgres    false    4993    247    229            �           2606    59754 *   conversations conversations_vendor_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);
 T   ALTER TABLE ONLY public.conversations DROP CONSTRAINT conversations_vendor_id_fkey;
       public          postgres    false    229    297    5052            �           2606    59759 2   customer_follows customer_follows_follower_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer_follows
    ADD CONSTRAINT customer_follows_follower_id_fkey FOREIGN KEY (follower_id) REFERENCES public.customers(customer_id) ON DELETE CASCADE;
 \   ALTER TABLE ONLY public.customer_follows DROP CONSTRAINT customer_follows_follower_id_fkey;
       public          postgres    false    239    4993    247            �           2606    59764 3   customer_follows customer_follows_following_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer_follows
    ADD CONSTRAINT customer_follows_following_id_fkey FOREIGN KEY (follower_id) REFERENCES public.customers(customer_id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.customer_follows DROP CONSTRAINT customer_follows_following_id_fkey;
       public          postgres    false    239    247    4993            �           2606    59769 4   customer_wishlist customer_wishlist_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer_wishlist
    ADD CONSTRAINT customer_wishlist_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 ^   ALTER TABLE ONLY public.customer_wishlist DROP CONSTRAINT customer_wishlist_customer_id_fkey;
       public          postgres    false    247    4993    243            �           2606    59774 ,   customerclaim customerclaim_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customerclaim
    ADD CONSTRAINT customerclaim_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 V   ALTER TABLE ONLY public.customerclaim DROP CONSTRAINT customerclaim_customer_id_fkey;
       public          postgres    false    245    4993    247            �           2606    59779    transactions fk_customer    FK CONSTRAINT     �   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id) ON DELETE CASCADE;
 B   ALTER TABLE ONLY public.transactions DROP CONSTRAINT fk_customer;
       public          postgres    false    247    282    4993            �           2606    59784 !   customer_transactions fk_customer    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer_transactions
    ADD CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 K   ALTER TABLE ONLY public.customer_transactions DROP CONSTRAINT fk_customer;
       public          postgres    false    247    4993    241            �           2606    59789 &   messages messages_conversation_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(conversation_id);
 P   ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_conversation_id_fkey;
       public          postgres    false    4970    258    229            �           2606    59794 :   product_order_cancel product_order_cancel_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_order_cancel
    ADD CONSTRAINT product_order_cancel_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 d   ALTER TABLE ONLY public.product_order_cancel DROP CONSTRAINT product_order_cancel_customer_id_fkey;
       public          postgres    false    247    268    4993            �           2606    59799 9   product_order_cancel product_order_cancel_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_order_cancel
    ADD CONSTRAINT product_order_cancel_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);
 c   ALTER TABLE ONLY public.product_order_cancel DROP CONSTRAINT product_order_cancel_product_id_fkey;
       public          postgres    false    270    5015    268            �           2606    59804 8   product_order_cancel product_order_cancel_vendor_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_order_cancel
    ADD CONSTRAINT product_order_cancel_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);
 b   ALTER TABLE ONLY public.product_order_cancel DROP CONSTRAINT product_order_cancel_vendor_id_fkey;
       public          postgres    false    268    297    5052            �           2606    59809 ,   social_logins social_logins_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.social_logins
    ADD CONSTRAINT social_logins_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 V   ALTER TABLE ONLY public.social_logins DROP CONSTRAINT social_logins_customer_id_fkey;
       public          postgres    false    4993    276    247            �           2606    59814 3   subcategories subcategories_parent_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.subcategories
    ADD CONSTRAINT subcategories_parent_category_id_fkey FOREIGN KEY (parent_category_id) REFERENCES public.categories(category_id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.subcategories DROP CONSTRAINT subcategories_parent_category_id_fkey;
       public          postgres    false    226    278    4964            �           2606    59819 &   vendorclaim vendorclaim_vendor_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.vendorclaim
    ADD CONSTRAINT vendorclaim_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);
 P   ALTER TABLE ONLY public.vendorclaim DROP CONSTRAINT vendorclaim_vendor_id_fkey;
       public          postgres    false    297    5052    291            c   4   x�3�t,(��OL��K/N.JM��5470774�45461�5�+�K����� 3]      e      x������ � �      g   �  x��UMo�@=/�bO=�����R���Ur�S]j��q�FQ�{gY'nWJ*U�.�<�7o��nV69�6}G.�ə-����fmɧ6+-�v�y���ͺk�yO�!?��3.B`! �"e"�Akɝ'6�2I��R�4F '\��˺ˮ曞���ʎ��s�-���{J��yF ]��"�p3��yo��3�%�����.�ki~��'v�	���>�	�!�?�rO8_8е�ȴ�\"{�d�i��@
���'��P��)�X*x�t$�Q�3��f�+�<sx�6o�+Xv|��	س�?>�zQ/*RW�=�ٺ���Q��]��ݠ�ᛕv7ނN�J����^ۍ]C�l��H<"��o��8D8���!GD;�.fHW�R��T����1���	�X�:�'ru�o�'��Nht'�@�z\��G!�A�C��ն(�bU^䑸���*Ǔ��:�w%x�����k>/�t{:�c E�5��`"-���D�s����#��]����ϳ�=(}#̨|����U��K״��H^�Sq�BIlֻV�Lq�*�9J$�[�] %i���M�6+����1�S�BDB0	��H��Ib���!��+R0\7�f4~?�f�eyN4��?]=���sa[:-lfg/e@J��E��X�{m(4��L��9`V8�]G�'h����jo/j49�p�O�0(#Q�$���C�-�L��ly\DA�fc      i   #  x��QMO�0=���'n�b7���!!�4q��k
ݒ�SS�⿓��I�ʓ��؎�"��l�qy���Gv�42�Z��@^�����nZT��a��,AL���j�l(OKIuU�%ﺑ�x���<�}D0�SE,�A���;PD���������Gb�@9�����Jv�`��̨p�����W�B�\I6ڧ��!N���Y���s��$ŉ8�J�:HA<'���m�q����o�[�����j{t�[���
�P��E]c�K��2On���à��n���ViE����^      k   h   x�}�;� F���
7 ޟ���ifSLcc	4��������k�=!XE�(��{/����Ƚ���N�҆ ���lf��im]voK��/��@3S�C�i���p�      m   �  x��Zk��6���
"���%���<n����n�A��W�m%��R�o����=CI�dK�-�5��p�̙3T��z�4����e)r]<������덐��n�7���č�$��M"{bыc7��г��9��K[�����^��h���(r�8�����?�\5����>>�|�W�KvWk�Ŭ���A:�e�e�ƶ�ceڹt�N�Fq��Z�$ԡȅq.���;��üo��\=7
��>����;Y��Qrki�к�|(Yy�~{^�y'q�(���GAb��9e��E2��}w"��a$#�z��(y�vZ�s6��O�M�$��5�kugm�W7v�,
\����W׺o�"��U�V�NT9��6N�ȟɿgA�� `>0��.���`���\��/x%����1}�d� C�ޭ�!N���e���p�O�Vʒ}j������4�f!�x����9��;�M�k��F�'֧�����~��%��M]{di.�n�Ae�=/]��5�E���-���i��Z�rj���I�<w��N��������o�̫Վ�(;�_��!<Q�yA`�-֚}Q|��'�[�S����	B��[K�Ҋ���&�<����D�\��OϷ����>IQ��b8E��Q=��Q�ӻ?�BT3�k@,?C�)��,�_���C����\H]��ϝ��yi�Y_$�o�	��B����^oYYp��J0��Dk�5�JT����q�>��p�ޖ��u����%υ��(�c�	�p� i��J*e�DU�I���by����x��?��^���`���2��|�kV�#l�c�ܭ����=(�o��B#Uu�����Yo9��WunN����X�/p�Q�m�V�,6[�nJVoe�xqJ2�n�"c��P\/�ξ�$��s
*�8��P�*��^{j��e,�̉�4n���K�b�=�R��l�I%i���Ҙ�QL�2�a�`��r�4*�̺��&T���&e�vF�A�d���d��Tv&��?[���Cd7VF��)W�ea�4YQ��D�׷�ɟ�K�,�%����n|I�������3�/b�Е���s�����I���1b�\������)��`�����)�Jp�F2;(Y�"�ϵT�O^u./T큃��R�����7hk��DXT�<���	��� *S�=�5��10b�
��oe%Z��K!~��e#�D%�z/�����Q)�/8k߀����b0�a-z64��Gـ�p:8Taц�(��E��e^t��c�e`8X�|�`�Ylg����D�|��FL��U��$-�8I}^�N#߳S;�h�ɇ����=���#��g%�R�U����S��Y�YvU�å!'Br|�:�ҙ�t�xh>�h́�u{����D�j���	5�������� ��n��D���c�ºz@�o���\Q�z�h@��JB)��q�˴A��5�v'��B���g��G�V�v2�N/t;���E�^f9��*�~+��G�j�G���M�E[5,�vM�f�a�i�Ψ!��A���έ�X��i2	�����Յ�pi4�
Z?�� J��)3��Գ�1���\��c4�[K#�[�F���@��*���=4Ko��"�L�ȯR��L���`&�uC��Ph��9ƚ�o��G0�[�fD�0�J�Ul�&����<������@��r��jx�V
��}wYN)�ǽ�{@lnj���\?��p����~^�eF�y�������*{č��K�WR���W�So[j�z[
�*�O�
��d���?�Bݮ���Sfe�蹧�:��#J�9��X� 4(���Ǌ�h(�S|Eu�(�Ԭ,ֳa��&3R/�0�$�}��tFK?A81p_MyåS����{��K��W$������}0�4���։.����UP)ch�rt�4H��V�\\j�S��M�n�Z�f�[J�8�@�Bd��&DmM�y�a�d_�Ja�#�n��i[	W�p�<y�<'$9���-0�����r1��M�� ڀ�
s�vu�lc����
���XzUelo�0M'2ZF�C���.n�4�����4X,�Gx~��s�c����x�g�Q#h�/�2d�#���� #���K�6X��OV�bJH�#�U x�K�3�}gtiLd�".ʛ���b
�S<v[�����6 �<�&��0R�����#�kA���a�W���˱mѫ%6M�yBw����oa��쟛w.�[w"8�m�m����SE�&�?�ް/re��
�2J�4N��ʇK��N����=FdP���tU��� �`{N1y��/��D@�3(p=p�V��ڨO#y5���4`M���d%r�/Q���Q�.����B\�+��h�<Wt��u��P&��n6�Zh��ʜŬ��R,�2���j��;N I�,�M�^Ӊ��-���Ch�����H�&�K`�Dg6{Y�I�����(��2^��ǽ����Ұ�$�u-����њ�=ڄ�Y�Ҭ�Gѷ bEcDK��G�[�j��k�F)�A�^�^"�D�L%��l��*�	\}�3u�:,p�P��Ш8>�w�ɪQ�i4�NF^<�y�wJo�_��@���I�v�m��Zh#q�[^��bx��Z�~cR��k��ަI�U�r��0�����n�{����d�20��(�ֱ�8�r�?���2/]z��gn��ޭ�aA$���*p�H� )n�*��w��Z�����l7m�,pN�w�;~~o�^��蔐��W%�-��'΢�Xuʩ��g��M�^�1��d���w�/���㟹���cyt��/��_����鯻�?�~�3��~��������[A������!?½���>��%fL�~�%Ytki������oD�P��<D'��AxO���fT }*$5�7�'r9�CR	�9�g���鉲lZM��[�(�j����������sC7[�v�*�$�+�m%K���m�;�H�}Q�m�+�����ƛkH�����X]7��ؾ���Y������x�4�n����@���H���j����#�m֮xi�i��c^���RQ��t��Ȗ	�0ItM�	���U�@A�*�m�M�/4����^��d?�N����0y�E�����3�R�P�΂7�q��>s��Đ������i�᣻|h��`׮��p���j�jI�n��qjʕ@K�J���ƶ�1J FXHl�K����xQ�%᭥!~s�={���`�      o   �   x�5���0���Sxb�P~WB0��K�ZIJh�� �R@��N��[b��h��7���TAt����6��Qv�O�)���=�3�64,)񫋚���3�Fmn�q�VG-��E����gwo=#��{\p9o���&PL�,��~��=�BC#Z�%���X�����1�u���[r'I��DE�      p   y   x�U�;�0�zs'$�.vj����/�"���]� �$X��߹o�� �A~�;(�8���$;a���������LX�P4bOO7��妍��}4�3{J���r���XO{WK�B�7�Q�      r   �   x�3��K-72�T�42�30 �Fƺ����ƜƦ��J@Y��Լ��"�Z�����SjqIh^Jj�F�F�1~3.KN'��Ģ|C#cN7NS�r]�e� ��J�>�
��y�
�&
N9��:
�F
�N�@5p��qqq ��)(      t   .   x�3�4�44��3�0�4г46�45��z���z�f\1z\\\ ��y      v   �  x��X�n�8}f�b���j ���oU�t��q����b,ƒhPTR���sv$���7i���a�5sxxf8�'|�!U��K6�L�,�����9��p�s�� �"r��~,��	L,ZY��w݈�O�,�76B�fz�0�UaW,6�VȾ�����hv�od��YB�����3�.qE�h���D6�9�D6�s�i�<���P�����n�v�l��{����l,���l�
YQ����QY��2+K�2���g��2e�8;Nq��7��ޜ�m�Z�de���0��P4��8s���4���$���n�Eyyu�(;� ��À�U$���>�钝�b����S4X��l��%0��)*J\I�CrW@�ŭʀ��v7�OD/�>�p�<��HJ(��hXUw�u��d��+XK�#vBQ�־��O��O�w��L2�"�H���7zn0�U1�eSh�q�9+������~���G��H/�S0�bN�*7�}�4�5��蜺;k�:t�u�,��BJ��s��E�%T�h��ɧ��pi_/��&�Ff�:��2���F>qB�x�Sd'6UzI��v�������D�2]�A�;�ؚkP�������$t����{1��g8���'J�8��;��5񴘿�q���I�.�f����W�Rֱ�Y
���E�
ƨ��Rp�1Y���vߔ��S=%ES��G�"�]�U�4A�Υ��T�mt�8�F�l��wR'�w��b>.�>�z��x+��/�M�d���lu}7��R�&Q#�} ���r���>��.�0&��MJ�����r�~p�ߛ<�y�͇������CTQ<��Q��}��8��,�l�����Dr	��jd1W�v^7���:g_��W�6E8�[���uw�!.�� ���R		����nlŐn̻u��Y|#W%��\&��E��.�'j�u�"_�W+n@e�O�R�N���^0��ٮ
����V�-�χ�Q�B©�v���<����hQ<�B�wM����Z���l���F��t�������皎����؝[����QOp��1�:5Q�%�"ėF�n���A�=�׈��O�3jt�˛r�����w�G?��6w�����:Iy����L_˲i��.�)�Ա�f�j�_y0��*�Vj&a(*�[�ç����Z��G������}��3�		F���ͪ����~��7Ml}9<88��c(      x   G   x�34��4�0�tv"&at���FBI�����������/���1qpZ�Z�q��qqq X"�      z      x������ � �      |   U  x����N�@���}��?�}O&z�R�&�
��ۻ����r��o�of1�$�9��k���C���m��n_=�}��QH����]A2�Q�Ŧ請~����}���]u	�3���G�Y��bF	#��ހ4�5����z&I��L3L�1 y�,A���c$�D��̐C㖈8�h5�O�b�a��F���Z��r!6,5�q�>r���ku�L'���%�_� �s�L��%����5D]n�)���e�(�x�V+�n�I6#�l:�&��r�I�#z�utc�R���A�ɔ"C2'ǳ�X���D��1|%�4�Dj.n4E�!�]ֳ��Ɓ�      ~      x������ � �      �   
  x�uпj�0��Y~�#K�D�Ig���K�Э� ��Q�H�Ny��4)i@��#�})B��6�1����	R>^iڅ�����%��0A��j)���S/�T���^�7T;�z���Y܆N�t�l=:�?�fs�Ǭ�rg�P��J�����ہ�<��W�.� `��Ү����HoKF��]"o�t��ʓz�M�Kz��(k�{�����8��� r~ ����J �Xn�4q}�x��"3ӱ����=�M�E���I��.��v<�[      �      x��Zis�X����L�LǼ��|��/�Yfߗ��		H $��1��]��f1�5UF�,��7��r/CZ�qm�l3{��������5�}�������r����b1v��h ���	^z�LJD��6Y�����ٝ`}|�W��p1_��U����s2=��[�͞���&��Nօ����\�f�-ɠ���.��J�4� $ Q�)�3"	B���F��Ęk͉a���Ç�d1]|��ߐ�7�VLO75�U�>�̺~yn���=l���+p�����^��d�����S�7�����3�kl��ִ��Y�V��2Vvx0���d��^ ����G"���r�.T��Ii~����U'��׃�_sĿ0��ZF�Y���A���[S�2#��&S&Y�^n�*�bVڳh����ٳ���fY6�bU���k���x�?aB2�0#T=���8��GF/�(���G"p�PDĥ"~�g������ni�ށ7������J�-[�!�����W��=l�duH����.�@7�_1�R$�F	��|!@�Xr@���Q&�5���5>��g3ټ��٥����z�$�u/g�W�RȬժ�6p�l0θ�i0MWܕ���ʄ2�ꍋ/�Q�OH��=�ト�+|���>a;�;�)��E���*v����|�j�u�,��1�Z�#@���ϛ��i�uq�w��?� ���b#�P]��H�t��<Ղ�Hq�� 0$��37ܹ���||Ge��/�t�[+p�x�[�K\B�@_�y��C`���IV��5�lY%y#�zN�x6O:�
(�ʅU��щ)"����8$:g��H��ĒHv�(!��kp��=t+�6��^���t�m�[QK������J�A.���1?W�6f��]t�KԑZKD�>�aq��o����	]�5<Ŵ���p;�K�Y�m��V;�nɡo��z���-�6!6��rbfW���B�c��+��/Hed��<y�+����T��J�� ��W�_�{�Z��5�V;�X���v+�NS�Tf;��Y��,���h��;�rWV�үGd�aD�Jz_!��#]�/W^�@�-v�+�B'�[j�g~�B�.���v��{���L�N�,R��S�MCϼQT�s��K��L2��kC�3�m����U��Gg�f���GU����mn(����@n(��x�^-��AR���~�q_7��2����]�r�9�Zڞ]����W��s��\�F��!�T� 3����P`.���x�����r���f���7�YG��ެ��F��̥��mTi&E
�ye �sT�>:u������ܢ;(ހ×���[pۨ4��d6]�T3;MNz�|u<��A�%�³����Ye���h1F��� U%�N��.w�^%��?}p'PI�ʅO����W���N/j�|�^-�k���������N4H���Y-ſ3�z�	yݖ�߬N1PL�c*��c�|�&�ׁNz��[���k��e�l�%��F�_&�j-��6�L�O���2�����O��U�u����w�_��P'Kv���w~��k�g���.�;8�9YJ�i5��$����cQ��q�h�&�|;��=��R��2~ug|��P%ҹ*T�u�}ġ�\���"����C��w� ��U���T���dmcofS��`��y~�[v��,hm6��b�/�l.��4>�>���vRg��tx��c&<��3R���Y�� ���g�°��2S������wc{ٝ���W�f����6��>sD��*J(����*�S���9�_��{-��k�IQ1T�	\�������;6v�P랜�F�h�Q��k��?Ͼý��_zQ�5����zvV�W��=���c\�g)��l�h�\�]=���uo�J�^'^Q5�*�G�O��`��A�;}%�2��	'q���&Z���ux��������B]��⯁�ƆP�T�R��D�n���C�TK��)�������]#���y���7���S4�X�O�������	Ð*��ǵ��O�!Q	t�X��j��U� })}"n�T�����视b���+L�pZm7�\̟��d!�\�z'�w���(�އbH �`s T�-9F7��S��H�?�.�S���z4�^�)_�H�?�:�RR�Ht�Uƈ�Ĉ�'�3��q� g� ��+X12������N�8�g2�ɏ 5��(}��*:H<w�@�&T>�X���EXϱj�ݨ;-Ն�M����z�������,s���Ξ�S�F����#A�.fT\<���A�5���˴3����}�����3�+���;�L�
-��-T|���:�Sf��:�����/5�-���U�7ו�U��n�Z5g�(%�}����UzF% ��p	�����b��W/��xկ�G�wJg��+ErV�����Mv?�۲_[����?!������"�ߥ�l���J2��$!����V��cG3��^��o�|�0��q*e�; �#��GHс/&�9�y�m��N�#�I�J�F8[;t\��͂@�V��U��l��w��R���3�<p���]=09=�!��$�?(���];���y���T��O�� ��C�d�Hc�1|�)�tYQ�S�/�2[<��L�Zm{�3�`�n2��8ȉ��H�8,?�g�T���#ѽ\ä��`!O�*:�.\^�2�Z�n��������?r��pۿ���Y�M�� �Q���I��:���)c��Ӓ{�.���vH����Qyy�Ƽ�hp�k�康{������D�I���"�o�I�(��Bն���JE<��R�����#�{�!U�(��/��Y+��t&��X�V���&g�[�����'�~�#��� RKZsCŠe����ue/ح]�Kb�G���s�(��9����i�k2��dx.��-�����j���Ƽ�P+�$Cq��a�A�I�
W�}$z7���ݣ�T��IQ�os�����ug��ٮ=EK4v�����%��F���W�ǚL��0�U�J�o*�����R�S����!�B�AL�]�W�S�2������Xo�����]f6m����
fHu��"�WW��?�Q��}K1{<���H��ٕaw�i�#6鿂�D͓�o�^�����>���oW7�90��dR�H~�rSlF0=m>�@P�;����S�i��¶���mW�lX�H@�2*iL�׃˻!%���ػ0q,���"�&�6���3�90J���Z���qz<��Y�7N�>p�ew���t�:[�q�0��BH��*� ,n��R�D7wD�^UW���xS�����\�Czw��P	&T���3RŞ�观���T�1�ox�®����@�K���[��F#�R�a�����U	H����g�X��$<$C������z��j�'�8_�~�xɦxj]qrW���o�y��i����"���3�Q壑�=!�U+ 0ƪ�y��h{yZ�"C�ǟu��Uฮ��N`���FP}4�KI)T;%�~�V�g�O��l��k66먟�^��.Z�����{�+rL��U7���m�$Z��Y��VP��$�(�(p������P�f�ִ���5o���������������:O����*�n3nt��U�S��N��h�	�
T�9~$zv	��q�x��T�G��X�P-��y�\�n���b4{�g�W�>$�{Qt�P��r�a������	v�F.���f�f�����m��R㕜��cX5_?� ��|�A`�6�������h��Gр�����i�� �v��Ee�@�S�R�i��5@a=��^��4�+���.��� ��}c�ڼ;?�
qL*�Sɩ<����7F�tt�I�QՍ��}9=_b���*��g���,2�1+��m�JIv�h^��07pIv�_��lg>�K)Q��j�$VI�\�������FN�d3
��w?p���l���ﻶc=��m ~�� ]�7y z��/  W*�a��i��
A���L��P���;eJ<�A��k��� �  �'�T��))b8�y%�
�\W
#sdYlH�7g���314�$��k;�Δ��������J��i�R���\��S���>f��ƠՋ�}�ҡH�0�i-�y����8�l�B�&e���*���-�VUkJt(o�G��sG�3���o��e�'��GH��&�m��t�|uކ5<�G��n-(���b�������:H���&��D*�i?&:�J����c��	�I�o��+����I�yQ������P�p璭#�lƪ1tXy#�b'� �l��8�~cP��-�61�H�ѪD�!�o!���d2s��������� g.�^�o�>��2�u7��3��ġ�=����̍�!��'���@���N;_�>v:(�W���x�`�,Ɓ�y�|��8���N�pX'n�}.�9�|:ys�!���%,{m��tյ[��b�]b�H��.=qۜ��8�)�pJ{$�w�����]ӑ��!$U��C��A%����#�x8�I��3�N>�݅i���߆D9�cS1��h=��b�;�ߪ�Ryڧ]=�q����:K��U=ڄv� H�&��j���TYA"�>�4�+EzV<��8)�ǟ�<=:��q�a��o���▁9z��ª=#00�>UF
¹���Ɲ�.L�"q�Y��Q�t,��]g�{�0��j�A�� ��[�DA*y�x����fX%pA	zjUR���*��*�H0�t�Qb �����G�,���(Y��Ćw���TC��T��0��b��m���Fdc#Т�RO���e�-�7��P.۸k�O��d�n���A�FK8�V�.�4�� ��M���&�Ҹ	
Ŭ2�`\p�ëh$�St�N��N�t�'��������܂J �G�/�!�.	�	nbb3a0"�!Uf2&T�7��:T���*�K��_�h}j�      �   {   x�M��
�0�g�I��A��36d�5�JR�J5��ExP@���.����a5l��a@㤟��� u�i D���n��M|�G| ��G���SZKH�����q�^F�����oQ1� ��/�      �      x������ � �      �   �  x���Qo� ǟ/�"O}Z,���-�4i�&E���/4��-̸M�i�}����Z�k�d���ο��f��Ej�I��N§;edL~h�m��;��@�p�J([ .�����X�q��y��뭛����[w�ם�o!1�Dp\��Ϊ�m��!EH���׆B�c�O�����'lcn][E���"�3��W�Ł���
E�DLRv@@����' ��/��*���h�hk��E0��C��%��������H�~���E��@�D�)ʠ�)8y�p�ލt�O���I���#/��a�k3 Ґ�0go�ƒ~��/7�?�F���/�Z�m�TyQQ�� \L�Z.K��ՙ���v���.�<���f�+gg�l���$�Y��8z�֞�62��EYb!J*����r[_Z{���K���c��י�������{�l�paV�<#��N!.((�u�N�U��4��fF?��6QE�x�}�^d���7$Ə�      �     x���Ko1�s�)|�b�����ހK�� �mYP m��H��g6�`�ˬV���4��?^���_�����n?|��>X=�>��w���@j�Z�&�ߟowc8ݍw7����m8������x���_o�6��%l�cfy�1�(�Q|&��d�����py��|y����^}ԤFJ���+  e�Ǎ8V�=�y�R�gz��@�����ϭ�JK����cII%���ZJQ�;�:�T�!ϫQ��D���G��sI�$8*wkJ��@���ڸX��J�<�xD�����Q@�<6%Zsw�+g�+�������02kg�r��
i�kbh�c�}����xҔS����zz&�1�Pb�.Eɕ2&UpKe�;*���J
X��W�M���t�I�dIlB�W
��˳�q�9޼zj j�����jY�+V��l��V�Д�Y�y�-�
�N1�i9^��o·�!t~�	$�2���X�'XK)kV�T(@{�C��=�"(�R�m��հw7[�|0�|�1�x�S ��u:~I��=1s�U�E8b��k&���W:�k��)ڬ�pO�pW5/�YcM�퉢�]+.�K,���'�xA�^�D�ݓWG��n'�j���:�6�N�s���	�#.�q�	zܗi�D4���-�x��}tε�]K�k8��[�\q)n��ʽ�V��-/��	/v	�+��[͐˒n��3u'ހ�y��p�	��ýW����=g�v`;ܛp�.H�Bf­ۥ�ܕpE��qw9�?�LO}�]�}����7?���      �   �  x���n�6Ư�� z1tX��DQ�	�t]Ӧ̀�-
���,��cC��k���$;���i��ڀ:EӸ���9��Ρ1�$Q���
�}��+�$$�&/0E�g4�"�Sg4<�4�&�,�}P�2��mz?�f!�b�Mb	#L2̲�n��s}X��� ����� 
�H��I���<^�y�8��8�P�PW���~@`S�֗�XgrB�!b�X�E�-��Ww�|��KA�M.#���������/�p{��1HuV����������Um�Y�!��8u�6�m[l��hgE�o�V~16j�u��z
���,�� ��BE��L*bj��wy�����(ɨ�o�c�3W�7و�P>qĤ"f��H4��V�41諾:�{*��Bh!;$�UQ���˳�I�BpE�XD�)F�.C"�x��F�,�̧Bt��g��B����:����y�w��)f���P���~�<F�� �X�
����;��`Q�A��F�U�>.�	����T�T���Ļ N��B�b��$���!/�eCE&y���I3�
�zdVJ�~ ��ԧA2>��v�0��Ͱ�|Z�(kO�zb���{h�����\�Hd
7�n̼a)#�$zByt��,���-���#$@[�݉<���?"�!�?����d!�)$��N�vӨ�Tu%ؒg�B
��"���2�
6��� dd�1�-C�u���v���=��/��� :�����c<RG��Q�nOT�=�h�í]\T��g�f��\�!�&�S�'"���!��Sq�r��a���a���B��9�G�:�4��fw=cB���}�Ýu^tr|y����Q	w��P��E�C�.L�(��{)s���8Z�r�{uf����S�Ե���g��?�Mfc�$J!Ь��V��h�J���-Z7j�;T2�
FJ�)vm��W���ƭ�ڭ�D9-w�w��Rb׻)`m��HȌ�R�P�e�,6J#�9���z�0�Ic��8���ǽ|11Й� |�[�7�C�qR���[����U�e�B;5ŵ���*ut���ݐ�m2m�FX$t�u��I��j;pO$6B�bV��dP�'�Yͱ�� Oꧩ����������hl/�$t�� �m��|b;_-�D��(.[&=��>���� ����n;1CoQ���u��׫��
y^�w/��5r.��кsp!X�nr٠ۺkv��y?�г�����nF�\��&t�w9���Xʦ�Ǫe�^�[�de�~x=�T�N��a����VuŸմ��K�)���''�ۺ/sT��������bV��IP�
\3G�,�F6�&zѠ��ץ�x����^�媆�T;�b!��z�P���������H�R��O�'�L��:}������?̽h~��c�LR�'��j#���Z��T�V���띤{��X��<��W����a�m�A��3AO�x��O�m��zלL�8@�O̙�|��kB��԰���8B���G��5r���]��{0��{��l�m�-��0�~=�QL�B��1շ`Ї��&z.��
h�O'���Z�n1P��ZQ@p�=�a��G��E}�|׃��#Ab:�N�*�^��O��F��_./��@����������lӱ@      �   P  x���]o� ��O~�K,�8�k�,��tռl��bpB���մ�>���J��I6�s �ׯ�$�si��BI�t�.ꍮ$PL�!#!�&Q2�i@�	y��I�ߞp}	���Mc8\TBq�}=�Y)���J�z�J���V
8��RB��}0��1����b�7��w�(���C:?�8HG��7ρ���}�VȺ��p)���@�o��'WW�߇Pn]�r�!S[_"��"W�{��Y;�'1\�J�{n��f��2W���� L����m�hv+M�"B&4��I�2F�S�/�g����K��>ba��g�q:=��!E�3��[�-�-h����iwm�=�:!�i��;�7J��vϛ�q|���m3D�����YwE"� 9��h۝�����;�uK�P�����wЗ�*YB�N���U%��"�a!�+ÝY^�;�����1ldY�^�:���$�x̞��	�J�̦�#1#��Uw%;
=�H������"��������#���
s٠^��Z�b�+��߸Q�j�{��U�h%n�����*u���@��d<v7N��G�^��^�)��u��3���_ �c�      �   p   x�E��
�0��s�.M�5�ջ>�.�hD�)��a����r��9;�S��ٜ��w��(\���ݶ�ݑ$�DܨJ\E��Q52f��T�X�%SN�l���{Р�L p �+�      �   6  x�Ŗ���@�k�)�+ ������E�HH�E��Dc�Ml.�-�9H� ��N<o��:g;�
����Z�v�7��������������=L#�Ŷ̋��n6w�iU�����ϯ�N+��;�R��8�U�����P���l�K�x3�� ���F�?,��b��1ec�c�3%���ڊӑ��˛�r�z2��X���y�sX��@����z]o����^��*tQl��� ��Q��Onkؤ9Q�eq���qAU\��+&�lpб��e#h�f�ZC}]��玤v qz���0�"��2��e�t��OB�ɇ����O��c���Un�'{l�*�ҖN\V����h`<����١N�'W.��lT����$����T�)XKǇ�s�93ބ���n��4��OSs\(�!Z86�Y?p��L2I�+��9�ǆF��.�66p����'���:2_�ˏ!��x*4�)��-JEw���i+z@�hFe���s63�Li�z�3�m����τf4)a��2�]���=!����p���o�C�S:n��>u�;2�� س]l      �   �   x���1�@����)� ���.���L����F�pcMɼ|yS�D1�d}�{gO�!NĐ9���e�L����1?���b����_�b^Q�\/�-G-�Z��rI�e-�i9mW���n��C?���$      �      x������ � �      �      x����n�H�(���)�s�3�D��(��Loe93+��a�DJb�"U$eYyp�~��;��s�����y��Q���<�|KE��y��Ͻ3�,["��X���ų;㰈�(�������ؙN�wr9γXؾ�,rq&��G��粚2�I%�d6�KgyV�Ӆ��}q)�8����Ʈ̤������&�x��7�xPy�JC��y�c�0®q6�۷��e��_���8�H"�'��LS)�*/��X��@�#!�H��h\	y9���2�E���e2��<���\����HLdUA�T�����m[�@'i��a�K�[��BN��荓8���Y�j,���忖��g�q\��F��DՔV�:n�_­�)\�-1�U\�_{4++ޕ�0�J��Ⲃ�Ͳ��ۊ<M�B*�y!ax5J�$�J='���Z�Cqr��ᓃ=��F��D`�N��q�c�O�I[n  @�lRr�T�׿�q=�E���ޮ��o�H��|&cY�b�X ��K.e�C���RNb1����Y	[����_[|��u�m���C�g�:��T$��dXȬ��)�u)^�3�M�v�:�o�|_��{#�Mq�u/�ֹ�;+E��j�GqZ��-��&G�<Ks�� ������J܇��y���@��?�;��4B�� ���&`p�{	��6�N�@����@p
�8�aSj���9҈2�`<�aE�@_\�%�-ޏ� �cy[��n��Eck�3��9���]��]�@5M�*�{�Ѥ�9�Y��t�>T�\,bY�K�Ra�O�r�i}�bOA^���(��x|'0�;	 ߗ%����:k���8�h^�YJ�S�7��Μ؏+~GK�6��".��p������sh^�8�ꕢ}���]��o�-�F��.�RY�'�Nm`B؋l��O8V�|+-�d����y渌�!���N�Z��PO�6��4EP�;�gt���!z$46A�
�p;+��b�2>��(�)ɒI�5qv� �D���L AW+
���Y�V&��pMJ́�# �e�G������-�FcOB��,�L+,v k�ذ�)6X�xLĸ�s�?|���|Q�2��Sh���a��@��p�qm�#�V� ~�����|q3a r#��f��4|�������},ng�KR��~~/��y<7z�dilX�c9�i;���l���k�ݎ����_���Mr����v�r}˶�0脦�q\�w���e:j=r�]������M���x�ߌ}�������3�̥���)q-̈́�i�& ��H֨of̣����Sġ����%����yݮq|	��Av���i�in�������g����03q*�U>��'�G�a xIǴ��:�'H�M��|���LU/I���Uo,�p���X(�\�����û&����=��{.�9s|���"������6�8��]��w^�'k7�W���r�<�B@���v��N;p���Y�"�r�ۡw�__\���۞�tlӳϿ����׋�������ð� ꭛�NC���l��7m�����cv�_>UW�����:x��*��n��v:����_��x8�����Ny{����������~��C��{�2�����Ԍ«�W�c�&P���`
�&0� ��82+Ғ��L	.���9 5	DMDM P�R�Q��JOG�4���6
C����������Id>���٬:$��P��%�^�!v
�O��8)S�X�g}������� <�DJc���"�~v�i�HY�u�v�q��{)0\���h���\�c`%��|�Fފp'xn+������z|�4�muq�SnD��}�P�ZH�	%�D7� z��r�e��)��?�Sa��q |d#`��	�a�kHW�iS+�-��T�W�W��L�q�����!Lm�>.ļ9��xܼ1�mTc�V4m���j�4(���x!n�h�~��-bX�	4�}�c�'$�Q[n4P�.�
� 5Ij���!ў&1��i�3OILPc�ڟ3���^n>���|���l�8ܑ��V�	�������x}hh	�
��Vg�r�|��&�c%�z%�z>ܜ�mZ��[$�h��'���b7��ە!4�����K ҳk��-��5��%�i>_�I*��g}�n$YZ&0D@ �RJD�F�=�Ue�J�1���Y�,��(�R7��E��ǀ�|��h��#�[�����n11����-�!�SZWR��X�H^菴�<��ų��^���m��m��.P�N��^h�%�b�\#j �����]��i�E���O�"��l��7�mo�����|���'�d|��aC&g~*�_}�a����w��mx7��Nuv���y��$�5�p�& �I���se��0� �|�L��Mu�L:�f;nN
M��&����٧-4wr_ԭa;��y$3�HIٗ2�O�����14��1!����ԇ���텾m���6��pE^��R
����Ǳ�D0�p�� �叅���;��������ST��cR�j�����kɏ|�>g�i<H�	kz�?g�`�LN����Ub��S���RAlkz�:�R��|�m��2M��-��͢����0����\l�`{����|+�ŭ!���,��>�����V&�[��q��"���HӸzIG[}X}����ݎ�m�w��V�&�V,�
+ӵ�{;��[�����c��I&^������#�>��G[n�˿���(��4z%����x���}���z��"�՘��r/P����=�qd�b�#�j����{ĝ��\+Ԕ�l���O�RJ�|g�hP��P֪�6|i�#�.�吢�'���J$Ŀ�P�;�J���0(h����e4�rɭ�� e�0C5%�;u��f��%���]�൲���-`�m�}A���\�w�ڴ8��&N)�*�����/����H�	mZ$�<R΀�+he�w=�ư�-J/Ⱥ=Z�/�x�-ݬ�M�kv�6g�UҬ�CR)���9d=-���af�l��r����A&��m�h>+�c+�B��zE9���D�D��0@�@�	�0^h+����&��##�zé�Pӆ���1��#�s/�t��.ʳ?�Έq^��uh�Q�o|?��YAzLl�L�o+�� a�^��K
�*%��r��N��%�j{cW��	�������b<Im 9J�tX$q��yu����!�3X�Xm�j�:�3zE*�h퍁�U	������2�j۔%ؿ,- �d5h�+	(�LMd�	lR�
 ΁�_�q�F�2M�m�߶�v���v��41���4�~�{N ?2r������lf\ꆁ��N\U�ᮨe��rn]���}�냖���Xq�o.h���ъv��K�[�B'���!0Z�	<��,������qM�y��M�Zd�� ��x�h�i ��&�ʪ��oJ�8���D�	���Lo���]��Ӓ��W2�Q�	`����eIಀ�{���-`~�g�b�|���H�����8e��`&5�8D���۫�!%��;�U!������w%�Ro�9rg��8#L�5����>p�����>�k��,ed���v28 �w��f
»m��������N$����h�G$�d�4>�d�\���m
hU	)�(�Rn�YR��I�]�y����RQ��$���a|{��Y�
86*��?�KȪ_[}jmuj�v�mm;���i��߱���~B��yC@߳lic%So�-�h>�}(�.���S�}�ש�z'x��C7���^�7C�cۡۉ�q��kO�u *iWL���L��kI�F_
�"[�0h��ҥA�Q�g������VXa8�� �v�/>n �+9I���۸���J�~��L��Uq��H��aж���8�?�q���|����ؽ�$Vʷu�n�<�DNLK�ζn�a��VMN~3��\?�:alFN�2��L:��tl�}i�{�l ̂V��Ͱ8�5)iM�O
��06�    p�lfWq��oA8 ф��_���� bA7�Yd�Z�� ������\/M�S���@�u=�	|hQ��Vh�H�4�>lDC�+��i!�� ���$� ؉��Ч� ���e���A�8%ʦ�̑nLc ң[��Kb���g���@d���r��G࢘A��\�$f�C�\NP#]�)q��8.Xh�X�A�2�Ӑ��qJ�5Lw�������-�۱��ɉu�#/'�n�Y
��`�M:˫>�xP�(%#>�Y���4*8e�N�m��8^J2���"՘�A8M�Q�fз����U@��P�&�f����m�/A�/H*�K�.sA���D��e��$�*^1�i�I-6�Y�R�� �^�"�F�y����"&Y����yY`�S� ��x:xL�x�p��� Vk�Z�!�$C�"��8�0�z
1�9r��8��kD�T����>T�O�!HO@ʁ%�7��A�/q�)0yY�|xT�� ΦR-3��U�-�O�?�ߜXv:rs  _ί�����~h�6�`K��,P�i��Ç��$PPs{ė�O~?-�����2t�J�����}��|��㑬�Z c|�k�&8疞\�C��f ��5�r�@br7Q�*���W�]u/��,��(?�i|��������D��b�:�J��v,l<��=<�l'NQ��t��M�9�7��<C�V�h���Yp������(�xVC\ܙ��YU6��(-���G�Z�D�{A��\N�4(�� �󔲸k��]��{��]��T���p�P��6�Y)^�l�醸�� �a;�<C��V���#�%D��<��c8D�w����P�D5�&B��-�P3H���z�Ķ�������!(���k@�*�bT�d��&t��YpZ�u����d�ϵ��������&�G����0=$C��쐜��l��#ܭ�UK�����P���4	`�j W�z�6�H�ʥ�$)�\gUO�DO��e�	i��cuǃ� ������'�#�PM����6����ÅcX�UO�]k?x{���p	���CJ�5�c��@���K�V8���1 �Y0 �TMS�f�ڣ�H?�@�����~�q/<ώ�[�����(]`=3�q�*�x�RH���Ri�^��d�>ǌٌ04�7�n(�Q�V㭄�g�{�����*�?�D���@��Ë+V66���D,H�(I�'�1b�$�E�_��墜��%g�"��8W�s��)p*�Y)1��a���	����� �A2/PΦx>虌��p,K�V{m�[T	����w�Ď�[��O`��x�
��#ԒĬ{޹<�=T�]�V���#gY`8�-4/��XM5M;�#�c������4���@Fg�->g�ﯯvNE�������6J�̵d
h��*l�c�����ƌr�L6)���ze�I�zW�l5� �N2�b�:n�cG�����P��KH�ѩ�N~C����r{��v����ۚC[ߠ��n��M1쀢�p�{�)���˫��ѻ8�>?��^Ѧ��
q�e)a(QD���16a�f4MR� @\�&L�ز�*�H�I6$�����8���;���� �}C�2�8���,*�y s:�� ������}�X�\o7��*r�_�(MF���'q}tʥ�F=O�;\�OQ���Q#dm���� �K�H��vf�\�(��B�L3p.9�ESUÀ�$� ������X ��N�O.�aw��zǴ\L�~V�gZe!ɼ�m��JI4��,�}��]̶#�(���2@����I�#�����T:�{�FO �5��ކ~���^Ƿ��vE��D��XN~�2C���ݽ���ɩ�b�����A����;'��>�Ї���?<���'��}�K����O6�@ã��U���|��G�X���z��]��D_�̦��X�"��"x,�Y�gW��"7��89
8����#c����vg�[�''Sl$�����w��$̽��|�����8A$��ì�bo6>箻&�]�ԉ߀٦8�ۅ�4Μ`���ƹ�8�l��JÛ�|LQ| �Q�t�̝g�|"+�<*�<�'r9�)�B��B�+�o���U�3�4��)�0 ]�"�݌?`':Å:�x��	(B�g�f�{�MH�0 i[
��P�\P���!�@��IO[!�%��"'�M�:���)�" �f�^-�?Px`RՖ��Ӧܥ��<ϣZ�3I
�>���0rk����f��/I�\0����~�v�5e��
Y#�Wܞ��+V�F��� R|��0l��g�R�9c�e}�����ä�3�l�:䝑� ��KE0;A����Ț F��:��#��WHHIM�bkk�J�U��!-E.?�8sQ>CQQ{a�1���ހ:�J�"i���G
��tF���l�l��؉H�BM?yw4�4[���"$'����v�� T��+��,���ѐ�'Kmq���QF\^C��GTH�~��IC<(��KJ�H��#�E)&�3D�!���)?�Y|�۶ ���
�8�(j��FԊr�4!��΢\;+��(v�EN�e�޵�2l��md�0�|�3ȉj�-F�ȣ&�RT��b�Nط�.K��Vp[�3��P��p��Ϭ#��v�<bK����,V�?�m����Ń��: ���0�c�C�`��x%��� 80Qk����É0 	ؗ[`A_!�N�!}(���0jA�B>��mo����R��@¾KP	T�G��>�c F��(�a��H��H����}��h��"7P4�e���8��2P�iR�T�����!�D��A�h,�t�*�S� �=�r8�W�WA�ƣhƴ�e�< =Z�T���1Q|2���,`�����[5fK�K�}�ΐ+�� �d�$u)	���/���[�z����0����$�hYIT���l��!�?%�z͇���cH�"夽�v�ݠ�yv7t���5s6��$�fE=I{^ǵ\+�Cdþ;>	���!���'#���nׅ�/����,�Ӯo���g=�k_X�t#�?�=���l��9�6��H���DS�;�h���Ĭ�yL�L'&m��`��g9��<^�n
9�'�`�����=(���q���ɸ�b�C/T4N4+W� À�^����w��0N�y���� Α�F̥Ws36�B�����e�P�Q+~��<]`�$8��E�� d4�������Ƹn\:^�ٮo��7�p�z�i@*<J���9 ���+�K�x�t7��c��	r��*p��j��&s�J�r���W�����𛛩+*��J����0v���HAO(�k��=� ^1������ԛ�W���1���0�W�Y>�l;���m+h[���˃~��.Z:���� |[���迪�̚zgW���F�ԧ�҆8[C�4|��kt�MԦ#kM���Eѹ|�T�M`��?�N��a,#�,�c��#hh<̄d_�<�Ic�M���	ꆂl,���o�a�clV��`�I[%��Ie�]ȨN a|D��0�tA�*��9~�% t�HC�rIa�
�(4����p{�L�Cb!^�OK����>-�	@'���Ħ��V `�$�|�T2@�C�����&�u�p<	+���Q-c\�L�5�ـ�5�.!m<6g(��ˠ1�i����/������x�����Y� �G��:j�I
0����s
ռK��&i K����Nu�\�P"��%�zJ�)Cr���+��([�rL�}�O�S��}}�8�)�W8������Z�J6��0x1��{�D$ڀ�Hm���^�b:����;䱗�vA�2�%��pZ�V���6��p�T:�TΑ̫,;�^t��s����pJ��[�U�[��Lk>��?���2��eEa�
����;rD�� c��L$�@ ,�˗7�G�ȕΏĎI9��)^:�q���+"A�u�HA�IM�iN��fR�R@�L���n�O�e��A��oý?@�$�q�飚�Cn:�b�����O�?ܒ�    !�����?Em9O���
�/`8Y6���j:�N2٠H�:[�F ����
��vW��vr�=[���$�H5ȣ[J6�Ҿ�����Z"C9�$�[���2N��Y�j�]��%N��wF��C#oJ9�G�����H�a�b����Z^�V�m���"������_��o��A��R�ʕ*��k��1�z���*���Ǜ8��������\H@]0�S�8��]HuF�曓���9�u��eJ*��Y��.��I�Q?N��ŴJ����(I����S1[�u7��Q:V�N8q��<��P*^4����2^Nb���DX�"�>�Tn�7򆨐��~~U��n�b��I��W�Ybj���^�W�4�5w�D���0��^1�~"JVy��8q��N(���^�LO��l�4��< o�~<��P/�j>dg�5�C�;�&�pj�Bo��/�%��ٳNF�$�5��P��o\cB�Gq��X���l��S�%�p��ޠ;,�L$3-����#�k��JuҖ��|f��#��X���o��*C���iu��ݶ�m�nw���6�)6��؍)��@�aY��H�C���iv{hzn��І�ݰ�Q�߀��^���cic��e���3=��a�����o�u�a�f5��0ɒrl���&�B��f`v0���lt&0z�Z���,bv�W�9��G�&�0��1�a,|ɜ�%e�%�n\���#�-�b��+i<ƴ��V`<�r)< ��`�"���W@ �cC��Q��S��3>��nǆ-����t���'�B��_�4th�Ɯd
?E����X�����A�5H�3I���+D�ːd�ge���vU@/Oj���'XR��Xh��E3F*@V�����U�ቜŢM�=R_���G�6W>���K��)�sT��e�8��¦J�"�i�8�q�iD�r�b��
�HFj��o����c)��n!U�A�!����H�b�ʟl�k&Ql�<i�hh��?t-yl99�e5T�V���|E�Rϒ �.h�2�Mc��X���@�2F�3�a�s�&a�S�w�3a$1�V�t	YC�"D�צ��p܆z���衳H|/�E��@T!.HB���=�����
"�<��q��)��D:V�������*a.ц��Y=�d���]� V.���x�j�&��ӟ��U{��|#�&��r��yL�F��&�F��ssOL:&�?)�j��0�1,��)uu��3=-gnP�l�k�1|˲}�8�P4�?��Q�g��c��������Y̒0NX�\��#w�s�.$�N�L���1�p���	-0�E��
�I����O�����+z����!��P��?��W����1�^�F�S�����`�k���IA�.�,�Y��㾿�H5�K�����0������%�e�_��]R~�zh�����3��Ql.�tF�{�'X́�}��i���S�?$�|܅k��%��鉥��1�� ��Z�1�
g��L�ې�Y��ɉ�{;��7`	�vid7m�Bc�i��Y�����fo(Ķ����Yn ��  �j|wr������]��oɀ��n��zn��Ģ��w"�1�� ��(ꚡoc�{Qǋ��K��۵�_���̦�����[�{B��N���G�I�}F���<�I.�(����.�^(��e�q���2\7p;!,,���Z�hg-eC���|���p�m����m�q�a#�EG�&2����i���H��[��φkq�0��߁�G�������	O��3x?�u�;�� b �t��nװ=����\���9Js CqW�膪���M�,�8��荭d
��#.�/���E�@J��p�-F-��h�/0��=�E}�ȧܯ�[J�8���ae Qi�6	���Ч�Ϫ�m�!L�rVp�]��:f�;��x7eT'��]7�7w���v�q�yp۳�݇���m�������vw��zO�n�O�{�����v�q���q?"9/��#gk�q- ���*3�]r6Ϟ�ZlP�?ٝ,[��$wu������5��� E(nN,��0��|Q�A(�g�	�t�.�=׃��!%����$lǘ�m���D��I%ރD�PC��*��G��E/J3��pط���Qˋ;�)�84a�ϵ���t6䒨�J�����`��N)/����Y�2Չ&���8V��k�	��)�_�D�P{�u?������N��'��z~�1\\]ɠ�t�BvDYf4%�����Ng��u���I�8bs�o���������|>oˉ���-
�+�Nv�/��vzק[S@�[������ޡ������kyf�Dm�v��`�_�xx�?!�駙����IV�G7s����I��Ò&�ycl�E��|��v�t?/pr�C�����t>�~���w�j�p�����va}�y?,7�C4'�`�6;z�ˏgՇ���~�� �����*<�%��w�����?߲p���<�Ҿ�����?h����[�yC��Rz��q�*�|�7�z&�i�-/�<,u;Qq������s�n�������շ3`���=F�!��A���~�*����*$��Աѭ�:��׶0'������r�q�wL��?��Gsɻ��V��}ˆ�������ن����n4|�!0��0�x����6,..�ɸ�l�����ه�Ch�s��~�u�>�0�Ϫ�q�w�ӳ/O�Uo���ѳ%@��;�!j��O���_���G�RRZ�C�,9����/{��e�ߺ���X��s�gdQ�OR�-�W)��J/W ��U�^��jr����>�Lp���g�9���Fl8#�4��6�z��B���^���Y&?�������\�?���=���ƨ���|�%0֍�&˅��	C��Ў�\=˴���CUI�K�s}5pD���P�u%LԕO1��l*J��!�GS��]�]h6�Q���ک=5ԸP���z8�H�0큠�=pG椺��N�Ҝ�2���89;W�"ove�l��/��������Yi����?���?�����+��t6�Wa�xk\{�s�=Zm��D�;4T�Y�P�.+ ��L0���QUNe������U�;�a�*�I)���� ��;�VɅ�H���Ψ�ԃu�B&.�8�m�q<k�WW.K�It��b��fJ�*UY{0�tb�v�!7�"��@�6����S�6��Э	��*�3Mc6�~:X���n{a��B'h����n��u1ڳ��t��}�}{p��6ٌF���ù�mرlۅ��gNҷ'������<d�$c���ss8 k�>M��&�?4��7-����9S���2�9��tP��&y������B�Fo�y��&#�`Y�tv?���9��܍ڜ��n�#@�"w���\�3�@�N��*+���9��Z.��ڟ�E)3zpj(w �sd�(�K�#J!��'�5��	%��<o~�9ۯ-�\�qѰUk�{�4�j��J��y�����V�`�I���y��dJ]vRG���2-�,PΞ�1�95)�3e+Ӆ�rh>N9]�ٟ�n�+���eo3JQ��ԓ��L6۶���%�
B�yi��エ��kv$ܯ���"�*�S����P���-���=�8���4���j��8��$�{Q�2թ���� "r��c��N2��L&u�8=�����[ҾWu���s���1�b��-�9����S�����,�)�EPX������.6V�JmyM���L��ä�_eƇ[�bPNu�fs����)k��㌼�9�:�C���h�����{R�!Z�w�]���K� �w��``��`�9}7������Ս�>H%�u����>b���������}�اֲ'��s�����^GF}7m7�~?�"���=u������u�Б������Ұ#w_֓c�,/X��?���0�� Ck`w������H������\9�] ���z2���G!h�Z�{�ж�5�</�zRʝG{Z#�\A���hr���Z�    ��d��F2�	:(gB�l����"��̭�A��}���.0^�	�2|Ab`��_K ,S5A��ڬ.�5m�kY�?� �_��?�|������'��l��N�Ov�QSduu�����i���l�
�{Me	[�3A&e�w���p�����W2���>C���ۦʏ��[@�1_ Ȼ��^۱����̩'w �I4B_�4-k���:�2�%�@\C��7�M��r�p�ؘQj�>�.3�^EL��p$��Gs��������2U
ĺI9V)P�!��.b�Y˞Q�OQ���ф}�U��	:�@���;�&�D��;�?��=���7bŘya�13ǰ�.�4����+ ����l��T�,����荏��Z8�V��=�!�mO�҆�׳�OIہ�]�Y[��ٮj�C��a�q���Vn�P\6�z��U:@���;^���g����#��B�b�����_�	�S�%W8,�΀.�<5x�#F��K�g�^���)���h�v;��@�Żx��)�+.��l2���^h9m���Y8�J¾TTB�o��Z���x_�@���7�U*�/�>�a/�1V�=�0l�Z�G���8�>M��ʑ�܎������pU��G�:5�%a���bKC�%�Џc����v��UF�ݣKU^��z���'��/�u��s-z��މy�n��z��6pL�Xb�F����/��>��WD<v\�o}^�M�\;�0U��=^K�P�4ECcGW��l���� ����ـ��f���@*���e�^<;�l^z�k�{
��(���@�!����{F���MAn�|��ep��.��k��ŵڎ��v�\��"�?��lAk��q\�ȌH,�NE�1D���ŀ��O�4�py�G0�G�����`T�>�bd��O�<~������x��D�9����m��	�Dp�X��6����<)�t�K��v�s�ՀV�$@�ntM�6��w����=[˸�g��y{�����;v���� 𮮿��V��ޛ��ƇÎ_�5go���>=�p^���;��r����{����M�����w=|����{__�`k�Tg�]n�Də�gͦ�g��� �TX��J�iEl�����_�G�Z�f2-M�bkf��F�#F�fQݛ�@����(*��ק�̯�E��mߜ'�01��D�<s ߁�� �I(�����Ro�HS�8��Sv=ϷY ?�F԰��1��%d�[�c,o% �;�h�Z�_b�
B�� #`���ʗ,s�iƌ�8ξ����$�VJ������ij(-=Ɩ8�X��4v����(����*�ؽ�	s�z=��CJUA��"D䭝�?��?�Z��F�L�����������G�Ϝ�9�Z9��>�� ��+|�T�QLs� ��k�j�� U9������i�G�R���Ѵ��_�) 數�>�h�j�J7��v�^JV��+����
x��'��`�1X���gy!����A��[�&l�[�j�@V �p��l�^;����s�bh���C���w��KA��vnJ�}��i26 �fX�6�q֐��݋��݋�]�6@�?{u��� ��&���AX�=o� J�|P�M@�H�����rl@�y[�sd�]"����Z�q��(�rv��x~S�c��HR!�p�,Ϫq�ײ/.�_��)�	�*���k��$��Z$�*��ji��Jl��H-��c�����J`BX���l�3�
CT)�(d��M�zG.�mq��t�Hh�b���X�G9ã����W:�u�|Lӈ����:l­�a*�f�k��:�uY5��F�"�MRl|�I���y!ɮT�ɕzNh.�4C���P=|r��� ��t�|��L��"���_��_H��QpA�R�1�e\)'�S6��z#$�2Zz9p6-NY
�)�O�{0���D�V�GR��l���r�]������2ů��&z�m��J����F̖c�cI�J'�&�k�`�2(<�i���V�e`6��`n�R�Ww7�L���I��?�fM6'*GNA|{ɵ��Go0���Ȯ�v�s�PڕxÊf�'*(��N��@�2^���n��Ec[MtvPwջ艻Db�x��_�ԣ�V��fDu�$N�;ϩ�n��L,sWg����\cZ߶Xӹ��x�1��z��Ugt@X�ju5%P��/���@����� h3�*�c*�?�P�T%�Qq����Tg��hE_/�A��V ���
^�\�����K�6K�1���H#<�>M�7���g�˨�0��E#k��m���	N1�=��x�mz��� �ٓ�m1HWR������ 4��1k�ؒs�`�/�����D�Rs��H�'*#�D��rn��(d{����"plქ`0V *�������sݵ0؟��cV��f��fd@P���T�A��Os�:�T���VTH��)� ����:E��m=�Zr�m/��Z��t_����Q����6��s���\��1�t��(�j�	|�sI����t��3j5o��p�0�Ֆ7	� �f�pRM��D���w.���2,�x����g\���y�꧸\�c�<��)q����0�Q�̘�x�S�����%/�r��W�y�XF��j�_�	�A�+�(��K��}[��3��W�f�6�U��$��Y�3��jy�m�F�e��b��x�����ћ�����T��U����6*�V��֍|�k� �e9]�Ǭ҇ձ>
�:jD��kç�K�Z�S�n����7.s�JQ��D�	:ʂ��Z�Z��"K2-yL^:%���Rf RUNS��L���c�+��oF��8-{�)�iD+@i�)��*�o��R>cpd�+Z��m�m�n{��	ub����Dc���K���� x�sl��t� �#����iX���{*@��(�ճ陰�p&gj�̉޼o:���4'��O���DR")o�]`͆tԡcD�m���mL4v-�1�������l4��dC��74N��:�����
����(�<L@� E�wL�˟3;lw�y�s�o~L�j��v���>:5`�2��c��v7S*���0�x�x��Z%z��kQ�r�W�����uo��I���9�MV}���
���� �>�|ږ��Jm�͋�����dfl��v�O���0�y��)C�3���x��&��C_{�Չ�ԃO��亖e/�����$�.m�[����ޜ��G��ʇb:jN\�m=`i&�*X�2s6/	|F\J��!��c�,k�r���醝��d6�k����y��)�c-1��~-����K�j�ж��So7yc�~�[�0�	#tm�g�*���&���G
ȹ(��g�s|���6X���ȌwcT.�J�ko��_Pdw�U\M[�;�?�טj�T&��4=|���M91�J���K�N/IaE�������F�	g(%%��Q>��x`��[����m��V�$�~�κ��j�v�/�_a�~�����q�8=���}�7�ń{'u����z?��q�5���E�t�]F+�JaS���v���m����%���T������)��U�XO���<w�:F���nO������9�>j�)=aK�o��:#�Έԣ÷s1�Mf��^L(9.%z���Su]~�r���ߡ���tF�� M(��s��:v��Sb:W]�~�. �������kPd>VL�C��p�Յ}�O��Q;#�}�U@���U���#���J�ܥ�;�x�����2.�p�����\�v_��@\a�w<3S0֦���-�rM۲B;����x�I�3���i<�o��}J�񵣽L<��������?�Z����25��ɮ/�nT0~�ho`�斁Fe�@��`w�:�#n(��QHAŐ��Kvr0�9Ȋ��C��G�c���{۷m8�*dP�o��u/�5(��˽���8 N|_?߷"�>�.�fX+��i�*38>��hH*f����[j�[�������m�Q�F�k�A#��^�M1��t\��A'4�w    S53y�&O��i�0M6M-�)^;o�^-�[v��7[���k}Wgu��!�窑��5�6�Q�*��r<\:�;�,��M0H�1�.`�/��56:��,� �P�5�G
��QĲ�+/�'Nыu��ʐW�ϫ2֫���c��2�R��)�	���H�R�xq�Y�z����A|������a��s�d���f~`��;�d`?�$�o����YF=�v�|�q��^�������V���a�츤X�G��kʢ���o���7�f���k7d�h<C���})[��'��D'�%+��;���LPX�	V�`�彯dy�%�L�9�1�,�֯1+�jM�*%�v
NP�T�C���@Q���c(��K�e�f��Ϸ�&�HYm�r��^�l��S�VD*LX���24���#EǱ.uv�C��ʔP���8]P��	�����/;q7S �*R5FsF���((�:�
���9��n����5"���#���G��]Ä:A��
_�	v;���vQ?H�`p�6��t׳,}7]�X���H}�r��t4��Γw�j%��e�gԴQ3�t>"f�G��-zEN�*W��8253�4��,9@��ʋ�6���p��N*�*1�E�8��J	�6I����X����W�h �@Yi=̹����ty��r�0.��������V�
����O4V�+cL�_p.,q��p��(�>W�%Æڌ�_���i��׵�tZă�������k���8?8��ƪp�4�E���'��0UZpU�տ��s������&�|�nq�&T@�.d�\�*,fha)�R	�2�@
K�Ze%�/V�-�1��!�5��*U�ꑋ4ͨg]|�a한�$&1��� �(���P�%(A�Q5b"v��#�:��H;����Y����{�E3m���+�Z�1�4�e`a�ܨ4�Yx��A���h��J�=����H��R�!k�����;��������3����ӓ�O�l����d紷͹���rBN2UQl�^�j�F�_�4���{�Bu!M*��R�_��UԥUy'�#���n�z�[[r��Lbʌ�^���wŞ����R7��[��Q2��ۖ���`�/K�ƲH7;d��L1�起*�<��>s��p����U�e�v-�<���a��*R�Jݩ�w�5T�;�+�a�}�,��i���3�m�U5r�i��G�]������U�'��u�@���3���=�/���P��{^װ-��N�v`�ö����<�r��dwT,7�e{b��}�7$p�+����qW{�k�1=Qwhb�y�*��.��3��ro�K�Ҩp���c�y���1y3��&X�0.��Pyt� l(�xJjF�D���X&�cu\�u�fU���ˣ���W}�ū��<��sr������\��7�����b��<;�;ƈC��A�o��b�=�s(gLre�;![�^^Ls*.t�x`��Tu8�%���Xo�[�u�4��£��^�0J�)ϑp��F�_%Hܮm\���b�e�vU&3=#�N*pT��"2��Z�1�ɠ�Λ�/��H��)��-+*�,��6@~�X�*l%�뵁�̟�Qu�T]���8���u�q0�� ���.\]�9�Is}�
oD�
� ����~>4`[_~x�z�o�<��z�.��3!�tMcsڀ\3b�5�CCO"�&�/FY1��D�&�~j��B,�Οkf���5�)B�7�3�؉����7�(�Z�t� ܱ����&S�鮼�g��gxo��/_����G�(z`l�������	[<fk�0ݻgm;n��b��o�5+%�� ��d
�2�][Q�S	��t.���� �gI���w��ە��ܒw������t����������O����@A�f��Ow�O��������|�
j�P)�n��T��G���:�o{+�m��&৯]ܢ��E%LxB���;�?�A��zp�بCz�����z	co�)�5�'�՞U�t:61>磘��e3 XyA���#N��c
����cnS�~�J�𻈩�<����kU=��R|0���l⮮�ҽ.;����p�8�\y����l����l3\?l���Ӎ7�+<��:��!q���n{�6�l��7�Tϼ�6
ּ�8�k���ʰ�w,��6�[a��V���V��Z9/i�/S����d�`�$X3kX��k�fKXCO��^
�6�.:����EXQZ��i�D9�`��Y�X��,Oc`V
���u��:Ç�Z���)��`;U�Ʒ���1Q��b�L�6�4H�����.O�VM��m���ý3�蔜I�u���v���"D�����o��?�N�S��l��d??�����#qT�;� OX���3��e��y�Y���!Ѣ
�V؈%����)RX)��QG����J��Î��]ϼT)$m����B`$(G��gf���� ��4s�e h
�����3�N|��RG��nd�j��A�� �bbб�+ ���YR/e:���gq�e�(�3��'�zF��t��C,�_�>셁�U�~��+��=j��TGA)d�@�z.��s��@4��&�jU�@�P�1UM+�y�Q�!6@����ᅕ:S��LR�Je��Z���u�S.G���52�aUi��H�L`]7U�/��)Us�E>�Z�v�f�N�aU�ؑ�W�y��u�f�#4�P�K��^���R�$���~ͮ��Ye���� 8Yه��r��c����51����ֱ����z)����� xa�PD���/��ЅGd{�oE[���{��گK(h*m�U�� mx]7�^�rԱ��Ƃ6�'�P���
���]h��KTɋ���P�憾m]]�^r�L���Oɩm��~��J�d�]��.�����{�)��7\�c��#έ9�-2���i�$���2(V��R�Y�uȱ����_\$�5�ȅI��R��+<4f��6���8�����_�,̑L�< ņ��4N�og��{L,��'l~;3��  ��3��?c�E.&X]�V�~/g "��` #�ה	���09Ϛ �I(�>�^�`��Ac�V�H�	L�K����_�*/��V��5�]|�>LW�0S���
�|�I�W#$<���<㺈)�3�r�fk�H���i�U!���Ze�۟����QV�����x#�DG$mQF�j��������F�K咼n���U�/yd��$;�PE�[Ng�M���n9�[l٢5R	��������Zr`��㙞v̾3��0Z�x�q���TyK��Y�
ꌺ�Eѕ�t�]Ur���R�����	��]�����_���a��	�r�Ǭڰ�ڟ�2��s�7v����_���y�Ḟ��uU�[[��q7�i�
s����s���j�����&�C��v�������Ȍ�a���N�wn��4�VWfb�2kW1��ܦ���{.Z�����9��,���1��Qw7E�>��9"ǯk�7N��E0󇺮�ғk��n�����	�]�?��U��lv�}^�����O�OT�v�u�f���t;�"�	�-�3��M�~ �zuLn2X�����Q)tF�:f���c3�5�qB�I�� ׀d��b��܊׻��?����Aa��iɤgQ�Yi�� "���X����Y�ۄ���%��M��W���a���=�y��	6�C��r��u�"�����Д�t��}�Œ��}����A��l2Y��a���K*��"���p>/7%��a1M	[H2�x��0Q�!�L���R�%K�s�j�PkS����fJ��7��1vR��[���*hF���U�I��H�¯�4@����Y(@n*���H�z�~��(v2Ԃ"��$b�N윟���GW��׷�_���]Bj]k������I���yM���2~j���?��O�|��-:�v��H��>�Щ�z@�)`��u>E�#��K�S#|��`�x}�So�c�goZsj8��@-�2�+��t�w9����n>�)v���C��0�Lϳc3���v��� �  ��(�7��J�Qv���fI���jN{U�2mJ����`�͉�cS�QMI{�����a��j:����z���1	%}~�M����;>89g���+Sq�^�wq�*{���]3[ʀ�-l,���n���"��-ǃ&�Sh��r}8d�ڇ6~��]��ϸ��t7��3� �x�T������8p�>Z�{7��*�R*�
R#Y�#(_&�k��\��_���T�}iP۪��h��0�$k�/�\/�Z���LR�9�!�%�$���R��Kn����X�{�8ɞT�۾��`�5C���$c�e����z����x��@°n��J��GeNx!vi!͒� )�rd��1��	�ha@�	��c�ްk����ls�m�v�4���O���hS0�      �   �  x���Mn�0���)��+b~�!/�f�]t���k���]�{)�vk5�	pAH߈���	Q%�ĉ�q��z��Z��*cR�M���!ʡ�������=_}�����͏�]��a��$�*�ί������Շw@J�@T�$ �
�6Ps� -&jslS�����5��� b��Z�TШ�xq�Pb#hMb����h#��/Nf��'�Q�t06#� @�>���j5߼�E�:.���4��t��.J��9f�Q��������1���s-h�40c}����v�;	I'!�����J�1ǜ��k�=h�\��] ��ذÔ�N�C�A�"VB�3[���Q�y�h8Ur�j���R�c)p�u|����d�usaT�`������T
[�hɦN{Rw��O�a����|�7�~��}��w�q�oz��r�JD��HcRt���2���w�x��){�s	����iK�R<�t^:�U�Ƣ�u:�y��f�m7��      �      x������ � �      �      x������ � �      �      x�Ľ��V�.���)�!��Nf`��,U���T��v�	H�$� ��L��@��b��=a"(�NǩSe'`c��׼�.GoҼ:$�~4~��OQ�/��?GŶ����9��z�v�C���t�>*��F���r�>��_�_��۱z�x��i���<�_��q%i^��qyN�r\�㪈��e\����swc|��\�"�w�<`��vqQ��qy���#�n��q9���8~���8���(ێ��&*�o��9�E��0���W�7�<����e�d����Iu�_��dS�s�eT%i<��e��`͇��'Ļ$���*>��"����O�=��X�>/.?aM��_x��2����|<'e�oO���'�7���|�ZN�~������~��G��o5�����/g��П-�Uߥ�<�F����M����J��OYt��y9�����U��ݸ�g�"9����q��Vx66�YC�W�Cr��x���q*��*]f0�d���2 �a�M��;||+Y�Y6���"o���b�%��eZ=�?�:�el���IIs7>��V�ǈ���w�^��-�����.)79��2K����&���`�����O��t)B�m��M�@���9�]���sZ��2�����e��uoz�A�w%Q+�1A��i\;��wݍ�H��E�՘�H)8�t�6bL�_��^q�0b��|B��� ����T������dK�:�۸�ZP�����mJʃ"\�����2N����t�����k{��>`K ��[�d��Aq8d�N���aѰE��p����l���&�`w��!.�
O�M�����3��I;�(���j���ƆfquȀ��s�V9�d��c\%�3���D�#~+�E��Vɧ$�7t_���uB~����s%�Z�U���T�9��&*�W7��/�d�%pM7���d���NE|L@B�Z.��	?�q�ZO?.዇_�HD�������:�����* �r͚7���ԭ��<1�_v�t|��
�v�t=EE�� ��J0eG�E�lI�A#�OqVѭ=��$(~���"sڒ�K��Q�����P��o��6�ꦗy�������#�`��i?j�Z[c���wL!��g�۩ȁB�ߕ<���+�G��1)���ViW��.�F��ڝ��k�h�M�"���J�e~w�K�ЩRڧ(��P�g8;��{ �@��"$�
z��-�(�U��+����0ܨ�C^䈣v�$�\q�:P�%����QR,�ͩr�QS�	e��
y�@?Dk`���{��d�k-�5�Md�/�w��w(���<��U��vr<��^+�������>%�&����6o��k`\����s\�L5��#ن_����v����4[(rh�ۍ�v���&2~=C$7�����-_�������*�f�y8O�����b1_yS���@�	���f: �c�r:z�+��¾K����1F?��x��M�Z�+��U�p�5S\��qy^;��k/�X�QQDD�d�y�L��)���3�-_�Sǌ�?þ��-@5ԃ�=H���I�����nAu>�'l
�-J'��;~i��ZM�������w�MJ܍r�&��N��5���'ʄ������0����բN4�Ҁ�Ճڕ/P���7PT��~�@V
���ĝ
=�ODd��@�<EF@R�H���)�w<�����#��n�|@Q�&N�)�q ��M8��V"W���x�<�w\�ĸo���۟h��� �v�\��y��C�~������0u2Dz:�(��9�gR�xf�SB�}��(`a;7(a��pFb� �kl k��T�^�$(}.2�PV>ǜ�GL�Z˳��:=�U�2��G����dpZK� (�x�Sd�9)ؼ����͗߃���x(�.�w,wup��u��4M�geî����7p=�E{OMA��}���u���s|C�v4��X�ʠGmH�D��L��e�b��C���c䂋 ��R��<����1)��Z��g0f�����/�jcٟz�M�3(Jf��������ϑ��
�H�f��L`	 �ީM2!BG��Bw�!�{��jڭn3?Xy�~!;�"��Ӊ�O�`��_z�Q����ԟ��.������=�աHҔ<��nBT��Op.ɩ����
墧(I�v�(k�C)+ 1���Q���'2�k�������F%��M �@p`�,��\~DwXX����x�X�5�c`�3��u��n���9�]Z�*��l�T�	��#�}���ǅ웜�
���LT��\�-��yqD�y�w���T����	��gP��������yЧ.��n�S<$j�6����h{V*(]�����$
=��	Yig�[zw���r+�JL�b��9sws�(�� �*'�R&�X���l���w�8|��|ÄYu �Հ��-G�C7�n ���H*H\�d��6�U	3ZxrQ�!��&h0q?E��m��@���:'�S,��#Ȓ[�"�f�w̓k���x&�p8�m��61��]�!�I�?~�Q�hq��m���%�/-i��[��w�3�aqz�9#�R$��
�3��1������|��G��(aa,Zw����@���[��4d	��yxĘ#Ps4/�e��M_�-A��34��d�ۥ<��QG0���-�YN2�~\]N1��U���0��H���DY�X_� c���E[8�,�J�粂��0��	Rs��p2h\�l�K��	j%'����BW�ʎ�02Ai�`A�L�DRrc�6Mv��[�W���a�P�O��Q��Iϳh��]承����t�� �=�n6?u�q��_�ϗ޼p.)�#��|:)����{��+�,��?���6y�ۑ�O^]��S�M6��s&`����y1���	2��㘪c�w��J�c��p���O���������%��⦡��{�u�F�E�6�Pz&�Q0��/F_
\�1Z0���VT�>�G{�P�Iv���u���� �ވ��q�v��8�tJU�,��8o�_$&W[��\	=U�#��f�z�+:�D���bn0��a�g��t�-��NyI6�쀼T��	9j�IyL���&� 6dUNp%��4�����UT�myt�<��g�~��)�0"������Op]ѱ��c�`�Gu�J
l�O�܅�$�V�7��G'���M����[a�����=\�E���2���	�'&S�q��D�������Xy�m�V+7��G��ji�)���\#�E\H {	�0�5|��(���iT�C}8������1�"�3�|J�=%��|%���ӄ���l�`e��
�}Ξ�$5���,Z���y���:����i���AzM�Q ��5��W���O>�?|;��4�Bx0ˇ(��˫s	�!gz�:��p8N^'�+���/x����+���SN&�7QJ��.z�0.��W3�a��2*�$���`�eąJ���*֤��g�$�ٳ���q#�*�3aE�2$~���$�򧈤��Y���}�8=>|��4Š����9���FcZ"�0�T�*M��3|�`��w�̌��Xqq>� ��3���� 6y���o����R�o8�(��ƃ:%y�H�$?�.��7��nrLHʃ5�H�'�(iR*�����Nƶ�b�5�S\�tg�]��Ds�9EI1M�ȱX�L0�Mv
�ȭ|�\���)�l>��&�@^}z���
����p�>�,���.Gէ�2��&����,_�s�K��_����z����/eg�����

�h���T�7"7]1��J� ��84V�k�Q��ہA7�1�T�Qq�4VAayNi/�R/�7/���)�P�]�',P���ؘP*�\�Vq�D,+X��	1J�kZb�4�9C;Cy&�x3����ʥ49M�t�I��@Z�U�^���5�I��,�aL���o8���x���eď�nZZ��
�*#,�DS��Äbqd�G��S�Ӝ�}�    ����;�H7�F��lEE�2�(,t?�)۞�=Ո��e�Zn�,$)Afr.l�a�;	Zp(?S�9�&Mw�T_�(!��8)��Pǭѳ�wRqO�fc�E�~6��'�y�W���9����������Ǜ��R��%*�X��]R=�����6K=��a�4\R:��]*%�u�q��[75��8�}#�P���bJ�����f2���Y;&��4&D��x{�T��e1\e�d���T>���9/Ǖ���e��6��g��G?�Np��'��}���I�4�+P�K�|���	�������$οNOr�9�Zj9��˨���Č>���
J�GPZ�����]���Z��)����db ���iaelw�̈\,��l�ղ��y$�@%�<�����7_LÕ�SK���p:[�/̓���������+7G��z�,c�~�ğ��p�\M��s0@F����C#�V�h)]�@ۑ�ӮK��Z֖�|aD��B	|�͝�V��h��ߏ�,�oǧ���l3K�a(z�Œ�����)��4�:m��+*^a���Yoo�ISo�@�*?M0�7���q��~��4�X�OW�(��P>�V��\1h�F�=����Ô��I�Tv}��c���b��wnE	?�0H�����]���S��S�hB�t�-"[���e�ԝ�,�ڒ�VR1i�_�y]��yJ>�%P���Cp76%�Y^��@� 2��n�>����x�S\wx��6R�f����M���q�M���$�Ɵ'�P ]^L���d>����[��z6������zݕ(���l�$��T��Z�pVY��T�#R�U:Q�_�&;x'qF���%�umi�9�\Lh��`���+a����!���T�K�\���3�W�y��Vk��ͧU�X�CO;gɿα�)�L�$�*�W����&*o��g �Pu�AS���d��6�6~<�ֳ%Ȱ����e4�EC�Il��h`׏_��a���d1B�f��D��j,ݙ#oXN�z7����j���
�S���w�Zw4e�H���4yJ�.�$Y�Y��Vs���%Y��}n�ێ��5��L+��-c]�Ow�����u�po��bA���n	�m������n�֫`��O�E�s)y5�,�xsx���BЯ��r��5�Y�P-�5��,�8��'�c}�i�I�x�����6��I�����l�]|�0��(ۊ�&��6�vH�2���h���uq���8�8�0X�I��_8�a�}V��}��`z�X
��#aOi�}����O\���� �_�����?��/�T�c�|.zJ� $O��S���z��2��Ϧ�`Y�w.��|�}D��*Gm��'ݥ �2W�\)���9���I�↺ �"�qŏ�U<`y���t����f�������*fn�CN��	k����/0�sN�.is-u�S�۰�Ÿ�.�?_Q,Ȑ/e���	�x��?��K�(7���FET���(�-@$��Wt�&�N�3�=e����hk:��n9�<M{:	&+�?;����û_�J)�Bp:�`�7L�3*粆�+��KqR$��i��/�È��5�y�頌+�:kq�x�g�oew����A���,�URg����7_��0��r�<���>��?&u�����΋j���}$ٲ/���r��_�0�"��}�#Ń���gU��)R�$N��z�̊�����+#O��cR�uю�U}��X�m�H���ŦC%���(���Ւ~1Ձ��!R}{��������P�*��R����d�t���CE������=I�q��y9�Bg���Gh��X3`S6��cT4�fx���dg�ɺ���|�ͧ�8^l��f>�.��t���|�5� ��0j��0��AC�
N� ���P��&qh�w�m�CmQ[�̹U���g [�V��y�� z�,E�~���qN6�><Ǣ0��$�j��T�S�։��s����������oku2�Z���B%~O��u�%�3�ؿ񧪥�'�uT�nDDXe����;��Q� �?ĩy4��:{.����˩�������ui=��D:�!���K%�!�P�P�ޗO�n��G'�Y���&E���^wM�r'�:{�ҶֻcY����o�����"���n���3y��c^V�Ԅ� ��f2.g���S��=2�PQ��F9���'����h�^�J<K�᪷�,9M@QK�'�m�`j��좗sL��
�Ze��,}�kL/FB �9Ky�R��%jH��r�Q��|��,�z���r����Z'�R�M�g�]��7o�[�E둴��6[�����s��D��6���@��2!�4����,EV��Z��=�U���l�������f;1X�Y\l˴ Wɛ�ty�<Y-CR]��oS�u��
9��d��U�Z'då˶m!�9�d��5�k��\���,�Ys;]tִ@��Ps�_�_��z7y��P2V�J�D�a�F�%\?��Ӳ\�l����"���`]�����K`�9�b),j�Rihٽ7�1\��x>޿��y��I?*�p��
>�?�7��L|G:=�� �/�vjK�_ۂ�uh�ݐ��������u@B�@�D;9�vS 7��m��)���i��)�*h�ٶ��쓑f�$�cL��b��q��l�wݥ�P����̆�6�U�T����[=���D�F6>��T��,/��~��{z�;nke���a��zǵ�����$~�u+&P�1{H=���d^��[��kv�~�}̫�9|����\��_����N�Z~�_��v�`x�c^?�Q6
[)�2�g0�U-�3�^N��A8���5e�%���F����QFv�W����N͗�R=��X,B�QMS�����RU��ڧ�t�gqJ��r�^������A&b7l�r^����g���<�q����b� I@Z�ܫ�O�ߋ�����Kz�����YeS�K�e�,y\2����d�R�\j8�_��E}۝Kz��`�D3q�G��`<�Ѭ�D\������žK����g,K �@s�X$6�FY����	���K����������q�c�j����~�\58�\0��ɮz�G�C�����s'~�C�%s�������<����7A�!��C���=��!������<�\2�^HJ��ҠoQ���<�K��[�J���[��Ί������O�����\2�0}�mslm&�7d��ԛ��8����"��+�����bL,c_2��Fo1�7� &�(�s�$ճ�U8���?`�����'R��K�/|�����k�XW��1-����l�zI,z�-W}�g�4+=���5�l���eh�ԛϽ�ۗ��Ñ�L�P/�",}���}���$�L��I=�s�S`����Kf� Э���R�����{��0f�`��,��|��<���`3���'�{��&���4��	�x��3���g���ޟ{^�й���=a��Â��Wuz�����[���t���<��Zםa������Ku.���&����c�iu�<�;<�Q&�S���l��X�go���lH���p|rC=ٗ��W�_(? �!�t9i<M��W���X�f�2$s6��3Db��W/���n�d�P��)����,�1�^�F�%5
X��VU��g���=�`��h_2V�
lF���^�J��YH����ޅ�h�"��p�KfS��C̵w���|HzmlNl��S)+p}V��<���ݹ�`tL���0ΜK�����Es��dߋ��{�t��-V ��swꡝ(�34E�y��6��/��ރ�1�{R!� �z���'\��o�SpH;��?&"
y4�5�.[���Wz��sD7V���.��I���Ed�E��\��R���� ���}I/7X���{�*�����ӫ5��=0E��/���k�h�0�%��K,� ��(�E\�)x8Ū�!_.�3�y'��~2�JÒ�迟k��e̲ۗ    W��r��C%i/�,�~8�q��l���'y,B���;���{o1���9����!A�aE	z���*&����iV߁V`����l���Tnә�pЭ+f����,�W�,C��|Bߴw���t�c��ۂ��p�[�c;W,�=��~��p.-F�dA��w@g��<�12�~�X�+��g�<V)��Y�zc�͢~N�KF���q5D�hǅ~����-���ם��.^z�:��ż�+ڗ���"���8~����w�[,A���^�;U����~�%C����(�1M���9N�4K݅�1�c�&&o��
^���>h�e}9�%���軟������ �I�eA�b�Pj�ֱ�}Iv`��]2�Μ�8���CN��84/��:��� ���]�%���q�Mh�F��][8�Xq�흞W��{pb����\RKW��q��S���t^B.�JJ�_��q�;��k������r������pO���S;�朞*U�R噮%?��MZC�+�g�רے/�z;?\Ω�DU���7�X`�v���Q�Ų�;�t{A�>^N��>b+��,�����>�k��/�E�Ùw�R�*p��p��dl���]$� �4�3\Џ�zQ��2$��T=��gv�Y��~	��5�¾T�Jaјr�
Q�b�38U1���J�֩,��[�p�%#"|�J�?�QA�}�I�oy3(��T��K\��>`3�\2K��	-��ͺ�=��	W�+�:�9��e���3n�!3j�L�a�y^K�.����"�"5���ޑ���r������h�g�4� ��WO*���#�\���ͧX�Պ��Q$���1�;GJpWr{�WL��B��Mf�8x�!�D�z��X�^����6�y�!q�u|�E�7w.����������7�:;�+b0�9�����f�У���$l�q[G�8M��0V��u��xp���%��iR%���K�'?ֶ���k%N�V����8i��PCP�?`=��z'��>�tpP�q�}��	���N��"���64c�r� `�W9��Qʓ��������v�b�,6�j�!��OC��H��~>S���Рu��.�#w٠Օ+�I��b����L4���C���ң���O�#û�포fӀ"�^��n�c���)q��}��sc|�}i��y���t�b``s�>C(�
D�<%Erun�G��d�q�����x�zbe� jDS߰܇�� �8�&D��O�%�~ݍ��F���^���{�(Ҹbp�C���>'�����SDޅ���y�+pEʿ6�@g�w�k�[������kNB05�ǅ��y��˦����L�l9ۭ.��6�
�@ѩ�q��mr����G��1lg_��tk��q����S/%�\�&�^�N����
j|�s�v5�jRQ^P�!i�w�ǻi��Y���I�&�(#�2�:3~2f�SmǑ����{,�����.����e��1���j���(��4�3��q�H�jO6G���X�r�`
���$���|8�`�Ʊ�s��<��8�,��g��
<��O�?���O���&����8{�ӯ�?y��vO�]���Q8��`l��r���������@':�����g��j�o^ ���f��&D�#)6��[�Ȇ��Vj�������:ҔV=MG͊!k Z=�F�m4�fx�&0�=,ꆝ���4W�8\�֑7Ԧ�iG�r�W�4�0�ՁB��'ViHj�*X��a��&p�[8��ΦZD�	b�
wq���Z[B�_,dsk�RT�c:�I�K�g3(V%Y����U�����=�}i�ܐ}Q�WvżS��k�Hy�(�-�\�=am�n�1s@�18N�>�.<��))�l�g�m��{��ԂVv��3�O�(�y7���7h�-�� �Q�ܑfQ&��QrȞ��(�A����,�J6�{.���U&v���S��}hg��fK�QC�\R���d\�����7 6Z呞�h�Q̸ij�[�Z����݋�OO��!d�X���V/�}�
̲~���.�f���	���MkY�A��P
�N�R:EG��*��a�`��9�i��)%^q�s�&'�#hY#-�\2חGЀ������E��Y�a&�wG�L7�^6�G퓌��:���Q,Rܨ,C|�c���>$��DF��� �x��/�1]��l(7��%�xB�΃�H�{*BK2P}{��q��D�`�ǫ#nƤ6J��mL;�a�ۋb�� �`�M����<�$C�Tu��������^�[��h'��Ō���`�#��:S	k��צ>k��[j�2��r>4N��Գe2"��9
�Hv\�����	����+�k�2kڊ%�n�:H`s\��-����)�Oc�J������-K�q�
�B#+���P�+�o���p9Z�sD4"�u���H��7G��w�]��N1�?���[��<�%��)/�	���~��&��P�%�̊x���Rt��gaq�ƞ=�ƞZ�
f;Ba
Gl�$���"���D��� ��W:�� �lp��e�>{��UTV-���c�i���<x7�o�b$sc�Tt�U�R`���/d����K�YBE��;is��>Y|�4�%��>,�<��"
��_X��>J6R�'��7e���XDڢ��G���x�N��*Ԉ��f�lG]�$�������� �����G{x��}�e�B��z�5���MH]�⏆��ޢYD$؞�ږ�A��/�5�A�@��8i��9�
B.E`�J(�4#���I�Um��J6'd��%���'��Ǹ3i��s����?"�[�h��*{ ��	��j���:y��
�%u�5OO�,����b#Q�%�N�ѻ��8��?&Eo�NΧˎ
])�^-�T]{j[w�XtI݃}�LI�b��jXJΕ7��E�t��C�\.VKFM��d��W���\5��J�C�7d�a}�~L6�qo��|�:8;��,�f���R����J��*�����;��Vk���J��6o������%l�N9�������	�w���@w_]Q0Σ�R�����|�M��0���%����f��-f3��j�ֹ$~?E��FW�}�,����`��㪷�LV��-���qWǂV�+Q��.�̀�q~�.���y5��X͘��[x)u����}s s��Kf)�ѫ���aI��B�B���E3�dA�͝˛�����m�3�����e:�r���:���t���ع�0�_�ACP9�̲���*��^R�<��ϫ}>�)����Xf+B��z<@��ݣUs�!�K���b���ڀ�nZ��Q���Q~��&�Ǎf��Z���;@st��3��L{���]
em�<�i�}QYR�i�&;����~�Ψf�d#�J�Vs/°O3ν)����-xaz_�5X,�Yߥ!�V��*?!���f� "i��5^�������誛Q���b��r�iqb�*��&M*jr4�W�C�90��n�5�!��
�HS�z�5S��Z��}\��@��=*�.�E±�������E��C%уץіW��Wԩ�w��6E0R,¤�1��;�ȁ��� �y���s-��ޏ�r�2̓ �?�9I'�ŭŻd���-3�Q�0��)��
�F����-�<$��l0u������.2ф� ����#c�_�3�G���\��C mU��Gp]a?��6�()�y� �pB�F�M���Ad��My��p3�����%�2�AJ��s�-y�A��f�O�}ф68L��SS{�����}f`ðN��c	��Dq�&�xD��~�
�`��(�D*x9vI�>N\`6^x�\��9k���	���Wſ�M@���-�0y�:ګ�M�DEq��n �P�xmO�нJ�1gX}T��j��X��1�÷�#Q� *)�JE�1��R�DF�?"��>��gLd�S\�a�_XK0�.�����z���{Չy�{�e<\���b�p�K4C�ߝ�    {�@�hJ�����}8V�F.׾4���=q8����J�%&v��["ʔr�����V�=H9'�y���8C�N����P�X�hrj��>SDeN�S�aj�^̮�ȳ	�rZ��>���KU~ٲ��هx��M�:�����dW�/@H	j�����ܟΨϳ����݇��Nl.�j��`� �ޥ�?㣋ܼ�s9Ap�����Z�K��\g���V aJwdO��	x�{��V�_�Z��l�O@ǨRj�j��θaa�	��j�:.�x�]K�Y�[�"�:T���<KWR֣��p$[��\�J!n�re�9 37X]T�e�G��s�A9��DmG��p��N�=��ꪈ{�4�_p2I���VN�e�jJ[:�)�	)�1�^\�yHF�m�f��\^YK敦б6�X1Νۄ\���6��Z��FY��f)�� ��о�PUrROU��7� �ղ�����KI޽��s�h�(�s�s���+ � {
���"��k�f_�3�P P��!%�L��]��,sʚv�G���N2������kD����,��{i�8�T�Ȓ�IH�Y<)�R�N� �*�T=K�����^�a~�?Oz��Oz��]+������L�#�����ɭ��m��.�Q������i�?��S�z �s�|��YҠ$�����1�K}�/�9�qo�R<���5U�Ŗ�"�ҋR�N1Hd��vf֙�PU�}WGǟ�X��Fތ�{�:7�~���8B5u��2�+1 E�*�.������`�9J���k�m&�,F�\����va��t�Q����������D��&�]��������ko֕�������ۮb�F�1�����K|��I�[l�j��5Ŧ�$�ΩĂ��7VZ���U_�jݲ�M^٢&m�h��
m��m���aE���D:�H|��i�V+>�I��3*�^��WieZ��ZG��P��f�5G�Z
�yzH��D�)qS��XN7��߱U��:*���@��5����z���4��@��EO��Gu�v٥��ju,f�M^��k�
Hmλ�]��/�x�*9xh4�X����p�tG�m82�+F���޵�]�ZD�	l�� iFZi��p`����#=������H�g�L)o�!R�{�H��.�h��4W�M�h²ԧ�1�]m�w��9���}^���w�6y^]�Ě.��p�o���V��cP�:�֍��nn��b�λ;8C0�Y�h��ؗ�WsD2"����*A�5M=�3����c���ȺsI�c1zu���h��ݥ�����Vx~����璉���LDG^PP!LOo�"XMC�!H�3������'w�g޽̖�j)璮n���W��`u�L��թ�,��J���z��R��wy!6~��O�3�Pz���.���:M[^R�G���)³�S� �^`�_���b�9�I�y�dz�����n;���r���!ܷZF�8�����V��q�4 ��&6_���=�^�-1OoiP��w\�k��%��@��g_�a"[�BI��_��q�T'Jդ���YC�ʷq4x۬�j�Ġ>�L��hN�ll���:����c2�j��z����\V�1��������,i���8�
Ѵt�)��䝍�s+Dj%�vx���t{��MYI�Rݧ�&����q�'���k�Hf���}�ld�Gn�\| ����f˻�Z�>pY�F9\�|^7�u�jww�WǼ�)�]}�� ��m��Y�
� @~Ec�tg{4��"����^���������3Q�!h�)1��c֎�L�3o��-Ap��#���@���$!�nl�O�z��yT�L˼�{��H:@JnLs��\�wSQ����/�jϰ����B���ko�}�Y!"��f{$�#i2�j̈́���6���&�~��7�UI6����_e7�-A�7�s�6l�7
���}�6���d�YB��d���d6����[v�&����� _�Ԍ�Q�x����H���V��Ɣ�9�x>��l�Q��ˣ�B]�Oh;��Ѧi��u*{�Y��1vx�4"U��A.�فl��S��S	����)Wa՞RT�M)V׃�g1��W���pS���e�!�$�uD�?��.`y1�!)��[�d�A�?cS�v�G��L`�R�d��UȯM�����Ǻ�%���Yʡ�V��.Nћk�a` � ����W�Ц�R���Y��{� ��*�)���ؾ7]�}��Z����KCz �(`��U	���ݹ���M g'�
�'�ҹP�%�
+���ʄh��Ӽ��֓us�Ů�8GiDqb��֓�1:�@6����l�ED&��p-I��;rgvr`@u�M�H6����&򙲤��˝�;�n�4j��j7L5@I=C)��>vK����M"G������aAzv�x�����r\�����$�-����؉�P�M��B��=W�����Tw�)������$��s�R�:�h�厚YH���hB��pa�BSRF0��� hA)��A��빝~���,7��r��#��mM"v�\0�T�1&�y�
-�jК���WV���9#M����M�������FO�e��A�ӄ�ڏ#�%�F�g=�Ͽ�^a+s�S�v22���&%(����]�ǒ��eU-TC�8� �8r,5��Z�=P��j�� �UE
).E�IH�E`X���Q,s��5�-�����r�5�~Υ��W��5!"���o�KK��>ڜ�L�-�D(F�A_i�ѳl��9���L���U��y��2�x��DG}�S�T��� ���I�u���^�c�;���[��~��:��[O%~P-v�F��/�������X@��F��u�VK�Ί����r"���7�������cwe?��+��\�3Xi]�U�e_m\����-e���]�K�*��uI��x?���㏬U�Ѷ�M���UY�������cU07�s}tkꑤ�^�4ˮw��V�R��3�h/�����;^8&��o!�^w�={׫�Ѥ�0�����["F&:�p��c|>���Y��|3V�G�:���5l6yI�k��� ��/_���ٖ>���	�G���<��8H,H�(�࿔�˵p�ʸNc�e	`��1VjQ艟'E����=)�(>嘠�Z''���3������)lIE�!yr
$E�{;NQug����[�����S���4,W�g�3�,�WF,�ޒ&�M�=/XpUI�%e
$��O�"%	q^���5�Jp!��b��Ϧ���C���;d�O?&f�A����Q�|G:hG�r�-��s.�"Ӡ�\�s!U��ԉi*(QL]
�up�͙�9g8b�����N� 9�A��jl�˱��k�RK�I7��r
{���j�q}��eh-�o@��OȻ�jj�m�R�.q��;�?���a�Q
X�N>F�iB@8��Y��6�r�Je��iWn07A˛b�{Da�������Q,��o�Xf�My��XMV���@�ZH�w�$�9�V{D`�����z`:kN��,��Q�@{&��ңe�)����Ӽy������=j4M2
�W*J� ���^�y ,rj������X8�-{oS�Ugg��A��e�6�u����l@�ـ��Gb_53��;��Y�|�β��Mg0�O1N�Y��ly�����Q;�t��ű"*��m	��ptd��=M�#l�*��$H;U[m�����5;��Oư�,(��|H�
��	������r��3�J�����
:!�(G>UUɮŏ6Bޱ"M��d�d��8�Vb�"1v��qQ��)|o�����:G!I�V���u����+���$��$�A�q�;VM�(=�-r�y�Ś�w������/��N8m0o��*�S'�Y4�k)c�c,��D�)�Fijs������<�_%��!*N1�o����td;	�E��!kك#d�c5���ZH0z5v/XB��[y��p]���Eo��E��,�e�`�9T�3H#�/h�T>WR�*��v@X�6�����~�-�V�99QX7Q��c��M�0
��( �7M۝��    |-�����1||��u��Q����-
8�:��B+	m�I9��5��1��х�V�q.}��X�r�.:a$A�e�`>�]H����A^�NV]����$iE�u�3冝<W]�9Cu� 	�ɕ74IJ��Q"K���n�ߊ�ГD�?D�x�l&}<�j��:vC�f���6pO�	`6�~��t��`5[�h\���3.�W�8Po�p.��g:���̀s��Wa�.\Y G��=
���x��o�g��;� �2�Zeg�=�ZJ�8�:*l@��S��s�>d�O(�ȽQ��������]౒�Ǝ�Y���aE����,��3@�H�k�P�%Ϲ@@��X'����P��Y�]Ǯ�枌�~ItaI����B��>���4ù�^E;���I�	��D�z-y�p˴eW�dL�@��eW��	|1�h�v�c���Y�@:�y�FJ�����������s�9�\�5��G��8�)�Zʎ�ٶ/[vM���KR�_�j!V\�����R	�-�=��|*��!�-��L
�FZ�e_ ���^�����WL�٣�o�|�m�t�,�R|���*Jt��Do���G[9�,-
EPgϮ�=�����ak	� o�|:��$�0w	�=���#� �$���?ڲi{�0�yp' +?��-U0��P�mgR����y'��S;Rۤ�5�
%�D��o��sZ���̐����&����=i��r:[�R�����m}����� ��gC׬�������5�nd�e��%�:m{=u?���h��J��0Z	k�Q�FR<�,"��ʶ�w &̖S�Úo�_!�!� �֘R���<
ZD)�W��I3�ѵXX���;��E��E��U�Q�W\�v�l�|�!�'�c�PO�20�H���74w�V)_��(��.��������DkJ-�5^�hq\2	�Z�l�y�S�y Hv�[�ϐ.�'0o��"�[W[F��-mi�5�hdp}?m\g%Z��*�]��P"9�Y�^�Q/'U�bu�fe>E ��v���|1����O!��<���z�7����C#8Y��I�n�����u� ۡ/��:��>s��[�2��[�� )�d�l9�3��WA���k���NϜv����@���1ZG:l��AZw���o��F���Ա
𛂒S&mV'O���9� �v���W�K��]D,��_e����?���`$��(=r����.5��e?
L��T=e��P�$��?��'�i������/&0�@GO���'R&(�_\�
�z��$+O���y @"�g����C�4�'O͋��S�D�XT4s�(�4L�l-T���t�3�^*�Һ��d�v��d1�Y!ɞ�6)BH����nLC4����C�JCĜq(Je���"?���]|D+��"Us����g:���RA
�}����MЧz1�.�o%�s���n��l+0�@,)+����U�N]H�#`?�y�ԄHM�HP�]"�Gl�8c�@��1�Y�ƈ}31iX�YNL.
����z5Q�Y�g���	.�Li6Q��fδ� .��C�r���7���N��N$U	{���1���a����"�q�E���q��E��-�U�Iƨ�v�2�l�T�p�i�L~j��xR1�J�sޑ�-�p���Z��RG�]�Y)�N�!=m_6�N�*ڭɖ�!�T���}��z���b-EA�EΟ�U��jp��m<`��^u�m#���Y�˪f�ptTOȭ�(����4ZD���%��3ϡG�<��Nn���b�R>�ZڌJ��\�;�T����U/V�����+��v$=fU	%~��
�A@��hk��a�y�4���(�
��D���
q������ƏY���eDF������gҨV���rI������`��7�;+�b�/0��|�����������^�gu��pZG�s.�
>��V��t�cu�,ˏ)E�$�	�U-�*K�j�5�tI)V�Ln�F�v��� �ls�s�&�vڝ<a��ڄI*�;�� �o[��ᲇ��g�8ڶ�����-�l���Z)@����e��z����+0��G�ZOY��ĹC)��b+��2�>�:J �YV�ppJK��DZ_������#B����L���3�ԏd�L �%��8�	�*ed"˰7�_CړR�V�C��}��jL��<sBۜ#��9)��pԗ��p_��[l�S���U��H����6���8Ra�T�P,܂!N5��*���4��A�=ْ+�JVU��{bZ��w$���v	��Dr`1`�t����ç���_)-�V�Y�a���ɜ>�3[�m��T�^�9h�y��Z��Xs%�Y�:I�ilr��%x̤��m�����JgY�['�K%BPeA�]\s���=p��9z���j��z�U�焫�1%����!����M~�S�$L�9"�O��h��Y��r8F�Z�T�1�ي�S�����U�oGΐ�7V��q�?� �q?K<�5ּtO�����y2R�F`��c/^����ځ�V��V��,�v�߄e���c�4|b:�L�etp/.|�kЛ��kg�@�� #�miN\s -��O�����ʁ�2�;۠8F�〪��~4Q~�N��oEj��K�a���c����cN�D�V�>?  zVy�Q�7�1~�TU�uѺ̋5նMbU���Nw�Ap�M)p� ��+���e*�X%i{i�r�>Yd,����^��� o�U�{��h�}g����8EYFUZS6��VR7�bƫ�Q�}��L�,OJp�P62�dT����>��a$�%[�FgP���0��y,X����\M��e�h���)C��G���I�Wh�DP�Ų���8l�&��B��u�a�^-�k��l���}�]��Y^8)��D6�".�}2���h�RɅKb��r%³�0�3`Ȱ�,��O�Y3b��4fRX@�Gy�8-==ğ��.�Q�/��#�6�=-�J~����0m�0$mD���T��BP�c$��xZi@����3F�l$��&VM�5 ��B����!##�8'H�Ԏ�v��r>Ѩ�4y�{�K�|6�����Yeoq?[�<�Q�n_���g�����]�(���p�%䷚xӼj�Z"{P����T}��H%h
��#,z*g�P��:�s��Qn �;�hJ�� 6A[���YeBU�����`mn0����I�����~����}FS}4�7����\Q���D�E�A�fm�`|���$~#����{a9�
�?��99�«��b�?~�TA[��#2���m�I�BfԕG4�Ӌ[r�2z��}D����5-��Jؠh>�N�n7�<���ǷC+S^8Q�NՕ�"K)����=�f��l��j�r1��#�M���{
Ug�e��Uyj���O�YМ�m_ ���m��H(�Δ%��+绯���Wa��,����[���'�YAq�Ha�g8��n�eZ9�M��Vt"(��,��A2�c��y�������p�S,��4�s�>���&�V`W�|�fm��,��7�������M*]�O>���i�����e�h{�-K�x�}V�)�
���џ@��{i��#{����=U^v��џy1�@V���ֈ/e���)F`�/����C��ܼ��3tơ����Ǫ�S��Eq��Pa�/h�(�d����J we���mzC��r���kT����ZE�o�G���ܫ��d>n����<�!K�N:2���(����>c��� N
1Į����UT�>��)2�8�x���5�\�mc`&�|�1��.���'�u|��q��b�	��q���)ِB�C�M2x`����]Rf�K�Ҟ5?���$�n�>U7¹]סR�G�r��@C�h�Ԓ�n�yi2�̑&l�� �2�����$07o�?2t�����Y*@r}7+6_�_6�������2N�i"u��>W�����~�cn��2�������>�*���~������6걶ݦo�=�wu#�C���q��U�b�\�/��.�:���k��    ]�����ᷖyR���j�`�7gR�M�pc���WԶcYA#S�y:���F���j#R؛�Yh6���6ّ�:t8���/G��#��t��CICAi�t���,��BP����qbUPP�ꉆ�Q|����h0r8/Й �9�GI�Ⱥ5�w��/��+'Y�|{���TJ.��js��9�	!,�E�X�ݽ�˅�X���ꌠ��{o�
�F���4$ހ(3TH\��q�C=�F6ݡ���4S�0�U�m�3�86�!�
8H�?7T����R�����!
�_U��#l�%�
��i��>y��U��8�{Y�[02���]^j��c� ����wF؅X�7M˶�����7��S�W�/��l)�"��{O�Ǻ�>��e��-�f��AĀ�~&��b/h��j����Ge	bb(x�U
5+�tm�Q��6}l�7���,B���L�OE�SeaV��%�>��Eg�ϑ�z���ʵ%vP����VU�Y=��a�TBP��!%'���=]��ӑ�Y}Ѯ�c,`T���t�[ٿA��Oj���P��j���'��X�[��`�.j�FM��J�	ZQIϞ+A6����MGj�MU�.��I��-	+���ΣRzVu���i���n����S+�G@�j` �{`�jD���Jo��].����p��[�UV�(q\ rq���F������O�NE��k��<>n���[��L�
�K+H[���J`ה�e���䡲�r�cV��=6������b�cL����M�f;V~�Ih<�z����Yk�vB�|z+���1s��h3��5-��B��=p���d�xş���B1�X�'���^��t��~r*�cT\&��19��� �`�]�� g�o3�p�+ߟ��Zo��6�c����rޙC���װv�+,Zn�aN7��LJ#h�餼>�y��<��P�s�h<8zɂ#!KT��Ƅ���u�U_ohA�`&������Ue��A*U�Gd�r��U�:#�pI���DM�O��`0��z @�F� U�ġi�t����2�3e���m�Y�:7�xF�0x#i*�ce1gw��D�L4��w��:P���oQ�gސ�!��){��+@�Jm58L�h��c�=g�qPqV�􌍈h����!�i/9�K�fj ?�M6mKo�9Ԏ6t"L�ί<ԕ�gFF��cJ%���9�-E�:>\�E�5D��L�8B4�3(6��wjc� �r|��Ve����t�ݺ�3�Ȁ�*��B��`�D�ݺp{�m5�M`Z���������{���.�*�y�a���Wz0�l��Pl��&�� р��n��v+ҁ�L�k���|=�MX��kX!3�\��Zo�Z����1�e0�W�E ���`��O�O�tl�Q��k�6����#��?����I��	~�	4l`�̪q2���l�2���b�}����
��W)�%�T �Iv���QP�c1\�5&� g�[��9��j''Y��6�9`CM�����݆�z_%1�[��V���A��u���Q\9���(��0m���z�BW&0��u�|֠i��ڳ�k6�I���JB� ��f	E4*�0J�&��I��fb������t�a!=�������hԢ�^%˒��B	Fׯ�[(�c6�w�Igmm�*�.�����
�:�9D��cw6���<[��(w�Y���X�AK���?�d_G��X�2��h�b��k��^�玂��\N���F�>�mlX1h1�.���}Ve�%�27�������X�Yw̰g��t��bU�|RR�A��v`���ģU��$���+;#f�Zo��O�8p�rf�����&Y��F��HLr�9Et�"	��؋S�2]$ݎ���sZD:��Ɲ��_�1��ޝ�{�����@��'�A1Z��VX�~*���ӭ>����1j�Du!�1���[�"�K���WS)B��"h�;����8جĢ�����,�h�����*"�c�*������DH5�QC��b;y8�B������W2y8�����)�@?�H��L3QF�$�&`���k�j��N��8��Y0�'�i��L�h��.��[o���f;����t�ς���t=�Nw�`�]ϷXt�:�/М�`x��w��޵B���В�!au��(�>��ʴ��]���H�^��B>�*J�k^@�氞QnE�� jd;�&GC���g(k�X�ڀA���mə��"���6R{7�B83�KcS
�;��]ǯ����p�D�cq7ݴ�������0�Y�$�����\��Z9:e�H#��e{�pd�T�r�ۢ�$@JK�Zͻ��t�Xn�����,�y>T�z��UR5Sud=u:\6P�C��/F��0�^0�E	Le cۓ��/8��Ե��(��Y��J���Ei�6��-n@cR
9��B���Z�
V�ݢ\�昔ֹ(R�]�{&����qe�Lza���Ll�St!�E�i�r�Fg��O�=Q��#������T��hK��H>yiF����Ι���j�#�e������*w���j�K���\�n�����>h�Q$Wa�*7�욛�)y~~s:�M� $Rs0��gi��m�fѩ��h�����cFs��:¡�����h�-��ؐ�>�Yf�z#��KL��!F�6����7�Qe���m��z�[L�)���&
'+�����Z���o;��`�R�^K�t�/ZeF�eh� ��4%���AV~�̲�b�����%��b>[�]K�x�~�K����2���WH(������pK�U���	�a�{���<8仨��64�LP̙vFL#]��i�bƑWp(�0�����Dij���8���-Z��A��/k;���~�-���Z��@��B�ٿs�K[�MC�գ`�,�L�\B���F�,�gN���0^s��W
W@���mpFq<�ߒd|q𲱖.°�Q�&<�:Q�)�T
�zN�6������J��G�١'��S��&�����&�en�,c''շ҄�����#u-��p2u��E��PY�.�j��U�h���;1I"m�բ��417�b�n������
#)�>�K[���Ґ�]~�j�]�cs���8�D��0��qk�	D�hu>7�6J���)�-�dS-v�Hs��0$R!Z4�8h���b�~�xץ�I�@y$q�����ƺA+'��1�|H�eKkO����]�\Q�e�<�	�D�S��Ј�aǧk�w.�.�J�'W�Azts������G��#=�A�Z�Z#	�c<��j�ف��d�q����9���d���qt
�Ӡ55\nAeZ��R��vG�c�Ve�8ǔ&=�E��b
ߒ�˱?}�_޽��������C����e&�NÝd^���zEax��N�Ή9���t}����a��H�`Q��$�&%��F�ccх���bhE�m��sa�`���tr�뤬p����<rz4ݺ�m��K��~���:X��μ���↢9�t���L�O�U��OX�t%�		֥i�@Z\�EGM�y*l��S�`��WS�"ޠ&j��$�1�����ZGԑ��t�3���s�:إ�8�j<����W��(n-�0���3�Z�����[	�.� ,���m�Z�#Q�veo�9���©1��k�Q׀�F_8��������SK(vUx�d�ѐQR7P�̸h���h!]KQ��r\ق�^�w��Q-*{DUF5��!#�hn��0��.C��H��Լ���vO7��vݪްlG�Y�^#@���s}Lw�R%��
�F��4rv��p���Ι���46�ذӽy�!'6�ia綢;��`4Ui5P��1��%Qރ����ҟw�����.�>�&�K�y�5��[����l�]���^����/��lBl�Uhy�>f����H�n�BY��IZ:�8u�g8�Uۼ5��p��3�+ȼ�ː�0u{S,��|,��� �l�6��R�*{yצ8��m��f�x4!��V��e�nk1�˕
^��$�B��]�&L	�[c�KtG�is��^��/�ĬU    ���p���ӟ(F�0<%U$���S4��|�Q`�ú�rTC,�Ay��Q)����A���6���2(
���lP@K�솛*s8�IJ�x��k�j%���P(�s�m8 M�N����ou��6�YL)�����ӔW���04�_k�k6�덶�I)J�'IF�Byw'���Z�	�l��!���PO��xr�EP�
Î,c�#Q)��VHf� b�]�{�8�4ȜN�X���@ ��y�� J7�4>��۸���-(�T��N����2�^.��%5u��X�u�]Ǝ�aIg��u��ox,Q16	�������i]C��Fi�tgL��V�#�鯷�Sy�V����|��z����i.�<ҷ
��r�i���:�v�ЦZￓƥ�� f���F
@�E�v7-���$����:�_���F��Ս�cw���e��0}O:̶Wl�+i������[FfX "meZ� CimA�ESh�q&5�0)|�9�/�9�o�3լ]F����i�G9(�b���n�?����
tz�r�����)����=0���#.P���jgBM\ON�� ��֕8x�N	�H��Gj 8��)��y��l��$�\,��~�1?M��=yG��'��P�o��9��V�0y���D���l�ǭ�Sz,1��f�]>�9���x���?%=��z/�K
��⓪�~�9.n�Bs�u
B��W�1�|ޚ�Y�"�Z���p���U��ZI'�*���^N�b�[��uõ*؟ߕA�bκ�#G���	It����ŉ�Hc��a3֦nMl�՛��W�a}h-c���]��J���,�ךlfB�Ivj��Ȉ�X�Sa�HwX��E@a���^1�+ns�zؼݸ��*���TJN��f���E��!��*G���wka�c��ҷQT�#��J�A����9������x�l��Yl���Y� S]hTpI�R-9��y@t�0#�꺆�d�u� >��\r[��bW���`N��%�O�2
��X0i��K;��A��S<�4s�&�p�6����m��ަ<�n��M���u��r�i^#s�S���Wn�0����6,���ז�����Ki[d�����l�f0|�cێe JqNS*޼_�E��6��:'5B�c�ߤ��+UJ�=]��obz��gc�����+x��lV��MJ-��&��=�VS]֒0D�H�t�M%��&��by�52~>��]�Kp]�=.�_�ހ$?c���?G��7���Ҡm�UXt�>�r�hz�/�<*�H4�ii�ͨ\U�o��Q�6j��@z΋�]�?w�5�?�5��=����Ŵ�v�_N����̟M�.i0�3�P�P�PZ5�da:Z�-{���B�8�F^FGUȌ�� �6nE��ᵨ���l1# �޷���2�@�c�epa�U��"���"*��fh�-zJp�|]�)P�64i|��nf5�N&Oa�Y�~,a(����`��Sj� �֦F;G�lh�8�EӰaG��R���ٛ��6�o���C�K
��[�6�g7�,9�;+w��-��*��1��O1h9Ű=�$j�Ŧ� ˥Jk���9�D�`�%sO�6�s��:({�\	ǁ#ZM\�����^�~h�4e{f
��;D*ǂr�aa�Z��*-a�1ma�˟��k�\\@g,��m�J�F*Wu� <��fPޯ��4BawQ!��|rEm����9b*���v/]�=4�V69��J�ɹt�L��&�Lj0�� ��4�v�����u���T�n!t(�@#
��M��ͳy��V���F�[�	@��'�8�*3����#,Z�$C�:������0U��� r����	n�Ƌ� B���
TA0 �p�a�>ٸE���ok���t�|��8�d�Ȓ��)���2�EUy2փ�qo���~�l0��ت��lP��.��!�#Z�p6-s��vl�f5c�G��H�\[��"ϥՅ *�E�6�������B#dn���J)��/T#1��\�+:����=��z�����r�Og��#�8���)\���^�����a��.��t>�ߟx��^������jLW���^I�P���t�T8���+S�Y\�%n{��*b%$w�R7���D\Zyl7#�=o2���xj��Ux�:iV�T�3Y�̳����$�����%l`�X����(���s.�0PpW�e�������� ��H�Ф���Ցu�7�����}D+�s"*LI�LNS$�[�i6����\[��u�C7Lg�CL(� �W�i@Y���B�Wۼ��g�;PBv2�se5���j@KQ�D��r�}����SЖTbZG�,�鍓P��1)ՠ���;uu�kg�ts�1IM�G�`
�J�!A��4`A��<W�0���n>��[Wv�Mx�X���"(q�a5�+"�ub�󾋋�Ϗ�d��R�2ep��.�=P�
�
�^w.��u��e�c�9�[İ^�j����釫e�����j��Y��z���ֳ��Y-W�r��
r�қݯ�˙'�|ozc��/���M�a�m��7Në	%G?]c&z+#��vM�6u�eG�!�0�V�����]`���\����1L"N��_s k��g�sd�U7+Fb��1S`O��6�E�5Ԋ�w~�gtR
@\P���B�K.i$�舨
9�ν���a�6���^Dֽ� �,�e������;[�7R�\�,G�z�������f���v�{g���ۥI��̲X�7���n��a}���vم(��2Z���PaFvХ��dQ-]�mJ0v7��U�SkJ�f�`u,V�٢�ҿ�(�;�n�z������6��6�2r�j�2�vDh��4���������iز���v-��v���h�Yu�Jf!�[] �%�꼵�y~�^�gM.���=��uQ�TVF���d}n,�y�*�n"�~c�?���Id�5*]��Z�C�^�A��%!ë�n���� ��&y�����*�}y9���&���_j];N��E3m�"��hԤ�q�jmK����8h�Z���:]m�,0�7ɻkJ�x�S�>R�N�S>�T�X+mJ!S���ߎ�� z��Pd�n,�v��BaO��n{��S�>@�`M�+5����3~B��,�W�s�������\!�D�Q���$u��m���Z�Xw?�(���t�t�]Ɖs���K�iA'�{
ǜ��/���_t��-�����!�ղ��w3���3��?��#2���|�z�R�J�57���k��{�H������rr�&��v�i�"�p5d�ޙY�D�9��4G��p�K�6N�ޜ�q2�$G�lCM�7�B@7�{�jr�.j%��+������H������w5e×����f�~���h��U��E+�}Ɲ���2Ɩk���(ֽ�(m��ƺi뵨чe�!��>mM�9j���ր�R�kA�:�_��SR1`?�Ϋ��X,Z�n��*?8�Z�w�j
��2�v�ď�;�Mg��Z��:����O_�B�`�7T���״�pN=�s� ���ȶ\�e�ٙ/����*�ģ�J������%�Q�A�����v�O�+t�%��*�C-t���O�.5��OV����~౪_�������m���"":,�.ޟ:��� 6� PzqSy���ڒgT��:��
�x:�!�Ng��z_��sDL�|�*n�-R�m,�+3�]-P&T�����D�\<o��}6�!��A��6X�*yP�p�R�%Ǩ`�]��~L���mE���EJ�8�P��B\9rPjs�	݀�����/�����Xmߝ�w���ӫ7����r5��=�����ާ�2�`v��-B���.�����9����L��hCȾ2�.b氋�܇�����9�����R�=&�΋y�|.1-"� ��O�
u��m��E�g�)7��	hu�j��A'�A���M�Z��N���򺣠�^:��	�h{:�(��s�ܺ��U�چO�x�\"mO[R�w�ľsK�I��q�Ţ=<����;�s''���`���5�� N������M��_�ݡ��y    �a嶮��Н�$��BE����0���j^®��d�����#q�TFrK�6׫Z��K���{t��"��+a�lu.߶/��>W+!��R�|�z$��Տ
�kG�rD�`=� /R@�m�UR�;WR���֋���e�K��@EJ��d��`�Nī*��*��:�vx�+��\+���E��A��Í �����[04N(a��p���n����{�H�c�)r#j#�DH,ako�����H���&���A��c�Hk�8`Ɗ�{�����+Va;�fmI�����*������b2�-�ׂ�b���UA�ܽ�r#G�&�����!�cF��~�*�J]�.��X����1YH�)��L�,��9���o�7D��=ck��GɌ�w�|��0y�r��Y�"/7z�bf`��/#�م�����GtTC� �YרD[�v�u��o^y]���4xB�tJ-"n���EE]?�f8�u+��&A0�3F���|&�ǵ���u��?�6��t�攠�����T�j|�Y��r\ɝ�_���/_���'�{�GF͜Zj�V���!�b����Ŷy4�b0YN���_�vo�J������O��Ŭ�G���	�h���2�v%*��y�����-����c���YT�渮il��o����Ѧ�ֻ̬h`M���Xc��7Q��Q�e�()=�d*ݶ�S;��p-��ё!R�$[b<�V�{^o<^M1������g�k%ɱ��+i���l�S��.����]���P��������o�~|�ԡ���}y��^���3�x����&�+.��G;��QA��z���vA~E��׬E��ܾ!�T$9�V`e��l�Pj��5<S
R	"��-;5����ғ�?���=oPy����bc�d����+F��!;���s�l�:Τ�@F�$1�_dh,)ch4>�$z���{��ۍ���=�P���]���a��vq���1����[������	}6�Ô�8*1Wo�^���c$�+=������r���ӳŶ�`��l��K��a!��V��6���6LI`��	د���V��z#��|���U��;�ӃSեX�
��t�?}3���,������V��Fܫ���Mtw�"�͗��Q]9��-��[�0v�!6����p�T�%s%���A\ڦ���k>����>Gn���iiN��>��oM#`#R{<-&St����h��N��/u`jp������`����.���t����Yi;�l�kWk��S��R���w���]P�J���a8.J�ش�п�ʓZ���N^�B��h�`V*��/Mi)0C�
u�]�`�j��r���aiSRf>�]t@���~\z��W�?�u�c��B-�����k��_b0���Y�gؖV�73`W��u��Јr�W�
]�<��+׀D%4�~��h��"��]P�1�%m�g��������~���t� ꓴd���
�/h���>?��#J�T>��
_��{^��r���jsH�i�Du[N�eE���l���s����TR��1�XG5��<�7���p*�`�,EΙs���qiZ��|��"� -$�М@'|י�X�O�1�U����*HL�th����#ѯt�P����:�ˬ����Ӳ��'~�5e����r�?��Ҟ�%�x7�ll�=�N��&���+iF��ӫ�� �<pS<v��ڦߖ��z��{7�����>&P�Gs�Hdm��Ց@^~yv~�{�!�Z=a*V]��F��&ֱҔx�v��EW�ןp~-�9����_N�弑f:y5_�ǣe��}�l1�MC<�NT0>P.>$G���Aq���D��o�Y�)a�_��Ls��M��T�A�s��˯tV����i�3#�ٕ=%�e��Z�`��L-�7�mŕ���rbD�Yv����t�CE!Ukw"^�zW��v��[1�`���r�'X%���<eǤ�G���L��%�S%@�9�6�k�����}���:�o�0OD򘹬��I��\�YO��S�lr�YT,_�~�񠫨��b�!>�����jb�7Fd��r5���w0
qC��>�<ѽ�h���R�k�Jo�m���m�x���3=�����k**�ϡ��ȯ��{\��Be
��<���b��]��G��ժɦ��ArJ�?b_�01W^���>M[��l%U)�'E5ƻ��ߪ��-���*�����p<�����o9�9~��Ei��ߺ�5B䖳�`2���]L�9����/A�J17�_���d��#�T�맿���+M@}CmmՑ"l��/�J
��@@\pݗH�GV�FW�N��1X�q	=� ���];>��8��Öz{*%�>hGޜ�a������u��n��|��Ǔ�|�m��f]�����,��o:]LG�}��������_?��B]���e�o��S��DQ�Q��D|[7ň��7�v1wD��C��[�:�݃�(:��5Ը�M���|��&:��	�G�c&9Hh�I����F�DM�Np@�9z�oz7���B^��P�l����j��Z9�B(u�2�+w{�>[n�:���a�c�����dv�t�;nц�́8$�돈"���4�D�M���dq��kğ�TĴlthIwn�8a�wg6^Qd@�S���I�\³����;}p刺��8�8�f�ɂ�ё���u�A:֙H�7��󖻛�c��b.}���W���Jm��݆���_��nu(؈��=��s��n�i>+��w`?�n��w��ΧI�)Eu�&�A� 6WC�h	,�G	��&z.�����A�PDQ�I>��ݚdꓸL��jI�qzzyu{����[P5��g�o�e���G� (��s�������S=<�|<γ�Qv������~�W]�o��q�Ⱥ��c�6m��h�N�j4��o�;l����H���a�y�z�x=X����ټ�G��[��P�4r�2�"Hd٪4����fy�)4�嘬�'���ڤ��FhZ9(3�����j%�#yd�-w�K}�;�sT��ݎM�m�
��hkF�y�_�U`95O=
j�CG��~�%�� �s��Z�~%�R^"�>хu{�vف�`Wm��c�Gl�%�VZ�LKF��Ɋ�-���{ݐ���S�p':)���*԰X���5!��Ϝ
���s�;�f� ��%��=�n�F�ekf�x:vF��iF� ú�x#3���1��9�r���G��6#����Oxn�_��V0�ĭ�R'�	�pf5�k�7��O��H{�Y��:����+���Y��ɟ������o��� ��Q ���'�5+�����̭$%I�l���_��J4V5s:w�y̢n����ܥE�q�L�%�I�bcw�!S�e��Ԥ/}'�Lc!X\!.�]y��p׳��1Ǜ��79�.�F6�N��5��+�m�D湴�j�5u�ؤJӮ ~�z�ф6=�B�����h6Y�{=�C=�g��x=��&��f�Z���j4[���G�W��l<�L��?
��&u�����I�X����t�˺�<���{���r���aDp�K�����#�Lܿ���ib�EjB3��	��ݲ�jX�������s����=&�R�7�4-��W��?J���"�\����k����]�b��Ǐ����N��u�Y���~�L��3�Y��a �|�����e��ec�fZЈA�4�۹-�ް{��ɲ���c̄MMtDz������DJD-%��9���ه;>���<�Ǔa}�y�\N����+��7֞��W��x�l���=ϯn��,�4�;�/=�KI$~���K���~�]
-�\w��ls�MT��{,��-��;|��j�PAOR�]��
�H0;�����/���t}Y[����b�h�Q����s,_ٱ�Z�����,%n���J�C[/T�*u*�"�f�{��}{8� %^Wv��R?��~jm}��G+�!:��N���)���ZB��1!� up|�g��_�+O� 튈�
$��Ҽ>��Q����:q��� Ut�'�(�;�8	xh>��    \|�o�y�7����x_4�%���b0m3���rHd��'e��J�z:~=��,Ɠ
�������IB�ʸw#tC��~����'�8��)��I>��qU� �xq�y��%���(Yqm����W}p��<��ʖ7��1lJ�͂ ?�@z+������X��wx�cPK��7'��1�N_^i��Q��g��%���9J��9�Q�
1��D$8z5NF�eۏB`�Iܿ����%�A� ����a�U��q���Ɂ�
�����t�z�n6qV���7�e�$Ԛk{c�r@�9�-���|���,'P�d��4!�O>wq���ˡʷ��f`�|"���O�ݸ���j��~���g�bЈ�O�A�t9\�®��;\�wʮ�kfN:��� ��C/���#�)=R�$`�%�'�/�	�GQgF$��P�y�?��?���Mt-��mx?z��]���b���ȴD�n{V� �;<:O>��һ���޼�kY�|27�7ݐ/s���"B�I0��<�ww��i}w���%�tb�W}�:e�un���c~�i��:2�R�_6�H��E��)�r�J���웓�({J���C=�PI�yZ*tV.��4�v�=Y]�bc�VU�$��T�l����5�����Y՗�aq�ZH������ш�1�J�k'�d������#Ζ����`>7�!)�����E��\�S����(�r�vRw��9/ "���k��\������h���0w<��U�r-���M��ôd�GZa]�`-I��l|�5��d�!���N:>�_.'��h65�X�k<��g��]>�3��l�hr��G����a�$M�e�
�{9�m�>}Ǖ%|���k_l

8��#=��x9��#�Gx����`�%�6�%��C�Ri�Yn�F����L»��2���~D|RwQ���x�sg���Q5���Q��AԨ=��'����&.b�\�?�^��-yLR�]]��M9��l��[:-����kll�c=%{:���~��<�����G�^F p�a�^�j|�Z�)��}������S� ��_��_r��������~����֚� ��	�;2�� I_<�L�����\�m�����ɑ�l����,%.�0b�e_�6q��+����h�Q�	&	��v���DF#�]���r\O�ɞ+�Gza&�1���F���]��{�ǩL��z�т&��U��	z�:���*�;$!�:ޅ]�M���s�"l	��wgτ�����Y6+���0��"!h�4o��,��Ȳ�������h�tI.b�J����p	qx���2����yPi!D_�&XL�
Y?�(����yP���;l�����T��Ӌ�܊\Rb]����x��y�������n~Fl����q̻`R}�0��A�������`���qy��gz����MR�F���w�t�.�!N&�&Ʊ�!]-��]Ω���q�-5����Wn���)�%�Weٻ}���w��K�s����D��]���7��r����U	DN��0?Og������Ffv�u\��$c|��%ѳ�n^��m�"��0E�!���1�C:L�Wo��s�3{����p۷z�m%��*ES}d�s���6��5�i)�IO�pCؔ��sׯ��~PΘ��X8�M-[�i{E���Y��vcf)Q�<`�!��a���2��_��Q���fq�'ʭ�	����l�h�4 �(�5��70����F	�{������r�� :cX�mR��ٻ�ZNp��M.{"vn��"���@�w���	q ����y`������Yj�%��r�8j8�V	՘�)�L&+�ԇj_R��\5Qr>,��Ę�����*8�&��;,]�RG�$ix��f�j�9K�="�)�jI}�:m�OxV�/W����kx�����hE� ��2�G�gb�U��;��n�5Y��Zp��M��Ȣ%9i��}���O�M6�&>�8�(G�{0���8������>���:EP��VYH*{C-2�X}Z�Z;���;ɷRVo�h���y
0���hJfM�e\/�%vn8Ziـ��A�lK�����U+�	����v�%iڣ��k����"6��	�)�4�lJ�pS~�C�Z&����S
����^���Ћ����7(�N�l3^rz�e��5h�����GE�C��`RоG���g�ډ=R���S� ��0�ilQ��K��6�y�ظ�Jq�ͫ_`K){��<8Ϸ��Ǫ���3��^��$_�b�;����S$=�{=�f�j���c@\2;����j2d��� �������Og�e�s؝X~�.G�O�Ҹ^�<k��;�I���W��\���ױ�7pF�lF]:#0�	H*�_��S�t\��d�}�����d��������"���縠o|�t������S�y V�z��m�=g;X� �
�\Ń�n	;x�����E:�!�"*	EL�}O����H]b+��9���f�N�=c�؎R=�p�j���n��`-K���������c��p� �J�QJ��pDN���eE ��d�W� 0��ve�q1���ͷ	�U6Vº$M�GN̓�8J��Ϥ���z�A����N|��E�ZFŅ�	��l#~��:k��MɲU�	)�1�q���X��?,g�����f��a�����|1��(4��Z�˾˲�i�?�V�E�q]��V����"���c�H�;	�K�i���Qe�-~��i��|�]�=I�*k���5l�ھyo4����V�0�,�Di��2�G"$�����Г�1�D�J.%���R���t`Y+���N��1:�-���xg&&�G�$��aF�����d��l7�l�&&�6J�,������xF�)=��ٴR��f�8�&�)��?n;��8F��`u�T�?�p�:26}�#���7�F�%���qF��<�Ǿ^tz!���Q6.#�ݫ��{���3zr�y'tOnqk�K��_J���@k׬�CXC�x�UƘ�"�Ύ^ja�"�R����Ź-�d���l2��(��"�y2��|[�%ba�1�܌��͉��du	�l��:�ּ��HW��L�:�?̷A��:9��'B��n�g"�5~��K��
���Q�w�ᒹ1��0,��G��l}@j(�RP8�"�mq%�q�c���r��A�;+�v����h�,޹��^�!�UJ_�1w,zn�Xw�VJ ��og��΀1�H�����W�>���"�Ω^���y����d��C���F�k�9�&/��"��Xg��Ń��W*q�%�^ׯU�;7���efS�s�
%�爁
?�5�>�u�Ⲙ��4�phn���H���T����ѥl	݆�3����y4�*� ��%27i���Ml[4�.Y����M[B��`��O� ߳�9f0\.'m?
>o1�r�y��U,��]V`F!u�	���f�V��b�]��\p$#�4�Y4)��N32����B����� Π)��	y�;|�ֹ�B�4���m���~��~��?J�&Ϣ�4W��"�j��KB�Pq�l4�H�0�C�w#+�&�7� 1�<l	��I������W*7#��oz?�݁���s�y�Owpǅu@y�v95�����#SE����z;�A�z�WΔ5\�}��3����F�&��6ܻ�T�iz����n~���\�V�ֺވ��n�].TH=��z�W���a�"N�<K[ܤ�v�KF�6�@�{�ɕ��s���:̝�a��Ł=��Q$f$�s�B�t++v:R�n�[9k���aU���j_-5c�=_QM��/���Ҕu��r{|=o��N����d$b���P]/��l��v�B#���5>�ǘ����f�.�g_�'���!q����h]h���
����-=��x�nM�>��:;Yp��;��1�ab�����t������S���~�vጳ��+CG��$/�D�|�I�W��>�\�ՠ�ԪOj���A'�����LUql>��C���J]�1����`�Z�M�y�_	��#���    _!�!ߞ
�	�0��GS2�� �(Ж��|�q��=%V	�-÷Wx~������93��ڣ$�1˹�������lG3�<Z.F�Ak�-�o��!�]�=� ����p�j<�/Ƌ���7�S�p�����n&���K6,ǟU�2r���C��_�iH���v�]
*ȃ�X�#�<(���Kh�a��zwp�2�T}uͣ[?��t����t\â���G,F9���|w!��{�?�ɾK:FΩfػ݅�%�f^�}G����DCD�K"�D�!��`&yJ ��� Dȁ�DUX>���Np�tZ��`K�B�L��JmH�*���I���}�Vz�H6Wy|�%�����dM�ܵ1/2�/G&����{��gr��o1�yB �v�)�^e)��g�e��(G$s��b�r�I\�����L��>�V+*���
�A.�G�B���P�#%M�+��,�}�|T�o�c�`#�<	1����
�=�u����/����=��?Q"�yb�tO��r~��;�!��}xMv����L�8�&�����'�	�4#���ԮT�C]8�F{�!0e�I#�L��퓂�v�Z���3�l�m?��F�zE�h4E�	�����j��h��S�z��#��<|5\��eۏB��p
��O)x�`�b$���V3w2PNp횖0sV�XM�F��OS�AX�Xg;׊uy|4�"jDi��K<��y�3)�UQޣ<O6���t��	'�轿K;[t�h��V��Q{qyL&��`d?��l�1<�9���j���4�Ar&[�yy�����2�����m�<�ʪ��`��5��iwGn�e��'	�������U<Ekby�-���r��Ekw.s�N(
��͒�����C>��Dە��}j$ŷ��ɣ'Co��}yiO��m�����~=��؁�,�,���4w`�>��8 @�c	�x�^�-X;���IN��T�y��SwS�^��\��}���x$�w�x���Xٗ,�'�f����&��GD.����2���Ypi�x��4$bE��[�;$�C���ߑJ���W?%���F��[�f�f���>��n^'fbxd�yB�^����N���>�d�;&丝�#����k���Y(���g\b��7��4RPD�C�s:}]�fe;�<,�V�������M �}�`juz���z�YhN�����G~ASSs��h�{��8)��q�_���[�|�k�F\�ӧQF(���nM �7B��l�S���NR��m�yc���z>�7c%��+�X�bi7��V�mS4M�S�&�����w"gBǳ�� ��o��Ñ�^��wɣA��/B@�G�ִ�3"yΎ��><T6��/NK OLeOD�G��Z������^��!Y�f�5O��Ge����'��r96r�N.9�������ɫ�l9�M�~��B]k6\�3��a��@���0��v�4.l��:�;A�3w�B[��+q.�/�8��3�{�x��'_��%�����e��UT�x����0�#���p��&��uU�w!��t&��tqX�Ɏ�ab'�o���V���B�HY�ĵ%�w�[����p�7{��d���y����	O���Irx�2F~f��k�@�u�&���Sj|��m�+�-�n|�nt�7��۫{�0�]�N����[���(:�Frk��o�I��S4�G�):���i&���N�T@@����ν��),48e�tl��d���ށ~ {"�>Qk�c�Kn�@7&Z?�A�'�k�N�+!��P�z*x3�13:*�w��dESN�cE�gobR��A��6�'͍���se[B���{Zb1��*����f�ŕdU�S,'��<U�"�1�"mN��ݙqv�u<�"� "�蕑�D��f8@i���J�4���0�+usM���m�������?'�����y��~�j���F�e�Q�+�o��Nn�9�U0q�����$%Dg��:��͇��n��35�]�����c)����sk��e%Jgo���QE��<�4�ع���_���)��D���J��w��НD_��ى�Z�ιS�]�#a�@P��z����6U�\��<U/�r���Z�Hw��A-� {��'z�SΖ��EI��7���19^2���`�l��_���Cr4�����(�Ye���<i�%3�$I�3鲣��t��&�,�	���X�^.��Ir�9؆�@7�cݢ�0j�v�l2?�����rJ�<�l�j.�ћ��y�q���D��ľ���H�,e���P]���V�N�m<����Fz�BSh�o'9�-~�xS�;��?O1	�"��-����@H�������]ܔ�պEpr�u3Ȏ&GC�A�����И�jp�K�L��Ҡffj�RdEń�,�����u��b�2��d�q [
w��)�U;9�
�J�����kƗʞ�+�Bu���,.y�qD,��;7�.:��a��Hfre��g$����gqqu{�,rB>��q���jga���4��AU�bd'�)&v6I5��fّR��jXxIl#�&ս{v�Y���+W]�!e2�Ju@RUW�U���|9#v�Zo��r�_��e2�����!�u4۬�d�Y�>_�ڱ0��p����8�q0g�{�&(�$Ψ��W�t�\�'�b{W�)O"��!7]������W;������Y�^��0�c�<=�~�|���@�Rs	�箋�a7O@�z�Gj@(�-��q���L�pF�{�,ڊR�h�`yt��#�tm*�?/c�ʰɀ�%1=gc*�L��O�mu�Q�����ӆ�����Zí��`�� ��jL�1�M�3:ޛ��)^g6Zv������'�seC��$�O��r��$�5��x����$' s�������4�D�\bn�0�[����#�J����ym�ɜ�Y�h.?���J��2UhLNX�f�Iy����sm��!mE׽��,B�)�;��P�mNx�չ�H4���Rp��8ɶ}��h�I{_H���%����D%���,���
��<f&/�l��1_�G�s1���l05�7k�	/ƃ���f�4�Ⱥ��l�e/��^ �]�[�[��(��PϞ�*��(p�k��� ��L(2�8���9ê�n�5���0]6l���ޟ��c�	�� m����<g)�ձ��D��\|1��G�	�Ǥ�\�¨u^���f���Xf���������p8���Y5��z�J+w�{	��渒�P#9�O+>��m���D����E)gK�=�`�P���=6f���qyXhİ��fWo���k>kJ۩�6C$O�����l���?����	X��KX�ͰB.G����� �j�.�W�@�"S/W�r�� ��S
k��N���b��L�����v4�g��ד٫�l9O�~dn3L�ſ��ӆ�>D8�K����`k�|��凃�t�3�ߠ������ߧ�������#"��H�7�����hv���8��B���f�������ېE�����v%q\A�3�K#[w'��3��7|����ʗ@�m��5=�D��2G����G�7R1��S8t�����m�O�1���>nR������B�_5��=���oMv��LY���-�'�!�L�TY~u�Hmz�i�7�܌5,c�:j{!�Qr����!� "�]�TXzǨx �z��.��/Iˌp�� ������49f3�O���`�����O�^oF�k�P�?i��J��b��K�ą�����q�aN��^%�!�F�>�	5#��މv������d4�.�#�����,�c��������h1��?���������FǓEn�~DS'��Z�/>$�F��B5.V���1*�cC�6�G�EM-O��Ѻ��h���p���!���i�+�w�)Ky+����,m�6����}�|Q��m��	�BRX�V�+���}��q!��'-h?���Ꜯ!�@�*N$��� �]H��=h��d��댧ɰD��y�H9[�!7    ��S�ٚ�x�C��c�*�E�]���\F�5`GT��MI�Y�Չ/��K���ތ����7< �m<;�	��#��-���w�r�1ڦ$ k\��?$9�m�n0��^�|� �����@>��#���
�sGI �b+>!�]({9A���"��$��6K*���O��00p�Ɔb1Jrĝ_���0G��a�e��I��F�QVLu�T{a�/�����G����b>�]C�j
��˟:,�����1o���8z_���b����i��Lo|�XQ�k0��A��[��/=bf��3��Ѣ�G����e6���+h��`�38�z>��(:h��r���g3��U\\P��6�~t�{�;�1W�>�A����+�|��%Vs�o�I�T�vk
Ԗ��r�a%3�Iu��c��,�y�p�v`��?lA����~�����@�6�󘨠�
���4�w�,��q=��k��pH�x��� �������P]UG���6����*�Z��۸���<���΍����.��V�)�>�� ��K�x�x�u*5G��?��n��B'x	wLIw�aA\^������nJ2�j�=Var�e��~��i�/���F*�a�(9�L�C.�pX�q�̅!��q���K�������������
���&��j<.���5����8O�+��l�c$p&f-�W�N�M�ܖ/ �3��>� ><;6&j��BE�C�%�Y����]gV [^��-����Xa���γZ��q�Y~��_+�pl�J2��D���Yt��$}�/�WOiK�.}�U=�?E����_��-ܪ�*��\�jWk7�����*�/"�2*�Id�Vgu5���w��7b՗UT�^��,�&s�����r|�l�&� �4~*!��Qf�*CB&ņ��e�#Ryב���}XG2Ye#MI�%�&7�+�^H�!2М����k��|�6^�b�z4{=���O�w�m?
p�Wؼ�����;P�VW��hu~-<F#�V�N�W���'Fz���5 Ɯ�C�=��͝$IjMR
J�1U��z�� ��ݒ���wy�9[#�<]oY����_�W��t���.��6ῖ�G\�z�ewM�����xӥ����O>����6���<_�r*�!�&��2�1�s
�h����nl�P�S$j^��N���^�=e�D�Zp�k�9OoU���Jk��6QnU� A�XA���i�?r�<&��>��@��c��-x^���4k�[��ӵ
�/m�g��T���NR8�dc/�������ՇS�K����H\YP������>% v��A0�o����^�U8����̓{�
`��8�Vґ*�ه��9H�F�D�c�K��
����Z��$|�2�N�y_L(dI�W��^�{�ʎb!۲6�Bw�>�
6�%���M�s�v����EM��N�.^�����r����ox&�c��LQu��/XK>CE�ZJ���5�y"!�	t�"L��2J�8@gE�_q��aGأ�~�Q����6Y�9eb��E9l�؃wJh�S���S�a��Qf�����E�`�,ɏ9	e�nXlE��Ț0Ϙ쬷ULc���u
\�h��j=�,K��JC�n�n�/+Վ�2���>�6qL'i0�,�]��[��6�.1.b�z���vϜ;Dg���E�3���#X�mB�b50�c4�[��FM�C�XE�T@��K�0�9��ύ��Af�rӘ=bԀ ��zs���:��˫�It`����x|�z��$���t���j��u#`��w�6TV���f��j�LvDہ�L��!���i �ͳ�{�d������ߙ��w���R�Y�:i���B�0��g���c�ħ�Q�$q�Q��ʇؽZ\��l�S�ci@��<t�y�d'/*�p���yu�X!��	�;��6��L�a	3dz��݊�1�v�:��1�Z*��QQ�{���%�3�6v�n��s�fd ;!��Nm8Y+��*�l��z�n�CG�lB�{T�n��:g�-E�C�F�;,7�.}�����������&M@?/�1�N�@����pda�a��3�jfl��Վt:Ӈ����>*g\W����t|kJ��B8��q��9@k��i�eK8�	��z�;i�tL���^��=&��r���G�u@�e>w�������!�Oe��Y�c�,�Y�`HW&��y>W��Ƥ�6v�Mi��i,�Wn�Bk���*j��j���gq��s>��|�)d,�o���gm;������<�%!�Z��+��кCt��RO�-�{��J8�ŲpwA��t��p���?��7�{�gL�&��惩�'zT=��3[�C�*E�*89��+����ǜJ�W�X��^��֜�*���)�����A~Fb��ke)��2���S0��Q�BE[������Q9<3��|�a9[�f��`�B�9�͗�!&l���������`6��m?
p&�6v������}����x��Y��1O�.���!�N�m�}�Am�*�f�E]Fl�8�F��@���`m�١�f���'5Tz����$�n��f�}��in���⼆���sK}*��W��x(j�%L6��oD:C<f2�#;��r�t�͸���#�u|M�_��h�]��[8�v����֝'��̨Z��Û���a?<V� �n԰�� Ͽ���F�6��+��<�Z�B8�t;�܍��Mc��#'xK�˰�Y�rO�U������@|1e���=�s��H4!-m�G���mQC7Ҫ �)�Rd����e䑕G�~Pi�uXz�����Mi���t�t"g}}�
��C��w����r�$%p+Ni%�J�F�|S챮��4�RG�:~�o志�{McY�+�'��%�`�x0�Q	�lѼ�`;�Wo�/�|���\l���;(`�%L�oϭy�9m�D�x8	�9�7��f��q�Y)�Ʉ��� 2%!�a��.��@�ٹ�f縈����齒Jy����3��1�+�v�.6@N��Ѭ�'A�ִ�������� G��8^�ޞ
骡3���E�Q�#�h�e
,�\���ܖ���f�d+��R�m�$Ãt�|�ӟHc��|�L�1�4b��+�'�U�f�H����"��㘴՚k]g�3�E@���bt��D��T�=$�bS�۰�9 q��@�{��`�<� ����_4�v�r�rK
�L��ѝqt��-�!�֭���h�>�"~J��ć%
^���D�iۍlߦ��WJX]д�Q�PX��s�H���{"�-��
�9\��_���K�3��69��[/�:��*]`t��z��M�w*�y��4n���7;.�3�.�:��[\�����vT^����˱� �?J<�#�I7^�{)���'�m��h�H��R���ۈ�����u�-�$��%ma�r8�L��G��t�Mڿ%�d�'����LZ~DHM ����e�k��ޓk�B8^�Ћ��#v��/	VvM�Ξ�Gqvq��;8������9L��i搑g�|�Z�<L���S�(v��k�upp�s����r`�e4�=>b�A����aQxF\9�1���M��tj�<`���ڱ���"	�8�~�d�7���:z�E��60����<b2^7���B-��0?�.ܒ�7�ti.`�I���)7��^�I�j�-㎶.�b�Ir��m�E}Ԟ�����zY����)e��D�+{�u��y�~��p��E=��$%��%�wɵ/��ԕ�5Z�����M�Mt�;w̩e2\e��]�nM:ۚi/�1H�k�`�A0W;�=��Fi��j�I@Z�I���CT.2�c~�k��>s��GtX�1�D�[���ϲ�WZG�}:m�R���4�K
�S}��ǩ�S�ݝ���s�t�J�m�C׾$*#��4����	��`k��Q;J)u8�GVSo��P"W���5�TF��d0F.��n�j������ q��yO3���}8�h���#� ����)��Q�r�����߲pMXd���#p��c
#x������/�}-�l����N��=��>_    82 ��.d�j8BЀ�K��!�Ä�3�,�m�z�>����� ^��WU�2��R%�1뽉`�p���'$�dh������ۏq��d�N�n3^�t��_�X�X��O�J�E勴ş�*�%�6�BV=hn�)5�{���8=n�de�'}w<F�{2�ĐX�G�؁é~�.�lA����y��b�˔�qG0'��p��F���ǒɽ��}O���" ��PE=LA�tn@��Z��R�@�1�P��M4���S^64��8Sl�܎�`D��nQDD�d�pƍ�BH!�8"ov���xe��n#����ēg�)mkw�f�Z�?�<�ڞ�S��±V�MyL_K��(I�[��!�D��^_}Hn�/8o�]�rX	fWl�I�sSTZ���;���ʇ�;�?<��Mr�n���S���Qe�T �պz�[�Θ"7J�=�a��O������O�&��JZ�V��X�3'ո`'����e��F[����v'��x�/��[���g�{վ:I�w��e8[^!n�t��Y�U�)�>L��r�B����	V���P�բr6(1�L��'�W��t>*��x?��~�w�_�F;8�[��i}��x0����l0^�o�P�I����ѫ�`)�nӏ�ˎ&S΀� �'�laoo��3�*�<������R���C'x
3���B���ꏳ�\��{T���݉�]SRMd�Y����)�������{���H|�ֆ3�ӆC[��ޖ�,�����( ��ST`��ɢpb��=.5x�kL1�Qq��*�����m�_%�����Q�+�mYiV4N���I`� ���GA��6�pB��w#[D�]|��wT��oʓ�p��Mp��-|Ip�V�@ß���Y��.��b��p5f�]�$K��b����Y�����#�t9O{��_w�6d���p�y}�~�1R>���1�rsε$W��6<�up��ID����Gze$:2���'�ú�;��}���z�H�����[ۓ�NG�]/���s��ݐ@���)�]'�
eEm�.M
�DE���*��h��I
������}�g�o���]�atT��j3m��Z��Sd`X�F�==�PH�%oe��T�$�K��^ȯ�B;+�v� ��oζ>����'�H{Y䛒�41��1a��:yz[�,ܜ����)���A��L(���4��ܡ��:�Qٖ2��?��rxFŧQ��=g�Q�_tNB؆��ď��E��5(��r)�w�d�,]3���Hm(�R��n�:a=�]N|K����͔Q(�G�B�d8�f��5.|QQ�� �0�h�c�ݣ�G.i��s��{ϲR�#�T�T���ϔ�G����G��7���ѳ�3'f��rB2�X7R{2��|[�3���6����Ɛ���ܟ��Y����)B�A;�����r]��D���`v��87�b�:���ac6�G�����ä2]G�A��	�J]j|&�L��-M���0����'OV=77���\���ȩ�O���q�o~����&�𡿿{��wom9�MF���Ga��n{h���g�q7����Z6� _���Z��H����2�Q�5���`�����l����w�
|�A \�  ݻ���w�VD�~턹p�ϩ��e��06%��L*M9�Y��R�M����^׆�)@9�w�Mcv�.�'n��T���q�kH�
�In�����Z��<6C�iE°�A��c��,�$ -�ݽ�����ô����ZP�,�ѫ�b�#���р|�~��‶�"��?���"����F���nz�N+�S��(F2�[7Q����c��Ny����e�|Dp��6+y<�!/����Qς�UeIEݏi�]i�k�t�&�����P��>!�ӫ[�z�*ř��=��?���?+���ԣA=<�'���j�\s{#TC�%�T�τ�Ap��<���9:�-<Ɠ�|>ǒL�_���0X��4�ޏBh�͆�7�-mH������z��"%�]�s|��a��Y�eX�M%'�Y����P1��Ң�O�#�@�Y����;���s��4!ЄK�Ѓ3	1h�%��꽬[̻F�&Ux�2�_H|Q	�gL%�54����Rv��RbV��P���f<�l�xG��6�Dy����1�~��z�2�miy��=��kz�|��*��r��i�P)���6��,�Z�
�飜�f��V��~� :��?tS���u�B��U||�է*֯�k���i�3����#`~��n�d�Ȃ��ؓ�N�yF�&)-��^T[��Ҷ�s�ɼe���8Z���p玊���:(�m�K6H� �vG�i�L�D|5�U��b����}���z����-ϊZeّ��pR$�>-��X���!qe.�jT[	��Ge(�+7�9Ԡ3�2x^�-��i��n�U���6ҷ��Ru9=
UOpv����`#��5�ewn>*�7����;�xF��<����e��WL�[M��rv��˫���=���JM@��6����E���(|�lo+C�\�	���y�
9�Ǯ�F>Q��4w��(;[�]�f{���pB������b>��Sq�c��у��'�W��r:��(�q��������;[��M�F�z��(��'���[?WH�VX	sS�1-�<9�K ����Y�ǵɎnZ�y<V>���w�taI%ʴ~Eõ���2��?¦�r�1��B>��GX��������z�X���~����.��A=P�v{��)N�'#G��?�"\�5yݴ���"?sT5������K��v�].����������MJˋ��T������?~D��m���?M]孾���砅�}��69p��9UU���j�Z�
U%��tv��z�c�*�&�0���̒ft�|8�[Х��p1��+�Ǔ?0��.����p�j�\�F��?�%�rp�q�#FWvPa3X� T����$�[*�/S7q3���>�y;��͟m���m��[A�xSE����8��a��yo��L'��l��4�}<(e�p�pv�ף�����p4.m?2n��8��[�;x������|GU���C���{�k�G��|<��ZҾ���{$����C�����^��o���C�v�l0�O�e�{�Z	
I���u�Ȯ�+�%�������l�T�*[���JɭX�U�wl�bkJ%�З����5����>�I�����|�c���1?u���d� ɺ���}V�a?��.پ���O���?f}�>�l�Ӟ'���$��A�0����O�r���vAH�G��8d�3�8QkyRJRfC[��c��S3��)�������b$a1�/���p2[�u���r1
����/�94s�xw��Qٗ�.`Rj��H? �de4n6=�X�����1�I��k�����:�_MEp�+����_.$��l����"@@�`��e����G�q�5�w����wʚ��D�m��
�·�<	�ՍE�����q%�'a�E�L���	���bsa����2+!��Pt"��Z�|�h�N�v��.(�#��2ΐڋ��6������ZW���V;D|�^I���A���$��L�r�\�f����F8Vk�����R�4��
�o����5m�d<�.P6��,����e;��]�QT��"�ׁ�D���J��u&ꃖ��"Y�l�B�>Z����w����Wp$*I���P�r'������/J̭�C�!��B��X���>^����*Z'��r��Ɠ�6��7�h��!1��$�_�b^��-��H��w�'�3����G��P��r�:��t8ֵ����?l�k��K_�O�NBjߩ����F����g����3`.E9&m9ￓg���N���Ż,?��[,���6�B�Ћ��R���+������%.�oκo�ڝb����-�oR��,��e<��u��+Kv�P�>�鵏�����[��j�Rw�C�ͅ�)}��h��yc�i.�J�qFG!G��m��!�    ������5\��}ghěQj[��`�̱Yk�x=\���&Ӊ�����x�_�ƯG�W��l:�Vk[�r��R��h:�Qw�Oe��w���ǻ����ҋZ��H��N!�?D�F-���l�+(AO��$�� �^�A/�L���~�?��S��gp���p2���q�����b�
��)y�JS���������78^Ơ����ԶP��%;�m���.)�1�B�EmF���o����`o_VN_�^���CN��#��c�6q	ꁖ����@�A^"��`�E��)N ���;%�v��{%����Ey����_��50��^��$8�� ȋ��e��e���^olf{���]����`�w>�n��*��l0e۾8��, �1����)B�`��H�R��v�o$T׼��b'�!�mQ���z����%�n��Y:^f>���_R;U�D!��NH�	\����.A>�Tu�!�,�B�f�ð�v����*��Wp<}އ>�C�M�!��N���u���a�N�u(D �3�	8: �w韥#p�w1M�g�Е�_���m)�uv��kM��<�?{׆0��DH}s��j1�]���}*�G�;K�>&�	v��;k6�M&�J��<fta��n'��fb*��3b���dq�����kX�-֓��[�]���� E-��Ϙx(�SF(�]��]��a�f��N���d��O�܎��z8��� �~�/�?���;-/�o���!�R�>#��]S�XC�[�ƅ1v��ߩ�p�Q�o�"i�Ɓ/�//3.�3<e<c��q���ڋS��]�d2Q�;���.
��r ���M�'� �8K~�/��͟b+r�wR�>)c�U�%�p3�Rg$Ӭ ����9>���Ł�l:����.�����*���h�h�O̠�/O�Uq��������;��.�9��'�%d6�� M3O<��<��L�sY2DD\_��j�z�N�J���Ne١���X�3��C����v�g��48!�8���$]��0��������j�uoU����l���� @���)M�J���)���̧}�X�8��������.b�=�1T��'�F>�X����a��>b��\?�4���;�!���?2%i3�N�A.on��o�,gC$����@Mǋ�d��\�k{���/wέ3c5~��l�������ɨ�GҒ%yI�?Iq8�.���dsJg[[�r惔�����t��P�b�)=���6����D�t����,��c��<y���ޖڱ�G�]tS�+
a����
��T��-�ne����I{o�k�ن	@��Vs9Ҏ�4	%���5JB[�3"V��>�󙽤��[�֑���!ݝ�W*m��@I e�7�����]�^R�Jt���6��}�*��4��6A#:��DӅ5VĉA��ȋU�0�=Zh� HN"b�3C������V�~�Sr4�#�K׍�aIڢ-�/	dC��7u�IdnK5p�L��W�?C���������qkP)���^�;��i�=(���}�-���$�>��$ާ[D�x+�&��3˥9	����5W�����,G��}����!_��z;n��D�g"hI�v5PS��QR���P�byc>׫��|���~7�d� `%.�M�\26�*��}���NT�<!k�f�-Bd��5��uL�*�:��{/���͝N���T(�(=���0�Z��ln&\��n8���+^��7)����Ӳ�c�d���pL'��1<ZnP���9*D�Q�c"bX�֢yk#�e�,M�X�@���r�O���I�F-�W,�}��VV��d9��(�G��@'қc�EХ�*=�d4�&[y�<�b�*Hy��5��	Έ��;�#OR�z�W����k�JB��ct�������l�]�\2��g>�
2~>���۶|����t��@@�L�	ۈ��Đ�s�N�4pbH�`�r��*��5�{�w�L�5a4��}�&�-+�Z��Uj�E���0���`إ���?�����i�&��\U�,�3y�`��WݹkEd7��VuH+�ǜ��
�_�"�0b�F�q�<3�"o�C���������h!|i����]���\��z#������ڽL����Tܞ�w��m*�S��k��е��̺6e�j��B�j��OP����f�q��	IC�.�6V��eg���;����pT����#��i�c��/Ȝ��)�ew��(��>[l�Uȟ��0�m���]%�WNk�i� m�q�46��~�{v�D@����\l�<�C���ܪ�t��*��8�t�]Вߺ�?3��<z�w�� xN��B�d��Eq1��U$Ǔ�h��bgm{7z�u��{b�g{�rY���]�Fs��������k���w�<�/�?�Pqܢp��Z�k�{x�B��C����ȁ��G\�
G�,��������7o��Wbe���(*r�|e$Q�I��{@��L�Q�4s�l��"����ߓ�E�fп	���Z��:{!������H�5SY7�%34~˲�˖�x/��?��b�ƭ�]�.g���[X��Y�doW��<0`����劉	O����A�]f�?ue��SFe� �F�x�4��~�(Z�90F�|�K��d~������lx.:i4����Շ8��rwŕ.1�{�&�/̪+dc��B�EW���-B���͑3�2�� ?����3��\������Ĭ3>�2���@�jP����&}xD��W�m5��g�>�Lĝv٩P�q\�5ڑ�`�M4�n��ޢ�b>#���S�$��M�ȣ׃��r9��G�{?:�M7�1[h7��ڍ¶(BOV*�ߌ�c��d����F�&.�E�9��4�D�A�By�Ǽ43"ž�&뭑���"ꉁ8E����F�ߌz\Ӑ!��L7���k�N~ln��r��a�]T�t�u,�=1z�2���"�+И�z{�Y_�O|�����J�����a�Ѡ�&}���@��1m��`���lZ�ΗN�~�1�����[�c/���l����(f�Mʳ� ~߯'2���x�q���v52 &��Z�u�m΂m���n��r�i�u�S@"TC�2_�;�1���}LI20r ��M�b	,��F�{�;�h`ǚN
3����g�mG����� U�����Ҩ�W�#���뢬�ڪH����!5R�\YA���\��&4���2��U9g��5��-k�M��=���|����C�RhRu�j.L@0�ɿE�����v!C�Z\U{��-h�fv�I8A)�JL�L�wMs����^�B���3W����1��t|��\�b��MÉ��.~��^���5ň��nC�m�l���ݞ]�=���j���hڦ�i�����|���9ݡ��\y��p8O���u�MGl�����"V�4��_O����)<��GTR����2��>�x���� �<5F�K��yn�Yr��W�2�yo�(5�8��'����Ia�໷P���t���S�!8�4�M2�{�7�&�#Kw�H��t0�����0m�P���٤�G_C���}2�n	m
��'T�^�׫m�W�}�±���C��p*�y
�'3�@�B�4S�'Do��D%p��ĺ1���Z1y�jܔ�d�T�����%XL��X��)y�e����nqT�~g�6�\��_a���/7�!@�S��ũx{�7X5��=�ru*�{����x�hݗt��E��iC�
�K���Q�c��u�B���ʞ]���K]m�l\7@�$�`w��^�F�)hV	�����]��6Ή��V\�'�I�8�g���G�[5\�Ln͖�ɲ<������7 �H�qEdhG�iϱ�X`i����y�lÊ�#�
]Gw�}�YgL��^>�2χ��NOG��a��I���٦��x�P�wϧ��`���g�)��ʼ'qM*3Җ���W��|6����e�C��r<.<ZYb
`#ǝ�ZT� 7;�pX>M��^���;�$�)���B�|��6    �ݝ�\|�N-Ƌ��S����e!� &`e��kC5��t�%�Qv��M}C>7O<�1����ɧ�/�`=�uX�N_N�su���yi��P���d0�V��0����x��&C0)��G�y���5K�@8�O�]��=AL�]"��{��caX��������z8^;J�1z	mx�ֶ��X�;p�R��(	W�1�/��M;��r�(«sw����wv1��|�����a�.�Wʩ,�u����m��{�V��Z5�!.�=/=�ѳXl��,��w��82ӷ���.z�d ����s�a���{�J��t��,u�Du���n3Z'�u>��p<�ur�?GG
�:{�h���,p��.@(BQ>l���:�c�fdU��0�&�9�T�!� ��a���T�ƪ�גּ2 b~"�2Rr�6�/f�`r*�r��buB;Y�K����%�e*}��v�u�t9_R����M܇u�l���~O��Ѩ�^��f<����0�D�xG��t<\o�AӬ�&xC���;Ӥ�d}oNL�=�Y��ҳ����ۈ-�t���)]4���jq�)�����$�SJ�7`��P��Ӫi�V�-�����-��3}�q���<f���V��,�����<����|^X@���,&��@��n)g���T���G���۹Y�3���B�����8�.z<�Fu�WQ�}�e�Œ�ty2�X���`<�-�KAU�z�h?'��]*���(�+�I��g���Ҁ�$�� �߯hA�ʽh�^�{�F�\�#�Jt=�r3x�;9���c��<��w�6˯��;%�#�����Q�����4j�	� ����W����<ڻ �:��`S���� &2��a#j=�p��"X�->���kNҝ:������c����7��c�0bڶ�rfh��h�������j��~�F*���$O��L�6;�Qz��G���?p���_�7E S'4_����6��x�X���OF��C��ׂ)�?���c������WH��D��t��2��c~���K��QU	q[Z{�`�٣�}�G�joo��zGi���^H����NyS����nHִ�w^ot��IUmlZψ���]����z'���|����F��G�1�`E���sUU�T޼���^��v�TtCҴQ�~X��V|_BU��Z�M���2��h�#���²(�{���f̆u�Pm����Wa��M�����Kg^��w���w��I�5�: G�uâ�Y����R�=l7��Zb:�o��4����
�A�)39P����'e9��&3C�������g@���x�J��̋Q���L���U���y�H�2���jo	7	�¸.A��WLUC�
2����r/��F��t�2}1��CPn�
���^-&����~d����o�n��{έ4�8K|s渚�?O���`RɌ�s�%���Kag��n zX/^��������ở�8>��	{���@M?�����`<mܞC�c�U��p����Dw^��D���F<�܌�*�<��gJ|6���F{nw�A�y�:͠��^����t�� �����B1�a�������bTԞ,�;�^�\rn�L,�	D'�|�+�[ה@��gwض�L�7�C���F��Մ���gJl0��+��t�JBQ�J�7��"I}���!��Q��ΒW3GZ:Jc�/66Ap����~#γ31�Hx�`��P3�_e�P}���0}7����~v�L�ht�`t��c�_vP.i��SIY���M6���b�Y�͘j�F��b��O����Q�8��;AV��Ӄ�M�SHB12�s�,Q�	�����c3Ho"�ǖ�2hќ�4Q�遇�.q�ׇr�m`	��NC�,5l��jz�%@2�O�s�*7�{LzY32.HύG>��Xk��,a������8��mIǯ�U6Q1,���<.�S���q�� p����z5g��UD-+���������D�O��y�=zK.��ƫ�.{�b"ە��v��V���Y��u���^L�ޝ�V���������/<ۚ�5�`;S2[E�����N`�r�{�����;�� ��h6_̱�g����U��`�j6,�e0��� 7�M��3�z�b`2�&1��F)���`��/=���v�M���PWTk�7��V���"�}&�_x�T7���[#!��y@K�_���3��q��(������D��Ȱ�0��}��!�Z"A�-���GjRS��VI����ئE������?
��P3r:n��H��VV��ȕyH9g�������7��ӣ�1he`i��\B�B)���x�ߓso��$��nDV����Ց��T�;c�]�$a�<�UD:I-o��s6�j!+
�������%$T���6)��i�U��V�tE�'5O�,���<�-�(ZY��T�6��S��&��M�gՑّ�cǠ�-ʞ��T���ө��_�ǻǸDV��PL���qJ�e��lR����0�e�SN7,��/����ʤ�'��4.J�`S|[� ��{[S`"7�5���$c�.cey
����nc�"��[�lz��I�Sy��l~�]!%3�O��"�����w�O�^T�8hC\�����L�D���)'�6:e6�f���WٌU�[O��hI]-F�Š>u5T��Io8z=!��p�X��m?
bU�wk&�|h^�������22WGC��J������T��(��D��r�8����F,����X�Ho%� H�^貊�8ڝ�.���*Of��N�t>
YԝEU�ԉP�&z��赝���6�"�s���R������}�}�)���G�6���$o<��cce��k��n���,�o|,VS
u:'�j�4&�kP� �ҕ���l�y��'�2ᩯ+�>�#x�H`�S��-�1����bH01��n���)��'o.8/?�t6��	�l���V���~��>�8�q�=���ܺ�q5	@#g��E�~3��XŊC@f�-VrU����E��<Ñ Yx	|���M{�-�:$�nH��T����鿉�qnϳ�.S~s�ج0ӳ���j2���ty.��)CY�׆�f��O�4n�D��?�-;����ߣ����!�LÚۖ��r� ����x8���ٙv� �<�Jo���x�j:^�Ǔ����x8��k��`�oTW��w����-wنLX-����i�Q_��oK)��30m��Zzݦ��Q���4�%U˛�ڞ�N^�ǯ��h2o���ð��!6�O&�G>�t�r0O��6����_�X�s��8u�,��/\�܇� A|��C��2p��:r�*`Ҽ�B��;y{t�����m����bx2�Osbb��1f]�W`��x�ѮȞ6�<�Յ���I�ј+�ەQ�JSH_!Ѣt�{H�;� �Cvd�OV"G����ľo(�bm�@�^�\=����E��j�Z���;��͑�b<�����`4],��������������� ���_��~^=��~y�4t��_tb��s��d�񴉦_�������=�}"f�ɗK`��O�!Kˬ���˫�G����e��|�i2&U�y��I�B�1X5$����M"��<ȁ�>�O�z�$��D睝��D��-[?�'ܧ��x>/&��p������i��{��g����������(���Kx+�~A�;ͤno�Fj��=8�^��yPY�ɼsl��xJ`g��gV���};��b��OK�?�����r1����h��-����4�����Q�_������HC�W A�O�%+�*7��f_��\�0�;����]��S���IyQ�⨳��1�:[���.�#9F�ۘ�'һ��q���n���/���?�O���i��7M�G�f�RMa���V��i��M��2�4h����DM�Ү���+ ���H���0��FN'�9���k�C���i��:��M�-%�P*7]��p	�z��P"#I��1"�;��[��_`c^ ���{b�+D_pS�+�w�ΚUŒi�����Um�^�b�<$�w��Œ\J� +^qBB�M�}`������d:_��    ��$�|n���~���XF-X,	�J~<��Xo��l,ѯ�����?���``%m�u�����Q��K͠R[��,��;ۻ�z�Og4�,�n���ʞ~϶�#g�����I֐;�n��)�l�%ݥ�aZ;�����X�䥼ہ
S���ʅ!�Z�"��҅��pv�6��"�.2���
�1�o��}��epq�	��s�~�+p�N�Z�@3�l�w�/K7q�=)�q�n$�����5�f=Y�/	��tïU�QC�ȏ.�%%o���Ӆ�:)y����d���?w��$ #���[�,���ț�Q�71m�U���0G��@Q�%�q�R�ζX!$	���uX��4I�Di���|��͇<��2��+5���'�Wp��e(�Gu���S�C�C#;~Þ��nc��$:��~�}=��sz8�?��R%�c��2�?=T�����~[@����)�f�)����w~:��Y5�W�^.�A+V&�4�w�A>2=���q���[��,P)Jd���&���Q
z�-]άV�2Ӥ+P2�B��3��/#Xc��~�����2�q���10'*e�`3�d�V<U-E�:b�7y�t)Y
����#��Q٧�3����u,b#��wO%���b���z�A�����Yg`�i<��@"�{o �y`"�ϴ������T��o6�f�A|z�&K���kQ�t����QW����pz>�y�=����2�B}�����(Z�ԲM��G���ʽ
J��*�Dc��΃>����c��9���\��(�S)�6O5�.rnK�}�ݙ��U��#�?	~�[�.��ڿ��;m��f�#���ڛ��������x�.�x���q2����'+�� A2���?@BR����ɫa>0�8�m�<r���=؇*��I'Ta�����v"��-~����w ���#�'�w�K�-����E����H�Hufu����z�b��N-ECA^n,f��V*�(��y�LC��c��{Z�f�SKs�k�ҵ��fG9l!�> ���L���!��������p����-��t{b?��'�>3�E�p�NV�!��G��XQ��<��T$��=@��1���Scx�X�3,��P�L&��hNӠ3�)*�5��k7 ֘M��IۏB���sv#��0���"9�����t�����R�9��N����5��]��(P�K��J!�tp�&�����ng.�m߀˵'E ��QqQÎЍUqp5�3�f��vv`!\�9}jL*�r��f3�>��i����9N��Q�]1�؛ۛ��*�o�{w��2�}A(��s�cR�4w�Ts�ވYT�%"��ŉ��>J������p�t��?l4r"��̯���W/�8�+_
f�c*��֛�)��Ҁ�Aa�~3��U�����HOhA��d	�7���h�eMC�-�V��(�Iv(��
�o��A F82����m�yȄ�G�WvA����#66\5�c�������3���&+�9?*�7���x�-��>Sh��Zq�Y�����q�+W��x&�F�bX��fD� �80�v�҃1HAͶ��q�����Z����]����L�LMG�Y+����D~�jofH�����?�]��i|�5"�j (4p��ȗ���� ��Ye�� ���x4�B �����ޑ+����a���b��b(࢔�����kyȣ�#O��aX|U�$+�ϯ�Ԭ�/+q����!J%&�@(-0�靏����^��3-Y��d1��	�wj���ɸ�Ga�! ,��ǬCIF+���3����{��+{��a��?�+� >�&C��23BK ����M  � �;P��	qx�dմ�U�HE��ɹ�z��fa�M�Jڔ"����ܭl�FW�*X��Mx{BD�Ϗ��&��L���m�w�4�ok
H�l�L$SP��~n��
������e�b�U$��)�q���i����Dd�1�M��9ϓ�fs��u�ly�ܸqM_�?׆&;t�>*�T�i�c����O�z��1�UE� �B�-,�?Դ�3m�(8@^L�~Cd�9�S[�ϗ�G���q	8
��q�b UGMl�F4��!�[�}��̍�������%��$[��Y���C�7f�4�HPoRJ�R�ԥV�����6H�$*I��J=�6f	���ɬd�/�@���}}oW�D2���簵n�[�I�	h|]͸me�=�J�c�\eO��O�!׾��C��l]�
�	"'��86��E�E6�8R�x��d�:@�Yhep�<]ǻ=F6`���|摡��= ���[�iNj��f`2� �x[���9���Z_D��@i1M��i��`� ��h�����4� �����f�p��ֽ�P*I�C>S�_��$���G-i\�P�~`%m�"�}$��q����cY�狿�VI8���MW<��9��0�<��ocF���Zb����i(f%U&r�UK��0�d�%VK��;�}��n���qɉ�߉l+h������9wx3P�p9��j=�M��G �1���RS���b��*4"f����l�k�"����z?�?
�'X�c��!�� <�
<*�/9�H���#�&�d训:n��	����9̗u��bW�b1���c���~�_~+d�W�H=:YRd�΄�A�Z0aKq4?������qp� l�߰�8�����(�g���"2N�ĳ��l����S�|�GF������ɹ�|Hz0_�C��U������-S �s���Z�U�ۙ��-��rF�m���-yjv9��ii��Y�����3*��|��U���-�����2w�f���j&���.'��X���&�E'��|h݄w���7`{f���0������:��E_�]v+�s�_R	(��"�� �2C��QkĨ���B��G�	�@��S�T��v�w����S�Bx�U,hz���yg��17�^'��X�0�N3�仇�*w��{��῁�)k�p���~ǌ4����t�������]6�]y]�[\Y��5����m�%�_�s���޾D����sV͘��S�T�d
�c�7����$j���rI	�ז>8��z�;1'��� �d_r��Rz�b/��$B���
W3
����/�EP,����	�J-w�NH;�����;_)�jl m�޷�6��\?��A?��������g>na�����5�,��A�/�\Tp�9*�׬����q��`ل��8{Q��Xk��Z�4[�����V�B�
%�N}�2n�V�Q���rG���wZPk�9����/nt�'���(�aH������̹�"�)8+H��$/��M��SQ��`��'�8���qؿ�z&Sy�)���ɞ��2�&��)`���d�?��1&�bKU�'�G)�Ny[zbUe��҄p�O���n�B���p3Ф�Ŝ��'�ɼF ��1{bp�ު�����G��O���0G	ԣI�!>��$��������MFASs��:���0�1�&�MrK�d
��+��U���<ьb�*�"C��,5ǟ>��$�mb�	W�S���3b'�5K�x'Qa}��o�g0
�(���ǻ8��ݧ7���������nn���O����S����^�޼����a:���,]�A���`ĳ�l:-������f2��a>���Q2Y��d���l6���$�&�G�Nk��6��WX�3���#S7�6�=��<�+�f+r�=X�)��n�����|��y�s>��q��y�	TXn��r�3׌�w�Lt�s^���O:�F�����Q���
�S�g��%���C����x�k�s���U��] M��0���2�8�L\cL�E��&�%�3���tB�舮`��(����;F��4���$O�p&�G�h��7��
�ţ�x�Sc�GR�z���|aK�I*E����]<h�7�'x �S���ǝ�L(*-C� �-6O��&$u�U[&�rG� hGxUn�5BE��=�:�e��tN����pV����F)�G��~C�-�4����_�l�S�T�O���tu��`������;�%u�{�    �J�U��1���/�4n?�Z��x����{w��3���蘰6���77���!֩��%���o�9�W��������(	�/ۑ^��V��B^�ˋ{���<ޙJ��xI�#N��y�[��4R�ZU�r��D��E����cX,���M�lx��.��a\Ur����¤v~0�t�5��h䣜Mƽ��Ė�#�h�^�wv��6&�.������5I�Z������2�Z����"8J�`3�6��Ӆ�����W���J:����+1]�g���_��Fb�C�-�J�8��JK��W_�������a� �vGDTcX=_�FX�(}1���4DN�qzQw�dBb:�%I�?�H�H������s_
��˂g��d٥�4���^�Cp����
f)���%���U9# �ZXe��=R��1��#�c�	�}=�YQط���5)(��X�®n�;CJ-&A
��%�:�ŭ"sEN��J03�@)	��b��W%V�����[sY�GB}:��ow<�L%�'���P$�*u��%AC9���S���I5:�K��~
���Ac�B��g�?�G��V-"��Z�)m��W)�$}SP^��#�j�V���Iֵ�������"q�?8���b׎6��0�e�u �����k�T��X���Z��z��Aݘ{5�]��^\q�����a:�Q�N�d<Iu��G$&�D�G��$|�n��h:� 5i�p<��HF����W*�j������g���Cu���֮N�}��$������:K�pcP��E>v�M�Q8A�m��y�̃(^N�x�A��A�Ϣp4�g�h�EG�ܹ�8<g>�Q��?p�\,){��W��$Y�,�O�U�`$W�0�ziZy_���c��먦&��9�NWYuM�a7�y�X�!�9�����?�IǷ�|(}�|R6Y�s�%���'u�|���m�B�H�����Օ�m��ڭ�-8(ႉd��Ӂb������w{fŹ�O�-�XF�$�E��zh�Ñj#��2��Z製+����!�M���z��"����Kx���pCݠb�.�AEj|�gx�Z#�5o�=���>�AJ:v��L���\�6��b��=G/ʊJ}���O�l�c��O�V���{c���N�)mH4�f���b�H6[e\�׎�ls�"����Mݵ���VΈB4I],�'*���I��@+��G\-Б`���)�q�[��8����L:��^h�A�0p�f����\��[+l>M���Z��>W]H����R��7��y���XV�t5Zh_.];��+��Xb�ԲC�L��Y��q$i��Ju����ż����S�^�G6�le�L8;��-+��p���n�n-!����5f��J俩UR�#+6�-WZ����
a��Tc1�������M]̯�~V�ލ!9Ť���2à����>������]~�2�q,�h��{��A
�_�f|�s����G^�cS2_���lS�)�R��>(n^'��;��̙�E�Qd;�����zG�:a�Z4�F�kV�p�:XTI�7�����1t����bwj$ZO#��"��B�Ɗ��o�Lk%�.��CU�	_/���p ��a�x�E�#Ә?I����G�����<
s)�sot��irR�qYʎ��|ކ(�^��Z�*��vb\�j|$?��5M��
f�]����OPi�Lg3�츪�4��F�ˮ��Z�hz@�����ڧ�p�jG���%U�L\68�g
[�����x� ���lL�~:����fJ�s�V�`;�G�5�2�τOc���eJ��j�q���lM��)#N�U����� ��y�g:���CI�)k��l�HZ�� !����y��pB�e���qGS�o�3P8�h���F=S�W���i�XP���UYy�asf,�`_�2jkF�4���sG׊0Z����
��m���?��O��/(�	j�÷�����{�Դ�(���KȘ� k�݇
�ĝX��F�y��ۣ��GW��t�LױQ��\�^!���,��������]�ܔ4̋����N��W]+�LI4��ݔSs�u]}�2p?E���g���]��I'ə�k4��1�����N��8j�W�/��M��'Q������6�L�U&a%/��HW������.oP1Y� �o����M�ݑ��1�N�d�����$�p�Cҽ2�
]���)��iȁ�S����(�'
[2�d��> *��Ԉ��S�\s�O�(�����@
FS��NM�	#�6ٔɃ�,Rx�ǫ���3�º� ��Sĺ��n�������3���f�	 �5!�s�)�Ā2��= 7���c&?Ȑ&��>���-@����=�8��b�(�5�>讗E�$2�=�;K��
sZ)�e���a���X�o!RJ9��%xɮ���p����f��-t^��~�I9l�zO��s��x�a��F1�gE��	�tu���)���j6�`�<vP?�*_�j�x����GϢ�TŰV��[k7�wp]��r�N:k3{~1��cV���z�>ì��w��w-�����8�#&�2�s�L��-�+�/Y���e8�\Ѡmy1V���3��g���`(w%]����!�`R��ȃfW���`�����T)�\V8s[�M@%� ��DUu
s��� 7�`��=�Y�2X6�bE?��L��$�x��GĠ������Y�8��g��I@׃w�����������@׳�<�'k8�ݐp8t�h�,7%�ז�a
Y�/奌Uz���)�y�W�!�س�^��7�����0�_���Sӵqe�rp�XQ)ϲ��F�x�u��� ��!����Jt��'�D�\i'�%8��8/��c��ѣ�[��eJ��e��T-Z���������v��ʲB����0� �pSl�E��Sц̳:F�O���*U�	���
'6���CZ�x�D�4'�Fm˦�Qt�c����>:����c�o��0�]]�Su������| r�=�݈`,�A� .�⣶m���*���!�٬�PF1�d��%�S�5��%�u�KJ�8�|E����F>��GT��p~�����(��l�U�� ��;�r�!Q�Ԋ�,r�y��u��b����zI�Mx�#̿~H'WJ.�ֽ��܊:��͗�z���"ggm+�8��\�j*�|(������� ���.h���;s�w|<�y#����f[�g�"Nn�<nK^;���C[BVS���l�q��- �]:�]����} ;�K%a0�|���b�L�/� ~�#8��%�`[�kb��v&CA�x@v�f���|@�sN;�.�v Y���@#����\�Ϲ��0�#0�(�L���x���[�&�!��ѵ��PK�,6�QY(�Ys����c	��F��B*�:.��,gg邊�Mp|���$�b�a4�Gq�k8N�
]�V>���:��8�	p{�ŧ�W�Ю�6���H.��F��g�ȋ�C�?(�������H���{E)v��;`��U�4����@�N;�w:�
E��q���p���b����2�Ƌd.��Q���l���8�
���4?�I#���b���Q�6�@ }����R�|-�M��3佤\:��k3��0�{�`In�G�'9i�~�0�D�Ĩ�O��p�F_������8���!�߽���[�����/�ټ���D��s�0��ʐ
�P��Zv��PQ��E uɊ�u�1~^�џql~��T�7�=2��_wKpe���.�v�+�O��c=��Ѹe��	����>!��׹���JA�R�E�`�B!;W����+��f��SW(���Q�p٢pǌ��3$����
.eR���P�aM��8j�I�sq�cX��z�g:m8E�� �a�#���ŀn��c�b/�t%G�Tb���,��>�f��O5��`�Tق�qh)�/��d2��L����$9���1zؖ���Y%�v����y�ܭ�mV     kߺ����`�ȟ�����*���PGF`Y&�$����~bXp�E��h/�A�GK\�}K��{�G�d<E�KQ���T�����<�σq��(��U 
'�Wd�}_z���b{pK��.]H���w�.�H�K:c��"�o��ܑ���|-˸�bA=S`R	����h<�����!x���eS�\�(��$���F^QHh�;��V����}�̽�̀.j����Z0�J���d�X��k�������BK���^|���"y=c��k���gTk�׿�^���	o��	��!k�	|gJU���<���x�Ww[�/�D� e��G%�x��ݖ<?F�y1?�ݒ�t*�"j��O`�uUbv��>��z��;rECx��e�(�8����0- n��!��8�	]^�܅p���+;�``^0����_��8��p��pv�u8��/�ɋx|�`���G>D�J�~υ؟1I:k3D:"�<�B�R��3�PG�������G�20%6�Q�����h���x��-��R.�L!�*D�+��,S!U��Kke5��T|ǣ-u�{s��|��/H�54�E�@Ik��s���l���j��8�Y�8�JZ��� ??x�~]	R���p'kA�<W��� K�5�Hdj��(8Ō��*�D�YTT)x��+i�{(�1Gó4�5�e�VwJPJ�h��:j��bW�A�*��Y�*�QBˡ1*��ń��S6];=��ZD��#���+zJ'TE�am ��⻇��;�#f($���YEX8h}��c?*�Г�Y1J:k�7[8;�-8��xJ0���r�X'k����b1�(S��7H��G0s�T����B�	�?�.P��ј2öE[/�66ן��sIQ:y��\pp(~p��U7X�k�Q\���B�D��/8�iX��m�e{.�^Z�[�'��Z�6�ʐ��qg�
>�9���o�T�qe�X��k��^���ߖ�ų#5������nF�HP�[�L���:��B����^';�~�'=�N�V��\��a��
H��z�O-VZ1��l�&�UWZ�%$�Nk3V�&�V��<�.L��Q�}u �U�v�и��� ������D�j*Uu��73S0*��`����Z�z�\EW��O��0�OW���S�@���z�~w5[�X����2���$���C�&0�z��`��5��t�4IGi4�Q���ҹP�q�L�}�;��L�Qڏ�� f4�����jڂY�nS�t�&2c��IAc����V}���=ы3|4/3u��>�~�%�ځ�ur�vi���r'�� �Fɗk���%�0	1rT� TOG�8��`�l��w��p�8�P<38��yD��[��:���ނbs���;h��ʩ!:��0�&��o&iv8��ł9�����f�V�^�%��l:a�6�GQ�����|���h����[�S�9���my�����8���u/�Z���ג�XJD��&�HUV�Ǆ2_/T^�}�s&��J����}�/������^���o������������q�����o�'�E�&��O3���i����n��Ua��I�+�S6n�t�^��V�u�P&ʬI����y��h�q;��N��x��9��<ī�սU���܃��U�c�������Xv�����9��"��*�ý������tOV)C������n�{x�Q<�-k���h��0���iW*|û����f?kT�a
�'�Q_-�҂%��~v�_m�-õ ���h�q�:������H�����=0�_�$;�.�Nf��Unǆ����7�'�u��4�}^��A�U����j�qJ�h�3�6[������q����Yi���K����뭵���cI�.��
��4���ʷ��-��Nh�vHk�����3{>�j<�A��(].��q�e��Q.���I�$�h<�2�U�W��S	�9�|���趋��]<^�*c�ξ�̤��.��5���'�������~��i_0��o���?��$$���Ta:yw{ r���� ��)IY���Ҟ��ܣ�,q�������GJ���`��p���A�H0kj��E[y�&���Ο������n� e�e�2kZ|LV�ǻR���+K��Y�y�����5d�L3{4��i]c<R
���+�<N���[<~}��7���{+��\�[�.���y�ĵ(0+<�!G���m�%p���_
���nYD���U�찰�b���\�ȁt����9���W1`�J���/��?a��1�l�J؋�ٗ0��m�כ╅��N�6��Q�zE'��'�0��T~��?#g�m-
�!&g����&����Gy�����7� f�REd�X��3O������+���e��DFh�>���>�h�\���7NMM_��;���>��^��
�]�o�)�)�=�v�CVlh���'�'�K���j�7Ŗw�������CC���w�"�C⽜�����_��)�|UZ6�W�,`J33�Z�S�ڦ5vr�Z�Wy�ky�Ԙ?2!�Yb�ܕ��վ$GwS�(B\����Esy�Q�%����^��"�B�˿,%2�j�Ec�����ٔc�la�/�8ӭ��p7*�V�&x�����*{rK>�x��²�a3�+��\�w���=ֹ�s�դ�<
��?6��*p�z������6�mV��ѝP��g�Q��\�C
_U��FO�3\}eYU��}�>���:�[Y��.0���1#vem�Opkq�6�R�,��e�(�\�y���7r_ݭK�zl�f��pg-����EWq"_�j�)b�H�P�66I�=�2�H��Rz�<<�K����k��]DM�n�3՚�ו�%�����m`��;�R ���GBX��3�NN&��+�㥩^��/��x�01������<�ׄ���G�:!�/C�'X�۶P�V��!!������VC()9�9%q)���H)�E��C�+x��W޵�a��^�#�v���(lKk�o�~)ʂ��ax�����m�Vu��˥s	�+s��R�%�ߜs�5�hC�e����Y�±�J��-J{���ݾ*� �w,v�˳�}m[�3 ��S<��3�J�,����j��qm�NPg4[vBFW�І�:�QvXorL��J�0Й���Gu{�s9�	p
�󯷈�Y��M����չ1攜#l�+P�"X��R��R�j��3�s�sJt,�|�&��W��8;��F����ٞ�����V����L��hx5�(J@��E�wN��D�D��K���u{'
����3n��Q�R�����V{�vYُ��E� U�ܩE���O2w��S�����J�5l�D�#bI���^Ih]��01@zu�5?^)�镫KE
g�����0�R�@��,)9(7�@�9���N�#Q:�����/�aw��0|F7�(O��>���p:��J�\�l_�L�x�e� B�ʿ�b��Jζ���騦�^�q�%1hc�[�/R���b��2i�N
��]쐣�ۥ�\�3�����QH��4�&>�XE=o
�$�H��lf��餑�{mB�!��P�����Ɉ���	b�������9�8��c������4��o���Y|t�po6���é�XC�����@��x�[6$�,"���G�+�D���O�AT\�+���A/���w�8���|����yհ��7}uu0Of|ǢB���PP��2)VΜ�
<�,�,�}	�Yr 3.���a�&�	�D��к��Ke��&;Jn��D��V����dD囷YU���4?4Kp:� �2��I�͆�<K�x��Q4�M���l9\D�t��3�\�}|01�j��Z��V�� ����D���U�'ӂ�օʝC[�*����`�ӄlml�a�s�17-<�k<�
o���Tf�k]�r
U��2`͖�1,<���E�9�V�7*���e9D"00l���B�'�5?U��{,��ptDW9�'!�<�L�}06'0�AJ�n��?��f�g�B��A��P�+�b���t�u��    G��C1��7L1Lj����K<��T���Y�qV�m�u!�N��I�)�*1���%|A��`�ft�,�ڌ!}M_)]��p���^4��$�X|�o���˧�_V�������`�����c��}��ce�� /Ձ�l��n�)�.fWz��#Xd��_T�sѐ��e0�E}��=���p2����ww��ݾ��/���}s�1���$6�9.wH�X�����mU�#��4�j(=4�[�[%�V�U�(�����Ur2����,�b�_��뮺�ƹR��e8?���1��D�֪��8AL��)�����>�֯��K��_Nf��� T3�+#v�L�&�M�E�y��;d����Zࠍ>c�#��AT�a���+�r&[&W�1��̫w�wp9S g~ms��[ZQ���
	̓��#�����.���{�F�'�ª�qMi��f��R%�N�3�����2����&��)4~�4QA-_mFLZP\�-�:��T�����*J����"B�eG��!Dn�iw����R+�uJ��T�|s�
.R�^�ɷ�T�N��:��y�O+�yZ%f�K��z�iDL��؞�n-K���,����њ���J2����R��R��k��/f��nY��(����o�XT0͇�c/sZM8�	X-���G4�p��Z$S�9;���0�rN��g�K�����PU��Vf�����W4�O=Fk_��P�K����R$'�M���ƅ�����.��\+Y�䈜3���*�ɴĳ{y��?���&�rY��h�9��VR��*e��!ܑY'�>j.�Uɇ@�jJ͡:fl<�mX>!}sC����;#i1��1T�|�+��SŻCy,�d��[X]��A:�9���kC4�(H���J�����W`M#����غ�����t���*3�yO��s�-q��IE����Pr��Qa ��X��ѻ;Z{��7_��#*Ǉ|]�Os
M��Q�E;�GI\�L� z%���=&�x�Nn�4���>�!j�F~pw`����5ҏ0�+4?޷N"+WG[-9��馡������p[hX�_�_ٶW�Lvő�t^����6��~?R��S���o1��M/�ey-���lw����۹�]���TCm�����Z�y��Eiy�YV��9���'����~��z`:���AKD^ou��xt���P��w��K���3���?7yeb��g�`����Q��bM�P��1ҁ7���s�J�_IR% �T�D�����IU�~��k��xl�|�U�-{��~U��!O�ԓ0#���3/E�
HFORJ�m
���w�U-S�$a䯮9��
Uل^dV`�|T'�b�m糕"I���h3�f��uv~��xT�j��Ei�ñh	��z��N~���9�0M��ǁ�
4�뭨D��^/1n�cρ\Y�27F���>�L�p�0�1��S�	�E���R���A
y�X&���U�x����o"����1�C��L�ߑ��Q�.q�+.0>Z�E��ڮ>=��'&%������L����y������h�k�A>f\�����mkT��qq�d��3
�){7����o���2�Q��Q��p��X�N���__��-V2ː/ݘ�:�� !#u�U�{��;�1��5��~��p<$&tÊ]O�{2��g?�p��;��%���N͔�W��3�<�ĳ�b�������������H]B2���T�,r��~����׿#�݄�l��PJe�x�ѣo�,N6�4�ȍ���3��1���oz��;��:�M���zg}��r	��i�R083���*6\ݶ�Д��Sy(l�� 51��P�es+��)����lH��d��ȝ����2̎+�ޤ�r�8�PXQv���WWe�4Cֶ�{�o����6ūZ�����C玼t�k�p�ѷ��X�v��A�p���|��CΨ}��0�J��un��9���"h�k��#6���m����v���3�)�tR�g}����.�Q����vժ�/�-�G��WV �0�b��������|l:Rx?���CN���a#n�$u�
OJX�B�k��/�
��f�{���p�mzӸ�	����Ĕ*�lƥ�q.��|��ݲ��^�(kŵ�B��K�[�����(X4񮛚�|\����À�/��$��8����?�Ŝ��{O�m��N�VP��5Zs��x쓫ߊ��6�kxeܟ�*����E_��yR���bgv[�HW��aˁ�ۅ�x�Ey�vuJx��p��/O�8
	۳-%)�u;���E�܌�Q��>�p�_R��C�(J+pa��Q�Yw��܀A��/i�i�	�e��f����L3����	�;�6��$���|G��^������W�V�Z�\�*\��!k%� �v��kpoAuǰ�퉐C��k�����B�%��ȭ�U�l�����+[�Jh2��g��G�}f��0y�D�-_y9��W"��q�� _U�;L~;.��V�6ǵ�\�!]-RƏ7/厮�*�h��>ͣ<�m��U�3o�_ۏr�>v�pa�N:a���i���W9lG�qa8���1��!�J(:̪G��<ď��r��CIoZ�Y;[;�{��T���^�*M1k�fs(���5hFi�ra�tg��bָ\{�Ȭ9h�х����^ީh �V�V���%�mm&\�k��Vg�
��k�N�+1G�J�ֹQ����YpIM���>g�"��Nym���M�����U
�K]}�M>񯱖��.(�sK�P�pa4^U�#��D�K�z�]�|�%�ß
�`�>�8�v؎2 *�j��&A:���0:�'a2M��9p�+�Vu��&���G����sz�pP:&��>9Un'	6�m)�]��I�Q�d�5��G�|ԣ��GE3��� ��&*J4�N�"1З_�?��.�O�.�ځ����NH����^���x��'�O�~��G������,�ou Y4�u;c���F�%N~��w����BV��Zõ-�#�Z��Hn�>\d���8�V����PJ3`)��Nn �*o�d��bέ�+����!��0��ut|}�8�3����g��`'X���0YD#f�v��Q��T�(����s���@x^h���?�Qh5K���\鹋t�GQ����9H&��uA����U�y�����*n y����u�5{�^�0�n�8ݍ����k�?�>^E���6r�h~��M�ۻvM��ݾ�����Ѩ�K�}XXLP��{��D��Gd�)��r�kwE	|�.���k)N���
qq�`Z�H��:l,O6ƺ����q�~�[�$�v����7CP T�t�>t7�%
}a7����m��e9o4��H�%UgB�r*��
+0� �ē"�=������#��8;&V���~�3�sR��	����Ϟ���{�о�}�*�S�1kkqTHP�:6į��)'�􆆻�8� ��Saz��GI�Yq�Å7={���i���j�D?4Qw�$M�}�q����^H'���	\���v����G-i�op
�CX�[�� ����3o���N�U�ƅ0�=����	�I	k*��2��F�s/�F� R��PD�
���V�9q]k5��׺��p���~=��3JTY�>aR�/
��_�_Xm�K�l�$��x{�����=\t����d���`F�QS�������!w���v��8J�����S�[� ���j	Ǵ�?md.���_���#9#��N�̅*0Lok S����Ɂt�0���_�ث�����k����m� ;�����خɇ��'�]Re;�!����ݎJ�a{b��5�kzV@����O�3��|Ry4=:�;��m�����qE�E�����-��m��eY���6��1 ��/��zN��^�E�.*���f�P��s�	����6���蜷�LC�8|	���~y	�\�h�D�>����c6��+�Ǔ�b�i��ہ��U蜰�9~��@1qG�*�X��LCؕ2&{�y���V������h���,���i݇��'vfqxydp ��s]�] oi��q�Rp9�k�%    z5��Y/	��33���G2�ͩ��S��,C�͹�aZ�2��t6d�U�l�]�W����+�rE����3�7�VTȮk-Ȑk�������?�M0���[}��(Tc������x��R���ȝ.ن���)'?Pf�~$��>~ �}!��t��./vaP��RIc�)*��.��j��ȻiN��{{ܖ�O�[V���|���%n<G	�V��sN���{� �t�\ϲp�J@�U�|���P"���\r��g��+���z��]<�t/J��^��Y.7l.�>�rأ`JK]��,��@��e̂����F��C�\(���[�0�Jj,8���e�b��5�Vख़�Pw8�2��v4<6#r��h��66OB-�:�[#`5�so�h�=xB��'���~Zg��7�ܫ�s��n��P-��H�V=]ݪ
*�!��а̧|��LZ� �F0ʙ<3Rf���T"A� �;!yC��Y`1S�YH�Y6{2fGm(찓����v:�5����R!0ޮT�ڌ�ys6
��hJԓ��5�(��%�7P�w�rMQJ��Ûa���}�#Cs�#
	� _絧�[��ҔԗVK�Og��ֹ ��ph��P;2��N.f�:kĥXQL1	�,,5T Q1��^�Z�i�op-�<g�I�Ĭ���
��z�{`�Emq:�i_�(�����џ���^��e�(����̚)�n�ږ;ƍ%����'57haV�n�3���'�K�X�XαP~ն],ڵh.O�&�	:�
o��%}�YE�ch�T���lyg&���^��\�\n�e����1�1{���\��̌��N�~o��G{C$���h;�<�C��.-��yn��f��5�����6xX�ﵣ����W��C�Kd��w�Ƕ~���g�{���Kk�����)���{Gl��$��r��hN�J�>Aa,�䫜Y���C���}�9��곝�VP[�.h	�X6�,0�(
�������Z)h��c��͕C����3�7����`} h�L��-sh%v/L\�<� M]�~s��e�z`����J�T�U\Ӳ�xڞu��	��&!��m���m�p��v��ό��Мΐ�,��-s��hkq{v��f�b��7Ttހ;eͭ�Zs|D�����l|oK����.���"ڕ^�!���[~�g�DȆ���g�晓R<H�*���ݾg?�+X�5�|K�:�ҝ��M���U.BރUy⚖L�$I��$��=��YU!�L�/���p<���s�S��Q<�	�ئ�b�H�I0��� N�(�.�a�Σ8���0�_�a~�x��c9�'���{�a����b�D�%E�u��]���+���N-��R�RTd��;H�������l.:��WRo�ł�Y�y���g'G4;�a�x8T�x2��>��<�2��&m��3�0��Q�l������~��JJK*�Tq���Ǿ�l��|���cR�5/z�����v�&��%F���-;!VDpƠm��"����\5nWU��u���
9�c]GG�O[:!:�,��/=�d�{�)��-a���vBv��c��A�f���`�W���Xa��&m/�"-��5un���l/sVب��m[܇l��Vñ'�8��~��E��c�_羌���oƻK��{��+3࿶,������q�r&��Uö��r�=g���D�8�;������S9�h�eƜi�����E繁�!iW�8�~��eS�J8U��M���_>�Spr�٪xح_>�9:Cޤ���h6J�S�N&}�����]�[�Rt�o,¿�'Q��h3�V� eʹ�0�)�ܪ�ӕN�)���q���}(��`}�-�=IK~ys�1u���A�d�C��N���ɣ��k})Io1aת5���:�DF�)8.��W��$<�vP,r�Ր�_��Z�u�=Y�Q:�X�t>g��<�M��r9�/��y8�D�|>�e#��C1�J����&�>��Z�e&�>�qc�5�[������x�H�����,�p��A{���a×\�nL�m>�KP,�X�=U�p:�"���ݻ�s��W��R��������Y�ϕ�?e�̓?r}0*�g�cp��k׍��2{g?����J-��#Q�S2���1���/@���'ؘ�<���|����?��+����<�u�U����͝���?��<k�88K���d��Q�U���+dRJ�m���l0�I���{R�4����yy�~n��"G/��(�=9uF]lj����`Dld߁:�.?�]]ZD�- �S������O���9.���ӫ��U,��
Ѳ!���2����{��^!R	���|L����s8s����\���|���^��Y���ћ��uzF�i	+Jݓ��
�t�h堨ˮαN�Lth4�F$
9�8������xʪO^'/��MM���'��E�(��<<8���G��&�'��+�]f�U�{z�Y];k�����6��v�\P��*V����Hw�>�Яf&׵�42�>��X��^3��4a���#s�L�3E�������!�G~���ڙ�n�p��'��l	���[G�}���_jpF����r��=?�!B-��%����n�V[���qA.U���sd/�*�s�qw_={�n2��4ƛ�2[��4�f�x��y4ʗ�h�O�8O�$����$�W�/�����l#j<�W�l�IstT2>��8�}�أ$��Mb����[��Ԟ��� �(�l5zM�'�I H���^��E���8�v��Y�%0y���WAMp�[����y}�(q�T��l�!�G�Ǻ8�P9��בW��5�~a56���9|�?ng�S/��'����Ӕ����VMY.��i�Th�'�O
gJ*@z���u��ǡ%�Z�G�"T�;���t���Y	6N�,��� :��_��� /�AS����Gd9� o�\~����ie/��?���V�{֍�쟢��!`���+���-p�j�ԁ6j�����0R��ם�N��z���x���5�(#�U�,[G�ټ�v�M�We�V8U?�3o��FI:���+�IpC����:`��b�Q�������U��P�;�k
0�����@Ӊ��:dLe ���E{`utb��`��j�P��*<�Y��"oy]��c�f��U�Ќ�3J��IR��M�4���� �$�<�\��|���]h�l��P����o��!�ޛN��"_��"��,MG�p<O���h6�X��r?9��=C��+�w���ٶ��fW���;nz���F���}�5�������s�~k�;;��3��N�J�W�wR�I4�ȸ�i6���y��i��r̶O��q���$ä�3#%]i�g����bn���������lMǕްr�{�*\eӪO͛�L�˛u���V��=��i<�W���DO���E�V��p��"���ͱ�ЏΥY��ٻֈ�vJX��K>aRa�tp|��R:R�\}�����7����Sdx�����z���j���%�\��2�>ln�vM�̈�-m���2F�@l�ej��w����j=m���a��O���� k�GF�S��1H�����Fu�af�4Q�Ƀ�j!@M���R7׋C��f�X<��80��܉��X�Gp*�c�r�!���ݤѱ��*j�Q,]��> �b�c~�U���IǗ=�h���¯��.ü��l��rWE�A�o�w��7�.�^�yuА��T�[QkkK\A��G���V��*�l���N��P2[L�E��h��!�m��κ%��p;��;&��(Ƭ�iY��׸��Qt�#�73�����_�E���uD��J��5V@����|ivʪb��l��B��`�t���RY���D1�o�8[��w��Ϙ��Iy��ܛKd�/1fV��)xOY��upk�Vwgh��?�P��	�2�ђ�����V��?��9�Ua������賊K�X!k�h5��"G�Ռ�X5�O�q9�-��>��J�����)����[!+���Z��g�<�f�ᰑ� -  _���,�Vً�ڊ&��Y+e�� ���p��V��ֶ��0�YĄlS���&����O�ڞ�H�*}�Q�}�5�V���޴6D��T�5T���D��8Uһ��eZ5�Ӿ �d�4�4	f�;Υ������J�K�R:�z��W'�0�����I��M�(�o�?{TB���2��o�uI�C�"�7��o���骜�Z��f�$+���1�D1��$�A�f�.pFA8&� ���\Wqx�L)՞� �a��'a<����e�4|<	G��G��D{�ԗXð'jY>���\���՛�;"����#����b�EWB�f̺�d�n0!�����a|��8��=��g�>�������K�F^�8^�7�w[�嘾4����F3�yUcʃ';�(H�ܦ&3wG�S�@c=�-�7���k�+�b!s��4�zlm�ps
�����K�ʯ�]/٤��X�۲�̗����t��Y�e���+Qd}'�Q`���"�+"��YU#��N%{�s?�߶��&�4儹Yޖ���zC��(�_�
��~���sMf��w�7��ZH_����Ȥf���$�Kc��O��YpU�se�3�-"�^�.��\J�[�����]/=u�]M�.�n؇����չ�F�+�w�ᤓ�<�&\��T�=�zc��Q���E�����J�z9i�Ȓ�J=Py*GN��D�*���*��������Kh�0xU��bo�5������p���Ţ�fܓ��ԾÄG�-21�2��˯٧����Ny#������ik/W�����Z���ii.e���}��4���,�)[�L��pJ�;޹�ܑ;�����T���٫(���L�Xb�����UC���Fj��[��X�J�e�$��A�eY���먬�Ib�D�R��9'�V��(������;��fS�2�%ԍ���O�I�y��g������*g��$�Qۻ���3���s��ߎ���h:M1q�Hp�`��x�S��o���z��*C(ӆ3�z>���P�4��1;�[ܟMo�W
�u��=��ej�/0�hp����jnq�=Q߮9T��Z+7�8��)���0ӈ����S�6x,����ӗ(J�`��Q�1�f}<��T�O�5r
xQQ�*꽬�MI5�o�2bGz�Uۀ&M|Pʿ�����+k6��M�����fۢ'��7I�!Bc0XΆ�x�������;��/���Nݽ�Š�0�17�;x���bfx�73Ɖ[�9�О�.��sQg�W��+V��(�4�
_�I`���ft�i�Ö0����hB��r~���n	�&���0���8~���9�b��鞉m�Ӝ�/��=��o-�/˩q[?�9�2�֒��j
�J�K�o��Ү�?���G�s��qp'����&i��i����l��h_�pk��,#i̞m��Ǫ=�$ c�PSÖ�؋�p��c]���@D��:�o���~cN�V�W��z�
'oV�����̏~���ثıb.c��0H���?n��N
O w*��b|m�R^�;S}p�Ϣ򏰞&�_�F7�i2��D�����gE\4�@�Ð�ګ�ws��ʅ/�ĥ���Ԡ=Wڄ�UU�s�^�Ł|��?Vf�@���PTHx��"���'�=��۩@fc�O�U=�?>��tI<<�y�[`U�b���,�#[�Q��l��O���W�F6��!~�)&Ne��C~�k�VZ�R���U�����+���&G����`h9hև �-�������/���������,il����j���4�����p��q��|�u�P�Z�����5��߃�lS�L�19����x2�m��d���~�/�IA�}�x���O���
��Zh��R�ጲ ��9��Ws���UF��Km�b��(v�f�R�¹I�����cU
;��	e;�-$h.�� _�,�F�M���M��hTƐc0C?t;��A�6| 
�ߑX���"��(0��e��-
˓�	�Ga��V�+\�S8p��E�`F-��4�"����(z1�Y|�F��8�y�@4��O��S4�Te��O�PDb���"���7۱6�I��D���Zb��.�" 2K��D�BP�
���
VgIJxҰU@�ހ�����c?4�z�,��k8���M���u������~{�k�T��6'�f�B�U�>��	3jE�w�f��6����$���f��Aoj�R��]�~�L)<�z(/��xc&�4	�nDOڵ''/����f��4�{r�P,~�7��x����8NF	�B
������y��̞����*�/�/Q������'���l^�\����v>��vd�Jp �9ޅ�EŬC�Sl�5fgd$�6���`m����Z����D�B-Ӭ���;��2���.�V�8Eċײ٦���������0���(��w�{όf�����`�t��e��VGl�N�\[Z�vl$�n(E� ��PF�q���Pvs���i�S��r�kş��D=����&�I��I	���b����6�K��:���Р��kv
��DW�\��$p�9�D`�,O��J���[x�G�F`Yp�Ϊ9����/�g�D�,ӓ�65���:ҝǹ��WJ1��\�@�4S�z�ڧ��RD�<ʀu��&/��0�	��p������G�8��8~ ��M
a!�h&i8�S�c#�Y3�,���ѵ�����ҏ����I�x���SPi%�c/H�l�/�Yߕ�h�lM{I+�;+,�($��wV��J�3f�zܢ�y��?�_�Fj      �   A  x���ko�J�?�����66� �%��)�P�r6MF���#E��߮��4i?���<���H@�>�Nr&(��6w������cejf�iG�Py�R�"pٹf���N��hMjF�֥��HZXnf�q$ߊZ0F�S�!�}��"0�q�ߨѱh��i���>�C��Yx*s��{�����0M�lT�;c5c6Eup��0���Kt X��!>�)7Y+�>�Ҭ"���[��vY{qyU�#B�|�0>��{�q�;��ij�ԟN�82J=���}g/W��=a�0ҹ�:H:�'Ө��f�d/�{˰M����-I����n��< E�	�[��~��3/�J,��b&��etᐲr����'˞�U�\�8Gc�|� ���퇶���8L*��U�W��|3�M�q��\��f�0�Ƃ���	 ��"���B��6���M��$����T��_٢YǕ'w��n�q��YcH�^[yss���x���z��{���^�#�7	C����~��:�&*3�*c��a�۽3�_P�3�a�l�M:-������Ϋt7�OR=��KG};�+슗�^�ś,.���l�f�4Y���a*M�di��J���΋�8����Ph����	w A�mG���4��zk�c���7W9���ٟw�Y_t��X����B �"겂�dt1�Y�xڷ�f6���o�<`�P�2T b!Bq�	u!!� �!R 'B�����Lb�ǔ�FZ�������8u���K��@YӠ�&���J�ԍ����xd�=�i��),�^�p��!'�f]���ݲ��N�~ti�����ʴZ��ޜ�      �      x������ � �      �   �  x���[o�6ǟ�O�aOM+�$ron�6���64�"[r��1]ɮ���;$u7u�.E`K4�;��y.���D��$L�kσ���,�"���i��#��8}�0�=|@$@�N����a+�f��l���d�N��1�҉�58&�J</��cr��>z8NP ���c�հ�o�{#��?m��>U��"C��^�����O�l"hI%������h(���L����@V
��N7?��d�]m�~��>�7��|"8�>a�&��y�@�)l���!^��$�w+�M�K�b�㚛���!E��@ �S�y��������w����	>����%��Ｍ��:��h�^�kx9�w� :�<���^U �?6,��G�@���ը��'��UM-�%���YPWQ]����F�,6 ���&���ke���7FW��J%���>`Xkh���_��DNAR��Šp�ڠr �Ͳ3�wQ�Z��l�H�L���_!N����n��4;���$#^�
���|�8%TJ��N��;�/�jD����( �DH!ex���mm,��R�7U!�&53��!�4��R{��F���D�XVbс3Mll$���C'���,���'$5�����26}5��R�y�9$`��7�
A+��(I�Vm%�-�
3p�o����ڎ8��9��FDc& �ފ�?�G:�8��44JL���}y�0�H#�^5mRaR���r6�^��r#,��#�i�|ԉ��vB��p�s��>�ڨ�z�pI<BЈ��H]YBma��0��@u9�_Xs,ڦ��[W=�����ĭ��c�ʎ�O@���M:i� �\ܡ�h4m�a7`����(���ޕcu����_qX^����N1��p�Ԍ���WǴ�	O�y�Nqt4(OF�6�C`ĺA�s�6;)T��9�	���j�ثL|O�m�>������I�<�&D�]�=lc�.�C��� �;�c�Kn`���j�X�Y��%Tԝ��Z��kT�X�� 7(��z��}�$[3�
�Y��e�+��1
O9طHӫ���I/��l�Ӽ�bĨ�px-홌��a�
��+dsV�^s��:�ken~�Ƅ����W����G���9��AK����|Wx���]�O���h_k���vcG?zh4��^�U��z�����	�W��D�dّ�N����.�2��2�ʁ�s�~��z���{~�p��`d����q�t�x�`�����%�KD��a������`^x���qJ��+C^�cG3�`�/1���e��~G\��,�ю�Q�
��юI8��'�y�,�=�ѫ0g��zV����.]�,6I.�2/�0��'%�ܹ�.�}LD�m�D%Z���N6Ctꕂ�/Ƥ��/�f����of	��b��t�r���������M�2$DO����`}��@4XX�� ��YR4^�A�������L&Tg��      �   U   x��1�  ���������-.(���	���{� <ْ'�_ՉG>�G˵�B�k��!	��r@��!Ip�E^hM���1?ʞ�      �      x������ � �      �   6  x�}�MO�0��鯰vޢ|'���Bₐ*��q(Mօ�M�u��{������ů�絩DL�(��0����������v�-��a���ݕ����Y���D�	��$�K�G/V��Y8�]{���Cэ�E=�y�]3��om}�r���|;f���`��H�pM�� �����7E�Tj��)a1�]5{C{o]8S����DD���b;ƪ؂=��S�����Tj��D�Dp�%��@�ǿ<s�b�J+ܵ~)�Ɂ��y���Y�Y����c\囄�D��2�&�p���Ɵ"��%���Nȏk      �   �   x�}˻
�@@�z�+����3�I$�`e�Y��3� �w�����C�%�* {mg9�c&��'�r����e��b+��8��S
[WVD����	Z��~��.Q���](���P��W����(j/�c}���2c���/�      �   �   x�5��
�0D��+��P*�RP�x��M]L��l(�{c����1�]:m4�1t��Ũ?��,I���d|#+K�`鴌:AI�%E���uVWJLn�K&��&�߳��k=&)0yW�0�	SȪ>��X���))������i���@	      �   �  x������0 ���sj�dg�8���-T�f�B)�j��)4���U��M`U��=��5���<z�P`X�@���'��k�u��4�E���n��o���wW�W�6�&�ݹ�odE�� ���ȋ�Q���>%~ߥ�G&���V����a��y�`n�-t��Nls���`�e�i�:w,e���<f�،�ُD���&�h���M���6�����!з��͎��pƉ� K$B�QJ;������G�cB����ľV�H{�׊�B7��!KE�b*��M������,�����i��>�(��>�|�qaO�׶��᤬{u�_���/Vu�=gms�u�C+��"�J*φn�iR�:Pn�L�U�:��!�����o��=����?���/�a�L�<Wp�x���������˱o      �      x��\g��Ț���
|��=nE�OV�Z9���=��"IIh���-PNv���׍���z��B�@��<���%�&�"]uT7�4Ww�u�65��#�?2��Ld�f_��(?u*�L���N�ƌ�ԸFu�a��`W���0;��hbM�Vɲ���&ȷ�pa��J���'�h&��V�h����9<>��� �D ����V�8���a+�3ՑU�|h���7��3+��!4"$X��E���N��� 	)2�X�r����2RU7@���v�Ǳ�����wǳ�ٲV|3���|\��(O��c�>"XȰ�_�H�"p"+��7c<`Ss��r{X�l���*(�������ֆ̈́��,�2� p�CW�=[����K����TH$+ȶ����8K�r�Z�]̵=I�a��[8�#���q�;c1<��a�����J2(w��	Q��u�ｙm���Ù��o݁�l+1�^~�4W��~���,%Hw���tV�  �a��M���V �-�E�u�X��%�*꬧0�C$GSK�[����8,�_.�m��yQhb�N�!��,�|������`���L��?���x�S���h>1�p�$BN�E�d�������v�ہW��q;��܎O����&TK�B�䪘�fm``�$���1���: �gz����	�3!��v��9u������!��X���`�f��8X����سJw9�J�ӽ� �J4&��@a�],�jrk:�'<�XSB<a
H+��Bk��r5_���]��AkȖ7���6��V�D6�G2�$�5U��
�`$`z\�3A<x(b��u������R˥�L�o��f��r��ֲ?��v���\��Jּ�sˬ���Ù] ֆg��/m��� V��QNymwHb�Z��v��\�LA��!e�Z�x�����<Ÿ�N��Y"���H�	�FpDk�<��	b�������H�Z%���7mG����'����� ~�];�'��{9g������*e�R�����|܈E5�d������P�T�Q��[���@���6[j����k����,wR����5[0nr_���S3������e������S�#~�6�g$N�hZ�	,�~��4:L�l\R��Z���2���/�ڴ��A�%tW�v 7V�A�ٰd��e�면�-�f$�)�`�O��i�$��AP�Y��?�G�·@ðܭ(���:3x��Xv�Mȵ��"C�6[0�����FSg�(�>���vm�?��סJ��p�9�^*R���?��֟i�w�W�X١��Z֖�RA?�#�ׄ{C��,�~�5q��z���9�4뛂����,X���T
�M^�EX��OL~���k���R�����z ,>d��G�a��������������!o.&}�Q��K�E	���$��N�9=�1w�Ԝcg�>ó<��ȑ�P��r���@��4���H���'-��f���c���2E�ْL����m(����mcg��Jf��{j#?Hp�}��mx�jn��on�e,�f�*d/D�"�K�4�"9D.��H��{}�%�X	Ќ % p0��x�8t����<49y�|���3�(��j_X5F�X?���=Ě��P�@�8v�Wl�n�Ϟ�N]�%�;@zʟ��?��K���U~#�� I,���+/b"/8�f�Ȱ�Q:+J��x{�������a�j<m��-�Y&���|�ff4��f?���V=�VD�b�IīE������Nrh�Ĵ���r_r v�!9��?��P��z�2b��Z~��ClsAh�Y��y�H�A ��o�GZ�m͵
c[3�І|���qյ{����90Fuɴ�&��Nנ1���PBQSw��ct�z���o'�����پ|�����Bk�a�3�)��2�F�H#��u$^�;�����ޜ��߱��2�Ǝ�;e���V�.�"�ư�ε򪏼ܼ���P�t-ۼ�nS��.a�̂g�~����l��&Y&?�;�(��"�ƴ��Q�#�SnI�����_��vAx��"��v�D��*�J�v�e�3���|]g�zT�Э�m]�g�7h�k�u沀2�Ԋ0��?���Kf�g���^����K��ÏK�Yu���2���L���o�9��B���uA^�?��M��Z4���b4���U�H�θ=[���F���JF�p
��rcC�
%/�G �����c���#�(�Y�p�a a����,��[�&	Z`�Զ(ߝ�Mw�����1�Y;���7\�y��!#a�c�0&��F�N��|�=�M<�)1�e.� �]���$?��d�i�����YI hI���bI�R鈯�~M�T���S�dt�������!Cߒ�����H3 CC%����#W!�☮`�=��42�ЛU�4���?^�9ey	�q��t2��W��BM��~�u�N��9U�t;����C�Cp��0}!޿�O4�
�c��w�J0Y���ećQ\/����r����s�H�J~�8۞�N9V�z�o���v�sK�y�c�XH�/���R��*!_�w��kT��zs���j{�t�.�������VVE�u�R��5{�.\B����K�~	��0_��NgJ���f!������KY����-��N�6�5-�T&�vh�QA_f�^��s��ɳj�X5�Ҷ89a��T��O/����,.�+{B�g�}�LȺ�	�ϒ�el;��S��/�a6u+�Y,vt��ɌpG3��`�=�B� ��*�R[r9vBEvKl��ת՗I�+�\w������$�6YV1tb��c5]�����u�dq�Ÿ	�f�7g�-"{�"	r�Q/�4�ǳ���<�(�J��C�`DB�/�+�X�<�7���0�6�1q�3�s����c���9P��@}���8���+�үs��M�֛-�a��ޣ
�c�}�$��+A���Pު�7�ՙ�J����y�e�PMG�RQ�V|�"�'�F6s�i�<z�l�G�%�&=C������/K�6��<��w���2�}Ndr`���!�O�*W$����ϖ&þ�c��:�`���k{No5��8��Zn�-�%`K���"�\E>����\�I4�.��$Yc[�1�����=>:��~���jW�PG7.�'��sH9�i�4��s�Vg���,x3�Ni��y���&]_~j�:�͗ܟ�h�AQ��<�;� ����bLK����Zd�V<�o��6��aݟQ�Qe?ㅕ�]�k��S���|�U��U:��hV�E�\o�u���֊}�]����}��ƈ'���9���-C
,�6�K�x)~��t)έNT�1H�{w���aL˔�)����$
@���`{K󹓭h˰
�med�ǝbG�DR�Q����\�iS����o���v�:���ϒ�*�Y�۫��r"z���8k���^X~`�td|f���OͳDi�7�����'A�/;�)D¦�I32mG"D�H�H<	���Ҵ�~�����v��_����'��/kZ���4!�$ x�V�Ʀ%e|ZL�m>���v��A�|q!kM�k��U6�g#3Z�֙����DH�`l���
K�����l#2-e�&��ke���'+{�##���g��qeO��|�W���{$A�\����d�<K�o��H<9rP8;>0a�lL��gK��|X9��6F��$�y�*wE�j�g����E�IX��L�EYmmɭAoD���s��2Zf�*�(Mlu���Y�cH����<0���m�D쁜����:�a�����>-G��6T�V��3|U����L*5o�󅠠l�V/�s����7%i2��>�1(���Ǚ�C�m-�K�^�y;6lD��U��:�f��g��4��J�����T��u��>�Ku�f�<�/��>_���y  E���D��M<����i2��[UWlٞ�<Th��R%��P���p(δ�=�-4�MfJ�W��&���?H(`�I�gM����>�M���XU;��3�����Z%����pc��G�R����v-�\�3v_^u#�՘��z��,VJTwؤ4Ae��U�2ˍ%�(J\�W �  ���
������x��H�8��f����,-±�pǝn�'��h��o�����7 �?����S������2��P�e���r�EM�~m�Nf#SJ�t�V 4��^�2�z��}o�e���'uD���$�9,�{G�hb���&�L�OPB�G�؀CA 4���C-z���B\� ����:�䶺̫����E���˛�i�VВ��`hΨ�ߴB�;�^~� Y�gZ<!��J%f_!ۓ�U��v_7��:��=�2���y�g����򵥞�c"�e�� Ζ��`�{��3��[���Z<�l6.�U�,��l�]m�0�M��qZ������W�~��������y;�tp�$x([�ޘH��s^n��Gx�_�ß��.�Tq��ń�Y2�ݻ
��h��S9D�%uܷs�'6O�+@l�_�·�a�9^�����)^!V��ac�|7��fu����uoP�_l�Z�]/E�i�f��ÔЦU�l�i���l�����;О���Y��f���)0�݈~zEO\O����3X�,��ڃ��cV�Q�q�f|0�uj�,��PkA�OF9*gYa&O��(�K�O� ��{��c��FZ�ޕ���#������ږv�G�N��܏u�VI�TRM���H�öi��S������F��[J�7ՀT�����xtb��z����/�>�F��	����ɾjڎg GU���4�-���<�Ĵ�wl�����"w��2�q��voQ���V]X�+��Y�7* `�x_w�k^w�q��t瓩q�Q��D!�� VS�׏=%�{PBF�Tݩ&�����.��8^��v��n�xe�w�an*W��S��+NI�|��Ͱz",�;%y(�(���@/Ν%Z:�^�D��f쑇�Vr�.���G{�ߥ��XG�!r���c�o�óOG�($��>����KF/x����O�p��j�]31���E�f�h
n��"r�Q��4�59K�������Rq/1��\bL��O���&�b�Z��FK�Q�P J��+���L�<Q:�7�>�d%I�d�Ǖ6��<���)�����4 �@�[{�sh��^�Q��,�.�%&�浸d&uAϫ暼����p���x{������q��;��]	}'�}#�
{J7� ���J�<J3\�)�uKC�oP�*�V�ƍ=���BOV�^^7^����4*�|[�7C�1��퉄;4p4���{o���N�\۳t�`���{�r��B��"oV�.��;�ʨ�T�j����n��Ӷ^\j��6c��Mu0+G�~��6�� WvB7O`dQ�����[�,��p��k�J��P7d��_uT�ԤiLRZ�4O�a9ܩ��r<{'�)=C�r���H��c\�y$����0w��i��<oI���7s�x�R2|Q:@�^Ve�֗Ü���[dqк�,Db�]�G�z\�Y�͒%؊�k�kU��\��`&ו���h�,%f�F�fu`�8m�=��	����-�k�*�)��k�w�&́,�U�P+q���b��Tu�lC�z�;L9�t��V�Y����-�Λ�p�|�B��?X,f��X=�J%%k�5	���lѭ��f��¦�b���jdlF�l���=��n�+����)���]��JRp��.]���M��v��{?q��R��������夏�4r�9v`W ��4V8�����5�`��4Mٌq�{F`*���y�nOg�:���("���1��t^�of��ÿ<۵p�m��+���7��5�)N���I����,E(�l�~�Bb�d�AwY~��yg���bi�9ٮ�͚��r.��}~�=?�E$��y�E�L��a��輄G�=gqZ6��XH����"�v��?��0� ��ck���[�5N�_ѻH��}��<� <��ꇦf�P�>��@I�$�;r�P�=�z�,�'>I����'������ݦ��L-yή�K�</\��'8���A�7W�7L[��۾�7�n�81Ƚ�MVɒ�ԍ��m�ɦG��%���^R(��Xbx1���G8��왙�xK�����d�XK�V=]��
ɫ�XK���mI<,�/8�IGw
�Xx4��Oˏd�w�8��B�.
M�%q�D�URuC#
L����d1�0�1�f�ξ���e�(��"�>^P�HÈr�;/@=O��v��?.�~��Y�KCZ�Tw����O����X�}qr3.~!�Zx,�m��T|Ef%��n��A���/��9��      �   J  x���K��0��񯰔u�f�o�U7��U����(��xܪ��&b��Jl�����WL��'O6�W�2�%}�;{����g��}�iiBs���լ,N�[����®0��A����k��,�eՓ�G��٪ʚ��(+��Fƅ;�����iٟ���	�����o��ªn1Ē�7V���!�\��y�
�.����I_{`���qN����:��j�,bWfsYHi]�/E�ʓM߆)j#�Ș xj�mݔ� W��&��� z�AGw��T+��,w�;	��pE���$����
�P�o��6B&���Y��s�~���.F�Y�T�&������ņS�ԳX|N��F:s�V��<g��]�"W8��|&r���]CǄͶ��҆빮��<Wk�Ƌ����\�����c���Wzd@�ΫbR*�Ԣb"n ��*#�z?}~o�XA�T-���3h��r��b� ѲS�ם�""<�{�T���N���Y{�g��sJ�%��A�� o�q�ĉ̂{��G���QD"��p��G�Q4o�ʀ�/�����}���i�p���!�ɕ3�      �      x������ � �     
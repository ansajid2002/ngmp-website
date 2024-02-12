PGDMP  /             
        |            mmapp    16.0    16.0 S   �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
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
                        false    2            /           1255    59254    next_transaction_id()    FUNCTION     �   CREATE FUNCTION public.next_transaction_id() RETURNS integer
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
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
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
          public          postgres    false    292            %           1259    59531    vendorpolicies    TABLE     �   CREATE TABLE public.vendorpolicies (
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
       public          postgres    false    223    222            �           2604    59567    cart cart_id    DEFAULT     l   ALTER TABLE ONLY public.cart ALTER COLUMN cart_id SET DEFAULT nextval('public.cart_cart_id_seq'::regclass);
 ;   ALTER TABLE public.cart ALTER COLUMN cart_id DROP DEFAULT;
       public          postgres    false    225    224                        2604    59568    categories category_id    DEFAULT     �   ALTER TABLE ONLY public.categories ALTER COLUMN category_id SET DEFAULT nextval('public.categories_category_id_seq'::regclass);
 E   ALTER TABLE public.categories ALTER COLUMN category_id DROP DEFAULT;
       public          postgres    false    227    226                       2604    59569    clothing product_fac_id    DEFAULT     �   ALTER TABLE ONLY public.clothing ALTER COLUMN product_fac_id SET DEFAULT nextval('public.fashionclothing_product_fac_id_seq'::regclass);
 F   ALTER TABLE public.clothing ALTER COLUMN product_fac_id DROP DEFAULT;
       public          postgres    false    249    228                       2604    59570    conversations conversation_id    DEFAULT     �   ALTER TABLE ONLY public.conversations ALTER COLUMN conversation_id SET DEFAULT nextval('public.conversations_conversation_id_seq'::regclass);
 L   ALTER TABLE public.conversations ALTER COLUMN conversation_id DROP DEFAULT;
       public          postgres    false    230    229                       2604    59571    coupons coupon_id    DEFAULT     v   ALTER TABLE ONLY public.coupons ALTER COLUMN coupon_id SET DEFAULT nextval('public.coupons_coupon_id_seq'::regclass);
 @   ALTER TABLE public.coupons ALTER COLUMN coupon_id DROP DEFAULT;
       public          postgres    false    232    231                       2604    59572    currency_values id    DEFAULT     x   ALTER TABLE ONLY public.currency_values ALTER COLUMN id SET DEFAULT nextval('public.currency_values_id_seq'::regclass);
 A   ALTER TABLE public.currency_values ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    234    233            	           2604    59573    customer_address address_id    DEFAULT     �   ALTER TABLE ONLY public.customer_address ALTER COLUMN address_id SET DEFAULT nextval('public.customer_address_address_id_seq'::regclass);
 J   ALTER TABLE public.customer_address ALTER COLUMN address_id DROP DEFAULT;
       public          postgres    false    236    235            
           2604    59574    customer_delivery_address id    DEFAULT     �   ALTER TABLE ONLY public.customer_delivery_address ALTER COLUMN id SET DEFAULT nextval('public.customer_delivery_address_id_seq'::regclass);
 K   ALTER TABLE public.customer_delivery_address ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    238    237                       2604    59575    customer_follows follow_id    DEFAULT     �   ALTER TABLE ONLY public.customer_follows ALTER COLUMN follow_id SET DEFAULT nextval('public.customer_follows_follow_id_seq'::regclass);
 I   ALTER TABLE public.customer_follows ALTER COLUMN follow_id DROP DEFAULT;
       public          postgres    false    240    239                       2604    59576 $   customer_transactions transaction_id    DEFAULT     �   ALTER TABLE ONLY public.customer_transactions ALTER COLUMN transaction_id SET DEFAULT nextval('public.customer_transactions_transaction_id_seq'::regclass);
 S   ALTER TABLE public.customer_transactions ALTER COLUMN transaction_id DROP DEFAULT;
       public          postgres    false    242    241                       2604    59577    customer_wishlist wishlist_id    DEFAULT     �   ALTER TABLE ONLY public.customer_wishlist ALTER COLUMN wishlist_id SET DEFAULT nextval('public.customer_wishlist_wishlist_id_seq'::regclass);
 L   ALTER TABLE public.customer_wishlist ALTER COLUMN wishlist_id DROP DEFAULT;
       public          postgres    false    244    243                       2604    59578    customerclaim customer_claim_id    DEFAULT     �   ALTER TABLE ONLY public.customerclaim ALTER COLUMN customer_claim_id SET DEFAULT nextval('public.customerclaim_customer_claim_id_seq'::regclass);
 N   ALTER TABLE public.customerclaim ALTER COLUMN customer_claim_id DROP DEFAULT;
       public          postgres    false    246    245                       2604    59579    customers customer_id    DEFAULT     ~   ALTER TABLE ONLY public.customers ALTER COLUMN customer_id SET DEFAULT nextval('public.customers_customer_id_seq'::regclass);
 D   ALTER TABLE public.customers ALTER COLUMN customer_id DROP DEFAULT;
       public          postgres    false    248    247                       2604    59580    homebanner id    DEFAULT     r   ALTER TABLE ONLY public.homebanner ALTER COLUMN id SET DEFAULT nextval('public.homebanner_new_id_seq'::regclass);
 <   ALTER TABLE public.homebanner ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    251    250                       2604    59581    items_not_arrived id    DEFAULT     |   ALTER TABLE ONLY public.items_not_arrived ALTER COLUMN id SET DEFAULT nextval('public.items_not_arrived_id_seq'::regclass);
 C   ALTER TABLE public.items_not_arrived ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    253    252                       2604    59582    laptopcomputers product_lc_id    DEFAULT     �   ALTER TABLE ONLY public.laptopcomputers ALTER COLUMN product_lc_id SET DEFAULT nextval('public.laptopcomputers_product_lc_id_seq'::regclass);
 L   ALTER TABLE public.laptopcomputers ALTER COLUMN product_lc_id DROP DEFAULT;
       public          postgres    false    255    254                       2604    59583    media_library media_id    DEFAULT     �   ALTER TABLE ONLY public.media_library ALTER COLUMN media_id SET DEFAULT nextval('public.media_library_media_id_seq'::regclass);
 E   ALTER TABLE public.media_library ALTER COLUMN media_id DROP DEFAULT;
       public          postgres    false    257    256            !           2604    59584    messages message_id    DEFAULT     z   ALTER TABLE ONLY public.messages ALTER COLUMN message_id SET DEFAULT nextval('public.messages_message_id_seq'::regclass);
 B   ALTER TABLE public.messages ALTER COLUMN message_id DROP DEFAULT;
       public          postgres    false    259    258            "           2604    59585    mobileelectronics product_me_id    DEFAULT     �   ALTER TABLE ONLY public.mobileelectronics ALTER COLUMN product_me_id SET DEFAULT nextval('public.product_mobile_electronics_product_me_id_seq'::regclass);
 N   ALTER TABLE public.mobileelectronics ALTER COLUMN product_me_id DROP DEFAULT;
       public          postgres    false    267    260            '           2604    59586    mobilehomebanner id    DEFAULT     z   ALTER TABLE ONLY public.mobilehomebanner ALTER COLUMN id SET DEFAULT nextval('public.mobilehomebanner_id_seq'::regclass);
 B   ALTER TABLE public.mobilehomebanner ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    262    261            +           2604    59587    notifications notification_id    DEFAULT     �   ALTER TABLE ONLY public.notifications ALTER COLUMN notification_id SET DEFAULT nextval('public.notifications_notification_id_seq'::regclass);
 L   ALTER TABLE public.notifications ALTER COLUMN notification_id DROP DEFAULT;
       public          postgres    false    264    263            -           2604    59588    payments payment_id    DEFAULT     z   ALTER TABLE ONLY public.payments ALTER COLUMN payment_id SET DEFAULT nextval('public.payments_payment_id_seq'::regclass);
 B   ALTER TABLE public.payments ALTER COLUMN payment_id DROP DEFAULT;
       public          postgres    false    266    265            .           2604    59589    product_order_cancel cancel_id    DEFAULT     �   ALTER TABLE ONLY public.product_order_cancel ALTER COLUMN cancel_id SET DEFAULT nextval('public.product_order_cancel_cancel_id_seq'::regclass);
 M   ALTER TABLE public.product_order_cancel ALTER COLUMN cancel_id DROP DEFAULT;
       public          postgres    false    269    268            0           2604    59590    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    271    270            3           2604    59591    ratings_and_reviews id    DEFAULT     �   ALTER TABLE ONLY public.ratings_and_reviews ALTER COLUMN id SET DEFAULT nextval('public.ratings_and_reviews_id_seq'::regclass);
 E   ALTER TABLE public.ratings_and_reviews ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    273    272            4           2604    59592    return_order return_id    DEFAULT     �   ALTER TABLE ONLY public.return_order ALTER COLUMN return_id SET DEFAULT nextval('public.return_order_return_id_seq'::regclass);
 E   ALTER TABLE public.return_order ALTER COLUMN return_id DROP DEFAULT;
       public          postgres    false    275    274            5           2604    59593    social_logins login_id    DEFAULT     �   ALTER TABLE ONLY public.social_logins ALTER COLUMN login_id SET DEFAULT nextval('public.social_logins_login_id_seq'::regclass);
 E   ALTER TABLE public.social_logins ALTER COLUMN login_id DROP DEFAULT;
       public          postgres    false    277    276            6           2604    59594    subcategories subcategory_id    DEFAULT     �   ALTER TABLE ONLY public.subcategories ALTER COLUMN subcategory_id SET DEFAULT nextval('public.subcategories_subcategory_id_seq'::regclass);
 K   ALTER TABLE public.subcategories ALTER COLUMN subcategory_id DROP DEFAULT;
       public          postgres    false    279    278            9           2604    59595    superadmin id    DEFAULT     n   ALTER TABLE ONLY public.superadmin ALTER COLUMN id SET DEFAULT nextval('public.superadmin_id_seq'::regclass);
 <   ALTER TABLE public.superadmin ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    281    280            :           2604    59596    transactions id    DEFAULT     r   ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);
 >   ALTER TABLE public.transactions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    283    282            =           2604    59597    variantproducts variant_id    DEFAULT     �   ALTER TABLE ONLY public.variantproducts ALTER COLUMN variant_id SET DEFAULT nextval('public.variantproducts_variant_id_seq'::regclass);
 I   ALTER TABLE public.variantproducts ALTER COLUMN variant_id DROP DEFAULT;
       public          postgres    false    286    285            >           2604    59598 !   vendor_product_policies policy_id    DEFAULT     �   ALTER TABLE ONLY public.vendor_product_policies ALTER COLUMN policy_id SET DEFAULT nextval('public.vendor_product_policies_policy_id_seq'::regclass);
 P   ALTER TABLE public.vendor_product_policies ALTER COLUMN policy_id DROP DEFAULT;
       public          postgres    false    288    287            @           2604    59599    vendorbulkupload bulk_id    DEFAULT     �   ALTER TABLE ONLY public.vendorbulkupload ALTER COLUMN bulk_id SET DEFAULT nextval('public.vendorbulkupload_bulk_id_seq'::regclass);
 G   ALTER TABLE public.vendorbulkupload ALTER COLUMN bulk_id DROP DEFAULT;
       public          postgres    false    290    289            B           2604    59600    vendorclaim claim_id    DEFAULT     |   ALTER TABLE ONLY public.vendorclaim ALTER COLUMN claim_id SET DEFAULT nextval('public.vendorclaim_claim_id_seq'::regclass);
 C   ALTER TABLE public.vendorclaim ALTER COLUMN claim_id DROP DEFAULT;
       public          postgres    false    292    291            E           2604    59601    vendorpolicies vendorpolicy_id    DEFAULT     �   ALTER TABLE ONLY public.vendorpolicies ALTER COLUMN vendorpolicy_id SET DEFAULT nextval('public.vendorpolicies_vendorpolicy_id_seq'::regclass);
 M   ALTER TABLE public.vendorpolicies ALTER COLUMN vendorpolicy_id DROP DEFAULT;
       public          postgres    false    294    293            F           2604    59602    vendorproductorder order_id    DEFAULT     �   ALTER TABLE ONLY public.vendorproductorder ALTER COLUMN order_id SET DEFAULT nextval('public.vendorproductorder_order_id_seq'::regclass);
 J   ALTER TABLE public.vendorproductorder ALTER COLUMN order_id DROP DEFAULT;
       public          postgres    false    296    295            H           2604    59603 
   vendors id    DEFAULT     h   ALTER TABLE ONLY public.vendors ALTER COLUMN id SET DEFAULT nextval('public.vendors_id_seq'::regclass);
 9   ALTER TABLE public.vendors ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    298    297            J           2604    59604    vendors_notifications id    DEFAULT     �   ALTER TABLE ONLY public.vendors_notifications ALTER COLUMN id SET DEFAULT nextval('public.vendors_notifications_id_seq'::regclass);
 G   ALTER TABLE public.vendors_notifications ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    300    299            K           2604    59605    withdrawals withdrawal_id    DEFAULT     �   ALTER TABLE ONLY public.withdrawals ALTER COLUMN withdrawal_id SET DEFAULT nextval('public.withdrawals_withdrawal_id_seq'::regclass);
 H   ALTER TABLE public.withdrawals ALTER COLUMN withdrawal_id DROP DEFAULT;
       public          postgres    false    302    301            Y          0    59255    apploadingscreen 
   TABLE DATA           >   COPY public.apploadingscreen (id, apploading_url) FROM stdin;
    public          postgres    false    216   Q      [          0    59261 
   attributes 
   TABLE DATA           k   COPY public.attributes (attribute_id, attribute_name, attribute_values, category, subcategory) FROM stdin;
    public          postgres    false    218   �      ]          0    59267    audioheadphones 
   TABLE DATA           r  COPY public.audioheadphones (product_ah_id, ad_title, currency_symbol, city, state, country, brand, category, vendorid, is_featured, is_sold, is_negotiable, created_at, rejection_reason, status, updated_at_product, uniquepid, category_type, subcategory, condition, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, driversize, impedance, frequencyrange, additionaldescription, searchkeywords, keyfeatures, videourl, salespackage, isvariant, quantity, postalcode, inthebox, images) FROM stdin;
    public          postgres    false    220   �      _          0    59278    cameraphotography 
   TABLE DATA           �  COPY public.cameraphotography (product_cp_id, ad_title, currency_symbol, city, state, country, brand, category, vendorid, is_featured, is_sold, is_negotiable, created_at, subcategory, rejection_reason, status, updated_at_product, uniquepid, category_type, condition, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, modelname, storagetype, storagecapacity, displaysize, screenresolution, connectivityports, batterylife, dimensions, weight, warrantyinformation, additionaldescription, searchkeywords, keyfeatures, videourl, salespackage, isvariant, quantity, postalcode, inthebox, images) FROM stdin;
    public          postgres    false    222   �      a          0    59289    cart 
   TABLE DATA           �   COPY public.cart (cart_id, customer_id, vendor_id, product_uniqueid, category, subcategory, quantity, addeddate, updateddate, variantlabel, mrp, sellingprice) FROM stdin;
    public          postgres    false    224   �      c          0    59297 
   categories 
   TABLE DATA           �   COPY public.categories (category_id, category_name, category_description, category_image_url, category_status, created_at, updated_at, category_type, attribute_cat_id) FROM stdin;
    public          postgres    false    226   �      e          0    59306    clothing 
   TABLE DATA           q  COPY public.clothing (product_fac_id, ad_title, additionaldescription, countryoforigin, manufacturername, packerdetails, searchkeywords, keyfeatures, videourl, salespackage, city, state, mrp, sellingprice, quantity, inthebox, isvariant, status, category_type, currency_symbol, uniquepid, vendorid, postalcode, country, category, subcategory, skuid, images) FROM stdin;
    public          postgres    false    228   �      f          0    59312    conversations 
   TABLE DATA           h   COPY public.conversations (conversation_id, customer_id, vendor_id, conversation_user_type) FROM stdin;
    public          postgres    false    229   �      h          0    59318    coupons 
   TABLE DATA           �   COPY public.coupons (coupon_id, coupon_code, discount_type, discount_amount, expiration_date, vendorid, associated_products, created_date) FROM stdin;
    public          postgres    false    231         j          0    59324    currency_values 
   TABLE DATA           K   COPY public.currency_values (id, usd, kes, eur, etb, sos, inr) FROM stdin;
    public          postgres    false    233   �      l          0    59330    customer_address 
   TABLE DATA             COPY public.customer_address (address_id, customer_id, given_name_address, family_name_address, email_address, phone_address, country_address, zip_address, city_address, subregion_address, region_address, note_address, default_address, apt_address, phone_code) FROM stdin;
    public          postgres    false    235   �      n          0    59336    customer_delivery_address 
   TABLE DATA           �   COPY public.customer_delivery_address (id, customer_id, first_name, last_name, selected_country, street_address, apartment, selected_city, selected_state, zip_code, email, phone_number, orderid, unique_order_id) FROM stdin;
    public          postgres    false    237   �      p          0    59342    customer_follows 
   TABLE DATA           ]   COPY public.customer_follows (follow_id, follower_id, following_id, follow_date) FROM stdin;
    public          postgres    false    239   �      r          0    59347    customer_transactions 
   TABLE DATA           �   COPY public.customer_transactions (transaction_id, customer_id, datetime, description, amount, closing_balance, wallet_txn_id, send_to_user, invoiceid, status, transaction_wallet_id) FROM stdin;
    public          postgres    false    241   �      t          0    59353    customer_wishlist 
   TABLE DATA           �   COPY public.customer_wishlist (wishlist_id, customer_id, uniqueid, label, category, subcategory, vendor_id, mrp, sellingprice, created_on) FROM stdin;
    public          postgres    false    243   c      v          0    59359    customerclaim 
   TABLE DATA           !  COPY public.customerclaim (customer_claim_id, customer_id, customer_claim_description, customer_claim_status, customer_claim_date, customer_reply_description, customer_reply_date, customer_closure_description, customer_closure_date, customer_image_files, customer_video_files) FROM stdin;
    public          postgres    false    245   �      x          0    59367 	   customers 
   TABLE DATA           �  COPY public.customers (customer_id, given_name, family_name, email, password, phone_number, address_line_1, address_line_2, city, state, zip_code, country, bio, verified_with, created_at, updated_at, status, picture, google_id, facebook_id, verification_code, verification_expire_date, customer_loggedid, customer_interest, apple_id, mogadishudistrict_customer, nile_pin) FROM stdin;
    public          postgres    false    247   �      {          0    59377 
   homebanner 
   TABLE DATA           A   COPY public.homebanner (id, banner_url, title, link) FROM stdin;
    public          postgres    false    250   h0      }          0    59383    items_not_arrived 
   TABLE DATA           �   COPY public.items_not_arrived (id, vendor_id, product_uniqueid, customer_id, request_text, selected_option, created_at_request, response_text_from_seller, order_id) FROM stdin;
    public          postgres    false    252   �0                0    59390    laptopcomputers 
   TABLE DATA           #  COPY public.laptopcomputers (product_lc_id, ad_title, currency_symbol, city, state, country, brand, category, vendorid, is_featured, is_sold, is_negotiable, created_at, subcategory, rejection_reason, status, updated_at_product, uniquepid, category_type, condition, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, additionaldescription, searchkeywords, salespackage, keyfeatures, videourl, modelname, processor, ram, storagetype, storagecapacity, displaysize, screenresolution, graphicscard, operatingsystem, connectivityports, batterylife, keyboardtype, touchpad, dimensions, weight, warrantyinformation, isvariant, quantity, postalcode, inthebox, images) FROM stdin;
    public          postgres    false    254   1      �          0    59401    media_library 
   TABLE DATA           j   COPY public.media_library (media_id, title, description, file_path, creation_date, vendor_id) FROM stdin;
    public          postgres    false    256   3      �          0    59408    messages 
   TABLE DATA           y   COPY public.messages (message_id, conversation_id, sender_id, recipient_id, content, user_type, "timestamp") FROM stdin;
    public          postgres    false    258   '6      �          0    59414    mobileelectronics 
   TABLE DATA             COPY public.mobileelectronics (product_me_id, ad_title, created_at, updated_at, city, state, country, currency_symbol, category, subcategory, condition, brand, is_featured, vendorid, rejection_reason, status, uniquepid, category_type, modelname, storagetype, storagecapacity, displaysize, connectivityports, batterylife, dimensions, weight, warrantyinformation, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, additionaldescription, searchkeywords, keyfeatures, videourl, salespackage, isvariant, quantity, processor, ram, graphicscard, operatingsystem, keyboardtype, postalcode, simcard, unlockstatus, cameraresolution, inthebox, images) FROM stdin;
    public          postgres    false    260   �<      �          0    59423    mobilehomebanner 
   TABLE DATA           M   COPY public.mobilehomebanner (id, mobilebanner_url, title, link) FROM stdin;
    public          postgres    false    261   �>      �          0    59432    notifications 
   TABLE DATA           n   COPY public.notifications (notification_id, notification_type, message, customer_id, "timestamp") FROM stdin;
    public          postgres    false    263   i?      �          0    59439    payments 
   TABLE DATA           �   COPY public.payments (payment_id, customer_id, order_id, payment_date, payment_method, payment_amount, payment_status, billing_address, billing_city, billing_state, billing_zip, currency_code, payment_source, vendor_id) FROM stdin;
    public          postgres    false    265   �A      �          0    59446    product_order_cancel 
   TABLE DATA           �   COPY public.product_order_cancel (cancel_id, customer_id, vendor_id, product_id, label, selected_reason, refund_amount, total_amount, detail_charges, created_at) FROM stdin;
    public          postgres    false    268   �A      �          0    59453    products 
   TABLE DATA           �  COPY public.products (id, ad_title, city, state, country, currency_symbol, category, subcategory, vendorid, uniquepid, skuid, mrp, sellingprice, countryoforigin, manufacturername, packerdetails, additionaldescription, searchkeywords, keyfeatures, videourl, category_type, quantity, postalcode, salespackage, brand, condition, isvariant, status, updated_at_product, rejection_reason, slug_subcat, slug_cat, images, attributes_specification, prod_slug, width, length, height, weight, product_ship_from, estimate_delivery_by, nested_subcat, nested_subcat_slug, additional_condition, mogadishudistrict_ship_from, additonal_condition, product_policy_id, somali_ad_title, somali_additionaldescription) FROM stdin;
    public          postgres    false    270   �A      �          0    59461    ratings_and_reviews 
   TABLE DATA           �   COPY public.ratings_and_reviews (id, vendor_id, customer_id, rating, review_text, medias, created_at, product_uniqueid, label, rate_order_id) FROM stdin;
    public          postgres    false    272   L�      �          0    59467    return_order 
   TABLE DATA           u   COPY public.return_order (return_id, reason_return, order_id, medias_return, detail_text, return_status) FROM stdin;
    public          postgres    false    274   H�      �          0    59473    social_logins 
   TABLE DATA           Z   COPY public.social_logins (login_id, customer_id, provider, provider_user_id) FROM stdin;
    public          postgres    false    276   e�      �          0    59477    subcategories 
   TABLE DATA           �   COPY public.subcategories (subcategory_id, subcategory_name, subcategory_description, subcategory_image_url, parent_category_id, created_at, updated_at, isfeatured, subcat_status, nested_subcategories) FROM stdin;
    public          postgres    false    278   ��      �          0    59485 
   superadmin 
   TABLE DATA           j   COPY public.superadmin (id, email, password, "userId", role_id, "position", name, secret_key) FROM stdin;
    public          postgres    false    280   h�      �          0    59491    transactions 
   TABLE DATA           �   COPY public.transactions (id, transaction_id, customer_id, transaction_external_id, amount, currency_code, transaction_date, is_verified, verification_date, payment_method, notes) FROM stdin;
    public          postgres    false    282   |�      �          0    59503    variantproducts 
   TABLE DATA           �   COPY public.variantproducts (variant_id, product_uniqueid, variant_mrp, variant_sellingprice, variant_skuid, variant_quantity, variantsvalues, label, vendori_id, variant_category, variant_subcategory) FROM stdin;
    public          postgres    false    285   ��      �          0    59509    vendor_product_policies 
   TABLE DATA           �   COPY public.vendor_product_policies (policy_id, vendor_id, policy_name, policy_type, policy_description, policy_status, policy_created_date) FROM stdin;
    public          postgres    false    287   u�      �          0    59516    vendorbulkupload 
   TABLE DATA           \   COPY public.vendorbulkupload (bulk_id, datetime, vendor_id, productids, status) FROM stdin;
    public          postgres    false    289   ��      �          0    59523    vendorclaim 
   TABLE DATA           �   COPY public.vendorclaim (claim_id, vendor_id, claim_description, claim_status, claim_date, reply_description, reply_date, closure_description, closure_date, image_files, video_files) FROM stdin;
    public          postgres    false    291   ��      �          0    59531    vendorpolicies 
   TABLE DATA           z   COPY public.vendorpolicies (vendorpolicy_id, shipping_information, return_policy, business_policy, vendor_id) FROM stdin;
    public          postgres    false    293   ��      �          0    59537    vendorproductorder 
   TABLE DATA           F  COPY public.vendorproductorder (order_id, vendor_id, product_uniqueid, customer_id, total_amount, order_status, rejection_reason, product_name, customer_name, product_image, customer_email, customer_phone_number, currency_symbol, payment_method, payment_status, city, state, country, brand, category, subcategory, product_type, transaction_id, commission_fee, withdrawal_amount, refund_amount, fees_paid, tax_collected, orderid, quantity, label, tentative_delivery_date, skuid_order, ispickup, seller_otp, customer_otp, order_date, created_at, shipping_fee, sell_price) FROM stdin;
    public          postgres    false    295   ��      �          0    59544    vendors 
   TABLE DATA           �  COPY public.vendors (id, country_code, mobile_number, email, password, brand_name, business_model, products, trademark_certificate, company_name, company_city, company_state, company_country, company_zip_code, shipping_address, bank_name, bank_account_number, bank_routing_number, bank_account_name, bank_branch, bank_swift_code, registration_date, mobile_verification_status, email_verification_status, status, business_type, registration_number, tax_id_number, business_address, business_phone, business_email, business_website, business_description, facebook_url, instagram_url, twitter_url, linkedin_url, business_logo_url, business_license_url, return_policy, shipping_policy, terms_and_conditions, payment_info, shipping_info, support_contact, categories, average_rating, total_products, total_sales, support_contact_1, support_contact_2, vendor_profile_picture_url, brand_logo, useridvendor, vendorname, email_otp, mobile_otp, reset_otp, followers, following, vendor_username, company_district) FROM stdin;
    public          postgres    false    297   ��      �          0    59551    vendors_notifications 
   TABLE DATA           Z   COPY public.vendors_notifications (id, vendor_id, type, title, message, date) FROM stdin;
    public          postgres    false    299   �      �          0    59557    withdrawals 
   TABLE DATA           �   COPY public.withdrawals (withdrawal_id, vendor_id, currency_code, amount, withdrawal_date, status, bank_account_number, bank_name, bank_branch, created_at, updated_at) FROM stdin;
    public          postgres    false    301   a�      �           0    0    apploadingscreen_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.apploadingscreen_id_seq', 1, false);
          public          postgres    false    217            �           0    0    attributes_attribute_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.attributes_attribute_id_seq', 24, true);
          public          postgres    false    219            �           0    0 "   audio_headphones_product_ah_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.audio_headphones_product_ah_id_seq', 45, true);
          public          postgres    false    221            �           0    0 $   camera_photography_product_cp_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.camera_photography_product_cp_id_seq', 41, true);
          public          postgres    false    223            �           0    0    cart_cart_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.cart_cart_id_seq', 1004, true);
          public          postgres    false    225            �           0    0    categories_category_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.categories_category_id_seq', 74, true);
          public          postgres    false    227            �           0    0 !   conversations_conversation_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.conversations_conversation_id_seq', 20, true);
          public          postgres    false    230            �           0    0    coupons_coupon_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.coupons_coupon_id_seq', 9, true);
          public          postgres    false    232            �           0    0    currency_values_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.currency_values_id_seq', 1, true);
          public          postgres    false    234            �           0    0    customer_address_address_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.customer_address_address_id_seq', 152, true);
          public          postgres    false    236            �           0    0     customer_delivery_address_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.customer_delivery_address_id_seq', 167, true);
          public          postgres    false    238            �           0    0    customer_follows_follow_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.customer_follows_follow_id_seq', 19, true);
          public          postgres    false    240            �           0    0 (   customer_transactions_transaction_id_seq    SEQUENCE SET     V   SELECT pg_catalog.setval('public.customer_transactions_transaction_id_seq', 9, true);
          public          postgres    false    242            �           0    0 !   customer_wishlist_wishlist_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.customer_wishlist_wishlist_id_seq', 155, true);
          public          postgres    false    244            �           0    0 #   customerclaim_customer_claim_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.customerclaim_customer_claim_id_seq', 3, true);
          public          postgres    false    246            �           0    0    customers_customer_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.customers_customer_id_seq', 196, true);
          public          postgres    false    248            �           0    0 "   fashionclothing_product_fac_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.fashionclothing_product_fac_id_seq', 8, true);
          public          postgres    false    249            �           0    0    homebanner_new_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.homebanner_new_id_seq', 10, true);
          public          postgres    false    251            �           0    0    items_not_arrived_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.items_not_arrived_id_seq', 1, false);
          public          postgres    false    253            �           0    0 !   laptopcomputers_product_lc_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.laptopcomputers_product_lc_id_seq', 121, true);
          public          postgres    false    255            �           0    0    media_library_media_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.media_library_media_id_seq', 49, true);
          public          postgres    false    257            �           0    0    messages_message_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.messages_message_id_seq', 211, true);
          public          postgres    false    259            �           0    0    mobilehomebanner_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.mobilehomebanner_id_seq', 10, true);
          public          postgres    false    262            �           0    0 !   notifications_notification_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.notifications_notification_id_seq', 17, true);
          public          postgres    false    264            �           0    0    payments_payment_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.payments_payment_id_seq', 104, true);
          public          postgres    false    266            �           0    0 ,   product_mobile_electronics_product_me_id_seq    SEQUENCE SET     \   SELECT pg_catalog.setval('public.product_mobile_electronics_product_me_id_seq', 365, true);
          public          postgres    false    267            �           0    0 "   product_order_cancel_cancel_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.product_order_cancel_cancel_id_seq', 1, false);
          public          postgres    false    269            �           0    0    products_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.products_id_seq', 4508, true);
          public          postgres    false    271            �           0    0    ratings_and_reviews_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.ratings_and_reviews_id_seq', 123, true);
          public          postgres    false    273            �           0    0    return_order_return_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.return_order_return_id_seq', 1, false);
          public          postgres    false    275                        0    0    social_logins_login_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.social_logins_login_id_seq', 1, false);
          public          postgres    false    277                       0    0     subcategories_subcategory_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.subcategories_subcategory_id_seq', 383, true);
          public          postgres    false    279                       0    0    superadmin_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.superadmin_id_seq', 27, true);
          public          postgres    false    281                       0    0    transactions_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.transactions_id_seq', 15, true);
          public          postgres    false    283                       0    0    transactions_id_seqs    SEQUENCE SET     C   SELECT pg_catalog.setval('public.transactions_id_seqs', 15, true);
          public          postgres    false    284                       0    0    variantproducts_variant_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.variantproducts_variant_id_seq', 133, true);
          public          postgres    false    286                       0    0 %   vendor_product_policies_policy_id_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public.vendor_product_policies_policy_id_seq', 1, false);
          public          postgres    false    288                       0    0    vendorbulkupload_bulk_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.vendorbulkupload_bulk_id_seq', 1, false);
          public          postgres    false    290                       0    0    vendorclaim_claim_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.vendorclaim_claim_id_seq', 17, true);
          public          postgres    false    292            	           0    0 "   vendorpolicies_vendorpolicy_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.vendorpolicies_vendorpolicy_id_seq', 1, true);
          public          postgres    false    294            
           0    0    vendorproductorder_order_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.vendorproductorder_order_id_seq', 229, true);
          public          postgres    false    296                       0    0    vendors_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.vendors_id_seq', 116, true);
          public          postgres    false    298                       0    0    vendors_notifications_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.vendors_notifications_id_seq', 44, true);
          public          postgres    false    300                       0    0    withdrawals_withdrawal_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.withdrawals_withdrawal_id_seq', 6, true);
          public          postgres    false    302            R           2606    59636 &   apploadingscreen apploadingscreen_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.apploadingscreen
    ADD CONSTRAINT apploadingscreen_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.apploadingscreen DROP CONSTRAINT apploadingscreen_pkey;
       public            postgres    false    216            T           2606    59638    attributes attributes_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.attributes
    ADD CONSTRAINT attributes_pkey PRIMARY KEY (attribute_id);
 D   ALTER TABLE ONLY public.attributes DROP CONSTRAINT attributes_pkey;
       public            postgres    false    218            V           2606    59640 %   audioheadphones audio_headphones_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.audioheadphones
    ADD CONSTRAINT audio_headphones_pkey PRIMARY KEY (product_ah_id);
 O   ALTER TABLE ONLY public.audioheadphones DROP CONSTRAINT audio_headphones_pkey;
       public            postgres    false    220            X           2606    59642 )   cameraphotography camera_photography_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.cameraphotography
    ADD CONSTRAINT camera_photography_pkey PRIMARY KEY (product_cp_id);
 S   ALTER TABLE ONLY public.cameraphotography DROP CONSTRAINT camera_photography_pkey;
       public            postgres    false    222            Z           2606    59644    cart cart_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (cart_id);
 8   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_pkey;
       public            postgres    false    224            \           2606    59646    categories categories_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public            postgres    false    226            `           2606    59648 5   conversations conversations_customer_id_vendor_id_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_customer_id_vendor_id_key UNIQUE (customer_id, vendor_id);
 _   ALTER TABLE ONLY public.conversations DROP CONSTRAINT conversations_customer_id_vendor_id_key;
       public            postgres    false    229    229            b           2606    59650     conversations conversations_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_pkey PRIMARY KEY (conversation_id);
 J   ALTER TABLE ONLY public.conversations DROP CONSTRAINT conversations_pkey;
       public            postgres    false    229            d           2606    59652    coupons coupons_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_pkey PRIMARY KEY (coupon_id);
 >   ALTER TABLE ONLY public.coupons DROP CONSTRAINT coupons_pkey;
       public            postgres    false    231            f           2606    59654 $   currency_values currency_values_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.currency_values
    ADD CONSTRAINT currency_values_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.currency_values DROP CONSTRAINT currency_values_pkey;
       public            postgres    false    233            h           2606    59656 &   customer_address customer_address_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.customer_address
    ADD CONSTRAINT customer_address_pkey PRIMARY KEY (address_id);
 P   ALTER TABLE ONLY public.customer_address DROP CONSTRAINT customer_address_pkey;
       public            postgres    false    235            j           2606    59658 8   customer_delivery_address customer_delivery_address_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public.customer_delivery_address
    ADD CONSTRAINT customer_delivery_address_pkey PRIMARY KEY (id);
 b   ALTER TABLE ONLY public.customer_delivery_address DROP CONSTRAINT customer_delivery_address_pkey;
       public            postgres    false    237            l           2606    59660 &   customer_follows customer_follows_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.customer_follows
    ADD CONSTRAINT customer_follows_pkey PRIMARY KEY (follow_id);
 P   ALTER TABLE ONLY public.customer_follows DROP CONSTRAINT customer_follows_pkey;
       public            postgres    false    239            n           2606    59662 0   customer_transactions customer_transactions_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public.customer_transactions
    ADD CONSTRAINT customer_transactions_pkey PRIMARY KEY (transaction_id);
 Z   ALTER TABLE ONLY public.customer_transactions DROP CONSTRAINT customer_transactions_pkey;
       public            postgres    false    241            r           2606    59664 (   customer_wishlist customer_wishlist_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.customer_wishlist
    ADD CONSTRAINT customer_wishlist_pkey PRIMARY KEY (wishlist_id);
 R   ALTER TABLE ONLY public.customer_wishlist DROP CONSTRAINT customer_wishlist_pkey;
       public            postgres    false    243            u           2606    59666     customerclaim customerclaim_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.customerclaim
    ADD CONSTRAINT customerclaim_pkey PRIMARY KEY (customer_claim_id);
 J   ALTER TABLE ONLY public.customerclaim DROP CONSTRAINT customerclaim_pkey;
       public            postgres    false    245            w           2606    59668    customers customers_email_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_email_key UNIQUE (email);
 G   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_email_key;
       public            postgres    false    247            y           2606    59670    customers customers_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (customer_id);
 B   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_pkey;
       public            postgres    false    247            ^           2606    59672    clothing fashionclothing_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.clothing
    ADD CONSTRAINT fashionclothing_pkey PRIMARY KEY (product_fac_id);
 G   ALTER TABLE ONLY public.clothing DROP CONSTRAINT fashionclothing_pkey;
       public            postgres    false    228            {           2606    59674    homebanner homebanner_new_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.homebanner
    ADD CONSTRAINT homebanner_new_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.homebanner DROP CONSTRAINT homebanner_new_pkey;
       public            postgres    false    250            }           2606    59676 (   items_not_arrived items_not_arrived_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.items_not_arrived
    ADD CONSTRAINT items_not_arrived_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.items_not_arrived DROP CONSTRAINT items_not_arrived_pkey;
       public            postgres    false    252                       2606    59678 $   laptopcomputers laptopcomputers_pkey 
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
       public            postgres    false    291            �           2606    59724 "   vendorpolicies vendorpolicies_pkey 
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
       public            postgres    false    272            o           1259    59734 %   idx_customer_transactions_customer_id    INDEX     n   CREATE INDEX idx_customer_transactions_customer_id ON public.customer_transactions USING btree (customer_id);
 9   DROP INDEX public.idx_customer_transactions_customer_id;
       public            postgres    false    241            p           1259    59735 "   idx_customer_transactions_datetime    INDEX     h   CREATE INDEX idx_customer_transactions_datetime ON public.customer_transactions USING btree (datetime);
 6   DROP INDEX public.idx_customer_transactions_datetime;
       public            postgres    false    241            s           1259    59736 !   idx_customer_wishlist_customer_id    INDEX     f   CREATE INDEX idx_customer_wishlist_customer_id ON public.customer_wishlist USING btree (customer_id);
 5   DROP INDEX public.idx_customer_wishlist_customer_id;
       public            postgres    false    243            �           1259    59737    idx_transaction_external_id    INDEX     g   CREATE INDEX idx_transaction_external_id ON public.transactions USING btree (transaction_external_id);
 /   DROP INDEX public.idx_transaction_external_id;
       public            postgres    false    282            �           1259    59738    idx_vendor_id    INDEX     R   CREATE INDEX idx_vendor_id ON public.ratings_and_reviews USING btree (vendor_id);
 !   DROP INDEX public.idx_vendor_id;
       public            postgres    false    272            �           2606    59739    cart cart_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 D   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_customer_id_fkey;
       public          postgres    false    247    224    4985            �           2606    59744    cart cart_vendor_id_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);
 B   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_vendor_id_fkey;
       public          postgres    false    5044    224    297            �           2606    59749 ,   conversations conversations_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 V   ALTER TABLE ONLY public.conversations DROP CONSTRAINT conversations_customer_id_fkey;
       public          postgres    false    247    229    4985            �           2606    59754 *   conversations conversations_vendor_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);
 T   ALTER TABLE ONLY public.conversations DROP CONSTRAINT conversations_vendor_id_fkey;
       public          postgres    false    297    229    5044            �           2606    59759 2   customer_follows customer_follows_follower_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer_follows
    ADD CONSTRAINT customer_follows_follower_id_fkey FOREIGN KEY (follower_id) REFERENCES public.customers(customer_id) ON DELETE CASCADE;
 \   ALTER TABLE ONLY public.customer_follows DROP CONSTRAINT customer_follows_follower_id_fkey;
       public          postgres    false    239    4985    247            �           2606    59764 3   customer_follows customer_follows_following_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer_follows
    ADD CONSTRAINT customer_follows_following_id_fkey FOREIGN KEY (follower_id) REFERENCES public.customers(customer_id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.customer_follows DROP CONSTRAINT customer_follows_following_id_fkey;
       public          postgres    false    239    4985    247            �           2606    59769 4   customer_wishlist customer_wishlist_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer_wishlist
    ADD CONSTRAINT customer_wishlist_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 ^   ALTER TABLE ONLY public.customer_wishlist DROP CONSTRAINT customer_wishlist_customer_id_fkey;
       public          postgres    false    243    247    4985            �           2606    59774 ,   customerclaim customerclaim_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customerclaim
    ADD CONSTRAINT customerclaim_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 V   ALTER TABLE ONLY public.customerclaim DROP CONSTRAINT customerclaim_customer_id_fkey;
       public          postgres    false    247    4985    245            �           2606    59779    transactions fk_customer    FK CONSTRAINT     �   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id) ON DELETE CASCADE;
 B   ALTER TABLE ONLY public.transactions DROP CONSTRAINT fk_customer;
       public          postgres    false    282    4985    247            �           2606    59784 !   customer_transactions fk_customer    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer_transactions
    ADD CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 K   ALTER TABLE ONLY public.customer_transactions DROP CONSTRAINT fk_customer;
       public          postgres    false    247    4985    241            �           2606    59789 &   messages messages_conversation_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(conversation_id);
 P   ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_conversation_id_fkey;
       public          postgres    false    258    229    4962            �           2606    59794 :   product_order_cancel product_order_cancel_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_order_cancel
    ADD CONSTRAINT product_order_cancel_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 d   ALTER TABLE ONLY public.product_order_cancel DROP CONSTRAINT product_order_cancel_customer_id_fkey;
       public          postgres    false    268    247    4985            �           2606    59799 9   product_order_cancel product_order_cancel_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_order_cancel
    ADD CONSTRAINT product_order_cancel_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);
 c   ALTER TABLE ONLY public.product_order_cancel DROP CONSTRAINT product_order_cancel_product_id_fkey;
       public          postgres    false    268    5007    270            �           2606    59804 8   product_order_cancel product_order_cancel_vendor_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_order_cancel
    ADD CONSTRAINT product_order_cancel_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);
 b   ALTER TABLE ONLY public.product_order_cancel DROP CONSTRAINT product_order_cancel_vendor_id_fkey;
       public          postgres    false    5044    268    297            �           2606    59809 ,   social_logins social_logins_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.social_logins
    ADD CONSTRAINT social_logins_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 V   ALTER TABLE ONLY public.social_logins DROP CONSTRAINT social_logins_customer_id_fkey;
       public          postgres    false    276    247    4985            �           2606    59814 3   subcategories subcategories_parent_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.subcategories
    ADD CONSTRAINT subcategories_parent_category_id_fkey FOREIGN KEY (parent_category_id) REFERENCES public.categories(category_id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.subcategories DROP CONSTRAINT subcategories_parent_category_id_fkey;
       public          postgres    false    226    278    4956            �           2606    59819 &   vendorclaim vendorclaim_vendor_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.vendorclaim
    ADD CONSTRAINT vendorclaim_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);
 P   ALTER TABLE ONLY public.vendorclaim DROP CONSTRAINT vendorclaim_vendor_id_fkey;
       public          postgres    false    297    291    5044            Y   >   x�3�t,(��OL��K/N.JM��5470167��0567����IU(.�I,��K�L����� �p)      [      x������ � �      ]   �  x��UMo�@=/�bO=�����R���Ur�S]j��q�FQ�{gY'nWJ*U�.�<�7o��nV69�6}G.�ə-����fmɧ6+-�v�y���ͺk�yO�!?��3.B`! �"e"�Akɝ'6�2I��R�4F '\��˺ˮ曞���ʎ��s�-���{J��yF ]��"�p3��yo��3�%�����.�ki~��'v�	���>�	�!�?�rO8_8е�ȴ�\"{�d�i��@
���'��P��)�X*x�t$�Q�3��f�+�<sx�6o�+Xv|��	س�?>�zQ/*RW�=�ٺ���Q��]��ݠ�ᛕv7ނN�J����^ۍ]C�l��H<"��o��8D8���!GD;�.fHW�R��T����1���	�X�:�'ru�o�'��Nht'�@�z\��G!�A�C��ն(�bU^䑸���*Ǔ��:�w%x�����k>/�t{:�c E�5��`"-���D�s����#��]����ϳ�=(}#̨|����U��K״��H^�Sq�BIlֻV�Lq�*�9J$�[�] %i���M�6+����1�S�BDB0	��H��Ib���!��+R0\7�f4~?�f�eyN4��?]=���sa[:-lfg/e@J��E��X�{m(4��L��9`V8�]G�'h����jo/j49�p�O�0(#Q�$���C�-�L��ly\DA�fc      _   #  x��QMO�0=���'n�b7���!!�4q��k
ݒ�SS�⿓��I�ʓ��؎�"��l�qy���Gv�42�Z��@^�����nZT��a��,AL���j�l(OKIuU�%ﺑ�x���<�}D0�SE,�A���;PD���������Gb�@9�����Jv�`��̨p�����W�B�\I6ڧ��!N���Y���s��$ŉ8�J�:HA<'���m�q����o�[�����j{t�[���
�P��E]c�K��2On���à��n���ViE����^      a      x������ � �      c   �  x��Zm��H�L~E+6w�A@��oIf�M��=mr]�R�m��O�����T6�nϮm䆢�����������ޖy.�6{�ec0�hײ���b-�	� 
���v�� �c'��ܜ��Z���.7��t8s��,}�
��kK��˴K���������2�uo�&)w�f�=�u��rŒ.�
Q�Y*�l�i&Zv���-{��"gw�~�m��D�j��k�ײ�ػ�ܲU-��ԗ%E�*Q�0۴�X[�u��[ٲ������6e��M	Wd�Ȣ�D�,�ciG�����X"Z�B�$��G�)S���r�'؞�N��1+��iV�_�ϊ/��S�nX��l��i�k�b^%e���=�c�oɔ���eY7�������ah��\�a����A�K߱B�Dܹ�4=H�5~�8�[���tm����t�8���D�se�r�EK'�"�����gY�D�Yƍ�][n�����]ι
���(2�ftp+l��-�"���CuYdI�~���j��؞��>M91W+s�Hz��8�k_��qiI��x����7Rt��`_��/O~}�ఆ�����^d �,*�Z�	����Z.���},T�d�� �?+�~�������b7�Y�/N���
-�v �� ���S�]&��OJ��Ͷ4��c� .�F���2��$�n��|[n+�My��R�Z��\��	%QY4l+%��2���E��I{���8;��n�&M�h �F~�����C׏mn������~hE {�ӥY&;ƻZ�\��F��p�v5��q䆑k������t�lV��v�-Mٷ�;�2A>M[w[�W�i�B�w5��1�<SD�O��Ikm-غ�ZQ#��L%����.=L��s��.��m����n>e+$�>�ƗZ�z_P*([�JP:�����ƀ�<+���*/k�rv�l��@b:A��.�h�B�B
{��.�f/z8�2An���{
][�y��>-8ܔ�\��h
`�Փǚ9"2�P
�?�ȳv�`�Z��UW�����S��T���w4��܍}SE�vt�P�%�-���זf����V�X���d�а�]U��5TE^�-b ���3�+iH9���*1]�Ah�U?����{�=�l'
��|�]�x��I��,�ӥ�4��[�{#��U�q��������̒�vh�<���>.M�p�� BMB��6��42Se�S��t��wmi��5~��"�Dz[�U����Ǳù�>[��k-���hx�z����gq�q�mi����x�J���_��qEO�g:e�����A��Xפ^X+��)�5�զ,��B1��-R!#�m��v��tT'(�I�U�* �:�#�Ў��T	+�.[2&9p�tD�9S��ߢ���LZlȣ�=�)�z�}_�GBf0��:�4�+����` ��'d�l�nS��7���lu"��Bߙ��t�̴	M7d*���c9>�C��Ҍ�|�c���=G?n�~����q��
�s*��,z����EU��������ʩш�kģoĚ���[�iU�*۵�б/��4C�o|E:���x��y�Ȑ�0FI0I7��E�P��߻���{�T���H�Z��C7rK�����Q��5�G�9q�� ��[dr\lj=m��(H#����s��;��D�p-Y+��թ~D��U���8��	7O��5ŅA�<J�
	C�vmݨ��q�c���e�9��ȴ�KΗNl�v�++S<9��	B.^�C��X���(�73W����]���,��u�H�,�$}l���k����U��[�,]v�8�)�&L���"!��2C�m��_`)�����w̡I<���h'^z8� TrFRӥY\#�]Y�(�j��W��d�L�A��k*�Ԃ¤�����vpZ�gK3w�qDAG�.k��u�8s�ϨW�瘣1"�D�I�Hv��.��j�6`C� �ܳ�t�4���D�����g: �Qu>t_���®�����(�]��[)���#w-)G@���"��*�����M�I4n�xSI�8��81U�So�U��a�:��q�������lvOX�CjS�S!�F���!���'�U�
R'4�I�rT����b�I���^]f�F�O��"C���u��$������T�2'_0�L�'-������ӽ�ސ�q���L���q�U�Ɇ�m�`%�рcC;�˚~�]�f[�O�Q�'$��=��$7��+�L���O�k� �����R�i�WK��|�:�i�?���H��CU�ʏ*��|m��&\|5�-i!�txa�"�_Z�8�!�[���6YC#�#�w?;��v����*��Քm�i�������~a�Y�frܱx�{v�2]�)an��H�?[�=�G\;�C�A�+S��`n[�@\[�i���S����Od��8ij�&�MKo�Σ��hw6�R)EMXI)M��*g�t�R ceKT�c�K2Su^`h𬒚�&���ה6��X	\ٺ�ن����Q�Nsm%�AQB.��gߪ5���SH�M[��xԞ��U����v#M�18Z�;�����tT���KwP!U*č�U\�?H�f�S�h79]��du�>7�<�vrU���r��t�e�����������EW*�P��Bl�w�S"%�tu�5jZ��
νP�H�=Y�g��ƍn�pz�{��K�H�׵��"���$������W�=
(���8HIeJ�ٳ�˙��˞m�i>L�(}��`E��*��)��*��8��j����b_�ڗZ��������԰��X�� �L:>j�gM^<�y�ɽ�/�QC�F@�c�^&��l���h�?'t��*���0��R�#EѴeeR���\��	�F�P��_�&	�녗۴(�|�~����3v�3�ų̉��!\lǮ�\[�":�&���$HY?�}���uՠ������^\��F��>\[��8�7��D�-�1P���p'7Y�����.��_��Es h��q\: 5&"i`~����%���L�o��m�}����.����~��?~��gn������|_=|���w$��]�}KAH�p���\�9�����q�ז�$��˿au���0�4&�=�,5W�����p��z�,/}aT���{�h1)�\�2���)Ψ��cFj���_ӣP�S@��F�[�O��?I�wF��X��g�m�A�0컋�s�t|'�w5���!Ncp�-���DDg]�ti
�?�/^�@�aL      e   �   x�5���0���Sxb�P~WB0��K�ZIJh�� �R@��N��[b��h��7���TAt����6��Qv�O�)���=�3�64,)񫋚���3�Fmn�q�VG-��E����gwo=#��{\p9o���&PL�,��~��=�BC#Z�%���X�����1�u���[r'I��DE�      f   j   x�U�;� ���"|�p�nUǪR?�/��>�vB������/ �@l�$���$W�F$bD��� �ۥJ ���R�f����� ��y�Js����uq�}�IO      h   �   x�3��K-72�T�42�30 �Fƺ����ƜƦ��J@Y��Լ��"�Z�����SjqIh^Jj�F�F�1~3.KN'��Ģ|C#cN7NS�r]�e� ��J�>�
��y�
�&
N9��:
�F
�N�@5p��qqq ��)(      j   .   x�3�4�44��3�0�4г46�45��z���z�f\1z\\\ ��y      l   �  x��X�n�8}f�b���j ���oU�t��q����b,ƒhPTR���sv$���7i���a�5sxxf8�'|�!U��K6�L�,�����9��p�s�� �"r��~,��	L,ZY��w݈�O�,�76B�fz�0�UaW,6�VȾ�����hv�od��YB�����3�.qE�h���D6�9�D6�s�i�<���P�����n�v�l��{����l,���l�
YQ����QY��2+K�2���g��2e�8;Nq��7��ޜ�m�Z�de���0��P4��8s���4���$���n�Eyyu�(;� ��À�U$���>�钝�b����S4X��l��%0��)*J\I�CrW@�ŭʀ��v7�OD/�>�p�<��HJ(��hXUw�u��d��+XK�#vBQ�־��O��O�w��L2�"�H���7zn0�U1�eSh�q�9+������~���G��H/�S0�bN�*7�}�4�5��蜺;k�:t�u�,��BJ��s��E�%T�h��ɧ��pi_/��&�Ff�:��2���F>qB�x�Sd'6UzI��v�������D�2]�A�;�ؚkP�������$t����{1��g8���'J�8��;��5񴘿�q���I�.�f����W�Rֱ�Y
���E�
ƨ��Rp�1Y���vߔ��S=%ES��G�"�]�U�4A�Υ��T�mt�8�F�l��wR'�w��b>.�>�z��x+��/�M�d���lu}7��R�&Q#�} ���r���>��.�0&��MJ�����r�~p�ߛ<�y�͇������CTQ<��Q��}��8��,�l�����Dr	��jd1W�v^7���:g_��W�6E8�[���uw�!.�� ���R		����nlŐn̻u��Y|#W%��\&��E��.�'j�u�"_�W+n@e�O�R�N���^0��ٮ
����V�-�χ�Q�B©�v���<����hQ<�B�wM����Z���l���F��t�������皎����؝[����QOp��1�:5Q�%�"ėF�n���A�=�׈��O�3jt�˛r�����w�G?��6w�����:Iy����L_˲i��.�)�Ա�f�j�_y0��*�Vj&a(*�[�ç����Z��G������}��3�		F���ͪ����~��7Ml}9<88��c(      n      x������ � �      p      x������ � �      r   U  x����N�@���}��?�}O&z�R�&�
��ۻ����r��o�of1�$�9��k���C���m��n_=�}��QH����]A2�Q�Ŧ請~����}���]u	�3���G�Y��bF	#��ހ4�5����z&I��L3L�1 y�,A���c$�D��̐C㖈8�h5�O�b�a��F���Z��r!6,5�q�>r���ku�L'���%�_� �s�L��%����5D]n�)���e�(�x�V+�n�I6#�l:�&��r�I�#z�utc�R���A�ɔ"C2'ǳ�X���D��1|%�4�Dj.n4E�!�]ֳ��Ɓ�      t      x������ � �      v   
  x�uпj�0��Y~�#K�D�Ig���K�Э� ��Q�H�Ny��4)i@��#�})B��6�1����	R>^iڅ�����%��0A��j)���S/�T���^�7T;�z���Y܆N�t�l=:�?�fs�Ǭ�rg�P��J�����ہ�<��W�.� `��Ү����HoKF��]"o�t��ʓz�M�Kz��(k�{�����8��� r~ ����J �Xn�4q}�x��"3ӱ����=�M�E���I��.��v<�[      x      x��Zis�X����L�LǼ��|��/�Yfߗ��		H $��1��]��f1�5UF�,��7��r/CZ�qm�l3{��������5�}�������r����b1v��h ���	^z�LJD��6Y�����ٝ`}|�W��p1_��U����s2=��[�͞���&��Nօ����\�f�-ɠ���.��J�4� $ Q�)�3"	B���F��Ęk͉a���Ç�d1]|��ߐ�7�VLO75�U�>�̺~yn���=l���+p�����^��d�����S�7�����3�kl��ִ��Y�V��2Vvx0���d��^ ����G"���r�.T��Ii~����U'��׃�_sĿ0��ZF�Y���A���[S�2#��&S&Y�^n�*�bVڳh����ٳ���fY6�bU���k���x�?aB2�0#T=���8��GF/�(���G"p�PDĥ"~�g������ni�ށ7������J�-[�!�����W��=l�duH����.�@7�_1�R$�F	��|!@�Xr@���Q&�5���5>��g3ټ��٥����z�$�u/g�W�RȬժ�6p�l0θ�i0MWܕ���ʄ2�ꍋ/�Q�OH��=�ト�+|���>a;�;�)��E���*v����|�j�u�,��1�Z�#@���ϛ��i�uq�w��?� ���b#�P]��H�t��<Ղ�Hq�� 0$��37ܹ���||Ge��/�t�[+p�x�[�K\B�@_�y��C`���IV��5�lY%y#�zN�x6O:�
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
Ŭ2�`\p�ëh$�St�N��N�t�'��������܂J �G�/�!�.	�	nbb3a0"�!Uf2&T�7��:T���*�K��_�h}j�      {   s   x�3�� .S���@0-LC�D''r's�C8) ��.#7؅�1؅ː�)1//��X�������������D7-1�*Q���7@�@�PA�XS/� �3hW� ��(�      }      x������ � �         �  x���Qo� ǟ/�"O}Z,���-�4i�&E���/4��-̸M�i�}����Z�k�d���ο��f��Ej�I��N§;edL~h�m��;��@�p�J([ .�����X�q��y��뭛����[w�ם�o!1�Dp\��Ϊ�m��!EH���׆B�c�O�����'lcn][E���"�3��W�Ł���
E�DLRv@@����' ��/��*���h�hk��E0��C��%��������H�~���E��@�D�)ʠ�)8y�p�ލt�O���I���#/��a�k3 Ґ�0go�ƒ~��/7�?�F���/�Z�m�TyQQ�� \L�Z.K��ՙ���v���.�<���f�+gg�l���$�Y��8z�֞�62��EYb!J*����r[_Z{���K���c��י�������{�l�paV�<#��N!.((�u�N�U��4��fF?��6QE�x�}�^d���7$Ə�      �     x���Ko1�s�)|�b�����ހK�� �mYP m��H��g6�`�ˬV���4��?^���_�����n?|��>X=�>��w���@j�Z�&�ߟowc8ݍw7����m8������x���_o�6��%l�cfy�1�(�Q|&��d�����py��|y����^}ԤFJ���+  e�Ǎ8V�=�y�R�gz��@�����ϭ�JK����cII%���ZJQ�;�:�T�!ϫQ��D���G��sI�$8*wkJ��@���ڸX��J�<�xD�����Q@�<6%Zsw�+g�+�������02kg�r��
i�kbh�c�}����xҔS����zz&�1�Pb�.Eɕ2&UpKe�;*���J
X��W�M���t�I�dIlB�W
��˳�q�9޼zj j�����jY�+V��l��V�Д�Y�y�-�
�N1�i9^��o·�!t~�	$�2���X�'XK)kV�T(@{�C��=�"(�R�m��հw7[�|0�|�1�x�S ��u:~I��=1s�U�E8b��k&���W:�k��)ڬ�pO�pW5/�YcM�퉢�]+.�K,���'�xA�^�D�ݓWG��n'�j���:�6�N�s���	�#.�q�	zܗi�D4���-�x��}tε�]K�k8��[�\q)n��ʽ�V��-/��	/v	�+��[͐˒n��3u'ހ�y��p�	��ýW����=g�v`;ܛp�.H�Bf­ۥ�ܕpE��qw9�?�LO}�]�}����7?���      �   R  x���n�F���Sr(R�1�Kr���p$v�\�N� ��ĵ�E*�����}�>IgI{��Vjzj�(A���pg��QHz�����ͻ��V���O��� �I�_�(�#D�EBE��XJ#1�sI�4�abK8�M	KC���������$Nb�s���> 6 17y���x�繢4��pCQC] "j����� ��o]��t�&�"����f����<�.�RXS����b~ ��A�A>u���lC��M.��jf����kT�;�`@H%�BE�-o��ۮɛY�e���_D��^/\�aZO~��
5ȗj� �q�)E��]�-��u,����7
��ߙ�+EٛjD�P.qĔ"b�� j	}���&���+ ��ʺŹ(��Wy��)��0������=�Gc��]�R�X� ��ęo�Ϲh�����\·N��j{}{��F��=/���Bz� @��~�<F�� �X�
z]K��L�Ћ��} hT��Q�FB,�p�Հj!�J	'�H�t�3�1�ı>�����Q�i��QP� �SEL?2+�wn �N��O�xx0���"�~�����طȅ(*G�zbL��w"8vI9�����4nLs�tKY���Q�{���M�A_6!!B�a�H���DG���_�ks@׳��<'HPK;>�M��BU�PhK�3(�Z�D1�3�ɕ��eV� (#ӏ1���Ǚ�Κ�3
�g��_(��At"�!�OEC>����D�m<R��8̢��vqY������r݆(x[h��?�$�7��둃?��vSG��� �gt��>���p�y?�7�q�ݎh�	w�WY����C����D%|�ge�:�e�1�p�r�~�2����a��-֤s��e��'��k7�I���*�/���YB����Fd���h`%�v�Z�]��]�Ji�6!S[������ڸ�\�U�(��N���L����nr<E[�>+c��$��P�e�42J�	s��	�a��D��lv ���	�j�����T �oйuy�=�'+N½!w:�Y�E^u��Zv+��)���������.�݀m�iK7¢�TX���X��X@Ӣ{��U�Y�*?.4XA��D洉M}@�8J?n4�����H2`zR:�K"�����H@�1�q?1�]���O	�]w�����	��$4{�y��m+f�6�1\�ج�p^���_Kp���^�%�r.˶�a]�9�Uՙ�ᶪ��]�U��[xvS�`T���/����W]��q�u)�R�>V%x�o���}��x�9W�<�_1���g�Um>�_��0y|�O���"�B-�vHU~�����kH��V�d�PY��M�3�A�A�)��&����1�T�E;�b!����&W���iы����,�R�v��Qz��L�:����X{Q�.J=w�ڙ����ʍh��U�V��B-r���;EwV��8Ix��j�<@�#���	����z��O�8�k[����'�(��(|���kB��T�3���B���G���r�p�]���}0��{��n�l�-�s�{{��0�����c�?�>��������o��y�      �   P  x���]o� ��O~�K,�8�k�,��tռl��bpB���մ�>���J��I6�s �ׯ�$�si��BI�t�.ꍮ$PL�!#!�&Q2�i@�	y��I�ߞp}	���Mc8\TBq�}=�Y)���J�z�J���V
8��RB��}0��1����b�7��w�(���C:?�8HG��7ρ���}�VȺ��p)���@�o��'WW�߇Pn]�r�!S[_"��"W�{��Y;�'1\�J�{n��f��2W���� L����m�hv+M�"B&4��I�2F�S�/�g����K��>ba��g�q:=��!E�3��[�-�-h����iwm�=�:!�i��;�7J��vϛ�q|���m3D�����YwE"� 9��h۝�����;�uK�P�����wЗ�*YB�N���U%��"�a!�+ÝY^�;�����1ldY�^�:���$�x̞��	�J�̦�#1#��Uw%;
=�H������"��������#���
s٠^��Z�b�+��߸Q�j�{��U�h%n�����*u���@��d<v7N��G�^��^�)��u��3���_ �c�      �   p   x�E��
�0��s�.M�5�ջ>�.�hD�)��a����r��9;�S��ٜ��w��(\���ݶ�ݑ$�DܨJ\E��Q52f��T�X�%SN�l���{Р�L p �+�      �   5  x�Ŗ���0���)��n�Z�l�I���W		POUNb	�ۄk�(N:� �6��C��V�8�$4�R3Ɖ��?#s�������l��r~}����ϰ,c]��.�t|�.o������j����H��w��O	��0��C^�&/�$yQ��ާU��p��LL)�RP(�**���O��8����b�b�z����<�Ql�Ui�j�����u��@w8���H�f�����t��!���NW��eQ��=�~�G����T �)Δ$�x%�l�o �� ��Aϙ�V��ū��4��q�|�I����:��1�|�����J�EA�Š�w��a��
]�:��E���@�,U���8�,[�� ��
q�ءO�<�v�U.*ʉ�D�Iw@�+&�D
�����|~
Ǭ7�h@�t[�1����ʥD��t�=��1E�b.�ǲ��N��cc�v&	�1�7O�ІTQ�p[8�O�	�g6=�ud��D�����`��,�BEMz�Y��v�t4����h#NoP�6�)m.����#dא	��BF�����L&���-]�      �      x������ � �      �      x������ � �      �      x����n�Z� ���)Vs��ڢ̻(o|�;���dgW
�II�)R��l+�'h� �������y��Q�_����Z%˗�n�{f;ۖ���u��w�xv�g�ISqV�,;��N/&E��e!��p��hW�⭬���UZ�<�O��Y�דl!��P\��4�k��[cW�R�ii���Ri��Y�e��Qe�7�/�l��A�7�"۰}��Z�a{!����3��4{r�,�����Nd%��82�E��'��IYT3%渔q"j=�8��q.n�z����/��T�5��dU������:ɪB�\�߲��r�Fb0I�,#xg-ꉬ����\����'I�r�BTSY�3ZY�+v`|)��fpibvĭ������yU�𮴂���e�T5n���oo+�,����X��8��"����F
kQ���E��O�v�2��;�W�	�m[>�w&m��  }�I�MZ/ğ�����$yr+�v�=}�(E�ԕXsMd9N�c	�	��^Ș�T�ӕ�&"�Ì�y[R���_W|��u�����CL��:K�L���eXʼ���u%^�3�M�v�:nU|_�ɯ��{#��p�u'Fֹl:�D��jZ�IV��-��&��m�0� v��k��W�R�0��x�|�72�h�0���þ�`9p�{	��6�͊@�է�=@p�8J`S���9шr�`2M`E��/)o�Hu���"ȫ�D��V$Y���n��:��p���q��)PͲ�N�ˁz4�`Q6�՚� �Ї���D��$��DXE���\cZ߮�S�W�j5���)��F�e�YQgQ�Z-j<�#�p��F �W�I�����f�U�%��}$��Q{�.�C�$@�H�����<��*�|c�]q�0�wi�ɲ9��tj� �^�c �}�i�*5��kXi�# dؽ�@Dϳ�e������p��jT��x��I2�)���=����#��)"W@�S�A�X�D�(c|��) PS����k"��&��$`9���5V�ɇ�4�Mxi�4&����GF �U�G������-�FcOB�[YVX� �~�a)$@Sb"�񘦈q��p�\�-����e�gg�g��M�������G���A��O�I��f�@�8A�	ϣ�2|�����ʻD\�ŗ��o��Nཷɭ1�%��2�qM��-�`۶�]���,���|��0�m�����{��[�e�A/4��ھc��_f��7ݵ�ah/o:�ݴ�������@��y�b��7c�\�9�9���L�^��oК�d��f�<��i<<E�Yˡ9[r(���O�������7� 8�6��n�B��bM�A��ũ���ڟ���=�F�,�"�6�o;�u0�o1U�4H�מ���9��<�B�"�n�7��5���UF�=�s�ϙ��~9(�Gww<.��ׅ�&���:ǿ�z�;Y�ŝ:D��S��p�m������������`����������m��l�g����K�~=?�~�����0�{�z��O������6�>w�����Îٳ�X_��o|����ᷗE�w��������?_�j�Á=�'����o~8��'g��'����°�;�PT��g<�h�a^l�@x�[�g23�J-LS@6�9 5'�Y�V�fFp� D�@�$t4%5@�KU�~�<��>��#�(��Ӄ��7bg(@$�U� �+g�
��BY�S��Y,��)�0���Hbٟe*.�a���h�(��
l�\ ��M2�} eQ_��؉��J�e�p7�\��"Vr��8��<��y+๭�Ɵ�����\i&���/f8ܘV!��t�ⵐ�J8�n�-A�Rc�>�zR�?*2a��q |�c`��)�a�kHW�iS+�-n�����F��!��-�#�&��!Lm�>.�m{��xҾ1�mTc�V4m���j�4(���d!��h�~��-X�)4�}�cH�$�Q[n�}I�L��$5���h��XѬ(����$&��q�O9n�
D/7�{�L>z}E6M���^��X�BOo�zw�>4�P��;���l9I��a䀱��q��]=nN�6-D{�~4Q���S]����ze�mשּׁ����گ�
�}m(�QV�.�ޤ5j:�3���7�,-S" �z)%"t#�^��*E%�aw^F�� �&U����ͽ�aQ��1�}_�*����8����En���DL�)#~d@˻GH�֕���6Q(���.Oa�y�'�+fj��m[a�Ԣ.��dŸ�?7� �g��~߷<`Z�����⣫��Gh�gͶ�Z�vu�v4��'�d|��~C�g�*�_}�a�\���=��f&����z��ӄ�Ȓirm��L �����ʤ�a�2� �
��� �t��vܜ���M��&3sH[h�侨[�v����X�Ƒ,�j(e�,&�>���s�c�����l�tD����W���tpr�h4�$*�a2�����^�g� z9�곌�WO�� ���x'�`�F���-���� 2�^&�y9L�	@��U��U�������^��N?X�*�G��&�{����ø7�йtC��#Sz�5��?�}��ڟW�G���t����*7�m�4>-����8Z�uu��V�:�	�,�)a[�!�x�x��^�2����&C�ڡ2n骩�振�g2���
n����mn�o��D���h���e֨�¶�з��(�0l���R�*)!��8Nd,@Gk(q;]�P�}��WԸB|����	i�5���ͨ׊����$JG)+��?�
E.��vCZ�:5��]y�Li��5��j#ᶲ��6���e���[�+��	���(I�ʢZl���o-`��ۭX��b��D���>���)�V.o[��1�d��[���p��2����(�|͖�������w5�>Rz7�X�V�oE�;;��[������gu�i.^~w��է��>���[n�+����8Q��������@.{ۛ�����~B�r/y�-�v��U��m���qg�`F5O�i�M�
קEQ+�j14O�0Q	�(�lխ��k��k*,��m
ЂD��X�*�'Z/�9'��ge@;��B��TK^��%`樹H]��v�d	�q��x��|-�q�먋�/hз0�l���5Ij��Uzߚ��I�KP�".0v5+Se1� &%������E��Y�K�8��6�CK7����Z������4k쐴̸�]uYu��
�"�kKXn�:�CɊ�,VW�:U�+��ʺ�j���F��贂3�:�<D�(�3��m��\x����xD`��]�a85ڮ`����8ƙ|@�y�-���E�;�1)j6���!qC������YQ!ɀ�,3=��`KS���z1�.-��e�ֳ�w'��(����mO��@u-�,B� �qZf#��y_2�JS4u��X�a�����i��y��墳7���Jx`���5��8�A�HT+ئ<��e�� 'G������`��D���&�1�`pނ��7j���m���t{~Ϸ�u>���F>��C�s� XԱ����lg3/�4��u��~� �M-�І�����ſ�k�\ɰ�����	�^m{�k�4��+t"�+r��Fk?����%q:���"� ���>,J��pm��2o?($J>���+OH%�Ӽ��9���
O��0������6���+@�IV����+�?��'�\q��o	�7���2޶q9�X	�(�b��A�5�!J�@��L��I�1�6��'u)M,>�X}W�P�:�E��\g�w��ȗ~�]8HG9B8Β%�+ޞ��(v�?�U��[����; e��#�28=����TzF�/�z9�%��~���Č��ez#�2tb�ݖ�ЗV`����,_��4S��LI35o�M$���G0ϊ�ɬ8`�P��RC����c���k`c����9��Z�.\��9v�r���.��,�x�"y���&<7����	���<�	|d����y�`    ��Hoi`Cؘ�JW���Z4�F�EV�� ��xH~���g��^��\� � �F��Re�E4�����x��Y�����s� i6^H��E=�gRv�;��E�	q�
9EujUdD��pR2{͙�B��Ӑ�fIFL L�[�I�N8��`�!�'������(]�D�3�
��ir�YQ��Q)�,����s�1����[8��*���,�%�ޫ�w��Y�4��J2��@�8�2f��d��4K�����u�!<��5;ULP����z�� AB�\�t��5�`�Y�0xI<0}�'YR�R�"�F���M���f�</�]�\�H�b6Y� ����&�6m^.\�4'H�՚��p�3�Q9F�gN1���B2��ɩ`lŌ��C�G��O��H�?KG��}�%~3`��D�
��9�+倢�R6�I���cU/�`?q����\ Б���|9�2��kvZ�=۰�-i0룦	�
>� �S[�&�CrZ�(�v�ޠ�$��G�-��\3���d��W4TL��M8|خ�G��;z"p�%��@�ktD��$�+�UNG��f��^Z7��\�FYr��`֒��:���F@��Ru�O�V#ǿ	��(��3"zV���bF�&6nS�	��f�ŵn2\����p����jQ�%���i���UM�3U��8~$��I􀿗Dj��4ͨEM��8�G.�����LqT��t�%ct�$����5iƴ��o�->��9��W��L��ځg?�[,*��������<�<�H��
L\����}�|�Gݣa+�����������ç&˟��\C�'����ޠ�J�4;�X<�W��N��z���|VU��N�<�i�ӳ���W�[j8��J-�*�kr�Ff�����gJ�Cز���)����04G�d9~'A����),`*�a�93�3+�9w�d'�Ƴ�Ti�_i�̩�7S���gn��kp5Ӯы�ך�y���L�[�g�a��6N�� ����� [���2@��z�׉�+�r�d;m���t�ws��{��s�?_�L��;�\b}�!��qW��@�6�(QG�����v������C�A��|���
�t|��{e�Ǣ��W��8A-jIF��|JČ�Kg5]P4���ZH�^)��jOʛn �P�[#g����CrFG��-lK�[ዎxs������i2�)\�W�@�y�j�]K2�YU��Q�8�6�s{��q�^�(���񾟵�(D�Zz�l�L�F��4y�p�����=�j�������	�p�Z=d�z�>�j��h��qmD滛t ��'@05���&j���}���ج
���(�x&	�'@�:;x�}���H��� �<�x}��u�
tϳ���7� h�c�L��6ɫ*�һ�k��l���Qu�URwvb9CM*����d���H#O�Q$��nUSQE��g��4O�kf; �t�Z�u�7��z�ٴ�2�CV�vz���+Q0pƓN���4���3������v���a���m�W��,QD��R�l�Y��e�*�F($����-a4�<�����x��k�޼T<�3)�����61�F���-�:��~��Zf�"���d�p�����vx~�Z��0ӊd2� H��������4�F	�$�E^�j�t�X"��B!�xE)2H���g ����4H�� S�jFQd(�o�D
��q7=�����J��^� F�u
&P���=����%�SXc��`i䋏�?ƣ���d��l8@I� ��	)���_L���^�qB�5-J��$)+zB��0 H�L��hH����=xwu�s*�..�/���0��+�Q.������R�j�)�\Ȋ�Z~6��N"�F�i˄��Tb�)g(&�T�L��"�Aq���70�$N(���o���	t���tt5�Mҷ)^���'��@ ������@����h�D*�|�e�c(QKgU�Іe��,��'� qh�0Ec�Ӻ,ƀ*�|D���;�&n\��
ao���)��X�{Vt*�X0W�-�S~q�np,O��[�h��5
,Z�(����N���TK��<-nT�Tr7C���F(��	O��.m�b���Y�_*YD�Dh��3���T�,�zI5XO��ޞ��_�������󷰻�I�cZMJ�輦ϴ�B�]�@W�Rp��$��q�7	u����� %�W�'� �I�`Z�Z�4�d{�����Cc��YD��o}6�:}�ql��jr�z���ֶ���Q�z���7o���hC�����_m@C��/u�^?ڰ�N��ů��Ɇ?��ź��>��8$��Txꀙ�e*�i*��J;K���kY��ᱣqj@�R�U��Q{>�� d�'@ጲ�K3��e}A�$Q��_}���׈Ej/�c�S��<?0����-9D~)����tֽ%Pn���U��>4�ǅ�8lג�ʞgzr�3�N42Ga2��$깑�loj�*fūbF�*f��bVj�@U#-4��rhc�ͱ�o�ʺ�i� �@KZ�Df-E��Atۓә8�$P����F~�I�e���~q��LR$Y{������h�T�˚�ʤN�"��
��s�}8�ƙl�u�8����R-�w�M��gh���"1�ν���GҨE�Đ��A��)�;Coe�����a�i���|@o����fj��e�\(��d�=\#������y>%U��̜E�p�JC�H?�r�j^�6NO[��%K��o�=��h7\�g���]AoTv�[���S�D�M/_��tn�-��1��L�H�V~�"�Gـ8����_%Y�K��Cx��oZj?��t��DQ�nO�;�[i�X�G`��P�e�������$�?���ô�#2�u(�!˂��jXZ��W�����0n����W�r�l��P��Y
nr�N� �W��=�~'p��b�J3����:���(^x��!F�l��qwy6��y�z>�C6�Q��$���9����h��Q�'�|a�2�?�9,�O�P�n����|�GC2�,����9�xu�YX#K�+�N�騔#�.A(�"q��!1%�%�X*�X�g�1���~����V�V�1�,����^��2��H)*�Y�(v�EA��U#Lt����'(Z`����i���b����:C˳,g�t��_dE�*G�E;s����(��#[?��`F�!�©, ��u�Sؖ)z7tx�K	�gr'#��5������)DS{ Ư�X�)��0 	ؗkx^ �N��!}$㤵0jA�B>��moG���2�3�Jܤ���#�a��sP�Ь�a��ZH���a�]��h�2a�P4Ld���8����Ӥ\)P�k�#'�!��G)�������	��-좨�����9��Q2�c����yNiw����?M#�'�,�%L�����eԭ�R�/n߯s��3�#�-I]Fj"��H��t���F���ѻ`&��B� �[G�r�f_"��Ө�\}	/���g�i�m���]ϳ��ӊ�a�5�׬j(��빖kv�"J8t''a����y�h�z�����yZ�1��~���:�>��g��s�~,�'�'�}Z\�4�f��6OH�����L��+Ab�C��^�i>�@��pb���6�~�SY�&Ԅ"�������2N �ֲ�H�dv�U�m�=	���a�-y�N(�Z�� N�v��<�q=

�Sj�
���7rM�9!$�\�L�b��l�ߋL��L/����،Ga���^8t>��$E�̊f�&��l׮�ٞM*zϯ
 $	�JK�C�W��*sӶ�w�C;,����FV��B��͚�qOL�~��{�X�����$%� a;��_w�k@����觠"G���f�d�Kz�)�$����s�a`�{��g={%�j��qCDs�x�&r�&0|k"����FT��g�?����F(����bV�K9�,�%9��M��c6q7C[�g��6g��Y`�Nj�ʀ��a��:���h8T�Om    [�%�pW��_6�5 �г|3�h&��D�z���adz�~ϔ#� r-��E�5�l��麙�Izd3O��Ќ�!��$�ɤ@>SI��]�?�P�C5x����u�=ų��u�������wR����v%`ދ�ס�O�
�F�&0�"L��W��<�K�v���#l'蠼���	ˤM��^�4��3.��R+��FE�x"te|B޺�=�C������PǮ
��og�!t�5��z���Y@�Z���W:�d?A�7��wTST:4��ӫ�c�|�Tv˳�4",�` ��z�Ԏ��v��EK~�rt.g�Z&��SGZ;EO(�k%.y`�C���8%!L���L���.����=��Ff�⢁����m[Aײ�����y���[DHM߾�ץ-͍c����2������8��!فNp@)8�Jr�S4�Etz�E��i��I|�Tʃ����F�������c�nh�OGk_��4(:�c	VB�)���m/�$���9�}5�� ��� ����Sʸ��g|@�0�lA����)�< �( �\�%)�_P��*�V�=�Y�� ��Δ�LF�F��
�R�n�ia�v:��'6Mflp>Sנ� �#"�>d�\����Qz��9�����0��s��e_����ZS���.�3ԭ���3 ^�ֲ._���Н�N���Ʈv�qZܤ�ڨ��� �z������ܤ��!�R���1��8�bP�F� V>�S~F��X(%l_��2��k�P���K�����C�<����#������ iQq��ǽA7��}.�i�˩2G*�i�na%?���d���Wd���50�9�%����<zҜB8�(�[���X;� årbf�ɼJu�]���Rpv7�Rc�Vx�iX�u��A��US'+8����"���L���(\�l��3�:���y�@ ,��˗��G	�j���l
tF��U��m��#�Z'�-� ��s�	���T	Y��N�A`lw�GN������oý�A�����z2m����M���>��p�%%,DK�լ�80m*��i
8M��
��a8t>��j:'UT�3�������Z�	�ǖcz�c��$�7�!yM��=��-���&T��K�J�7�4�9�|�K��$	���	��
�1�]�$�;�p}h(oy��c)�Q��Qp�h�e��i�ܮ8���*�b��Zܻ�S��W1H�^���J�4����jM�Yf��J�K��M�M~��� ����@]0�n�8��BFMZ����
� s��:ꊋ��+���}Y���.�y�(f5Oh�<:<s��%�Ed�����'���E��(�'��Z�qQ�b$/�&#�y�,'���e6b\1N{�6��q�H'@?��0�v�L��~!�	���u_�`�&�G���;^�C�ʌ�y�;��q"*���8q��y	(��9f;���9�4 �i�9���a2��H/�j>��5�C�;��&�qj�Bo���/�%�Wٳz_�$��ֲ�o\kB�Gq��XΓ슫��h��ޢ;,�L%3-�i��G�-�HHw+�I[�R���>m�b3�Հ	gU�X!��	��m{ێ��9��o��Ul,s���6Z�Q[��H�C��=i�{dz�Ћ"+��}�ل%^��@dH�/:�,Z�For˴��gzN/6����k����ۣ����ˣ4G���v��|�V���Oaw���^������ٮ��]?��-g�ؤ�|Z�؜Lk��q��ڏ � NȵOI�	֎X��30�8��"F˼|����q���� �r(�E�t�w;6l�m�U��m��?�r�̠fP�oI֠�/(w!� T�(��}8(���t�L3�i�Q�2	�2�1�ՉrT
��"�O�J]�.g��F�i����� �!�4�6)l
9�E�T�R_�����aP�R]���Sl'��P�O>�,l���b���٧]����i���Uy��r��>�}��� �*
���� �$7��nH�b+ʟ�	��d��yҬ�f�]I�'����,��Z^�[M���s�IK3K��@��u����\�ʢ�3
�k���Em��O�n{� ��&Ѫ�."kiU����k�#��^���,���	qO�"D;���$�
�=O��=�����
"�=��q��y���D:V����E��e2Ƃ�е�4~$rm�g=g��[S�?#lM��4QN�?����:jTf�X�I �"���惙Y2�i�Y�[s�LM:&�?)���0�0���� ��k�LO˙T?��߲l�2�(��͊�ި��3VQ&c��>�����Y�K6IY�ܴ�#w�� .���L���1��p���)�0�e>���L}�0�����;�ү�3�c��g�RR��^?(�b/F��H�1h���J���%�,>�����;�ޕy�C�e>+�{`��9��y	} A\�R;��#�D�����³ʈXo
ZEw�;�U	��U���ub��90ê@]<���E�������p-1����b8=��O��`X`�Qk?�zM�#RVn6���z����.FD,!6����N��f]^h��#���t�0m���V%�tE����  W�iO�N�Cao{v7D�u�[ʐ������&����Nz��}'n6��f�����^��������[w�S}kf����
g��$^?4A���; |�4��T/�#p�����o�q����h�ŴO�I���2\7p{!,,���Z�hg�"@K���|���p�m����]�q�a+4�EG�&2���y��F��`��ܵ����*9��`�\v^S�o'�'@<��O��V�	�^`�\\���v�����֚�˽�~��� �P^'����*ijtS��'�v�� zc+��o���K�]qr> .�*eݟf�QAG�+:��h���P,�)O^��8$N�~X@T��M�'U�i�l���~S���A�rtr��w|��>WqS�o��Pߌnl���~�s�g�n��oۭ������a/�=8���7������q���#�^���~@r^"�������ビ�� 9�+kR�)�=Y~9������ȼ��FW�� ��;�Cדm�֖�A�tVm���]�#v��m�jw��#'��*"��w7��Gg|�2�~7��>)h��9�M$p�y�u*��UNCrG�	S�#q�]���B�$;�?�6��B�Ƕ��<g�D���+�������5�-ǘr)覸��`|�1.V�E��n�MZ'q6�$����Y����q�mw۷�~B���w��%�?�/#(�6��^*�bh�k}�V�����9�)�R[�XH���2>��zB�h4Zpt�[�D &LRe�}���!��m0·/���s�����9�	��R3��A�p9��Jm.�ݠ3���/ke��iO{n�qِ��[���|����'u�}k����+�Nv7*�[�T��:ٽ:?��\�l� ��z{{��Cs��wMo���08�](�����޿��������0ˍ�"�Z���~	OR��4�O�Yİ"��@�l��?�s���� ��ϥ�q���5V;��[����������a��ǣ��8�������.?���'R��.h�N����$z�Kl)o�j?�{�e隥u���tK��jt}�Sq��:��D*��O��Oo`���!�-��?Q��Z�m����T��� .���\��p�o�*#]ρ�Cc�M� %'�%6ta�y�����쓦�z�` �렻�ma���;}��Y�Q��aj:ӷ����[ɻ2�V��}ˆ��������Ɇ���ś~<z�!p��0�p�nxO6,�����d�������ɣCh�s��~�5r�h�g��d08��Ɇ�o�� ���ض%@>�{�!�N��ȵ�-C���G�Rm���,�ʂe��o�b�o]�m�<,�ޢ�&���R�:�RU��^.A�9eݰ�P�{̓Ǫ-&�#p=���������Մ�~z���HZ�Y6o����ٙ-΃��3���,M�    �H+d��(���J�Q���x�\p5�%��<�����0].$e4������u ����ڂ�J��"o,L�(8"]8w��C�W) f�rj>F�9R�T	�N�I�?͆;�G�:C�5.����4�N�&�}O�U��B�"������������B8>.��5�)�K�ɭ��ȿ��˂5��O�������t�hqSd�i�
˭ �[��&B�˹�jc�t(D;H��5�=�jK�bJ�w��*q���P*��	��:$�	,�CnMp
���\W�(����;��R6��Kmm����	ǹ�-_S;�'1�������W�[VE'Vh 
��-�8G4��>K<u]c�ݺ���WE�ĭL����^����	Z�at�[�z]7�B���V�~w}p��:݌F[����[�?ذgٶ=Ϝf�O�:�����y�PIl3On�Q�|�j9��r�(TcVy�ʟEw Ϲ®&��{v��r<T��������B��`Y�e��� �`K���n@������[uxT(�n�3$�E���,	O$fszXf�  n(�'�9��=��y�,*�Ӄ3C�8�A�#�e��I��+%�Q�/I�N(��x��O�~cn���0�^ٕ�U���A�e,0G߿���3��t^���>���3������@�=Wƌ6⴬̔�L&ˉ�p�٢�N�t�����5��Q�8�5(�P��e�m�P;�\rVQ����Y4)Ua���Tޑ�M�ukZ�_%�߱�3j@: mrZ����9� �p�]D��o�'_�4bg���:#3��a5M��<B ��#�(Zw��Y2b2�Ӹ��!蘒 ��^�P�D�û Z��щ��*�\�b�#��X/>uI�?N�*����mS}N����oc����W�+�4���5���0wܚ;�r�$���Xl������9WlB'O�}����7y�
4Dk�^�o[�� ���>�w�@}`d4򜡛Xv`yC��'����q]o�z����s�Yw��O}��Rlpg�֤�}��Q�����x���v��+����S?��F�(H<�熎�e���F=����s`yadI/r#?�h�e��ٽ�m��g��a��pԃ�QГ��a�G�Гq��i�BP�Z�{��ж��Y��=)�΃=�`.Df�I4�|Qa
���MUy�lEX��ti:�V7���x�zig��0�}��o�ߟc>$&h��	c������Lu�m�k�n}ߴݾe��0!>�������������g[|G�}��#��" �˫������l��{E�;�3A&e�7���7S�����+�m�h� �mލgB9t�{�ؾd��cB-G��;��B��"����f�8��蠝eU̠t��� �'*�`�i�U.��9J���쒋�Jg���8ݏ�"0C ��O���u1�<��(��W�)�Y˞�z^2C�.G�v�W����&�A
��
�Pd@���t��w��_�c��ڄYs�̜�v���D�_X T\�{/`c)Ѿ��]�P�I�0pF���;���8 ��'����(ջj�w���]�f�@âI��ކ!qѪ�A/�W� =�R��x�r0�9�ïp��#8
Ax��M�Gc��s&<�Oqv���఼}t����k0#�m%�l�K
q>�('�_���a���a�5�j�&Y*���v>�ɘ��/���m��,�;��?a_j�D�wm�I�qx����ׁ9��k�Z&���
�P�	�q-��\���&p�ɮ]���46��.�پ�(��$ʽ l�8�liH��\9�q`���׮����zty�u��5�Lh���d����P��Z0ס�\의+�F�h�nа�)�+L�.ց���?6�^��������[��jӁ��N,�CeLǅ;b7�
f� �P����U�;�`�&�F`"ps6�AA���? :�� �Bs�+�\a|�{Q�l�{��{��(���@	�!���ha&w��s��!�X�L��`u�WХ�u���V������+�v��@d��Gq�/�o��:���#]n�)$�5��1�:� +j\�����;�a'D�����X=��c8��|mz><�?;7� ~u��t�<'�i��T���Q���8�`¶���R�1>\r\+ʴ�r���������f��ֹð�=�ii��g��{}�����;v���� �.����V��޻�y��=�zm�_����w=|z��m)��xط���3;|��f?��z�87����>g�ք�,ɋ��̈����ϚM����L �P����D�e��5��ܙv`��z7��֚|5ѧB��9�s���Y�w&"P3��C3�Kxe=4�*6=�+*AQ�y=4oSs��A�iO3��@vq��$��,㲈��`�>��ɔ�=�5:pR��DS�}��w{�W�G��ɧ^�b�z?�W ��S�)�A�(cT��|?����e&��k��^Q�	�6���T�8���jrs������I�9U��XFEk�8D;E���p���l�
&�L_��%����7}��T��ce�.PS��T��37��� gs@�Ҧ�Á��6�%I��۟����`�XU�\��D��a/g�K<֫�R���Oe��9<)�U�<^��$!���E}�Ąv��ݨ؊�������{���1�o6����v+�g+��|�za�G�����}5����r������|��憾m]^�Az�D���m���4A:�þ�h������=�L���
V{�Z�m�y����$�|����L���!r�e���������bHɃ��u�bo�%O�����A�؟�k	��q�ha.:�<Ƕ�*�(�� ޯ�y�-� �<���_Q��s�-��"�{E���5��cG�I��Z��	V�m<�d����K"v�&��)�g�ȋ��!e���L1����w?w�>:��F�������SZ@����}�m������t��2��	��j�rYP��'��D���}���gb��o~f@�x/M��F��z��V�n3�d߰�~�٫�wxzr�������<��<��տk��a����� d�
��޶�uN��~��Sq���(���v"~.hY����t��`pm��o�gi�	�=??�=��%�(�G`����\�^ ~y7k���� %�:(SvD��%�j/�?���r�V���;�������Z�q���(����7�hW��-F�a�t� .�y=��J��Z`�����M� WA�w\�L��gL�諔�ު=��I����C��C�.ˤ,�����+Z0t��F���U�@�@��a����8QJ*�߲����<�`	p[�&�?��?c��|<ѵ�0�V+ �:�ʮN�QT�&&��F?]�[��_�-��)�H�Ä9ԇE)ɢ�8�VzN�0H6�OC������w!�|���v�b|��nQ��O���@g
'��ӷ��Oj�Ep��3�h�^�x�_��	�� ��Dj�~��XT-	R&u��RL�c̵ gdB73��C�BѤ/��&z�m�*����ĭXǺ,�'�p�	aV��3�^��j�0�3�a�:L�U����昣�Qs���'ٮ;ˎ)�J9V�Ơ�wZq�į09��@يv�S�Q���q�G��XRz�&�X\� ��m=$u�-�j�ȃ����@ܤ��c�F��@=JY�(Q�P��������0O�M��O�r�i}1�gE۫
��Ɯl7�;�T���Q����9 ����u��}#�Z�*���f�U�������`��j��@3�R8I��N��ъ�\�ۮB�7����\%�����K�6K�1���*�1��hm=�b�4�_؋h�J��jp�T���6>�M�<w�6	�Q�Vr��dt�����LO8�4�bp�l�k
���ؒS��Ӭ6��ӘhRj�Ibv�lIt�[΍0e��u�i8T��R��)+�)��5�����[�;�2+R���fR�j2]��    i��� ~����$y�sq���Kc�K@j�wI����:�Sj;��n�-�s�ύ��q�:��E��v��d����BBȊ߉R`�9�o!}����Ye��I0B��)����6��br6�|�$ К��������~V��oe^��9������6�xGߓ��z��ՏI��x.\!S������`�㡙37��C���2k94gK^����b�M�L:`;h�z�'�
y�4��0�ͳ}���q"�:;���ڟ�1��������m6g:.�~���Kt	�m�_5M-ݔ����z���Q���}�Q��|j�s� ��Lܘ^�Ǽևձ>��1D��kç�K�Z%3����7.s�JQ�G�-:J*�n��Ԥ��+2J/y�=#wƪV�� RuAZY��XV���U��7�`�#.���o�
PAJ#�J��+��^�׸��Hl�mw=���Jli|/�T��ψE�۳{}/�ps���~/Ն�^_�S��O'�X=��	gr��Ϝ�����Y�
�h��i4M�JROSFX�#凵��(BWd���H��w����f��>��-XU.���cJ� c�y^��Ɖ�_���2��+N�8�\������}W���r;���a�S�oRX8�s���{��N�� ����>��@̨�*��"�<�+<j��S*�E��eA\	��|ʯ;��Fn��ɪ�4�!@�uAeB��3|ږ�+�R�c��_���2�{��k%�`��Ir�d`��@޻����|(�1\� >�Kޒ�Z�[�b�:Ԓ�t�A݊�L�3�J<�d$��fԜ���f,��L+U��+�%X������tKxl�ֵ�m��F�7���%���� �c���N�X�s�A^�X`s��aFK��VӡSo7Ł�~�[�0�	#����U��Mtw�w&�sP��7Φ��uO���T��f��%U�~퍟�� ��f!��L[�;Ur8�WX�T�=�!h�(���r�2�F���Z�A������<�O�)��QJ+�ܥ�*����F�O{�
�)��[���FVx�����پ�\|����k3�����ʞX}F-&�;i�5O���猫�Yg�e����.�Q�Un]�7��C�^���<u�*s2��;傐��V(v��P��NW�{=����r=����s�p!E�C(�aK����&��N07�÷�p�KBf��q��k�����(��)�I) �C��Ѕ:od6'f4�R�k������]����n�W���s@��c�ǖ�����P�'�v���Ӄ}ɉn����i�a��#�i���Kv�bYv�Ӄ�\�v@g��}�um��NU�b�h�0֦��=[�嚶e�v�y���%'��8v?|���̿�N�)9��e�o?�o��<]+���^fz\9���o=��+���3��2ıj���A��M���"
)�L)��c��P�ò Y�\<q�7��M�8�^��m=).���4�|נ@z�.�bK���[�}�|ߊ��h�8�c�2�m*t��<@��:��- ��|{����oaj��	~0��gc(�շW�U�5��BpN]<�^hB�jf�4M����4a�l�ZNS�t^��鸷0�go���Y���Κ�'�Cj�U+m,�%me�m���Ut1�H<�tw�Y@	�`��c���9Q�����Y�2�,� �P銱G
��Q$��+m��#'�⦛(-Z��ʐWe�W%Y9����e0'q�*�z-�l�@��g9��2��H�Y)Ì!��<f��9����8�����id?���$�o����YF=�v輇q����ͻ����V����P��I�ʏ@�	T����/��-�}���& ���Z�P�Me���H.y4Iu�s������U�bq!�zQ�ZV�\l؄1���sm�����ԩ"�l��|�J�?��M�],��J�����aj�<��@���D[9�c)閿?������
���UpJGf��=Ǻ��*W�*Sq4R#�S�lA9�$�+WQ���#��+���OМ�c�2
ʬN�T&�$lN�v�k��e���a�!�A�CY,�E2�y��L�9�~�׷�>��D7nK{Hw=��w��{���{�L�+7]L�����>S+���S>����I�{����9F��=�������̤�h��v��ە�mp-C��)�T
6U�k�q�8���u��p%�������� ���|{X/-~�� W�0a\\�]����+����3��h�ZV%X?�䂆X1
8��<�PA�1?NG-��G�T�jU@�m�x�٬L����oć�+����x{p���E6u�#ǄT�j�����*�C.�������wn�A��0%�	%_rlmR��	UW�QS&����U��-,UR��	=���:�&"p��r;�r>�F�W���D=r�;L��BWZ^Z{%'RJG)���� �(��f�P���A�Q%�b�#�:��_�;�x����{���y�c�t��u3��L��V�!��@���yk+���7�w�����̢�I�䠮������/.�Nޝ���휞\}g;W�';��m.5���r���{�v�*��-���{�Au)M�q�ʭ��q
�I�+�� U>��g��K��$��\��ŕN~s_��0��+u��%��$3��m�]F����,��ð׳@��_z��ʽ���������_�^�n7��#��(%_崫�r�*#
XC%bUY���R���?��8�8c\ Yu+KW�L�&o�%��:��P�N|�z\�~aiE���S��=�I�[���۲k��]v=�z--���@�MvG��=[�'�zܧHW@z���z�{�׺����u�&�[Pd��W���-,,�&��*<�l�urL]2O���;FT��{m�e#=�gA/򌧤fDK��x�er{V��]�o�q�达8�]�w�w]���y��d80��(eH�l�!vN̳��c�u�lBTKl.���#:�rƴP��e�嬠ZmG��+�μ�J��[��M��۸5Y�O�q�-<��o� 0eXA	W�o��U������ő�.f���a_�P��1��L�G�/ccmP��c١I���_�+S\�[�x������4 �V����zm���*vT�TUfg�5�k5E�z��m+��:�W�`�k�^_���샂x@&�-sX��l����S�W���[/��gx&��(nb�Z�k��&sh�I�w�����N�\���Ĥs�V�g�pf�۪Z�8�!�~�9�x4�|��B�z��A/��y?h3�o��an|qFw��$���8��y<��{�f��=p)�⎰�C�f�gxֶ�v�>�R�F[�R�i�ҝMg *S��:U�j_A� �����<��2�&Y|�R~��[�N|����.�U��ض�S];X��w���a
:Ҭ���������������
�r�n����)��i���c��uC��mo�h��g�]���D%LxB���;�?�A���w�s�Q���������$�34�knOT��V�t61>烸�ߥ�f@������G����;Xľ����Y�Ub�wS�y��;�6�zY�8xo����]_ʈM/;����@�O�g����� ��EV�6����V`�7�?�z��v��WcZ�u6D�{(�����b��v��֛����F�����s͓�#S�=�Îe���a+y��*����~V+�9���yJ�H���H
�L�5���[am�l	k����s��څA�?�8�h����,I�F0K0�@\P`�
�<MT�Y%ЃB\4�m��B*jQ��b�j����U���o���1Q��b�^�6�4H������nVM��m�����ý3�蔜I�u���n����H�����ow�߻N�׸�lEu�\��������#q�|�9� OX���s��e��E�����!Ѣ��V؊%����RX)e��QG����J��Þ��}ϼP�km����\`$(G������ ;    ��-4�e h�����3�I���RG��nl�j��A�� ��C��O��O�@b	      �   �  x���Mn�0���)��+b~�!/�f�]t���k���]�{)�vk5�	pAH߈���	Q%�ĉ�q��z��Z��*cR�M���!ʡ�������=_}�����͏�]��a��$�*�ί������Շw@J�@T�$ �
�6Ps� -&jslS�����5��� b��Z�TШ�xq�Pb#hMb����h#��/Nf��'�Q�t06#� @�>���j5߼�E�:.���4��t��.J��9f�Q��������1���s-h�40c}����v�;	I'!�����J�1ǜ��k�=h�\��] ��ذÔ�N�C�A�"VB�3[���Q�y�h8Ur�j���R�c)p�u|����d�usaT�`������T
[�hɦN{Rw��O�a����|�7�~��}��w�q�oz��r�JD��HcRt���2���w�x��){�s	����iK�R<�t^:�U�Ƣ�u:�y��f�m7��      �      x������ � �      �      x������ � �      �      x���ْ�F�0xM?���6���$Y��m�:.�u�LwT�$H�l �=14�1/6ߒ+6����^,Df"�}��w�9�����$��/�����$�L�~>%e��d�+��'U5�&Y����vZ�Kq.�ۢ(g�_~�����풲���-��J�U�%�:-rx4��9�����v�29�����¿��v�)�$�=k��bZ���j�+J\v���9�n�Y���e�"O.���y���d_�����>�o�Z�ݥνП:�e�S�\��ߓ}R��,�f���Л��8���7�^z�l����У�2�'����m��>���ۗ�o�4��4�N�xKw�� X�� D����8�F�e�g��n�-\w�l*�Uy|Lpm���m�jS�tm����4h���̶
��>𾫦O麌���*���P���f3D���s��L�I	�Q!
�eqJ7q&A�D�ЀO������sY�Y������L�w)��O�d���s7��BC�tzH�>\�'Z�(�I�п=x��u����׬�c�U�͒'x�d��sS~�w�U'��YQ"F�3Ϧ���L�=�W��ˣC@���	�|�W��L�'�Z�MZ�+$����V�gt�]|L����;�\?������٭�E�LF���������M}H�y\�K@��9Ij�T@�1��!�t���=|�x~�`3������b�v�X'�X�ǛG�]8T����%���V�����Ϲ`Dχ�T�ޛ/t,��U]lO��.��D��w#o�,<�3�o�Ým����0�T��.�L7y�/�z��g�I��?����b��
��Wx��4�7�����J�
p�P@�f	��a�|�$tD�x�7�
H�|�K8i�r�Q.��<��n��yǼ���BP��[\�d��gӷ�q�=p-	&|��WƖ�,����?"`��RNqI|�1�<҅��g	2���&�&o��>�k �M���۲X'����b+���Ǥ>e�&�ox��ߡ(}]\��r1�i
wHn�q
\��"�K�#ɷ�i�L��$.g$n���P*��M	�WR���G� ��b��+�����.qu��p��U�͡H7�����RLb๛��A��/K�%�{����#��d��	�~�OE�,De��Щ�,�E��b�M�wCϏ����o��כz�Ko�r���|鯆IEd �?:����<��/㭔hq���!�������k���D��=�EHd�褱��F�M��$:��Ȳ)�����%��N��(dIv��NF��GA�2�Q�S�ǀk0�Dd�5 ��%q>Z��4��Hln�f(��:m�жmJ�d�$��}�N�o�Q>�T��|�$>�� FFʏ�� ԙ͉:��B ̒����uǒy�B5(B
�^Z�ELI��Pz�� ,�� ϓ_ ���_*s�'x1�����y'u@Jя ��I�&�pp�o��4+��nꐴ�����c��HE]
1�_M�!��a��:@�~�C�}8� ���pk���Y�<��Y#�����wH<`��Pi��&,�1���9�`�ԇ`�2������ERǤN�f��@=M��G�V��s;9��x�C��}Y�O�����J�jAWUq:�P#�ְ�@Qo�L��L���5٤)A�>K6I#F���쮏PO�-��*^.��_p�|ј	6zZ^��=�2#e�},�5o��/��"l^���w���v���b�S@O�����#��@�J�Zk
I�D�2���x� cT��XS[Z)����"����p�-��f�B���̦�vS�.A��50C�G�Z+m6Q�|���ƿ;�� �Z,��)�5�#��1��I'�+�t��E[�s���$-|iS�{R�X���{��:�{��2eXs������_�[b&�E�X"[v�Q�'��3�*�1`�R���bG�"Ips����M|S�%��k���Q��	�H���5 �:�~�׀*`�����RDI����6��w5��
o %��:�U��t�,��:�
�!�aI��Oi�ILB2�A��г��{]|Nʛ�az$��K���Pk��	�5� t��JE���hk;�����Ͽ���h�b=��>���CV+ߝ��`>u�ݿ�"w�\�\�9��M�od>oDb��������7��o䟿|��'?����y��WW�O3�Hq�Z���v��WV���㲌	~��-���!���3���s�:F��9����<͇���s �"dR�?8' �4�����?aS�kq�l2����E��jF�(������o��ۨ�,�%D���Ё���2��#^�l�V�&ЬG#�V��V�@Xҧ� Q��lzOZ
���ĝt=$O�Dd$� ��QSU��(�R$��GB��~}7}> �F'KpE�h ��h������-�iu���"	qߚ�w�?�����U���"���!����I��ӒG�IgdL�I�;�Ԏ����6����uR�#?@#	0v`�4H)�����I$@�\�x�,|��ODR�ɱ`�V�#.�uvN�y��)�Gk}�ȁZ+b�H�y֞Ӓ���+���|�o��!���c������(��(�gY�,5b��`�B���2��'���@|NP;�{ļ�
�l�Gӟ��C@�
=JC"	��7p�7�M�A��>W(#�Beǵ��D,Ж�l��Eb-}�wyevp�O��6��tРJvAɈ����6�~���а"a��NR���N^�vJ?���F���Wa��]�=�47�,����z��O��K$�b�Co1z4���~�߷�{��C�fY껝CP��O@�dT����r�S�f�F�P��i�T5�����(4"xEw����g|�[`T���q ����#���4�����^�9F�!�}��n1��$9�MZqU������i�Y ����[\/�< �n���w&DP~.�Uɢ<�ؼ�7wU��5��y���D �2��������.��n�S2�k�:����h{�" ]3����$2=��	����]o���r��JH��[�sn��%&@L���*�3��*�&�RO��;]�HA�'�0����qw?���a������WI	�>�P�O%��X|$��*�C�<Q~M�`���]^�F�I�>��S"B�G%��GE"�P�ڄ���r<��;��6�b�����ϟ�ڀ��
ԸGrȮS����0wk�I�yϬ�%�1�`F�X$
8���X�8~�K��)�s�Q�Bk����@�sjHL�p���"i h���МL�JxČ�2�v(Ė�A��dt2��J��dl@�#�G�׆]M�1 �����rJ���ȏ7�)hEG:�� �1Ef}B��S�l�������sU��zȽi�� �������@��T����!E�d�p{0 j4EN ��� %�2�aϹĽ��mrv��[�W�a�6�E�S 2�gdbH�Eo��O=��*�z���Y�X6���.��h��G�%d���"�ڏ7w��v��&Ϋ˹|J���y��|�1�]Q:?��� I�D�{WlJ�2��#��?�I����/p��z���0�P
ؽ��9�!-�ᆲ3��ꀎ_�m)0��'N��T��V��}��.;�04���k��*" �ޘ�ĺi	�v�,1�t�d�4��<o��HH.�Rb�dz2�G�񛮮�xr�ec��-�m<����]�����wH;; /:U��!C��T�T��mN�8�YW��A��d)Ȱ�S�-�q	���y�1��+ȏ� ���A�p�'LW4layt8L�
)���%�+'pW�;�?���b�&�܋�֭@��ۈ�\�E��*��P �P���3X� B�)	x�ӹ�]�V#6��G��h�)��R]#�*SU�.AF��_���9���a��C꾛��f�CJ�R5��#p��S
7�O�ϻ"K��|fCK�H�U��s�����0M�7`�B,�O�,��a�������+ ���    ����a��������DX��C�:?���ǿ�1���
P���xz# �����_{���o*�q������Ә�d��O3a��F"*�$�p�ja�d)h�f5�a��0;	M��qs����lDW��~� �Hk��o���y���8�tJ��/�f���I�9�2t��a��PP�¨L��R+v*��LM�tb�`�j�w܌�˹�a�5P��Xk/Π���F��=� ˯�F��{�QE�/�����*EXPڿ�.��,���1&��� YMr'��H�,��UA��g+b�@���S��tg(�}�gys��fM`�����7r+^D�����>C�̓��< �zx�}xwS>ܟ��E��(}�8�~��b���������8t�=.��s>�:_��Qp���Y-'�53���J�n �����ESL
�JH�6v���l��v�P�{t6��C\1�U�[�C�˅���7i+���	)D�86淧�F�.�F�R	�;�CpĪ�S�[N�F)~MG̤�<�g�+O�oƿUΑ/e����ě��U������5�I�(5�qH��o8�ս�mx��ُ�n�[���k{Z�b�0������d��`i߰@`�t��&�P��������fӟ��9ۓS���L��a��B%H�C̅�҈r'��1K�c�a�S��5�w�iZ��[�e]�DJ�,��M�%�<�d�b�����;�~�����������MYRf�o��Y��k�Y�-��0�.��d�>��� |<:-cʦ�Ҟ�X&%�}͏PS�{����-���2	=	�v��iJ�P
��m��Ewe�?��o
S�����E�8�E(0���W�1�R�A�z�,��7y0/�
�y"���>�����#{nRJ�=Sj�@4�W��if���r��	���H�8 ��S�: �	"��'rz���?�f�":���"�=t�p��9�.{���Fj�`�_X�
'V���g��.D�ʝ�0�=b���������2\ �1S`i���u�E 	�s��(q;\䫠z��/}�������C�ns���"A0���"Uk_8��t��T ���� �E9�����X�Q��ڗ��p���-,$��6�M�H�ئų��e���ڷ��ij��+���"v��C�ɉ��SR��()~^H��VWax�x��.aO9%��K� �Դ T�Vg4�a� ���;Ȋx;;�ץ��X8J��\�v���T� �s"~(A��5&P�
�6)����cW�.9X�w����44i�4��Anc0���<;wΓd���b.�I�+�p�1�n�_�A�7Y
)�nP�\j�ʱ�t\�]YE��y͏�,�f�*���R�Ptf��變RUP�(�U0dfĪ���&])B,��b��D �݈�����zT�������/�%�'C�\
���?-��P@�	� ���}z\#O25��� F��d`ʄ��c P0�mI��F�I٠b{� ȌHK�'�<As@���$?����K{(>����Y���K�۲`���2I�oZ�}z���5����Ժ�i#�H�o�V�M23��$��#��-6g��8Ǣ�Ej�������_"����KZ�(����61^{����t5�E'�ᅧ�&{P� ��x��O��+�{�e�)�_�]'<�E����b��SͶ!+�X���,yכ���"�"��U�� �w��7F�W"������t�@���7ԇN�4�]�FSJ2�Zs��D���y����!)4�ݪ)�������$��eA��L=����r�ػi��R�'��J�t\�w����Y-��1}R@z�&B���p��x�e$(
m�U	է�v�Q0�/IC�j��"Ă$	���W��\�@�3mǴcB�=}1}��M|��vl��TZ#�tn`=��5 ��:o�O��]�ILC�}J�Iuª.�̛~?���K�
aV�[�����`9_ }޿�y��w'O�G��6�����{��Ɓ�vψ|�k&G�ר��, �-�
�DKօx��x�����.�e�<��u�
�����U���W��^�S±D����a�}�y�_�Ѫ�U�H{\��-��''S���)َ��-�ˊ�R���J��]u�Z�8�m�Q�:��󖚖2^�t)%Rޖ�I�������oA�mb7��1M4/�f�"�#����߆���0q]ou͞k�f��ii�d�}�E��G.e~_�S;�ub�����/�]�O�Y�i���դg�P����s�7���s�l,�4�L���	l�/�=�C�w�E�6;�YIi"���q�%=>��*�Hd�(5�o|����:����ᰜcN��p��@��	0��������9�EY&�8.�ރ��g��r���/C��H�n4D�Vc���3# c�q�	��b)6p�X�{���:��*&i��g;Ϙ́x�h�V����X�+��h��sJ���b�^y�g�%3Te���ܺ��V�Ć��V-T���r�iv��P�6��EOE����z#�S�ϳ�C��[�_;�͹�m煅�,QBۅ|�,V9����ؔ���;�0
�z��[w���]l�0�d��v�r&�|m�˹��G��&�/��ȱ�G�R�Q#��,��g�R
�"P��CI���:*�z��EL<K�99؄�p��<Yz������|�3F�s*P��W�)?^C]$�};Dِ�נ{���z���CD�|���$�:�i����~t`��(N�=�����K�� �ϣ�E���S=�U5�ڬ��*F���6kr"a�O��ĿNQ*�jW�B��vK� ��s����׳nV��-�����G߆�^���r�"P�;�y/�X$ҟ�����=8�j�q�tv��,s�@�'gl)~J��b�y:*��	�ox��f*;�e�3�觵Y/�2b�������� 0�$iH�&�TL��.�lU�ۆ(���G�R��x�8Yג˓~a9�B0��f�5�$gP+As����>���$�c���:����㻟��¾��qg��@��en	�N�E��f���u����"���U�² p @�4��i�P��9�FV��K���=A��zz��1� Kj�B���H�m..c�-kNgB,9��!��DG��a� �����݀�����%q;w����"X/�JXئi�q����
�jL���;�m���<��9�YK��la�	n^��FR=�ѓ�����N����(�s7MkPJ%C+���������~��$�V4�$pcw�X-�Q���c��,��� �m��z'��f=�ۙ�h�91:�u����d���>���Gl���_�N�՚��n %5�%qv3H�p����|�=]�߂1�c��E�(}7V΂���Z��9��c9դ�̰�fŬ;�wgW�� <7g�% bjF�ʅ��^��*Z���^��10���/���vY������k�i�?FK�Z%G^��e{X[Μ0\Pe��H���c��$�[3	^z�����w�s��~�l�]��GĴ��Q7#���+�u�u�e��E��B���,�\�G��2]U'��[��	�ٴ\�^������M3����݀ƭ�9�W��m;����_�>d]3]NEUʡo�_�,�1��;/��z��꯾��i�%���=I�(�Q���`���
F*��^���-���
�ǜ;q+�4
;X�-�˔�و:;�M��-
���n���]� Dme��;T�h!U��?U=��tu��ѫ.�zT�bd*���r�0X�����s���E�fo�?��=wޚ�e<��Q�2�r��1,v�E��h��1S]KM�	]��
�T^*]G�f�����v��w�(ҖW�B=f�F�%zY�b[�#˹g�O�Q��w�U��~�=<̍���^�<Q<5�������y}+��]7Ħ���˚B7�)TT���԰|R;�x/F{��^����U8&#��@��nE���j42K��q�fx�����Jk�ů*�]�Pzg��    ��+=J	��� |�����:w�Q��TQ��O�X��Sw�p��- Vԏ��/�B�Q.|(2*�6��DwS��;/�)�$Q�K��M�g��8�Dː��Y3��/ͥoF�yh����6��=8�p$�\�F�9a�r�����W��|,�)�M�8��� $6��L�$��na�k��Yd�7��:�S��N���K�^���U�Y�)&�0�P��2Q�'�A=�� ��閜�K�Ё��Ù-_I/5�n��^0��.d�G�TH$9��.�˖��dݎD��Pt.@R������@/q��<B����(���1�S��|��7���T���4"��C��ha���ݤ,�i��('�zǣ� ��UF'�K�(w��Ӓ��Ņ:2��u뷑�9�:ɓN+��c��)�����Q)�-eVo�ͺ(�٨���H�MAý��%ukNv�'�l���u��n�땿^/Bߛ���ա���|�]����� ���n05$gs��Rt��!�fܚ�)���Y�uˁ^Q�,˔�NW�0�| ����_�ј#��6��D�.)�En[vܺ<c[pJv�^]���x��z�р�mY��XrKSP�H8�$��<����h����tUi��Cq<q�kYS��m��fK�VW�i�K6ZЉzI;(i7��\����q	Qf�X��Ns���J�����Z9�*\�>�;ėbYJb�b�{C������C�yM��
��<���II��@쬳��CvK{'ځOܜ�z/��l_5��[�d�~o��|���1��8!0������n ?�؃�	�I�z}�?�js�����i[�������	��b��p�ߨ9���/����݁OX@�����$���R��a���f��?P�^���������i�K7��`�8n�Z�q�Gf\$>�E^���h��2���it�&���0��L�8�
�$$3�:���d�{�`>[�@67��z��:�'ҍ����<Bc2oP�7[zX�;�H�L~A5
�����c�������Ml�����{���>�p�vf,��!f�h��<�@/? Rě"�\��%���x��G�É��r�\����h�0G����s4�
��|�>6�H�{)�w�}��o1w��ژ/�}w9�M�ɯ_u����Kϛ����Ϣ�oXL>���4�͓d�3������
k8c��c��l����2�#}lw��o����i��8#�r�N�
Bd#o u�pO�<�������/���_��>�D��r�Z���ɹ2�!p�_���R�Q���m�g*��[-��u^�jlR#���w��^�K0�ۍVC�`N� ��b�U`�A�=Sc�S�[�i>�&�H�4>;2��
ǿ{C*U.�����䲽'���(��铃2��.w�:8P�Kݓ�<��M�=s�^���q�?��n��ON]8pbG���ߏf���T�G�� ��Ӽ���b�e�x��s٠0���UHF֚|Ԧ���( �k�z��1���@�H��e�Y}��`��bN}��q5}�g�����^;�2X��
�ܒ��#}���W��K���ɉ��:�1��<���r5�����1F݇^����^~�!/9S����2nਠ>���A*D�-!
nc��M$���3PWm��|���(;�/9��o��bP�SZr���8&�m�1�#}���>a��o�h�yH�0?�j�d�
l�!y%�.��{����_x-m�z�q؝�+��:H����<��A�q�ƌ�����N����R�C�Џ���Mރi4�{Zc�`J�2ri�N0t�,��G������
-����
è���#u����R`�q��U��FD�����/�r=X��fK?����H�_M~N��d#��&�WX0�̠� vAw�_�o���Fa�l]�#}�zB@ ��}��!�8A�h�Xz�(���;ɕ�jeF��&ვ2�j�c����W�ߋ���+5�A\�"/X�(��W�gz�bs^����Kן�����G��ɯ9u�!�'���`ۦÇ��0 �p� ��!$�x�o��jB��ݖG�x��N����oн��������a��D��BV�$�e+^���������a=�R�h�!�f�#\N+ߟ/���y�2�V���r=)����rc	�زI��#-R�ɇ���|��o�r�?Kj�wJ�V`a�/]��V�r�2n�GZ�_ф��$y�6�5�o�]F W1���{E_��io�8�1ηG��-yN�>��\w�f���|���Ҽ�����)5�c=��YL����o0�G��}@�K�R���#hK�~�6vl� q��m��)0z�ڠya��c�����M��CE���}Q/�����vn���ky���Y4)�z$������z�dȺ�e"���ؑo��(��N+y_��-��꣫!9 ����l23�'���>��朝j�V��-�7��ٔ�3��ޫɘ�]C�8&��hA��t�x��i&�E/=t�-���n=�'��rb���c2F<�`XDs�CjW��:�E��;M.z��^��5�i�e1��J �q�).hǸ���h4(�kV�f���/f����
�Q�'�Cc��_!
&��DE�'�~�6��G��-x�fh%���釸�h�ُc�xs ��T��=G\��6`�f=�G���-�,0
���;��	V�X�~�G�_��%����@�ɔQ['+x&$���z.E�Y}���;��e̲UJ���0�"$�;E����{'s@^�A���F�(�jX�h��f2�.&*�� J�[m�*�&N���=���`�,[���h�D�_߿���k�17˺�D�'~��KfcY�k��+��v����I�ܽ^7�]����~��ɩ�Ě�G+>6�`��XVs�F���8�m�38�Jro����`:��n��w)J��N�s ��@3ε&+L�N�#���"θ��E�/$vM0�s@0�Ha�^!��vG��>C����Ӱ�
�<�ǔ��A%���9�V깾�f��;Q�'�C�$]��0�c=5H�o�_�_�C�{�Y/�[7�c����q�h�-����G#8��,C��#���9����b��)-��j��TD������h.��-��4���oшt�I�]�8���}�M������ҁ�M���gI��Dd�*�
�Z����SLʺ�WR3��+G��_���٢��J���"͙g���kj
Bi����9���f���\�{�7��;�`�UIv����<��N�1�v �����QZT�4����s�m5_�:Q�~d��KEy��Z?���3Yt�DPY�����@C"(��/(�\���0|�V�%͐i+q���63όWƠt��8����ä�w�,�u�$��:�W����$͸7�d�$���d�&�#���5�,�c�5����k�6ޣ9�H2�'�Q��U��!�q��.cPb{��*�G��?%�o���x�H�����7t��$v�*��A�����FI�	�e�y`F0k^�$Iߝz��b6"#}��dc~#.o�6&B��i����J��Ę.B�3L.\3�w����� y9�@�f��M@\���f���u��u�͈�ZE�e���;̦dz�j���Lm}/Ϯ��tJ����'i�1���v�x�C�m-/#��?߂Zw�=�$@$]�Q�]	1�/p�VO֕��sc��������.+�i8 ��"����+��q�E�S���˯��M��Q�.�E�l_����ū#�Í9N�y2�K����F)��3���M��OiY��0jvÝ�ư��������AJ
-O���ȣ����Ȇ%-�%[x>2�;�,RE1/J�s\�t`�����OJ7��:�F\��ח`%�z7Z��^��}�A�y�R�Gҕ��p~��x���Q���`�Z�V�r]nT]qM��T���b�謴h��)�?�u�Z�1EEH�@�*����x_� 3����(oA8��h�(��mmY�m��d-�G�     !*:�vW� i��ɦ}��h��QHqL8�����s3,�jE�G#T�{�����o�ź�SӒ=T��t{������I�j}�>�"u�SEDG�M5�6$9���Ċ�m%z^��]q��2%�j֠��r���p!�����4Rƞ��;������2}/��SW��.�*�5���9L9�[��N&���L��dB��31+�~̓��zY�1D�j���(]�f>C�뵠k��{�Mک�j����%5P�%��Z�&-��Qw%�+e֚-SS�� �C���%�&OƊD=:�b��`���%�'��ۊ���䮣���(!f��-i5�'�����Rr�����Ӹ�V�����+˞��32�2��^���o�Nk�K�udh���V�-YMbu"�x�@��f�r���\��фa�'��]{*�ڡ_�5�	_�ZiQ�,���2�����JV%d�gav܅�5���n3f�Ca�%�q��J���x�P<֤0��|�J��ߔ��o���<��a�6?�'p�>� k�MQ3��~������N���(1�x �kO��9H��֚E��;1�"7�\�@J�(n:(ճӘo1C[N��Yφ}�/Ƃ�D��	8�ͤ����� ���p���xL"ޚ��RS��fW�G]gl$�=1,p�k��f!;֩���v���T�t��r%M��.��B*�b4�\�-j8F��y�tI���8k��<�w�D�T`r��l�a���~bjuW )���"�Jf*Z�����+ϥ��b�R#~D����P�YW� u���q�>%\�����)ߍ�Z��<�ޛ/�E`�b]��#i�������8��?��`ҋ,¨'�U�G���0n�ڕ�c�>�0R���#�����:ťl�Vp"�`���K�h���9��i�r(':��"׍V-ǀ���م���`�������c2�ηX�
Ξw{3[��a;2���8�<L���GL5�ݼ�ɏ^�d6f���H�� �V%��H�[M� �i��J���yD.��8O�i��K7���ʷ�G�����'Z��Z��T��~��H�bb��V���Hɛ|Jw) �/I=X�%N�#�Ln��s�^���NC����i.����4��\���W�(M�������x�>J8y��=���1���ӟp�����K���������\��x��>^0��H'e.з����� �>!xǋ��
�Y4_�-Fe=�Ǌ&�u�ղ$4��W�f!V��X`f+�ڷ<@+yܥS����G�������Q':����aytz~��:��w�9�%�.6��g7�i�і}���f#��`3�855��s{��L�wU�O��YT��*���灨�n��
#�Ɛ/�_��wL �E���}�uw�y/}PT�YaqkQNAl�]R��|�S�Ʀ�t�Jj���Vr릇��M�b�3+��7����������ȿ��=)Du<��l�`��\��Ե9z`b=��8�a���=�U��aR.�ã��\蜁���(�m/���Z����ck�"�h���R�����I�y���rB��2��HA�Y�vun@�o�dz�"����*�pC�H}⣟ѽ���������C��dF���	E�o��_2�A������m�Ɛ�t`��m4t����4/Th�
����E��Ih�����C�AX����d4��9��(R�~����
��8gX�9#FEo��o�C끇P��We��!A��4ZF�N�L�f�o&��֩(�r�0����$�F��O���5�{͇�Q��3~$8�j�3ر�$��"�PO�>�g��-5%U)"��Ȟ;q�rUt���G�B�� F\�	�&���gWYa
p䵦�ӱxL���vgƶ=$j�K�hq�7DKC�n ZO�д�b[�b�vZ��2�Y�%��f��e�� 6n�Č��2�Q�؜q��J����]�7H�k����]j�t>Q��'��%���gzj/&v!�N��θdZA�"�Oe&$\�E͗�{6Pd^���A�}>GA�c�_�؄��.�tͿPEp�7�k��:�W� �M\����>��=�x�x"o�9��b�B#���ỷ�����M�1�j ���,���)�)��L�{�>�iD�19�1f�l�t�L5�$3�]� 顗fF�}{��$���2��ڣv�`�����"2� �>���S�(4�y4�j�J�0��>>�8���+E�e\Ǻ����ϴ;���R��'��p3D�I���v&��D[n����5e[�W:�G$x�iXE�P'\;������M��Q�	!�>�kg_Xs�����/&?��z��&%ڬ���^.�pNu��K�z<w,�V9�~��!K���9x4G���گ���gKo,�#�����h�TKq6�v�xO��Y��t>�1�rʴ5"�-���Q-�(�<m�=D���Ze�xI�<�Xf���ߙRNa��2M9�B�y8�j&-�5�/��8��,�gn0�*N�Z�>�8_,�X>G^G��q�|��� �Q}�Ž���18�R��#j#�F5)-��9ט�9)��.
�Dn-��лd�|���tfrc�D�;�ߪ�oxZ8KAI�J��\J) Z���w�E sĚ�E�8�&A���w�'V�����j�s���������1����N�R��(�H�[�������bHr0���-{��Yy��tn+{���`6�N;.�g*V��trl�^�Od�gE�qXq���M@7��:9"MP��|q{�ګ�5kU06��w&V�����L[��{A����!�#�����;����ʢ%�n�R�s�$��Ýκ���4g����L�/� eM<�E�#3�A��!���J,l"������N>�1�_���[
̍ik����}��B
etK6 ��(�������EJw_���}u-ýK%�Q�K| ��.,�%���� ����)׫~����px�����¹��J�'�l��ֵ��Q�!�Z٦��q�D�=b����`��P��T��M�AjЩ�i.�1̜�<v�ׅZ?/�@[v�I JfȌbh���ǁi���o��)W#�y{�)c>�h٣Hl��"Q;^X����(ԑ��aӌJ5Qg���s	�m�wС:Q*Y��i��M2�֖�	wE���#e��C���t�]ϼ{C���5��� a��R�>��eYR�ɀ�d�W��YEʲR�ƃ��7(JztZ+,��n�T���>r$݆=c�lT�f��}�i�4g/�	{$�:���99hE}k]<�h�P!��-��Y���y���.>�@�}o�}2ltID�52=I:V�N�Hi�� uk��YE��E]��:���E}�%\����~�����-�/����z�{=����mͲ�2;����α���_��Q���W��EG��/gT�)t�����=�XRsV��"X��9��Wg��[�v͗.�c�{��tp����;�z�=q��V�I�%e��.�U�=�DBU,=�I�X�7��wg�?�Z��#����&�hp�.��zw���Yp�+a��b��cG��r'�1��Ll��S�3(Y�3Mlr�v� ��TW\R64��'�)FZHj0g�o��1j���8���6pכ����6t�$ڮ�(��VQ�J��p���j����+����Won�g�,����]Z�{��BԴY�f��5*M���qD����A@�j�!�l9d���%�|e���b�ģ��h� [��Oiu�A{�.�٬V��Ѧ���F�ua݄�9WuqL���j�;haLE#@g�ŉ�K;p�Z{_�سuqv�H��t��a����@UVM)Q[yPC�ԋ��D���+悉q#�d`�[.2��0(�����^���Zuiᴰ�4��~�����v�>Չ�fv7V��3�F���f*ۦ����[�.L�����^,�R6Q/F�ۇ}��M4���Ҕ�ig2r;_QJ;�fO����H/g�&�ѭ_�֭��	L�}�6���)��C��2�D�Vŕ�V������ݔTfy"�$��3�l �n���{�n�-    f@'I)X^C�p<�sV�N	����㬹�&��������d6_�����f�Ғ:��i�������A��~ٴ#٤��<6&h���D����Ŏ����l�M�ʇ�(���n`�
���VM��T�=���1�8o�*-P�����3��Qh7�5���4F�*[w���Rve�cف�D%v����td+ِ�����J�.n�L5S�j*��A��5�`7-����!n��ԫp��h��4��f}Q��j�X^LHˬ�Nd�(�����a��#]KY%:"U��8A���,� �^�}�rQ;bK*�����1�[_���>@ah��gw�
]�.ñ��*�;�oћ���D/�z�p�2�3⁓}��� `R����:㳻s%�& ���+����ރڥ]��X����H�b�;�k��QE#�؍�ȍ�O�!����� ���w�H�����+��*�鉝����	7e#�ͧ�uX��o�NK2)�j#4��n%��r��r7t6@E5C��>�S���;p�@�d7'{�9��$�v�8n�q�J̤+1�&Fl@G�͍-O���b4u=W����1�EM[�c��r�B�*ب�厊YH��;iB��pb�l6&�`zs��B6:T�`��s;�G�&,;�&c�Ta�����Aľ�F�:=&4%Bd�VF6hC_��+#��ڜ�6�Y|ď�"C����j��t[5���y�r	�4F\����#�������`��RG� ��Ի��TE��iY2���l㺣`�r(��7�(���"K�=@@�j�� ��uM)�.��a8��G-��PCN���`��ܛ��m���G#����?�B�D����.!���hb�3��T�P!a�Z�e<j��s+�����n+JOdB,�dq�x*�����V&RՑr�ئk'A�ٖc����L]ݡ�W]�?����u���O%젆���Y-��KdN]��d�6���ʵ2�Y7Wj�Y���WUN��d��k$b6�� �.��yU�!��ZZ_�f]p�W�U�herY�zKw��R�Ji��=��ϸ���#�j����h�V�q�i\U��!���a���`n'��t
ꑸ�^�4��w��ξ¦�	f�ѝV/D�a����1��@��u�[�w=;Ujv��Fu�~LD�DK�c��r����4�~�����v*��<ut����l������SN<ꀉ·u)���8�[��;��*`���/Iu )�,Rl����bR4��/��%[وmj�,uDr��Z�z��Dr�����J6��U�)��Mp���:��)݋3���3TOv�"ƻ�f(������tW�rh$q��Wa@âe��S��Ѫ��˩��p����J���7d.���<��
;��N���!��g��b#Hx1��/�H��h-����AuΕh[����L�s)��e��Ӕ�1t)��CM�d�9I���L�4y��q*O�p�sfl�U��8K#�'��E]��* e��5���q}��el.� ,��`��P�CU�Λ��aE]�&`w<0�3�Xu)h5��pA�)u���ڮ��;F(YO��q��	R^'��GVX/P��W#e3�V�F�c�(��2\9
md㍟�Q�4�����k�Gtt��5�@<0��n�̉5)� =S􉳣��I�"[�gE�|���w�h�4�ɩ_K/I��3Zgdd�0�igĦk nS��̻��	]4W��8��p�R�q������u,�}U5��F�p�ϢV�����+.:����q�պxf�#�XSG�����ٱ*����Ί�(ψ�{0ŏ0+�^A��کc�p�83IW�P^<i�����n�1*���߿��$��Hj��"ctJV@�l���>$�;N �f���d'�$�������)8Ǝ�u\d�uF
�[��"�J�(DаA��sLU`���D��TtF�j���A����qvN:�v���6���U���lT'0m4n�\*�S/����5���їLs�H���4�ArV�����:ؿJX�<%��Y����I�^d���=8CE�赔���1@1	n7���`�V�F{\�ǽGЛqv!��i�'��u0�M6�%��_��1�6��M�k��j�o��=  ��%1�uj���ܺ�t�S�m��Qw�C[���f���S_K�j#���>�H��N`	��١"�EG��H�PBB�v"�J���1��Q��F�a.}�!_|4�9>�'At�y��؞�B*�n:�ZV��]^�J���)�xQ9Sl؊s5��5{<��?����:H)�A�=
�RkP���7�:������.ٟ1��}>�U��ű�zֳ �n���g��辚�P@��l/�F�h��f���4�W+��k��
$��k �^�~�Bj�_&�@��3����H�H O��F��F��
�)ũe�ٽ>�L)6֐{�hGw�����Z���"�k�	,�=��Ú:��(fIC38T�L��ἶ�:�x0� ©�y�(h5�1�%�ul�*�ɹ77�.Li�o}��A�(� UX�d�*�e��䂚����_�8(n������h���c ���+���	�hG40s;��`cƒjYe�@Z�y�E�T�6¾gj{��c�g)7��9;�o���Swl�P�t!;�fS��$�Tc3��$�~��B���".%sp��]���>�;���~B*��#-�e_�PA�c���W����3g���ֻ�����,ܒ|$�LJ��Xo+����[A��-J�����]m� �ݒ/�W���@"��[�M^�[L��do�KUǙ�>�K~5������n�wt:`����Ua�D4o��W[����Ĭ/o��_jڴ"�'�ը� ܵF]Z���[�c���I�Z�/_���^0[E~��պ?'})|�3�:�oo��XC	���ELR<��WI���<d�>Ū��Ã�y#�����$�#��Wz��vEٸ�+g��#�N�.�� ��`
5��4�䡚4b��c��2�K��i�q7)�@����3D�$�t��F��T��Qa��Gc�"<jD�z�:;'5N�s$�9{����������{~��Iq�������[��ʬ-���˯c�� *j�v9� ~'�H�=���"�M�cO$N�X\SZ����G��Q�~���qit���u$JY42<�Ϭ�'T�!��20�u�<�N�"�|"��ùM��rV	;wHD�&���-�,�W|X�v���xm��XA$Gˁ�K�Z��'��0|�ՙr�+_5⯱]\zLE�-=��TWD���2͹�:e��=�\?�ϣp�\!��_���5���w����� �GV���p���1�k�PShA�X��U�m�S*��F?k�Ȥ��36�b�u .#=���p��m���q��7&�P/84�֘+2���M
J���ik��'��;���"��F�����ǔM��������e1�B�OHґ���G�8��pCTh���5J�� ��C)b��k�s褛��Е@}��Y`-J�9�qV{����?����i�dcÛ��IET�^�@�������G̓��i6여�d3��X���ʽ(-V#�(�r���F9�FV�S��p>�-��Z,'��x��x��O�c߾SC9�5U�~�����lӘ@��� �7���f�����y]d[Q>�~;%�;_	S����~Ie�#pˋv�&�A�r>Mc�)Fp�Ⴣ��@�#06l�H�;ls_l�В�.�k�*P=e�P��i��sC?\Pr���3fz�×�j�[x�ј�P�L&V�����weBgG.���O�+�:sE�/��+��D�N��K|�[��o?�}��#�7�W�EBG�
���'���j�aO�g�}2ͫS*j==P�9�&�&/�t�Q�y~q\��_,؉E=��	Ʊ���n�rD[р�t�w��5��^��hb���O)|��.K���^̄�#!���H>��9㴫ڄ�] K,ֿv���=��k:�9�ٚ���
B��L��`�6���Iq+����Ńi4�w�    �eS�IbpY�i�*���'�`�É��v�C�|�+<b�Pmx��_�N�E�ZX��mg�h�c�*E;��U����&��m����`8^��jW��C{j�ň��:&Q�vF�1�z�N���?c��$��k	������<s��[�-�;�s�.����^&��εS����� � nX�F����G�$�)S�JȋފS���俨T��n#.�i9�X�ˆ�7a�WY��t��
&/E��*��M�E��g�)2[��B���ΔZ�Ӷ�"��$Þ`��d�k�-��aq�k�s��f�	$�]B3�$�S8%�e�)��@�Pr�����D�71:�V��B��${*|�5�����Jݳc?F\RT���2"s��qZҿ`t4"�+�(Su����K�
H�i�F���t1)�憐y��aCly���Z�f���`gL�V�X$���f�W�*������A�-�W�F����q�*]r�U �]͂����֣V�Gt����+�!XZw�{?�ػ��ЊL��a�|sr��AR$&$Q�7k%�VT���,ɣt~����6�>2�( +��J )%\۽��Zx�jަ;]oʇ��Q�g�����b��-x�ӝ�#ծ�����5�A���)��+ (�⎰�v3�m'N
���+�	o�L�O8��2C@��j�8X9��t,Y�P�JY��{G������Ú��.45�!�E����v�m�,x��kHzRn�������>b��[� ��tDe���=eF���!9��+b�p��IUj�h�vG�5��t�%��Ƒ	�Dz�;T�S51�Q�Rs^�!��O&g���
Y��.Jv析V�9�8��Bz	��bA�	�~V"�1�=q�wXQ��M��k#�>c�;i�#?��\�%�O�us�t�E�ղ��L�%�We)�,�$3��˺�����x�d��M:$n/R�::���%�o$(�f�㱴xE�t��F*�宲�Ou�W����6š�h�.�0;8j�IsP�QGg.
�aKi�*� g-��#f	T�LACfB����V�#ukR.�b`	�|�A�*�Z�����BF���1̤y,�n�?>��N ��T��T
�"����v�G��>����3�"����!x�[��! u��|��y0�����4aZ����L�+�c�\����#��b0�QE�%>�l���[���H"��9/;ldwt��]'-o����� �^B�K�ɦ�ʏ⪲p:^WE����I"�7m��5Ǭ�<p)%���1Ҫ:�U��!�"h{�j�c|��Xnc�mz��j⒬��2-�i9R��a;����v��m�E���d+��� �x9r'.���J�Im&l��N�yoҥA��A��*�J[�wd�`
?g�p�|G���ƴ�G���p>2?'c��
�$��X6b���5���n�c=��軗����"w����2�{8��r**Dc��e<P�I�W�F,�J&$h{,����VY�|�!��ڀ��t��MK�QLS�1"�+��@�%qX:��'��V?	�d�`��6�=��*^F���~��l��UE^�JyS8-����H�4yLa}��i�O\$(��&��F��z+�������1A���-1�72X�'�ឥ�ɀw)X�C�Z�;��.g���u[�K�1�T�|[�^� ����n������1�떫��TlQw'd�a�jA����}4d����ՠ�N�;0�vD�;���MP��a�m�Rւ��e&g�67T��ڈ$�̙̎�����}FUm4],���\S��'���Y�A�*B�����$ޑ�|􀓶ya�r�K��sz"���*����3]��f�9-ڏ����/�����tv�k�2n��&��"�;�K.$(6ȚϪĭ�L�vv�5�������K+� 
H'��P�e�.cQ��fu�vp�sh�ѥ��3U狕�i���yj�� �ч��_�:0��Fp�{�@}�!�]��3E�0����k[����p����r[�	�w"���吖[�M�\	珿��Y#�F�s�#�2<Hm��~�5rS~���ik���8k���r����2��P��=d�^���L7�4v`�(dS����'�9�TNa6�-�h��e�hZ�GE�I�l^��ߺџ��g{Q��f��u�~{ʼ��Y��S�����W��T\P�gV2�q��+5��px�t���[Y�֜+A�Ήm�Z�:n��u���!�~A%F�:Z%���R�A�(2��mkH�Y6?�c-&e܎�[��r����]�f��b�1G��k�!J�N2�h�aH����`}�(�#���B��:Vg����$E�&�r�U�������j��10x>��h�M������:��KR����&�DT��nH���	['=�����(���V����O�8͸M� ���n��XDǱ4�l�u堁����9�CQ�%c�vbߗ~�u�b�;�q������G�)s��l��G�������I�N-�{ǜ@��Vљ�i�խxy�)�_�̵������c��Mj�ou���e���tQ����uS6��5�,v-v�f��M{�.~�l��a�`�����ݢ\9��w
�pc_��9�(l���	�El[���4�<E��؁��5����6"���ri�ь}l�I�G�s��"���>��_Z��P2��`�ɸ�rs��EQJWӾ���(����vV�������Z�D������}YG��V]�>I8ީ.?V��reK�oo��L@����J��z�\�����Ų��5Zz˕�D7�y�^�ܛ��U���1�lF���E_�!L��G�,�n�ں}�YX#���m�3��̆zv;%�xFv�����z�qB��A����9�Ef��&�5��?�a��(*�+?�/�8�Ź8��3���y0����wE9�@��^��+U5���d&b�T���M��2���������/�M�%w���2������Ǽ�!���b/�`�2X#��`��{�v�{A-eܸR�.�>�*`c�2^�P;�M���V��c��$)ߎ"ğ�ʔ�T��	e敌]bC�����Y�X��{p�4m	d�`tosX+���,��jX�_D-|HŁ40~O׼�Dr�O�*mݘlj�1@�]�nD�F5g�{����rޕ�e�>�N�ޢk�K�ݎ�]�ڋޕ���]SJϞ3A6%��FЦŵ����Y5��'�ÊDYj�&CzFv������,�7��3#�G@�j�� �9"_F)7v���_ۊQ�8�Z���/�^%I=�C��/�����*`ܟ�-PE��i �<&��\s�-�X:`��R��h�ʍ vC�:YGN
���F��2��s0y#��R�"TL&�7���t�&_�5#�����H����:w����M~>���:J��Ɇ�D����cə*��l��9�V�@�1x ��/��M�և�s*�c\^����G���ٮ�%z�sǃ�l�`�	6A���w��z�.���v�%Ѣ7��g�jᶴ]�������#�VSV&�T�QI�^m�c�w=�)5T�.��*2ڑ�&�	�Oa��@�k����֭����#�D�qw�^&���6#H-3����[h�8���3v� L#nX��H�)�,����¥K��A'+/*/H�Ϥ��ڷ�f�Q�<�2���0ۚm3���	��{���z�7m6�2��hFd��:�{fB��w��v%pT�[5��W_0f6�(G�q=�l},��BDT��Dr�Hn�K���(wz�
�����鶥�P�%-S��󖇦0��T�1�~̨C	vs�Nqh�R˲�e]�[�ʤNb�p�����N��@]NX�*��}�ᄫu?񔃉�.^�6*��݆�e75�fb����)ڴ����Ʋ�
�k�.]�T<���G3�ѯfO�b��������&�1Qw�4�T��F���1?)��3F�Րj84��_��=7�Kh��O�"᭖K~�s?������m>D^S�����G�?�Jy�~�?������rN��x9_�ܙ�Z�n0�hL�pѢ��$�R    �k Οt���6
2xL�K8Ǆ[4 �'f���/7J��HV&��V��6ւ~���vAv�������V���A
�U­H��B��&c��+��Ul��p��$�X�m�;�-��z����F�Ւ��	�%KH�QҤ�2̵��$�<i�٠a�L��&X�b��T����h5
�����E׭J�%_���*�_m�PZd6{މ���m�ԁ�v;�Ξ�c(�"ϔ�3�+-�kU<t��z3���C4(�~=�����0µb+q������r�m?���۳��rf��rHG�-�6v�c�Ɗw���)�s��`��l��4���{j�؜�a�a���)g!�����>d��l׉��#�77OJ��T�6�$�^�1�!5j|:�m�I��rf6��]��d1���R߰��YTD/ 	Ǜ��X�1����Q|��V�H/�m�w��fN~>���Y3�U0�����?����'�k�n��5'�H����;�
Q͗>$\�[UR�b���a�����h�fE�յZH�;v6K�(�ah�8� ��1�rEݕIDCz��_8�>p> n:Tΐs~�˭s����'#��O�ܟh���鐀"� 8�6��4�T*�u@9�#�5U�:ؙ�!I�x�/g�k'\,c'�.׎箷��f��{�Y�
7���y~��0wK�]/�8t�z�� ]?�]�zT_�Z!|�ulJ����p�/�K����2]+.��
1kgp|CO"���]5/����a1}���́Ug3�&HC�a�gt(+��ǃN���]ő��,���6�w7B8�ObS�+ͅ���0���p�����۴�.�=�{lt�J���I�,@�Tք�����V+G+�ad~"��cM��Ø
C�j[TCq���JG�Zú2�/[��� D#J��^�O˼^�tZ��=QO(ˡ���c��N�삾.
`J˞伓��(톺Ɣ-iY�3J���5)�"j]M�a�F`�1k
4�^3��/a���-��ל�9�J�v�ŞAb��Q}e[s��N]��%z��ِv���vBV��M�����'CԄe&�gV7u��x��%���|bӜ�;`�.:�yy%��R������#4s�
�ߟ�k�Z�R'�vх��-��p(B�"�
U��d[������AChl��� �p�?��9�h/�jJ�Ι���hZNj4W�c����\݈����2�g4��:����Χ��%!�%^)�}U�Nzeg{�._Q��N�Q�������xk����ʲ�-�^~0y)X��I�U�4#�2To���H}�(-�we�\A0�v�ƍ��=w������%������޸2��f�IH�i�W
�mwˠV���r�a�{]�� T �]\rz*o�)f��$�U��L-�eDњ���oIp,֓��U� �LǑx8���ׂe�����YAr/�Kb�y�΅i0C.t���ݿ��ݴx]�v�����8�͈���iJ�<��7:���+�R@�5v8#;^L@��rq��6��-�iTp	���
��2g�*T����p�J�Jj���j@���P{�81�gi=9��EH���	�:ע�(S��]pRJ�إuC�22M4Pa�'I`��"�Z\�#�F��[�����U�Гb��0��7�������܇8&�����Z�����8.�Վ�����MI>Gl�jـ�xd�T�d���f�Ha���n�]��i�ݢ)��NsE�MN�I��]�?��WL ���{[`��M�VP8�����Ҟ&�4�]lV�x�X�)Y���j���a���wv�]8�Y�AW�\R��
5�[L�'j�� ڵB$b�/�H��)����wc�g�q�/��=��d�i�qT�W��9�nAiZ��R�U\�dM���Y�"��c�d&���3���w����/}w����ztC2���ج�G*��	2��&ך�_Ϣh�F�C!���i"���.T���H�ѱ�6,��	�ؔD�$9sj�Hj8��8�qlF�m�RsaD6��(�[�d�k��p����:rx4���m��K��I�VM���7n`Y�x���"�LF�GN+�7r���	Ö��t�`#�&7�ac�+��Ԥ��Ķ1�v�ll~��i.�T@�j|"����iltf�t�uc8��]����v�*OY.��Շ/���0&o��VH�fJ­��p�����l�����`��7Հ{�~��͜���ory�.\�m�QQZ��Z82h@�-�{@V�q���
�3Z�F:@בT!Y����
��rL�j�S�#23b��d�G�pI�j��2F_ꜬnWO��Q7v���a�T�����/h���!0��K�Z�~�4�����g������w��6����l;=W�r��FY%�\Vtgk�MU���f�c.UI���+��a�-�s~�e�K�O��f���lqW��G�УQ�?�ꅬ=���~�"��\����5s#ut�%3e�$V�Ye�Ts��T�]���fT;�����������)�0b����'�R9�<�Dh�Z.�����qm���?Vدo�G�f�L<�TY�`�^��U����I��R��p�c�&��P�9�`/q��{b6�T�Q8�NȩO	��0~<�u,FwW�ء�|QĈ�1�xP1��WG���GZsO��Z1���3HwQP0�i��i�ݰCevc�����ߘ)K��p8d��XvW�6O��Q�o'o�.�Tۭ�QL
���D�)�Nq�q�~�^�_��_]�QNJ^5I�z$�.��d#]���1A���1<�R�����Oa��)C��aG������fHidab�^��{S}bi�9Q�T��� 4��z>A�m@h|(��I�k� eSͻ�h�a�l/����5U��H���}T;V����&���!Y�`l�w�7�����u�$R�N�P_-�G�鯗��Sy�Z����|��z����Y!�yD�*X
�|����-�)�+�4mj��[Aa<j���ߪ�o� !�Qt,wS̏��'��PU��1�j9��mi$�z�n�[}�j����$�L}��~E#M�qS�㎑F��4�o���� ���4�8��u�>`����G�8�o�3�]&�TnشҢ�U��W���iy�����.�#/kF#�(sT�d����H��G����u9���U&R�)�Z �D��F��H�����<*��K?\�/>'�xi�g�-��V\@$�)���y-��y�ܴ#���=����ß@�v %��1l��痢��nG!�pHz�X>��{�&����s\�(���J�4�[2�|���Y2#�Zᛀ���;�u+1]!��N
#��A�����6��k�p8�+Qu���;R�tGMH"��b'�� MĜc��Rulk*w�g_a?�C���ϕR�fd��VG3Sj�d��t̉���[f�p�1=\0(���+:}�.n�N�7��QE�dD{*�'�j1\qƤ��P<�[�=C`�۹�6����mU�QX��(PRA�����,+�ۯIlv�,8��.�"�"���^�8 L�T^CW0�:�? ��Y.�����+7�:́�_���IlFC�*��:'��V������T�
��f.ӤN]�<��{_Yg:�k*r��[���_g�tL�Ӭt/��q������8�k��Z*{�ȉiJH3������q͔M[���t۩��\�C�����f��a�bv��B�c�L�d��+eJ7-]CQ;1<�Y&�l��.l3^|Š�v�dT2ܯ2Iߣ�55y-1C4�TNGSU���vP�L�W"�Z�L��뮚)��҆��-'o����[n؟����maЮee/�r_�V4=&�u�L�iZGF�7c�f����o��!ͮY��(wY��k�,"o�E�kN�1���E��v,^��lͽy8�hL�A��ʿ���	�U{J�������K������(�1a����"ݭ�2r{-���Q[�@u����f �c�cpb���hw��EF��1�7co�S���,�L�zy�i����oPU3˹ub�T��s�n͑I��3�W��z���    �K�U�T�Z*��X����X2Ʉ��$Yԯ��KDx�H�z���I$@���_>�(�j#�cQA��nt�LJ��a�-M�vT�nh�ᲇڰ#Pv�\��gv;x}�Eioz|3�>�d�dڂ�Y?��dIp�Y��C�ET���t
�-�6��IC��Xl�g%r�Ƃ�;��c���5�G�-g�\�3��Z�$e�{��q��l�5]�C�B桍Ӕ��2��T�rM�!8xE訡%�7f\#���	�c�����Š���\)��[���;�����M�ˎ�#��:%[�O�������A,�	j�y��
���m�~U�X/�:S��� E"�$Й��>2�0��ڄ��
�-�E���Ӳ�����lnS؊o�w��{"Ȫ���Χ��%���ڕ�`[G�u�)�����¡���xR$ƋH���� �JT�L���l]����wK�����{+F����6]	
i���/-�:�v�ཁޮ�A�e�����v��M��]<D�����A�
֬j�b�(S� q�ox��)�Q]
�l��7lG�ҋ<k1d榨X�C1�1�3�H�Bt��7:��ޜ�ƫ�D�Z.W��l�~�H;��;�d
A�5��j8��W�)p���ł�^���h2O^�ǯ�˛�z2[{��^�(��)U���N�s�pg;^���%�[�i��97�8�>�,�xd�Y̞W��so4���j	���4�Rj �,`��q>p	
��}W�6�ā6�b��Ũ8̹��@�]y� 7���o��[��-�Ж�XM��L��I�[ٞ]�*Z���´���8�A���Wk���������e�C7M'�!6b�ʋ��QDf#�	4~�K�Ċ ~F�� ,d����J4���+j�-����up��88��UJ��/�ʹ��	�i͓ ���z�C��=��:������c�5�����ZP�b6���!%:�J*!L;Y��g�אweC�Ц'Q����Ȟ�%�<�D�a��JB,y��0H'kq �r])S�1d�W��U zݻ��B��e�r�)�7�a����CL+��C-w�x�^M��x�[���b>���f���7��h�^���|�X4\��W���z����G��p:�ǯ&�W���r<�M�z�`/{N�+%�~�&\�.#Gs��h[�x�An��p����Vj�(�R
�r�r:=*p��pP��W� ���r��bY���ň"�� {����� ,�._/׼ࠬd4���
 �[<6�ȹ��!�9�B
�s�ݻ��V���^D�{�R&	�e��\�7�;y�WJ��ᙬ�,z�&�������;Vq��m����x{���(y�VY��P���v�2,�V�YZ�.�D�dʨ�:�C�p�dҥ��d��T�1>
�����@9��dl��o&��r�l��_ �yKލ��ь�e�r�Ho�$��eѢe{�0�P[-�q4L&��7���(۶4l	5�j�"D�#�NE�+p�X$Ź���s8� L�}ȋ�N���ԍ��K�:آ�B#����� M�Χ'��}��u@f�~P�F� �씺*�B�ZE�5+��	�G��ÿH3w��ŪǓ?����������a���W�qN�K�d�tf��2�c��i4G%y�*���|����v[g�&U��_d�.��FC�R�N��)R�+����'d*M���~�w�Cq�ݚ�L�y�B�H��n9�I)ȩ��p`��ލe���J��8��
7��5���6�����0��ʕ���ۂ�)8%�Xs?_pU�t�t�C�s��mHeAM��E
ǔ~W��"��A�E�r1_.�S� w��v?m�ݜz�n�%�*���Q�m��;�X	��Ux�^6���d��$#E2�I�Mb�mj���"H�mX"�w���Z<L�UI9͹�����E�Gq���8�]b��hl�M�7^)���^_P�9�R�E	R�N�.��� ����?n���eT���������b�;�8����o:++}6��W/U0�/W��o ��8�:���n�z-J�C6��F�֖�k�\�6����ԫ���k�y�
"�'�.x�+Ȣ��5��~p.;�"~w����2�v�8�n��j�]Clm��N��9��+ �-�b|�vb�)g�c*x};#�ja©��/�~��A��JJ�t��><�\���2
#P0@��ݎ�	��	����|tp]���c���h���op���;�����q��ӽ��������i(��cC e�6������:�v76���HfP:�I�z��*VE-M����f���pe���	�'A%2�d ���c��W��{u�]$Y��<�o�&����D�1ȈlŠ���q^�b����H[��zZ�+�Ji�2�����j�X-��ֻ�N�k�������Ͽ�[�g���h����i5�����oV�����y��?)��R���IIF�S�Ef_�t�pHp��p��,��#�A�3v{�w��� �|��-�L�A�-�T���	V��P�2��L:ppk���VV;�:�"�^\!h���J������2tZw���t SL��4ܺ��e�n��s�h�H�iKz^�����.MzF m���x�XA{G���Q����l:����9?�����|���~yw�����xZ�˭}+{������0r �J`j��]i'�t�x]�F��#��f��H�sGv	>��RGv�4�K�m���<\�n_��b�,�F$	�|�{��
����
 ����=���YR�?�_��L�/�mǖ9�Bw�Δ<���t�0C�W�7Wl�����l�kV�+��I	{Q����u��|��X�$1;�L��ʖ�Τ~��li��6K���!�Vn���Q�@����$�����}G�HK��1cE˽��6g��lެ0	a�~�`��M,���o��6V�� ��K�`�ce��x��+e3����24�}k?�a| G��	�!�u�J�e`7l[���e�{�a��'�K��"�vI*ZT����k怣[���" 3>C�	��g�T;X�m�*����+]�9G౫��Dto�i5�Dw�<�WRg�����/߂�e;
'�{vF�[j�V�����b����Ŷy4�j4[�G��4_��oo�L�O���L�_�Ƴբ�G��w�	�h���2�v%,� �y�����,k���c���^T�渮il��o3���Ѻ�ֹ̌h@M�>Xc� ƷA���e�()=Jg*ݶ�S;��p�σс&R�E{d,�=�7��GQ���г�k%ʠ��)i�����S��Σ��������������-m�||�ԁ�e�<L�(�P���d�n�U�F&�).��G3��A���6N�x� ����פE��޽Aߔ%9K7�������_kx<�$D9�-{5�i���ғ�?��	Gڠ�
r�D�����6����0l���@�2�p���X�*i��\@����T����p��}��o�~��m�{!�R>u!4�ST� ,��^�2��/�hW�b�ķo?���?�Q��s��E��*��H�E�r��#N����PZ��.Qʆ�t�����$�m��xM#�_0XE�&��F����k�P�j��'��K��<L�:��f��wY<-�Íp���r���7�������4_��u���(.ܛ��u�A\]� �J/�-� ^�ĥm
���N�̿u9r� m�OKsJ����5���H��h�������g��z>_~>_����i[��6���Uۏ��`xӽ�r�.e��d��x׬�$�l$�?���NPQ����K�Cs\����P���>-Oji�S[y5
�"e��Y� �>7�y��4a(�pwi<(��������"��]I����������DK��UL�4�JczB����k��_Be���3O�-1�Nn��,�,�s�����a�ү��һ+׀D94�~���S�6T�^P�1�%mc�'�Y��9q[�mk��N�U�rV�
�QR��    �Vy��C��>�?»��+�\wU_
�ۭwr�fpo�9������Ng�ey��Io���.�;�O*)่*�Q�p���z��A�#C��q��^3.u�Bu7*�8 �������8��y"��VY� 1�ӡ�;�_�K��Q\Uu�Y�Y[5/�ݧep�O��k���xg8��gnOq�K���66֞S/�uH���4������p �<PS<t�Ӥ�ڦߖ��x��{���G��1DP�C�y(�����@���E�);t[���a����w9#�a�XiJ<e;f��+uF��8�����J���_�V����f>�Y���ɺ��>U�b�\�}<�^T0.P.<E�\��8�^�z�c��7�,��0�/�D��$��&kf���ԹM���:�Տ��|���ʞ��D����8�k�)�G3�Mm[q%fԴ\�l�}��?5���CVH��ߟH�V�ޕ���nF�V�,���X
z��!"��H��sZD�>J�U�[�A�(�_H�P�1�}��>�Q�먿��<^�a�2FT�'�ﳱf=ݏLٓ��gQ�|M�Qƃn�R_����d�g8V�ԪE���1@��^)�[m~b!�з��cH�{މX+5p����Vg�O�m��3����8��X�|\cQ	}N�4OH~ѷ���R�(�.��_]���Z�`>< �V5H&�d�uP�X�a*�E
}������Ӹ���VR��yTc��r���xs�B����ￍ���[�����7�Y��1��ՠ"�^,G��e�j�-q(租h	�T*�����h|�XM&�yۏ�S����6�ͮރ���¬�� yÉS��v����cW��D�Jw��<�6�����]�v�Z���q!g֫j�K�1.ӡ߈P�c0��@�4��$�༾��MK���"�~2��|]7�`���֫E+��d�XNg �O6cb�S��^�+DOn&����pf��ބ��%l|7ڬ��u�ZQ\�����8�$pb쎮�Aa:��b�}F(�R!,�Q�����H�C�ԉV��R*�BM��"���C��<rhf���f�CBsۼ�gv
��9�B�#+��qz��A�+,�{l�-Z7k[{�w�c�L�5G�"�et���* O������mx8)� D�f�pZnt��_.>X;P��m�n+߬�9��:Y����q�-GX�hݣ�����oTIϱ�[�CV�@�(����0{��x�*�P7X�ɨP�p���(���F�����b۽�I���A�7|C�7�);�6�������G�d�N�`GH�c���I�.�/9=ǗvM��7�����.���J�j_�5�T/f|��R]~����9n��:m�B�昽R��$G*fQYb
0<�W{UI�m�4��m�<⍳eN*(W�RXh��i,��ui^���\A�H`& ��� fg��蕟=�#����xn�m���Z���h��Ov��b��+��^��@�0���iۏ�8����E�@��_}�R!z�����6V�����ۍ���hJ���y�QF�S�����L�ٵ���&�(~�ɖ��مU��Az��k�-q�`�k���<�Cm�L�I�U�A&�&6�q�yX9���Bʹ�,n'DB��j��Su�"hf7�̇O��φ���A�f���g�.4�DA�v��XuB�$����3Q�/�I��w���\��0��5⎩�?b\
68�T���.����y�An���_�rA1LW-���UZyp�bC���szN��n] �K�'+z_�X�ٙ�3�nzRJ'���\U��t	�*�ӭ�-�&ۨg��������8z`Y����Z,�PbA0�]��g������x��e���8G�w����K*Z�ɂH��.x.�*��fXE	C���3\�T��u�'v�8�n�R�~}uwHaߝR5�S�N�OSr��,�~�\|x���u��*J����]�PγC�U[��� Nѕ���^x���4���dR�L���~2]�g�*>��f��g�i�S�G����1�E�����h}3��eۏ<��w������e旗(�UiP��r`�`J�1Y��eI굮<�M7rP&;#�U�NO^m�[�.�NC�I�nu�T��/ۄ���`��:�y�_t*��{J�l��5�(���T��Qki��Y1V���%���]�����6u}� ����Jk�[���1ڐ�%<t3]7��k��r��m��¹���X�{+����Lj7W`�9�P<A`�o:���5�}4�\t.�o�Xĺ-d闽��X�"i��Ռ���u��F�V	j�v����^�&�a��ZO+��>BG������N�E�ly�r�*/u"��IQά��u��N|?����F�2U��@���Nl��J>d.�.{��f��ϿK���Z��R����N�5���(��o%6(Q�����rpH+�X����1�9,fɃ"t.-����fP:,�</�!6�W��'˅�.J@� 	��iu�Y�?p��L�0��E7	�oT`��}�Lqn���Ckh��FEɷN���R�3Dӓ�M&%��|&�%գ�ha�-l�k }L��r��#�PO���b>�N��t��m֋�f��,V������f=YL����G>��ؤ��{xG��mK��!��uMNP��X�,���y���. �$�ͯ�d�R�<�_�u@���O,5��C����nYZp�`�Al���^��(
+��\����Ts!�|vZ��E�7�(+���]N�(��E�}�N�ֵ3�I�����vL��3��E2�0��|�׃@�v��F�5DB%�)t?�5l][d�a�J-7���s��!qY615�A�N:��_#n4���W��^+g_���c� y��r:׃���\��t<Z h���FX�xr3M��X�xyu�\��J6������S	�C*�"#uz�@gKÒ��J3����Mo�Wf	?�����=<������'	��ez�m�ޟ-'��Ηv�;Z���,>���t����~�q5~��W�d�a���>6K�]���R>A߮T��#J���S���K���T7H���,Z�g9�O��O[�����«�I�S+�������J-�r�!��88:Ɏs�����$�vH��(T��~}�?�7�T�[��% +��
���Mx�g�U/�W?*�^�gP|����y�_+�=_��m|9]��ǫ����I�Xϧ��ӛ�j:����Yx�JY�#4��2�7��B����Oa@=M[�F~����Ue��S!]@�$���Qqm�t�$�!��ly3zM4)��������|�K�{2�yHX����+�d�.w���+Q9sL�3����c��g��fZ��J��%J��	��!�ǳ�r��#���(ު�2��Eၶ
��Ω��U��q�i���
���������8� n6�yc�q��˾���$Q[<+�I�,c�Ɯ��i����^�f+wr���zޫ2e.GcѺ�o�v?�υ5Qo�[��nh�ѧ.kP�}׹���c�蝰+�|�H%;����z�ef�~�3�GJC�0�N	(���9D�?
z��''��4�裒�'��)�-[O��O�Ӽv��E�*�812-�Pn{�3�_=ZOR}��&�_Qk5%_D�Z}2Sd���˜R�z5nˠ$�i�CI;�ϴ�;������:�K���b��qZ��|�Ev�?�x�q���T"j���Ů���O%r�%��f_�\���sbO�f?�)�B��;�Y���B;���du���)yXU���S	Vd>
������Ҩ��Ij!��w<�ֈX��V�^;���`��~�8��>�y;����WwH��v�s�K��r�q�)�W���B��'ՠgԋ�Ms��xB���P?��Q��0e�OP��P��ǣ+_/�t�۔\5[~��M��%����#�^ڒ�<D;�:��; ���l<�,Ɠ�>��x�\@�a�$:��d���<�wLmQGI�-H獷��A���9ZQӝ�]�bS���Nqr�+P�r��
M�	 L��>���f�D�e�U*mX����(�[9��	(�9��G��7J�.�$���Q�N+U�Q5���QbШ>�'����:.�G_    ֽ|�M[�躺Ȕ�P�Y����U����[����c=EG<�)�~��<�����G�^J� ��c��X�N�$�5�T>q�j_���ǡ���T�F������b凡�{��s�5�AT�	�;���4 I^<]G&W�wH��A=�Y�oB�3?Di�V�o�}�\#��H�H�p����M4e�ר���d���!Z� �I���`|vY<RZ��q=�#Ux|b&�1������]Q�.tH�&�M���J�t�m�糺����		��>ēo�/�Y�#@Ե��D�f��gBO�s
��1���0^	̋���Ri^��i��i�_+Tޝ�Vʢ��&��4�66����P��3.�(`��$�͉�K>��7��CoP���8 ;j�o��R��:l�����D�����
_Rl]��
`�<q<[��M�=��>�r����yN�9�Ts.�D�1Gy�Ы��)��ww;�'�hl�-�q��y�k��Q�����?e�{x�*NF�.<���w�^�,���gK���j���3F����L y�_�S�$IJ�~A�Ș�OZ�&qϱ)���V	XNԁA(�ͩk�������fv�j!���'N� �L�K�g/�ݜ<����5�~3b�C��c���4̺�������F'��_��c�o�U0cu2�y�
p� CJ)�I���@8e����+�D�3��~�:�]� ��
������9�Ld�Ζ<ݫ�`;ʃ���\�b�aX�>�Eş 3ާ����d�&�ը��٬�h�~�Y�=�ɜ5^�׋��xMzP���i.����s��x�|��.�_��²�h�!� �W��r恤�H�6���Yj�K&1����==�TZ�!Qb��:��`�C5/��y�\5���2�|:o0����	�J�D�p�$��rլ^M�[��~M���G���ơ�g����qe�,��!�V/�a��p�����{��2d�E��9.�nek�ҵ���6��kL�!�2�4��>�V�(�˔��0��=0O�y��h<�qOO�� ��E�ɽr���HBR�l������ґ6&�J���z#oE�C%J�_��V�}����z���&8���ȣ�u�r7�&j��iI�����5��k�[O
��S,iTٔ�K�:����|3a�&>���)�#,|�����I�Qrz�e��5���8y���v�}���qτ�z����	#ZRJ�Ǡܧ��E��/�[�0�����*M�^4�~!a�[�)�ZV��c���F�j4�� ʔ/rA1��^�t�)��=��`�q����t24��>���+U�'j
Pq��A~�����\�F�	^wb���1�iM$��Z���B4{��:0��e�u���,�Q����y<�
�/7�9':.��N��}���Zg���O�D:�^uts\��7���[�g0��B����ִM����0�'W�ﹲ�*���Ǜu>}nEP��h����E�g�4�H���/AIͲ�R{�đ�z�g 񷮻E>��,�'S����˙&~*�Y��*	F)�g�>idV��x�-]�S���oW�GA[9�|;�,Qec9���$}�Լ2�p��Lr�ȯ|�Ln��]b�S���e�](��:^�.tc��MɼU�		����e�d,�ޟ�֋���E
\��~|{Bg���S��|S:�%��4���3muY-וr��:/�Jr.21��0�$��K�UV�����S>�ѹsW�5Xbi�f�qm_�7��D���P�b�v��w�}���,$Z^|�1��hYɹ�~��5`��,kE�S����cԝ-p��8g�&�z�����g/	�O�R�I�٠���%{�7훶��p�π2����F�m��6C���0��ŋ}�ôC#�6ȿ7 ��Su��ǡ�`H��M�v��Q�a+��9�i�z��v��������a���^��?�G��z1ZOn!���̨�As	���\�S�v��N;�5D��ߤ���às*e�z��_�/�N4g(�����L��#�E�NPQ��s�D�l<zc����=�=S4m.!�-�YB�Қ�P�j��i[���ԱI�:��>�)�S�C"Rڞi8���٨�ttF�R��oL��vK����<z��P � E��Jʣ����h�p�O�A�;��t����h��Y�s���m��x誘��;6J�:����H���٦��c���#'���ͤơ��s*W�sG:�k���}�Lv�uh'G���������H"c�-h�g���R��+	���~��H���Lo*|T�8��P�;/��G�.}\����j�L1ɎM���j�����N��nx=C�ڽCC+�.��%27n�u�MhZ4�.Y�ƺ��[B��h�^�4� ޳}�x�����7���t�m�e�fW��n�4��BbsV����W׿|�L�x'�V�,��G_�8�)ܧb$`��2���Ö�U�����Alpb^�[Q�uK��Q�7Yt�\��_��=S'	E��#B�=����I}�1���X�vA����p DDQ�������J�H0����O��{e%z�;��S ��X�q~P΢}NMcD����DQC� �}�����Dq��Q����8��Q�|`�522ṱ�Ν'7tӫ�$F����z��nUo�����V��B��ܫg�!�a�O��F+��1�Ҥ�Mzi79g�L,!���\i�=��\���	���qg\�Ǚ?�$x�ܸ[�d��{)R�����C�aU���j_-EB�m���b�.|�����
��P�G��T�_��^�����g�Zx8�C2�f@�����?ǲa�B#���5:��������.Cg_�'�0kr|Z�ηX}i���I���s`�H�&�?�eOo���)k��ŘH�01�����t:A�8��9��"��A��8���2d�����@��n&eZ���Lr�V�]�"<�qv!�2�v;e����z�a)uMǸ�R�ֺ������e��H3�2a���vl������my���Sd�@_�0|;��В��y��3s���U�(Ҍ�j�)���}0�ь�N֫I�tl �[�_�E���{2����7��L'��t��#���v*dN�#������~ pɄ����[F�6�s���(	R�c"��MAyyP+~��9����@Ӭ�L���gL*���ѭ�B:���AhZ�aVUK}#��U�=��wD��`�t�t��R�RT�b���Q~6g��˵�5p�`����@4�X��I�I��n��y�@}�*,�@4f.����&�R:�8�`�҃R�J�>�4��d��J'I�*�Q�p����<v��~�!|0I�~C����y���H�	����Q��{����w*�VV��h����ₗ�!�<F3��x�l���vXyѾ ��|�Q+�4�>PҤ��i�r売|�h��6bO��x��W��9��A�J�ￍ�ӫ���	��;'Gddߕ��z ]�{H4���k��v���`��I�a���j�~<��K3�L�B�J5 3ԅ��v��S��$2Pͨ��1�	i������x� Ȗ����$؎�`LƓ`<:�p=���q�����{nS��x�ӟ�7��h�^���'+�N�'w�9Q���K!�m:n��;�)'�vMK�>+Q�FZF��OaS�CX�Xg3׈uy|�:EЈ�8�8r���gR�¼Gy����L���ү�O*1��>��l�8�h�sV�`{qyL$�s�`$?��l�1<�9���j���4�AR&[�yV���>,�2����`��,��*��ʐ�k�FE]���v�<n�NR��>D�g��	X��l(���},\�w��vB�W�Nk��\��qumWΊ����(�.�4��t����B|������\�1[I�=X�Ӎn���` ���k��z��`��'��P���.L�N�#Xxsu��}�Ht��1��1/��'�f���:�CG�.    ����2���YPj8{���$by�[T��O�;���O@��c|���"���S#Z��.X3~�p����F	;�2142@?�[�ԋ��N���>Ad�1|���aI�Ou��t��,�y�3.�ބ;�cj��(��a�)����s��ع�=ˬ�0=F���Ý��kȡ�>l05�:9��Z=�,4'��`A/�cjj��M|`��&C%ef#���x�/m��w�4�Fy���׭	�Z��Q��(�6�F	��&�3�cxg̙��@��?�]у�GH춍)�&�)R�mpO�\�;�2����'%�����OKF{U&2��G���_T��VҾB��0;
S�꡼��J�¤���Q���v��e�=��+��	�&bFZ���t������l�Z���F.����/ǃ���x�j<�Y-֋Ŭ�G�/ԷfC�>>*ai�Ti�{��쮗ƅ�CQt'pv�^Sh��}%,ι���:���>8��#�$���[ ������P�hfx@�6_�d���J�n#�2��D�6�V�A2ㄜDۉ�M��
�ؗ����][T^~7�5�y��;|sp�� =fq��8�_�uL���$ǂ� c�g�L����@Z�I�a	v<��Gtn���h��������vg��aF���:�m�����h�ѭuR^�=:��O������wP� ��,wܧ�t�N��{��BBSfJ��{ L����{��DE��Ķ�O����"��	��i��I�Z7���J0��׮�s��gH��:�\o2Yєs���BóUo�S��Aqj��fGy:ȹ�-A���#-1�be���X�����*�)�ST�*]�]L���H�3�u���8;�*���Z ��ze$!��p�P���G*�;��*��B�lS���X�AS�7����������h4�*)n�7��`��i�G�Ir�~��J��m}��-z˧��&��9Ә$��C`Zߠ�\,��*������J���!S�@O�����в"��3�AΨ|�LT������I˔X�>����G�����[���k@7{�\��:���z�2�L q�Q��M��r�*�IS��/��.ѯ���W�Ԓ1��n�9gd�[X� �yMqx|���kd�c@����p�G��B��nn�#(f�1�h�n��Kf`YH�g��eF�i(^0���&�,�Y�5<ߟ����6g�uf�6n �p�u�^¨�l�M���@��˦�	Es��%�9�Fg�C䭹�!���k���V��Ejf({���\��z�ϷJc6����Q��9	Mi���\��%�M�{�D�:�$s
з8���"q�r[=��a7��)��3���=�� +t��8 ��'���S������LJ�A���t��(��1��'E=e!�G�1�|eȣ��@�D�1�SJ��r(��	'~��Uׄ/�=�W:D����	��Y�\�l� Y\�vvR]pR�M8X� �ٕNc�8#�bNH���O$rL>�α��Okga���$�AT�B`'�)&f6I5�ۧi��v[5̝$�h�ꎟm}V7�'�ʕC{���R��T�BLU���\/���]m��`����p=����f���6X춫`�٭>�'����v,�b2����#��>��,���	J(�U�5�
�����dSlo�B&�d,"7�n'K�P� V��&�Pi*}!a������S)���4����K�W 	KM%h���"�<)�ؿ�T�P`[|I�Xq���R��4سR*ц��ఇ�dm*�?/wc�ʰ΀�%�kc*ی�,O�nu�Q����7ӆ����c��[í��`�� ��M�6�M�3(�䭋ש��m��g彮�I��lِ�=N��7��5�/x5?%�9��<щ��>ß>(ե{�fs"}.1�b���Ϧ���V��WXɼ6�dV�Uԗ�yf��x�*4&C�C��ļ�|t�)v��Ӑ��k_�;�PyJ�nRP�ުh
��@$=�Z�r��X9ɦ}��H�Iz_@���%�e�`�Ur}f�t{�Dy=�����X���ֹ��b1�k�ʛ��W�Q�|p�xxd�Ԏ7�r�@iσu�,�/���Z��`�gOH�L^�0�5Y�ƃF&�)����a�_7�khZ�.6y����罊¡�L��6�^vPb������X�@��P.����#��"j9�0ꄝ���?�Y�t2�٤�\`�Se�z�El�u�@y�v�Wi�~q/"?�Wrb$�ἡ���&�8�iOx�/�Y�r�8���
�� :Bc80����K�n|�;��)�W�[8�����#z��By�	[R�F;*p��2N�$�. �{f[�
NE�y���Mnh6���#M�d�$�(Z�h�T�W#�?u�=�Q�kC��h0���O^��7��l����H�d��?���(C7���%^ �WK/�5b(��!�>D�'��ñ�vW��|��7kPV:����GԼ���,W����=��V�	��'�~���9w�����8B�y�L���VH_�?刴�;fv�
��9x&X��8�p!��	*��z��-u���B8��*:����^�< 9�)�c^UT��jD�"볲�/Χ�eZ	N��i(�2Q�d�5(+�Sը���z�Z���ש���h�j���,����~�[MW�E�����2Г��C_����d�K���yW�� ^ƭ�i�@mW��,4�p����4
�	���4DC�9g� �'��4A/��=�(�X��T���"Ļ��Dy�R�4A�����%�D��l��!J��lPv��1����!�����y�=�Ez��Cؤ!L�b�Z��5�U���y���p~�����aѕ�Kl��$��!�>+
q��}��S�߰F88�=i^Ibg�������,(2�^�������A �L~�j��z�"~�6e�r�S���|���|��=�z<�O���A�L=�P*K܆��b��3ܢNp~
����B�io�#c����.؄�f����F��r6Q��t�du9��H���g�x�9�Ǔ���p>}Q�o���l�vOg�&h7�ȋI���-�,\�~��Nt̰=�TO��c�����i\<v%Ry��FB���z��OQ���_��	TX�@�[�|<ҤA� �p3�䄋t����4�4H��
\x���� �b8��{������� �`{�5*�\ԉd��10�r��rpTZ�=���mJ!I��>+c������`
�,ݢs�L�}��C~|��@���i�
j��K ͤ�*p��DP�ٜ��XJc�p9�Qi:x����@�g+:>	�o͖_ɦ;�	�7	W�-,aO��9E'>�}��� ^<��L^���r<�Ǯ�iPA����Bj��`���G ��0��E��h|�zgS�����Bp�,�A�Ak�5��;s���4�z�@\�gɫG�0X J��_tJ��T�^���u��z$P�8X�r׀b^�3�O-\�f��޶��_{�
����؜���iZcu�}xQ�T�  P���o�����&,^M�\�&�������o��էߔ����q�N�櫁�mP��=u�P[���"Ee]�$���]���!�3�'7�]p��4�u��O���j���1
�J�M��z1Z�V 0LrX<g��|����9V&���^��������
�&�a"[�p�!���jO���p<�t�x�JE_0�{:i���_����r0[�˼#�����6����"w�.�7�:-���=º;�p����>�t�-D'Xq�7��27����X�j���	>I$oՓ���z����ü6����W@��	|]5EW���#��f�#!jW] �ug�n$L�gL����O�����|Ю��0x9/���p|)z�&�����?\~�{��_p�E�YM�������<��^ض��qHĢ�ʒ	����r$V{s��T��5a�F��"�>������y҃вv���H���M[���qJi��    �Nt?��_h��R������.��(yT/^����$am��N~~��﷿�E��U�)T<��\���kWkש��)%<���~~b��iF-`?s�Z�+!yN��~#��y5�5@٥�����6YO�``��_ N<	�J�$]Iy~@���������}d�ug){.݇-`|�L��P�SI��)8��S��r=_!珠����_�_M�&��L���G.��>�^���Sn�fdƼ���'[&UY+�E�IP��
��Í�L�?"i>W����O�!I��pw�I�@)UJ��@���/J�)0�Cc����`�Y#�<]nY��L�_��W����+]�?{sD́�F�����/��O��,��G����2�|�S©Ԇ����@EDS!�X�$X<ܵ�����ε<#�F��"�%�ihkA�(�g4`Ydl=[��I��D�U]��P#*ϭ�Lc��&�1����E�B����y;\n���n�_�תrw\i�V�4��O[w��Ìv������P�>]�?�qt��D�rep���E��O;����>���[E���<u�`AC٠?Λ7�sf��d�5'�eAQDY�T(<U��)*=	�O�e�%j&
�9M���t����)��m��m��?$�6�%��Z��KH|t�AEM�ԝ6~5^���n���z�����p&��MQu:����"c-kSE4="�	?g� 8o$�7)&],�"�7�	�qG���1�s��I�)�k�>�W���z����q��6\��G_dֈk��=��gQV������K�+�'�ք� yg�-��uݮ��:y"\�!Bk�>�����"Ah�ډp�{lk���<�$5L�Dңѽw��&�G��ƅM U��ܛ��C���,�t Kh�e���x�q���S��`;1�l�z�&@�^B'f[d\�J`���Λ&a:(��&I�.7�XnǡSa�t}�6
N��0=-�� ���r��x�B̧�n����Ն�jU�+M���_͉L�LQ<�)ө�B�h����V�W��0=���0��-U)J�1+y�I��.���4���-�%s��4V�w��>^�g�qۏ<nW:�����g�BaOz��x�%3UȆ�A;�U'���!A���<�\�� *�0-@�)�2��F�x���x�Tv�QA��J3�oS�6����9r�^P\ %\�9'/>J�?��ް��9��Q�[�D����;c����a��@�`p�fM�a���eB/li䎍�h�'1��= ��jP�~�Fck�����N]�h����5e�5�\SZ�:�5&��U8�,f�zL��9@c��iP˖f�Y�tw��#.�F�:]D�����P��up{���op��o2��r�D��=8��fհ�xz�� ])�m������[nL?eN�����yefp�T�Z:�vm�&�l%�H�c� O�,������ߣ���v�?	'�JG>�\��+�	�иCx�TO�-;��i�ٲ���R!,T���� /��|���~�;�7�g��tE�@�m2�LN��Tf3��
J΁�r�aq�!�����0d�FBf�c�5]ZE�[�ɏX�9��P�!-,%��m&�Z� t
ĵ.
�٢�m��9*�g�t�֋�d1�-����r�C?��.1]�-oF��d1m���3���g�/�G���m��k��j��ip|�T��vg�)�����n�ui��Ⱍ�T��c��-��0I���� *3�~��s��A���!y�5Zɰ�Q^��r��%M�񫪯x�k�%L6�����@�:�T�<7'=��e�����*E���Ě����h�P9��m/��I�[*s�%j�]�7���
�FY \�4p[��@Q�������j.K���$�o9
�@���r׆�5�n���/�v�vT�=!F�bA��b�~ٱ���@�I�h�8��d��Q���F��p�#;>V�������f�@���=ޔz�`MwI/��w�uC�����Ny���9���礒CEl�}��ɏPW�e�A�#K��o����&�����#T�w���|L����#�wbl���M���O����3��f�AI�F��5�C<���POg�;��j�F�4�FJpx�6u10��� +��(�k���9*���!սW\)/�77�t��x4b��N����|1Y��ċ7Xm����!�8@߱��5�9�<g�A�D1J�R���x��"����m�-��3[Ia$5�XLC$`�s�91���c|�=��Ce�/O�)�yX�?��5}��B�{���Xk�u��Θy�a����3
`�����J�M�o�v�gĝ0�o�6_�s�gG��Q_ڵ˵�-n�2� �<��O�)N�D�2Dָx;	ڧW�O)]�����;F��0m���h�	��v>�2QZ=�V��dnY��hTF�kW�W0].�f4z@w~[\�i`�.0�CJ=CƦ�;U�Y`W5HWě���T�
ٓ譮~lf�5�W���˱� %�x@G4�6n���\^K�O,�[St��A��Ţ���P�T�\�ْO��[�&�ǓI�P��r2]�GФ�{���,�l޻=`^C�Iˏ�8��!� �0?oq\�yr-TH��z�$f���%�Q�&}g���8;?���c�uW���8]�	!�N���)#quaz�C,E@L��&�Xg?׊k�,{�_Z�~�G�!�!�8L#
;ĥa����?��6M'6�ƻ�(+؞�&� �c�膸^f�^4#.��޿(�g�e۩��j�����s�$��,J2Z}�]t}�ϙn�t�@t*XV[���ho�)&1���!���_�G�\@����
����R6p� M���'߆	l��g���ԣmJ��{4|]��O]H�_�%�_��^��9�cJ-��*�l�u�����L;���C�_��&�*s���z��V(��I��A�D��?H�³s�Wo�6����h���M ��?�z����C�\�J��;͊$+;�̒L�V_)sq*��V��ʈ�� ��B�M�C־8*C��4G����AkS�[�7q8�GV����P�W���5�T&��l4.��n�S�L櫶y��Aq����c��?p�U'��A��g���h����T�tv����������
M�E%|X�d~�7�=����%R���j/�:�����*5��S=T<�gހ�_�5���Y@��`B�)M0m�rd�<��p+��N��S�2M�gS%��_�	���#>��4๊ff�,t^�~���e{U��S���ƺ@c�N`='"�T�/�w����x�
X]T聣Uω.֘+���q�E=��uQ���bH(̓���T�~�����k��NS��eV� �#�#js0����<�����dr/3|ߢ}���ל�` )hW��fx8��:-qT|}	����D}�?�es�j�m���ŔC��w���dCD[c�x|
�H�zGG�����M���q�vBS���ʹ�Twl�~ص9+���s���MxL_K��X��[��!�D���N_�OnYY_弩�37�H0�bǔ��.LQi�^���)]<(<�����p��>� �-���r`a�D �Ժz���#7L�=�~��)��*I?�8|�v��_Ҫ�LX'&/u�Tソ��v���jme��۝�.�S���n�n���W��$��a����b}���	
T��ʯMI��h6ZM��f��d2�Ϡ�|���F��Q�!g>~5[�,���L���#���Y����.����1}L�N��ɼ�]��~#ǇjN�ƗOn֣5��M?�/;��)rX"�W{{˽��T!o �y��LE��2�1��'0�4��	.��(a��=�G�k�@ҝ��hD!�HƙV�{��	� A*�*J�7�F�� nk�YLG�n��-�WoKn�V�ECr�~���9ȡ��d�?�˷��z�kH1    �A�yG���c�j�ͦu���{b~L1����$����$�L� ���G��q�������l�vi�l��Cd�1O�Qj��ķލ�w�p�O�~�
�4�Y�aw��f�^��t�W��11u��,�K��1�����+��:JK�is���%�n�m��ۯ��=��*{�1<�@��+;����jI�,�o����8ⓐ�4.��t�Hxd �wO��@�|����i����h ��9��\`�by9��Ϟ+}�x��-�qPp�;��)+j�vnRh'*rW�s���7��q��&o�)�;�w��󓟂�5�a&�c3M�u
�����9���<i�ӣ!�Y�V�[I�J��u�3�U'���j�`L��ӽ�=F��Yi��,�]�Z���3�}�<��e�
n���߭��A���~&���i)�ᝫ���m)A8;�Y�p��s0*.���8+����sb�6�'E~�md.T���'�R�����,]�2�H�0��S�~o�POz�!��7�@3e�K��Am!@2���c�<��((�y�m�i4t�����ˇ�Fki�\���3l�����2�11�3%��c������3�#;z���qbf�>'ĳ�ec!�'CNϵ�2�j�l��̠9 c��c�(���dM�je
��H�9���P����w,�~a��c�Y���W���Թ�Շq�A	e��'�֊]jtF�L��-M���0������V=7;_��\���ȩ������ᇏCi�_�>��~~�Sk��b65?���K����{�g4~��ٸ� �ֲ�� ��:����2��_�cJ#��f��c����\5;���.�݉�fP����]h}�;_*� �~��\���T�� }�YYʕ�gf㬍�C��uC��p�׵�8
��_
�i���g��݃�/88��8n�"��y��9�PoS�X��<6C�qEİ����"Ȋ:�	@f�o��n��mt��f��'����*wP��n,~�`� %�أm%OR��b#�ȟ�'�d��B�Gj�����JX���< ������m���o�<�S~&b���X�fŏ�7�<UU�>�Y����,)��!���0טA�iq�5����T�X����!|�f�+C���A�00B>�Éb�i�P���R���2/����M����ҔP'S�L_�6x4O���h�=ua�V��r�X@��I��O��"��A�d�j�|5_ߌ'��j���~S�&��r:MWvH��O�����(��}J�C�S8�r�j�lr?<�鉦pv�[���J�������n=��u�{���c�P���#�!K(P6'���\	4�$Ȋ)G/r��Tm{Sͱ�i�e�E���e!.�7+]�xz�S����J����6��������F�5|
7�a���1q�1?GרT=��	*OM��;$��Jz֯�'Pԏ��Q��}X�X9AQ�.R�"?c�x͋�)c%���*��$2W�b���}�g:��X� .�d�^�L���2�����~z�tV"�o�G:��IF&�f�R�~�諘M��@a$gX�ӡ�錕MAge�/E���/��ba4�E�!o �u��p&ٸ��c�E���.|�zP�7d��W�`�#u�������p'�>Z��
A�@��"!���˱�Sc(n2�Jo��2���p+0��M�B��.��$�ڮ��]h����f¼�5���pE��?v�̌ ;��W:f��|p���/���7 ľLR�;�-���5��=�E6�����W�e���1�W{ ���i+f��|ҰS����C�/�0ȁ�6�R��~aP��;������P�4����r�Z�m����z<��>�c��#��_����:šn�^.=�3ڨ�&��[�+�Z�?�ͅx�-��L�:]O���&،g��z�
���>�Ow�dn�>1ǧ(9^�b^��-��H����'�3����G��P�Q���b>�L�+�Z�l�n�0��쥉������w�#"� O���n~E��$c9��݌��K�r�?�'��l�Lz��}����U�j�{Ȉ�E�^!Kj���6'��xz��皫~�Y�v/_�������M�x��v���]�B��U	�l0]�Y�S97��"nK�@� ����ˢG]i`v:���5|"`[@Sfg�'�=:"�<Y��2Es6_.�����ڹ�F�Ey���#�!�zC��y��}��w2��=�T�"%�q�"f���s��([�E�O�$j�p>U��D�&
�(G�����9oO��~�>g�M��]�i��t��	�����k�^�-��!�|�\S<B���X(��b0���?�NrӓA�Dzu> V�ͮ�;��y��b�m���YXp�~�c�y��@f(D^�'L����Ow8��l5�t�X����*�,�n����#��t嬓��}���1��w���LI�.�B��MX<�a�ʔ�k��/�������4G@��r��n��_�y��	Mu��R�7��l�PMw���@�N�-s�!��2�s����Z=�.����E��v�p0���*|u���ݽ�ϛ����N����i��ۜѣ��]K$���ņİ�J5�-���t\KC��0=���M�z^��y�E|y�J𢫍�-y��T]�(>7ԽLVA��+�aj#�[5���gCnJgD4�t�hL;�;^D@N��P���^��p�4c �|q�z�������&M y�\����x>Z�t /���Hy'�7�x�O��R��l�j<��׋ɴ�G��w����>aw���k���Ͳ�kJYi��y�gc�"ᅒ�qXĚ��T��5;��/8��
���}��G1��7����8��x��Ζ�9T��,���a������f�Z�'��0�����ϟ����Qk�e�C$��<�����<�uo�$����6L�M��h��<>!����W���=�u��k�R �ߤ�g���Ve�cX���7!`9 �ki���n���9)QZ\N�������vH޿�#������C��"mH�ܧ����ݎr�BJ��qD�i\��릵���Q����GXN��s��t1���^{�������MJK��u*[}��R�?���m���?M]�����vmT��<���d�y�]�*���j�Z��b�����FW���Aպ�\�Q}��K��O�d���Ȧ]w��.T��0�/J"��G����qnP0wY*A�3�1mhU���j��&�1�|E��T+�h5-��j�\���b1��ؗ����`<~5����nf��|:�	�V/�XM��<��F��?#%��(,�_\ZP��C��u��!0&JQv��ry�69	j�,|�~��pZ�Kw�S�p�]�nU�~�2�:��j<[Lԑ+���z5��c� ��QS�����?��|o����3c[��䒽���G�'��!�BK�IO���7�o=�E�}Y��V�e�d=��Z��!4S#���/�P����%���Ɛ��!��<_�?�7�Z�m�;��?���������/�Ϫ7t�wr�P�/W����WvFh�]�e��v�O��� �)p����U}ea1Z��SdP;�gx=�H�@ƃ�Pθπ��N��(*>M��~2�Lh�OrW�e8�O��WG��!bsɺ��d����y���T�N�;MP&�gNuL]QB2����:Q}h�\H�s2�a��v�gm�Í:��!�Ð�����3����z��/j�^�u��ԍ�c�¨$���s�w�����&�3pS�Jn��)�R6T����ך*�����txv�&>����z��"R����E�T�s�w��|�rn���ZL��οE�)^X���K<���=�C�:�,�����R��0Dʀ�$١('E\���fqd��M������)�5��K�t>���U�����p=�U8����p�ς�h:
F�ϓ�h���C\^���|i|��.�n`�$Qק���)6T�4�k\SG����&��IϢ��+�//36��#ac����ٚ�S��}�d6�`�    ;�?�$�4<��=�*�+�pG2+o���+���"t�s��O��杔���|�l����W"�4WNǽҗ���Ջ��|:���|�4����U{�����=�c�M7��|�z�j?�#(�����7���6A�g/H�b2�@�X=4I�`��;�	��d��� ���r�^�z��n���PN�?��L4���>�;J�G����F����$]� ��`:K]�m�j�e��~�V6Z��L�W����1M!������P=�>$z�+;����T3J���D�3c(��\feq���E��( �L>G��duO����v�l��P����`�Z�h7�TX/ƀ�]��]���z��\��o�&;#���?�r�,7��z=�����Y�����fu�t�:�S:�ڒ�5�<��9`�{A%���TkT(���;-EzVB̳i���D�uD����������JanK���٣�.�!���v߬��tS(s���O����	�'�@��[�UHw�ǩ'��#Ȁ,��$��� �-��.4�.�r�^�J�|k9�l��N�+���K�(�<dv���#�]�NR���%�gʙ*�?{E���H�N�=�_��d���z��*{�	��>$G���좥��������	ew�n�s�l9}�'<������M"QMږ��؎E�b1�]1$�]��߱��>n�TJ}G�J/��tY�j�wm`徖��^�x2O�������p����=��rl+E��A�U�o0�(�5"+���>"��ۚpӉpB�]8{A�����*B�����^%S� 7��\�cC�5R��璱�T��Q��;]P�r����K��)��܋�50�ˤ�뽤�-s�w�rJL����� ���L�j<��)SCDh4���p�m8���gp�f�e��Ҳ�c��J]a��|�N�my3T��kIsD(ܟ2Ǆ<�8<E������u�su�F�|�XMg��螸n#����!�tk��r��N�~��㧧�u"�Ra��3��P	[y <�B�X�r",:�kj ��b7�w:@K6�z&W����kyL��|��iqÿ3��.:*L�]G�[2��?�2|>����6�����I�n��>�z����UC����:M�5s�˙xX�P�W'���GGe�	�i��%�nY�ŚN�R�.4�cM�ϣ|�.uo�������G�"���#_U�,�3y�`��WݹkH6�H��2��ݣ&^T�yk�j#�R�n��#�����u�\dd�i���P}i���k$F��H3�Cn,=�v/���q?E��Š����6���j�^�Y�e`f\�2y��e�Y5[	��RB�Rv�ø��]U�Y�^ˏ��Y��������&G���V��g8��#L�-� 51�$��ىZ�(���l������W�/�Z��ʭ/����@�@�:IlL�~�{N��{�?z3�Qs���[p|�2҅֫�m���{As~��L��Y����J�년�T_��m�tH�.�<*Ξ�߱q�3��_��6J�#�ԓ�N��Oۆ��W��HH��jr׺� ��8b�W���KO0�� \Z)���Z�
<
���vhh6�7*r�c����>K�*�4��Bv������H���/�<Bk*J�f��c����!�!țF`��d\d^�
�=$�? J�[��?c��1������	�u@R��u�Z2�$��,�:o9Mۂ�`>JЉ�z��+&�e�3��8�������y�T���\Q���T�u�r:�w�٠O��e�Q�,`L<�&6m��-���2F��C��������\ox�:�5�����0�ao���,1�{�$�/̪dc�e�%�E7jQ=�3�1N�͠�.��N�Av��wH�ڜ����ń�3<�B̂U r50�H���:}X �͠���c1S�5 q�8=�6��F;<�+��	��ۯ��h�ZΧ0��t�	mV�����ɫ��f�^��	�Ώ��t����v����dj�"td�2�M� �1�xu&��m�i���4�V�f��,I+�ߛ��{OA�K��i2��k�,��h�S�x�h\�]��5���ƽd稘�������F�	*]ru�2�b�S��2`�!�+ON1[$}���'�����E�[��������HO��<`�h�we�Be)�"KLF��;��2�QV6-�,�'�?���UD���щW}j6^Gqu��3��4ϱ{���6��Gy�a���f54 :��Z��l_�`��Apm�����x��:Z� ����2�NnL��:S���A�G[3�A��f�Ԏc�G��7�3��#J�1+�0� )
7ζ���ZM������_e�VEC
�u@�����8���f�*h�qHO@��^W圝2����׽��K��|M[���YU�����:Q�G0���z)N��A.��^˃�jo���"���L�>	+(%� �)�is�n��Mr8��*{�`�x��"�y//�N�����_�j�mN��(@w�=��wo1F<��3�B/�2�7�=q�>���j��4hܦ�������j���%�A�b����j<^NgTo��ZO��e��LI���(�Wͧ�f��b����#�l5�����o�ޫ�� �� ;	�q��;t�T�?����1d�D]���V)@��.�)��cJԄɹ�"�1��a�� ���l�X�`+i1��*�\"�����tz�\ϗ����S7��f��t�g��(~|H�v�H'�V�>���&���'|�<�;��H��>uVY� �E��T�	���lՠn��׀^x0{���Y�Δ���xR����sag��|�TF�����4��ͺ�n_��*��l�Sa�n��9'\) EQv50��d��/c���g2~��LŜr�D	�0������s=_��nӧC�'�χb�6�§����?��[�25w���4X^ȑ�/o�SM�5��� F�Z�B����'2.�����D�NJ�Ȁ�n�*	�U�_,'�����Oʣ?��!j�p6\��4�n����Y�!���G��N�� ��Ik��#J;�	���&�ʨ̓6�͜p d�u�I����^���F9��#�]�Zէ��h����a�(O��}��'�
��=���� K���(��D\�ĕ����%����6���4������ǳU��k���G��&B�7LZ����z1k��׆����O�Ў���i��<��,��s�8�z���`� ����7��ʌꈒcA���Vɽ���?�4L �Unb��Z	� ھ׈��MpP{�����LfX?�X��h,�܉���m:AN��fIHt�_�+�E�B�'K�-U�M��`���/�T~sΟ�*�C�d*ɕ�E����[�+�.y�?	�����`��){fg?,5��1:ڦ�fI�i1aXE
#��l�KGEm+u����/��i�Z���r���o��t��x4�UC�6��b���˄�Ώt�Z\�Q� �QW8[���`/9 p�s��?0}�f�A�`xݫ�C(�BP����!ڙ��B��ÿ���Tm��!����N�p��l����)�7Y�Z���o�*B-�~�7|[O�3�-ys����lCY ���|�_�����V����f�EBxY=�V�3��j����gg�H�.����R>��-���M%�ʦ����@�&d���C9��)H�L�_|�rά+�74S��:�޻���f�H����~nV��l�L���d������$�D���E���i��N��|�f� *rMfن2�
),7��7*N
�@����1�u���)#���-E���b+B*p5����B*���x1q5x�#�ߩK�௔S^�ne1 ╣�6����I0�GB��b;�g�,�%L�
=�L�Fb���pk�)_��a��P����%A����nF+=n�C]�����?f>��KP`����c��΂qω�j`��f)�ARS=��:� i��    �)�I��N�j���T�Ɗ�E����"���N/Y0>����9�����6�S��V�^v3�_�L��5&�����¡ZgH&{����|>�L���8����h����]0��x��Χ��nz���&x���m)�;R�j2���ͺ������F�U݅[��IQM����Ź���8NJH7`��!x�Ѫ��V�#8��#�c�Sif��=�>S�J[ �U�3a�g��~s�r�k�ۜ�E���VSb��A�	��s��z=qvn��=gg�4��bj.κ�O�Sł8V�Z8�i�`�b��OD�R�N]���6y�k̛j6�(���e��Ǳ�: �
Y�ܶy�{$܋F��5��2yYȥI1�Dp�� E�s�K��}��0�����VI���rbҾ�e�w��qK��� %G��I�$����T�}��KW?W�"'�t܀���]�����y���8��D��=u:�'e ������GW߇�F���	�o�Q�r�8�ݠn)�\�&�/s�F�%\i<��d)nbHkˎ�GK�;��������[J���x2[���g<����at��LWS�zm����b{�+��+�9��hYتZ���Wǡ��3�!4���x��BN�o��=�JՂ�C��"�H]gx����l�b�%6�g�W��p��C8� r�'a�&�R�e�Mf�+,�BUPo�G�=]"l��9��iK%��@� H��`��UQ�K�:�r6��E����uz��j��V���w�ǣ�|�/����/�������(�ߛߞ�~�<���~}������������|=��A<)��Kpxz8�{�1���/��ֹ�0���S6VیQ�n���ֺ��R|	���Ce�
����O�S���9����b�h!e���6�ǐ�[.���p1�|Q�ϋ19	�Vd��v�_� �z��̓�H�?�D2KK�1�T7��N�Lc������cp��M?�,�h�	3�EW���uH�lq\�9�o��_�V8�P��l1Ϧ�ռ�����::��Y��P�*�eo��qłċ".�'��jя@5=Me@W�z.w���Y�
�Z)O}��q�>����V��b7�����w!V����-���(����h�e5�ù���r�c������=�<��
h�U����I"�ﷅvZ�餕�q�n��Q���!EcN��: 6���0�� Q��K������$	���y�i�H|Q�?�P,�H�'���yR��R�여L�=���o�v�@;��p=�Bƨ��Sf� @�aF�b
l.��\���U�A�Ⴣ��<b�_�ѥ4I5����3�vC��C������|�Χ������%z�!h&���飃����J~�
���\���93��Om�)�p��.�nEg�?��a���~)� �v��8�����3Y�0���~c�>}N��G�+'�/J�S/��@Pn��a9&Y�w)���ڢV}܅H~)�v�Qi�Z����
,Q�Ml}��}�G���Z�A�y�­O�����[/�\���f}O�|��-��I����9�~O2��܍h[(@�ס�۬'i�%�w���D��XFztI-���9�t�o�?�Y?���j�͒����4{hn��\��ߡ% �a͎�*�~����Ԏq����}^-����pۘ�
x�'�	�k,=!wȸI�h��~^������k�M��6�u��姨�vwD��8韪4X�Җ�J��9qv(@$�"	 �T�կяp���}��� �L��}��L s��5|�[Z��o�EJ'��{��xr�+8��]�K�o����Yp3֧>
A�8�ӕ�\���ﶳ���=Χջ��5��{��V�M�`�J�
��B�g���27�B�y.p˳!����y�ն��l@[*n�����E�=���4��L�M�7?�|Y�=@7��f.�c�2���[Q��!�/���E{>�p1�/� �h�y��
���"�<�G"����݋F�}�S���Zy�"`���v��er���������N�t�QӖ"���+�t3���E��7�Z��Tڭ�"��	���iZ�ȗD0�0S�̒0{5�y� O���&@�r��㠏�g ��v�*]����VS|߿=y��P��:�H*���m�������Ȋ�]WM�u�k��3�d^�/N�u����a1�t��Ԧ�0Þ�O�_:��x�W�I�����.~ϙ��wDЂ�g��Z�o�Gg��X�����3(�P�Zò[��75�{X��-�k��I�9&B������D2�X�7�&h&l��{��3-,�T�\�����w+,�Y��t��h����}&4{�2eF,�gGF��h?AU3����57+n�j���R����E�sݙL����ox��Z"�����+�Ă�U�R���|/�l��[�Eb`�ϊ+_�N�=ˌD�Ov���Ho��/u�/��	/?�k��D�
L�
��T����s@e[�����#	�9���<�nie+.yc�	�W�ά���K5��VŨ���J�)s�r~�/ȧ
/���ޒif���X���T��Y��Bm�,d��IUؐQ��rL�W��x>����.v�t=���Y'�l&�0��s�M;ȇ�y���aN$��z�s�,�|1B ��_�6�����ȫTeN��&G՘���%���|MXa���Y.�1����(���=0�*c�J��>m0��瓑34T���x����4����z{r�� g�����3W�G������yw�5C����z,�ӄx����+��Y6�,��D�{Zϟ���Z�!KT^%R����A6�N6�[���I�! 1&������P�_���šT�9~D��^b\�V�/�XVz��AU�CGH�Ւ������7�G�6o�M:�z�N�z��L�UF� 3�&�9���10��Y��z�%[5��'�o��2�Yp%��*�)UZ���z;�S�$�:��/=$����|!!��$�E /�ψ���nj�v5*�w٥�(p�(I��V�C�m�H8Ŧˍ)~u;�)�^M$5.����1��_^����"u�?�1#���LY#�V^^K�I��7����L!����p�� P5��
㾄�x��3N��%'�1�YW�u�|�S5����P��2b*'4�R��6� :�Ļ��a:a�|O2c�|ζ{/� ��4���f�#��t^����z���	�]��1�!X��A�
��#G���)�V�����G��%q��KnY.k��%���٣�-WHRaL�%x4@�k�fB���H�&�EJ��Y��@嶔�
�aa�Mɗ(�m�HX�~�V��0�OU@�	c�D��&��}`�`�,/�i�i<V�I�p<o24�/�f�ډ��4�!6MS��ϩZ.E���ā�=��s�IN��lԸ�n|�D�"Ql��bqbi�QfBo�� �͘��j�7�']�{�q�9t�uBW�e��"�*��d<�O}��)<ޡ�L��иh�^�q�0����^G�./Tr��X8pi��a�w�	3��y	�u��U,}��nX���:���R�y����.M��K�@��ғ�z�RZo�Lj��~�!/�\��R���W����G*:Y�n��x���!�g��y�e�#X�Ǥ������c��趘@++sH��P�m��0��S>�
��k�j��r�Q7�ȡ	⋦�RPK����6^`��UZ;+�yCpy�E����TJg�K0����	�S�r��ozsH����g�{:S�TQE>Ů��L=���:�8�vV�M�s��M��z�N��1:DԲ�כ�(����y���9V�;rU��A�����y�-����{'k�ǁZ�nI��PMm��L�t����'�{�D��#���6Ԥ����q.��9���iz ~�`=�[QQ&�OO��pp�>�.h��rF]4��&1�0M����a흵N��	���f;/���A<�ǧ>2�E����0����ƈ��A�����fV��W��|�7!S    I�~���5Y��6�-��b�@П����DH����9�HGb�q|=�G�*͓�Q�i�%����:�w�E���&�~E����/hp�n�ᛣu9�˩v��A�mfpX��K�!�=l�g�0-����}|y��[�p��U�벐��LҌ��b�S��87���xx"�a�GB�,6<6|C>&>��uTݦ�d���cgEcJ!���Ng�7�Q�2�L�~�.����3�b�@֬4�gN�c]SP)��P���8_�.G����.xK=�S.P�=�{{�v,SZK��T��ǂ�檉'�%H7�Zy4��7j�d�`�I���T�P��r;��橘��:6���A� #�T�Yԏo��M�f�ֹr����><o��"[��*4�MW�{��IS	O�VA�R0�YGe��ڽ
�|N��x�t�kD�'��5�>"(u��[C>�{��*�s:��ȹ��#�}�{��E8�{P`�)�K�3��F����
p��%���ug��C����4����z�.`�z�Z�	j���Q���6H�Ta���HȖ�u���ٰ�7p;�E�Dr��3�:R����B���[Ñ�^����2gW�� �� R�����!EFT�r����*��G�-+���p6��*R��t1��S�@Vn*j��V7��Rz��잆
pi�Q��`DN-��� �Z��kSZT1o�준%���]bǴ�ਗ਼=�y�%܌[N@���&w���"Ԋ���<��L����	Â0��̈́4���F��ei��V�2KJ,�^�h""�s�K*�;u/��nw��Ӊ*�8�Nz�����Wq��3y�����`��($B�+��N2�߂��?��M8�}�O7<��R���S�aC���1��E~ �,�j�4���ag�Z�_��g��<˶��kC�X��&GV�n����7�7�Y�6�{(ȱ�׉�R�U�#�ڟ�:�$R6�#�j�����k
r�)F��s�p�$�)t����b����yk��4�%�,@��^�9��KD*s�Yg}�����lw�����k�X+��
l-����L����(KS�� V���1��R�L��V�v������0vЄ�ɑ0&6?�@�ȧj���-�Z6��(�
�� ��
�!���86l�og�x�a�O�vu�2-.y�A`��W9�r�I`�Ĝ�vĆ�f�eL�6uDI>D0$r�S�\���0�(���j8��Q%c�|2�{&���;v��u���8���j[� )�?����5�����q�`���K헺ѴU�����F��w��N�ի��)�5�9]G����7�6 �8���j�a��-�; �{ŅEO����A��힌�� k�ߐ)��Ȇa�K�)�{8<��29�=���V�{�Nd��rK��^4��h�7�c��5?ߴ�em�l�'Gh[bl�����{U�˜���7�&�t������� ,9�ԧ�E�2#fq��ԽW��|����F���Maf�3?Poυ�j�D�'�b>ЎV@���>n��
1x��D�\��u�z�ci�Tln!^c�T¦���Ű_in�:Wc���fk\�1؉Exu�����F���,X�exG�z���cc�!��-���	#+���iJ]e'Ĕ:�$3��k ����)�L�������e>_�쪬C&�#.�7m��.y\㚬�4r[��L�s�f�4���1�*B�q	�[�vs߀.fn!�Ih��ũC]o��rKav���K���@��yE9/Бj�&֫U��\t���+����ʇ�u�f�P��a���5��M`��s.P�/E����"�b��O#��q�JЕ��nY8I�ı��N:���g��#�X&Sn���Je�[��x�è��j�g^�`�;B�Rak5sڛ��tBb`�ޒ8�.���#�;l�?����93K> #E	>���w�U8�Kة�_���F��&�	�NE{ŭ&�;��?۳|�A��v�6���)ǈ4@
����K������T0���M.�"j��ܠYᛏ���]l,��aaz��28-�4'pcmh��o��%Y,0��X��	�/^8x�CV�$'�~/�Qo��˅�t�Ox}�~��b�Z�����Ha����j1��m�
jxN+b(�Y��n����)��ko���W�9��Y��� ��2A
����v$��]I}�@r�v�c?p�e�%�(ۖ���,xX�������ۄ�ڷpq��z�
���=d��(�v�������Ђڔc$�!���,W�q���%��䒴�^�<�c���N�׸9�
ah�"˱���T�ܜ2D2b�$��G���4_a����p,1ق���6���^��H�s�3�Z��1�B���4���ci���D�}�y��{Cpw�қ��#�?�Rށ�F����ߝQݭ�M��r�~F���l�}t����u7_��d2���(Y��(�%�h���h����tПO����ά���$I��y0���~w:�$��,�V�y:��v��N����,#7L�>�#-��WdW�,G�Ke�,��J9�<�Ma6�Uя��S��jƐ\d3�.�>���fS�׏�g:PE���d5am����1F���.En��a��!�����j�PΟS6$bP�mv��t�[Ψ�^T���%�K���Y�[i�+��*#�E��������[䧨��O��%�����%e�׸a�n�K���?�3�w:�A<�>�����>�~���.z����w?��%����/�?���s����/�ϯ_}]�io<���d��D�8�ES��(�Φ�I>��_�c|w�Ig�~���Ψ�t��io�vG�d��?�H{��,��f�p�Yr���������Y\�'�_%Hc��G�|�L�h�#�Z������[,J�E����q�ۭ%O`��wy����з����Ǵk���CD�v
�+ܓy�c���v ܣ��"Xs���%#~Ks�%Q:Mװ�s����ٌ��Z��
0�H���u��h\_6�V��-a�!�;D�RKЎo�n���;�u�~���s����,��ݬ�^��!�t��������;{�o�p�����b�ik��G�l7���R,J�S���Fj�H�/E���WA1�[�:td�&vF��%R�q������c:�����czn�c�ks�I������-�F7�@��ۯ$$��[�F;��2Yr4���氖u��������/V�m� ®Ѡ���aê�R�\�;�j��t��Ѱ���?z��?>���z��;�t�Gz�vG�5yf/ϞA���S�6��G%����,�۬�!V�i���ɑ|K�Ǯbq�cz6�����09�����׉ǻoQ�3��CZp�B��9*��jRz�)o�ܳe�5h\�i���}�إ�Ob���<��Q<���H4wb0*Y-[%�&�X�ː�y������sq+��!�����.酧8<K�MB��05YTK�j�<$]�˩��B��8Ƕ���a|�i�����Kf����Sy�k��~��`r�h����G!�3�~�����(F�����D
m�����E�ԁ
�T���;�P�i�����a�]Ff�ow��%��@���ys�)d��q�D73��62��Uu���O��az&8n�y��J�M��q��u0Cx(���x��r˺�Y�Q����ۣr`���V�t#������pZA�!m�e"I�{`��LWX�>[�AyR�D'�=������Q�-�Q>��[t��P�$[��i�W���1�Bo�Ü$@���P��[ps7t2�^�ۊ��'߯B��0�s�S�4���e�`$��8s�吻��E�A��1��^���X�I�ـ�\S�
�$�JH��ۤ�2�����Id�I������#u�c���X��\���L��(7�sL)���r�Ŷ��$�5�'���R�4�$K��YxOWG��a�J9�"�I�8	�(dܦ�=�LG��^���w��K�1?���`�@���b�^�g��_��G�" K����J�ܫH�y���>�B��u
�z���u0��J��?���?f    2:pǏ�6�8j<LFn?��G!�,YɟQӑ������Apk�=�+wo�F��?x֕���ˆsT��CWyoD =�|Jj5E�b�$W����JG\B-/�$+�9����5��5�e��S8�����W���`�]ؑ��$��S�Vf*[����v�>�0�
��v�c#�v�S&���Tw%��)�|}y���,�`��6�+N�M��	��w�O���]�j&��<��M8Dـ\�j|�K칭�TmT� a�Vo16�~�P27]�����"VoU��<ú���f5�W
_�c~��&���3^c��A��6��#_=Ws��Ԥ�椨��F!�Wۭ�����}F˽�H��f!��ag<�hy4����<��e�?�N�5���ӿ���ɨ���~d����B�$		3�/��u��՚ܕ�g� �eK��j@�޶��QQ�%;�.xW����
����;t0�wF�t��Y<�E�x1��YG�E�����iҟ~�G�U<uo�\��*����8�f�4/j-�.b�V����|�K��^��x�U����&�i�x�$dX���*3����q�C>X[��'��8>�#��y�E.�e:�i��i���/��r>RtH,RV�KfjV��C�_��q�1�Y������w[z�\L(���1�^�Y�*��e�uŎ��QO(Lp[av��
m�w�V�ݡ �nn�2Qdê�j`# ���F�Pf�}���%�a��^_���h<G�s4Mvװh^]ZEs% o80� �<�b'<b��<�4UΒy��=M�j�KP���?4�����!n�ǂI`)�|بrQ���֋"��s�dNݕ�`]�1��G�����<a��?���ؓd���%&2A �<1ʼc�0=3��5LdR*�!7;�w��
��%*�O�⟬�!c�UL�ƷC@�T��dR2�8�"R�
Θ��j��Zl�l�9@U>f��&�4�o)���4�I�|N'�5֕Ŀ��7�����в)��G2+\�%�l�*�v��	5+�Ep��	��a����L}SY3���wJ��<p.ƍC�J�/��]�����*8�]|H��;8���)%������W�J���op �J��6�%U�5����M�����@'�q�7 �<#�{4�o �f|�r�ŝɩ��,�C�OB#tG�(�:���x9TP<����w�l�)͉�E��%[������NO�Dۀ���L�X-;��6M����_���V�0%'�ئd�+Q�x2�ϰ�nI��1e�kӏ�����h��xG��|G�~1Ź.��,�X+ViV��H�$����'؁<<��E"�
3)��=�{34�4����Qk�/��P�c�E��8��,S��h+����#���>�4=��R��r�0�鏐x,�dS��^O��ryc����R��fA����S���7 �:K�3�'��&7������Fo��&Mפc���~��(_$���/ܣ2�k�J�K*�	���i3M�k�3�g8w��j�)�SV�2LL&B��A��}�g���D���{���k3�I�qO�
JӍɇGOh�2S<��$��GӺ;)��;PأHp�+ۺA�+5�/5��W��$E��c؜���C�'�KF# ��n0��'��������]�~��0џ:�+��q�;k�Y���׌�Xk��/aA��@
d� w�M�+5�h$eH��?��A�d���Jm�s�|��ɓ=���.���=�wr�2��i���.�:݂vu�%�́!?S��?U��&ٯ.|$62�S�ց�o�NNax����.�9�*[�R�r�	��-izR�?l�PZ"ѣ&g�ӏ�"o��*���SVd�$�Qw���W��ߒ"���ڇOч��Q�����7���&V�G!p"\�I+���q�`2�+���K+/�z�3Y��7���U]]��Ss�I�m���)>1?� ��h[���1Y�(	�l�L�y�	{$S8oSCݡo�Y�J����L|��6a��L��l3D�P���T�_�k�K�(�
���E�*����n���d>ޡ�'�n7F��=`�0�_��,z�2|�?�)��e9�KXj����f��E`�(�����=ldѦp�չ�ᛸX��UJV�q �V�7���M��)Е���������~E�N�e��W�+e:���i��K
�Y&&����^�V��;>�
%\� 5�ր3r��d|��C�!����3��X y� 
l��y�U"s��[����h����/^_N�i2��W�T;�ʍ���N�?{HT��E��0���8 OB�\k��5��A�|�|�i�3�p�ӯ�w�-d"d�L+���y8�ٯ;8Y����4(U+�>�-A"�Ժj�2񙯡LB�0���I���_��t�s�nA-�������<�1^�x"+��n�XgYȵos�YU'���?tG�8L���s��t�`��ڡ���`p�������{}'��=;�VA���ug<u�=(��ޡۻ�ȝ�H�@���`l�Em�]=Ma ���0yw��l1W�g&92��rb|�'=�=�G}�Q��+ܡV'$d���t����E7~��_�;��I�}Ԏ��ߛtcx������ϣɠ�=w�q4�������(��S�8�"�,��lve��})0�5�R���(��;,Z���O]rY�>M�/U��ڶ��*�`�;p
��)<�e���}�%����#~0��
�x�҆Yp�	� ���'�U��5�J)���a��v��d^)�v�Rڲ�W,ǔΙ��u��C�._��O��i8b��9�+��Y��Y0i��U���0��@94���6gF����:f�����AOT)�M^�(ʈAt���2���x����������S/�uXϣ��)r�4���Q��8� Y}e�,/\�Ŝ��jŘ;��vڰpq��j�4c&����֋?�2}��V�I�z2~�Z}O��b�ט���{r�{Q�;�G�[�بRkaXde�F�Y���@τQ�����F��@�#�ms$Y��-#2�"!���R#��>��a���������{��#/��
A9`D��nGX3��t9Dg*��o%�G;X�Hh'��;�E��&[��F���I�V�
�E��UR0�x'�Mľ������sb�t�2��C��5(�50n߇�UN�fH���E��n�Y�0E-�9�W_Fx`#J�-��o�ׁwݒ���׶�y�j�$�/=���˫�xXů�i�i�Қ�^�$;mܘV,�����GX隡�D��x���z��kN;�m��W����:���z�G�s\W��9��ުY������.��Ri��Ƙ×��뎰�g�mvY�A�P�̒2��Q��[(hYq`+�C�@*�5I$�n���y��rh`}�J���}�S�[5�1��$Lה���T�k�m��/�,Ţ��
��"�^���Ē���zl���d�%��N�myIA$ҁ8�#��t�z���9����t饮�F��e@��7���cm�3��JO���U8��	4��A-$+8Y�yJ�=��Y�=��û:�֥\P�<]-����#�c�O�m���X�R^\zE4,l�����h=�VBhL^r{H��4���w�6GP�mՂ%��4rf�p���FB�Ψ[��X*WC'�ɋxp����j�S��n?�5�zFB����L�0.#p�"�A�o�����mqɉ���:Qo���QH;i&��	��e�Q��Q� $�ZXm�Ǚ}S@�ɞ}3���me�?i�N09�n�#���%C%�=6�&�?|����v��j���F�I8l�+|̂���-,���n��*�y�.k�%L-�����%�Lͻ5��?�*L��OS6�o�R���^C�z6"|�{����^؏�q����$*д�@�a�d�Hŉ���|eۀ��_n϶h�3��|е����$�����s����CX�����/���\�z6� �64�v5�������`�� j�s��޼3��|��{�E2��ag���y�M&�p'!Q!� ��ǻiD!��s���b    T��zI!���諬���B��~�<��`Ehi�YƔ�Ր8�<�a3,�'y��v�0uc������7_��ɤ3��������s'Û�ܧ��w��}/�=����?o~{���
�
`�a�p}���rL�,�HqK�K����dm��4�?�����T��;$�_7��M�A��wf�(��k=���Ê����x�	�]�������Ω>�EOac�
���K����e����¬0(��栩�y���eH�~	�eL ���v��B×u<���t#S�i�����3�:�"Rp��2���P��@�4U�F/؊#1Sz�;�wq{�c�zƘ�ץO.7OE�̹&5E{Q��F}�Δ�Qy�����}�����|�w~G��
X��$C^��Ꮼ}j��g�E�ȟ�=�L�_V�ׄ&2�%� ��Z�c+��zQ�aS�Xy\*Xq�������Կ%�� ��x��Ȅ�f�};��cԍ'�
t;�NPd��/=�D�g�G�Ps��b,��;R|�2�䠾��4M�S�;ue��'v��i������w�g�Cw؛�{���>�I��"�-@��Qw0�E�Q�۠��B��>�A+�Yw;O��[I�Rb�?Y��K̊\n�|\!!�����,\y�"�	w�A�e%E�Z�08T�WN��Z�њݿJ�Y��2�ޣ�n>$3��H�?�b�E�䀘����F7X�vaI��J��H*_��c���R���T�~�?�L~�k��6ZdH�8�#)�o�r;�|I_�S�s�x�b�8ߑǟ�G���O��'�` �(��i�7�������h��"ʩF�)+�s�Cy���uc�=�QHE^J��7Q�"��"aM׶��<�)�6�bm'���t��Jց�Zw��Z�!�{�|x��0�c{h�z�;l@_o�T��b+QHs,�c<��I��E4��p�ﱫY^P>���m�:\��cR�����a̠L�
�DQ���+J=;�-R������C�f�"k�S�)�?������3�h�<G��13R*Ll����B��wi���a�&YM��<�ᇶ��l*@4lJ��P��=XܰY� �X<�{�i��y$p��-�|;�,�G��/ٜ�Ϝ+@[ċ)�~�����fYk���R�0.u�7$��ڿǬ���΃����.�R��uZ��,�+q�}�������kKJ�Q�W�,8�h�%�E�\0�6��H`"d &͈�O�VA%,ݒ�
�1��VRP�7}t��H>���7�䙅nF�!���3���n��I�]>����:�̍���D�R�B����C�D���i
��ju�7��_ܱ����v讔p�}X�B<W�6���5:��$-Mn��[gӟ��W[I\�rJ�w+�}�h���p4o�	�.�΋N������H���u�%�t&��P,���ͻ�� ��!.�?�W폸1h�N��)?S͜�W.��H����-�C�
~8�%}c���	&�hMZ�a�t�Ls��xf�"�'��}���d<�BaP�,0*�n;?��*�����ᑲE��Q�f��]>M�D<�@�G���(]��e�+��i�g��M�̮y{�C<�����]�w��`o~�=
�����q]�W屄�5��/#�y`�x�U,��iA�p%f�x��E�V{v�~���d�/����[<&��"A�[�f(q:�|11Q&v))�d�q`�.>�e�p�=�cy¸��
�9��fK.�CV��D�9ˤM��&�2��=M���;�c��][��zuG�>E�n�����-��>�n�<�vFQ2�g�`ދ{��M'��d��ͻɤ�t�!�������`ʎ�����ym�jF�>nPVc$C�PC���&�Hd[���w�wIKP�DK[/�x2 �ZF�n�raq <�+��/?d�BW�_���ʝU�2�x���D��������������&-��w�@������2���RWS����~�	a�'J�N�gڮ�d��א��xԡ�Gx~�8Ѐ=��f�5��f4�r���I��4��
$jص��s��"n�0�E�H(Hd[�#Y����.�3�Цzuw�5MB.�/i�\���ׁVw����jR�ȧ��bkO�S\)�-h�)�6�Ciא�f�*>�����_��d�!����wx{<M_?���L��� �XL��lnm�����=���y���6nC�t���0��e�Z �Dw�*Z�B����؃O��{��A�7�!�����/�n߿���_�ݾ�X����GĊ#
���@&�q+Ƀ-�D����N��m)3a%���"��Y��?ӷu��B�W��a�xm�/�3(�|��I��]����`@�c���țR��Dl�4��~eV*��>Q�l�ҭ�;I��O����獰��@�9���<_d�>lо��zBv�^e��5�e��y��6l��3-�2҂����/�6/|���Tiu�����\ձԑ-��Ș=�?k	Ŕ�~��gK��]z����>������/zNU��	�l8Z�rC4���d&�n?(��]�������`d_0����?��:q������ʰ��$:�����E<� %v��G!�2k*n�+@���2Y��@�6
�0�{�b\�J�:�Wx����*t�-qIۤ(ϭkt���8�$�rpU�]���]�nxl�蓸4��;��v�Y�S����S�h�:���	z�?��j6�U�c�{�bv�5r(��1����/)f�"��B��! �~���	��:�A�p{�i�Ȣe����kvϿ0��naWjg����M����^�p���÷9�p@����L�x�\���V���Dɦ%�ӗ9�#�X�m����n8SaE�w�z���-<^v6�gnD�S�������J��N<��X�{��1�>�T<��4u��g�)3Y� ���v��j�%�A/eBK��b[��~��qr�j~X���F��ǹY[f���	u��^�kl7�`��i�pH�qȼ-�֔{��Vrʔ~munx��/9eo���\�D}�3�3\c��{C~Ld(�`I�b�
���J���,�r�;��9�8��!	b}U�AY]��a�ǭs+�=y�5[p 9��u�敫���g^̩қ���4�9��?cf���Iۖ��EJy�����K`z���ȰN-;7y���-ufuh���哩k���4�6�hi������Յ�
:=�綶k�fr(�}���l��#�?WO�V�]rgZ���`lQ��X�,r�$����S��Z�{a��F��!�Z�{q��b
��>]�꿫'��1i�R  f�S/mk]�Jc��er���On��0�TNֶ�g8�N}�:k;M�q�}�(_D����m��r�M�o�M�'��и]���2J���R��;�>,v�&G+
+��Y����G#[��_�:����8P�&�2�D+s�� �c�����Ig�ADnvG��?ƽ�(Z6A��'�-\?^~Ȟ	zFi^EB�r"�4��������|�)1c6:�G/��X��E�x(��l�g��F�NZB��(�d��c�8�w�A���OoϬ&��r�!=l	*����=�D����8T\1�r�TN����a
�"!S��&�R�Y;d�=��}��۵]�ag����`�eT��ӻ��_�_�����W����կ��������������砘;����j�OUѡ�����[:u:�}o"�B�b�0��tV���4�nњ<[z����;��Z"5�'�ۦ���w���iH�̭�tx�\G�9�!A�5R�tN��uҽt!j4E�C����R����PD!�.h�e��3H���n<�v��xw��~X��k̈́�-�~��x�S�TmT3��*nh�
EdƃZ�ҴV�z��Pe�^�~�3���F�$��}��
������?	�cRu�&�	�[T"��kC�Ǆi�sʡ!�9镛��ѿ�w�
ըD�����p�L�1����u��u"i����
K�M�����i�J2���Hx{��ݞy,��]β��Q�$l��ml,�痬'�����x��M�    ������<������A�΂TbQ�E~�9�N4ߞ:O#��bѨk.�EPSh��{*�6����Xr�M?�\�v5�k25�^�e���m�z�j�՞:��u�*l'�� �|?4U�8VqL	�Z�g���L�.Mx�DA^!vm�=8�@()��֑p�ܠ�ꀥ�"��u�yO�gk�>�����	5U����M��rΠ�S�͸��T�LŒ�Wqk�́f�!��2vܘ�~OYxF�,O��T�]�#�__���r�������B��s#�6�:�J �	�rTa8��M6T���������v�rc!�K�s���pu�/"}Fc��1��4�Qi���LF�62'�'�P�u~�i�	'j��.�9W%��B�؎��'�x��Y�G��8��n���b��:�z���_���a��O}���^�k���m9��9U�G�p+�|�/�a�c�o"��n�?�F������O�Fd���=7�_Pc%x�J�^M��M�;+l�������J�P�ago���!�ւ�>�2}��	'��O�o�����MR�d��p)*ڟ��x�LQO��b�������f����3"�\��)M�">.���M2vt�*�Wy�+y���?�!�Q�+��E+���d�s���F�[Q��tTi$��k$Go]�A��M���4_2��Q_���y�,��@�+�W�+`9>�S3��l�rSi�봡��	�"��r7W��08����z�ôfă{��C�+�x�J���֩i��cY��?��M� S�tu�x٦b�!V�k7�,��e5˙�C��T%�{m����jV͔V��$g�[x�t�{��eV~��P�x��t
�$m�乖�I�Q
NM�Y�C`�7���*�ǚ�w��"�[�n�`i���*�y�PN˴h^dX�]��76$�*B���G2iӟRC(���R�?#ٽ�M^ǈ+J���a��;���ڈݞ��{lo{~��wF�X�zw�4��|��z�U	��ʲ'��N�w� �FW:�Rz �rSxZl�%|����~�k�kP�f�t��;.�DX�w��4����3�j��t��f��<|���Ö¶$�a��s�W��΂�Ps��֦[^�5ӛ�ܽ��xSrX)��t��5�Z҈.%������|[�M���īP����/� ��;�Wp�Ӥ��ot��3�2��#�x�ݧOj�e��;��m������V�������V�2J��56�핒[ӝ��(�#0�]�Gt�� �p9�z������r�<���XV��D���$A*ʟ�sX�C��a`P`�����H��͕��*2?��t	�'�;�ep{�q�rj�\sϔ����ݞ[V=�B���#��M
n~$ �p��.�)��T��qclT&A)L[	�-Qe�g���,Z��y:����d�B���O�ˌ���M	竤NWVq"`��gـJ镤I5h�|F_��Y�\�c��۟@��_�k��+'��Ck�������V�������uY�ܒ��(�@�G��ҟ�F���Fq��cG���3���'�JX���Ђ�KJO&�w�]�셊,�%L{r��ӹ\1>���EU>�m�-U��گ��7'����M�g�\��ク����F��f��R�S�ƦGkE���e��&bI�_�}H$"���E�+�X{H];�R��ީ�&���Y��Ro���B�`��`��;�Ӝz���7u�.�����V��D�dW/�V�c�=5SC�+�"5�+f
���XT4Z��.�n�����&5�Lp��)ڡ�������^{��\�ss{�Ww����8ّxwϯ�_�M}G��=�w�@����NRI�0����J���V9i0M��9{c*�B�%��؂
ͧ /+��7d���jH���c��Ӗ���ڧ��q���������hZ��ru�ږ�xUY��0�@�5v�[e%"fƨwq��5�W�`E+��#��ڧ.�S�'�<�������ʜ΄�W<J$�&!�U8�d�O�X3�лSg�X1AX�s	�>��T?��lv��o2���ݘ�+�"�� ���,)����U2�=�c�ǋ��:w��ɩ�B*��+��n�I�+�h�~��^��	��QG��JmeZ�nZ:������BR�������J ��|.��5-��y�̿�fp����(��=r��`�>Ե�4��^�<��5kur�@ejϊk�ɩX�H
((��f�I�ԯ�qvo��I^l�����`,I���,�q���0t@RR ?�#����n�v��]k�R ��u�J�봰 *0V�Y@��6]�?�Br%��`U�Y#���܏�O��+�����#{n�j�c��+�����ld�p��B��9�3�O���i�]	�~��m������MJ9�uF)5��7:2��q����0.�+l=+mo��,UHk-֘D�Ǻ�}C)9����J��O�f�&;}�p=��r��2H�aa/[W���_�t�>GP���y�P���[i���x�D�̖��/�eY��8M����3H%KA��QyU*��9B��6�`����=�|y���˗�&E���+f,ocî$����p,����jQ���F�Q�o�J��De�n,C����x�P>�O���)0�fץBG�#��}�/Lv}��alg�ƴ/y�24_`%�.�����@1q٘>��3��S"�(Rk�[UZ��\ TS�ޯ�`/�JW�����D��yd������,Ͱl���M��ɏ��_�G�]a�g�ޱ�R{-<;��n<G+�B��w��GOٵ�����8O�I	.,=��v�?��׿#�?�Nop�.�0����շ]q�ir�W�UEK1�ܖȩ��G#��.v#�rh�Ro����Vc��}L��Z
gʙc{XE���m�iz-rq+�ٜ�8�����:�do���֐Ԅ`s5 IV�ؕ;:U��p �ekRT9n�D(�(��3��*>S��@��٢~��0h�T�VT�o]���Y���`L#�{��ִj6�E�IE}�Ps�n�r
�.tj-AA�&�ϩ���/u�G�P�W,n�B��=lO�2��#5=�������|[Ó�X��pM�	���	����.�j��,D�#��cJ%tdTH�9��AlR�2Y�M	B�a���V�B�C�]dS
�P�nͩr'u����ɕ�ͮK���jpl�ӫc̲_�n��|��E�H�vƊ�1�% '4���������9H���L���j�s|��3��pG#9}���=k&����G�5���ؼ�?)����a]��v�������"�Xs`�v./E����þ
�>�郢����qw;Ī���9��m6����u��tƧ>
0�_��m��p߾�|6S�r����KZp�x��p݄�����hߧ�1�n�����=�S[
� ƨ���5����Gjox�կ�	�D$�}/@@+�}3C����Y0lF|Emd�M&�:��VO�"9��([��-��.-l�b }oC����غ�n�a�MG^N ��h����@ ��Q�Jd>�D�Wbrф�t��jZ;�t�-�XV��P�3X, +H��:��a�7NpQ�/�G9��f8�jG�0O���pn����N���J��1+D=`��)�iP�*�?^����͡5��q����Lm��U�L�Z���L{(;�f�)S.���l0P�c��`�L{4:sT����'� �Qi�r�L�s��2j�׼��Lv�{�;RIZ_1`��<�Z"�X	���?Y��y� G���K�5�yX�Zvl�;YiOJ�|w/>�!.?��{�{���j�ά�M�?�ȍ�����t�!��
~pSx�4l��FW����'�a��=�:��@L�=����cP�?�N}` ��[?�7�ai�Ӿ�1`��h$���p�2�Q�j�d��礨�l�Zz4 ^�j��9�p��A�V}������|�H��$<1;�>T��;!DGZ�9M-U�rEֺ�y��������3i�P���p�jƐ�	�Z'N~6wO���� w  BN���g+mm�#ml���3�|&i����Bq<dJ���[� �`Uk�h��b�W��x#�{mk���N��n1(�#�0�����6 NB�L��ګ�0~�+ Uj d�oR0Üd`��*j�v*Ò������z�Wǀ�������v��d%6�ag��B��G�۾�<Cp��ι�;�^L1�n�8̓�_���[�;ѽ^��96�'�?�:&��m͂iL�f[�X�&"u|.a.�,�X�U�h��0�?��B�t�Jx�5�(e�PMq<�p�.'	�e����Ʊt���hs��C�q���پ�A�Pm��U��<,�(�����,T�9���`U`U��{�z��P��[!�Ē�2x�GiJ��*s�\
+�2t�ÙH�9i�A�T��ٓ�}��z���))8X�O�Ƭ!⨐��Ml�_E�)G�����8�"p�Saz�����4�?����������x��m~5L���7�G�>
p����ɭ����:z{4rc�ВJ�� �գ!�� =0�:�� �6Ҡ�5.��n���5n�F~WQI]/u˘4@8�+D	 ?�=�@x��j!���u���<,�A��EU��Z��3JT5x�0)�I�.�/.xU�R��U��L� o���U�G�:�ؚ�D�-fD5m�u�:��JdN�5����TY,M3�������b S�CWrB6�V��T0Lkm [����ɅT�jXhL���P�ա����^���Šc� �o{���ئ͇�#�j��z Bl�0��-�,��Ą�+�tX��!x�O�3��y4�:�'�U��b`�Ҥ�E�+�ٛj��"����6��� ��-��zN�r^�G��
��u���91��t��=i����N���6�tFC�	x	��~y��Yw4��(�j{��|�����@���� ��4�H�w�6N����brX�-�9�TW�"�gZ¦�1���%<��U/qښP����a"9�6s����W���#�a𐺎�b�x��Ԯ�2��	Sc.1@�!_&�zN շ{N��N�H��U|�e�����t�e�毐^�Q�'��Y;�>�Ѓ�-$&rE�3��3M�|�T�njȐ��c���[�o��&������f#2�z�5�b��g�7��Mj��nb�N�b�BQ|J��ʬC����p��H����º��@�;/
l� �*6.��O�I�Ц��:���YT�͈4/n|<n�|ͷ�-��b� �e{̒7�!�W+Q=9G�ma=�u��V�B�%�/q�fO7������C�ĺ0�ū��\<��%3K��xsX,�lο=-S8��JsS����U��������y��� �a\.�h�j����NI���g8�T,<���
�4���@f�ڎ�g�fD���Y���E�I��\%;g��C��&݁��E�?8mT���-��1�6��g�
B��b�����V+��s���Q���l�G���Rr�RN噑2K�re�m Q�#���ˆ��,��(�CO��U;z�\��V�	��ة�n�	.i@���]i�ڮ�y}2
w��Igp¯�w��� yI��!ٗ�,g��ewL���k�=>��(�Õ��G��3o���dϬ7F�_@[r��eeNOj>6
�ed7�Cj���0[�د��gzo��`�A.X�� ����ʱ�O��\�=ϙ~b�ңMP��\w6 �r�}�}xL�rGqpow茜��^�/`k��򼘓c;�df�9^�*)6��q㶭Ve�Z��j�%�����j;yQ
p,s,�+�_���6	���Z'[AG�^��\ҷ��=�$:�S	�6-Ϟ��Y[��|!ܽxd	B~�09M��G̞fo_�z;c������|q�l���굃��!���w�M�f�<J�2�@�c�7\o����b���4m��rxɹb�##g�#X>��C<�h?k�+�GzQ8Bv���p���=�g�{K���]
k`�a8T�
k����h!o�9��pE�Q���g�Tm�SU�Ҥ��x���(B�В����!�N��|^�Y�i0�\�4Hd�ܡ�d��k�@�eg��C'�{f���y
��uMK����$+��;�%mUbc�f��=�i۞u��	��!!H�u���m�p��qk��͎Y��0�ޒ�,��-�F� ����.;9~�L�a�5�����C{��<QIW�e�`�m0�x����,/�hW"xA]��m�C����WL�NvV�`�9)�+�4�r8�k����j+��B�n(T� ð�o�<a~�JW��e~�ML��`<�N��Qޓ���S��!��΋xx������G����:ݸ����v����A<�&�b��M�N4�u�d��w�N�k���|�tF�r�@<�����q�U���R;TK��	M�bW�;���dv��P�)�TP
Y��tڽ�i�Q݁��c�_��A�С���z3����%��^�,|w�N�vg��>��E4�@�g�h�v{Q����x�6O�	rœ� �'�˻_��j�E���⊀�s�ݨ��jK�+O�\�~�`��>��1�V����a��	�"�;cs����t�<+�jI�Y�r
׺���߶��\� Tk�_l�,��$1�,��X�^��@f���9�A0�� �*؜]ZWk�4���E.��ߡL�V��"�k�Q�(0�ڪ�}Hևv�\q퇃x8v������_��*e�l|��U����S����y�[��hq�^��,�6>��=��H�?̹�����ńc�N�Pbՙi!S��h�5�q�I�:�x�-������z���2`�~�Ԯ#�g����Z%@o�����	�&喦�����P���v�ah �0oWc5�<�P��W{(�0<��.���#�A��T�0�-�fU���:d���خ�0�C����m^�E������ ����{��I�y�\�2w���v�c��k�)L�x��R�LD�� �ὴ��\f�T`5`k+B5*i�֛5�{˟̦��l4K����X�f�^o����t6�&� ��C6+rtK�E]� ؇6sٍzc.p<w�b���E���h<-ҡ#(6#7h��ln�^k�u���ڭ
u��C�	����ުAo2� ���ݻ(���W�^�{�/'�Q�k��S\�w�������k��2����|�������7�]��=���P���K-��Z��c=��w��M����g8��4*�_|?Ms���7�r�e����u��^��͓۽�?��<=�u���Ps��nѠ����2)%傶�MQ16�W�Z���zS�����^��ɻ�3D��~A�Wٟɫ3jb��e6��������\���~U�E��G8E�s��ܧO���9Ν�����?����2�'X      �     x���ێ�X���OQf�+�dٜ��i���Z(өd� �-�B���w�ӝtRu5�'������@��	N&,	���������*��G��O���n��e�5�k/	��;�4��/�k=�������X�Jz���|C��g�`������Sق��ǁCZD���\8���Q�ց6�x2��I�����ٖ�э7�v�B ӑ`7���"��t�f�j���F|)v�������W���@�䌷q0�~�mlL�`63��Ĩ�tV���RF|���5�ȗ��#	���aX����lӱ�7�;�v$= �����	&�h�|J1�A�~�3���9�+�J}[dᘱJ�W�Q��������9Wg�z���Ͻ�=y�)�p��TP�[�����O20ͳ�䙟����6��?�' �DW�8���\�qc=:S/�B���Q�d[OVA�HV�Ծ��֬�Mw>�[S��8��_X�`&���h�_�E�ހ��H �mʐ49}ԏ����JfY��a*L�rwpG�
��15-���EgUz���������ӡ�t$�0@h�r��s���ȩ�DVޣ���d��5��2y��+'��4����w_t�ݯ����PV��N�#�vJ�����Yyݍ`�N�׀<�%(C��!�8�x��D�$�d��T�I��鵾�뜦	>`JA+�{u3�G�b�E�7|���ɠjhX�����RY�Ι��H����:�q���"��|����R'?{�ɣ�;(�v�+��t~ ;5i�      �      x������ � �      �   �  x���[o�6ǟ�O�aOM+�$ron�6���64�"[r��1]ɮ���;$u7u�.E`K4�;��y.���D��$L�kσ���,�"���i��#��8}�0�=|@$@�N����a+�f��l���d�N��1�҉�58&�J</��cr��>z8NP ���c�հ�o�{#��?m��>U��"C��^�����O�l"hI%������h(���L����@V
��N7?��d�]m�~��>�7��|"8�>a�&��y�@�)l���!^��$�w+�M�K�b�㚛���!E��@ �S�y��������w����	>����%��Ｍ��:��h�^�kx9�w� :�<���^U �?6,��G�@���ը��'��UM-�%���YPWQ]����F�,6 ���&���ke���7FW��J%���>`Xkh���_��DNAR��Šp�ڠr �Ͳ3�wQ�Z��l�H�L���_!N����n��4;���$#^�
���|�8%TJ��N��;�/�jD����( �DH!ex���mm,��R�7U!�&53��!�4��R{��F���D�XVbс3Mll$���C'���,���'$5�����26}5��R�y�9$`��7�
A+��(I�Vm%�-�
3p�o����ڎ8��9��FDc& �ފ�?�G:�8��44JL���}y�0�H#�^5mRaR���r6�^��r#,��#�i�|ԉ��vB��p�s��>�ڨ�z�pI<BЈ��H]YBma��0��@u9�_Xs,ڦ��[W=�����ĭ��c�ʎ�O@���M:i� �\ܡ�h4m�a7`����(���ޕcu����_qX^����N1��p�Ԍ���WǴ�	O�y�Nqt4(OF�6�C`ĺA�s�6;)T��9�	���j�ثL|O�m�>������I�<�&D�]�=lc�.�C��� �;�c�Kn`���j�X�Y��%Tԝ��Z��kT�X�� 7(��z��}�$[3�
�Y��e�+��1
O9طHӫ���I/��l�Ӽ�bĨ�px-홌��a�
��+dsV�^s��:�ken~�Ƅ����W����G���9��AK����|Wx���]�O���h_k���vcG?zh4��^�U��z�����	�W��D�dّ�N����.�2��2�ʁ�s�~��z���{~�p��`d����q�t�x�`�����%�KD��a������`^x���qJ��+C^�cG3�`�/1���e��~G\��,�ю�Q�
��юI8��'�y�,�=�ѫ0g��zV����.]�,6I.�2/�0��'%�ܹ�.�}LD�m�D%Z���N6Ctꕂ�/Ƥ��/�f����of	��b��t�r���������M�2$DO����`}��@4XX�� ��YR4^�A�������L&Tg��      �      x������ � �      �      x������ � �      �   6  x�}�MO�0��鯰vޢ|'���Bₐ*��q(Mօ�M�u��{������ů�絩DL�(��0����������v�-��a���ݕ����Y���D�	��$�K�G/V��Y8�]{���Cэ�E=�y�]3��om}�r���|;f���`��H�pM�� �����7E�Tj��)a1�]5{C{o]8S����DD���b;ƪ؂=��S�����Tj��D�Dp�%��@�ǿ<s�b�J+ܵ~)�Ɂ��y���Y�Y����c\囄�D��2�&�p���Ɵ"��%���Nȏk      �   �   x�5��
�0D��+��P*�RP�x��M]L��l(�{c����1�]:m4�1t��Ũ?��,I���d|#+K�`鴌:AI�%E���uVWJLn�K&��&�߳��k=&)0yW�0�	SȪ>��X���))������i���@	      �      x������ � �      �      x��\g��Ɩ��c�gg�nE�O��s�z�O!�HAi���[��fZ�{�����s�{B�7���/q4� 骣�����3��;ȴ�������?�"c9��<ϕ�ىS�ڝ�:��S�S7U���4;Bm���]l�&�0m�,ڞ�l��|K�6��$�HQ}�F�=lU�����SL��z�MD0 p�hx�/���K���:UY�I��	h��N�{e9�F�Ka8^S� �)? C���� ���O�_D���A>�!8C��mp?v����n�4�֒od3���˜�f�.rL�G�`#^��'�!bPNd^"��w��h.�[i��b9X�P\� ҙ<�\��0�t�j*��h��g�݂�A���
�d�6���չ�dIb#G�ԍ����/I0s}	��{�<~_|��E�0��v�q)��;Q� ��j�|w��q�!�p���k�o,Zʆn->��fo?��a�����w6+r��g����&�|o+ �V��9熢Q����i���i�W���!���%ṱ�QUU�V�K�D"3^�X�cb�44#K�~6L�ϯ��<P]��_Z��D���h��%r-�/$C�]�����c8����۱oh'�v|���7F-�3��b�,���JI�]sGcs D���;�;j�gJ����D�st������!�q�Dw�`��NI,��w�{�Y&_�J�ӽ\�a%�� �54P��s�_��/4����
���'�C��	�ܠc�>hu���>V��WʄH'�H�c�$ӆ�*X[�����%I;�c��"vAHq������RhX@,4]z�tz����/ƪl-z���je�H�t�d�r]�Ȫ��=��bex� ���8I��u<����~�$���z+�ِ�k�	i!9��\3�cs?��'�P���=O$���I;��h��;z�0f,�?Z�ڛA�)��b���\\��v�
~���]b�����3|,X ��.炽#�J&X�B�.�kY���F�������Ց>�媜j׋�d+Z�LH�Nl͖�o������+˝L�Y�޲��5?�;Uؿ���_&�l0<�< wM�����8A�i�&�&����0q�q�fq��}�i���_�o���������]R۾\_���Fݒ*�Z�&Ҳd4���O�$��(ǿ��I��P�Y��?�G�·Dðܭ*���*կp�f,:�:�Z[����{k��NkESQ��3a�^ �{�������X�y�R8�R�;o%)	o������,��q�+���X�t.m�h���ɑ�[�=�!�a�V���Qj5��B���uNUh�_)
��ۥ\}��h�|u�l�&�3ǋ�5�e穿'�8`= �w���0�H�I`�yehr~GB�P6�>ƨ%����C�X�N{'ќ��X:|��q0�i��Y�p�Y��Q��o%�d���k���t��+K��G��Y"�;����L�a� S3��skJ%z�i�8XC����(�^Z��Z߃��h���k"�[|��
�Q��1�,MC2O�Kf0����3�=V4#@	 �r�$^<]<�1�)<OMNQ%�d&�A�1LF��^�9��O��.��\3<�
��<��NA����m��ӓ�K�DsJ�C�S���c��á��ʯD#�$�� w�E��'�V7JFE��`�<i����).G�z-`��&�D=w��m��Ԍ�&��3ڪeْh���#�x�����#�?R��i�v~�Y�k��;d ��X��(����++�f�ɲ�7+66wP$�����w��4�a�:v��{��r�L+1�5em��8+�]���]~�#T�L�h���d��(E!50u�/F'�g_��vڳ�e���~v�s�ɇ�����G� �Q"��БxQ�p���3si�m[)e���w�z��䖑.�$�Ơ��4����̬U�7���X�y��ݖ�]�2����D���l���U&�O�Q`F�h�ţ�G�[�ؔ\��a�$�%���EpG슉�Un���p�Z{���٪��{�(���KںBO-�ߢW����d�8�)`�K� �e��
����1�C������|���W�=	������3��ey%[�:3ɷ�Ѥ4m��@���fq,�ۣ�t�Sk���;K��	�+���<���%/�G ^����c���#�Y�p�a a��������]�-�*�-�v�a���*�Lq�J�i��n]�yza�X����b�u'{�����Ǆ�wӇG�!F^A�_�\��i'���b�YI hI���ɒ֥�_���4��'��2��N0���!�C����|�A�H3 CC%����#W!�☮`�=��42A�i�:u�l��7WNY^��S�� ����j6W���~��/=NU�݊j� �s�4G_��O���"��g�-%�,gf��"��hS+���r����q�H�Rv��;ۮ�N5V�v�oP��v�KK�y,cm��"_�廅>P�B>��lB^��P1�k�����>�ev���{�:��[Yy�!
�/��s�]���1����U	�� ���L�J���F!��GSƥ.�����Ax�xV�v�\�cf;0�(�/�T7L�8e�dY5�/ra����ΔJ�ȧ�J$��[�e}e$|��W��@��v}��/#ۙ~t��������$�v8�X�.p��ɍpG7��d���B� ��*�R]pvLEuv	l�����ʸ�f%k��zwZz�[E�,��:1������~�q�v݆<y�{9n̺iG��)z��n/O��e�K)������;�&r��i}�!*�������^2��M�{�1̵�~n|�zN\�|�k�r�^�Ok��3�o��F�e�z�*�Z�	?�2�{��<���Nb���C� N��iz�L��¨`[(j��+#�j08��J����%Y� =��{���OJ���#>�����
�����Կ,���������E�یH�p`���!��U� ����O&Þ�#�e�j�όZ+{Fo5���fCU3�tg,[h���*�<u\�R��t��%���s���PZ>��{�~����h�+1�cW�c���9����<��Pq���4�=לO�T&�g�Yk�����/�^بd��p�E�M��o �q�ć�`,q�f�;f���Iom���tVk��B�*�)/,���_͇��+�fێ�����u�D�\˓�Z3����t��Z:�'��#�,�~�p
�wR`Q��+����g��&�<�Fc��� O�CJ��j� 5�DHq�lo1�9钶ˀߖ��j�η�q$5�5
���e�����0��:[m��s����,��8Kb2{:[ND��g�b���qHGq�W������y��!���8��������\d!�7#�v$B���ă@�i�&�퇎\��o'n?��叺���B���ڡ �M
�LL��fu5v-����T+�f3�|l������P:vA[�7�th�A3�U�S��� �}��̡���%xf�q�mD&SY���\a���ʞz������ᙤ�p\�K:������I!����3X$O���=E���B-�c7�ْ�� ��g?��"�y�Ŧ��'CQ�Z� �7C���z�j��$/�í�"���)�`�Bo&�F���!���v�:��R�~+;B�r9G '�����rW.p8�/A�Q����\*f���S|V�6I���<�0�AA/X��n��6�+�Y��}\�09Ƥ�'��W2�m+�X��\?���FT��9Q���m:x&hJ�6,5��8,�Ai�/>=�����\b�4�
��}����-�� �Wh%�Ǧ�,h�i �� �H�Q?���b�d����B�|�*�l��M&��s@�p�M�o�Iw<Uj�:�7��{�������7N�Rg�}�J�T�ő��yg��W�J�żCµ�F�E�
-Zf��۱,s9J�=yى�Vcښ���"_*P�`�	*�Mq��;N��x����U�py�g 3  ����y��b�|Cq��]�ӽ�%�p,-�	��o`6�N�Om|�8��N�v�S������2&��P����b�I�~u����Z��8�d�@hD��ʵ��!'z�4=L٧ud��l���#K40�c}�O&��,!�3J���  ��>��a.z���ܦ:�BzK��U��-u�U3��ӍM��i�*,�%-����R�h��!w<�������xb���J�~�l�����X7���:��=�2����g���)�򵩞&�D��ާ@�-��N���N)�2�'�͔��Mn�2f���ۭr���9jHL��r��_4���K�w�I���ٛ�#N;N��i��I�w�����/�����m��ǳ8�p�b,��4���]�M���(��T�x�yi����ɃY	����k���6���w@��� �+�J*@S�1���7�u>�ȯ���%�bK�J�Z!jO:6�������`[N=��e��Ϗ�=#�^Y��fߝ��%0�ݨ~rF�CO���u0X�,��������7�Z������`:���xޟ��ք�3�&����<��,.�>~��:f�I�N��s����y�]��:x,<=qbmɍ�h�a��z������*i��J�q<qq�6-||*��Nj�=�~'�t�=��j@���y�8�8�D��h�:�K~�����F��ı41C������Q�;�Mm3�?��Z�96���M�)�푿�r2D�՝W{���Y��F==��N l��~��2j��|25n>���h%v5{��#�\�bqPug6�7�^z��5����_�Jeu�ɚA�W�z�d&r9j:��☑����r��'�:�3�G�2���w��<X��cb�E%rl�47y(m�W��y���]9K��"D�o����O*��٧�GI,��-$���Qw��QC���n�Xn���|jò<�s��:Z���U9�\yءƍZUNS�|��0ՙ��K�s=�"���g�wdG�G+�e�������(@(���ۍO�%
����������������`��h^���Ҁ����S?�A��(��5;IS�bX`�mV۔���.�z�L�7���&�F��4��m���x\g��nv7���D�����{�{����JR<J*\Ω�u���3�hqK���z�o�.U���Z7���m��3�R8���� �6x��pCg����g�v����ڟ%K���>�3��D��9x��wu1��	T����R;��$�w�����6�fak3��Y���b��5�tݞ����N�f	�,
��2>?���򞎃=c�W���B_UCb���d�"�!�%H�4��Ý�@�g�T0�WȽ��4t
=�n�8)aF��+�<��N�2�^��-�S���X�{.�����E5P�+}1Ș[��y'�����A&�0ܵy4�ǥ��q�,X���{%p�����L��P{)-��ĔV�͡T�6��'��:8������Ep�a�7A��+3i�e�(.�rX�dj�-�KHU�6�J�a�Y��ӌ��N;Lunt��]� N�ޟ���X�:���7�!$����X�
x�ܝ�k�.���Ѭ��^.�R8��'��г_DBџe*Bi�.�Ԇ��6d�s槥�?~�>��Þ�|ٽ����2� ��ck��w�wͅS�7�]�O͏o��G�x�
�U����)
��� (I�W��\/Teϳ^�����/d��E�k��(~�e�ǌ������
�X��L�,c��uT�m�;���b�4l��1��q��Bʑi�k|����7��O,i��R|�2*���F�����t���i-<Nm@�g�DV�ܽ&��

�X�x=�&a:a ǿ�V�vS�zaCw1Ku�52�ÔW���E��N���&��΃��]�-�����.Ӝ��e��dN0�{�Ӕ;�"œ�Y��3���#=����$��0��]':+��Ii���A��{F`*���y�ng�gGQ|Q�VDn0� $���}Z�~����Ѯ�cl���M�4�+�p����q�E~�Q$(�����~���v%?      �   J  x���K��0��񯰔u�f�o�U7��U����(��xܪ��&b��Jl�����WL��'O6�W�2�%}�;{����g��}�iiBs���լ,N�[����®0��A����k��,�eՓ�G��٪ʚ��(+��Fƅ;�����iٟ���	�����o��ªn1Ē�7V���!�\��y�
�.����I_{`���qN����:��j�,bWfsYHi]�/E�ʓM߆)j#�Ș xj�mݔ� W��&��� z�AGw��T+��,w�;	��pE���$����
�P�o��6B&���Y��s�~���.F�Y�T�&������ņS�ԳX|N��F:s�V��<g��]�"W8��|&r���]CǄͶ��҆빮��<Wk�Ƌ����\�����c���Wzd@�ΫbR*�Ԣb"n ��*#�z?}~o�XA�T-���3h��r��b� ѲS�ם�""<�{�T���N���Y{�g��sJ�%��A�� o�q�ĉ̂{��G���QD"��p��G�Q4o�ʀ�/�����}���i�p���!�ɕ3�      �      x������ � �     
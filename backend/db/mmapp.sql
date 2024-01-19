PGDMP      -                 |            mmapp    16.0    16.0 ,   x           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            y           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            z           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            {           1262    16720    mmapp    DATABASE     x   CREATE DATABASE mmapp WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE mmapp;
                postgres    false                        3079    16721 	   adminpack 	   EXTENSION     A   CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;
    DROP EXTENSION adminpack;
                   false            |           0    0    EXTENSION adminpack    COMMENT     M   COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';
                        false    2            %           1255    17696    next_transaction_id()    FUNCTION     �   CREATE FUNCTION public.next_transaction_id() RETURNS integer
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
       public          postgres    false                        1259    42678    apploadingscreen    TABLE     [   CREATE TABLE public.apploadingscreen (
    id integer NOT NULL,
    apploading_url text
);
 $   DROP TABLE public.apploadingscreen;
       public         heap    postgres    false                       1259    42677    apploadingscreen_id_seq    SEQUENCE     �   CREATE SEQUENCE public.apploadingscreen_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.apploadingscreen_id_seq;
       public          postgres    false    288            }           0    0    apploadingscreen_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.apploadingscreen_id_seq OWNED BY public.apploadingscreen.id;
          public          postgres    false    287            �            1259    16731 
   attributes    TABLE     �   CREATE TABLE public.attributes (
    attribute_id integer NOT NULL,
    attribute_name character varying(255) NOT NULL,
    attribute_values text[],
    category text,
    subcategory text
);
    DROP TABLE public.attributes;
       public         heap    postgres    false            �            1259    16736    attributes_attribute_id_seq    SEQUENCE     �   CREATE SEQUENCE public.attributes_attribute_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.attributes_attribute_id_seq;
       public          postgres    false    216            ~           0    0    attributes_attribute_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.attributes_attribute_id_seq OWNED BY public.attributes.attribute_id;
          public          postgres    false    217            �            1259    16737    audioheadphones    TABLE     	  CREATE TABLE public.audioheadphones (
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
       public         heap    postgres    false            �            1259    16747 "   audio_headphones_product_ah_id_seq    SEQUENCE     �   CREATE SEQUENCE public.audio_headphones_product_ah_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.audio_headphones_product_ah_id_seq;
       public          postgres    false    218                       0    0 "   audio_headphones_product_ah_id_seq    SEQUENCE OWNED BY     h   ALTER SEQUENCE public.audio_headphones_product_ah_id_seq OWNED BY public.audioheadphones.product_ah_id;
          public          postgres    false    219            �            1259    16748    cameraphotography    TABLE     ;  CREATE TABLE public.cameraphotography (
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
       public         heap    postgres    false            �            1259    16758 $   camera_photography_product_cp_id_seq    SEQUENCE     �   CREATE SEQUENCE public.camera_photography_product_cp_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.camera_photography_product_cp_id_seq;
       public          postgres    false    220            �           0    0 $   camera_photography_product_cp_id_seq    SEQUENCE OWNED BY     l   ALTER SEQUENCE public.camera_photography_product_cp_id_seq OWNED BY public.cameraphotography.product_cp_id;
          public          postgres    false    221            �            1259    16759    cart    TABLE     �  CREATE TABLE public.cart (
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
       public         heap    postgres    false            �            1259    16766    cart_cart_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cart_cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.cart_cart_id_seq;
       public          postgres    false    222            �           0    0    cart_cart_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.cart_cart_id_seq OWNED BY public.cart.cart_id;
          public          postgres    false    223            �            1259    16767 
   categories    TABLE     �  CREATE TABLE public.categories (
    category_id integer NOT NULL,
    category_name character varying(255) NOT NULL,
    category_description text,
    category_image_url character varying(255),
    category_status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    category_type character varying(255)
);
    DROP TABLE public.categories;
       public         heap    postgres    false            �            1259    16775    categories_category_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categories_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.categories_category_id_seq;
       public          postgres    false    224            �           0    0    categories_category_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.categories_category_id_seq OWNED BY public.categories.category_id;
          public          postgres    false    225            �            1259    16776    clothing    TABLE     �  CREATE TABLE public.clothing (
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
       public         heap    postgres    false                       1259    17600    conversations    TABLE     �   CREATE TABLE public.conversations (
    conversation_id integer NOT NULL,
    customer_id integer NOT NULL,
    vendor_id integer NOT NULL,
    conversation_user_type text NOT NULL
);
 !   DROP TABLE public.conversations;
       public         heap    postgres    false                       1259    17599 !   conversations_conversation_id_seq    SEQUENCE     �   CREATE SEQUENCE public.conversations_conversation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.conversations_conversation_id_seq;
       public          postgres    false    275            �           0    0 !   conversations_conversation_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.conversations_conversation_id_seq OWNED BY public.conversations.conversation_id;
          public          postgres    false    274            �            1259    16782    coupons    TABLE     >  CREATE TABLE public.coupons (
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
       public         heap    postgres    false            �            1259    16787    coupons_coupon_id_seq    SEQUENCE     �   CREATE SEQUENCE public.coupons_coupon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.coupons_coupon_id_seq;
       public          postgres    false    227            �           0    0    coupons_coupon_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.coupons_coupon_id_seq OWNED BY public.coupons.coupon_id;
          public          postgres    false    228            �            1259    16788    currency_values    TABLE     �   CREATE TABLE public.currency_values (
    id integer NOT NULL,
    usd numeric,
    kes numeric,
    eur numeric,
    etb numeric,
    sos numeric,
    inr numeric
);
 #   DROP TABLE public.currency_values;
       public         heap    postgres    false            �            1259    16793    currency_values_id_seq    SEQUENCE     �   CREATE SEQUENCE public.currency_values_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.currency_values_id_seq;
       public          postgres    false    229            �           0    0    currency_values_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.currency_values_id_seq OWNED BY public.currency_values.id;
          public          postgres    false    230                       1259    17057    customer_address    TABLE     C  CREATE TABLE public.customer_address (
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
       public         heap    postgres    false                       1259    17056    customer_address_address_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customer_address_address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.customer_address_address_id_seq;
       public          postgres    false    269            �           0    0    customer_address_address_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.customer_address_address_id_seq OWNED BY public.customer_address.address_id;
          public          postgres    false    268            �            1259    16794    customer_delivery_address    TABLE       CREATE TABLE public.customer_delivery_address (
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
       public         heap    postgres    false            �            1259    16799     customer_delivery_address_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customer_delivery_address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.customer_delivery_address_id_seq;
       public          postgres    false    231            �           0    0     customer_delivery_address_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.customer_delivery_address_id_seq OWNED BY public.customer_delivery_address.id;
          public          postgres    false    232            �            1259    16800    customer_follows    TABLE     �   CREATE TABLE public.customer_follows (
    follow_id integer NOT NULL,
    follower_id integer NOT NULL,
    following_id integer NOT NULL,
    follow_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 $   DROP TABLE public.customer_follows;
       public         heap    postgres    false            �            1259    16804    customer_follows_follow_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customer_follows_follow_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.customer_follows_follow_id_seq;
       public          postgres    false    233            �           0    0    customer_follows_follow_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.customer_follows_follow_id_seq OWNED BY public.customer_follows.follow_id;
          public          postgres    false    234            "           1259    42692    customer_transactions    TABLE     �  CREATE TABLE public.customer_transactions (
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
       public         heap    postgres    false            !           1259    42691 (   customer_transactions_transaction_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customer_transactions_transaction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ?   DROP SEQUENCE public.customer_transactions_transaction_id_seq;
       public          postgres    false    290            �           0    0 (   customer_transactions_transaction_id_seq    SEQUENCE OWNED BY     u   ALTER SEQUENCE public.customer_transactions_transaction_id_seq OWNED BY public.customer_transactions.transaction_id;
          public          postgres    false    289            �            1259    16805    customer_wishlist    TABLE     {  CREATE TABLE public.customer_wishlist (
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
       public         heap    postgres    false            �            1259    16810 !   customer_wishlist_wishlist_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customer_wishlist_wishlist_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.customer_wishlist_wishlist_id_seq;
       public          postgres    false    235            �           0    0 !   customer_wishlist_wishlist_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.customer_wishlist_wishlist_id_seq OWNED BY public.customer_wishlist.wishlist_id;
          public          postgres    false    236            $           1259    50434    customerclaim    TABLE     1  CREATE TABLE public.customerclaim (
    customer_claim_id integer NOT NULL,
    customer_id integer,
    customer_claim_description text NOT NULL,
    customer_claim_status character varying(50) DEFAULT 'Pending'::character varying,
    customer_claim_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    customer_reply_description text,
    customer_reply_date timestamp without time zone,
    customer_closure_description text,
    customer_closure_date timestamp without time zone,
    customer_image_files jsonb,
    customer_video_files text
);
 !   DROP TABLE public.customerclaim;
       public         heap    postgres    false            #           1259    50433 #   customerclaim_customer_claim_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customerclaim_customer_claim_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public.customerclaim_customer_claim_id_seq;
       public          postgres    false    292            �           0    0 #   customerclaim_customer_claim_id_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public.customerclaim_customer_claim_id_seq OWNED BY public.customerclaim.customer_claim_id;
          public          postgres    false    291            �            1259    16811 	   customers    TABLE       CREATE TABLE public.customers (
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
    mogadishudistrict_customer text
);
    DROP TABLE public.customers;
       public         heap    postgres    false            �            1259    16819    customers_customer_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customers_customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.customers_customer_id_seq;
       public          postgres    false    237            �           0    0    customers_customer_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.customers_customer_id_seq OWNED BY public.customers.customer_id;
          public          postgres    false    238            �            1259    16820 "   fashionclothing_product_fac_id_seq    SEQUENCE     �   CREATE SEQUENCE public.fashionclothing_product_fac_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.fashionclothing_product_fac_id_seq;
       public          postgres    false    226            �           0    0 "   fashionclothing_product_fac_id_seq    SEQUENCE OWNED BY     b   ALTER SEQUENCE public.fashionclothing_product_fac_id_seq OWNED BY public.clothing.product_fac_id;
          public          postgres    false    239                       1259    17047 
   homebanner    TABLE     p   CREATE TABLE public.homebanner (
    id integer NOT NULL,
    banner_url text,
    title text,
    link text
);
    DROP TABLE public.homebanner;
       public         heap    postgres    false            
           1259    17046    homebanner_new_id_seq    SEQUENCE     �   CREATE SEQUENCE public.homebanner_new_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.homebanner_new_id_seq;
       public          postgres    false    267            �           0    0    homebanner_new_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.homebanner_new_id_seq OWNED BY public.homebanner.id;
          public          postgres    false    266            �            1259    16821    laptopcomputers    TABLE     <  CREATE TABLE public.laptopcomputers (
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
       public         heap    postgres    false            �            1259    16831 !   laptopcomputers_product_lc_id_seq    SEQUENCE     �   CREATE SEQUENCE public.laptopcomputers_product_lc_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.laptopcomputers_product_lc_id_seq;
       public          postgres    false    240            �           0    0 !   laptopcomputers_product_lc_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.laptopcomputers_product_lc_id_seq OWNED BY public.laptopcomputers.product_lc_id;
          public          postgres    false    241                       1259    34030    media_library    TABLE       CREATE TABLE public.media_library (
    media_id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    file_path character varying(255) NOT NULL,
    creation_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    vendor_id integer
);
 !   DROP TABLE public.media_library;
       public         heap    postgres    false                       1259    34029    media_library_media_id_seq    SEQUENCE     �   CREATE SEQUENCE public.media_library_media_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.media_library_media_id_seq;
       public          postgres    false    282            �           0    0    media_library_media_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.media_library_media_id_seq OWNED BY public.media_library.media_id;
          public          postgres    false    281                       1259    17619    messages    TABLE       CREATE TABLE public.messages (
    message_id integer NOT NULL,
    conversation_id integer NOT NULL,
    sender_id integer NOT NULL,
    recipient_id integer NOT NULL,
    content text NOT NULL,
    user_type text NOT NULL,
    "timestamp" timestamp with time zone
);
    DROP TABLE public.messages;
       public         heap    postgres    false                       1259    17618    messages_message_id_seq    SEQUENCE     �   CREATE SEQUENCE public.messages_message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.messages_message_id_seq;
       public          postgres    false    277            �           0    0    messages_message_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.messages_message_id_seq OWNED BY public.messages.message_id;
          public          postgres    false    276            �            1259    16832    mobileelectronics    TABLE     ,  CREATE TABLE public.mobileelectronics (
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
       public         heap    postgres    false                       1259    17588    mobilehomebanner    TABLE       CREATE TABLE public.mobilehomebanner (
    id integer NOT NULL,
    mobilebanner_url character varying(255) DEFAULT NULL::character varying,
    title character varying(100) DEFAULT NULL::character varying,
    link character varying(255) DEFAULT NULL::character varying
);
 $   DROP TABLE public.mobilehomebanner;
       public         heap    postgres    false                       1259    17587    mobilehomebanner_id_seq    SEQUENCE     �   CREATE SEQUENCE public.mobilehomebanner_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.mobilehomebanner_id_seq;
       public          postgres    false    273            �           0    0    mobilehomebanner_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.mobilehomebanner_id_seq OWNED BY public.mobilehomebanner.id;
          public          postgres    false    272            �            1259    16841    payments    TABLE     B  CREATE TABLE public.payments (
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
       public         heap    postgres    false            �            1259    16846    payments_payment_id_seq    SEQUENCE     �   CREATE SEQUENCE public.payments_payment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.payments_payment_id_seq;
       public          postgres    false    243            �           0    0    payments_payment_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.payments_payment_id_seq OWNED BY public.payments.payment_id;
          public          postgres    false    244            �            1259    16847 ,   product_mobile_electronics_product_me_id_seq    SEQUENCE     �   CREATE SEQUENCE public.product_mobile_electronics_product_me_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 C   DROP SEQUENCE public.product_mobile_electronics_product_me_id_seq;
       public          postgres    false    242            �           0    0 ,   product_mobile_electronics_product_me_id_seq    SEQUENCE OWNED BY     t   ALTER SEQUENCE public.product_mobile_electronics_product_me_id_seq OWNED BY public.mobileelectronics.product_me_id;
          public          postgres    false    245            �            1259    16848    products    TABLE     �  CREATE TABLE public.products (
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
    additonal_condition text,
    mogadishudistrict_ship_from character varying(255)
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    16854    products_id_seq    SEQUENCE     �   CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.products_id_seq;
       public          postgres    false    246            �           0    0    products_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;
          public          postgres    false    247            �            1259    16855    ratings_and_reviews    TABLE     	  CREATE TABLE public.ratings_and_reviews (
    id integer NOT NULL,
    vendor_id integer,
    customer_id integer,
    rating integer,
    review_text text,
    medias text[],
    created_at timestamp without time zone,
    product_uniqueid text,
    label text
);
 '   DROP TABLE public.ratings_and_reviews;
       public         heap    postgres    false            �            1259    16860    ratings_and_reviews_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ratings_and_reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.ratings_and_reviews_id_seq;
       public          postgres    false    248            �           0    0    ratings_and_reviews_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.ratings_and_reviews_id_seq OWNED BY public.ratings_and_reviews.id;
          public          postgres    false    249            �            1259    16861    social_logins    TABLE     �   CREATE TABLE public.social_logins (
    login_id integer NOT NULL,
    customer_id integer NOT NULL,
    provider character varying(50) NOT NULL,
    provider_user_id character varying(255) NOT NULL
);
 !   DROP TABLE public.social_logins;
       public         heap    postgres    false            �            1259    16864    social_logins_login_id_seq    SEQUENCE     �   CREATE SEQUENCE public.social_logins_login_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.social_logins_login_id_seq;
       public          postgres    false    250            �           0    0    social_logins_login_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.social_logins_login_id_seq OWNED BY public.social_logins.login_id;
          public          postgres    false    251            �            1259    16865    subcategories    TABLE     �  CREATE TABLE public.subcategories (
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
       public         heap    postgres    false            �            1259    16872     subcategories_subcategory_id_seq    SEQUENCE     �   CREATE SEQUENCE public.subcategories_subcategory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.subcategories_subcategory_id_seq;
       public          postgres    false    252            �           0    0     subcategories_subcategory_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.subcategories_subcategory_id_seq OWNED BY public.subcategories.subcategory_id;
          public          postgres    false    253            �            1259    16873 
   superadmin    TABLE       CREATE TABLE public.superadmin (
    id integer NOT NULL,
    email character varying(255),
    password character varying(255),
    "userId" character varying(255),
    role_id integer[],
    "position" character varying(255),
    name character varying(255)
);
    DROP TABLE public.superadmin;
       public         heap    postgres    false            �            1259    16878    superadmin_id_seq    SEQUENCE     �   CREATE SEQUENCE public.superadmin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.superadmin_id_seq;
       public          postgres    false    254            �           0    0    superadmin_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.superadmin_id_seq OWNED BY public.superadmin.id;
          public          postgres    false    255                       1259    17676    transactions    TABLE     �  CREATE TABLE public.transactions (
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
       public         heap    postgres    false                       1259    17675    transactions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.transactions_id_seq;
       public          postgres    false    279            �           0    0    transactions_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.transactions_id_seq OWNED BY public.transactions.id;
          public          postgres    false    278                       1259    17695    transactions_id_seqs    SEQUENCE     }   CREATE SEQUENCE public.transactions_id_seqs
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.transactions_id_seqs;
       public          postgres    false                        1259    16879    variantproducts    TABLE       CREATE TABLE public.variantproducts (
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
       public         heap    postgres    false                       1259    16884    variantproducts_variant_id_seq    SEQUENCE     �   CREATE SEQUENCE public.variantproducts_variant_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.variantproducts_variant_id_seq;
       public          postgres    false    256            �           0    0    variantproducts_variant_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.variantproducts_variant_id_seq OWNED BY public.variantproducts.variant_id;
          public          postgres    false    257                       1259    42480    vendorbulkupload    TABLE     �   CREATE TABLE public.vendorbulkupload (
    bulk_id integer NOT NULL,
    vendor_id integer,
    productids integer[],
    datetime timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    status text
);
 $   DROP TABLE public.vendorbulkupload;
       public         heap    postgres    false                       1259    42479    vendorbulkupload_bulk_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vendorbulkupload_bulk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.vendorbulkupload_bulk_id_seq;
       public          postgres    false    286            �           0    0    vendorbulkupload_bulk_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.vendorbulkupload_bulk_id_seq OWNED BY public.vendorbulkupload.bulk_id;
          public          postgres    false    285                       1259    17517    vendorclaim    TABLE     �  CREATE TABLE public.vendorclaim (
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
       public         heap    postgres    false                       1259    17516    vendorclaim_claim_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vendorclaim_claim_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.vendorclaim_claim_id_seq;
       public          postgres    false    271            �           0    0    vendorclaim_claim_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.vendorclaim_claim_id_seq OWNED BY public.vendorclaim.claim_id;
          public          postgres    false    270                       1259    42469    vendorpolicies    TABLE     �   CREATE TABLE public.vendorpolicies (
    vendorpolicy_id integer NOT NULL,
    shipping_information character varying(5000),
    return_policy character varying(5000),
    business_policy character varying(5000),
    vendor_id integer
);
 "   DROP TABLE public.vendorpolicies;
       public         heap    postgres    false                       1259    42468 "   vendorpolicies_vendorpolicy_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vendorpolicies_vendorpolicy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.vendorpolicies_vendorpolicy_id_seq;
       public          postgres    false    284            �           0    0 "   vendorpolicies_vendorpolicy_id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.vendorpolicies_vendorpolicy_id_seq OWNED BY public.vendorpolicies.vendorpolicy_id;
          public          postgres    false    283                       1259    16885    vendorproductorder    TABLE     �  CREATE TABLE public.vendorproductorder (
    order_id integer NOT NULL,
    vendor_id integer,
    product_uniqueid integer,
    customer_id integer,
    order_date timestamp without time zone,
    total_amount numeric(10,2),
    order_status character varying(50),
    rejection_reason text,
    product_name character varying(255),
    customer_name character varying(255),
    product_image text,
    customer_email character varying(255),
    customer_phone_number character varying(20),
    created_at timestamp without time zone DEFAULT now(),
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
    skuid_order text
);
 &   DROP TABLE public.vendorproductorder;
       public         heap    postgres    false                       1259    16892    vendorproductorder_order_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vendorproductorder_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.vendorproductorder_order_id_seq;
       public          postgres    false    258            �           0    0    vendorproductorder_order_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.vendorproductorder_order_id_seq OWNED BY public.vendorproductorder.order_id;
          public          postgres    false    259                       1259    16893    vendors    TABLE     	  CREATE TABLE public.vendors (
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
    vendor_username text
);
    DROP TABLE public.vendors;
       public         heap    postgres    false                       1259    16899    vendors_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vendors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.vendors_id_seq;
       public          postgres    false    260            �           0    0    vendors_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.vendors_id_seq OWNED BY public.vendors.id;
          public          postgres    false    261                       1259    16900    vendors_notifications    TABLE     �   CREATE TABLE public.vendors_notifications (
    id integer NOT NULL,
    vendor_id integer NOT NULL,
    type character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    message text NOT NULL,
    date text NOT NULL
);
 )   DROP TABLE public.vendors_notifications;
       public         heap    postgres    false                       1259    16905    vendors_notifications_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vendors_notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.vendors_notifications_id_seq;
       public          postgres    false    262            �           0    0    vendors_notifications_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.vendors_notifications_id_seq OWNED BY public.vendors_notifications.id;
          public          postgres    false    263                       1259    16906    withdrawals    TABLE       CREATE TABLE public.withdrawals (
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
       public         heap    postgres    false            	           1259    16911    withdrawals_withdrawal_id_seq    SEQUENCE     �   CREATE SEQUENCE public.withdrawals_withdrawal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.withdrawals_withdrawal_id_seq;
       public          postgres    false    264            �           0    0    withdrawals_withdrawal_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.withdrawals_withdrawal_id_seq OWNED BY public.withdrawals.withdrawal_id;
          public          postgres    false    265            (           2604    50450    apploadingscreen id    DEFAULT     z   ALTER TABLE ONLY public.apploadingscreen ALTER COLUMN id SET DEFAULT nextval('public.apploadingscreen_id_seq'::regclass);
 B   ALTER TABLE public.apploadingscreen ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    287    288    288            �           2604    50451    attributes attribute_id    DEFAULT     �   ALTER TABLE ONLY public.attributes ALTER COLUMN attribute_id SET DEFAULT nextval('public.attributes_attribute_id_seq'::regclass);
 F   ALTER TABLE public.attributes ALTER COLUMN attribute_id DROP DEFAULT;
       public          postgres    false    217    216            �           2604    50452    audioheadphones product_ah_id    DEFAULT     �   ALTER TABLE ONLY public.audioheadphones ALTER COLUMN product_ah_id SET DEFAULT nextval('public.audio_headphones_product_ah_id_seq'::regclass);
 L   ALTER TABLE public.audioheadphones ALTER COLUMN product_ah_id DROP DEFAULT;
       public          postgres    false    219    218            �           2604    50453    cameraphotography product_cp_id    DEFAULT     �   ALTER TABLE ONLY public.cameraphotography ALTER COLUMN product_cp_id SET DEFAULT nextval('public.camera_photography_product_cp_id_seq'::regclass);
 N   ALTER TABLE public.cameraphotography ALTER COLUMN product_cp_id DROP DEFAULT;
       public          postgres    false    221    220            �           2604    50454    cart cart_id    DEFAULT     l   ALTER TABLE ONLY public.cart ALTER COLUMN cart_id SET DEFAULT nextval('public.cart_cart_id_seq'::regclass);
 ;   ALTER TABLE public.cart ALTER COLUMN cart_id DROP DEFAULT;
       public          postgres    false    223    222            �           2604    50455    categories category_id    DEFAULT     �   ALTER TABLE ONLY public.categories ALTER COLUMN category_id SET DEFAULT nextval('public.categories_category_id_seq'::regclass);
 E   ALTER TABLE public.categories ALTER COLUMN category_id DROP DEFAULT;
       public          postgres    false    225    224            �           2604    50456    clothing product_fac_id    DEFAULT     �   ALTER TABLE ONLY public.clothing ALTER COLUMN product_fac_id SET DEFAULT nextval('public.fashionclothing_product_fac_id_seq'::regclass);
 F   ALTER TABLE public.clothing ALTER COLUMN product_fac_id DROP DEFAULT;
       public          postgres    false    239    226                       2604    50457    conversations conversation_id    DEFAULT     �   ALTER TABLE ONLY public.conversations ALTER COLUMN conversation_id SET DEFAULT nextval('public.conversations_conversation_id_seq'::regclass);
 L   ALTER TABLE public.conversations ALTER COLUMN conversation_id DROP DEFAULT;
       public          postgres    false    275    274    275            �           2604    50458    coupons coupon_id    DEFAULT     v   ALTER TABLE ONLY public.coupons ALTER COLUMN coupon_id SET DEFAULT nextval('public.coupons_coupon_id_seq'::regclass);
 @   ALTER TABLE public.coupons ALTER COLUMN coupon_id DROP DEFAULT;
       public          postgres    false    228    227            �           2604    50459    currency_values id    DEFAULT     x   ALTER TABLE ONLY public.currency_values ALTER COLUMN id SET DEFAULT nextval('public.currency_values_id_seq'::regclass);
 A   ALTER TABLE public.currency_values ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    230    229                       2604    50460    customer_address address_id    DEFAULT     �   ALTER TABLE ONLY public.customer_address ALTER COLUMN address_id SET DEFAULT nextval('public.customer_address_address_id_seq'::regclass);
 J   ALTER TABLE public.customer_address ALTER COLUMN address_id DROP DEFAULT;
       public          postgres    false    269    268    269            �           2604    50461    customer_delivery_address id    DEFAULT     �   ALTER TABLE ONLY public.customer_delivery_address ALTER COLUMN id SET DEFAULT nextval('public.customer_delivery_address_id_seq'::regclass);
 K   ALTER TABLE public.customer_delivery_address ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    232    231            �           2604    50462    customer_follows follow_id    DEFAULT     �   ALTER TABLE ONLY public.customer_follows ALTER COLUMN follow_id SET DEFAULT nextval('public.customer_follows_follow_id_seq'::regclass);
 I   ALTER TABLE public.customer_follows ALTER COLUMN follow_id DROP DEFAULT;
       public          postgres    false    234    233            )           2604    50463 $   customer_transactions transaction_id    DEFAULT     �   ALTER TABLE ONLY public.customer_transactions ALTER COLUMN transaction_id SET DEFAULT nextval('public.customer_transactions_transaction_id_seq'::regclass);
 S   ALTER TABLE public.customer_transactions ALTER COLUMN transaction_id DROP DEFAULT;
       public          postgres    false    290    289    290            �           2604    50464    customer_wishlist wishlist_id    DEFAULT     �   ALTER TABLE ONLY public.customer_wishlist ALTER COLUMN wishlist_id SET DEFAULT nextval('public.customer_wishlist_wishlist_id_seq'::regclass);
 L   ALTER TABLE public.customer_wishlist ALTER COLUMN wishlist_id DROP DEFAULT;
       public          postgres    false    236    235            *           2604    50437    customerclaim customer_claim_id    DEFAULT     �   ALTER TABLE ONLY public.customerclaim ALTER COLUMN customer_claim_id SET DEFAULT nextval('public.customerclaim_customer_claim_id_seq'::regclass);
 N   ALTER TABLE public.customerclaim ALTER COLUMN customer_claim_id DROP DEFAULT;
       public          postgres    false    291    292    292            �           2604    50465    customers customer_id    DEFAULT     ~   ALTER TABLE ONLY public.customers ALTER COLUMN customer_id SET DEFAULT nextval('public.customers_customer_id_seq'::regclass);
 D   ALTER TABLE public.customers ALTER COLUMN customer_id DROP DEFAULT;
       public          postgres    false    238    237                       2604    50466    homebanner id    DEFAULT     r   ALTER TABLE ONLY public.homebanner ALTER COLUMN id SET DEFAULT nextval('public.homebanner_new_id_seq'::regclass);
 <   ALTER TABLE public.homebanner ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    267    266    267            �           2604    50467    laptopcomputers product_lc_id    DEFAULT     �   ALTER TABLE ONLY public.laptopcomputers ALTER COLUMN product_lc_id SET DEFAULT nextval('public.laptopcomputers_product_lc_id_seq'::regclass);
 L   ALTER TABLE public.laptopcomputers ALTER COLUMN product_lc_id DROP DEFAULT;
       public          postgres    false    241    240            #           2604    50468    media_library media_id    DEFAULT     �   ALTER TABLE ONLY public.media_library ALTER COLUMN media_id SET DEFAULT nextval('public.media_library_media_id_seq'::regclass);
 E   ALTER TABLE public.media_library ALTER COLUMN media_id DROP DEFAULT;
       public          postgres    false    282    281    282                       2604    50469    messages message_id    DEFAULT     z   ALTER TABLE ONLY public.messages ALTER COLUMN message_id SET DEFAULT nextval('public.messages_message_id_seq'::regclass);
 B   ALTER TABLE public.messages ALTER COLUMN message_id DROP DEFAULT;
       public          postgres    false    277    276    277            �           2604    50470    mobileelectronics product_me_id    DEFAULT     �   ALTER TABLE ONLY public.mobileelectronics ALTER COLUMN product_me_id SET DEFAULT nextval('public.product_mobile_electronics_product_me_id_seq'::regclass);
 N   ALTER TABLE public.mobileelectronics ALTER COLUMN product_me_id DROP DEFAULT;
       public          postgres    false    245    242                       2604    50471    mobilehomebanner id    DEFAULT     z   ALTER TABLE ONLY public.mobilehomebanner ALTER COLUMN id SET DEFAULT nextval('public.mobilehomebanner_id_seq'::regclass);
 B   ALTER TABLE public.mobilehomebanner ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    273    272    273                       2604    50472    payments payment_id    DEFAULT     z   ALTER TABLE ONLY public.payments ALTER COLUMN payment_id SET DEFAULT nextval('public.payments_payment_id_seq'::regclass);
 B   ALTER TABLE public.payments ALTER COLUMN payment_id DROP DEFAULT;
       public          postgres    false    244    243                       2604    50473    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    247    246                       2604    50474    ratings_and_reviews id    DEFAULT     �   ALTER TABLE ONLY public.ratings_and_reviews ALTER COLUMN id SET DEFAULT nextval('public.ratings_and_reviews_id_seq'::regclass);
 E   ALTER TABLE public.ratings_and_reviews ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    249    248                       2604    50475    social_logins login_id    DEFAULT     �   ALTER TABLE ONLY public.social_logins ALTER COLUMN login_id SET DEFAULT nextval('public.social_logins_login_id_seq'::regclass);
 E   ALTER TABLE public.social_logins ALTER COLUMN login_id DROP DEFAULT;
       public          postgres    false    251    250                       2604    50476    subcategories subcategory_id    DEFAULT     �   ALTER TABLE ONLY public.subcategories ALTER COLUMN subcategory_id SET DEFAULT nextval('public.subcategories_subcategory_id_seq'::regclass);
 K   ALTER TABLE public.subcategories ALTER COLUMN subcategory_id DROP DEFAULT;
       public          postgres    false    253    252            
           2604    50477    superadmin id    DEFAULT     n   ALTER TABLE ONLY public.superadmin ALTER COLUMN id SET DEFAULT nextval('public.superadmin_id_seq'::regclass);
 <   ALTER TABLE public.superadmin ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    255    254                        2604    50478    transactions id    DEFAULT     r   ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);
 >   ALTER TABLE public.transactions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    279    278    279                       2604    50479    variantproducts variant_id    DEFAULT     �   ALTER TABLE ONLY public.variantproducts ALTER COLUMN variant_id SET DEFAULT nextval('public.variantproducts_variant_id_seq'::regclass);
 I   ALTER TABLE public.variantproducts ALTER COLUMN variant_id DROP DEFAULT;
       public          postgres    false    257    256            &           2604    50480    vendorbulkupload bulk_id    DEFAULT     �   ALTER TABLE ONLY public.vendorbulkupload ALTER COLUMN bulk_id SET DEFAULT nextval('public.vendorbulkupload_bulk_id_seq'::regclass);
 G   ALTER TABLE public.vendorbulkupload ALTER COLUMN bulk_id DROP DEFAULT;
       public          postgres    false    286    285    286                       2604    50481    vendorclaim claim_id    DEFAULT     |   ALTER TABLE ONLY public.vendorclaim ALTER COLUMN claim_id SET DEFAULT nextval('public.vendorclaim_claim_id_seq'::regclass);
 C   ALTER TABLE public.vendorclaim ALTER COLUMN claim_id DROP DEFAULT;
       public          postgres    false    270    271    271            %           2604    50482    vendorpolicies vendorpolicy_id    DEFAULT     �   ALTER TABLE ONLY public.vendorpolicies ALTER COLUMN vendorpolicy_id SET DEFAULT nextval('public.vendorpolicies_vendorpolicy_id_seq'::regclass);
 M   ALTER TABLE public.vendorpolicies ALTER COLUMN vendorpolicy_id DROP DEFAULT;
       public          postgres    false    284    283    284                       2604    50483    vendorproductorder order_id    DEFAULT     �   ALTER TABLE ONLY public.vendorproductorder ALTER COLUMN order_id SET DEFAULT nextval('public.vendorproductorder_order_id_seq'::regclass);
 J   ALTER TABLE public.vendorproductorder ALTER COLUMN order_id DROP DEFAULT;
       public          postgres    false    259    258                       2604    50484 
   vendors id    DEFAULT     h   ALTER TABLE ONLY public.vendors ALTER COLUMN id SET DEFAULT nextval('public.vendors_id_seq'::regclass);
 9   ALTER TABLE public.vendors ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    261    260                       2604    50485    vendors_notifications id    DEFAULT     �   ALTER TABLE ONLY public.vendors_notifications ALTER COLUMN id SET DEFAULT nextval('public.vendors_notifications_id_seq'::regclass);
 G   ALTER TABLE public.vendors_notifications ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    263    262                       2604    50486    withdrawals withdrawal_id    DEFAULT     �   ALTER TABLE ONLY public.withdrawals ALTER COLUMN withdrawal_id SET DEFAULT nextval('public.withdrawals_withdrawal_id_seq'::regclass);
 H   ALTER TABLE public.withdrawals ALTER COLUMN withdrawal_id DROP DEFAULT;
       public          postgres    false    265    264            q          0    42678    apploadingscreen 
   TABLE DATA           >   COPY public.apploadingscreen (id, apploading_url) FROM stdin;
    public          postgres    false    288   �      )          0    16731 
   attributes 
   TABLE DATA           k   COPY public.attributes (attribute_id, attribute_name, attribute_values, category, subcategory) FROM stdin;
    public          postgres    false    216   Z�      +          0    16737    audioheadphones 
   TABLE DATA           r  COPY public.audioheadphones (product_ah_id, ad_title, currency_symbol, city, state, country, brand, category, vendorid, is_featured, is_sold, is_negotiable, created_at, rejection_reason, status, updated_at_product, uniquepid, category_type, subcategory, condition, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, driversize, impedance, frequencyrange, additionaldescription, searchkeywords, keyfeatures, videourl, salespackage, isvariant, quantity, postalcode, inthebox, images) FROM stdin;
    public          postgres    false    218   ��      -          0    16748    cameraphotography 
   TABLE DATA           �  COPY public.cameraphotography (product_cp_id, ad_title, currency_symbol, city, state, country, brand, category, vendorid, is_featured, is_sold, is_negotiable, created_at, subcategory, rejection_reason, status, updated_at_product, uniquepid, category_type, condition, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, modelname, storagetype, storagecapacity, displaysize, screenresolution, connectivityports, batterylife, dimensions, weight, warrantyinformation, additionaldescription, searchkeywords, keyfeatures, videourl, salespackage, isvariant, quantity, postalcode, inthebox, images) FROM stdin;
    public          postgres    false    220   ��      /          0    16759    cart 
   TABLE DATA           �   COPY public.cart (cart_id, customer_id, vendor_id, product_uniqueid, category, subcategory, quantity, addeddate, updateddate, variantlabel, mrp, sellingprice) FROM stdin;
    public          postgres    false    222   ��      1          0    16767 
   categories 
   TABLE DATA           �   COPY public.categories (category_id, category_name, category_description, category_image_url, category_status, created_at, updated_at, category_type) FROM stdin;
    public          postgres    false    224   ��      3          0    16776    clothing 
   TABLE DATA           q  COPY public.clothing (product_fac_id, ad_title, additionaldescription, countryoforigin, manufacturername, packerdetails, searchkeywords, keyfeatures, videourl, salespackage, city, state, mrp, sellingprice, quantity, inthebox, isvariant, status, category_type, currency_symbol, uniquepid, vendorid, postalcode, country, category, subcategory, skuid, images) FROM stdin;
    public          postgres    false    226   �      d          0    17600    conversations 
   TABLE DATA           h   COPY public.conversations (conversation_id, customer_id, vendor_id, conversation_user_type) FROM stdin;
    public          postgres    false    275   ��      4          0    16782    coupons 
   TABLE DATA           �   COPY public.coupons (coupon_id, coupon_code, discount_type, discount_amount, expiration_date, vendorid, associated_products, created_date) FROM stdin;
    public          postgres    false    227   �      6          0    16788    currency_values 
   TABLE DATA           K   COPY public.currency_values (id, usd, kes, eur, etb, sos, inr) FROM stdin;
    public          postgres    false    229   K�      ^          0    17057    customer_address 
   TABLE DATA             COPY public.customer_address (address_id, customer_id, given_name_address, family_name_address, email_address, phone_address, country_address, zip_address, city_address, subregion_address, region_address, note_address, default_address, apt_address, phone_code) FROM stdin;
    public          postgres    false    269   ��      8          0    16794    customer_delivery_address 
   TABLE DATA           �   COPY public.customer_delivery_address (id, customer_id, first_name, last_name, selected_country, street_address, apartment, selected_city, selected_state, zip_code, email, phone_number, orderid, unique_order_id) FROM stdin;
    public          postgres    false    231   �      :          0    16800    customer_follows 
   TABLE DATA           ]   COPY public.customer_follows (follow_id, follower_id, following_id, follow_date) FROM stdin;
    public          postgres    false    233   ��      s          0    42692    customer_transactions 
   TABLE DATA           �   COPY public.customer_transactions (transaction_id, customer_id, datetime, description, amount, closing_balance, wallet_txn_id, send_to_user, invoiceid, status, transaction_wallet_id) FROM stdin;
    public          postgres    false    290   ��      <          0    16805    customer_wishlist 
   TABLE DATA           �   COPY public.customer_wishlist (wishlist_id, customer_id, uniqueid, label, category, subcategory, vendor_id, mrp, sellingprice, created_on) FROM stdin;
    public          postgres    false    235   ��      u          0    50434    customerclaim 
   TABLE DATA           !  COPY public.customerclaim (customer_claim_id, customer_id, customer_claim_description, customer_claim_status, customer_claim_date, customer_reply_description, customer_reply_date, customer_closure_description, customer_closure_date, customer_image_files, customer_video_files) FROM stdin;
    public          postgres    false    292   ��      >          0    16811 	   customers 
   TABLE DATA           l  COPY public.customers (customer_id, given_name, family_name, email, password, phone_number, address_line_1, address_line_2, city, state, zip_code, country, bio, verified_with, created_at, updated_at, status, picture, google_id, facebook_id, verification_code, verification_expire_date, customer_loggedid, customer_interest, mogadishudistrict_customer) FROM stdin;
    public          postgres    false    237   ��      \          0    17047 
   homebanner 
   TABLE DATA           A   COPY public.homebanner (id, banner_url, title, link) FROM stdin;
    public          postgres    false    267   �      A          0    16821    laptopcomputers 
   TABLE DATA           #  COPY public.laptopcomputers (product_lc_id, ad_title, currency_symbol, city, state, country, brand, category, vendorid, is_featured, is_sold, is_negotiable, created_at, subcategory, rejection_reason, status, updated_at_product, uniquepid, category_type, condition, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, additionaldescription, searchkeywords, salespackage, keyfeatures, videourl, modelname, processor, ram, storagetype, storagecapacity, displaysize, screenresolution, graphicscard, operatingsystem, connectivityports, batterylife, keyboardtype, touchpad, dimensions, weight, warrantyinformation, isvariant, quantity, postalcode, inthebox, images) FROM stdin;
    public          postgres    false    240   ��      k          0    34030    media_library 
   TABLE DATA           j   COPY public.media_library (media_id, title, description, file_path, creation_date, vendor_id) FROM stdin;
    public          postgres    false    282   �       f          0    17619    messages 
   TABLE DATA           y   COPY public.messages (message_id, conversation_id, sender_id, recipient_id, content, user_type, "timestamp") FROM stdin;
    public          postgres    false    277   r      C          0    16832    mobileelectronics 
   TABLE DATA             COPY public.mobileelectronics (product_me_id, ad_title, created_at, updated_at, city, state, country, currency_symbol, category, subcategory, condition, brand, is_featured, vendorid, rejection_reason, status, uniquepid, category_type, modelname, storagetype, storagecapacity, displaysize, connectivityports, batterylife, dimensions, weight, warrantyinformation, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, additionaldescription, searchkeywords, keyfeatures, videourl, salespackage, isvariant, quantity, processor, ram, graphicscard, operatingsystem, keyboardtype, postalcode, simcard, unlockstatus, cameraresolution, inthebox, images) FROM stdin;
    public          postgres    false    242   =      b          0    17588    mobilehomebanner 
   TABLE DATA           M   COPY public.mobilehomebanner (id, mobilebanner_url, title, link) FROM stdin;
    public          postgres    false    273   �      D          0    16841    payments 
   TABLE DATA           �   COPY public.payments (payment_id, customer_id, order_id, payment_date, payment_method, payment_amount, payment_status, billing_address, billing_city, billing_state, billing_zip, currency_code, payment_source, vendor_id) FROM stdin;
    public          postgres    false    243         G          0    16848    products 
   TABLE DATA           l  COPY public.products (id, ad_title, city, state, country, currency_symbol, category, subcategory, vendorid, uniquepid, skuid, mrp, sellingprice, countryoforigin, manufacturername, packerdetails, additionaldescription, searchkeywords, keyfeatures, videourl, category_type, quantity, postalcode, salespackage, brand, condition, isvariant, status, updated_at_product, rejection_reason, slug_subcat, slug_cat, images, attributes_specification, prod_slug, width, length, height, weight, product_ship_from, estimate_delivery_by, nested_subcat, nested_subcat_slug, additonal_condition, mogadishudistrict_ship_from) FROM stdin;
    public          postgres    false    246   _      I          0    16855    ratings_and_reviews 
   TABLE DATA           �   COPY public.ratings_and_reviews (id, vendor_id, customer_id, rating, review_text, medias, created_at, product_uniqueid, label) FROM stdin;
    public          postgres    false    248   f*      K          0    16861    social_logins 
   TABLE DATA           Z   COPY public.social_logins (login_id, customer_id, provider, provider_user_id) FROM stdin;
    public          postgres    false    250   �+      M          0    16865    subcategories 
   TABLE DATA           �   COPY public.subcategories (subcategory_id, subcategory_name, subcategory_description, subcategory_image_url, parent_category_id, created_at, updated_at, isfeatured, subcat_status, nested_subcategories) FROM stdin;
    public          postgres    false    252   ,      O          0    16873 
   superadmin 
   TABLE DATA           ^   COPY public.superadmin (id, email, password, "userId", role_id, "position", name) FROM stdin;
    public          postgres    false    254   �=      h          0    17676    transactions 
   TABLE DATA           �   COPY public.transactions (id, transaction_id, customer_id, transaction_external_id, amount, currency_code, transaction_date, is_verified, verification_date, payment_method, notes) FROM stdin;
    public          postgres    false    279   ]?      Q          0    16879    variantproducts 
   TABLE DATA           �   COPY public.variantproducts (variant_id, product_uniqueid, variant_mrp, variant_sellingprice, variant_skuid, variant_quantity, variantsvalues, label, vendori_id, variant_category, variant_subcategory) FROM stdin;
    public          postgres    false    256   �@      o          0    42480    vendorbulkupload 
   TABLE DATA           \   COPY public.vendorbulkupload (bulk_id, vendor_id, productids, datetime, status) FROM stdin;
    public          postgres    false    286   2A      `          0    17517    vendorclaim 
   TABLE DATA           �   COPY public.vendorclaim (claim_id, vendor_id, claim_description, claim_status, claim_date, reply_description, reply_date, closure_description, closure_date, image_files, video_files) FROM stdin;
    public          postgres    false    271   qB      m          0    42469    vendorpolicies 
   TABLE DATA           z   COPY public.vendorpolicies (vendorpolicy_id, shipping_information, return_policy, business_policy, vendor_id) FROM stdin;
    public          postgres    false    284   �C      S          0    16885    vendorproductorder 
   TABLE DATA             COPY public.vendorproductorder (order_id, vendor_id, product_uniqueid, customer_id, order_date, total_amount, order_status, rejection_reason, product_name, customer_name, product_image, customer_email, customer_phone_number, created_at, currency_symbol, payment_method, payment_status, city, state, country, brand, category, subcategory, product_type, transaction_id, commission_fee, withdrawal_amount, refund_amount, fees_paid, tax_collected, orderid, quantity, label, tentative_delivery_date, skuid_order) FROM stdin;
    public          postgres    false    258   �C      U          0    16893    vendors 
   TABLE DATA           �  COPY public.vendors (id, country_code, mobile_number, email, password, brand_name, business_model, products, trademark_certificate, company_name, company_city, company_state, company_country, company_zip_code, shipping_address, bank_name, bank_account_number, bank_routing_number, bank_account_name, bank_branch, bank_swift_code, registration_date, mobile_verification_status, email_verification_status, status, business_type, registration_number, tax_id_number, business_address, business_phone, business_email, business_website, business_description, facebook_url, instagram_url, twitter_url, linkedin_url, business_logo_url, business_license_url, return_policy, shipping_policy, terms_and_conditions, payment_info, shipping_info, support_contact, categories, average_rating, total_products, total_sales, support_contact_1, support_contact_2, vendor_profile_picture_url, brand_logo, useridvendor, vendorname, email_otp, mobile_otp, reset_otp, followers, following, vendor_username) FROM stdin;
    public          postgres    false    260    N      W          0    16900    vendors_notifications 
   TABLE DATA           Z   COPY public.vendors_notifications (id, vendor_id, type, title, message, date) FROM stdin;
    public          postgres    false    262   �R      Y          0    16906    withdrawals 
   TABLE DATA           �   COPY public.withdrawals (withdrawal_id, vendor_id, currency_code, amount, withdrawal_date, status, bank_account_number, bank_name, bank_branch, created_at, updated_at) FROM stdin;
    public          postgres    false    264   �V      �           0    0    apploadingscreen_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.apploadingscreen_id_seq', 1, false);
          public          postgres    false    287            �           0    0    attributes_attribute_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.attributes_attribute_id_seq', 19, true);
          public          postgres    false    217            �           0    0 "   audio_headphones_product_ah_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.audio_headphones_product_ah_id_seq', 45, true);
          public          postgres    false    219            �           0    0 $   camera_photography_product_cp_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.camera_photography_product_cp_id_seq', 41, true);
          public          postgres    false    221            �           0    0    cart_cart_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.cart_cart_id_seq', 730, true);
          public          postgres    false    223            �           0    0    categories_category_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.categories_category_id_seq', 129, true);
          public          postgres    false    225            �           0    0 !   conversations_conversation_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.conversations_conversation_id_seq', 6, true);
          public          postgres    false    274            �           0    0    coupons_coupon_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.coupons_coupon_id_seq', 9, true);
          public          postgres    false    228            �           0    0    currency_values_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.currency_values_id_seq', 1, true);
          public          postgres    false    230            �           0    0    customer_address_address_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.customer_address_address_id_seq', 34, true);
          public          postgres    false    268            �           0    0     customer_delivery_address_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.customer_delivery_address_id_seq', 177, true);
          public          postgres    false    232            �           0    0    customer_follows_follow_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.customer_follows_follow_id_seq', 19, true);
          public          postgres    false    234            �           0    0 (   customer_transactions_transaction_id_seq    SEQUENCE SET     V   SELECT pg_catalog.setval('public.customer_transactions_transaction_id_seq', 3, true);
          public          postgres    false    289            �           0    0 !   customer_wishlist_wishlist_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.customer_wishlist_wishlist_id_seq', 126, true);
          public          postgres    false    236            �           0    0 #   customerclaim_customer_claim_id_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.customerclaim_customer_claim_id_seq', 36, true);
          public          postgres    false    291            �           0    0    customers_customer_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.customers_customer_id_seq', 184, true);
          public          postgres    false    238            �           0    0 "   fashionclothing_product_fac_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.fashionclothing_product_fac_id_seq', 8, true);
          public          postgres    false    239            �           0    0    homebanner_new_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.homebanner_new_id_seq', 10, true);
          public          postgres    false    266            �           0    0 !   laptopcomputers_product_lc_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.laptopcomputers_product_lc_id_seq', 121, true);
          public          postgres    false    241            �           0    0    media_library_media_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.media_library_media_id_seq', 3722, true);
          public          postgres    false    281            �           0    0    messages_message_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.messages_message_id_seq', 168, true);
          public          postgres    false    276            �           0    0    mobilehomebanner_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.mobilehomebanner_id_seq', 10, true);
          public          postgres    false    272            �           0    0    payments_payment_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.payments_payment_id_seq', 77, true);
          public          postgres    false    244            �           0    0 ,   product_mobile_electronics_product_me_id_seq    SEQUENCE SET     \   SELECT pg_catalog.setval('public.product_mobile_electronics_product_me_id_seq', 365, true);
          public          postgres    false    245            �           0    0    products_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.products_id_seq', 101317, true);
          public          postgres    false    247            �           0    0    ratings_and_reviews_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.ratings_and_reviews_id_seq', 144, true);
          public          postgres    false    249            �           0    0    social_logins_login_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.social_logins_login_id_seq', 1, false);
          public          postgres    false    251            �           0    0     subcategories_subcategory_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.subcategories_subcategory_id_seq', 218, true);
          public          postgres    false    253            �           0    0    superadmin_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.superadmin_id_seq', 22, true);
          public          postgres    false    255            �           0    0    transactions_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.transactions_id_seq', 15, true);
          public          postgres    false    278            �           0    0    transactions_id_seqs    SEQUENCE SET     C   SELECT pg_catalog.setval('public.transactions_id_seqs', 15, true);
          public          postgres    false    280            �           0    0    variantproducts_variant_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.variantproducts_variant_id_seq', 234, true);
          public          postgres    false    257            �           0    0    vendorbulkupload_bulk_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.vendorbulkupload_bulk_id_seq', 481, true);
          public          postgres    false    285            �           0    0    vendorclaim_claim_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.vendorclaim_claim_id_seq', 17, true);
          public          postgres    false    270            �           0    0 "   vendorpolicies_vendorpolicy_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.vendorpolicies_vendorpolicy_id_seq', 1, true);
          public          postgres    false    283            �           0    0    vendorproductorder_order_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.vendorproductorder_order_id_seq', 200, true);
          public          postgres    false    259            �           0    0    vendors_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.vendors_id_seq', 69, true);
          public          postgres    false    261            �           0    0    vendors_notifications_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.vendors_notifications_id_seq', 83, true);
          public          postgres    false    263            �           0    0    withdrawals_withdrawal_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.withdrawals_withdrawal_id_seq', 6, true);
          public          postgres    false    265            �           2606    42685 &   apploadingscreen apploadingscreen_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.apploadingscreen
    ADD CONSTRAINT apploadingscreen_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.apploadingscreen DROP CONSTRAINT apploadingscreen_pkey;
       public            postgres    false    288            1           2606    16938    attributes attributes_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.attributes
    ADD CONSTRAINT attributes_pkey PRIMARY KEY (attribute_id);
 D   ALTER TABLE ONLY public.attributes DROP CONSTRAINT attributes_pkey;
       public            postgres    false    216            3           2606    16940 %   audioheadphones audio_headphones_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.audioheadphones
    ADD CONSTRAINT audio_headphones_pkey PRIMARY KEY (product_ah_id);
 O   ALTER TABLE ONLY public.audioheadphones DROP CONSTRAINT audio_headphones_pkey;
       public            postgres    false    218            5           2606    16942 )   cameraphotography camera_photography_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.cameraphotography
    ADD CONSTRAINT camera_photography_pkey PRIMARY KEY (product_cp_id);
 S   ALTER TABLE ONLY public.cameraphotography DROP CONSTRAINT camera_photography_pkey;
       public            postgres    false    220            7           2606    16944    cart cart_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (cart_id);
 8   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_pkey;
       public            postgres    false    222            9           2606    16946    categories categories_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public            postgres    false    224            v           2606    17607 5   conversations conversations_customer_id_vendor_id_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_customer_id_vendor_id_key UNIQUE (customer_id, vendor_id);
 _   ALTER TABLE ONLY public.conversations DROP CONSTRAINT conversations_customer_id_vendor_id_key;
       public            postgres    false    275    275            x           2606    17605     conversations conversations_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_pkey PRIMARY KEY (conversation_id);
 J   ALTER TABLE ONLY public.conversations DROP CONSTRAINT conversations_pkey;
       public            postgres    false    275            =           2606    16948    coupons coupons_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_pkey PRIMARY KEY (coupon_id);
 >   ALTER TABLE ONLY public.coupons DROP CONSTRAINT coupons_pkey;
       public            postgres    false    227            ?           2606    16950 $   currency_values currency_values_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.currency_values
    ADD CONSTRAINT currency_values_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.currency_values DROP CONSTRAINT currency_values_pkey;
       public            postgres    false    229            p           2606    17064 &   customer_address customer_address_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.customer_address
    ADD CONSTRAINT customer_address_pkey PRIMARY KEY (address_id);
 P   ALTER TABLE ONLY public.customer_address DROP CONSTRAINT customer_address_pkey;
       public            postgres    false    269            A           2606    16952 8   customer_delivery_address customer_delivery_address_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public.customer_delivery_address
    ADD CONSTRAINT customer_delivery_address_pkey PRIMARY KEY (id);
 b   ALTER TABLE ONLY public.customer_delivery_address DROP CONSTRAINT customer_delivery_address_pkey;
       public            postgres    false    231            C           2606    16954 &   customer_follows customer_follows_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.customer_follows
    ADD CONSTRAINT customer_follows_pkey PRIMARY KEY (follow_id);
 P   ALTER TABLE ONLY public.customer_follows DROP CONSTRAINT customer_follows_pkey;
       public            postgres    false    233            �           2606    42699 0   customer_transactions customer_transactions_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public.customer_transactions
    ADD CONSTRAINT customer_transactions_pkey PRIMARY KEY (transaction_id);
 Z   ALTER TABLE ONLY public.customer_transactions DROP CONSTRAINT customer_transactions_pkey;
       public            postgres    false    290            E           2606    16956 (   customer_wishlist customer_wishlist_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.customer_wishlist
    ADD CONSTRAINT customer_wishlist_pkey PRIMARY KEY (wishlist_id);
 R   ALTER TABLE ONLY public.customer_wishlist DROP CONSTRAINT customer_wishlist_pkey;
       public            postgres    false    235            �           2606    50443     customerclaim customerclaim_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.customerclaim
    ADD CONSTRAINT customerclaim_pkey PRIMARY KEY (customer_claim_id);
 J   ALTER TABLE ONLY public.customerclaim DROP CONSTRAINT customerclaim_pkey;
       public            postgres    false    292            H           2606    16958    customers customers_email_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_email_key UNIQUE (email);
 G   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_email_key;
       public            postgres    false    237            J           2606    16960    customers customers_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (customer_id);
 B   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_pkey;
       public            postgres    false    237            ;           2606    16962    clothing fashionclothing_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.clothing
    ADD CONSTRAINT fashionclothing_pkey PRIMARY KEY (product_fac_id);
 G   ALTER TABLE ONLY public.clothing DROP CONSTRAINT fashionclothing_pkey;
       public            postgres    false    226            n           2606    17054    homebanner homebanner_new_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.homebanner
    ADD CONSTRAINT homebanner_new_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.homebanner DROP CONSTRAINT homebanner_new_pkey;
       public            postgres    false    267            L           2606    16964 $   laptopcomputers laptopcomputers_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.laptopcomputers
    ADD CONSTRAINT laptopcomputers_pkey PRIMARY KEY (product_lc_id);
 N   ALTER TABLE ONLY public.laptopcomputers DROP CONSTRAINT laptopcomputers_pkey;
       public            postgres    false    240                       2606    34038     media_library media_library_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.media_library
    ADD CONSTRAINT media_library_pkey PRIMARY KEY (media_id);
 J   ALTER TABLE ONLY public.media_library DROP CONSTRAINT media_library_pkey;
       public            postgres    false    282            z           2606    17627    messages messages_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (message_id);
 @   ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_pkey;
       public            postgres    false    277            t           2606    17598 &   mobilehomebanner mobilehomebanner_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.mobilehomebanner
    ADD CONSTRAINT mobilehomebanner_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.mobilehomebanner DROP CONSTRAINT mobilehomebanner_pkey;
       public            postgres    false    273            P           2606    16966    payments payments_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (payment_id);
 @   ALTER TABLE ONLY public.payments DROP CONSTRAINT payments_pkey;
       public            postgres    false    243            N           2606    16968 1   mobileelectronics product_mobile_electronics_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public.mobileelectronics
    ADD CONSTRAINT product_mobile_electronics_pkey PRIMARY KEY (product_me_id);
 [   ALTER TABLE ONLY public.mobileelectronics DROP CONSTRAINT product_mobile_electronics_pkey;
       public            postgres    false    242            R           2606    16970    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    246            X           2606    16972 ,   ratings_and_reviews ratings_and_reviews_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.ratings_and_reviews
    ADD CONSTRAINT ratings_and_reviews_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.ratings_and_reviews DROP CONSTRAINT ratings_and_reviews_pkey;
       public            postgres    false    248            Z           2606    16974 4   social_logins social_logins_customer_id_provider_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.social_logins
    ADD CONSTRAINT social_logins_customer_id_provider_key UNIQUE (customer_id, provider);
 ^   ALTER TABLE ONLY public.social_logins DROP CONSTRAINT social_logins_customer_id_provider_key;
       public            postgres    false    250    250            \           2606    16976     social_logins social_logins_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.social_logins
    ADD CONSTRAINT social_logins_pkey PRIMARY KEY (login_id);
 J   ALTER TABLE ONLY public.social_logins DROP CONSTRAINT social_logins_pkey;
       public            postgres    false    250            ^           2606    16978     subcategories subcategories_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.subcategories
    ADD CONSTRAINT subcategories_pkey PRIMARY KEY (subcategory_id);
 J   ALTER TABLE ONLY public.subcategories DROP CONSTRAINT subcategories_pkey;
       public            postgres    false    252            `           2606    16980    superadmin superadmin_email_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.superadmin
    ADD CONSTRAINT superadmin_email_key UNIQUE (email);
 I   ALTER TABLE ONLY public.superadmin DROP CONSTRAINT superadmin_email_key;
       public            postgres    false    254            b           2606    16982    superadmin superadmin_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.superadmin
    ADD CONSTRAINT superadmin_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.superadmin DROP CONSTRAINT superadmin_pkey;
       public            postgres    false    254            }           2606    17688    transactions transactions_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.transactions DROP CONSTRAINT transactions_pkey;
       public            postgres    false    279            T           2606    34053    products unique_skuid_vendorid 
   CONSTRAINT     d   ALTER TABLE ONLY public.products
    ADD CONSTRAINT unique_skuid_vendorid UNIQUE (skuid, vendorid);
 H   ALTER TABLE ONLY public.products DROP CONSTRAINT unique_skuid_vendorid;
       public            postgres    false    246    246            d           2606    16984 $   variantproducts variantproducts_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.variantproducts
    ADD CONSTRAINT variantproducts_pkey PRIMARY KEY (variant_id);
 N   ALTER TABLE ONLY public.variantproducts DROP CONSTRAINT variantproducts_pkey;
       public            postgres    false    256            �           2606    42488 &   vendorbulkupload vendorbulkupload_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.vendorbulkupload
    ADD CONSTRAINT vendorbulkupload_pkey PRIMARY KEY (bulk_id);
 P   ALTER TABLE ONLY public.vendorbulkupload DROP CONSTRAINT vendorbulkupload_pkey;
       public            postgres    false    286            r           2606    17526    vendorclaim vendorclaim_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.vendorclaim
    ADD CONSTRAINT vendorclaim_pkey PRIMARY KEY (claim_id);
 F   ALTER TABLE ONLY public.vendorclaim DROP CONSTRAINT vendorclaim_pkey;
       public            postgres    false    271            �           2606    42476 "   vendorpolicies vendorpolicies_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.vendorpolicies
    ADD CONSTRAINT vendorpolicies_pkey PRIMARY KEY (vendorpolicy_id);
 L   ALTER TABLE ONLY public.vendorpolicies DROP CONSTRAINT vendorpolicies_pkey;
       public            postgres    false    284            f           2606    16986 *   vendorproductorder vendorproductorder_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.vendorproductorder
    ADD CONSTRAINT vendorproductorder_pkey PRIMARY KEY (order_id);
 T   ALTER TABLE ONLY public.vendorproductorder DROP CONSTRAINT vendorproductorder_pkey;
       public            postgres    false    258            j           2606    16988 0   vendors_notifications vendors_notifications_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.vendors_notifications
    ADD CONSTRAINT vendors_notifications_pkey PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public.vendors_notifications DROP CONSTRAINT vendors_notifications_pkey;
       public            postgres    false    262            h           2606    16990    vendors vendors_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.vendors
    ADD CONSTRAINT vendors_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.vendors DROP CONSTRAINT vendors_pkey;
       public            postgres    false    260            l           2606    16992    withdrawals withdrawals_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.withdrawals
    ADD CONSTRAINT withdrawals_pkey PRIMARY KEY (withdrawal_id);
 F   ALTER TABLE ONLY public.withdrawals DROP CONSTRAINT withdrawals_pkey;
       public            postgres    false    264            U           1259    16993    idx_customer_id    INDEX     V   CREATE INDEX idx_customer_id ON public.ratings_and_reviews USING btree (customer_id);
 #   DROP INDEX public.idx_customer_id;
       public            postgres    false    248            �           1259    42705 %   idx_customer_transactions_customer_id    INDEX     n   CREATE INDEX idx_customer_transactions_customer_id ON public.customer_transactions USING btree (customer_id);
 9   DROP INDEX public.idx_customer_transactions_customer_id;
       public            postgres    false    290            �           1259    42706 "   idx_customer_transactions_datetime    INDEX     h   CREATE INDEX idx_customer_transactions_datetime ON public.customer_transactions USING btree (datetime);
 6   DROP INDEX public.idx_customer_transactions_datetime;
       public            postgres    false    290            F           1259    16994 !   idx_customer_wishlist_customer_id    INDEX     f   CREATE INDEX idx_customer_wishlist_customer_id ON public.customer_wishlist USING btree (customer_id);
 5   DROP INDEX public.idx_customer_wishlist_customer_id;
       public            postgres    false    235            {           1259    17694    idx_transaction_external_id    INDEX     g   CREATE INDEX idx_transaction_external_id ON public.transactions USING btree (transaction_external_id);
 /   DROP INDEX public.idx_transaction_external_id;
       public            postgres    false    279            V           1259    16995    idx_vendor_id    INDEX     R   CREATE INDEX idx_vendor_id ON public.ratings_and_reviews USING btree (vendor_id);
 !   DROP INDEX public.idx_vendor_id;
       public            postgres    false    248            �           2606    17001    cart cart_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 D   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_customer_id_fkey;
       public          postgres    false    222    237    4938            �           2606    17006    cart cart_vendor_id_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);
 B   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_vendor_id_fkey;
       public          postgres    false    222    4968    260            �           2606    17608 ,   conversations conversations_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 V   ALTER TABLE ONLY public.conversations DROP CONSTRAINT conversations_customer_id_fkey;
       public          postgres    false    4938    275    237            �           2606    17613 *   conversations conversations_vendor_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);
 T   ALTER TABLE ONLY public.conversations DROP CONSTRAINT conversations_vendor_id_fkey;
       public          postgres    false    275    260    4968            �           2606    17011 2   customer_follows customer_follows_follower_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer_follows
    ADD CONSTRAINT customer_follows_follower_id_fkey FOREIGN KEY (follower_id) REFERENCES public.customers(customer_id) ON DELETE CASCADE;
 \   ALTER TABLE ONLY public.customer_follows DROP CONSTRAINT customer_follows_follower_id_fkey;
       public          postgres    false    233    4938    237            �           2606    17016 3   customer_follows customer_follows_following_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer_follows
    ADD CONSTRAINT customer_follows_following_id_fkey FOREIGN KEY (follower_id) REFERENCES public.customers(customer_id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.customer_follows DROP CONSTRAINT customer_follows_following_id_fkey;
       public          postgres    false    237    4938    233            �           2606    17021 4   customer_wishlist customer_wishlist_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer_wishlist
    ADD CONSTRAINT customer_wishlist_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 ^   ALTER TABLE ONLY public.customer_wishlist DROP CONSTRAINT customer_wishlist_customer_id_fkey;
       public          postgres    false    237    235    4938            �           2606    50444 ,   customerclaim customerclaim_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customerclaim
    ADD CONSTRAINT customerclaim_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 V   ALTER TABLE ONLY public.customerclaim DROP CONSTRAINT customerclaim_customer_id_fkey;
       public          postgres    false    292    4938    237            �           2606    17689    transactions fk_customer    FK CONSTRAINT     �   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id) ON DELETE CASCADE;
 B   ALTER TABLE ONLY public.transactions DROP CONSTRAINT fk_customer;
       public          postgres    false    279    237    4938            �           2606    42700 !   customer_transactions fk_customer    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer_transactions
    ADD CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 K   ALTER TABLE ONLY public.customer_transactions DROP CONSTRAINT fk_customer;
       public          postgres    false    290    237    4938            �           2606    17628 &   messages messages_conversation_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(conversation_id);
 P   ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_conversation_id_fkey;
       public          postgres    false    4984    277    275            �           2606    17026 ,   social_logins social_logins_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.social_logins
    ADD CONSTRAINT social_logins_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 V   ALTER TABLE ONLY public.social_logins DROP CONSTRAINT social_logins_customer_id_fkey;
       public          postgres    false    4938    237    250            �           2606    17031 3   subcategories subcategories_parent_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.subcategories
    ADD CONSTRAINT subcategories_parent_category_id_fkey FOREIGN KEY (parent_category_id) REFERENCES public.categories(category_id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.subcategories DROP CONSTRAINT subcategories_parent_category_id_fkey;
       public          postgres    false    4921    224    252            �           2606    17527 &   vendorclaim vendorclaim_vendor_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.vendorclaim
    ADD CONSTRAINT vendorclaim_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);
 P   ALTER TABLE ONLY public.vendorclaim DROP CONSTRAINT vendorclaim_vendor_id_fkey;
       public          postgres    false    271    260    4968            q   >   x�3�t,(��OL��K/N.JM��5470167��0567����IU(.�I,��K�L����� �p)      )   5   x�3���H�䬮Щ��ɩ��M,*qI-�LN-�p|2�3J2�2�ҹb���� ��}      +   �  x��UMo�@=/�bO=�����R���Ur�S]j��q�FQ�{gY'nWJ*U�.�<�7o��nV69�6}G.�ə-����fmɧ6+-�v�y���ͺk�yO�!?��3.B`! �"e"�Akɝ'6�2I��R�4F '\��˺ˮ曞���ʎ��s�-���{J��yF ]��"�p3��yo��3�%�����.�ki~��'v�	���>�	�!�?�rO8_8е�ȴ�\"{�d�i��@
���'��P��)�X*x�t$�Q�3��f�+�<sx�6o�+Xv|��	س�?>�zQ/*RW�=�ٺ���Q��]��ݠ�ᛕv7ނN�J����^ۍ]C�l��H<"��o��8D8���!GD;�.fHW�R��T����1���	�X�:�'ru�o�'��Nht'�@�z\��G!�A�C��ն(�bU^䑸���*Ǔ��:�w%x�����k>/�t{:�c E�5��`"-���D�s����#��]����ϳ�=(}#̨|����U��K״��H^�Sq�BIlֻV�Lq�*�9J$�[�] %i���M�6+����1�S�BDB0	��H��Ib���!��+R0\7�f4~?�f�eyN4��?]=���sa[:-lfg/e@J��E��X�{m(4��L��9`V8�]G�'h����jo/j49�p�O�0(#Q�$���C�-�L��ly\DA�fc      -   #  x��QMO�0=���'n�b7���!!�4q��k
ݒ�SS�⿓��I�ʓ��؎�"��l�qy���Gv�42�Z��@^�����nZT��a��,AL���j�l(OKIuU�%ﺑ�x���<�}D0�SE,�A���;PD���������Gb�@9�����Jv�`��̨p�����W�B�\I6ڧ��!N���Y���s��$ŉ8�J�:HA<'���m�q����o�[�����j{t�[���
�P��E]c�K��2On���à��n���ViE����^      /     x�}�Ak�0����h&�v�6�u�2��C/!5k �����tt�r����{�9�*��V���1v����1��&����Tw���� #�%Ғ�Q�>h_����s���������]�d�a���)v�9�˯����o�;��f���m�C9�䮂R�Xjq���f���6l�~L�*������ ,Sh��~N��ύ4����g)�xeK�JK�t�^Շ��}�W����?�t�`q>'I`B]XS�j[(��(&t�      1   
  x��Z�r�8}f��O��D�q�ޜ8ٹ��8U��*-1�fd�%Ҏ���)��ǩ��6�nP�'�y�;�%i��	��g�f�S�+�+���
�Ġ������;)����*�!=�f?��]Q_z��*e��FM�����z}���򹸽�����FQ�P5+ɉ�BH��.��X���>���Ӯ>UuY�aFp��S�8u}��V�vE�c1������j�P�e���<���@Τ��5�A^�I>��6�.�����zY��J�ݬ�y��Ub�(�d�T�J>����<`0^m�<��Ej��b";M&]�H!�u\qI�֔����>mj�h�_��|ك�
�Y3�M�c+�VB�����@��8��@��7?n�ü(͌����j/\M����֌V3�:Oq�|._�F�C�O�p��̍m$=,�/�h�0c���	hw����ى�U�(R��^w�+�@4�!ye,��8��J?������3�p_j���u�>�^�J�(:�J��!��'WOu�Pָ��)������j@�(�� �jD�>�}���e��_8�Q����pn�b=�M�z<���䏯_q���ss_������e�䜫��������B#�jAGiy�*�:֨�C���zw��I4��d�3P`8c�:)�Vp�"�W�i�!G}�E<�J` �5�ק�5i�!�[iG�1��&�|t�},�͒��H����z�Q�I�Q�m�*m���\�䇨�4U����ź8%�1.x�tI���u�#�CU��C����)��ʬ��1�Y,��*N��6��@<�E�wN�|�+#�5Y7��u/U�X���
!_���/,^ӏU���iWS-����u;t��%C����=�����3�Ƃ���*kF��KI�)��!�J[�J�*��q^����`{V�v�buB`���8冐Wg��kؤ5��E~<�Nu,�,�Y7��y��Z�k����}��S4y_�O��F �=a%�]?�J!7o�*�7�gN��D*�%O�� �|̟�=:���c�wݬ>e�j��S���B?�O�q�����2�T��!��%?b{��o]���罨����O���LX��( �� |X�� ��s��j]�`��7�.7�w�'�����m���v�����xM���R���yV/u�ߖOu�-��q��ė�\��@`7.^gL��UȊɭ1�742���V�]��$��������s���<Z�ױ9��F�Ty����c횮?��mY�g���Y;���	�����FKB~�e�xaA��-zh�x�sVf��+��*�A:]V`��e�ͫ���m���Q�_qK�Ԙ�cP���lng-
w���bb�����Bcͯ����������̉V���'�Wy�>V���TC�=��7���|���������m�ē���à�і���䣘�(~q�rG1�\g `��Ly�k_�Ę����A#[�8K)��1",(jcP@ɓ��|�ߦ����N���V��`�A�.���r��9k���6��a����A:?T��0n��x0׻�h����J�ni��vk��
,���Il~���D��w�:�J�1r�=2)1�W\<��21ț����^�,��!���1�[V=��1�X�R,�m�����V��1�!y3�}���RK6A�!Ob�H��T��&`�=�c�t�%F��+���H%c���y�8��KMU�<,�#�^I��(�<�Ř�ˉ��e�,"�����:"
!O%�T1.���L�B;�<�h���w+V�M�v���w�l�� d�f��ݾc�F�=���f��/F(\:0 ���	�3E@ct��`��`X�����D�F�]FW��)�a�Ѓ<g,����5+ ���j����|��X-�#D\�QĆ�g�'��5Bܝ] ����� O{!ۄ�q^\>��P�Z�y�K�'��&Gc��܃<��<_ ���>�ƣ"D<���ԣ�ssF4���o��RT�=N/�\1>A�!O�	+b���Ɣ��(nC�w���b�l�bWR3�}z�7�`�����t�s1|��m���mL*�e�p����y�ܛ�f��[scFW!t(�ԡ|��(x�3�ǭ�A�M{�9���{���S1���i��+��v�Ju���ۛ��V��X(0��1�B��(1(��C��{�%�n&�E�p�2�5U�ȑ�
,˾�iܟ̽$1(0�����v!i�ۤYټ�Rf�W���)cn���U���n#Q�&B�Y��^|K�����Nj�XEZّ�
n����r�6�o�i��hB�+K���H�����u�?ۿ��ߓ�k;��|�!�� �� �m�⒩��zP��{�(\,��D׃�S-զ���&}�l�w�M{��6��Y�p-zP�r����/��L�3}Ƽ�D+��p/�������~_��u]2}�����x��v ��wE�6���\��9瞅5��JK;��0��x�Z�����4(��]o��
��dB�q�Zdֽ4�01(�:�����Iܿ��ռ�m��.F��w�����V      3   �   x�5���0���Sxb�P~WB0��K�ZIJh�� �R@��N��[b��h��7���TAt����6��Qv�O�)���=�3�64,)񫋚���3�Fmn�q�VG-��E����gwo=#��{\p9o���&PL�,��~��=�BC#Z�%���X�����1�u���[r'I��DE�      d   8   x�3�47�42�L.-.��M-�2�47A0	�!	�qZ�(1�447C����� `P(      4   -  x��S]o�@|ƿb䨒#�1&v���� q���p�Q)D'����������j�n�t3�s��BKԣ�k�4S?�uZMkjS��,[�:�S\����񷟇��h�9j;m��7��f.�ݫ���`�W������)o?��0�X9��q�Zd�nה=�z@����*�{�Wp�f��]�@n�~ Kӈ�N7]K�sL�f�^����_s1:�XӘ�ܔU����T7����M���
7���o+�!����6���g8�᩻^)���A5�/1���eUy?�~�yd��'�{Ζu�$�	\�
i�H6���,cf��6Z��9%�#�ܘ��"�ByT��a��������X�`��R�I7�bY(
�Xx<�H�5]�9"��PE���ࡒ��t%�Ky�V<�1�4�V~��y���4b.�y��� _�ߏ�������D�:K,�������ջD�9&����11s�"s�:���l9��KI��wO]�yS��)�����+����Ȁ��f{��� �~JcAY�ʃ�!~�y��?�F�v?0      6   ,   x���  �7ÕSl����01�QJw!��.���'�yv      ^   j  x���Ko�@��ç�^c��˭&M|M{�2
�
��F?}4����;Lv��y��8�l���<m��Rp�(o��}S�-��]	��]bd@���\��x�rt������9R˰�:k*lCh	eh�fĸE�ɪ�D�hEtfD*��n��Agy� �4��3Lp	5��i�H	�ni+��Χ�>����s�k���&���=��"�{"��y9R�aB-C.C���}B6-2m�]G{~��?<c��U�z9P?��.���^��6MT�+j�ʴ�nX�rhI�mm��-m�j�, m��A��mH�y��0L��^����u1���������䱯WĨ[$6i�}��~�u��      8   �  x�͚�o�6����B�
�;�o-Zlm�����/l�՚m9��e�_��Պu��؁���wG��������~�n_��a|g��ê�X���5/�n(��k�.�x��e~\��7geU�eZ��k��YOBlCx�n[��������&q���M��tV�h��������9�]럚ge��ۮo7��a7��6���~�>\��̶6���l�6��~2�|h3���L�S&Cd��L��n5������mȔA�&�J�H�Ib��uM�&ҝ'�%R����X�Ó��d��L�Ĺ^On�7��9ҹ���D"�&edl2׎U���qtlj�TlW�����8��8�|=udJ�?��)M����O�Qa]�Z�M�����^#g�������I�z
Շ��.��>5���9c�{�����͙��i��?��ԘpY[�sQ~�v]�}:NH��4��k/�$HضO�W+h�/�}ߞ��o��P�gh�}�{?n�Y=��ڟ�������n?b\���C�@9k�"�G��E����.�"�a@��AGȈ��	s;b��s\��$s��el��Ӱ�����2|�Z[4qu=]�:,�_b��L�u�n\l��F`Y	%�͘|����-EkSB5>���#%A��]�0=�	�!4MVil	�4,����{���*�,|Xɦr��_��ł���Wd[>���
渷����߿ S����F��gH�BV�
�Ρ��8�
(Č��hCbT��Gt�r�$��9RT�� �QR�z	l�~5�`�]�	'9������JFBi������Rt�GH0@N�G($8�v�
���4�c%jL�Ra���T�JrQ;W��\ҡbI�.Ɛ���PX�[({/�3�CKu�L���ӡb�8��!&�r��j2�䕼��^�J^��)�䕬�٧�
ǰ�W�����V�ZV
)�Z:�@K^IK��4������gd"������0U���x)(yIPuG_�/�RP�R�֡f��f
Jf���1V��LA�L�r�,���MA�M�qL��n
Jn�`�SMn
Jn��O���MA�MN��P+��3f�����L�醚����%'BQ��{�w�l����P{e:V@�\�p+9+�S�D(���ziN�+<n:��b��������V���i���5BE,�[kPGT&����)����jS.�o�#�~n#.���;,�6c&(��:��N�cĪS!!u*��6N�N�JPhjS�$:T�x�h���#����D�N��z-=-��h�i������X*jj������X8*j9J�ی�IE-I-��TԲ�x'X�(�RQ�R)[T�۴KE-K}¢�v^���#����d������=ߔ�d�h�R��͗Ss�ء�5��l�EDiջ�E��<�O�P�7T����"��&APZ�{��0��@���[�9
�wҼy�4͟#{J      :      x������ � �      s   �	  x����n�6Ư���X�̐CRw����f݋�I���q��vv�}��(��H����N����!��73R�Q���C7�{r�đ�`��~:����������p��o5�������w6��4ݻ����o�������/�/7�>�v�|������c�˻7����d`�W�*�"�(�
6�kKX-!�ў���5�٠Q�X�y�Putatf�"�?n?��������k���㧧�ׯw���޽|��>:b|_�Cgb�ֈ����|x�Lw"��=�'���3���c��ؿ}x><��o��_w��њ	AAm�Q��{>�~w�ӷ��=Kד�I��*�%�
��{+��eT��x�^d����$�ʬ�����{�]���&�z{s~44�޸ƛ�?	-&<(���|Ŀ����jf�Vn����6�4�q��(��!J��M�o���h"Ly�����������ob�r�ĸv���o�Ur�u��h����������6F� g�W�fc�h^�J55�h
���Gv���xn3с,���&�h���db�g���cX��u+S0R�HA����\[�UN��
<9�B���(��÷����iCͫՙ��;�HNkU
�S]]�t:�6:-jƌ��#+�,��?N�mx�Գ �e�9}�&�L�h1/f�02Δ���1�<����K"����)y�`"Qd_/!g �"�I��h*����5�n.LQ48o��{?�/p饈�Y6gYJ���'�@��g3�C�[
!@~��t�3.�ԁ��Ņn���:/���)
�6iJ�l���/��9�����q�"�L	�
��{0��R�XT	 �>>�uC���;�/�׵����p�P27�j��(	���h����W�8�+Y���4mə�IA`5a9\sƎe��ᭂ��;LkrKh��l�І�v1��R�����9OaP�Uϙ�%)'��\�r�V
׸0-U�u°_npù~����2#}��lC��K������]�+Y8�\M��d���iv��^�"�l:h^#y�R���YZ7����`p�J�z6�C��dZ,taRV'Y{�Mr�X@W:2�f΋�������K��?����ӗ�CFQ�vT}:w��OG"�Fw�g�!�>�"�2ڥ���d��Xk���o�$	3B�
��P9w��t�h��r��*��c���~�_���&��1i-�G$�HK0m`5�
�>͍8�ҽCD�9r|Pc�S%<������(���G��YW@����Y��*�����#�Y#�2EFD�!vnw
dЫ��O\\ؐ�'���� \:#��"�[o�/�|��Sc�K2����i�$�
(�] �د��'4��r�|s}^dq�hT
���%qn�Y�n�39l��Xнu�/�fի\k>0�皷���{ݾU>�L�|�0�2lҽ~�j�*/�ʷ�՞Xrc��\��.ǝ3�TZ�2���A�x���(@��ja�g��ꉓq>����,i����-�w��lc�5w��%���8��T���pEB��j��!��\resV��Z���C���6��y��6.�Ic��s�q�/����*�za@�V��3��"M�͚+%�����a�k
J.#��Q7ֺ��Ҁ�ռ/K�J$ʕ�js�����w��d�f4c*9��&
��l���Ū�:SR��,�l�6EIs}|:+D�g	��� �s)V@�����C�3C�˱'-l;�K�[��ӆGѦ��Jlu�ዛ�踺�0�}�s��UU[��'Q�!��C*Ӻ����	X��,�`,���4�1�wY(%��e�����M��-n0wrP��zi�d����U�;�HMN��4�*7�8NB��"IƔe���8'`Sn0�ʍ��i�Q�&0���V�%��M�1[�Z����ߙh����j=фZ�I�l}S�����Z�)�Ӯ�!C�iS���h.�i�8\c,,�!��]h���2��ޣ����b.�z���9[��:'Z��6J��=�A���U1�~���*U����#�s����v�����kX�i�>�����b�f,���`��� �L�BUʫqNo5&U�i�(�o����tjȤ�v���\Жw.uq��b�/��y��H� ��i5
	�FS_����D̔��<[sH��tQ���U����"�!-!�NwJ��7ڴ"'��H)�L���R>�q/Y�=�ŝA������t��ů�͖w˜Ҡe�4��T�mI�ą�ۭ4���_>G�ܩ-��Gv��8u�\���`�X���C��_@$r��wYF4�M�=�����j^Z��Z˖N��[^��jֿ
Ȗ���5OL��X%?]���|� yOc�&h�":��U���5���]OD*���޿o޼�?Zd�.      <   �  x���_k�0 �g�S�����ǒ�ʺ��+�a/}1�V�%V���~��O���������;�6+�P
%8{�g7��v��j7>tn`��Ǚ��:�9�9�OS�V+�����V	FZ�i�7���.����X�Q�M{�p���P�ΰL0r�K��M�k��5��~v�n|��W�?%��C@�D�R[�ӫV	�`P�f��D�E̡�$U\B��vC�|�1�6���P����A�Nh�=�G�C�w�7nQ�����.�ݸ�=E�����LiC��/k׌��]3���ƅ����
��}=9�E�Ԋ�A�(������xё%Xn
�3��E Z,�ES@�$rr�[���n\y���u|ۥj^�:0U1BB�x�Yˏ$(j,��
S�Y��2��R������3UT�S�PEQ?\F�g�0�y���@eeUȒw��iIS� 
+�� ����Cy*K���rh�P����ڭ���!�.�f���χ����QVr�g���7N~X      u   '  x��TMo�@=ۿb�s�ڏ���$B"Tq���uLo�8E����QI�� �%K�~og��S:�Oe?Cx�n}W�]�I.q��R8X(*�b�I�2�[�=���l�RN��;g�a���Y�Ȟ�ڇS�"�l1�8j~�ϰj+��P�>�=t���x��oX�'����_���sׄ��Y��G*&��Z���@ۄp��)�-�0�N����?4VqT����& b�n"5����(; ����C�������k�6��߷U���t5|��	;h�Ѕ��)��g��CYU�]�{�˾d��8֯d��)��@f�H�)m���>$�N;Bv�{	�'�z�EI
��r�l�u�'˒�CI;��ω�*)��>4�HU�e��D�H��ԉ�^#�Brf��u�ߥ�IVs>�K	B���u�X.��~�#8#�q�r�(�G9��K.V�P]�S�Ռ\<�:%�I���M!,s�ss!�0��$xf�#�n#�f3�#��%��Hq7D�L�J,�3$��B�Q��U�I���E/f��\��BiW�����-�ԠF�5�X�� �      >   :  x��Yَ�H}���MO?t_L��H�ž/�Ȁ1�����4[�e�"`"H�dD�X�m61<�11F�@f���l2����\�v����~A�_ ����,��XV��l;��%�̤�m��o� Ze���A}8���T�܊���es��4��cj)�1���Դ�g���[ce��@��S�@8d�7Hc�� ����W"~�tQ�؝��;�"�O��'��V�s�amӷ��!��{��
7���7�� ��!\e�s�1�>��� �QCT�LJ@^��6Y�� �:�[ǵց�ν���ߊ�x��aq�b;��i#��~џ���,��Zc4h�w�mg����JZ�$�51� BcTR!#gt��	�����6���,�2j0F�α���-�Vs�\F����v�T灘����"o�kX�>�-�3��D2�Ƃ �����@�^f�A������h2e�uk�f��.��9[{��o͢f�:�E�h�Um
��|a^v���da���(.�
���P��B:b�J�����8/�7����y�F�X��+����{�XE$���>�::p!h��a�*+CڛmG��tr��~��K!!a��#�1t�%��芌2��]?�A .�N��gd��ỸT�_A����>�t3frU)l�ZՖ�-<��[)�1]N�egek�S���W
������T�
�>e�DWdq����MT���wAR���Vs�16N"3����`�'�1(���ü2�;�A�kd	ӌ��Z��
_B���� P�TW�`!_��E#�!E\E_dl{�㹾�{�!�ݭ	c��~(���������[{5y;��1<!_�� 4"1�u���?�%T��c�[rAB}����c�g�ȐVV�h%c93W�cM�S���ɧ��=�01���w0���W"���=�nN�Ұ*J�vځD��)ղxPlI�o���u�k� ��(��Έ$Q~�{,�c���|���t�>�n��|��֩F�����a��m(X��3�k7A��s��,���HI�mȴ�"B���1���Jt��G�+�5t��#w��H�JQ��G�{X�p���ttϧ�u��Bv��n�^��n������_���ϔ:�Y+��� u�b�W�\X<�Bg�[\���q�p����&���j����Si�)���ҷ(���;<m@<��g��,��	��eHCʫ��|�!;�K>�V�vz���M~��Q{�k�Sui�-�d4	z�<m7�Ty���Nz�A��n<�s�d�#+���	eQ�
�a�4����'W��BtE��!ՠ��mj���Wx��^[�z�����v���]�CO�ST�q��^q�j(�P���~��#z#ar���ѕ}���?�A���.���R�_��*:S�Y��%|0�l˸x���t�d�Ik�4�îU�q����X���7w��[��2���W֝�ڍ� �1��W������ng�[oD���q-���l6�/x�K;x���Zic�{��`1Г&*7�"�W�]��C]@ )~%��R�|�uT����kl哟a��š����t#��4>�.rk(��RS8���{zqPa���x>F��+��*ߝxQ!{ʋ�M�Ї�W�^�${pس�myM�uO|�]�a�T����Bm?�"=��Y��ϒ6뎚�[����&$�+-��9`��B�T���J><QU+�z�}�}F֜y%i�6E���^P�-�n��ѫ�E*�'�dc���~H8�U=��� {� X�;�	��=Z�NteU�G����)�'���4%`0j��I`s����`�HL��V.�Fi~!��h4�����ծO�H��`��~'��7q[��z��"�ǟ�{���Y =o?�@g�6�U">ȘdM�0H'v��*Wu���hƣl��n�_E�c��,���݊>|�~�i/����H���v�s���}b�N?�sݨ>°��2U�8��������̺����咋�"�y�n��:aT�-%�p��G�)@\ǜ�عމ�>�z�Q|VTT��ى�����c�te�K[����fo��1q�'��ˇ��^v�B11ƽ���E%k�.1=s=G��5�5�̓{�oU��j%�@ �Ͻ=Rי9T	���n���1yP�GE$o{{�,ュ��Jkϲ5#|�o��r�zKU�J��V�W"�3�Quw8��]R��D����ؙ����9�4k&�ne�Lg.�`B0J1&K�b�?�t�P+3-��k3�S�{��8�Y�%��i�	���㕚(�*�N��r�h��DA"Uhv�y�=_���Ï+�K;��XW���]��驪! #���I8,��UA��Hk�a)���[=8��?��(ۆU�ԉ*�	%���l?ƥ�h�z�)�\�I�]�u?��m��L�ͮ���W�B���q�N	�e3��̪긟�a�(bw�*ȎI�����o����龭gҥ�Lt�������}�9-�w��}�^+�{�:�	��(R��W�+_aFŝ"��"�Z����T+��?�8,;�p�gjx�����fk�ۅB{���6ݚ�h�U�W��QZ���m�Og�[�UҬgz�"�W��l�L���V��G��T�1�Đ�)�8+޵[DK��T�l���7���z��i�?p������=W!���央:���1���v������HZ�����4�L1aRU/r�þ�?��!0�*�O�<��[ ����HD��K�`��L��tMEb��q���]�̳�� OC�'H�Ͳ�O�����$�f�BFJ)G!r�����X8�=oL+V+��mY�#�/S嵥�E�w¿xr�㐋�� �8��p>�=����`���bT�נo�C���hx�M[[g�u`2���H����n���~SO���`9_M���m���:2b�S�K�W�g~Ƥ��p�|�_��L	��%�eI���\��]e���ܤ�H��iAt���c<�^�bG�z;���پ�j���1 ��2"��J�S3�To��'58��C.��((��1X���Z;���R�+��uF�PdBU�@\�F�Y��۷o�Ml�      \   �   x�e�K
�0�u�s�$�ԥ�>V�V(Q�R�&��Bo_�E���`�)k� �n�@�˹k���8+�1�|�U�S!�P�Ȣ�8艮�2�Gsc'�"\�YY�����8��P���e�g��f���{�}��~���X�T��DÜ��� �4>�      A   �  x���Qo� ǟ/�"O}Z,���-�4i�&E���/4��-̸M�i�}����Z�k�d���ο��f��Ej�I��N§;edL~h�m��;��@�p�J([ .�����X�q��y��뭛����[w�ם�o!1�Dp\��Ϊ�m��!EH���׆B�c�O�����'lcn][E���"�3��W�Ł���
E�DLRv@@����' ��/��*���h�hk��E0��C��%��������H�~���E��@�D�)ʠ�)8y�p�ލt�O���I���#/��a�k3 Ґ�0go�ƒ~��/7�?�F���/�Z�m�TyQQ�� \L�Z.K��ՙ���v���.�<���f�+gg�l���$�Y��8z�֞�62��EYb!J*����r[_Z{���K���c��י�������{�l�paV�<#��N!.((�u�N�U��4��fF?��6QE�x�}�^d���7$Ə�      k   �  x���Mk�0��W�Ү��x$��})��S`Y�j0q����_�BJDr���y<zy�"6�Ý����.횛�����S��5*�o���y�6��������6�o�|��o�i�O�p�`#stl��[��!]9E���=S`/y�q�}JC�����4=�]�7_����O���yI��4B��W)$ȟY(�ѡ^
��w4�?B��-(�#x𬲔��@l��(�U�"<����}�����O��vx?�9��7�^�D�F.Z'@ߺVx� #r$g[.���	Ah�@#�W� T
P���SȂY}. �0�(�2�H`��BPU�Y L�w@9�,%����:��xi��"��<ѵV�젪��6�������1��cw�_�\�W�ҳ�����/���       f   �  x����n�0E��Wp�M�oJ�E�<�Y�@�n�%�+Y1��%x�4�{�33�{yEOX�x"UrU&���7϶M(�lM�0DR�2��g,4�+�DBA=a���9HHM@2�駉Lc�El�"1D�&R��"���>��Q�,^g	�'��
 7���R��%4��I��@�. ��>0 ��7Sҋ��ׄJ Ĉx�E������P�R^ВG���B1 ) ���<n������s�x(����9<ve�&JHD��H(���]�}���:�Op�e1����f�����7E�\��q�B0���SOw����+�߻{������D9e.@@
!#��i-:6So�P�E_/ 4�*�ř��5*�t�C�ָ�o�XD�ا".���z�U���:o"@�H�^P]b .[k���6G�������ۭmm��)&5���`!:s�@�H6X҄I\9}^(�ANɠ�ydAμXt}�6��Q�cwh�6y������>r�ݱ��[�
?��$.M%2!){5����ט�1Eᛠ| �z��:G��ِ��')��Wu���Θ��������T��|?��^��,鿪�^�xcZ��.�|[o�|��x����^�l�o1p�b#�i��)y$��y2
q%�����Y$f�?	HYU屬�)�dS�Êy�C�tz�Ơ^������j�G�$3      C   P  x���]o� ��O~�K,�8�k�,��tռl��bpB���մ�>���J��I6�s �ׯ�$�si��BI�t�.ꍮ$PL�!#!�&Q2�i@�	y��I�ߞp}	���Mc8\TBq�}=�Y)���J�z�J���V
8��RB��}0��1����b�7��w�(���C:?�8HG��7ρ���}�VȺ��p)���@�o��'WW�߇Pn]�r�!S[_"��"W�{��Y;�'1\�J�{n��f��2W���� L����m�hv+M�"B&4��I�2F�S�/�g����K��>ba��g�q:=��!E�3��[�-�-h����iwm�=�:!�i��;�7J��vϛ�q|���m3D�����YwE"� 9��h۝�����;�uK�P�����wЗ�*YB�N���U%��"�a!�+ÝY^�;�����1ldY�^�:���$�x̞��	�J�̦�#1#��Uw%;
=�H������"��������#���
s٠^��Z�b�+��߸Q�j�{��U�h%n�����*u���@��d<v7N��G�^��^�)��u��3���_ �c�      b   r   x�3�� .��4C0�L��44@bs��'e�:%������Z�X���:�[�ǧd�'�d�&����UXd�Ż�e�s:r:r�LK,�D�=... 1�+S      D   0  x����n�F���S�,�ߐC]�C�"F��=��.�m����~9�ʖ�@�R���9$?~cc�2�W ��!�F� ;���������� �/��������n��+R���>�м�������SCv��I�Yը��7Hq�5��kE�x:��������������o�/�������?ͻ��ᏯO���q���9�J(�2a�1	��$�"�Wȇ��S��ۗO��y�?�O����S��ǒ�c|�Y��N,�k�N�Ck5����^����s�����I��$i%Y=G�=H6��)�UP�%�<p�2'Yyڅ�	%Sr�R��uA�I��plMb�� 厨%<u�e���WD'Cb�W�T9	;�֐�sx�#�l�g8��#���t3���v����LW�h-��P��
[��S%AL��t�r"m�9U2K����p�v�1��k�)����U8�j�b:�����9U#?�s%��L��S�@c�'Ź�Nju�{㱬�4�ZY��T5�ƌ�Vn��l�9U̀�TT�ٮn\�@���#Nu�!�O
=X'��[�1U�,�t�ܼe��*�p��9'�g+y;G����E�'�nO�T9�فc���*f�������Z�Xn�4/�z�(���cc���*��˛T9/J�hѦ���}h˨)sl�k0��G���gb,,MHp8Tg��I�$q]�r'�v">�?���&$8�2l�O:ʁ��҅�>�RU�M!\��mX�픪�ʉ�,4�ˢ�;8�T� ��2�Z���t�[�Z��sx�2Zd���T���b�KU4��v$;���d�8[}&P�4������� ʣ����
�i9� ���s���	�C1h���9{{	P��[��AG�`@F��Q����P:>  ���E�F�ŠU�$�E�F�� �ѕ��x3E�4�!$Ƶb@yPU4��b�.Y4U]���J�V!��[�M�1�ኦ����4�wgU�Ɯ�`|�chөa�<:�+p�π�JB����B$F��
�UT��7uɐ)O6����M�nΪT��e���"g��qY�^�o��sfU+<{�œV��.�:>e��i��xX=[��2b
��An o�J�S� �Xa�'����������rUR ��A|o)�a�y3%�Fwx���;�������2�NJ���9��fՋ1V0��F9;�0�t��#?]�E�R�r���A�s@h�\	J��c9?�~��"��1�<�ބ�������Tj��8� }_0G%�:����ɼ5�������o(!5\V.������t	�c{uu�/�N�      G      x��]K���v^ӿ���i���E�(�&�,��H���N7g����N�[���ˬ�,���AA6w�����z��d�=32|�;ҐݬS�s꼾s
#lcd�X�|�ݛ��?{wf����g�ߘ_G;���*2]d>��w���-��}h��`ċ�60^��Q`|��x�^�����}��5����h��W���_�w���"���	&�&��L}_�����8���q�߭�o��247�v����zTZ�j�L ��s�l��VWp�1jᷓ��&Z�o��O����|l~�^�͓�z�c8��b�6�TGal�-ֳ�_�ve#��aƋ�"X�B�v�ߚ��E4[���M�8_�|�vs���Rt��6��r��_�q
֜��h71/�`�#bbI<.��� hma�b���H�z��n���xj��n��Օ�㩁������D����a�'�yb�S���A�/Ŀ�x a�*���Q��=D}׶m��w��c����㏿����v=��v�E���ڂ��aN���yxe���ߒs7��h�?�^�x���ӯLc�g�j^?�~���7��*�9�o�8A\��i�܆�R����?D����$��x��qF�ā�g�N��<�F��M2|��|}����ag��^�j�v�U	^������Aa���n[��*4w�l�Z/�W�Sx&��om�Y���E7������Q2��Kߘ�Nf6ɜ/�!%�힓�����˚�˞���?s.�pv�.gA���|���%�3o��WB������.Z�=y4��`��>~��b���2؅�κX�b),x�۝��:���|׋�|��X���:}�6fF���J�&�b	o`5���'�N������7�x��`���3�ߟ�)���?x8�����~'v"@\d_��_�c?q�Ԧ�g��g�D�u.|&�@S��',�r��-���z<����������>��?}��O�U��o&�����������;,��;��ey%@�\"��R�>�ӧ�?}�?N�)I�c�Y��gq�?���/'�m�s�%��5E�;O8w�m;��hMA���:��u`���@-,�I�X�G���W�?,@N̓�f���r2���!���9��t0�j�a������j��8T���`�5�5�Ϧ��ī��	�T:�~��cƷ��v���n��*�ǌ_|
�:�\_����"��孹�\�Sj��x��=��9Z�YRfs�#F|s"����9I;I�#I�L�γk؇��-�r��1E��|����W��סm���Y�z>s�5��+Q1i+�o�Sd}��(h�f�yf��C��˗��6 �e7�S�*��93|��~��o��C>	}L��J+%�2�yr*?����:��!��߅9�Q��mb.�C��|"Ɗ�X`9�D>�H��R�3Ifb^�(��i�db�|�g�*��K.r�Ɋ;�h�P���6CDBCB�����d����,�$P�$��a:� Q�6�7��ח�$��p��}-��:�/��	�evf�U/�x�('D��[�"������"�\�\�X���E�`�,f镬'/"�c�Z�����[��W�f�mV��2؆z�@p<j+�<�"�p�и��7��N�}g���|!��/�Yq�CLު�˷R��vrw�o"!G��-�t��	�hYycIɌ�.�H�~�;�L����i'>��(bR)y��zix�3����r���IVp钜@O@��D���UpMO,�"�a����Bd��'|1��YZrI,��XK�r�(���3� ��<� �.���u��.q��?��7����k>�\�K�(kv(CH
Œ����M��C�B�Q��*�|��5�ժ�t��X2}� �j������V�C,��jy�����/>0���C�_���ʨ��f�k^��d�J�W��ө����x�[���z�ԭ�݅[?�@��zEʽ��-�z�=4�<�����4��ٱL��h	�*\��L��G��k8L��X!�vMymS@�4��I�e�n��$�f���W�^�����3�}������$y`#��	��[(#1�$�� �q���+>��6^��۲3�a�`Ggz��Lυ���U�xXۯ���;�	�"?1��kP��S'o�2�ng�H�6�$/� ��j�����yxr���6�p�%���-m!��E��E��$�\P�7�i�>!-��6�����}��Б����a�
�#)ԳXzx��H��7|�AP`a��G>s���:+x��x�<�i?�_ �,����!�F�j�M��e��ۛ:���+AM��&5ɪ��.���Lǲ��|i�mG�
�&�\�~Ҡ��Bl��t��6
����%�{��\��A��0�[�[�C�i��o_���LW��ج$�;o��H�͆�2�ʵ�,#F��"^E�yF���g���3�(��L5� s�)��b�K���l��{>r�5���h�i��EG��	�嶃�S�߈]D�Gw����N�����7%`жN��s�t���.M��UB4J������I\����#ȉи�� =��@N|�+:`w�1�H��N-��Fx�
��/i֗�^�p���H�?x�Đ�9�G�h��Њ`�rx�m�`�� ԫ/��Zg�A-����L<��x���3�kC��M���33[��A��J �;���n��<�ra>�����4�[�65�fS���i6Ůʦ��ɦ�,�ɏW^P�}6E����x�b`�L����hMѾ��k_Ms���
UVӸ-s,v��!Jr,���j�Ʃ�;�
F�})� �a'E�����u�GwA2n{�N���s<�7�z��ko�x4��Y!��<fbU�E{ �|
�5BZ\�x�d��c�S[�ЊA\>��%��Q���<��ʽR��V}�B~~�~|�~Xq�|60Kh��9��U��!5��P6��-k�T�*��9U�a��V��>����ioD��{U>�8+��rvs7O0��ZXb�uw�4y�]��]�x{P���vj���,!e�7�Y"f*�49�x��Kʟ��"eq����I���&�\sG�i�|��,�{���E���2[�M�R��}7D�i�.��T�I3����Iu�N��׀b�����=�q���Ŀ�s��*��V���b.�N�;��*�y���7qB�ǀ� ;EI���u|�($��%��!��1P�5�MM�^f+�1��27Qj�^ox�D�v�~0$3s���EH�Cb�X�J�a�wk���V�#(�R%I���ȅ��,�a�"��ÿ��a��V�W@~��B�����5���[�|��v��*�e(��م�مѠ�fW��*5���V������[��C��}V�F�(Ց��W���l�r�p�l/��^t0��F���^����~	 �s���
��������]r0R��n�D�l3Zi�u3�����#Xd-������s�|-2�-2��"s+c1Վ=;E��҈����>:R*�j���[T��a���^=�=����a� S-3מ�4&6�q擴
ی���8�Yߐ��$$�0�#Q�Z�̾àM�b\_kn��e%�NG/��92ӥ�Vu)�k��ܥ� ��𺔔`;�KI�4J�*Y�@RrQ]�ګK�W�Ec��0�n
��U/�Cn7c,���BpG4���>c�u1����Q�&�X�0�g�E
`��O�P�I�4 2zH^n��$W�J�4xj����\�\M�x@N	�A����*
�Zv�Gv�\�Z�� �R�d�Ʋ	�r=�]C�gX���^Lw��`Om� ���_�n� ������Q2�Xҟ���{U0���t4��vW�`'�Sז?R�W�^�W��6�^%��U�m�W�Ҁ�O6�8��UUT��.ث�i�c*��~g�-l:����\T�x͒7��N�?�cn�p�`K��W'�=q~�-��_qz�`����х(R��U�x�Ǧ��@����:;i��98û�ż�a�"�i��O�`k���'+l6�h��9��~�xR� �  ��m��v+�Z,,��ף��(��a�����O�ql�]�i��զ9-7�i�i.H�Ƹ���#��/��50���6|o����ǩm��Y�sm	���26�덴�åʯ�cI,��fG��'Ym/�|�"ӪffN;ִ�#/��~��	����u�e��������)<�|�g@Uo��,�E�k+�laΌ�fu��I����W�ԓi&=�]k �x^�b�����U��R��:E�ߑO+�����2��K(���EZ�}47�[�AA_��o�+���^��X� "�I'�ƻ
��o�0rvw������˷Q�x�8�m�K,Y�fq.�c�B;|���
I����0)���V����wB��FHZ2h'��s�z���m����ML���X���=�B5���&�X$�&�Vc�L0�<�p@J`��O@�O�r����4M��4�M:�:�t�~��O���9j��b(?X��	>#��t�'����H�`u�g��|D�_˩c��~���᳕>n�LR7:��@�4]ɇ��|%��kLXv���#�\�]}�2]��~Z�#�2�H} �$q)[�Bh�~����A���Z��Xa5��ed�C�4o�X%L�A�>l�h�3/mY��IZ@Ҟ- �%�V?Z���~Z���ܙ����7kX�Ċ�+)���dt��C��P2�][^�2L�XF݃ҧLr�J�4e&�����\b�'����|n/�� O.���d��f\v�2 �[�C��m���x��O���,�t��3�����>�8"��﹜�eK [��u�������h�hWwӂ��-rs>i����)�S�6�?2��� U>H���m$�||�~��R���n�СGh���l���*ND�]�*�WC�E��X
Q$.��b��P�8zP(Q��[�����������Q�V}t�%D���!��P����El���D��(�=�s�(����������7�Df�b�6���0��S1�k�)^�h�g���<\��%>�3n{)���lרD��(̠zT";�J"�g�TWt������gl|bF���awX����0O��w줃D=P��ޱ>H2â&��n
\���B���6�aV�땗�	NBQ�o։ ~�f9w���i;���~��J<�{?��>��(�,�P�p>�G�aɲ�4��cMQ2�8ܥ����u˄��N(G��'�d�t�`�B>�j�]���f+�'VSJ�0%s��oU�����ʛ�:L���*��� ����$�1�\�[�%X}��.Ұ �?Fs�R��7�K�Yu^=XY��Y|Y�S�X��!��6�,�/W�QӴ!�w7i�Q�zB�s�i�^'*���yTZ�5��҆6.� ��<N���W�zм�:<��D��S�j�IMV��g��d~;���[�:�z��o��|������~"X����ؚɻ����}2�X�N+�Jh'qt���uBRyn�k��Q��q��&#"�Grǭ�k��uv�nl|?F�5%�� �����I�SmQe<�tś�:��
��_��Ҵ�^��HQ�^��u��bpe���`�۵>�n`}�1r�9�m{�F��lL˅�G�DR-.��1K"� ���Yq���K6�f��m@�e�������[
��5s�K������Y�m؀k����/s�/�݇0\�%V*F�ک�T�~6C���:zl��>�M��3�/pu��u��2��2X��,I�=�'�Ł�����,[�j�0��k�a�#��4���^��r����o͔�Tn��E�2��/Avt�"�Z��%��b��P��,G��S?�-��A��m�K��!�m�p�Y��WR�(�ȷ��J��T�5	��_���E!j2F���~VeY�q����
�Nĸ3pU���~R���+�	�l�^�Q�<��+8�#����g��cb�I�&H����si�$p"������-x]h��c	>kWG���<� ��t��ck㩅~�N������Z�͚�E#��rG)�v����n���1[ب�7(�vK���!���U�m���	H���U�v�mK�}V�G��[�.K#Qvy$��k�ٟ{z�j{>UI�\��nc����戵���4i��Z�����]�ĉ>(+�-�ǉ��:"U��&[t;7��~��¸���Tx��^�p���_Q�3>˥[�6&�Glh���L���k(6�] ՞T�Fh���)`�TjX���
R�Y7@muX
�RE������)�bZM���ʱv�Ji��R��1ʠ<J�Sp=�}�ԗ?2�����ko�ԖAe:1:w]UAj�2�.�~�>hZ��F�N�l�贫��ս���`���SQ%n�>5g�*��9#VA|j����RD�zt;c��SsTA�<5ǩ,%��v��}b���iI����ѳ�͊��M�>��R4+,�e�Q_]��i�O����i�m�O�F��>?S]��U�$�u�Gi�_�$v.5�ok�����E2�t�He�_�O�����(!�ד/�ȭe"��(I1|�:��ד_�)%eBs�Jq��>�i���J�Ԉ�du����+8q�Q��k`Z>ݢ?Z���E*�O�@u����D����	P6*ߢ+����|l��6�-����v,P����[ã�h�3ب̪��Ϸ�rY���Ch's��흎)��l��W�$N��5�`:q�j�D�2�øy�tP�Y��uB&M����Fh-]�>���Ds+x_�n��f��#�-�3�Q���~�m++;��֜c�ڶ��ڶ�۶�۶vgLϧH�m�����m[]z��`��|6և%��T��耷�F��|��;)"�7�g\DЧ���k��/"hט�F�"�cwg�I��}=)�S�5�}@�m/P@�l��ߧP���|��P
&-wx����xF��v'P��WX	~��_a��6ߧK)J�+U���-�+�w$�=�!A}L�F�.����7$:F��~Gw�������	xw8�\�1<�F�ޭ�Z4	F�N�L�]
����3��q4K�=o����|+���6F��g�L�U�dz����V�>���v�N��މ��1�vqEYwqk�.���ϼan����b���PUpm�BfzA�t#�JK�
2Ӭ�����O���r��_���_҆��C�ıY���79܌�nF=܌<(��6ާ���p����7|�ı�V?N������U�      I   t  x���OO1��Χ�8w-�?��~����T�P%-�B��]o%@ �O�{�y�<`���/�����z7����˺�@3�K��ı�c�N�?/O>?N(,�	��(!f.{¿3r������=A��`�����:�`	�v��<��b3�^ ���>���씃�o�Ì�����OE��2Ĳ���6%^onn��������!=KcX	@Ř�{bĳ�����q3��:^���j9�au�,Ӵ�A�;��X��/N�q��㶗�yyn���W�P�!����`��|z�-�Ȗ ���u�+��"��)�}���?�2G��˳�i�e�$rU�=5[+��(]��L��$E��oH������      K      x������ � �      M      x��[�r�8}�|�*�/��9vn�8q������J1ms,�Z�JƳ���ݠD��@9U���Q7�Fw�L��닳���r���țⶪ�>���93T:���R���ً|�.j�95�)Ƙs�?\^}y����ݗW���8�-۬o	c�p��sʞS=cfN���T��)�����>�6y��>��n�ն���Y�����|��^��z�xO�j�8�?D��_ۦX~�;|Y���͗�o,���.7MY��_̷�g��Ǭ� M��!��q���^b��S�q����������T�{��7��n���l81�1�.�3�Rvj'��0��88�ƿp��A$��LA�A�e{�uR��VOA=�r���ϤVeR���t��]�����P�4s�2����QPP�,�s��k[;e4.p5	nGkoo���s��Re�&�ԭ�	G=������gOs֏^��iB�����?>MG�g���u�8���`��bݐ!�?�xN�s&`��%��S�J� xS����K���\��j�^5�����$��G*� g������vI��=aë��h�~iG�GP���Q>W0`��/`^���-,�g�H!�,�I߼��+՜��1%�� �c�,����^<.V�v�������7���S@�r�,����["��y��S����)��R�iw?�E��\����vI�$Ae3�7�i@�`��F�����~���L3�4�H�0~iq-���:�`���Eސ�]������c�8��ުدc�7�e�2N��o璂�*ǣuчºІ\�+X��$��S�9㙣 ;v�Թ����_�U1����L�&/�vɍm�@�Li�6劼�7M��y;�6;��S#H�	�L�9�Mu[盻G�s�,�y�c���1c��(d��0� /�����C=�qU�7U�P�����J%��Lԇ��|�z�6�U��'f@�)͜��7�P
��4`�#���^�gWn�#��e���և�p��\}�}��9舜 �̱�v}(�t^�uQ�O�<�'g�P�SQ�.������6�V���}����2rU4�+��2�ё��PP
^^���>păt,���@A#����Y�������6Z/J�v��� �0�4}( �oխw�r�};{��BU���/9���.2x �zE�7U�ϫ|qW$U*�iH��
j59[,�ݺ)׷��EU�����DZ�J-����P��˼�/��ϖ� �	��du�C� 
�-y�u�-���V�O�R�!u�6��r}(hw�7���z�ÿٿW�}����$�l��=�u]-��qvQ�J0Nͣ�ws�2���ݨŌ\��ޕ�I�JdV�}���f�X,�|����ZN�WtNE٩3�4��~A>�W0�`�]��)����у�����L	H��k=r�/��r1��mp��F ߣ�:v���d`}�����"��8� VB�L	kđ�PBc�v�_�xyQ|+Vզ�Ҏ -x��z<�(`a�s�Ð3��d&T�T��>ԩ5�0�y�_HzL��.sZQ=G
Zze�<�TA� ����P��R^���!��_�\bq���Q<@A9�le����Mp�X�J��x����g��n������]�I��LVr͎�P�.h-o��iڊ��sԎ���́���fv��C��`���(����(�D�_!lo�MR1̿0��f�C�B�_+X��ξ��DQ���R����/��BI�����9m�C�>t��=������p�z����v>�T�V���l`�I(t��l�
7�=-����ͥ��P�7���I*VY�zT�D��.��]l�1T[�{�$(�P59�O���u"N�H�%m�PZ��p��Գud�����y���2䪆:�>�)i^�2c�WZ<I�2�i��{A2|�y7l���=�vVrj��|�$W����(�C�*8����b�&IbP�1�{�u�l�6�����ܹ1��uu9�$���dѰCRq�餰��R��^P���zl�
I�\��os����#�<���H)�X����bq���S�	�Ԥ(p<&��v\�?�!ք��Lg�jU5(���xz�H��?�M�}?�h��FPe�ķ�n�&�P�,@u[2���0J�Q�EE9�TOΓR��L��9�,J%P e���e���*�"�?���)��OP������n(Pt�� �JYO��4N��%�D$TO��{�)�#I�YYc��,1�Q���Ou��+��J����!'`��Q'�x��@�B�vS��l� ;@�"蘴خO	'�	_%R!��@O�/�[�o_P�Lr����꣒-�ȑ4�\
���v b��}��-;ϫo'lƅe�oG�$-��ZDM���4�~�pC:n$o~�d�)�OBaQ���ˏn�L������7B��6%q�y ��@�g�����q���#�$�(�\|��(���]�Y���6��?!ߒ�|���c&E�UЇB.��s�����/#bt�u 5��.A�����_&N�����EYJګ�L�}������7e=5�X�j�5�d�����&��?�T_��\�����	d��c(�Nc��@N�#�����y�o���TU~�w��d$�c=--�f��T�A]Ϡs�Ft:0����&�Q5�r�8�MKǰf<&�`?P�;*��1�:V��/�y���vW��jU��_Wӵ8��OihyF&��{e�Eݹ���E��������{���S�i�n$�O/���0U3(�+r u�$��k����V�d�����c��I�5r&U�4P�AA�P5�E^7u�?~��M�yʧ?�\����[Cќ����&��u��}R+�`ҁ��$'���mt�1�:N��ȿ>�l����������9�%8<�5��]��7at�(j,$^~Â�S��/���朚6��MVp\ex*5*{H�!�xܴ{/�����3�'�>�8*�V&�>���5a@��	����(���$%5��4IR�`ei��@���	��_��=��d��q��j�1�!A�cwKC�%���>�*�lm���S�IvJx��X,I	"��B�I�[���*�	��'8��a��$�$7�'5��t�S�f�EAA8�P�˒��;�)���"�'�i+۩=&��%�+>�� :𲔜?.V'��FK���[��J�GW������l�n�j{o��Sv�(��+)��g���5�P�O�^�V�f��\�����jw���	&sU�3��2�hqr��������'Y��Y�v�䒤8�(W����lH��o�^Q���q��!m�d㻦(�psv|���nn�*3��L��*lwt,*5��B\DwoP`�����f�u~����Չ��pc��b�v+�N�v�-�h�P�y��u�ٛꡀ}lQM.6�].�AMR���Ҫ��n]6����Z���ۦx�6�_��t�����QӇA�m��/��h�SƟ`Vp�R�HSX:���\�|�x����p�7m�Đ뻢h��u{�U�nhr��CW$�e�a��/`]MA�m(��|��=��WE�>�e��X�̍d��_5*�*)jO��@��_�o]拻�-.��S�,U���N����� 
9���۶�}��E�T���}�0K�}!m�-FDW`P`�]}b3�sH�h�ƌĒ�$��U,�u:�%G�r(aޗ�w��Mg3�+g|R:j�sa�TfBp]�@a������IBF)�N�%)1�I�M�F}(P?/oJ��E��Ye��n0�JrhG��ZJ�K���������7T�U5�WA��9_,�2����UJ:3΃�Hwj@IO�E��@��$)��P>b�M2��N0�4y u��9�%�o��'89	�=p�$����&��'?C �[??q�HP�e(���	p*��"��"Ȼ,�C���?��\�=��d�\� ċ��u\$��^>��\�T���_N�.1�v��hO@��
��:���\p�U�75.V�X���X4y]� �  `�!��k�'��F3��Y����jԡ�X�A]ݕ@�i7�_bg����b�W�oZ�X��[�I(�n	�J���T�((�}������+�̖�jv�-@��"؈���r׾Y�W-N��xV��?�L'� ]�ڊ��� 
�f�uS�x����c}��˿N�Č����^)��b��5�ڞ(\��m�^���z�UU/�u�U� ^��ZF�>}$�@�3(�����g(��Nΐ���40%�,�%Pv��,@��wG������Q���BJ��[��zU:�����B17����wb���t$�/#�U&e��h����eq��_g���u7��Ur�N|�gk1uVl
�`�{��[��i��J�����蒋��翼�������S�o#�nk'��������O�~���      O   �  x�e��n�@ ����)��1n2���-�z�  ��"�D*M�}�&��	�/�8�_R�YIGM&�a��d�|n�:�X`Fm��ڽL�h�9.�]x�F,�W-��q�M@D���鏠F/��'��p.!!�	Ӭ|PHیÀ:+�*l��r*�(��^w�\m�bu���ޤM���L{��b����V1[���\3�&�{���<ZS%�̽};~]JI���Kx�/��`9��8a���nZZ6+T�B^�k�Z���q{�?N�@��jK�4M���jN����O�(�*���{�0(:���æ��V��HUv(��m��Z��ty�AX���v�$�������sh�=f���vf��c��g9d!y(@JP�A�!f f!� �! !� ��N���4��w����MáX      h   @  x�Œ1o�0����^a��8�l@��K��lH(M�*8�qh������t�����w�%�@��
k[�%HD���GP���TL�TY��jz@8���n�Mi�澄Y~�xU{���l��ǂ�`�<Rc�(R}�h�׎��T�+Ž	�w��6��`)�[
R-�% �b}�/��,�����]��+�m��Q���7�a�я@��<[�I}�lq�N�Mr���|�v��������;�`)�S�X/3!�kLڝ�gbCQ[GG=4�.ZO��	�� ��RM_�O��M��X���dv�c��k�&�-���Ւ�`�}��      Q   u   x�326�43��0��442�30�Q)��)ŉF�ƜF���J��JVJ9J��9�F����E%.�e�ɩ��OfzFIf^f^:���	�T#cC�� hfb
�L���FSA�43F��� ��/�      o   /  x�}�=N�@���9=d53;�{N�A"�hw'�[)J��b�=�e[C�勉E���^�D��[�;��<��t�{��i�=n4�<���ѥ�����������9.}m�Cz��6��������2ie)6TZ2i�qM�wICm���^y�v�1�[���7��v�}���O��e��$R�!���A3�(Š8��P�Cq(š8�PJ@	(%�v1w0fBI(	%�$��R8+��Lt��P���k*���g�y'B�#��H �@a(��0��W���^nF���_�m6����       `   <  x�}�?O�0���S�:7����)B�e0���&q���~{�A����߻�EBdb��6f�2.�<����I"4�$�
��\jFs�Q�X������L�2,)a�
)�o/��[��e�,�rvP�UYCUW�#TUUBYǺ�WQ�U.�P�_��J0~�?+�_�|�߁�q�i��1�Kx����a�漝��1��zJ�!�k�5G9��<9��g�#�a3ħG��?���[����=�z��;��>�:4��t�:3CX�p�`���D��U��L#�+D%&�)`�E���$~��`��)��4M?΋i      m   -   x�3�)��H���WHLI,NL��/���$�a�---�b���� �M�      S   
  x�͚ko���?;�bK#U�t �~A�撄ŤIG#U.��-��1m:���m;��ӜIs�H׽��uy�Dq�*�`��t�LY��
��W5���9�T1v��4�$�����cT_L����O�L��+B���R�:�A��F�d���5o싈4Fɰ��U��h������>��Z#��4L;�^���$�N��Nwq����?�>I�iG�зos�c�
�د̝���޷�pw]?�Y����o?�;��U����;2���ݞ;��Q�(�-���8B�`� J�[�r.��GDIScC Y&�0)�	S��!9�^2�g�m����7h���0�A�$����	�@�OA��� E��D��6��"@�#�@_!w��q�l_���Q����g%��p�5�8��i����J+ܴ#�"��c06"jBT0%t�?�o�J��Z�`x��*'k�'~8g��־�5FiG�h�t�Y� �F|;[�AR
�h�4U���}+��P�B(;���2�֏�6lkA�Ʀ
7v�3d��I��� 2�m���ޠѺ����{�Ѱ�G�/�5�w9��	��;���]�A��l����Ls!�!��r���fH�-dÿ���O�4�I�����8U�Q�9E���͐c�I�O�1Y�I�5 ���W�A�gj�׸�j�v����z���-���:��w���j�ݿ/\&����*�lW�H�_�+�&�;����.Q��a�qQbWЕ-%�)�
�� ����4�E��1eDn� �^�1��Y<������P�7I �̆�}b))���������^άu�������� �3S,�D1���
S�h�QvVA�Ťj8�a�o�ǎ9Jc$�5��A���kQ���xdLA-:��Jl@g��v��%a"�(���4H�E�}:��'��{6O�xd�$cOD��1XZ�P.I5����*jQ1I�**���Qc/�ʪ�oEE��E���Ҋ��,�%���ْ\H�߁��R�P��r]R^F%1L�)0�kY4+0��`5�k"lدt��hةt��hb���]�I0������v~���@XLT����0� �wK	bg˶bl+a�T�ޭ������
?�0X/��G�|�=�t��nR�q���S,%���J�t���d%�_Ɓk���!�',��pV�*������H��a
l:�?YlA4����.��*o&)�/��o樻���$����4��F6o�+�>�G_���̶Г0��%����I�Vt��T��!�b�H._/������Ij�po������f^��$�(�=��"��QZ|�/�һ�?/&|T�BFq��Y��$�zBY�sD@�Q�p}�ն����kz�(��F���HnE�³uA䰌ҿ<�hO������Wev�	��vh�x�0��ti�����e�%x;�Ӄ��: �A�<�.�|8�V;����u6\�!�S��?o4�bW�h�����}i#���M��B���Q6�A���r��v�.������^ �0�U�]{C�zm4y��$���Ǒ�Yc�������m��vup!'�%�)��-��0�ŋb�[�H�INX������xr��c�$�q�ٴ���Ӕ$ a��]�K�J`	���H��R���'�7&�!Y��@��Iw'�
��w?A�hL)��X�f�k��!��:o/�_	=��z�����FCc8���)��!s����5�Ƚl������8k���ݻ�P��lu<��]A�u�p� �m��;���	�e�k���(_�P�L�Q�T����#��R��A=M��<E�$�+;vA�}ݽh"V�ŸK)(U����틧�Z��[��?+_�#%��Mg �H:�K׭w>��������}�S��Ņ0�v��ᮄ0�#)w�]WJ��-�O�{f�2�����*c��A[���S���gp�`���-j-�g%�N������6®�@�<�P��L؉[����	�k��yvo$�#Q�{���/���'�=F�@��X=ֳF���F������ꙴفжi��H��H���D�Yi�L~�@�KG��#���0t��؟��f$�Ұ3�Lz�W�u�qIa$�c$6|6#�A��C_|Fh%#a�#��Ɵ�Hd9�ދ2d�䒑0b��؜|�l$2|�P��)�v��`$rqB�k��dnHU)�6!��?hi�4ŜW�L�h��BA�R���΢�~�fk0�������:���u�Bg����~Rv_:%f��������@�6=��o��Qt�^Av��cE�h���Ƿڭ��c�_�[�B�6 ��S��oAQ���5�%�5�`rL��͝�lG0G�}�>�g%8L~����s��ś3Z`�g��U��S;�=��0I���y8O�cΊ���RPN˟rS����ܦ[�Pp��C���m��e;=�:&�B3
r�K�'c`�R���A!?
a��H�1�#U[��27ŋ�<�ۓ��2����_ +�h��#{m*qA����@KJ�9�{^�΂н���/N+����գ���U���      U   �  x����W�H���Y��ٳ-tf2�?A�� �u��gH&!� ���w��j�=	y�˝����{!��H�)��)�3D�N�h�r�l��6F�Cؽ�;�zaG��x��MZ�����Ut�s[���jw >�k��*��8T����P%����t����[Q�]l���[�:�Ҽy����-�X L� RJ�a�+�&keI����ZF}�&����+���9������8&��t��YG�e�G�*usI�������$-�4Mg͛�hb֔�BͲ9�+w��|��Y]G~���?����x� b���m�6B0�Ai6�UN^�?�u}2���\W�YT�Hp�-3�.�VX����J�<KϷ�+<Ѻ��Uݸ��U�� �ό���w�������F�f���8~y��3W1����"��K
la�(��
�\���>8�e�QP̊��Y�^�O�D��{K�g�賈��g#-֗��f_ _�����ޅ��b���}��b�+���3Nu�����s�V�R�kh�a�p��6�mJ���fC��neZyWƻ�,R�����[��ЫE���1�׸[��'ۣ��G^�y�y';����H���3��Q���<��l_0������D��f�Mk�f�S�K�r������O�-#�N+�}XZ�ɠ7�]L����ɀǓ�`�tΎ��<��D�J��0�@lt��[.sӗ~���%-�R�q�y��I|O�f��t]���X��(T98�
P�����R{W˴�eԦr��Ҥ����@ڜ	C)�(?Oo���i��n}^i�r�e�rӪ��:]&AQ��´~�M�9,SX�Q�aj覉kb����f��r8O���8�,������P%A�yU?�X
bz���
n|^���Q���}�{�g�a��)T����l��<�gj��EE�M�ӴPI���T��,�Ii�CȽ�?_�e(��'�K�J#��r&N�����>�u88V��6�e�X�o��h�&�US�8�j;\���4��U��z�]55�#��X�)���/s��՜sL�8J�皇vu<5�ᢼ�Z�17;T����+�;�0�[�0m$���Qj���e 6U��TJʈ�8����c��D�%f���1Te�d�fHՁ61i"Uinٲ��TZ�1Xk���ߊ�7�N��d��a2`���y�N$t�X{�Vb�M1��C�ϭF��?�O��      W   �  x���Ko�8��� ���ԭ�
��"�؋k�MZG2��b���NJI�-	�%��i4��3��Y}�����r���|N��?����YE�6�<����K�zu�g/�s���?3���5�k`��1����ϋ�L�Vۭ/�}u8}���y\H�SA�y�Ҽ�\,	�q2�>=�x��	�ΰ�Y�b����~v�(�nf�$��>�m�V\��ŠA���u�mJ��MY￳�̬�-3�G�����?���I$$�`Q��������ĶET�`QOq4�+�U	W�E�]w��`��	��I��p8�{"n/{��L�$ ;���%n{U��u"�El߾�`]�8}�]eCXK�\��u�*�(Ln�ZT���-��q��r詳�r���v�_���X�Z.
'.s�\�E��,ހ�X稈���v�L�	SD�E��cJi����X3K�'��������f�����,��$ �Q�́a̎;��4ٗ���b���� �zJ��oC�<|��k�O}�9�>V���K���mI?���9�=��GU��{V�ͱYC$6W�S. ��H�)���ωt�$fDJ�p|p9/Ra�jN$�tD�9�<�9i�E���Ή���9��  jN{�]2AT�=���ߖ��ץ�u�n��׫�ÿvM5dR�	���4�DIu3]��V }ȯ���P�DjH��t����b����{��n��6T�r�f6Ǭ QCސ��5$�4p�������=��&��!z������3ү��3F(-;��r"�ݯ��K ����6N@x��~'��q���NNc��\BJQ�j0KH)p�Č��e�"���)l����E�2T�Y�J���g�X�l�e������e��u��X���&���)l:�]BK)�[	������Ďm�W��8;v����`��`ǲ]=cB_��'��\Pq�      Y   l   x�3�42�v�450�30�4202�5��54�H�K��K�4426153��4�tJ��V�OSp�M-�LN��M��Sp*J�K΀�40R04�2��2��j5�0�#����� A�     
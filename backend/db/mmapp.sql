PGDMP  !    5    
             |            mmapp    16.0    16.0 $   k           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            l           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            m           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            n           1262    16720    mmapp    DATABASE     x   CREATE DATABASE mmapp WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE mmapp;
                postgres    false                        3079    16721 	   adminpack 	   EXTENSION     A   CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;
    DROP EXTENSION adminpack;
                   false            o           0    0    EXTENSION adminpack    COMMENT     M   COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';
                        false    2            #           1255    17696    next_transaction_id()    FUNCTION     �   CREATE FUNCTION public.next_transaction_id() RETURNS integer
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
       public          postgres    false    288            p           0    0    apploadingscreen_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.apploadingscreen_id_seq OWNED BY public.apploadingscreen.id;
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
       public          postgres    false    216            q           0    0    attributes_attribute_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.attributes_attribute_id_seq OWNED BY public.attributes.attribute_id;
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
       public          postgres    false    218            r           0    0 "   audio_headphones_product_ah_id_seq    SEQUENCE OWNED BY     h   ALTER SEQUENCE public.audio_headphones_product_ah_id_seq OWNED BY public.audioheadphones.product_ah_id;
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
       public          postgres    false    220            s           0    0 $   camera_photography_product_cp_id_seq    SEQUENCE OWNED BY     l   ALTER SEQUENCE public.camera_photography_product_cp_id_seq OWNED BY public.cameraphotography.product_cp_id;
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
       public          postgres    false    222            t           0    0    cart_cart_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.cart_cart_id_seq OWNED BY public.cart.cart_id;
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
       public          postgres    false    224            u           0    0    categories_category_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.categories_category_id_seq OWNED BY public.categories.category_id;
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
       public          postgres    false    275            v           0    0 !   conversations_conversation_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.conversations_conversation_id_seq OWNED BY public.conversations.conversation_id;
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
       public          postgres    false    227            w           0    0    coupons_coupon_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.coupons_coupon_id_seq OWNED BY public.coupons.coupon_id;
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
       public          postgres    false    229            x           0    0    currency_values_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.currency_values_id_seq OWNED BY public.currency_values.id;
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
       public          postgres    false    269            y           0    0    customer_address_address_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.customer_address_address_id_seq OWNED BY public.customer_address.address_id;
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
       public          postgres    false    231            z           0    0     customer_delivery_address_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.customer_delivery_address_id_seq OWNED BY public.customer_delivery_address.id;
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
       public          postgres    false    233            {           0    0    customer_follows_follow_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.customer_follows_follow_id_seq OWNED BY public.customer_follows.follow_id;
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
       public          postgres    false    290            |           0    0 (   customer_transactions_transaction_id_seq    SEQUENCE OWNED BY     u   ALTER SEQUENCE public.customer_transactions_transaction_id_seq OWNED BY public.customer_transactions.transaction_id;
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
       public          postgres    false    235            }           0    0 !   customer_wishlist_wishlist_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.customer_wishlist_wishlist_id_seq OWNED BY public.customer_wishlist.wishlist_id;
          public          postgres    false    236            �            1259    16811 	   customers    TABLE     �  CREATE TABLE public.customers (
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
    customer_interest text[]
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
       public          postgres    false    237            ~           0    0    customers_customer_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.customers_customer_id_seq OWNED BY public.customers.customer_id;
          public          postgres    false    238            �            1259    16820 "   fashionclothing_product_fac_id_seq    SEQUENCE     �   CREATE SEQUENCE public.fashionclothing_product_fac_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.fashionclothing_product_fac_id_seq;
       public          postgres    false    226                       0    0 "   fashionclothing_product_fac_id_seq    SEQUENCE OWNED BY     b   ALTER SEQUENCE public.fashionclothing_product_fac_id_seq OWNED BY public.clothing.product_fac_id;
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
          public          postgres    false    245            �            1259    16848    products    TABLE       CREATE TABLE public.products (
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
    estimate_delivery_by character varying(255)
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
          public          postgres    false    265            #           2604    42681    apploadingscreen id    DEFAULT     z   ALTER TABLE ONLY public.apploadingscreen ALTER COLUMN id SET DEFAULT nextval('public.apploadingscreen_id_seq'::regclass);
 B   ALTER TABLE public.apploadingscreen ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    288    287    288            �           2604    34094    attributes attribute_id    DEFAULT     �   ALTER TABLE ONLY public.attributes ALTER COLUMN attribute_id SET DEFAULT nextval('public.attributes_attribute_id_seq'::regclass);
 F   ALTER TABLE public.attributes ALTER COLUMN attribute_id DROP DEFAULT;
       public          postgres    false    217    216            �           2604    34095    audioheadphones product_ah_id    DEFAULT     �   ALTER TABLE ONLY public.audioheadphones ALTER COLUMN product_ah_id SET DEFAULT nextval('public.audio_headphones_product_ah_id_seq'::regclass);
 L   ALTER TABLE public.audioheadphones ALTER COLUMN product_ah_id DROP DEFAULT;
       public          postgres    false    219    218            �           2604    34096    cameraphotography product_cp_id    DEFAULT     �   ALTER TABLE ONLY public.cameraphotography ALTER COLUMN product_cp_id SET DEFAULT nextval('public.camera_photography_product_cp_id_seq'::regclass);
 N   ALTER TABLE public.cameraphotography ALTER COLUMN product_cp_id DROP DEFAULT;
       public          postgres    false    221    220            �           2604    34097    cart cart_id    DEFAULT     l   ALTER TABLE ONLY public.cart ALTER COLUMN cart_id SET DEFAULT nextval('public.cart_cart_id_seq'::regclass);
 ;   ALTER TABLE public.cart ALTER COLUMN cart_id DROP DEFAULT;
       public          postgres    false    223    222            �           2604    34098    categories category_id    DEFAULT     �   ALTER TABLE ONLY public.categories ALTER COLUMN category_id SET DEFAULT nextval('public.categories_category_id_seq'::regclass);
 E   ALTER TABLE public.categories ALTER COLUMN category_id DROP DEFAULT;
       public          postgres    false    225    224            �           2604    34099    clothing product_fac_id    DEFAULT     �   ALTER TABLE ONLY public.clothing ALTER COLUMN product_fac_id SET DEFAULT nextval('public.fashionclothing_product_fac_id_seq'::regclass);
 F   ALTER TABLE public.clothing ALTER COLUMN product_fac_id DROP DEFAULT;
       public          postgres    false    239    226                       2604    34100    conversations conversation_id    DEFAULT     �   ALTER TABLE ONLY public.conversations ALTER COLUMN conversation_id SET DEFAULT nextval('public.conversations_conversation_id_seq'::regclass);
 L   ALTER TABLE public.conversations ALTER COLUMN conversation_id DROP DEFAULT;
       public          postgres    false    274    275    275            �           2604    34101    coupons coupon_id    DEFAULT     v   ALTER TABLE ONLY public.coupons ALTER COLUMN coupon_id SET DEFAULT nextval('public.coupons_coupon_id_seq'::regclass);
 @   ALTER TABLE public.coupons ALTER COLUMN coupon_id DROP DEFAULT;
       public          postgres    false    228    227            �           2604    34102    currency_values id    DEFAULT     x   ALTER TABLE ONLY public.currency_values ALTER COLUMN id SET DEFAULT nextval('public.currency_values_id_seq'::regclass);
 A   ALTER TABLE public.currency_values ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    230    229                       2604    34103    customer_address address_id    DEFAULT     �   ALTER TABLE ONLY public.customer_address ALTER COLUMN address_id SET DEFAULT nextval('public.customer_address_address_id_seq'::regclass);
 J   ALTER TABLE public.customer_address ALTER COLUMN address_id DROP DEFAULT;
       public          postgres    false    268    269    269            �           2604    34104    customer_delivery_address id    DEFAULT     �   ALTER TABLE ONLY public.customer_delivery_address ALTER COLUMN id SET DEFAULT nextval('public.customer_delivery_address_id_seq'::regclass);
 K   ALTER TABLE public.customer_delivery_address ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    232    231            �           2604    34105    customer_follows follow_id    DEFAULT     �   ALTER TABLE ONLY public.customer_follows ALTER COLUMN follow_id SET DEFAULT nextval('public.customer_follows_follow_id_seq'::regclass);
 I   ALTER TABLE public.customer_follows ALTER COLUMN follow_id DROP DEFAULT;
       public          postgres    false    234    233            $           2604    42695 $   customer_transactions transaction_id    DEFAULT     �   ALTER TABLE ONLY public.customer_transactions ALTER COLUMN transaction_id SET DEFAULT nextval('public.customer_transactions_transaction_id_seq'::regclass);
 S   ALTER TABLE public.customer_transactions ALTER COLUMN transaction_id DROP DEFAULT;
       public          postgres    false    289    290    290            �           2604    34106    customer_wishlist wishlist_id    DEFAULT     �   ALTER TABLE ONLY public.customer_wishlist ALTER COLUMN wishlist_id SET DEFAULT nextval('public.customer_wishlist_wishlist_id_seq'::regclass);
 L   ALTER TABLE public.customer_wishlist ALTER COLUMN wishlist_id DROP DEFAULT;
       public          postgres    false    236    235            �           2604    34107    customers customer_id    DEFAULT     ~   ALTER TABLE ONLY public.customers ALTER COLUMN customer_id SET DEFAULT nextval('public.customers_customer_id_seq'::regclass);
 D   ALTER TABLE public.customers ALTER COLUMN customer_id DROP DEFAULT;
       public          postgres    false    238    237                       2604    34108    homebanner id    DEFAULT     r   ALTER TABLE ONLY public.homebanner ALTER COLUMN id SET DEFAULT nextval('public.homebanner_new_id_seq'::regclass);
 <   ALTER TABLE public.homebanner ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    267    266    267            �           2604    34109    laptopcomputers product_lc_id    DEFAULT     �   ALTER TABLE ONLY public.laptopcomputers ALTER COLUMN product_lc_id SET DEFAULT nextval('public.laptopcomputers_product_lc_id_seq'::regclass);
 L   ALTER TABLE public.laptopcomputers ALTER COLUMN product_lc_id DROP DEFAULT;
       public          postgres    false    241    240                       2604    34110    media_library media_id    DEFAULT     �   ALTER TABLE ONLY public.media_library ALTER COLUMN media_id SET DEFAULT nextval('public.media_library_media_id_seq'::regclass);
 E   ALTER TABLE public.media_library ALTER COLUMN media_id DROP DEFAULT;
       public          postgres    false    281    282    282                       2604    34111    messages message_id    DEFAULT     z   ALTER TABLE ONLY public.messages ALTER COLUMN message_id SET DEFAULT nextval('public.messages_message_id_seq'::regclass);
 B   ALTER TABLE public.messages ALTER COLUMN message_id DROP DEFAULT;
       public          postgres    false    276    277    277            �           2604    34112    mobileelectronics product_me_id    DEFAULT     �   ALTER TABLE ONLY public.mobileelectronics ALTER COLUMN product_me_id SET DEFAULT nextval('public.product_mobile_electronics_product_me_id_seq'::regclass);
 N   ALTER TABLE public.mobileelectronics ALTER COLUMN product_me_id DROP DEFAULT;
       public          postgres    false    245    242                       2604    34113    mobilehomebanner id    DEFAULT     z   ALTER TABLE ONLY public.mobilehomebanner ALTER COLUMN id SET DEFAULT nextval('public.mobilehomebanner_id_seq'::regclass);
 B   ALTER TABLE public.mobilehomebanner ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    273    272    273            �           2604    34114    payments payment_id    DEFAULT     z   ALTER TABLE ONLY public.payments ALTER COLUMN payment_id SET DEFAULT nextval('public.payments_payment_id_seq'::regclass);
 B   ALTER TABLE public.payments ALTER COLUMN payment_id DROP DEFAULT;
       public          postgres    false    244    243            �           2604    34115    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    247    246                        2604    34116    ratings_and_reviews id    DEFAULT     �   ALTER TABLE ONLY public.ratings_and_reviews ALTER COLUMN id SET DEFAULT nextval('public.ratings_and_reviews_id_seq'::regclass);
 E   ALTER TABLE public.ratings_and_reviews ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    249    248                       2604    34117    social_logins login_id    DEFAULT     �   ALTER TABLE ONLY public.social_logins ALTER COLUMN login_id SET DEFAULT nextval('public.social_logins_login_id_seq'::regclass);
 E   ALTER TABLE public.social_logins ALTER COLUMN login_id DROP DEFAULT;
       public          postgres    false    251    250                       2604    34118    subcategories subcategory_id    DEFAULT     �   ALTER TABLE ONLY public.subcategories ALTER COLUMN subcategory_id SET DEFAULT nextval('public.subcategories_subcategory_id_seq'::regclass);
 K   ALTER TABLE public.subcategories ALTER COLUMN subcategory_id DROP DEFAULT;
       public          postgres    false    253    252                       2604    34119    superadmin id    DEFAULT     n   ALTER TABLE ONLY public.superadmin ALTER COLUMN id SET DEFAULT nextval('public.superadmin_id_seq'::regclass);
 <   ALTER TABLE public.superadmin ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    255    254                       2604    34120    transactions id    DEFAULT     r   ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);
 >   ALTER TABLE public.transactions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    279    278    279                       2604    34121    variantproducts variant_id    DEFAULT     �   ALTER TABLE ONLY public.variantproducts ALTER COLUMN variant_id SET DEFAULT nextval('public.variantproducts_variant_id_seq'::regclass);
 I   ALTER TABLE public.variantproducts ALTER COLUMN variant_id DROP DEFAULT;
       public          postgres    false    257    256            !           2604    42483    vendorbulkupload bulk_id    DEFAULT     �   ALTER TABLE ONLY public.vendorbulkupload ALTER COLUMN bulk_id SET DEFAULT nextval('public.vendorbulkupload_bulk_id_seq'::regclass);
 G   ALTER TABLE public.vendorbulkupload ALTER COLUMN bulk_id DROP DEFAULT;
       public          postgres    false    285    286    286                       2604    34122    vendorclaim claim_id    DEFAULT     |   ALTER TABLE ONLY public.vendorclaim ALTER COLUMN claim_id SET DEFAULT nextval('public.vendorclaim_claim_id_seq'::regclass);
 C   ALTER TABLE public.vendorclaim ALTER COLUMN claim_id DROP DEFAULT;
       public          postgres    false    271    270    271                        2604    42472    vendorpolicies vendorpolicy_id    DEFAULT     �   ALTER TABLE ONLY public.vendorpolicies ALTER COLUMN vendorpolicy_id SET DEFAULT nextval('public.vendorpolicies_vendorpolicy_id_seq'::regclass);
 M   ALTER TABLE public.vendorpolicies ALTER COLUMN vendorpolicy_id DROP DEFAULT;
       public          postgres    false    284    283    284                       2604    34123    vendorproductorder order_id    DEFAULT     �   ALTER TABLE ONLY public.vendorproductorder ALTER COLUMN order_id SET DEFAULT nextval('public.vendorproductorder_order_id_seq'::regclass);
 J   ALTER TABLE public.vendorproductorder ALTER COLUMN order_id DROP DEFAULT;
       public          postgres    false    259    258            
           2604    34124 
   vendors id    DEFAULT     h   ALTER TABLE ONLY public.vendors ALTER COLUMN id SET DEFAULT nextval('public.vendors_id_seq'::regclass);
 9   ALTER TABLE public.vendors ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    261    260                       2604    34125    vendors_notifications id    DEFAULT     �   ALTER TABLE ONLY public.vendors_notifications ALTER COLUMN id SET DEFAULT nextval('public.vendors_notifications_id_seq'::regclass);
 G   ALTER TABLE public.vendors_notifications ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    263    262                       2604    34126    withdrawals withdrawal_id    DEFAULT     �   ALTER TABLE ONLY public.withdrawals ALTER COLUMN withdrawal_id SET DEFAULT nextval('public.withdrawals_withdrawal_id_seq'::regclass);
 H   ALTER TABLE public.withdrawals ALTER COLUMN withdrawal_id DROP DEFAULT;
       public          postgres    false    265    264            f          0    42678    apploadingscreen 
   TABLE DATA           >   COPY public.apploadingscreen (id, apploading_url) FROM stdin;
    public          postgres    false    288   )�                0    16731 
   attributes 
   TABLE DATA           k   COPY public.attributes (attribute_id, attribute_name, attribute_values, category, subcategory) FROM stdin;
    public          postgres    false    216   w�                 0    16737    audioheadphones 
   TABLE DATA           r  COPY public.audioheadphones (product_ah_id, ad_title, currency_symbol, city, state, country, brand, category, vendorid, is_featured, is_sold, is_negotiable, created_at, rejection_reason, status, updated_at_product, uniquepid, category_type, subcategory, condition, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, driversize, impedance, frequencyrange, additionaldescription, searchkeywords, keyfeatures, videourl, salespackage, isvariant, quantity, postalcode, inthebox, images) FROM stdin;
    public          postgres    false    218   ��      "          0    16748    cameraphotography 
   TABLE DATA           �  COPY public.cameraphotography (product_cp_id, ad_title, currency_symbol, city, state, country, brand, category, vendorid, is_featured, is_sold, is_negotiable, created_at, subcategory, rejection_reason, status, updated_at_product, uniquepid, category_type, condition, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, modelname, storagetype, storagecapacity, displaysize, screenresolution, connectivityports, batterylife, dimensions, weight, warrantyinformation, additionaldescription, searchkeywords, keyfeatures, videourl, salespackage, isvariant, quantity, postalcode, inthebox, images) FROM stdin;
    public          postgres    false    220   ��      $          0    16759    cart 
   TABLE DATA           �   COPY public.cart (cart_id, customer_id, vendor_id, product_uniqueid, category, subcategory, quantity, addeddate, updateddate, variantlabel, mrp, sellingprice) FROM stdin;
    public          postgres    false    222   ׿      &          0    16767 
   categories 
   TABLE DATA           �   COPY public.categories (category_id, category_name, category_description, category_image_url, category_status, created_at, updated_at, category_type) FROM stdin;
    public          postgres    false    224   �      (          0    16776    clothing 
   TABLE DATA           q  COPY public.clothing (product_fac_id, ad_title, additionaldescription, countryoforigin, manufacturername, packerdetails, searchkeywords, keyfeatures, videourl, salespackage, city, state, mrp, sellingprice, quantity, inthebox, isvariant, status, category_type, currency_symbol, uniquepid, vendorid, postalcode, country, category, subcategory, skuid, images) FROM stdin;
    public          postgres    false    226   :�      Y          0    17600    conversations 
   TABLE DATA           h   COPY public.conversations (conversation_id, customer_id, vendor_id, conversation_user_type) FROM stdin;
    public          postgres    false    275   ��      )          0    16782    coupons 
   TABLE DATA           �   COPY public.coupons (coupon_id, coupon_code, discount_type, discount_amount, expiration_date, vendorid, associated_products, created_date) FROM stdin;
    public          postgres    false    227   =�      +          0    16788    currency_values 
   TABLE DATA           K   COPY public.currency_values (id, usd, kes, eur, etb, sos, inr) FROM stdin;
    public          postgres    false    229   z�      S          0    17057    customer_address 
   TABLE DATA             COPY public.customer_address (address_id, customer_id, given_name_address, family_name_address, email_address, phone_address, country_address, zip_address, city_address, subregion_address, region_address, note_address, default_address, apt_address, phone_code) FROM stdin;
    public          postgres    false    269   ��      -          0    16794    customer_delivery_address 
   TABLE DATA           �   COPY public.customer_delivery_address (id, customer_id, first_name, last_name, selected_country, street_address, apartment, selected_city, selected_state, zip_code, email, phone_number, orderid, unique_order_id) FROM stdin;
    public          postgres    false    231   �      /          0    16800    customer_follows 
   TABLE DATA           ]   COPY public.customer_follows (follow_id, follower_id, following_id, follow_date) FROM stdin;
    public          postgres    false    233   j�      h          0    42692    customer_transactions 
   TABLE DATA           �   COPY public.customer_transactions (transaction_id, customer_id, datetime, description, amount, closing_balance, wallet_txn_id, send_to_user, invoiceid, status, transaction_wallet_id) FROM stdin;
    public          postgres    false    290   ��      1          0    16805    customer_wishlist 
   TABLE DATA           �   COPY public.customer_wishlist (wishlist_id, customer_id, uniqueid, label, category, subcategory, vendor_id, mrp, sellingprice, created_on) FROM stdin;
    public          postgres    false    235   D�      3          0    16811 	   customers 
   TABLE DATA           P  COPY public.customers (customer_id, given_name, family_name, email, password, phone_number, address_line_1, address_line_2, city, state, zip_code, country, bio, verified_with, created_at, updated_at, status, picture, google_id, facebook_id, verification_code, verification_expire_date, customer_loggedid, customer_interest) FROM stdin;
    public          postgres    false    237   -�      Q          0    17047 
   homebanner 
   TABLE DATA           A   COPY public.homebanner (id, banner_url, title, link) FROM stdin;
    public          postgres    false    267   z�      6          0    16821    laptopcomputers 
   TABLE DATA           #  COPY public.laptopcomputers (product_lc_id, ad_title, currency_symbol, city, state, country, brand, category, vendorid, is_featured, is_sold, is_negotiable, created_at, subcategory, rejection_reason, status, updated_at_product, uniquepid, category_type, condition, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, additionaldescription, searchkeywords, salespackage, keyfeatures, videourl, modelname, processor, ram, storagetype, storagecapacity, displaysize, screenresolution, graphicscard, operatingsystem, connectivityports, batterylife, keyboardtype, touchpad, dimensions, weight, warrantyinformation, isvariant, quantity, postalcode, inthebox, images) FROM stdin;
    public          postgres    false    240   )�      `          0    34030    media_library 
   TABLE DATA           j   COPY public.media_library (media_id, title, description, file_path, creation_date, vendor_id) FROM stdin;
    public          postgres    false    282   %�      [          0    17619    messages 
   TABLE DATA           y   COPY public.messages (message_id, conversation_id, sender_id, recipient_id, content, user_type, "timestamp") FROM stdin;
    public          postgres    false    277   ��      8          0    16832    mobileelectronics 
   TABLE DATA             COPY public.mobileelectronics (product_me_id, ad_title, created_at, updated_at, city, state, country, currency_symbol, category, subcategory, condition, brand, is_featured, vendorid, rejection_reason, status, uniquepid, category_type, modelname, storagetype, storagecapacity, displaysize, connectivityports, batterylife, dimensions, weight, warrantyinformation, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, additionaldescription, searchkeywords, keyfeatures, videourl, salespackage, isvariant, quantity, processor, ram, graphicscard, operatingsystem, keyboardtype, postalcode, simcard, unlockstatus, cameraresolution, inthebox, images) FROM stdin;
    public          postgres    false    242   �      W          0    17588    mobilehomebanner 
   TABLE DATA           M   COPY public.mobilehomebanner (id, mobilebanner_url, title, link) FROM stdin;
    public          postgres    false    273   u�      9          0    16841    payments 
   TABLE DATA           �   COPY public.payments (payment_id, customer_id, order_id, payment_date, payment_method, payment_amount, payment_status, billing_address, billing_city, billing_state, billing_zip, currency_code, payment_source, vendor_id) FROM stdin;
    public          postgres    false    243   ��      <          0    16848    products 
   TABLE DATA             COPY public.products (id, ad_title, city, state, country, currency_symbol, category, subcategory, vendorid, uniquepid, skuid, mrp, sellingprice, countryoforigin, manufacturername, packerdetails, additionaldescription, searchkeywords, keyfeatures, videourl, category_type, quantity, postalcode, salespackage, brand, condition, isvariant, status, updated_at_product, rejection_reason, slug_subcat, slug_cat, images, attributes_specification, prod_slug, width, length, height, weight, product_ship_from, estimate_delivery_by) FROM stdin;
    public          postgres    false    246   ��      >          0    16855    ratings_and_reviews 
   TABLE DATA           �   COPY public.ratings_and_reviews (id, vendor_id, customer_id, rating, review_text, medias, created_at, product_uniqueid, label) FROM stdin;
    public          postgres    false    248   i      @          0    16861    social_logins 
   TABLE DATA           Z   COPY public.social_logins (login_id, customer_id, provider, provider_user_id) FROM stdin;
    public          postgres    false    250   �      B          0    16865    subcategories 
   TABLE DATA           �   COPY public.subcategories (subcategory_id, subcategory_name, subcategory_description, subcategory_image_url, parent_category_id, created_at, updated_at, isfeatured, subcat_status, nested_subcategories) FROM stdin;
    public          postgres    false    252   �      D          0    16873 
   superadmin 
   TABLE DATA           ^   COPY public.superadmin (id, email, password, "userId", role_id, "position", name) FROM stdin;
    public          postgres    false    254   t"      ]          0    17676    transactions 
   TABLE DATA           �   COPY public.transactions (id, transaction_id, customer_id, transaction_external_id, amount, currency_code, transaction_date, is_verified, verification_date, payment_method, notes) FROM stdin;
    public          postgres    false    279   -$      F          0    16879    variantproducts 
   TABLE DATA           �   COPY public.variantproducts (variant_id, product_uniqueid, variant_mrp, variant_sellingprice, variant_skuid, variant_quantity, variantsvalues, label, vendori_id, variant_category, variant_subcategory) FROM stdin;
    public          postgres    false    256   }%      d          0    42480    vendorbulkupload 
   TABLE DATA           \   COPY public.vendorbulkupload (bulk_id, vendor_id, productids, datetime, status) FROM stdin;
    public          postgres    false    286   &      U          0    17517    vendorclaim 
   TABLE DATA           �   COPY public.vendorclaim (claim_id, vendor_id, claim_description, claim_status, claim_date, reply_description, reply_date, closure_description, closure_date, image_files, video_files) FROM stdin;
    public          postgres    false    271   A'      b          0    42469    vendorpolicies 
   TABLE DATA           z   COPY public.vendorpolicies (vendorpolicy_id, shipping_information, return_policy, business_policy, vendor_id) FROM stdin;
    public          postgres    false    284   �(      H          0    16885    vendorproductorder 
   TABLE DATA             COPY public.vendorproductorder (order_id, vendor_id, product_uniqueid, customer_id, order_date, total_amount, order_status, rejection_reason, product_name, customer_name, product_image, customer_email, customer_phone_number, created_at, currency_symbol, payment_method, payment_status, city, state, country, brand, category, subcategory, product_type, transaction_id, commission_fee, withdrawal_amount, refund_amount, fees_paid, tax_collected, orderid, quantity, label, tentative_delivery_date, skuid_order) FROM stdin;
    public          postgres    false    258   �(      J          0    16893    vendors 
   TABLE DATA           �  COPY public.vendors (id, country_code, mobile_number, email, password, brand_name, business_model, products, trademark_certificate, company_name, company_city, company_state, company_country, company_zip_code, shipping_address, bank_name, bank_account_number, bank_routing_number, bank_account_name, bank_branch, bank_swift_code, registration_date, mobile_verification_status, email_verification_status, status, business_type, registration_number, tax_id_number, business_address, business_phone, business_email, business_website, business_description, facebook_url, instagram_url, twitter_url, linkedin_url, business_logo_url, business_license_url, return_policy, shipping_policy, terms_and_conditions, payment_info, shipping_info, support_contact, categories, average_rating, total_products, total_sales, support_contact_1, support_contact_2, vendor_profile_picture_url, brand_logo, useridvendor, vendorname, email_otp, mobile_otp, reset_otp, followers, following, vendor_username) FROM stdin;
    public          postgres    false    260   21      L          0    16900    vendors_notifications 
   TABLE DATA           Z   COPY public.vendors_notifications (id, vendor_id, type, title, message, date) FROM stdin;
    public          postgres    false    262   �5      N          0    16906    withdrawals 
   TABLE DATA           �   COPY public.withdrawals (withdrawal_id, vendor_id, currency_code, amount, withdrawal_date, status, bank_account_number, bank_name, bank_branch, created_at, updated_at) FROM stdin;
    public          postgres    false    264   �9      �           0    0    apploadingscreen_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.apploadingscreen_id_seq', 1, false);
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
          public          postgres    false    236            �           0    0    customers_customer_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.customers_customer_id_seq', 184, true);
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
          public          postgres    false    265            }           2606    42685 &   apploadingscreen apploadingscreen_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.apploadingscreen
    ADD CONSTRAINT apploadingscreen_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.apploadingscreen DROP CONSTRAINT apploadingscreen_pkey;
       public            postgres    false    288            )           2606    16938    attributes attributes_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.attributes
    ADD CONSTRAINT attributes_pkey PRIMARY KEY (attribute_id);
 D   ALTER TABLE ONLY public.attributes DROP CONSTRAINT attributes_pkey;
       public            postgres    false    216            +           2606    16940 %   audioheadphones audio_headphones_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.audioheadphones
    ADD CONSTRAINT audio_headphones_pkey PRIMARY KEY (product_ah_id);
 O   ALTER TABLE ONLY public.audioheadphones DROP CONSTRAINT audio_headphones_pkey;
       public            postgres    false    218            -           2606    16942 )   cameraphotography camera_photography_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.cameraphotography
    ADD CONSTRAINT camera_photography_pkey PRIMARY KEY (product_cp_id);
 S   ALTER TABLE ONLY public.cameraphotography DROP CONSTRAINT camera_photography_pkey;
       public            postgres    false    220            /           2606    16944    cart cart_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (cart_id);
 8   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_pkey;
       public            postgres    false    222            1           2606    16946    categories categories_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public            postgres    false    224            n           2606    17607 5   conversations conversations_customer_id_vendor_id_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_customer_id_vendor_id_key UNIQUE (customer_id, vendor_id);
 _   ALTER TABLE ONLY public.conversations DROP CONSTRAINT conversations_customer_id_vendor_id_key;
       public            postgres    false    275    275            p           2606    17605     conversations conversations_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_pkey PRIMARY KEY (conversation_id);
 J   ALTER TABLE ONLY public.conversations DROP CONSTRAINT conversations_pkey;
       public            postgres    false    275            5           2606    16948    coupons coupons_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_pkey PRIMARY KEY (coupon_id);
 >   ALTER TABLE ONLY public.coupons DROP CONSTRAINT coupons_pkey;
       public            postgres    false    227            7           2606    16950 $   currency_values currency_values_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.currency_values
    ADD CONSTRAINT currency_values_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.currency_values DROP CONSTRAINT currency_values_pkey;
       public            postgres    false    229            h           2606    17064 &   customer_address customer_address_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.customer_address
    ADD CONSTRAINT customer_address_pkey PRIMARY KEY (address_id);
 P   ALTER TABLE ONLY public.customer_address DROP CONSTRAINT customer_address_pkey;
       public            postgres    false    269            9           2606    16952 8   customer_delivery_address customer_delivery_address_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public.customer_delivery_address
    ADD CONSTRAINT customer_delivery_address_pkey PRIMARY KEY (id);
 b   ALTER TABLE ONLY public.customer_delivery_address DROP CONSTRAINT customer_delivery_address_pkey;
       public            postgres    false    231            ;           2606    16954 &   customer_follows customer_follows_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.customer_follows
    ADD CONSTRAINT customer_follows_pkey PRIMARY KEY (follow_id);
 P   ALTER TABLE ONLY public.customer_follows DROP CONSTRAINT customer_follows_pkey;
       public            postgres    false    233                       2606    42699 0   customer_transactions customer_transactions_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public.customer_transactions
    ADD CONSTRAINT customer_transactions_pkey PRIMARY KEY (transaction_id);
 Z   ALTER TABLE ONLY public.customer_transactions DROP CONSTRAINT customer_transactions_pkey;
       public            postgres    false    290            =           2606    16956 (   customer_wishlist customer_wishlist_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.customer_wishlist
    ADD CONSTRAINT customer_wishlist_pkey PRIMARY KEY (wishlist_id);
 R   ALTER TABLE ONLY public.customer_wishlist DROP CONSTRAINT customer_wishlist_pkey;
       public            postgres    false    235            @           2606    16958    customers customers_email_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_email_key UNIQUE (email);
 G   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_email_key;
       public            postgres    false    237            B           2606    16960    customers customers_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (customer_id);
 B   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_pkey;
       public            postgres    false    237            3           2606    16962    clothing fashionclothing_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.clothing
    ADD CONSTRAINT fashionclothing_pkey PRIMARY KEY (product_fac_id);
 G   ALTER TABLE ONLY public.clothing DROP CONSTRAINT fashionclothing_pkey;
       public            postgres    false    226            f           2606    17054    homebanner homebanner_new_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.homebanner
    ADD CONSTRAINT homebanner_new_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.homebanner DROP CONSTRAINT homebanner_new_pkey;
       public            postgres    false    267            D           2606    16964 $   laptopcomputers laptopcomputers_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.laptopcomputers
    ADD CONSTRAINT laptopcomputers_pkey PRIMARY KEY (product_lc_id);
 N   ALTER TABLE ONLY public.laptopcomputers DROP CONSTRAINT laptopcomputers_pkey;
       public            postgres    false    240            w           2606    34038     media_library media_library_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.media_library
    ADD CONSTRAINT media_library_pkey PRIMARY KEY (media_id);
 J   ALTER TABLE ONLY public.media_library DROP CONSTRAINT media_library_pkey;
       public            postgres    false    282            r           2606    17627    messages messages_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (message_id);
 @   ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_pkey;
       public            postgres    false    277            l           2606    17598 &   mobilehomebanner mobilehomebanner_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.mobilehomebanner
    ADD CONSTRAINT mobilehomebanner_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.mobilehomebanner DROP CONSTRAINT mobilehomebanner_pkey;
       public            postgres    false    273            H           2606    16966    payments payments_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (payment_id);
 @   ALTER TABLE ONLY public.payments DROP CONSTRAINT payments_pkey;
       public            postgres    false    243            F           2606    16968 1   mobileelectronics product_mobile_electronics_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public.mobileelectronics
    ADD CONSTRAINT product_mobile_electronics_pkey PRIMARY KEY (product_me_id);
 [   ALTER TABLE ONLY public.mobileelectronics DROP CONSTRAINT product_mobile_electronics_pkey;
       public            postgres    false    242            J           2606    16970    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    246            P           2606    16972 ,   ratings_and_reviews ratings_and_reviews_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.ratings_and_reviews
    ADD CONSTRAINT ratings_and_reviews_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.ratings_and_reviews DROP CONSTRAINT ratings_and_reviews_pkey;
       public            postgres    false    248            R           2606    16974 4   social_logins social_logins_customer_id_provider_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.social_logins
    ADD CONSTRAINT social_logins_customer_id_provider_key UNIQUE (customer_id, provider);
 ^   ALTER TABLE ONLY public.social_logins DROP CONSTRAINT social_logins_customer_id_provider_key;
       public            postgres    false    250    250            T           2606    16976     social_logins social_logins_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.social_logins
    ADD CONSTRAINT social_logins_pkey PRIMARY KEY (login_id);
 J   ALTER TABLE ONLY public.social_logins DROP CONSTRAINT social_logins_pkey;
       public            postgres    false    250            V           2606    16978     subcategories subcategories_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.subcategories
    ADD CONSTRAINT subcategories_pkey PRIMARY KEY (subcategory_id);
 J   ALTER TABLE ONLY public.subcategories DROP CONSTRAINT subcategories_pkey;
       public            postgres    false    252            X           2606    16980    superadmin superadmin_email_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.superadmin
    ADD CONSTRAINT superadmin_email_key UNIQUE (email);
 I   ALTER TABLE ONLY public.superadmin DROP CONSTRAINT superadmin_email_key;
       public            postgres    false    254            Z           2606    16982    superadmin superadmin_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.superadmin
    ADD CONSTRAINT superadmin_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.superadmin DROP CONSTRAINT superadmin_pkey;
       public            postgres    false    254            u           2606    17688    transactions transactions_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.transactions DROP CONSTRAINT transactions_pkey;
       public            postgres    false    279            L           2606    34053    products unique_skuid_vendorid 
   CONSTRAINT     d   ALTER TABLE ONLY public.products
    ADD CONSTRAINT unique_skuid_vendorid UNIQUE (skuid, vendorid);
 H   ALTER TABLE ONLY public.products DROP CONSTRAINT unique_skuid_vendorid;
       public            postgres    false    246    246            \           2606    16984 $   variantproducts variantproducts_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.variantproducts
    ADD CONSTRAINT variantproducts_pkey PRIMARY KEY (variant_id);
 N   ALTER TABLE ONLY public.variantproducts DROP CONSTRAINT variantproducts_pkey;
       public            postgres    false    256            {           2606    42488 &   vendorbulkupload vendorbulkupload_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.vendorbulkupload
    ADD CONSTRAINT vendorbulkupload_pkey PRIMARY KEY (bulk_id);
 P   ALTER TABLE ONLY public.vendorbulkupload DROP CONSTRAINT vendorbulkupload_pkey;
       public            postgres    false    286            j           2606    17526    vendorclaim vendorclaim_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.vendorclaim
    ADD CONSTRAINT vendorclaim_pkey PRIMARY KEY (claim_id);
 F   ALTER TABLE ONLY public.vendorclaim DROP CONSTRAINT vendorclaim_pkey;
       public            postgres    false    271            y           2606    42476 "   vendorpolicies vendorpolicies_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.vendorpolicies
    ADD CONSTRAINT vendorpolicies_pkey PRIMARY KEY (vendorpolicy_id);
 L   ALTER TABLE ONLY public.vendorpolicies DROP CONSTRAINT vendorpolicies_pkey;
       public            postgres    false    284            ^           2606    16986 *   vendorproductorder vendorproductorder_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.vendorproductorder
    ADD CONSTRAINT vendorproductorder_pkey PRIMARY KEY (order_id);
 T   ALTER TABLE ONLY public.vendorproductorder DROP CONSTRAINT vendorproductorder_pkey;
       public            postgres    false    258            b           2606    16988 0   vendors_notifications vendors_notifications_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.vendors_notifications
    ADD CONSTRAINT vendors_notifications_pkey PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public.vendors_notifications DROP CONSTRAINT vendors_notifications_pkey;
       public            postgres    false    262            `           2606    16990    vendors vendors_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.vendors
    ADD CONSTRAINT vendors_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.vendors DROP CONSTRAINT vendors_pkey;
       public            postgres    false    260            d           2606    16992    withdrawals withdrawals_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.withdrawals
    ADD CONSTRAINT withdrawals_pkey PRIMARY KEY (withdrawal_id);
 F   ALTER TABLE ONLY public.withdrawals DROP CONSTRAINT withdrawals_pkey;
       public            postgres    false    264            M           1259    16993    idx_customer_id    INDEX     V   CREATE INDEX idx_customer_id ON public.ratings_and_reviews USING btree (customer_id);
 #   DROP INDEX public.idx_customer_id;
       public            postgres    false    248            �           1259    42705 %   idx_customer_transactions_customer_id    INDEX     n   CREATE INDEX idx_customer_transactions_customer_id ON public.customer_transactions USING btree (customer_id);
 9   DROP INDEX public.idx_customer_transactions_customer_id;
       public            postgres    false    290            �           1259    42706 "   idx_customer_transactions_datetime    INDEX     h   CREATE INDEX idx_customer_transactions_datetime ON public.customer_transactions USING btree (datetime);
 6   DROP INDEX public.idx_customer_transactions_datetime;
       public            postgres    false    290            >           1259    16994 !   idx_customer_wishlist_customer_id    INDEX     f   CREATE INDEX idx_customer_wishlist_customer_id ON public.customer_wishlist USING btree (customer_id);
 5   DROP INDEX public.idx_customer_wishlist_customer_id;
       public            postgres    false    235            s           1259    17694    idx_transaction_external_id    INDEX     g   CREATE INDEX idx_transaction_external_id ON public.transactions USING btree (transaction_external_id);
 /   DROP INDEX public.idx_transaction_external_id;
       public            postgres    false    279            N           1259    16995    idx_vendor_id    INDEX     R   CREATE INDEX idx_vendor_id ON public.ratings_and_reviews USING btree (vendor_id);
 !   DROP INDEX public.idx_vendor_id;
       public            postgres    false    248            �           2606    17001    cart cart_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 D   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_customer_id_fkey;
       public          postgres    false    4930    222    237            �           2606    17006    cart cart_vendor_id_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);
 B   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_vendor_id_fkey;
       public          postgres    false    260    222    4960            �           2606    17608 ,   conversations conversations_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 V   ALTER TABLE ONLY public.conversations DROP CONSTRAINT conversations_customer_id_fkey;
       public          postgres    false    4930    275    237            �           2606    17613 *   conversations conversations_vendor_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);
 T   ALTER TABLE ONLY public.conversations DROP CONSTRAINT conversations_vendor_id_fkey;
       public          postgres    false    275    4960    260            �           2606    17011 2   customer_follows customer_follows_follower_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer_follows
    ADD CONSTRAINT customer_follows_follower_id_fkey FOREIGN KEY (follower_id) REFERENCES public.customers(customer_id) ON DELETE CASCADE;
 \   ALTER TABLE ONLY public.customer_follows DROP CONSTRAINT customer_follows_follower_id_fkey;
       public          postgres    false    233    4930    237            �           2606    17016 3   customer_follows customer_follows_following_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer_follows
    ADD CONSTRAINT customer_follows_following_id_fkey FOREIGN KEY (follower_id) REFERENCES public.customers(customer_id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.customer_follows DROP CONSTRAINT customer_follows_following_id_fkey;
       public          postgres    false    233    237    4930            �           2606    17021 4   customer_wishlist customer_wishlist_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer_wishlist
    ADD CONSTRAINT customer_wishlist_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 ^   ALTER TABLE ONLY public.customer_wishlist DROP CONSTRAINT customer_wishlist_customer_id_fkey;
       public          postgres    false    237    4930    235            �           2606    17689    transactions fk_customer    FK CONSTRAINT     �   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id) ON DELETE CASCADE;
 B   ALTER TABLE ONLY public.transactions DROP CONSTRAINT fk_customer;
       public          postgres    false    237    279    4930            �           2606    42700 !   customer_transactions fk_customer    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer_transactions
    ADD CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 K   ALTER TABLE ONLY public.customer_transactions DROP CONSTRAINT fk_customer;
       public          postgres    false    290    237    4930            �           2606    17628 &   messages messages_conversation_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(conversation_id);
 P   ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_conversation_id_fkey;
       public          postgres    false    277    4976    275            �           2606    17026 ,   social_logins social_logins_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.social_logins
    ADD CONSTRAINT social_logins_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 V   ALTER TABLE ONLY public.social_logins DROP CONSTRAINT social_logins_customer_id_fkey;
       public          postgres    false    237    4930    250            �           2606    17031 3   subcategories subcategories_parent_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.subcategories
    ADD CONSTRAINT subcategories_parent_category_id_fkey FOREIGN KEY (parent_category_id) REFERENCES public.categories(category_id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.subcategories DROP CONSTRAINT subcategories_parent_category_id_fkey;
       public          postgres    false    4913    224    252            �           2606    17527 &   vendorclaim vendorclaim_vendor_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.vendorclaim
    ADD CONSTRAINT vendorclaim_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);
 P   ALTER TABLE ONLY public.vendorclaim DROP CONSTRAINT vendorclaim_vendor_id_fkey;
       public          postgres    false    260    4960    271            f   >   x�3�t,(��OL��K/N.JM��5470167��0567����IU(.�I,��K�L����� �p)         5   x�3���H�䬮Щ��ɩ��M,*qI-�LN-�p|2�3J2�2�ҹb���� ��}          �  x��UMo�@=/�bO=�����R���Ur�S]j��q�FQ�{gY'nWJ*U�.�<�7o��nV69�6}G.�ə-����fmɧ6+-�v�y���ͺk�yO�!?��3.B`! �"e"�Akɝ'6�2I��R�4F '\��˺ˮ曞���ʎ��s�-���{J��yF ]��"�p3��yo��3�%�����.�ki~��'v�	���>�	�!�?�rO8_8е�ȴ�\"{�d�i��@
���'��P��)�X*x�t$�Q�3��f�+�<sx�6o�+Xv|��	س�?>�zQ/*RW�=�ٺ���Q��]��ݠ�ᛕv7ނN�J����^ۍ]C�l��H<"��o��8D8���!GD;�.fHW�R��T����1���	�X�:�'ru�o�'��Nht'�@�z\��G!�A�C��ն(�bU^䑸���*Ǔ��:�w%x�����k>/�t{:�c E�5��`"-���D�s����#��]����ϳ�=(}#̨|����U��K״��H^�Sq�BIlֻV�Lq�*�9J$�[�] %i���M�6+����1�S�BDB0	��H��Ib���!��+R0\7�f4~?�f�eyN4��?]=���sa[:-lfg/e@J��E��X�{m(4��L��9`V8�]G�'h����jo/j49�p�O�0(#Q�$���C�-�L��ly\DA�fc      "   #  x��QMO�0=���'n�b7���!!�4q��k
ݒ�SS�⿓��I�ʓ��؎�"��l�qy���Gv�42�Z��@^�����nZT��a��,AL���j�l(OKIuU�%ﺑ�x���<�}D0�SE,�A���;PD���������Gb�@9�����Jv�`��̨p�����W�B�\I6ڧ��!N���Y���s��$ŉ8�J�:HA<'���m�q����o�[�����j{t�[���
�P��E]c�K��2On���à��n���ViE����^      $   %  x����j�@���)|��2gn[{�H)tӅ��U�N�����X�.n���N��Ȇ��@"h�������f���о��X?��_rs�9�}�,���ME�g��mD�	�]X	L��.�hcL�4)�@6�+��,;��ِl>�����d�����Iu�u��������p|-�aӕ�yj�����p�Bf�-��Hq�6��	��C4^;�g�?��m?�~Qw��X���ƒ��\H����ޖ�a&d�l�7�7���<2޺f9���'��N��t��6M��y��      &   
  x��Z�r�8}f��O��D�q�ޜ8ٹ��8U��*-1�fd�%Ҏ���)��ǩ��6�nP�'�y�;�%i��	��g�f�S�+�+���
�Ġ������;)����*�!=�f?��]Q_z��*e��FM�����z}���򹸽�����FQ�P5+ɉ�BH��.��X���>���Ӯ>UuY�aFp��S�8u}��V�vE�c1������j�P�e���<���@Τ��5�A^�I>��6�.�����zY��J�ݬ�y��Ub�(�d�T�J>����<`0^m�<��Ej��b";M&]�H!�u\qI�֔����>mj�h�_��|ك�
�Y3�M�c+�VB�����@��8��@��7?n�ü(͌����j/\M����֌V3�:Oq�|._�F�C�O�p��̍m$=,�/�h�0c���	hw����ى�U�(R��^w�+�@4�!ye,��8��J?������3�p_j���u�>�^�J�(:�J��!��'WOu�Pָ��)������j@�(�� �jD�>�}���e��_8�Q����pn�b=�M�z<���䏯_q���ss_������e�䜫��������B#�jAGiy�*�:֨�C���zw��I4��d�3P`8c�:)�Vp�"�W�i�!G}�E<�J` �5�ק�5i�!�[iG�1��&�|t�},�͒��H����z�Q�I�Q�m�*m���\�䇨�4U����ź8%�1.x�tI���u�#�CU��C����)��ʬ��1�Y,��*N��6��@<�E�wN�|�+#�5Y7��u/U�X���
!_���/,^ӏU���iWS-����u;t��%C����=�����3�Ƃ���*kF��KI�)��!�J[�J�*��q^����`{V�v�buB`���8冐Wg��kؤ5��E~<�Nu,�,�Y7��y��Z�k����}��S4y_�O��F �=a%�]?�J!7o�*�7�gN��D*�%O�� �|̟�=:���c�wݬ>e�j��S���B?�O�q�����2�T��!߭�^^_}�J��+�*ş���x����|��mQm��G��_s��0������i�WHn��A]
T,�{�|�ʗ��k=�a����i���	�B5 v�����}n�]��m�w����bp�54R�4��!������[�w����XR�����0\�~�?���X�1u���
!���cy�]���S�-��|�l���6k'�b�4a�6�b�c���{!�g�4^X��h�^�y-�朕��oǊ�� �
5�G�N��k��2��U���6L�ȨJ7_qK�Ԙ�cP�V�������J11�[TI^�����y���GSօt�
�D+e��֫<b�x`R�����I�y�}�|���`Gj��̈�Il�d�a��hKH�y�QLi�?��N����	�30�e�<Ɔ��K���a�����-c���|��1(����}��o�_���i'NYV+@i��� :SZn�;g�34>�F29��0H�j��͒϶�z����>�_Qi�-���n��B�E�Z�1��/�6�hw�nc�/D#��#�#y����)��Iy
��˂��
k$��eճ�|3��(�2�FoZM_/a���b�g0�ч@K\-�d$�$v�$��0L�lF�Ѓ:MgYb4x�rl��T2y����HJ���T� ��"<1"��51���B��Q�I��(� Y� �"�,1��Hn��#��T2N�2�xqo��(�C�s�6��k~�b��޴`i�m�0y� �6�B�j����;�~hT��a݃<�lv�b�¥`��A�p>S�1F��	�z��i�M$k��etE?�2�=�s�RH�{P� J+�F�!O�'!i��b?B��UEly�xr	Y#�����>l��MH�����5��z�罔zB�8�kr4����=�_�C�r���co<j!B�S/IJ=�87gDsK�p�� Ͼ(E������������"暻nL�J��6�|���(�j�6/v%5�ާy��F�9l@�K�8�g�A�&;��Ƥ�\�	
���{�7˽ٸ`�.�57ft�BA�bN��H���;�x��شg��}��
80��Q��љ�O�� �jnG�T�y`��y�l�QʰA�5��,0�+:�bQ��<�;oX�WZ�P�fbP`X��,�ZSōI����[������KR��*��kn�6�M��͋+e�}� 
̞2���Zş�\�6�j�!����ŷ�:�����V�U4Q��i!o���C��&mn�VӒ6ф�W�&֡��<m�M��㯿'�[�vRE�8�C( `!A~����%SC�����Q�*X()����Z�M˛�M���|�>���m����Z����T9m�_��gw-��g��yi�VL��^�A�y�=���L��d�l�����4��]� 
,k�<m����r?,r�=k�A��vU=(`4��>c;H)niP`���~�F�Ʉf㾵Ȭ{�f$XabP�trus}u��S{�y�(:ڼ!�]�~!�޽�?	�V      (   �   x�5���0���Sxb�P~WB0��K�ZIJh�� �R@��N��[b��h��7���TAt����6��Qv�O�)���=�3�64,)񫋚���3�Fmn�q�VG-��E����gwo=#��{\p9o���&PL�,��~��=�BC#Z�%���X�����1�u���[r'I��DE�      Y   1   x�3�47�42�L.-.��M-�2�47A0	�!	�qZ�(����� ��S      )   -  x��S]o�@|ƿb䨒#�1&v���� q���p�Q)D'����������j�n�t3�s��BKԣ�k�4S?�uZMkjS��,[�:�S\����񷟇��h�9j;m��7��f.�ݫ���`�W������)o?��0�X9��q�Zd�nה=�z@����*�{�Wp�f��]�@n�~ Kӈ�N7]K�sL�f�^����_s1:�XӘ�ܔU����T7����M���
7���o+�!����6���g8�᩻^)���A5�/1���eUy?�~�yd��'�{Ζu�$�	\�
i�H6���,cf��6Z��9%�#�ܘ��"�ByT��a��������X�`��R�I7�bY(
�Xx<�H�5]�9"��PE���ࡒ��t%�Ky�V<�1�4�V~��y���4b.�y��� _�ߏ�������D�:K,�������ջD�9&����11s�"s�:���l9��KI��wO]�yS��)�����+����Ȁ��f{��� �~JcAY�ʃ�!~�y��?�F�v?0      +   ,   x���  �7ÕSl����01�QJw!��.���'�yv      S   <  x���Mo�0���Wp�T��&�J����Kw��-R t���~�C+ݱI�8��>o!@rؘ2�56EڞK<�`颺��[V�)'�����61a@C��R��@\���n��3�%�ty�`WBKHM�'B`�A�'�9fH��l��V:�(gA0�J1�S4φ�_�Yy\#q��9&��#9��a$gwےq�����������{�-�ni��~���gA/�=΁���z��C��=<B*.�T�g�����q��
���$~��f�ac i�;|��J"�΄f�3���?�K�!���i>LX=�s@,�Eb�Nh7�<��;�       -   X  x�͙Mo7���_������	�$���n{ʅ���V���*u�_ߗ��,�(�z`XƮm����Y]��a��Pw�q���㺿X�U}�^M���wo���������������>���+�������î��'���sT���#_������p���U'�v��=?s��v;��������\�	o_�էK�ޓ۵&����vx2��ǾPpM��	rD��٥�^�ד{�����BD�riD�@�faQ6tŻD�(k�R$��� K�K�ؕ`��X�$�ͧt�]���������+���"m`M��\������u^9|���f
�n���/qCn���`No/ƪ�D����$����q�Q�]�ϧ��ˋ�3���@V>p��;��)b:�@�rt�|��Ĩ��vҶƩ�#�w.���ߴf�M3Bp�L�qX��zD���g��54?��a��n�o��X��[h���8o�y�`��_�ẍ����0a]`�#z�ց
އE�a�J1d�r"�XZ<�!=�F�0<�
z�m�ܭ���MҬٝ��M����<�'w�q���_gk�&�����
��k,���Ҷ)��ť�F{lV��I����G!�V�R�>7!P��[|%QVt��=������Ch����R�iH��ýD�X�2�\����~�Q�H�77��]�{�>�`n��<a�N�_����HĨ�Q��3���mq��(Qbb�D[@5���1��a6^ؑ�zx!GJ���;�&P�(��W#��m�pR�&�Ă��+E	��1>
F>�)$N�`����PH��؅G*�m!� FԔ=&�Qa�v�4�J
�:V��B��"�sȀ	��5Vbofe������
/q��b�)��"�Q��{̦�Kl�E��y�s��Y��[�X����!&�
��Jle��Kn�)��FZJ�0Ơ)����3�`a�(�����-���K��K��;q3��K��K9�����+��̄��Sj4�������(Eۼ�M��M1Hʱ��n�Fn�腩��7E#7Qb�ٷ�)Z�	�)�XC	j#5}��L������?=Pc��pJ9	��o<��7���ܞGP�����Ȁ>���Np�9���r;$(Kn��ʝ�����ݗ��ή7,�k�N�~�H
퀚�"���5(F*�fܶ��x����wMǄFv_�H<��I����H6�B1R̩p�zs*$�dN�[����)��T���5.AAbCE���>C:��X�I���[�'���?���X*Y	j������X(*Y)j���������XH*YIj�������E�"�Q�����r�*�i�JV���E�۽{�u�?��c�      /      x������ � �      h   �   x��ͱ�0��x�� 俻�R^�I�`�K՚+��oo�$���1q�$[�Kv��Jh��Tk���-�9���9�� ����q�Չ��KNf��C�f�4���������=^N�w�̜�i!��0w������Pg=NտSgN������-�B�4u�Tڿ����xF�[�      1   �  x���Kn�0�5}
��g���m��@� ^t�� ��P[4(�An_>l�N���\Pħ����aX)�R(���=������UӸa�s[�>�T��q -Q,	����XQ��fF�J0��L���g�q������zl��X`e��v�e��+]"��u?�_]���Gw��g~v�SL< d��A+�8��`�@��g&:Hd�X��$���t7]��0m]?e��/��
�И=�#�!���[wS������n��{K�9"1Ԝ)mHb��y�1��k��޺P?�~�O�޵/' �?�H��<�ZQu!(y��������/:��Mu� �D���h
H�D.�j��8|�Ƶ�!���Ƿ]��W�*FH�OT K�b��E���Y1�\��-��,�Jo�<SE�=�U��m�z��\�I��<PYY�ԝ��g&-eJ @a���q����������|w���7U-fb      3   =  x��Y�r�HҾ�y
O�=s�}�����hv0�n�����II�����/a�c�MȀ��B_e旋Q�s�Wzs��%ZF�/��j����t�U�+O��@�K-?��L���r��*����lk��M�NGS�;5���mҁ��W��>��(v-�`��V-E�Nl�O�X��HQ��T@8D
�'H3�e T�T#�D0����bW�R金� ����N˩T��׉�%ț~p��>쁻z��v�~؁����je��_o?A
iOP�P�ATL@��2�� ʤ����q�Md�ӕ[~��VZOg�6_M�S����/z�=O��j��V�Kuz�ѯ�ۑ���]̍��#�RSBL�P������) ��&��{B�,��b����g ��jX�=%���g��v��9���r3�2��S���t�R�-�_c\� �4�0����\�#S���c1Hԡ��gۅ-����跛�ZQXˍ�/�2m�@a�]7��;�*Wk�������d��p�P���2�dR�(&�D@9=;"�Zg�Y�M���M%ң;�&�{#�jv���6"�aU3Tc���`б���hM�x�5��U�1S~�I\@�(�_�T���#�e��:+�`A Έ�����ϰ�g�^�JC�6ꢻ|})Y��U��ǝp��Gg����"�tcG���'����7�	Kơ\�#y�=]`A��X�ϑD����F�����H��,���E50[ƴJ�3Pc���Z���r����+����Z��J>O�B�� �;�T��`.��E� C�)4q�����j��'��Pv�&��Ӛg�cE�g���9�ƭϟN|rI@�7��0H��Hc�h Q�H���ʈe���G6A\^FHh��I���ؐ!�)Qz����է������������5�$���e0S��G"�72�s��Z�ƴ��aхDz��jt�ب��p{�z}ID��(Ԉƈ Q������O����~p�*-F���ZG�P]�{S8@���*�	���+�r�"=�^�>�k�
���nI���*���{�zL�	�U�f#���B��+E~$W�(=����=P��^��K��dS���o��x���W��j�N�u6,(5F�� �~�$ U$��G�wP�߂B'�(qu����{�U"?�r�.uLh���<�����i`�����`�=�a�}�/��x}̄�i	0��L3H:�P���$�k�;����F���At΃�cT�%���=��41����m.�=��\�M/�g��w��Z�#�zΗ� Q�e�x�
��T�%5�3DH��o�
:)^R <��GP��Km	ܦJ�:k9}��ͶN��t��LQ{�y�P��KY"����.�;��I����.\[L��6���U!dz��
?��%�˂�6��n(���� ���v��[���uh��ݠ���X��CnmyV��J^c7.���ڌ�k1-��f�=],Ʊ�o-vR�8!��t�j�m/�����Z��Eo�%��i����kh�5o�f/�s���	`�M���0T9��G�(��gPG�3&|]<KW��i��O���/�<�+.��u�eO�~��s��{_�-��?�VK�����P�7�������u8��G�w���ӓ�n&�z�;.�m������x-����"5[���f�-�!{1��I�F�뿌礼k���` �A�T�ۧ�(yw@Y��8��3*z�������ٽց���UYg+/�vImoׅ�6��{�h����!��nyR�_��OXR9T	�����Jt�Y��[tg�3:v�x�FN�`���7/����f�ju;Z�r�IePI{iZ]�k�F5h���vq�ZF�&�	v��W���+��v�H�ȴ���d�}���ߛ-����4�e��E���F1��M�J���zș�fa���P(�/��S'�Q���s�zV���#)�e��|v(+�;�M*c�K�&���&
��;x�F�޶֣�K�m�p��a�ν>Ӯ�>� �^�J4�kJ��h4k���6�JtqM��[��'EI:'tɎ�v��ge�����?�����:Jv��~<ѓ��ܳ�(n��&�zn��U����V�q<b��f���;�2g������Z�RR���# ��.��D���Pf1�H��m1�Q�GE$.]�̈Y#�C���mGѓ�^��owr�Q�լP�l���H��N������H�F>�Y�㲽eT9Z�sM���K�0���f1x��[X����RY��e=�q���r����]O�V�7
-Yn+�y��q� W��_���Z�O-�ץ�M�@�JKi>�W�D�ErV��"���S��S��A7ɩ�N��1I
�@ɬ5)w�Jd�N�G��c�z��g���C����S���ʦ��=����Y��y�Ջ=e�/-���˖�i�O��}?Hu��(ݽ�AyF&�aus^�uXQG-�ȍ��۟i{�y]:�6��^�:J/�5A��I��H
��G�AaF��"M�؉"Jת��� ��?~?�#o�Q�&�e����t��v!�/�! ��Bebw���j(�P_P[o9�����ۆi�;�Z���0����n���ɨb�r�B,	w"�p'g>}1�A�&(�>�t��&�Ls���!�IQ����B6�[����D�I�q�A����kB����o��S���j���	�Z��j5�ac��N�b�y0��V�4��Ѫ�v7ߠsx�b-��%��/wE�CW�+E�'����(�w��X�YΕ� IΣ���b�d����P骒��#�}["Y�HJ&2�=�˱�Zꯖ�G�W�uR�_�"a�6~$��`�=	Ð��Y#Z�w߆��#��x'�Fӕ���g�И�+*7���Ltx�5���8t�u�{s�ՠF�u����o]S�y�<��OF���>rC?� I���l�T�%��#ѽ}cB@�a2*��?�y:�͒������v���K�_ie>����?!:���O�e8�(��r���7�WΔqE�}�f OFÈP��G��5�,���suށ�֠7ո�2���t#�v��a���_�ːq Â�<�4�,�O�?�?�,�W�      Q   �   x�e�K
�0�u�s�$�ԥ�>V�V(Q�R�&��Bo_�E���`�)k� �n�@�˹k���8+�1�|�U�S!�P�Ȣ�8艮�2�Gsc'�"\�YY�����8��P���e�g��f���{�}��~���X�T��DÜ��� �4>�      6   �  x���Qo� ǟ/�"O}Z,���-�4i�&E���/4��-̸M�i�}����Z�k�d���ο��f��Ej�I��N§;edL~h�m��;��@�p�J([ .�����X�q��y��뭛����[w�ם�o!1�Dp\��Ϊ�m��!EH���׆B�c�O�����'lcn][E���"�3��W�Ł���
E�DLRv@@����' ��/��*���h�hk��E0��C��%��������H�~���E��@�D�)ʠ�)8y�p�ލt�O���I���#/��a�k3 Ґ�0go�ƒ~��/7�?�F���/�Z�m�TyQQ�� \L�Z.K��ՙ���v���.�<���f�+gg�l���$�Y��8z�֞�62��EYb!J*����r[_Z{���K���c��י�������{�l�paV�<#��N!.((�u�N�U��4��fF?��6QE�x�}�^d���7$Ə�      `   �  x���Mk�0��W�Ү��x$��})��S`Y�j0q����_�BJDr���y<zy�"6�Ý����.횛�����S��5*�o���y�6��������6�o�|��o�i�O�p�`#stl��[��!]9E���=S`/y�q�}JC�����4=�]�7_����O���yI��4B��W)$ȟY(�ѡ^
��w4�?B��-(�#x𬲔��@l��(�U�"<����}�����O��vx?�9��7�^�D�F.Z'@ߺVx� #r$g[.���	Ah�@#�W� T
P���SȂY}. �0�(�2�H`��BPU�Y L�w@9�,%����:��xi��"��<ѵV�젪��6�������1��cw�_�\�W�ҳ�����/���       [   4  x����n�0��)�ꦝ�w����(�v1�D��<��ZA����rLU��l���?6��Q"�J�M���g�"F�R���T�L��H�Ɇr�X����,!�4��T\���&J˸L���2M�q��uW���&�d�8k@�A� N�����ya_R��_���@���\�2��3a
����E�N���:��\T>�R�����
aH
�/��qM�d��Zg��P�G��N�rv��j�M��$��zgݣ�aE���麜k�
�D�搂d@��¶_s����Tg3wuG&�a|���}W��̏=�!'�D57\@ 
�"i��_���4� ������k�-��-.M�s�����۷��biQ�*B�0E>_o>�SMl|�ORW�uk�����upg���Eu<����B1�	4N�bc1;4O�ɆCt$�j��e�	ĩ8,�kB,��/���!o�ö��6E�,T�&5��˿]f	�~R�ش)DS�:TZ뿔��%�oB�`P�W^x3\&[{��.N���ϛ��c>��      8   P  x���]o� ��O~�K,�8�k�,��tռl��bpB���մ�>���J��I6�s �ׯ�$�si��BI�t�.ꍮ$PL�!#!�&Q2�i@�	y��I�ߞp}	���Mc8\TBq�}=�Y)���J�z�J���V
8��RB��}0��1����b�7��w�(���C:?�8HG��7ρ���}�VȺ��p)���@�o��'WW�߇Pn]�r�!S[_"��"W�{��Y;�'1\�J�{n��f��2W���� L����m�hv+M�"B&4��I�2F�S�/�g����K��>ba��g�q:=��!E�3��[�-�-h����iwm�=�:!�i��;�7J��vϛ�q|���m3D�����YwE"� 9��h۝�����;�uK�P�����wЗ�*YB�N���U%��"�a!�+ÝY^�;�����1ldY�^�:���$�x̞��	�J�̦�#1#��Uw%;
=�H������"��������#���
s٠^��Z�b�+��߸Q�j�{��U�h%n�����*u���@��d<v7N��G�^��^�)��u��3���_ �c�      W   r   x�3�� .��4C0�L��44@bs��'e�:%������Z�X���:�[�ǧd�'�d�&����UXd�Ż�e�s:r:r�LK,�D�=... 1�+S      9   �  x����N$G���S����쪾n�i����+��d"�׏��g�{�d��F��]�?;Î�����5R؋t�__v=�G ����}7���~�w��������>��_��?�tdWڙt�0��������#�`A��#K>�y�cw������>�=�����vw��o�ߟ_�vC����L+�h�1����H�1����1}�n߾v���8���ח��%ɏG�5�`�Y�נ�X���������~?t�xxs�"-IZI��@ϑ��FRFeJi��D�FNdV�(�����HBI3�
)��ڀDPcRb�3k����Q,�-H�'
��W{�����IY�T9{�`H�9<�#�d��px;G�!JU�f��5����LW��`�(DT��m���Az�$�)p��U��m3�JBbq�Õ�Nڎ����Zz
&n�pU��ڶ��#���vNUF�乒VN"�Ωj��ʣ�\u
'mqo<�5�&Y+��iOU�jL(k�CN��S���xMEE�vu�*�!e[x��I�nⱩ�D׃�pR�S�@�����[̸�S� ��q�I�$m�H��c�׸x������#UR���M�?N�3F���I��Z�Pn5-�z�(4�G����LyQo�C��M���h�x��
��iˤ1�O�k1��G���g�-,M�s�Ug��I�$ɺ��FN��&D�4�D^��H`؞�x�E��9���Ū䓂��%D�[�픪>�IYhh.��6p��jAre��b+�i�[�Z�#�$�qd4�L��-ⱨ-_�I.V1P����4 U9Ȓr���s��IP�//�iP��Ed�U����i�F��̿�@�A�$�$����A����N���l���#��mP:-����"G�A1h�Qb�E�&�5 ��J�w����M;�ȸV#(5 Ue@c���(��S�ŋ�Vz�
��?D=SpWt�_� �T�����tw�&�!��=�t��[`�S��xRp��ruoIr,�wQ]�3w� Q:�T��#(6��0pkpV�"�X�Sq���'0.��;�vyάjEN���VP.(�}�q��5�#�	��n�l��K�����XrxT*�R|�9�|7��s�v���UI��pG��}�����͔X(�#��(�)˄�Ǆ��/��������q�||�z1�
�gU/��3�]n�(/��"�W��puu�9�e      <      x��]K�ܸv^k~��	p�T&)���m{<63m��h���ݚ�������f�U�e�A_ �"��n��⟒CRԫ�һ�=���.�xH�C��w12���z�LL�7��|7���a|�_�?��n|��r��_/6A���<6�Y7۝�0O�(���A\�cd��<y~��"y�C�!������N�8��w�l�\�m07?��ks{F�?� �57oW�"0�����m��9�m���
�W��f���buu7�g�O�y�q�^/h&���A���&�O��)��� 牍�qw2�I��t�g�"�9ġı�9����v���j��6B���̹�����%����������ܹ�W�??����m�Z>z�h����.z��b����g�o�hk],ŧ
+�l��C���O����Wa���O���������|��?���?����o�����¯��_�?���m�U�;{n|����Y-�Yd>?y{b����L�\�s(��&�5��V���pH��ϟ>}���
�H�m�I~��<��p�s_��~!���s��i�q�_"J_"1��D�G<�m����(I�t@����XCW�������Z���Zl�)0���'6�|����go�L2u¥���k�w���<�d�|\�oWkS�;[�N��F��j�/Bxmw��|�Y��}F�m#��qrr�i�qa���ىq"z.N��+�X>��۳U��^Ã$���!�{��<[K��L�L��o'��m���O���|l~�Z�͓�j�#��zk#AuD���jv��ᶬ���>��fy-����nc~���"�Md���B<%��ëkkl.W�[y�LP�܄�If��3�D�x�#I�.�虧��В�Zo�[��2O���������t�a��Faʡbʱ��%$�՘����f�6̫�f1��"�D�Z��c�Gk��`@��Ő5���jm�S�� I�_2q�t����a�3O����d���C8Ls 6w0�\αc����<���\����[x��~2%u�Z_�.L�^R�����������|{�	|���c.�~����7���x}�G���ܭ�`n���|��K�5G�4K��ڼ�#[��H��U$	IPDͤ`�n`m���w�������c������\}��<�W�<��y�3ϻg�U�y^v���k�TYa(����*
�o`,��&u�|��y�Y�㶃�#� n`&��2�ub��_�R�Ih��%�����2�yr�.���//���&�] ���Anz�x������!�r>��E���hk.ۚ�����?/eC��_&�431Ŭ�ǭL� �汾��\<	Խ-��ԱT#p�о�� ȋĤ����ۻ]	�fL�������dH��yP��crM��6��[���ˤ7RP�>����b,:hª��"<dF��Y�R��/����]J8��5��K���V2�V�ؽDZh����P�[��P�������	��B"w����e$���%"��eC��5MÃ��飜l�^8g}��;�<V+z$���ɋ��3�P1�_��q��RXg��¨�X��@/��K�XoB.f�6�j�]R�C�*5	�/H��F�+�@����T}�N	��V�<���m(e祿�z�'0�j-+#�-%��B�ҥlI���R���v@��fډL"11�d��r��Ē��X�"3�3�
�$]�����0��
X���˛�����"�����ŕ��e��,,5$�
K���r����Us4��"�ī<��!!+�S�/�D��%C��+�hl|5Z���a��R��Xj<��5��.5�P��j˜N]gP��KLsTe�����$���(u3�cR��4o��ݽQȍ�Q���9u�J˜r�>���wHO+s\�zZ��p�i�O+��iu�zZ�nb�Ul�s���/H�#�xu��C̶��z�΄Z����T�9h.��Ƽ+;)}���H�}���珯D�3v�:h�´�d��Pe�Ջ���{Г�U)9���ib�K<M��I-��:yO.c�v�& ?��o����㕖��~�ަ��tX�=�EN��'\!:��C�#e�5:�m����|�q-Oa\�>Ƶ�g��}|��>OG�}�:ڇ ]�̻2�<���/�	-gu���j�60��o��Y�yYtk��m9Hk����Ӳ�h)���%����ۥ"ą�8'�y�t�Re��˼�T��R!A�:�a=�g>F0�2�E��|��������ӡ���!���S������ŧ���t=�kV�S@�!�>Cvox�$�±�	�{��.OtSa��QvoP���)�%���{퍐s�t��W�dv���b�2;)��XJ.������q�܌�<h#7'2�e��]\�=�a���I���fn���5��J�Μᎇ�9〹F�&͙3�Dks�VX���l����>��h��/�#��Wf�������qM�5U
�匓��V7�(��������}"Y���S. �&�M~ّCv��X=���ڌ��~���_f؏���	�ηW�~��[���h��eL�	x�^ڣ�����[���F�U�Z�q,�*��C�ꃱ �=`Z��CS-�!fit����M7ʚޣ�ӻ�Eq����G��C���,o^�L9����Dp��2���!!�8�V�(s{j�z����#G�JkQ���5�jN��{_�����Oҋc.U�	�^�`
ɰ1�D��ͩ�6b}%���W*H���Ԭ��)�q�Ρ��ݴ7`�Ž2]b�(��rs�P=0�Ɒd�˘���f���t�~�AU�٩�A�
���q�8*��Z������Q����t)�Zh��T;���A���;��8j����*�W�S���,�_�8���雷C�ΐ!p��Υҥ��>��ֆ&����kC��qu���&����er�^��3�Y�E�p:�o����$]8�WIXbH�ˀF?�EE��4^��p1XJ���@Y� 4���.U;b���[Q듹X���������T�L�S����(�Cd��Z��4�@v�! ��$ ��䪀y>������<����R`������Ǘ�s�o�����n�4=�2�R/�TX�T����R�N��m�ΐ�z^�yoI���E-���=:�j�N�*�uL�gN�^E���W��v���}�:�ρ�zշ�X%�`6o���-�'��%�J�Uz�Ի�)[��F�#h[-�@��s�|�-��-Z�m��<0�F�Hc�N!Ҩ�;*O�H��L�B��@����?�R_?���{�\�e#� �� ��zM}Y�*^I�e�лH����w�ue9M\YC�:�ͪո�#:�h�̪��*g�a��+�	P�p:zN�'����{Z�p�W9�~L���Kp��p�)��'�2.襸�.ាN�p���h�����V���*@[�)Z9h��V�:��50���(Z����G���n5Q���\��ڇ�>�B'����7�p��Fq¯$���fnR�kKif��DpC>uD�<~�a�Wk�=�����Z� >��^���\��Ø!�'<y�/� GD��zZ0�1�N��/��:�c=Ҍ8OJ�Ճ�a�
������u��N��t@{�l��b�ܲed�d+�hS�Sr�=`�*Hm�u���}��9ׯ�"��6�:��1Ow[SNU�!x�`�֨f�����Nr���EBK���k��K9i���Zt �[
z"�����O��L�����._��m�J�h���
���D"y`�oC19ʋ�N�H�2Nd���E8��4��h���{� Ƕ�R�
^�Cc��(S
��h�����tE���j>J�V�i��MkTmI�V�-M%(�O�,1�@����pߵ�o��u_�i�se�e9
�Ed�]��J�q̫���hK�]��+9/���<ɮ�rj�#2��P�cG�;�#���.gG�gUo��.K��l^-��NN�F��
�8ˉ�g�lə[���
܋�����^ |  �x-Iޕf�ӻ����$毝ė���ò(]��zZ���G훋���.��C��`��/v�܌�`��u�e~*]���0���]�SCe�B{W����fw_�]ϑo�6*���`�5p��r�,�%e�U��v�SI
Ȃ@�aTҤ5�R<�?�x����HK���Ğ{�_o9O�&ӝW���dP�p7�Z"�&K]�.d-NPm��Dr�b2j��8��4�S���r�>�\�Ӗ*�YS'19h��Ț�cu�����+,����]�3�x�6P��	:�V)#4�u�t�[�������z�`���Rd5V�)c����ᣆ(b�L7��g���t���EsǈB;���a�L�>-��5���A? ��E?//C��T��I���\)dE��Y9N�re���R�����+/2@�b�y��*�Uİ��C�G�B��i��
KR��v(_X(�Y0��R��S��
�����`T~���@��6�R�\�A��#F��E ����1+�(��SQ'}�$���$(5e�1�O����|��L�7��Rp�t���9�K�~��e; �����"�O5?k�{���m��B17�����ҙ���ǚFD�=��*yc+V�.��a��Z�-�*�hZ�D�CM"Çm����\z
���Ȕ=h
�c4*���B�����c�+Hm]��CM�>e\�ں�A����*��6�UC���?�uy
�#�F*��_7_N�7�3'����9.����:�	�s=��'y�ޫ� ��Yc�TB������I�[���пx.�R���p�|��*P�`�uF�� µ�v�h*��b�2�}��Lry� ��/$�O��]��zz������ۢ���S����~c@̽L��*�^W�_v���Yeƫ;���0�>��I�z `��b#�셁LX���"��%g}3Ĳ��&�yFV>$,	EI�W;�ŉ�+�Y���I���,w��K�(���_�.v8�YT�@��E�,$��^+�.H�9��%���m����ޖ����G���(p�l"V�Xʄ^�@bW�d��{��Lw)�>@��k���x�R�1�\	I��o�4�,�]��:�N���
�l���X�u���"� r�c4��KG�/C:�WǷ���ߚ%�U�̈́0��"���鰡<;��	,pU(5�y�	��P׭���zmK���R��b}$�V��l\\k���85b�-�� �s�0��B�SWb�I�R�틷]2��-bb֦K�Z��S{#��J��<�t��V͞O�V��`�>n�9+�)h�%1\v��e�Q�'g'j��t'jf�#,�S�*C���fKv'��얁w���ԥ�[Qw/��D�V���K���m\��F���M�b�a��Fr����k`sb+ˋV��j]^�U��j�s�YmˉV��1-��,���<�<��	A��	��""7�����H[��"'N/5��4��1�Y���Ĵ��l���+D<�ڂ/3�/��� X�!��>h	k#E�26׳��]$���&\��\�E�m�ч�;a�B�!R�W���o��C{�C�$RY��J���kk9����H�a��Fv�͘X?}P�X�E�W.b��C�4�UA^t]V�^Ԫ=^10*R���T���No�7�A��m�Mp�!y���p��\|�$.M؍��n��pf�,y*��ց4a)8M��W�T�ϪL3>���en�Ήlw��8���O��B�q�O��^�+X��3�����?��+�VbC�2�uk#�,��g�x.�iD�1��]�1��r�u.1���Ѧ��|L?o�tw��}b�M����>�#\G��+*]����ToW��x�Ča�x��v�]n�75b2��ӆyP�r��r~3����w��:R��U�}Ȥ	�e�2ҸY�(��K��-]�=�.Èi{�ƔH�ޠ �W'/|ǘ�z8��Zn-0�W���sA���� ��ڧ�/�Vr�
�w���������b��J
�=UAR�貊��Q�UKNǒ��,�>)\/��nR�� "-�Oq�7g���t_K��)��G��[�}-sԜ��L�7��	��M��! �%t�.�V���RoN}~���&c졁���,�NE~�<�{���;�{h���1�$��KJ�Qg�s���h���`�21�Z���V��%�7�D��64+.t��64�� �Ь��#�G�͸�>%�����׉��Uml�?���v}W�o�ςa�����G�u/6.�9�ȧ�#?>�&�N5b�,.��w����KAi~�({b�0dNf��d���5�p^�����l/�O-6JU?�;(�ꇘ!K\e�\��T�c%E�ؐ5�؃*�g����K���U��c*���.o�(%�x�5��qI�@��F'�ULɟk����E�Z�f��J=]ĴBŧ�������S��SÔ��lW�x|��l�Kf;>�l��l��ާ�Jf�*����f�Z<!c�f8/�{���]�������������sm�4��׉ԕ�S�4�Σ�Q^s
�zn~�+����ARu�.,��}x|�I�iRVd�Zd�<�9�e9}�����t�k)���$]��X ��0HjS�x#�!��z(��q"-b�0[�ġ�!�}9��J���=uT����e���j~�n
*g�����+���� �IW6,l�[�*��� 6�!���� 
��1�*n�B�o�6w�΅��"Ž70Q��C�%eu[`������/�b��Pe�Vn�i�B�DnY�̀g�fl���,q�d������<_��T���T�e��M�Xy�|�7o>N���գ�)�~Y�HSO��$phf��dݟ�m�%B�!���c��
�$d
Є*�����r�ﳻ	bz�[V��Rط��5Sė��Y1'���`^���r\n��9���y� ��wft=�t��
-�7���hU8��R��ƶ�{�{���z�N�.�<z&,9J&찅���L�>5j�w�9�>�A�g����!6��4��N��T�ݼ�t��k����H1 ?t����I9(=��5�D�H��j�tx9M
:�-Ǘ�������\6Wټ"oo��k餌��1� L��-�����5=��%��X��g�F���~��W���A�      >   _  x����N�0E��WX���yy<�`Ĳ�",*��
!��8�B�B�lݓ3�� �Cu�ɑ;~r/�eٕ����,��`9�o|W�ۇ��A�d��e�����i+��0"7��R�Hݲ̮��n|6�ځ�w��^��,b+�&4q�w�i��;�7W��{�K}��@l�?G�8�e���rr@)3�y���O~VV~�����t��fҍg��.������{0;�#�V8�=[֯�q6(��>
��b�e �X9d�ֿ�r�"k|�����ﴘ"��-�m��U����P5����`Z�ȭ�@�J��Q��$��z��&��P�$�����h�u��      @      x������ � �      B      x��[]s�8�}��
Uv_6,|�ͱ3I&q��fj�έ#�6ǲ���d<[��o7($!PI�+�uԍ�F��� 9�bqu�h��"���e�wU���1�+vϙ��m%�R̞�^�MQ�ϩL1Ɯ{�����w�o?��뛫�߳��0f�\>��9�3f�T�9�@����x�?���g�&o��g��m����=+���}��Ϟ���[�g��?��b��ϻ`�ϛ����v�*�U�[��)����n��������?��0.9�K̘��~����������T�{��7�����l81�1�.�3�Rvj'��0��88�ƿp��A$��LA�A�ew�uR��VOA=�򠰵ϤVeR���t��]����P�4s�2����QPP�,�밼k[;e4.p5	nGkoo���s��Re�&��΄%7u�-��iv�o`��bӐ!�+ϩ{���\rԠ,��MA��i��3�̓[[̅˨�PSP�Xt4y�
>R�Lg��Pl�} ��K���^-L�(
t�y;"=�zFv�S�
�z�+���i�9�5R5k�7�x�H5�.cLI:6� �:K�����O�u���c�XVU��pM�J���5O�fn����vN]f�Cn���2J����-�C��rYL����%����,S܌�i 	��/��~��ˇiN�2̀�@"����ŵTr
�|�1rWyC�vU����sf2k����5�z�Ⰾ�ӫv�a�����%U�G��u�Y�kX��$��S�9㙣 ;v�Թ����_�u1���6L�6/�vɍm�@�Li�6劼˷M��y���{��s#H�	�L�9�MuW���'�S�*y�c���1c�(d��0� /7����C=�qSԷU�X���mI%��Lԇ��|�z/��u�o�gf@�)͜��2�P
��4`�#���^�{_n�#��e���և�p��R}�}��=脜 �̱�v}(�t^�(&tJ�ᓳI�ө(��.������.�V���}����2rS4�+��2�ё��PP
^^m�5�>pģt,���@A#����Y��������5Z�J�v��� �0�4}( ��՝w�r�}7{��Aݰ��/9���.2x �zE۪�U��/�*��4��� ��\,��~Ӕ�;�����b�"-v�uN���}(`�u^?���a�݄~n2�:�!} ���؃�b������ƧS)�:r�md�>�;��{����/F�oU�����>I5���`O{UWˢ~�]���F����\��r~b7�CA1#����esV���P������'�2_Ce�sU���+:�"��ԙ�B@A� 6k�Q��������VQy̎O�A�JE�Q���$i����W�c��-�[\`���(��g �10�����W����C�)a�8�
Ch,�n��K/���ź�vUډ��R�'z �,LtqrFԚLʜ�:4�݇:����*oI��	�a�eN+����CA�C�,Vg�*���4�@�Z
��Y�?�����K,N��2��((g���w{��	��Q�!Q/����,`��� �Y�X��/�IҐ�J��)�
����?M[QXx��qR0���90�C���.pH;̽���܂�E��H����}�M*��Ʋ��}�Xh�[�⟻�ŗ�)�(�4�X*@Q7��E]��Y(���"�������þ�������Z/�Us��G�����P�,5	��Ԛ�@�Ʊk�V1���ta��c��3�2I�*kX���H���8#���1�jktϛ%�&�]�;:�#C��4�i�D&��"3\�8��C�����e^-�������yJ������OR�&G�8y�C�^��_�A�"�l�g;+9��qB>I��LI�m����#I���[�n�$1(՘�=�:
y6Q\I�Lh�ܘ� �:�\@�]�r�h؉!�8�tRصV)�d�(P�k=�� 
�$n.P̷9����ǉR��L�z��P���DC��|�GĩǄmjR8��s;-��kB�s�3j�����	��-<=x$d��؟�šxZ4IvI#�2Q�ۇB�R�k�W������U�e��(좢X�'�I��f&�Ȝs��(���̫��uJ�O�?����
�zwN�'(
lP
a{l�(��na�l�YA���I"�'a����$ࢬ��\��ߨ}]������x[%���?ِ0���r��P�H!I��˻6������tLZlק����P�������﷯�]&�qH{���IɖX�HS.W�e;�1Kھ�eޖ����36��2緿�	Z���q-��� �v��?x�!7��	?r��'��'��(����G�A&�r����7B��6%q�y ��H�g�|]L����L���JJ.>���H�\����`@���oIF>E��1���*�C!��Y��u���1:�:���RH� gm�^��������,�TC��.��T�^�벞�`,f��F2�RT�w����B���eUn�Rk��Ʉ2�C�1i�1��K �͉`և�T`��w;�?}�*����y2��1���o3�q*Ơ�gP�9A��Bi~�ƨ��j�_�ᦥcX3�L������@+�ޗ�<���n_��z]��_�ӵ8��OihyF&��{e�Eݹ���E�׫٫���{����s�i�n$�?^6�M�a�fP&�W� �I�a߬`iݬ��"MQ�.����`k�L�hi�����j���i�j~�4]�0��O"�$'����9�C'M^����I���IN'䒜$:��� �8�"�����
���v����n^$��d��wP��8��Ͳ���x����򡘎�sj�xzR6Y�q��XԨ�!aw�|�i��P�n�{yS�,�T���h[�D�(�SP�&�+<����ؕw���̞�P$IO���Q�w *'�7�~�˦���]/Ǚf��ƴ�Q��-Y��΢�P �ȧ�n�	�ە�O�'�	(���c�$%���
�&�nAZ�s���L�߿������$9%���>��]�c��6��(

��ч:�X�<��u�H^y=�O[�N�)�$/i�0\��Б����i�>�w�5Z������eTB?�ԍ͎��[�v�u�{k���Fy�\I�?;gx�ب�7�B~*�b�_o�C^���ӕ�ßL檂gVe�(���&/�����O�ó���%Iq�Q� �MA)ؐ��դ��f����B�R��wMP�����6�9�ܴUf
�]J6�U���XTj�����������7��.������3ɋ��0�'�b�V��	�4[�����'(���%�.V���c�ز�\l�\؃>-��F���U(P3���lP7��u��/��7M�8m4(�(��I�$A!2��5�<�����1_����?�����L���t�&��'�B������>\o۾�!���h����=�*M749h�+��Ɏ0C������6�S���g��"ߜ�jj,v�F2��/��A����P ��o��7����}ٖW��9Z�*ߌHJ'	R�`|�t ��\���]����ۢz��J�!i�%۾���#�+0(0ꮍ~g3�sH�h�ƌĒ�$��U,�u:�%G�9�0�ʻ{�ަ�Õ3>)�tƹ��s*3!8�����?S���~�$!�C'�Œ��Τ�&v�>(����%����	W�Ҍ���_7K%94���D-�ԥ~�||��/1}��j]M�U5}������6�v��Ό��>ҝP�S{Uc5�~0I
l$���'e�� �̸(M@7F~�}I�[c�NNBe�F2	.m��I����/���Ϝ�B �s�$��{���� ��v����4en�#�$E3�">��CI���3���J�;��ˉ�%f�NS���]��Vg�U�J���Ū�w��&��[�:��C���)��L*V?���u((�lP�Dw�h�� j  ���Y��M���ƕ�V,���y���z
�[·��;�0
�f�l����;,�%���8bP �6"��ڷo��U�3i7�U)�$���5HW��"�54�´Y�h��U0x|���M������P���+%��B���fQ�s �kC��-ӛu��\���U�	������\��ܧ�Hr%���>���;>��\Q����e����N��(��������6*�BHiw�SP�J���ԃ��SC(榡���Nlx����e$�ʤ���C�7�4�.�����}��F9���щ���c-�ΊMA�Lx�{o{7�V���z�9Y]r�rq�뛛�o>x���<U�6�v:���O?���춉=      D   �  x�e��n�@ ����)�Ę�� ��PV��I���dD�3�#�4}��4�O�����kR�d��C~?D�pl�K���e1E�~V��*i��qѮ�p��%��ce=���X���a�������|"���	>N�r��s�3TBNy�ٱn�����8��4�pci��<���ꪗ|hɝ�H�}�~�����$���Ǯ3
l>����囇�JP�
T!� B�	�M � �!R R��v���)>��`��S��<��2��/�G���,kډ��n��QI�[��7��#;3mݓ�t*Z��#�)�ة�� C��d�M���qQR<���?�єQ@���fh��͸�,\�m���̪�b�U����ZiߦB�o�-�ʷ�f�$`�Qe�7�X�^quF��]�O�g����?,�0� ��V      ]   @  x�Œ1o�0����^a��8�l@��K��lH(M�*8�qh������t�����w�%�@��
k[�%HD���GP���TL�TY��jz@8���n�Mi�澄Y~�xU{���l��ǂ�`�<Rc�(R}�h�׎��T�+Ž	�w��6��`)�[
R-�% �b}�/��,�����]��+�m��Q���7�a�я@��<[�I}�lq�N�Mr���|�v��������;�`)�S�X/3!�kLڝ�gbCQ[GG=4�.ZO��	�� ��RM_�O��M��X���dv�c��k�&�-���Ւ�`�}��      F   u   x�326�43��0��442�30�Q)��)ŉF�ƜF���J��JVJ9J��9�F����E%.�e�ɩ��OfzFIf^f^:���	�T#cC�� hfb
�L���FSA�43F��� ��/�      d   /  x�}�=N�@���9=d53;�{N�A"�hw'�[)J��b�=�e[C�勉E���^�D��[�;��<��t�{��i�=n4�<���ѥ�����������9.}m�Cz��6��������2ie)6TZ2i�qM�wICm���^y�v�1�[���7��v�}���O��e��$R�!���A3�(Š8��P�Cq(š8�PJ@	(%�v1w0fBI(	%�$��R8+��Lt��P���k*���g�y'B�#��H �@a(��0��W���^nF���_�m6����       U   <  x�}�?O�0���S�:7����)B�e0���&q���~{�A����߻�EBdb��6f�2.�<����I"4�$�
��\jFs�Q�X������L�2,)a�
)�o/��[��e�,�rvP�UYCUW�#TUUBYǺ�WQ�U.�P�_��J0~�?+�_�|�߁�q�i��1�Kx����a�漝��1��zJ�!�k�5G9��<9��g�#�a3ħG��?���[����=�z��;��>�:4��t�:3CX�p�`���D��U��L#�+D%&�)`�E���$~��`��)��4M?΋i      b   -   x�3�)��H���WHLI,NL��/���$�a�---�b���� �M�      H   X  x�͙kS�Z�_�O�g�L��y�}��.��V���93���bBCP{>��v@���>��S�T�����k���Dq�*�`��t�LY����W%���9�1v��8��`���vz��g�1�EAr�U�0�A�3�E*P�?�;�����]�|�i�4�aA+��h���}�cb��-���4L;g^���$�N��Nkv����?�:J�iD�з����}B� ��_S��;��d�vp�L���=�6lv��U�+ގ�?oO���(W����w+�P5 ���֡���Q����@��I-L�K�5wȜf'>�l5Nk�s��͢(���7�a��8A� ���,��`!6�����/�%o��'� �4NB@����W*�38�0�Rb*s��XS���<?��1<���J7�H�h�������EL	]�O��ZD�?\
�ke�PA8Y��?��9�{am�$����i��4�@��v2K�$��V.h�T5y��Z�(�Pvxلef�ď�6lkA��J�;�2^���n|�2��1�wz��e�.��3����.��F�H��Y�%�i?�4�V��F���q?���Ls!�!����sr�	$m�7�����v�Q��׉?�~�E�e���[�q��X`R�z@L�}RsH%����!��3%�K\5S�v{-T���z�QU:�f���M�r�,����1��
�\ئۑ�����M�s��}��Q��a��"�.�*[J?S��	%@H-��l!�����p:ճJ�C��4��?D�"CF_'A��{��Ga))��������~��U���s�x��Y0יY\�rVd����^�wb�;�0�w�M1^i��n��h��~���1��#t&��+�̌m��j�A��G��ɡZ�F6}b�˶b졳7�n�Ė軬?^�W!��v�����)�1�ZI.wG����9�XJ.Q�L��)煟�Ëq����@��e-d6�JB%VVX�`��Ŀ
Sh����b����t6�Ax=JAh�^OQk6N�1��1jD�q�-����<�7��6�%+�z�F���;?��kE7��Jd�PʈW�g�<���/Nd'��,�Y:�c�C����j� �6���m��������G|�?!����,UW2W=�,�: мmр&�Z4T��&Ep<p�;��h�X4�+E�N�.�#�Q��+툜�oo��/y�gG� �h�fV)	�5���`5�Ɔa����t'c�
�kh<�E����� l�u9˝ǺM�v(��F�����F#.6�F�Ɇ���F���*���f����)�٪�ɓ{�ˀ���~k�m��ʝK���C��&_бdE�D`�9�<k!3�x�=�U0@n�~��xa5�t�Y\��)->3�9V��*�:����*u��I ���n��so r�anw�/�J`	+VM$f[)J
U����8��$�l� P�m���źpx�G(��,��ݿ�!���*貏zn��N/�	5��,=�	�xh+�����^����+���9�*�=�6���W9��s���y�թ֚�v. �y\q� �m� ��P�������:_}�H_���L�H����<2�����ȟMS�M��l +�:/��*bE���쾐�`T�,AI98���J�vk�П�/0/K�g�M� �X:��׭V>�T������c�S�����B�����r��rw�	T]	=�P��Oo1��N���7�v]xO�w�-�n�&����#Z�fn���{��f�=^�{�=�kl���{�#��=^~�`������"��gԸT{r;B{�q,��6����_{�aV��i
�3�a���oW���]v���R�"�5�ذ-�x=�����������[���ߟ=�r�އ2dk��{l�{�^|{��>i(�x	�<x��ssB�+��d_)�6!k��?}*i\qX��7��Ma�B()�_EMq�w�4[�A��os�������^�:�|t�I��l昵�O��r�c��@ 2����<��3?c]㆗����s�X23Zff��W��>)^���?2D�
���ퟒ����|A˭      J   �  x���is�H�?�b�q�R�@fFsh�d>�`��f+5H�àI����;��Ď㔄����~�"�[��Ĝ2[0��Y�1C�����-7��6�nc�=䁽��c�T/��0Oz��Ս
~�\�A�<���ϯ:q�I_��V1�ơ���*��4΀��(Ht�݊b�b���:׉����<��n��a��R2��_Y6Y+K��w�'�B0*�5!/0��_��F��ym��O�1ɕ�c�Ϻ:/#?rU���K¤�m,�m%i��i:k~͊&fM�,�,�ӹrg�@��:_���u�W�|���}���!!�	"�;�ږh#��f�^����S�_�'#��u%�E��g�21c�2_a���۾����s��|����L�TՍ�N�o��]f,ĐM�ĸ����ʥ}8�ޔ�x����w8:sI�,�m ���� �r�
�P��%xk�3�Q�Ŭ�����U��HĚ���Ay�N:���q6�b}����䋽�E��~k���Ip1�_̏��t�ҋp@��:��p�=�t�d��5�˰J8}I��6�U�}���M�2�<���]o�zg�����բz���kܮc���Q����/�g������>0�a����oT��F�{O�0�Lp�d���1���lӚ���Y�X�ҿ��_����'놑����>,��d�7ٻ��Rϓ�'������y��2��a�����+�\�/���KZ ʥ0���P�������t]���X�N���`(B���s���eZ�2jS�ImiR�u��~ m΄��`���7�PE�RS�>�4T����~�iUMp�.��(uWaZ?�&��),�(Ѱ5t��5��Udp3_D9����t�b��L�����������P,1��B�7��F��(�k��>{��i��n
�eo:0۰�!����opQ��mS��4-TR�<�5=�/�hR��rw��h�����9��������fz����{��G��i$��e-��{=�ɴD��ώ��Wh>?7vը�^`WMM�@�:�[�G� n��\�~�E5�0����]Ok�(o��m����
�y,��.Lɪ7x�����B�M��.��2b1N0{x����a6lI�1r}UY8Y�Ru�ML�CU��[D�,��C>��f�ڮ����╿�y;Y�{��6pj�S	�0֞��X�S��qB�s��h��*�      L   �  x���Ko�8��� ���ԭ�
��"�؋k�MZG2��b���NJI�-	�%��i43���Y}�����r���|N��?����YE�6�<����K�zu�g/�s���?3���5�k`��1����ϋ�L�Vۭ/�}u8}���y\H�SA�y�Ҽ�\,	�q2�>=�x��	�ΰ�Y�b����~v�(�nf�$��>�m�V\��ŠA���u�mJ��MY￳�̬�-3�G�����?���I$$�`Q��������ĶET�`QOq4�+�U	W�E�]w��`��	��I��p8�{"n/{��L�$ ;���%n{U��u"�El_�z�.Q������!�%`.b�p�J&7V-j��}�
c�,����=}��5X�Ў���݁+\�E��e�1�kp����B����5�0�]�t�0ED�tQSJ�G`�,��N$Fw_�v�9�jLM��Y�;�I@1��Ø�7�i�/-��;_iR��N߆�y�Y��'��|sX}�?�<�Uے~8�Y3�s�5��GU��{V�ͱYC$W�S. ��H�)���ωt�	Ḧ�,���r^��(՜H@��s"y�s�̋Do��)�ws"�@Ԝ��d��~{��-�1��K��!�9��^u��uj�!���O�(����	'jH���"��C~�L�8��$RC����84463�P5��[�v��<���Ր{7�9f������Ў�!'��=$��h�����6-�cż����H�������l�P�_ʉlLw��S�.�w���x�=\�;9��N���4v��R��U�YBJ��A�؉y]Fp +b����8/�Y�J!Cw�E��~���Ȗ�&�X���Y�J]ǽ���jb����va2�%��2����h�l�M��ayU�*���c��W�a�T@��'���1U�      N   l   x�3�42�v�450�30�4202�5��54�H�K��K�4426153��4�tJ��V�OSp�M-�LN��M��Sp*J�K΀�40R04�2��2��j5�0�#����� A�     
PGDMP      )                 |            mmapp    16.0    16.0 ,   w           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            x           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            y           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            z           1262    16720    mmapp    DATABASE     x   CREATE DATABASE mmapp WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE mmapp;
                postgres    false                        3079    16721 	   adminpack 	   EXTENSION     A   CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;
    DROP EXTENSION adminpack;
                   false            {           0    0    EXTENSION adminpack    COMMENT     M   COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';
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
       public          postgres    false    288            |           0    0    apploadingscreen_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.apploadingscreen_id_seq OWNED BY public.apploadingscreen.id;
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
       public          postgres    false    216            }           0    0    attributes_attribute_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.attributes_attribute_id_seq OWNED BY public.attributes.attribute_id;
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
       public          postgres    false    218            ~           0    0 "   audio_headphones_product_ah_id_seq    SEQUENCE OWNED BY     h   ALTER SEQUENCE public.audio_headphones_product_ah_id_seq OWNED BY public.audioheadphones.product_ah_id;
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
       public          postgres    false    220                       0    0 $   camera_photography_product_cp_id_seq    SEQUENCE OWNED BY     l   ALTER SEQUENCE public.camera_photography_product_cp_id_seq OWNED BY public.cameraphotography.product_cp_id;
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
    category_type character varying(255),
    attribute_cat_id integer[]
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
          public          postgres    false    247            �            1259    16855    ratings_and_reviews    TABLE     !  CREATE TABLE public.ratings_and_reviews (
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
          public          postgres    false    283                       1259    16885    vendorproductorder    TABLE       CREATE TABLE public.vendorproductorder (
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
    created_at timestamp with time zone
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
          public          postgres    false    265            '           2604    50450    apploadingscreen id    DEFAULT     z   ALTER TABLE ONLY public.apploadingscreen ALTER COLUMN id SET DEFAULT nextval('public.apploadingscreen_id_seq'::regclass);
 B   ALTER TABLE public.apploadingscreen ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    288    287    288            �           2604    50451    attributes attribute_id    DEFAULT     �   ALTER TABLE ONLY public.attributes ALTER COLUMN attribute_id SET DEFAULT nextval('public.attributes_attribute_id_seq'::regclass);
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
       public          postgres    false    239    226                       2604    50457    conversations conversation_id    DEFAULT     �   ALTER TABLE ONLY public.conversations ALTER COLUMN conversation_id SET DEFAULT nextval('public.conversations_conversation_id_seq'::regclass);
 L   ALTER TABLE public.conversations ALTER COLUMN conversation_id DROP DEFAULT;
       public          postgres    false    274    275    275            �           2604    50458    coupons coupon_id    DEFAULT     v   ALTER TABLE ONLY public.coupons ALTER COLUMN coupon_id SET DEFAULT nextval('public.coupons_coupon_id_seq'::regclass);
 @   ALTER TABLE public.coupons ALTER COLUMN coupon_id DROP DEFAULT;
       public          postgres    false    228    227            �           2604    50459    currency_values id    DEFAULT     x   ALTER TABLE ONLY public.currency_values ALTER COLUMN id SET DEFAULT nextval('public.currency_values_id_seq'::regclass);
 A   ALTER TABLE public.currency_values ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    230    229                       2604    50460    customer_address address_id    DEFAULT     �   ALTER TABLE ONLY public.customer_address ALTER COLUMN address_id SET DEFAULT nextval('public.customer_address_address_id_seq'::regclass);
 J   ALTER TABLE public.customer_address ALTER COLUMN address_id DROP DEFAULT;
       public          postgres    false    269    268    269            �           2604    50461    customer_delivery_address id    DEFAULT     �   ALTER TABLE ONLY public.customer_delivery_address ALTER COLUMN id SET DEFAULT nextval('public.customer_delivery_address_id_seq'::regclass);
 K   ALTER TABLE public.customer_delivery_address ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    232    231            �           2604    50462    customer_follows follow_id    DEFAULT     �   ALTER TABLE ONLY public.customer_follows ALTER COLUMN follow_id SET DEFAULT nextval('public.customer_follows_follow_id_seq'::regclass);
 I   ALTER TABLE public.customer_follows ALTER COLUMN follow_id DROP DEFAULT;
       public          postgres    false    234    233            (           2604    50463 $   customer_transactions transaction_id    DEFAULT     �   ALTER TABLE ONLY public.customer_transactions ALTER COLUMN transaction_id SET DEFAULT nextval('public.customer_transactions_transaction_id_seq'::regclass);
 S   ALTER TABLE public.customer_transactions ALTER COLUMN transaction_id DROP DEFAULT;
       public          postgres    false    290    289    290            �           2604    50464    customer_wishlist wishlist_id    DEFAULT     �   ALTER TABLE ONLY public.customer_wishlist ALTER COLUMN wishlist_id SET DEFAULT nextval('public.customer_wishlist_wishlist_id_seq'::regclass);
 L   ALTER TABLE public.customer_wishlist ALTER COLUMN wishlist_id DROP DEFAULT;
       public          postgres    false    236    235            )           2604    50437    customerclaim customer_claim_id    DEFAULT     �   ALTER TABLE ONLY public.customerclaim ALTER COLUMN customer_claim_id SET DEFAULT nextval('public.customerclaim_customer_claim_id_seq'::regclass);
 N   ALTER TABLE public.customerclaim ALTER COLUMN customer_claim_id DROP DEFAULT;
       public          postgres    false    292    291    292            �           2604    50465    customers customer_id    DEFAULT     ~   ALTER TABLE ONLY public.customers ALTER COLUMN customer_id SET DEFAULT nextval('public.customers_customer_id_seq'::regclass);
 D   ALTER TABLE public.customers ALTER COLUMN customer_id DROP DEFAULT;
       public          postgres    false    238    237                       2604    50466    homebanner id    DEFAULT     r   ALTER TABLE ONLY public.homebanner ALTER COLUMN id SET DEFAULT nextval('public.homebanner_new_id_seq'::regclass);
 <   ALTER TABLE public.homebanner ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    267    266    267            �           2604    50467    laptopcomputers product_lc_id    DEFAULT     �   ALTER TABLE ONLY public.laptopcomputers ALTER COLUMN product_lc_id SET DEFAULT nextval('public.laptopcomputers_product_lc_id_seq'::regclass);
 L   ALTER TABLE public.laptopcomputers ALTER COLUMN product_lc_id DROP DEFAULT;
       public          postgres    false    241    240            "           2604    50468    media_library media_id    DEFAULT     �   ALTER TABLE ONLY public.media_library ALTER COLUMN media_id SET DEFAULT nextval('public.media_library_media_id_seq'::regclass);
 E   ALTER TABLE public.media_library ALTER COLUMN media_id DROP DEFAULT;
       public          postgres    false    281    282    282                       2604    50469    messages message_id    DEFAULT     z   ALTER TABLE ONLY public.messages ALTER COLUMN message_id SET DEFAULT nextval('public.messages_message_id_seq'::regclass);
 B   ALTER TABLE public.messages ALTER COLUMN message_id DROP DEFAULT;
       public          postgres    false    276    277    277            �           2604    50470    mobileelectronics product_me_id    DEFAULT     �   ALTER TABLE ONLY public.mobileelectronics ALTER COLUMN product_me_id SET DEFAULT nextval('public.product_mobile_electronics_product_me_id_seq'::regclass);
 N   ALTER TABLE public.mobileelectronics ALTER COLUMN product_me_id DROP DEFAULT;
       public          postgres    false    245    242                       2604    50471    mobilehomebanner id    DEFAULT     z   ALTER TABLE ONLY public.mobilehomebanner ALTER COLUMN id SET DEFAULT nextval('public.mobilehomebanner_id_seq'::regclass);
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
       public          postgres    false    255    254                       2604    50478    transactions id    DEFAULT     r   ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);
 >   ALTER TABLE public.transactions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    279    278    279                       2604    50479    variantproducts variant_id    DEFAULT     �   ALTER TABLE ONLY public.variantproducts ALTER COLUMN variant_id SET DEFAULT nextval('public.variantproducts_variant_id_seq'::regclass);
 I   ALTER TABLE public.variantproducts ALTER COLUMN variant_id DROP DEFAULT;
       public          postgres    false    257    256            %           2604    50480    vendorbulkupload bulk_id    DEFAULT     �   ALTER TABLE ONLY public.vendorbulkupload ALTER COLUMN bulk_id SET DEFAULT nextval('public.vendorbulkupload_bulk_id_seq'::regclass);
 G   ALTER TABLE public.vendorbulkupload ALTER COLUMN bulk_id DROP DEFAULT;
       public          postgres    false    286    285    286                       2604    50481    vendorclaim claim_id    DEFAULT     |   ALTER TABLE ONLY public.vendorclaim ALTER COLUMN claim_id SET DEFAULT nextval('public.vendorclaim_claim_id_seq'::regclass);
 C   ALTER TABLE public.vendorclaim ALTER COLUMN claim_id DROP DEFAULT;
       public          postgres    false    271    270    271            $           2604    50482    vendorpolicies vendorpolicy_id    DEFAULT     �   ALTER TABLE ONLY public.vendorpolicies ALTER COLUMN vendorpolicy_id SET DEFAULT nextval('public.vendorpolicies_vendorpolicy_id_seq'::regclass);
 M   ALTER TABLE public.vendorpolicies ALTER COLUMN vendorpolicy_id DROP DEFAULT;
       public          postgres    false    283    284    284                       2604    50483    vendorproductorder order_id    DEFAULT     �   ALTER TABLE ONLY public.vendorproductorder ALTER COLUMN order_id SET DEFAULT nextval('public.vendorproductorder_order_id_seq'::regclass);
 J   ALTER TABLE public.vendorproductorder ALTER COLUMN order_id DROP DEFAULT;
       public          postgres    false    259    258                       2604    50484 
   vendors id    DEFAULT     h   ALTER TABLE ONLY public.vendors ALTER COLUMN id SET DEFAULT nextval('public.vendors_id_seq'::regclass);
 9   ALTER TABLE public.vendors ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    261    260                       2604    50485    vendors_notifications id    DEFAULT     �   ALTER TABLE ONLY public.vendors_notifications ALTER COLUMN id SET DEFAULT nextval('public.vendors_notifications_id_seq'::regclass);
 G   ALTER TABLE public.vendors_notifications ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    263    262                       2604    50486    withdrawals withdrawal_id    DEFAULT     �   ALTER TABLE ONLY public.withdrawals ALTER COLUMN withdrawal_id SET DEFAULT nextval('public.withdrawals_withdrawal_id_seq'::regclass);
 H   ALTER TABLE public.withdrawals ALTER COLUMN withdrawal_id DROP DEFAULT;
       public          postgres    false    265    264            p          0    42678    apploadingscreen 
   TABLE DATA           >   COPY public.apploadingscreen (id, apploading_url) FROM stdin;
    public          postgres    false    288   ��      (          0    16731 
   attributes 
   TABLE DATA           k   COPY public.attributes (attribute_id, attribute_name, attribute_values, category, subcategory) FROM stdin;
    public          postgres    false    216   �      *          0    16737    audioheadphones 
   TABLE DATA           r  COPY public.audioheadphones (product_ah_id, ad_title, currency_symbol, city, state, country, brand, category, vendorid, is_featured, is_sold, is_negotiable, created_at, rejection_reason, status, updated_at_product, uniquepid, category_type, subcategory, condition, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, driversize, impedance, frequencyrange, additionaldescription, searchkeywords, keyfeatures, videourl, salespackage, isvariant, quantity, postalcode, inthebox, images) FROM stdin;
    public          postgres    false    218   ��      ,          0    16748    cameraphotography 
   TABLE DATA           �  COPY public.cameraphotography (product_cp_id, ad_title, currency_symbol, city, state, country, brand, category, vendorid, is_featured, is_sold, is_negotiable, created_at, subcategory, rejection_reason, status, updated_at_product, uniquepid, category_type, condition, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, modelname, storagetype, storagecapacity, displaysize, screenresolution, connectivityports, batterylife, dimensions, weight, warrantyinformation, additionaldescription, searchkeywords, keyfeatures, videourl, salespackage, isvariant, quantity, postalcode, inthebox, images) FROM stdin;
    public          postgres    false    220   i�      .          0    16759    cart 
   TABLE DATA           �   COPY public.cart (cart_id, customer_id, vendor_id, product_uniqueid, category, subcategory, quantity, addeddate, updateddate, variantlabel, mrp, sellingprice) FROM stdin;
    public          postgres    false    222   ��      0          0    16767 
   categories 
   TABLE DATA           �   COPY public.categories (category_id, category_name, category_description, category_image_url, category_status, created_at, updated_at, category_type, attribute_cat_id) FROM stdin;
    public          postgres    false    224   f�      2          0    16776    clothing 
   TABLE DATA           q  COPY public.clothing (product_fac_id, ad_title, additionaldescription, countryoforigin, manufacturername, packerdetails, searchkeywords, keyfeatures, videourl, salespackage, city, state, mrp, sellingprice, quantity, inthebox, isvariant, status, category_type, currency_symbol, uniquepid, vendorid, postalcode, country, category, subcategory, skuid, images) FROM stdin;
    public          postgres    false    226   ��      c          0    17600    conversations 
   TABLE DATA           h   COPY public.conversations (conversation_id, customer_id, vendor_id, conversation_user_type) FROM stdin;
    public          postgres    false    275   h�      3          0    16782    coupons 
   TABLE DATA           �   COPY public.coupons (coupon_id, coupon_code, discount_type, discount_amount, expiration_date, vendorid, associated_products, created_date) FROM stdin;
    public          postgres    false    227   ��      5          0    16788    currency_values 
   TABLE DATA           K   COPY public.currency_values (id, usd, kes, eur, etb, sos, inr) FROM stdin;
    public          postgres    false    229   ��      ]          0    17057    customer_address 
   TABLE DATA             COPY public.customer_address (address_id, customer_id, given_name_address, family_name_address, email_address, phone_address, country_address, zip_address, city_address, subregion_address, region_address, note_address, default_address, apt_address, phone_code) FROM stdin;
    public          postgres    false    269   �      7          0    16794    customer_delivery_address 
   TABLE DATA           �   COPY public.customer_delivery_address (id, customer_id, first_name, last_name, selected_country, street_address, apartment, selected_city, selected_state, zip_code, email, phone_number, orderid, unique_order_id) FROM stdin;
    public          postgres    false    231   �      9          0    16800    customer_follows 
   TABLE DATA           ]   COPY public.customer_follows (follow_id, follower_id, following_id, follow_date) FROM stdin;
    public          postgres    false    233   !�      r          0    42692    customer_transactions 
   TABLE DATA           �   COPY public.customer_transactions (transaction_id, customer_id, datetime, description, amount, closing_balance, wallet_txn_id, send_to_user, invoiceid, status, transaction_wallet_id) FROM stdin;
    public          postgres    false    290   >�      ;          0    16805    customer_wishlist 
   TABLE DATA           �   COPY public.customer_wishlist (wishlist_id, customer_id, uniqueid, label, category, subcategory, vendor_id, mrp, sellingprice, created_on) FROM stdin;
    public          postgres    false    235   [�      t          0    50434    customerclaim 
   TABLE DATA           !  COPY public.customerclaim (customer_claim_id, customer_id, customer_claim_description, customer_claim_status, customer_claim_date, customer_reply_description, customer_reply_date, customer_closure_description, customer_closure_date, customer_image_files, customer_video_files) FROM stdin;
    public          postgres    false    292   x�      =          0    16811 	   customers 
   TABLE DATA           l  COPY public.customers (customer_id, given_name, family_name, email, password, phone_number, address_line_1, address_line_2, city, state, zip_code, country, bio, verified_with, created_at, updated_at, status, picture, google_id, facebook_id, verification_code, verification_expire_date, customer_loggedid, customer_interest, mogadishudistrict_customer) FROM stdin;
    public          postgres    false    237   ��      [          0    17047 
   homebanner 
   TABLE DATA           A   COPY public.homebanner (id, banner_url, title, link) FROM stdin;
    public          postgres    false    267   �      @          0    16821    laptopcomputers 
   TABLE DATA           #  COPY public.laptopcomputers (product_lc_id, ad_title, currency_symbol, city, state, country, brand, category, vendorid, is_featured, is_sold, is_negotiable, created_at, subcategory, rejection_reason, status, updated_at_product, uniquepid, category_type, condition, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, additionaldescription, searchkeywords, salespackage, keyfeatures, videourl, modelname, processor, ram, storagetype, storagecapacity, displaysize, screenresolution, graphicscard, operatingsystem, connectivityports, batterylife, keyboardtype, touchpad, dimensions, weight, warrantyinformation, isvariant, quantity, postalcode, inthebox, images) FROM stdin;
    public          postgres    false    240   ��      j          0    34030    media_library 
   TABLE DATA           j   COPY public.media_library (media_id, title, description, file_path, creation_date, vendor_id) FROM stdin;
    public          postgres    false    282   ��      e          0    17619    messages 
   TABLE DATA           y   COPY public.messages (message_id, conversation_id, sender_id, recipient_id, content, user_type, "timestamp") FROM stdin;
    public          postgres    false    277   c�      B          0    16832    mobileelectronics 
   TABLE DATA             COPY public.mobileelectronics (product_me_id, ad_title, created_at, updated_at, city, state, country, currency_symbol, category, subcategory, condition, brand, is_featured, vendorid, rejection_reason, status, uniquepid, category_type, modelname, storagetype, storagecapacity, displaysize, connectivityports, batterylife, dimensions, weight, warrantyinformation, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, additionaldescription, searchkeywords, keyfeatures, videourl, salespackage, isvariant, quantity, processor, ram, graphicscard, operatingsystem, keyboardtype, postalcode, simcard, unlockstatus, cameraresolution, inthebox, images) FROM stdin;
    public          postgres    false    242   ��      a          0    17588    mobilehomebanner 
   TABLE DATA           M   COPY public.mobilehomebanner (id, mobilebanner_url, title, link) FROM stdin;
    public          postgres    false    273   %�      C          0    16841    payments 
   TABLE DATA           �   COPY public.payments (payment_id, customer_id, order_id, payment_date, payment_method, payment_amount, payment_status, billing_address, billing_city, billing_state, billing_zip, currency_code, payment_source, vendor_id) FROM stdin;
    public          postgres    false    243   ��      F          0    16848    products 
   TABLE DATA           l  COPY public.products (id, ad_title, city, state, country, currency_symbol, category, subcategory, vendorid, uniquepid, skuid, mrp, sellingprice, countryoforigin, manufacturername, packerdetails, additionaldescription, searchkeywords, keyfeatures, videourl, category_type, quantity, postalcode, salespackage, brand, condition, isvariant, status, updated_at_product, rejection_reason, slug_subcat, slug_cat, images, attributes_specification, prod_slug, width, length, height, weight, product_ship_from, estimate_delivery_by, nested_subcat, nested_subcat_slug, additonal_condition, mogadishudistrict_ship_from) FROM stdin;
    public          postgres    false    246   #�      H          0    16855    ratings_and_reviews 
   TABLE DATA           �   COPY public.ratings_and_reviews (id, vendor_id, customer_id, rating, review_text, medias, created_at, product_uniqueid, label, rate_order_id) FROM stdin;
    public          postgres    false    248   }      J          0    16861    social_logins 
   TABLE DATA           Z   COPY public.social_logins (login_id, customer_id, provider, provider_user_id) FROM stdin;
    public          postgres    false    250         L          0    16865    subcategories 
   TABLE DATA           �   COPY public.subcategories (subcategory_id, subcategory_name, subcategory_description, subcategory_image_url, parent_category_id, created_at, updated_at, isfeatured, subcat_status, nested_subcategories) FROM stdin;
    public          postgres    false    252   5      N          0    16873 
   superadmin 
   TABLE DATA           ^   COPY public.superadmin (id, email, password, "userId", role_id, "position", name) FROM stdin;
    public          postgres    false    254   �&      g          0    17676    transactions 
   TABLE DATA           �   COPY public.transactions (id, transaction_id, customer_id, transaction_external_id, amount, currency_code, transaction_date, is_verified, verification_date, payment_method, notes) FROM stdin;
    public          postgres    false    279   �(      P          0    16879    variantproducts 
   TABLE DATA           �   COPY public.variantproducts (variant_id, product_uniqueid, variant_mrp, variant_sellingprice, variant_skuid, variant_quantity, variantsvalues, label, vendori_id, variant_category, variant_subcategory) FROM stdin;
    public          postgres    false    256   �(      n          0    42480    vendorbulkupload 
   TABLE DATA           \   COPY public.vendorbulkupload (bulk_id, vendor_id, productids, datetime, status) FROM stdin;
    public          postgres    false    286   �)      _          0    17517    vendorclaim 
   TABLE DATA           �   COPY public.vendorclaim (claim_id, vendor_id, claim_description, claim_status, claim_date, reply_description, reply_date, closure_description, closure_date, image_files, video_files) FROM stdin;
    public          postgres    false    271   &+      l          0    42469    vendorpolicies 
   TABLE DATA           z   COPY public.vendorpolicies (vendorpolicy_id, shipping_information, return_policy, business_policy, vendor_id) FROM stdin;
    public          postgres    false    284   r,      R          0    16885    vendorproductorder 
   TABLE DATA           ,  COPY public.vendorproductorder (order_id, vendor_id, product_uniqueid, customer_id, total_amount, order_status, rejection_reason, product_name, customer_name, product_image, customer_email, customer_phone_number, currency_symbol, payment_method, payment_status, city, state, country, brand, category, subcategory, product_type, transaction_id, commission_fee, withdrawal_amount, refund_amount, fees_paid, tax_collected, orderid, quantity, label, tentative_delivery_date, skuid_order, ispickup, seller_otp, customer_otp, order_date, created_at) FROM stdin;
    public          postgres    false    258   �,      T          0    16893    vendors 
   TABLE DATA           �  COPY public.vendors (id, country_code, mobile_number, email, password, brand_name, business_model, products, trademark_certificate, company_name, company_city, company_state, company_country, company_zip_code, shipping_address, bank_name, bank_account_number, bank_routing_number, bank_account_name, bank_branch, bank_swift_code, registration_date, mobile_verification_status, email_verification_status, status, business_type, registration_number, tax_id_number, business_address, business_phone, business_email, business_website, business_description, facebook_url, instagram_url, twitter_url, linkedin_url, business_logo_url, business_license_url, return_policy, shipping_policy, terms_and_conditions, payment_info, shipping_info, support_contact, categories, average_rating, total_products, total_sales, support_contact_1, support_contact_2, vendor_profile_picture_url, brand_logo, useridvendor, vendorname, email_otp, mobile_otp, reset_otp, followers, following, vendor_username) FROM stdin;
    public          postgres    false    260   .      V          0    16900    vendors_notifications 
   TABLE DATA           Z   COPY public.vendors_notifications (id, vendor_id, type, title, message, date) FROM stdin;
    public          postgres    false    262   �2      X          0    16906    withdrawals 
   TABLE DATA           �   COPY public.withdrawals (withdrawal_id, vendor_id, currency_code, amount, withdrawal_date, status, bank_account_number, bank_name, bank_branch, created_at, updated_at) FROM stdin;
    public          postgres    false    264   �6      �           0    0    apploadingscreen_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.apploadingscreen_id_seq', 1, false);
          public          postgres    false    287            �           0    0    attributes_attribute_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.attributes_attribute_id_seq', 21, true);
          public          postgres    false    217            �           0    0 "   audio_headphones_product_ah_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.audio_headphones_product_ah_id_seq', 45, true);
          public          postgres    false    219            �           0    0 $   camera_photography_product_cp_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.camera_photography_product_cp_id_seq', 41, true);
          public          postgres    false    221            �           0    0    cart_cart_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.cart_cart_id_seq', 763, true);
          public          postgres    false    223            �           0    0    categories_category_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.categories_category_id_seq', 129, true);
          public          postgres    false    225            �           0    0 !   conversations_conversation_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.conversations_conversation_id_seq', 8, true);
          public          postgres    false    274            �           0    0    coupons_coupon_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.coupons_coupon_id_seq', 9, true);
          public          postgres    false    228            �           0    0    currency_values_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.currency_values_id_seq', 1, true);
          public          postgres    false    230            �           0    0    customer_address_address_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.customer_address_address_id_seq', 37, true);
          public          postgres    false    268            �           0    0     customer_delivery_address_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.customer_delivery_address_id_seq', 186, true);
          public          postgres    false    232            �           0    0    customer_follows_follow_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.customer_follows_follow_id_seq', 19, true);
          public          postgres    false    234            �           0    0 (   customer_transactions_transaction_id_seq    SEQUENCE SET     V   SELECT pg_catalog.setval('public.customer_transactions_transaction_id_seq', 5, true);
          public          postgres    false    289            �           0    0 !   customer_wishlist_wishlist_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.customer_wishlist_wishlist_id_seq', 126, true);
          public          postgres    false    236            �           0    0 #   customerclaim_customer_claim_id_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.customerclaim_customer_claim_id_seq', 36, true);
          public          postgres    false    291            �           0    0    customers_customer_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.customers_customer_id_seq', 184, true);
          public          postgres    false    238            �           0    0 "   fashionclothing_product_fac_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.fashionclothing_product_fac_id_seq', 8, true);
          public          postgres    false    239            �           0    0    homebanner_new_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.homebanner_new_id_seq', 10, true);
          public          postgres    false    266            �           0    0 !   laptopcomputers_product_lc_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.laptopcomputers_product_lc_id_seq', 121, true);
          public          postgres    false    241            �           0    0    media_library_media_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.media_library_media_id_seq', 3722, true);
          public          postgres    false    281            �           0    0    messages_message_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.messages_message_id_seq', 180, true);
          public          postgres    false    276            �           0    0    mobilehomebanner_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.mobilehomebanner_id_seq', 10, true);
          public          postgres    false    272            �           0    0    payments_payment_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.payments_payment_id_seq', 88, true);
          public          postgres    false    244            �           0    0 ,   product_mobile_electronics_product_me_id_seq    SEQUENCE SET     \   SELECT pg_catalog.setval('public.product_mobile_electronics_product_me_id_seq', 365, true);
          public          postgres    false    245            �           0    0    products_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.products_id_seq', 101319, true);
          public          postgres    false    247            �           0    0    ratings_and_reviews_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.ratings_and_reviews_id_seq', 146, true);
          public          postgres    false    249            �           0    0    social_logins_login_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.social_logins_login_id_seq', 1, false);
          public          postgres    false    251            �           0    0     subcategories_subcategory_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.subcategories_subcategory_id_seq', 218, true);
          public          postgres    false    253            �           0    0    superadmin_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.superadmin_id_seq', 23, true);
          public          postgres    false    255            �           0    0    transactions_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.transactions_id_seq', 15, true);
          public          postgres    false    278            �           0    0    transactions_id_seqs    SEQUENCE SET     C   SELECT pg_catalog.setval('public.transactions_id_seqs', 15, true);
          public          postgres    false    280            �           0    0    variantproducts_variant_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.variantproducts_variant_id_seq', 242, true);
          public          postgres    false    257            �           0    0    vendorbulkupload_bulk_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.vendorbulkupload_bulk_id_seq', 481, true);
          public          postgres    false    285            �           0    0    vendorclaim_claim_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.vendorclaim_claim_id_seq', 17, true);
          public          postgres    false    270            �           0    0 "   vendorpolicies_vendorpolicy_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.vendorpolicies_vendorpolicy_id_seq', 1, true);
          public          postgres    false    283            �           0    0    vendorproductorder_order_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.vendorproductorder_order_id_seq', 223, true);
          public          postgres    false    259            �           0    0    vendors_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.vendors_id_seq', 69, true);
          public          postgres    false    261            �           0    0    vendors_notifications_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.vendors_notifications_id_seq', 83, true);
          public          postgres    false    263            �           0    0    withdrawals_withdrawal_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.withdrawals_withdrawal_id_seq', 6, true);
          public          postgres    false    265            �           2606    42685 &   apploadingscreen apploadingscreen_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.apploadingscreen
    ADD CONSTRAINT apploadingscreen_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.apploadingscreen DROP CONSTRAINT apploadingscreen_pkey;
       public            postgres    false    288            0           2606    16938    attributes attributes_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.attributes
    ADD CONSTRAINT attributes_pkey PRIMARY KEY (attribute_id);
 D   ALTER TABLE ONLY public.attributes DROP CONSTRAINT attributes_pkey;
       public            postgres    false    216            2           2606    16940 %   audioheadphones audio_headphones_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.audioheadphones
    ADD CONSTRAINT audio_headphones_pkey PRIMARY KEY (product_ah_id);
 O   ALTER TABLE ONLY public.audioheadphones DROP CONSTRAINT audio_headphones_pkey;
       public            postgres    false    218            4           2606    16942 )   cameraphotography camera_photography_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.cameraphotography
    ADD CONSTRAINT camera_photography_pkey PRIMARY KEY (product_cp_id);
 S   ALTER TABLE ONLY public.cameraphotography DROP CONSTRAINT camera_photography_pkey;
       public            postgres    false    220            6           2606    16944    cart cart_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (cart_id);
 8   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_pkey;
       public            postgres    false    222            8           2606    16946    categories categories_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public            postgres    false    224            u           2606    17607 5   conversations conversations_customer_id_vendor_id_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_customer_id_vendor_id_key UNIQUE (customer_id, vendor_id);
 _   ALTER TABLE ONLY public.conversations DROP CONSTRAINT conversations_customer_id_vendor_id_key;
       public            postgres    false    275    275            w           2606    17605     conversations conversations_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_pkey PRIMARY KEY (conversation_id);
 J   ALTER TABLE ONLY public.conversations DROP CONSTRAINT conversations_pkey;
       public            postgres    false    275            <           2606    16948    coupons coupons_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_pkey PRIMARY KEY (coupon_id);
 >   ALTER TABLE ONLY public.coupons DROP CONSTRAINT coupons_pkey;
       public            postgres    false    227            >           2606    16950 $   currency_values currency_values_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.currency_values
    ADD CONSTRAINT currency_values_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.currency_values DROP CONSTRAINT currency_values_pkey;
       public            postgres    false    229            o           2606    17064 &   customer_address customer_address_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.customer_address
    ADD CONSTRAINT customer_address_pkey PRIMARY KEY (address_id);
 P   ALTER TABLE ONLY public.customer_address DROP CONSTRAINT customer_address_pkey;
       public            postgres    false    269            @           2606    16952 8   customer_delivery_address customer_delivery_address_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public.customer_delivery_address
    ADD CONSTRAINT customer_delivery_address_pkey PRIMARY KEY (id);
 b   ALTER TABLE ONLY public.customer_delivery_address DROP CONSTRAINT customer_delivery_address_pkey;
       public            postgres    false    231            B           2606    16954 &   customer_follows customer_follows_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.customer_follows
    ADD CONSTRAINT customer_follows_pkey PRIMARY KEY (follow_id);
 P   ALTER TABLE ONLY public.customer_follows DROP CONSTRAINT customer_follows_pkey;
       public            postgres    false    233            �           2606    42699 0   customer_transactions customer_transactions_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public.customer_transactions
    ADD CONSTRAINT customer_transactions_pkey PRIMARY KEY (transaction_id);
 Z   ALTER TABLE ONLY public.customer_transactions DROP CONSTRAINT customer_transactions_pkey;
       public            postgres    false    290            D           2606    16956 (   customer_wishlist customer_wishlist_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.customer_wishlist
    ADD CONSTRAINT customer_wishlist_pkey PRIMARY KEY (wishlist_id);
 R   ALTER TABLE ONLY public.customer_wishlist DROP CONSTRAINT customer_wishlist_pkey;
       public            postgres    false    235            �           2606    50443     customerclaim customerclaim_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.customerclaim
    ADD CONSTRAINT customerclaim_pkey PRIMARY KEY (customer_claim_id);
 J   ALTER TABLE ONLY public.customerclaim DROP CONSTRAINT customerclaim_pkey;
       public            postgres    false    292            G           2606    16958    customers customers_email_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_email_key UNIQUE (email);
 G   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_email_key;
       public            postgres    false    237            I           2606    16960    customers customers_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (customer_id);
 B   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_pkey;
       public            postgres    false    237            :           2606    16962    clothing fashionclothing_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.clothing
    ADD CONSTRAINT fashionclothing_pkey PRIMARY KEY (product_fac_id);
 G   ALTER TABLE ONLY public.clothing DROP CONSTRAINT fashionclothing_pkey;
       public            postgres    false    226            m           2606    17054    homebanner homebanner_new_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.homebanner
    ADD CONSTRAINT homebanner_new_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.homebanner DROP CONSTRAINT homebanner_new_pkey;
       public            postgres    false    267            K           2606    16964 $   laptopcomputers laptopcomputers_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.laptopcomputers
    ADD CONSTRAINT laptopcomputers_pkey PRIMARY KEY (product_lc_id);
 N   ALTER TABLE ONLY public.laptopcomputers DROP CONSTRAINT laptopcomputers_pkey;
       public            postgres    false    240            ~           2606    34038     media_library media_library_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.media_library
    ADD CONSTRAINT media_library_pkey PRIMARY KEY (media_id);
 J   ALTER TABLE ONLY public.media_library DROP CONSTRAINT media_library_pkey;
       public            postgres    false    282            y           2606    17627    messages messages_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (message_id);
 @   ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_pkey;
       public            postgres    false    277            s           2606    17598 &   mobilehomebanner mobilehomebanner_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.mobilehomebanner
    ADD CONSTRAINT mobilehomebanner_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.mobilehomebanner DROP CONSTRAINT mobilehomebanner_pkey;
       public            postgres    false    273            O           2606    16966    payments payments_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (payment_id);
 @   ALTER TABLE ONLY public.payments DROP CONSTRAINT payments_pkey;
       public            postgres    false    243            M           2606    16968 1   mobileelectronics product_mobile_electronics_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public.mobileelectronics
    ADD CONSTRAINT product_mobile_electronics_pkey PRIMARY KEY (product_me_id);
 [   ALTER TABLE ONLY public.mobileelectronics DROP CONSTRAINT product_mobile_electronics_pkey;
       public            postgres    false    242            Q           2606    16970    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    246            W           2606    16972 ,   ratings_and_reviews ratings_and_reviews_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.ratings_and_reviews
    ADD CONSTRAINT ratings_and_reviews_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.ratings_and_reviews DROP CONSTRAINT ratings_and_reviews_pkey;
       public            postgres    false    248            Y           2606    16974 4   social_logins social_logins_customer_id_provider_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.social_logins
    ADD CONSTRAINT social_logins_customer_id_provider_key UNIQUE (customer_id, provider);
 ^   ALTER TABLE ONLY public.social_logins DROP CONSTRAINT social_logins_customer_id_provider_key;
       public            postgres    false    250    250            [           2606    16976     social_logins social_logins_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.social_logins
    ADD CONSTRAINT social_logins_pkey PRIMARY KEY (login_id);
 J   ALTER TABLE ONLY public.social_logins DROP CONSTRAINT social_logins_pkey;
       public            postgres    false    250            ]           2606    16978     subcategories subcategories_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.subcategories
    ADD CONSTRAINT subcategories_pkey PRIMARY KEY (subcategory_id);
 J   ALTER TABLE ONLY public.subcategories DROP CONSTRAINT subcategories_pkey;
       public            postgres    false    252            _           2606    16980    superadmin superadmin_email_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.superadmin
    ADD CONSTRAINT superadmin_email_key UNIQUE (email);
 I   ALTER TABLE ONLY public.superadmin DROP CONSTRAINT superadmin_email_key;
       public            postgres    false    254            a           2606    16982    superadmin superadmin_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.superadmin
    ADD CONSTRAINT superadmin_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.superadmin DROP CONSTRAINT superadmin_pkey;
       public            postgres    false    254            |           2606    17688    transactions transactions_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.transactions DROP CONSTRAINT transactions_pkey;
       public            postgres    false    279            S           2606    34053    products unique_skuid_vendorid 
   CONSTRAINT     d   ALTER TABLE ONLY public.products
    ADD CONSTRAINT unique_skuid_vendorid UNIQUE (skuid, vendorid);
 H   ALTER TABLE ONLY public.products DROP CONSTRAINT unique_skuid_vendorid;
       public            postgres    false    246    246            c           2606    16984 $   variantproducts variantproducts_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.variantproducts
    ADD CONSTRAINT variantproducts_pkey PRIMARY KEY (variant_id);
 N   ALTER TABLE ONLY public.variantproducts DROP CONSTRAINT variantproducts_pkey;
       public            postgres    false    256            �           2606    42488 &   vendorbulkupload vendorbulkupload_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.vendorbulkupload
    ADD CONSTRAINT vendorbulkupload_pkey PRIMARY KEY (bulk_id);
 P   ALTER TABLE ONLY public.vendorbulkupload DROP CONSTRAINT vendorbulkupload_pkey;
       public            postgres    false    286            q           2606    17526    vendorclaim vendorclaim_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.vendorclaim
    ADD CONSTRAINT vendorclaim_pkey PRIMARY KEY (claim_id);
 F   ALTER TABLE ONLY public.vendorclaim DROP CONSTRAINT vendorclaim_pkey;
       public            postgres    false    271            �           2606    42476 "   vendorpolicies vendorpolicies_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.vendorpolicies
    ADD CONSTRAINT vendorpolicies_pkey PRIMARY KEY (vendorpolicy_id);
 L   ALTER TABLE ONLY public.vendorpolicies DROP CONSTRAINT vendorpolicies_pkey;
       public            postgres    false    284            e           2606    16986 *   vendorproductorder vendorproductorder_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.vendorproductorder
    ADD CONSTRAINT vendorproductorder_pkey PRIMARY KEY (order_id);
 T   ALTER TABLE ONLY public.vendorproductorder DROP CONSTRAINT vendorproductorder_pkey;
       public            postgres    false    258            i           2606    16988 0   vendors_notifications vendors_notifications_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.vendors_notifications
    ADD CONSTRAINT vendors_notifications_pkey PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public.vendors_notifications DROP CONSTRAINT vendors_notifications_pkey;
       public            postgres    false    262            g           2606    16990    vendors vendors_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.vendors
    ADD CONSTRAINT vendors_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.vendors DROP CONSTRAINT vendors_pkey;
       public            postgres    false    260            k           2606    16992    withdrawals withdrawals_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.withdrawals
    ADD CONSTRAINT withdrawals_pkey PRIMARY KEY (withdrawal_id);
 F   ALTER TABLE ONLY public.withdrawals DROP CONSTRAINT withdrawals_pkey;
       public            postgres    false    264            T           1259    16993    idx_customer_id    INDEX     V   CREATE INDEX idx_customer_id ON public.ratings_and_reviews USING btree (customer_id);
 #   DROP INDEX public.idx_customer_id;
       public            postgres    false    248            �           1259    42705 %   idx_customer_transactions_customer_id    INDEX     n   CREATE INDEX idx_customer_transactions_customer_id ON public.customer_transactions USING btree (customer_id);
 9   DROP INDEX public.idx_customer_transactions_customer_id;
       public            postgres    false    290            �           1259    42706 "   idx_customer_transactions_datetime    INDEX     h   CREATE INDEX idx_customer_transactions_datetime ON public.customer_transactions USING btree (datetime);
 6   DROP INDEX public.idx_customer_transactions_datetime;
       public            postgres    false    290            E           1259    16994 !   idx_customer_wishlist_customer_id    INDEX     f   CREATE INDEX idx_customer_wishlist_customer_id ON public.customer_wishlist USING btree (customer_id);
 5   DROP INDEX public.idx_customer_wishlist_customer_id;
       public            postgres    false    235            z           1259    17694    idx_transaction_external_id    INDEX     g   CREATE INDEX idx_transaction_external_id ON public.transactions USING btree (transaction_external_id);
 /   DROP INDEX public.idx_transaction_external_id;
       public            postgres    false    279            U           1259    16995    idx_vendor_id    INDEX     R   CREATE INDEX idx_vendor_id ON public.ratings_and_reviews USING btree (vendor_id);
 !   DROP INDEX public.idx_vendor_id;
       public            postgres    false    248            �           2606    17001    cart cart_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 D   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_customer_id_fkey;
       public          postgres    false    222    237    4937            �           2606    17006    cart cart_vendor_id_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);
 B   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_vendor_id_fkey;
       public          postgres    false    260    222    4967            �           2606    17608 ,   conversations conversations_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 V   ALTER TABLE ONLY public.conversations DROP CONSTRAINT conversations_customer_id_fkey;
       public          postgres    false    275    237    4937            �           2606    17613 *   conversations conversations_vendor_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);
 T   ALTER TABLE ONLY public.conversations DROP CONSTRAINT conversations_vendor_id_fkey;
       public          postgres    false    4967    260    275            �           2606    17011 2   customer_follows customer_follows_follower_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer_follows
    ADD CONSTRAINT customer_follows_follower_id_fkey FOREIGN KEY (follower_id) REFERENCES public.customers(customer_id) ON DELETE CASCADE;
 \   ALTER TABLE ONLY public.customer_follows DROP CONSTRAINT customer_follows_follower_id_fkey;
       public          postgres    false    237    233    4937            �           2606    17016 3   customer_follows customer_follows_following_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer_follows
    ADD CONSTRAINT customer_follows_following_id_fkey FOREIGN KEY (follower_id) REFERENCES public.customers(customer_id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.customer_follows DROP CONSTRAINT customer_follows_following_id_fkey;
       public          postgres    false    233    237    4937            �           2606    17021 4   customer_wishlist customer_wishlist_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer_wishlist
    ADD CONSTRAINT customer_wishlist_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 ^   ALTER TABLE ONLY public.customer_wishlist DROP CONSTRAINT customer_wishlist_customer_id_fkey;
       public          postgres    false    4937    235    237            �           2606    50444 ,   customerclaim customerclaim_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customerclaim
    ADD CONSTRAINT customerclaim_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 V   ALTER TABLE ONLY public.customerclaim DROP CONSTRAINT customerclaim_customer_id_fkey;
       public          postgres    false    237    4937    292            �           2606    17689    transactions fk_customer    FK CONSTRAINT     �   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id) ON DELETE CASCADE;
 B   ALTER TABLE ONLY public.transactions DROP CONSTRAINT fk_customer;
       public          postgres    false    4937    279    237            �           2606    42700 !   customer_transactions fk_customer    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer_transactions
    ADD CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 K   ALTER TABLE ONLY public.customer_transactions DROP CONSTRAINT fk_customer;
       public          postgres    false    290    4937    237            �           2606    17628 &   messages messages_conversation_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(conversation_id);
 P   ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_conversation_id_fkey;
       public          postgres    false    275    277    4983            �           2606    17026 ,   social_logins social_logins_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.social_logins
    ADD CONSTRAINT social_logins_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 V   ALTER TABLE ONLY public.social_logins DROP CONSTRAINT social_logins_customer_id_fkey;
       public          postgres    false    4937    237    250            �           2606    17031 3   subcategories subcategories_parent_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.subcategories
    ADD CONSTRAINT subcategories_parent_category_id_fkey FOREIGN KEY (parent_category_id) REFERENCES public.categories(category_id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.subcategories DROP CONSTRAINT subcategories_parent_category_id_fkey;
       public          postgres    false    252    224    4920            �           2606    17527 &   vendorclaim vendorclaim_vendor_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.vendorclaim
    ADD CONSTRAINT vendorclaim_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);
 P   ALTER TABLE ONLY public.vendorclaim DROP CONSTRAINT vendorclaim_vendor_id_fkey;
       public          postgres    false    4967    271    260            p   >   x�3�t,(��OL��K/N.JM��5470167��0567����IU(.�I,��K�L����� �p)      (   l   x�3���H�䬮Щ����)����22�άJ嬎����	��Չ ��#|������9�E��A�):�E��y:N9��:�y�@~b���OfzF�P^I'(�8�-F��� ���      *   �  x��UMo�@=/�bO=�����R���Ur�S]j��q�FQ�{gY'nWJ*U�.�<�7o��nV69�6}G.�ə-����fmɧ6+-�v�y���ͺk�yO�!?��3.B`! �"e"�Akɝ'6�2I��R�4F '\��˺ˮ曞���ʎ��s�-���{J��yF ]��"�p3��yo��3�%�����.�ki~��'v�	���>�	�!�?�rO8_8е�ȴ�\"{�d�i��@
���'��P��)�X*x�t$�Q�3��f�+�<sx�6o�+Xv|��	س�?>�zQ/*RW�=�ٺ���Q��]��ݠ�ᛕv7ނN�J����^ۍ]C�l��H<"��o��8D8���!GD;�.fHW�R��T����1���	�X�:�'ru�o�'��Nht'�@�z\��G!�A�C��ն(�bU^䑸���*Ǔ��:�w%x�����k>/�t{:�c E�5��`"-���D�s����#��]����ϳ�=(}#̨|����U��K״��H^�Sq�BIlֻV�Lq�*�9J$�[�] %i���M�6+����1�S�BDB0	��H��Ib���!��+R0\7�f4~?�f�eyN4��?]=���sa[:-lfg/e@J��E��X�{m(4��L��9`V8�]G�'h����jo/j49�p�O�0(#Q�$���C�-�L��ly\DA�fc      ,   #  x��QMO�0=���'n�b7���!!�4q��k
ݒ�SS�⿓��I�ʓ��؎�"��l�qy���Gv�42�Z��@^�����nZT��a��,AL���j�l(OKIuU�%ﺑ�x���<�}D0�SE,�A���;PD���������Gb�@9�����Jv�`��̨p�����W�B�\I6ڧ��!N���Y���s��$ŉ8�J�:HA<'���m�q����o�[�����j{t�[���
�P��E]c�K��2On���à��n���ViE����^      .   �   x��б��0��Y~��@�$KQ�Pz[�B�.%�8i���\�t)d���~`k����¡�<\�]>���<��/��:즩��WF�-ҖÆڄ�P|PR�k�r�c]g/�� �ao�<��\~��O�z/%5�Ud-U�����n���.��M
���a-U���{긋w��J3[Y      0   0
  x��Z�r�8}F��O�ݪ%
��ޜ8�s��I��%U*Zbl�ȢK�;S��� %�DO�F�s�h4�AI��f��%!LȜ��ˌ�ga���KA��a�*k���7Z���:{��?�����-�����mY��xo���2��0|�\�����:�7��þ<lʯ����1�В:��v)I3����6wY�[g�m�]Yחe:��y7u	S�ǩ���LQɍ"!ɖ�{�73�za��O^/�k*�־��B������u�����e�^����Y�
�ǹaF��X(�ö\5�j�Y���է+rW>g�ݦ�৮�ˬ)������l]֫���T�ϻ�G��+��<���osa�v�,�\KoU
�}_�WMM���߂��7仢�M���V�hu��L;�z+�P�q�h�%_3�qQ���
k�)�5�ڑ���b{9l��v���@,�X(C�u�H��@����6�O�_��i]V8��0����j�$�F{7����%�T=׭������4$�0�Uu?{�@��T8�� ��P,J�ng��ޕ�G��Ia�1�U��������4�Vr'y
B��������o+����5!ҍ9�^�����̂�k��l��1��Ir��T�U�mZ�qֺ�e�lA�Po��|B�yW�<�2��YO���Z0�����a�lI�S�d��$i�ۗ/�'C����*H��D"sJK)M�����i�l�JPƬb��!��VC��}_mC���lS*dC���Ϙ-Pkj��s%!�����x]�S��s������3eY��Lz�4��,�s�*�gLD��kΪ��`�A���P�	W!��]҃�w<^�ϖ&�D��X�f���V}?��f�x_� ɦ�΄�y;�/�3[#lo$&�B�ؗ�6���qo������/����k��X�U�?�n�>�M�Lgdˬ�6C���ْ ��f�y��$I>`Yf�G�f�z_AT1a��B����(��~Z��L���]v3fT
*u!��8��@O>@�MW�\�]���B�Ci}���4gv�!-[v���%Fޕ�cs���Wy�ع�uS�7����kJ��T�Q
B�8��/����顄�
�pR��A��MY�^��
(h�T=8):&(����#�@H� �C�}_�C��~_|i�}i�ΐ�����N��̠�C��8��JA������P!�����a�����S������`�c���X~-��s�_�����/n�R>��e�Dr*!�A�CH$웇j߄���f]U��>�mf�M��q�Lyz!,4�J��c�������cX����t�q��.�~��U�s2��Ҽ"w�v[�u���rf2U�\HO����RP�^w6דFU�X���S2jHQ������z:�����ҡ]�t�NA�v��.PDs���?���(�����j�	�CG�N%��S<ӏ�sJ3)S
mƒ\�Y&�{P�Н L�/�)B(=Í�p��¤b�$��!���0��0�$�uq��tW쎛t�84��*˽)�_2o� xm��u�uZ�~"����z�+.L�����#{����}�K�����c���	�ЖBY��� |
���E������_HC�ƥ dUcq}��b!��Q���z2n�����}(
�>� �o��#h���:y�� D�FI��Ƥ�V[-Fx^ ��x����"P��� (&�l�(�G���i�Sb��Li*�(/����D�*ť��$����B\2ŕ"�!{j�K�@D*I�b��p�N*6��!Ħ�l):*�����=�� 5��72�(�-
�Ђ�3=��x��	��g�PI�]#=��d�(S�*$ǹ�&!��<q�H�aA���_�"(&u���&�4tTI&x��@�M%��6��n�95�h3�q!�d��yS����� �c�SOL�`�2�u\sa��� �|!��ijXJk�2�j
A��Rb���ܡ���}�#q_�R�~�� ���9��>'e!�4��J�X_#	������娗F�/R �,a��Ć�k� �c����R������fn�[!���f�&�f��d����Bf���:%�K�2���� dY�XN��^8�+1��wl�%�(��Cڦ l֟�N�U<�<�\raR�����DoiCYg��n��96�_LN��1N����-��rʴR�D5I
¦elzڶ
/��c�-� l[!�)���H��c��x�:l`^������� ]&��۷V�����-�������t��f�#1�-{�k�5�.�p�<��BqN����+N[�Hw��q�:w�»K��0o��g��f��������ч��e��a���1Gq���72Fja��B&��dK(��Ѫ��Y�eY��WO��i��v�lt�ߍ�����0ѱ[���!\Y��*�`ОZ#��o3a������ʺ{D2~"���{}����r���O����\g����@;�D�u3V�~�!���}�L���U+�{�E=�>��?���l2�܅�A
�:ͽr)�K�>^_}$��ضk���l��c(���L߼y��aX"      2   �   x�5���0���Sxb�P~WB0��K�ZIJh�� �R@��N��[b��h��7���TAt����6��Qv�O�)���=�3�64,)񫋚���3�Fmn�q�VG-��E����gwo=#��{\p9o���&PL�,��~��=�BC#Z�%���X�����1�u���[r'I��DE�      c      x���47�42�L.-.��M-����� <�I      3   -  x��S]o�@|ƿb䨒#�1&v���� q���p�Q)D'����������j�n�t3�s��BKԣ�k�4S?�uZMkjS��,[�:�S\����񷟇��h�9j;m��7��f.�ݫ���`�W������)o?��0�X9��q�Zd�nה=�z@����*�{�Wp�f��]�@n�~ Kӈ�N7]K�sL�f�^����_s1:�XӘ�ܔU����T7����M���
7���o+�!����6���g8�᩻^)���A5�/1���eUy?�~�yd��'�{Ζu�$�	\�
i�H6���,cf��6Z��9%�#�ܘ��"�ByT��a��������X�`��R�I7�bY(
�Xx<�H�5]�9"��PE���ࡒ��t%�Ky�V<�1�4�V~��y���4b.�y��� _�ߏ�������D�:K,�������ջD�9&����11s�"s�:���l9��KI��wO]�yS��)�����+����Ȁ��f{��� �~JcAY�ʃ�!~�y��?�F�v?0      5   ,   x���  �7ÕSl����01�QJw!��.���'�yv      ]   �   x����j�@���S�,�V�9�R�E�Eh/���wb�����jZH{+�0���3��i�QC:P��n�Wn��$O�,�Qk�$��x���*o����B��b��vi���~)z��M/V`�R�l�Or/�Rx#��FPsv�5&.q�����*~<{�\���v���n���p����N�ߠ;��h����0���ӟ�/����y�;_�S|=6<h����EIqN      7      x������ � �      9      x������ � �      r      x������ � �      ;      x������ � �      t   '  x��TMo�@=ۿb�s�ڏ���$B"Tq���uLo�8E����QI�� �%K�~og��S:�Oe?Cx�n}W�]�I.q��R8X(*�b�I�2�[�=���l�RN��;g�a���Y�Ȟ�ڇS�"�l1�8j~�ϰj+��P�>�=t���x��oX�'����_���sׄ��Y��G*&��Z���@ۄp��)�-�0�N����?4VqT����& b�n"5����(; ����C�������k�6��߷U���t5|��	;h�Ѕ��)��g��CYU�]�{�˾d��8֯d��)��@f�H�)m���>$�N;Bv�{	�'�z�EI
��r�l�u�'˒�CI;��ω�*)��>4�HU�e��D�H��ԉ�^#�Brf��u�ߥ�IVs>�K	B���u�X.��~�#8#�q�r�(�G9��K.V�P]�S�Ռ\<�:%�I���M!,s�ss!�0��$xf�#�n#�f3�#��%��Hq7D�L�J,�3$��B�Q��U�I���E/f��\��BiW�����-�ԠF�5�X�� �      =   M  x��Yi��H���5��J;Ә������.�hW�1��`S����*�h���L���2"^���������j�����k؎>Z�����ba9��� �!�y����dR�L�i�A"w�X�k�s5Zx��ѳ�F<���bT��L`z֊�@P�;�4+n����mw��an�a�߁d��!&R @(b�J*$cD��zw}�k���Z�k{�����������(��T Ic�p�(y&�Zz��\���'�c� XB�(#��lװL}�[
	�k�$�)����F�P�|H�72�O0��l6�lE� 0A�α��?�0�}2��K��g� �d#�A�I�Ќ`l���v0�4�����B�k=3���t�${kT��j����|��2�5��=��m��#��,��Ң�j��u���;�G�~D
cHF#$���0��<��wDĭ"N���<y�wxk�< 60y��<��x͖��E>ԇG.��9j�emD���8]��^�2�w)^�F	�12� @�Xr@��.�(���Y�*� 8�:"l%[��ٯf�2?�R��es���3�a��q6V���X�5[��U'��ߩ|Q�+�z���ǨUR߲g�2�8�C�N�����	����������gl�F����k�Q��'��V{��Xpha_��'L3�7k]N+z�\�z�@�sP]���|&z� �r}������������nք	xZ�
����Uj���0�.f��.��+'5�5�1��{~�3sYsӱ�R/�V.��h��G�|?��v���jn^�F:��1cc�LM�xvh�_Z����Ɂ<��&K@�3�)'�D��d(?{�IU�T����ok���!2
�_eݢ�D�!���%����P�VUg�U���}�����p?��5�~b��u��юpdZ冘�@��3��L��{5g�QeT�R7�@�\׊Uy<,w$t��&t���F��W�S�	gD�(��=��1=PGt8�o*�`��G�h�������!0rt�O�k}�|Y##���6(�l�t�UP6�)�HSD�#8T=��lI�3х�JI7����JQE��[X�p�z}6��g�u��Av��n��~��n���჆ߴ���Uz�y'���0 u���g�\X��B'�k\��\�$��nʅ67%���P{-�|�ƝZ��m9��Pߠxv�o��PZl�s��_�-d<���la)����Ds+��m�wz���U�שV{�g�Swi�+�d<��Nu�m��|7vW����,���d���JO�^��#&�0�L1ˏ0Q��HW��+�y"�������I�:��s��Wt��^��{���L�v�,R��]�-CϼRT�s���^y��1g_���n�2-z!Q��*�K�����>��2 �R���)�^��P��}�=)^���wf{�m�����m��&m-W���vj[��"��SK�5��6�s+�~����ں�U���:��Lt���\����x����3���>�/��K���^orz�Qy7����p9��&���"�W _���C]@ )~&��R����xߖ��'?�ڮ�#am��ٻH�����mY�Y#�T��)�������M_'�90�Z��{��ݑ���x��|H 1~&��E���;�=)^W��Q#���u*�Ze_�/����ғقe��<鲷q[qkqXp�o�)�o+�/6!(��1��~�גOT��]�����FvX����^E���2�É�
�d�V����2���V���˰��SN=l�y�d�+~�:!X�{�݈.�r|�x�=� !�����-�5��l�غ��,Z���)��8-.����E��3��@���\��oD�&��c�uR�W��cp��.`����5�L��(L%�9��i���v;u��ˮ`<�V��f�Ut8A���B�OM���7�����x��4y�l�<wƨ
��
}׍�c{.3��y7{��2���[�nmq��b�L��GM���1�N�J8�ʿ �cN�o�oD���(>)*��+�lEk��F�c�3te�+[KNV��fn��1u�������^��R95������E-o�.1=s�@��������;�����J�@ ��c��s�C���3ѕ�br���H^�	T�LW�J��=�֌�}��ˣ6զ��W�T@	�3��������7�X��[y�<�5�a;sXh�NU�ڶ�͝�#��`�bL��1��mt3B�d̵�r�͍Ocœ5'���,���NL��t���5D%SSu�P��k'R�R��Z^�e��<���>�����^\�g��59=V5$`��`1��d��Qԝ�a�����2�:�Ճ���3�ay��~=���NTqO�3�Ϙ��e�	�4E5�ma�m����Yo�o�l�|�A�@�bU�Ut0��)��lF��YU��5�E����2��f3��`�w�o�le,S=��k�'|7|]��CA��m+��
�!G���T�����W�Qq�H�qH���4���-������U����]���|�6���Z�v��g�����h�S���QYU�����_;�0m6s�V-�Kg�����Qc�B�j(�jb�oI�o�-�e�?��%��>8��A�%Ҋp������>=�} ����('u�A�Fln���L�mǎ�-o�6�I+��?'�)f C��ENx�w>�g�;�L��ѐ�7u� @_���@DF�K�`>�L��lCEb���v�ov3��7��t2� �5�r1%�W
�K�h0�
	(�q�ȱ���fc����1��C��]Y��I&W�����"�;��	<��a���yt
��`�۞����j8�t1��Gk00�>UAk�
<ߦ��3ݍ{0]�K�Yf�]}�\��[Z?O����e�Z�ӕ�z*�� ��D�����t���葟1)!�0�[���s�)q�$=/�UR����?���7Z�vR��x��i4"��	V�x8�����r򵳳}�Վ1C@D�jD('��f����-NpV�F\x�qP#c��F7�w�J�+��eF�PdBU�@\�F�Q���۷�!~p�      [   �   x�e�K
�0�u�s�$�ԥ�>V�V(Q�R�&��Bo_�E���`�)k� �n�@�˹k���8+�1�|�U�S!�P�Ȣ�8艮�2�Gsc'�"\�YY�����8��P���e�g��f���{�}��~���X�T��DÜ��� �4>�      @   �  x���Qo� ǟ/�"O}Z,���-�4i�&E���/4��-̸M�i�}����Z�k�d���ο��f��Ej�I��N§;edL~h�m��;��@�p�J([ .�����X�q��y��뭛����[w�ם�o!1�Dp\��Ϊ�m��!EH���׆B�c�O�����'lcn][E���"�3��W�Ł���
E�DLRv@@����' ��/��*���h�hk��E0��C��%��������H�~���E��@�D�)ʠ�)8y�p�ލt�O���I���#/��a�k3 Ґ�0go�ƒ~��/7�?�F���/�Z�m�TyQQ�� \L�Z.K��ՙ���v���.�<���f�+gg�l���$�Y��8z�֞�62��EYb!J*����r[_Z{���K���c��י�������{�l�paV�<#��N!.((�u�N�U��4��fF?��6QE�x�}�^d���7$Ə�      j   �  x���Mk�0��W�Ү��x$��})��S`Y�j0q����_�BJDr���y<zy�"6�Ý����.횛�����S��5*�o���y�6��������6�o�|��o�i�O�p�`#stl��[��!]9E���=S`/y�q�}JC�����4=�]�7_����O���yI��4B��W)$ȟY(�ѡ^
��w4�?B��-(�#x𬲔��@l��(�U�"<����}�����O��vx?�9��7�^�D�F.Z'@ߺVx� #r$g[.���	Ah�@#�W� T
P���SȂY}. �0�(�2�H`��BPU�Y L�w@9�,%����:��xi��"��<ѵV�젪��6�������1��cw�_�\�W�ҳ�����/���       e   R  x�}�=S�0���W����W�ҥ���.n�ƾ:V�Vʅ_��X��$=�GVU�:��(��'����j�Z0!�5�zj����C`��Gy���4[�d�fYl��.]�g�Z���L����,���HX#W�;�3�jL`wk-����@��x��60� �EzOg� tWk2�@�An���Z9�D'������]$r���������5l ϊr�Z��~Y}��w�7��i6?��8��e�8�g�)E��>͍V<�yWn���؅i�%�i5O)hЪQ�]δ�;t|��H��M�el�7�	 �5Њ�AMz4�
�<�1���r�����Iǟ�~�0      B   P  x���]o� ��O~�K,�8�k�,��tռl��bpB���մ�>���J��I6�s �ׯ�$�si��BI�t�.ꍮ$PL�!#!�&Q2�i@�	y��I�ߞp}	���Mc8\TBq�}=�Y)���J�z�J���V
8��RB��}0��1����b�7��w�(���C:?�8HG��7ρ���}�VȺ��p)���@�o��'WW�߇Pn]�r�!S[_"��"W�{��Y;�'1\�J�{n��f��2W���� L����m�hv+M�"B&4��I�2F�S�/�g����K��>ba��g�q:=��!E�3��[�-�-h����iwm�=�:!�i��;�7J��vϛ�q|���m3D�����YwE"� 9��h۝�����;�uK�P�����wЗ�*YB�N���U%��"�a!�+ÝY^�;�����1ldY�^�:���$�x̞��	�J�̦�#1#��Uw%;
=�H������"��������#���
s٠^��Z�b�+��߸Q�j�{��U�h%n�����*u���@��d<v7N��G�^��^�)��u��3���_ �c�      a   r   x�3�� .��4C0�L��44@bs��'e�:%������Z�X���:�[�ǧd�'�d�&����UXd�Ż�e�s:r:r�LK,�D�=... 1�+S      C   l   x��̱@0����)���z׺�+ �E�`B�?V���/(��J���YI�d)�JB�G�N��ǲ�@��q�����3o�|<��Z�Q���Z�����b�� �N�"P      F      x��=K��Hzgί`<6AD��X$�6��3�v�=;�l���ZRDɞ�b�99��AA.{M��J�z�%R$ER�̎W��"���~F��ȘX�|�ݛ��?{wn��-�g�ߘ_G[���22]d>��w��ɯ�/��}h��`���&0^/gQ`|��x�Z����}��3����h��W�Ք�+��Fc2�`Bmb8�������c�-ya�ۮ�oW��"4��f�V��zPZj�L ��s�|����0�	��m���F��-���"�ޘ�ͯV��9Y�f�?�3���:
c�|����|<ږ�xx�҇/��`9ͻ�nc���t�.6ap��O�m��v�Pt=����j���L9+�M��Wa�݉��0��b0 �`��RLP�P��\���m�03����@Z^?���P�8?0N��w�ML���=B����K�@�U��Q��=D}׶m��w��c����㏿����f5�M��E ��ʂ�n`M���YxmmWk�_�k7��`�?�^�x��볯Lc:�7j]?�}�L�����2�5�o�<A\��i�܄�B���?D���o�Q���8�c��b��W�瓧����1B�����g�_O�8�w��p�կJ�B0{ϟ53oS��[��
gס����j����3���xk���<�����o��1e^���r2�I�\xaq(ql������_�H{6B���Թ
p��������)�gWO�����?��Ϣm�Z>z�h����]��	���[a��E��u��b+,x˛���:��S����o�yc���bſ~=�|7�/ڡy��j�� �/�yo�ok���C�C�?f����)�{+��Y��H�S�$	h�uPB�V
�e2sr&�_^�@�{|o��.�q��tn\��F�?$\�Fb�X�52c5�H>��H��J�325�ȼ�YF&�5��dd�|�g�%�㏈%��L���b�����.��e�H`H@4�cX����d#$��� �`9����&��6����*Y�������"��ہ��u��"�+��,�x��G9.I��/�)�t�{4����_h+�|S,�5�Yz'�1�G���'�1v-B��~i�-��KNw�|�_.�MhNf�znz ��J9@v�m��h����hG����� nԫ��S,ު\˷��η����g��6t�*�pi�O g�ҋ�K�Hf�H�t%f��c>�Ȝ�y��4��'!LJ%�X/�<#HA,lG	�2e	G�.�	�m�41E�$#W2���iO2�:��/HFaQ9�xb3@��l���%���[a�]��.ב�[-m0�5V��@��xr�ԁ�3�t#?����;���<|������y��"Q��4 ��Y,9�x�h"�����[� �����W+���b��	����ٌ��ǋ��l�il>���??���g8�Cm#��q@0�s�[~��1�5�MS ��n';ɷm_s�����O:�)�Y�}b�T(��W�4��a�Iqb��F���|Z�����}�ӿ|��?���ϟ>�����*�����������>}��#6��J�6�;# ��"��S�>�ӧ�?}�?�� |���,��Y\���f�t���ɖ����tO���'� �c�v�ў�V|l�&���m�6q��^l�'�y��Ü˰�l=v~v�2���d�ه�`�=;�'|^���/�c�Vc�gS@����3����_<f���/b����߄��c�A��乳��'�H����z��`������`gA���yq�Hޚ ��9H[	�#	�T��0�1(x�����6a�c��f�_�>�E����{�)s/4��3R�hP=ր��>�VT��&߽��g�������Z�Nc;Xi"��g�xy�M$�wxE�^�ίN�G��]�`�B�Z���vC�����@��Y�L�i��I�5�:�l�`�͈H�Ll?A��;��^�u��u`��r�qO� �W-$��sz�0_"%Q��DM�� �Rr�����
�{��-�$;>8�< ����s
I���P,�i���!x}�\ǣi�5&�`�s��ym�`�2��I����.��$�f���W�^����c� ���2ȥ�%a.^��c��X���@�%�0�삕?���.����-:�:vt�˭�u]�Z^U�k��*����}.���\�:y���u;����}��`��|������B�n����Ӆ����+�(Q���R�#.)����C�$ XP���.��]Lgj_�;t���:��m`^A|�#y~[�P)�}�76��~�3��7���O�%B�:��i�i�f��V�
3�w2t%�� #�kP'���r�Y�@u,Ά��v���lB˩A^�FjY-�����qQ�t�FAB=۽�6��	�k+d"BlzT԰��^�HW�`lV3��z�RgC�樀ȵ��`g����Tx�`�, ;���!�T�ӕ��`�J
`�����'d�[��ju:j��������z�2��Ω�oącH�G��o|t���5�~�MI:l[���KȅF�z�od'�]ED��\;ih�5��\���>�	�!�Ѓ���羼�����eB�@��i�(����Y[ZZ	��?`6"m�8`�C�N��y���C+���y�ف��@�n,�?��-�D��ˁ�x���}cgXӆfM�d9cf��Փ�A40w���%Y���{ʉA�0�["��nqڔ�M�����*�R�&�ұ�(?_yI���aZR��u��a3q^�%E�z"�}=�m�st;TYO䶌��B�(��TX���Z<�)�ki	�Yeܖr"vR4ۏӟ�f��&H�l�b���l�?��Qw��P����GC��<\�c&v�1�X� ͧ ]�>��%��U&�:�=�Շbx�Vr��BO�\+y���������(��(���X�l@�Ќ�esȫ'.փj�-̡t�-��T�*�瘪�0�r+�}}�`��ݸs=��;�~*?+��rtsWO0��^Xb�uwP5y�Y��]m��W���v���B-!e�7�Z"V*�4�K�h���?�!(&E���	f-U���
<=�BcG�j���<m���^�m�D����	ت������!�°62nҌ�"�[�n�HU| �FjQ+)�#C��%�������Z|'Wĳ2��p9�o�ʫ,�.\ͫ-nb���Av�p��w��-̣2�@�,�������b���]��({���ZY��喹�B[�r�kGB����ddN�S9	�}H��U�8�n-�uڊw s~��GIa���BZ`��0�8��?E_�х{�"� ���B���.4��&Ϸ�-�v���^�P���jj.x��V�Z7��ɭm�c��y���{k3�^ܢ�:�g�R�j�~%ٷ�-f��N��E݋��{��v݋����  �?g�뫐K�8����t��OFJ9��VAH�J7����q
�l��b ��e2&���؅F���m����m0$�{v�ՎJ=��B���3��Y�]R�N��~9S]}�:��������L��\{~S�X�ʙOҺ'�*t3RFJ��f]]bN�����x�j�2��N1�8�*���)�\1��J:d;����)��W���UW%m�W{	��UIn�}��:*�ҥJV�ДXT��v�q�U��!�c�R7M��U/BC��㔱\
���X6w@e������c��.4�����2��M��u�����4�q�0�̞�í��Ċ_I��͜|��k�i�ȑc/N�ԉ��>\FaW͎v��#b_h\k� Rj�aչ�}&a�q����!�3,��ud
{1�9`{��uH`?E��}����hj�v(�b,��[���4����ُ�`�W�I�:=����Hs��2�{eKgk�ܫ����{Uj�ܫ��K4�8�UUT��cr�
����g��)Xظ<#��'J���ٜ%/r*Mf?�b��p؀%[髓Ξ8�u�����8 E  Xh��~t������̪�|�Ʀ��@��m�:;i��9���ż�al#�4ŏ�ΧX�5Ql��E4{�c��ҟt|�ö��v+�Zll����N�(��b����󀧫86�.v�}�4@�j՜���F5�he��P������(�/����}kxp���{NC�+K��8�q>_��.T|���K�`�F,�0;�؜d��`�bG�U�̜v�i�y�u/�.GM��j�K�.�����ҕ&g���
�U�E�Ӹe���GЅ92�E���>��ë�(�'�Hzv� � �"���`��#���(���T~D�p��+�iewKx`.��ƺ��:]�f��E33�
��U��.A�Rr��PD7�F`#�w��o�r���%��;£.�F��䨶,�dM�ű��
����5+$ə@(`T�$��[K�B�7N���FHZ"h�$N�{����ۖ��Y����	 �K���m�{څj���M��H�M��"g4y���t3>�@�>��Xջ��4v	h��t�uz�8����/(����j�Tc(�S�N����m���!~�<����Q�_4���:T������Aq�'��1q�y�IÕ|�S�+a�_c����.�c�]h��X���0���Ȭ,�f�>�N��-�JSh�n)4���ɤ�d5�����l���$�\M�ƏU�ԩd�&p��>���95IHڱd��$���GK��O��O+��[����f��Y�c�Yy���}���'�D@���r�� M�UtJ�2�=$KR��G��F�s�;?��gF��ps�)@8xr��'?W������"g5n����z���1��bn@�I9S�,o����GD�=��l	dKT�.��Q��Z-����nZ�7x�E2��C������<iS��i��,��A2��t�!����ǧ
AV�ں��=B���g��U�p":�V!H�:E����xKS�A��Kh!E�8�P.Eqp�P6E��W�)�����Eϗ����C-S��8EQ(*�u���4E�,[������(*���(�ɧ%�$���9z�3J� �4���o�a8��b�i�a�xq�U�Q���@��/��x�Yp��H�Y���S����f%
5�>+��J"E��t��������?C�'f��pv��=M2���r���t��OTl'wl���̰�	z��]�"��Y��!n|]��0+��Ç'�(�7�@ �pP���[�N�-�e��������ԅW3�&���/i8����3�rɲi�!���duq�M3��*�E2Xƍ�eBy;XB�FK�V,�C�&���2�jj屲b��$��d΃�@���
�c\�q��n´����_r��ϓCĺB0y��������H�} 8�1����wH}C��U�Ճ��ߚŷU$�qb�!KT4��~Æv����iؐ���A&:�������D�.)u���Gi�����2H�:�S���e��%i�M�S���k5Ѥ&+����:�o��ΰ����<�od���[���be���L�u�/���Y�*�����6pCg�]G$��V�&���1O1/t2"�$w�|��VZg'4s�d��90˯�(��(���͍ ��A<�U��Iw��I�U�� ��\��E���n5���Y�+� W�k�n	ֺ]���E#�ڶgm��ƴ�h|�O$��ҟC��C@��S��%1܌\��4;O/m�/��8�$�o�( X8k� p�<�s�G+����x[��j3��_f�_��a��[�D"̄�Q�W�L�l�~q�>�D�]�[4�g70���*���~��۞]-K�h�	cq��@���#�֤��n��~�� ��$� ����f����AɷfU
��ߢeK�Η@;���[�v�I~1�K��K�g��S?��7�^��m�Kr�B�,���|�>u���/-PV�o/9�$���ִ'L\RvU�;P-�������Y�eՇ�[:Q��@�y�`���1����)�[W�:�n���E��W`4�G��y�?�����L7�$����=����A\�%(k^�Zs����#�kn>� o��d��ֆݬ�.=4<G�Tt��%�"�n���/*Qg�;Hy����w#�5���F5ޠ��-��v�,�vTm��֙��!�/�WTY���-��Y�¶�]�z��rOTS�:ß;Z��=�� v��k�����|s@[�:ik5��Z-��߬~�@�Җ���DC�\푪1p���%�_G;l 7���8%���#�&�+r�r�g��a��a�Iv!ڥ+7Ӷ-��k��E�'ձZ�:,5
+�v�Au�����:,�U��#��v��t)�bZL���ʱv�JiA�R��!ʠ<J�Sp=�}�ԗ�N��N�͵7tjˠ2��S�AU�ڶ�c?p�lZ��F�F�l�贫��ս���`���SQ%.t>5g�*��9VA�|j���:��u�v�ѧ�4��jyj�SYJH{�*���N�K���[y�c[)�%:dS)��}�-�h�X�	i�QWY�ti�O����i�m�O�F�>?S]��U�$��u�Gi�_�$v.4�/j�����E2��u�He�_(�OW����(A����{3rm���uB���>\����[dHI���Ҽ��W�4��z�bKj�K�:�I���8ӆ(����/�h��t?k���!P�h��i�y6�,dht��
ʷ�J�n�6��M�	zjK��m��,n��qԭ�Qy��90*��+��M�X������x{�9�Q��j�Ĉ�S�fL'��L��Xt�7�v�<+��N����R���)ڥ�5r��hn��߮��T_�ĸ�r6H�V�ϴmee��Қs�U�V�[��|�V�c�����)�m[+|$�m�V�("�?���a�09/��;:୼й?��E�$E��������s��q�E��٨PD��;Cpw�����ד�:5Z������{�r�����K�����LZrx���,6���d�W�~:�o���J�WX��+�a寴��w�R�����@���+�w��=�"A}L�F���C��+Gz��~ww�������qxq�/�J|x>ҍ~8�[���,t�L0�t"e� ��T���}?�T0�͒k�[��j���:�V��7�P�1�_?�g�2I�ӹ`]���$�U���"��]���wbt̳]�ɢ,���5~����ϼan��Y-�.{�$�`ڶM��"��UjrU)3���٨X�t�,g<�Y��u/mX�>tJ�E�3��x���H��f����ȃ2 ڲ�.Ew�$��UU�-�⓷ ���q��_�?*ݚ      H   �  x����N�0���SX����g���,�n�Ƣ1���y��3%#:T�*:'��9�F���g�~r]^��z�kyW�=DϠ��+����^���w'���A�
�q�Hp�=�O��=r��h!d���APHh^�����,����	i��j�B����#�$q�Z�fN$��f!�T��$��q!u@:Zو�y3����8��1����%`��R�9kk�����~Q!G V��X&�d����A
($�	�&��,v����j��X6v5���rX��Cp���o��	��nfW��՚5��������k�P"F� �j͐\����|� �As�)�'{�k��Q8l��ߠ	c��oO��9=g	�4F�}'5g��M�C�P�MQ�(�g��u]�u���      J      x������ � �      L      x��[�r�8}�|�*�/��9vn�8q������J1ms,�Z�JƳ���ݠD��@9U���Q7�Fw�̒?/ή�����}]�Mq[Տo��b��*�SF����Lk�c�f}K'�r�������S5�*3�0����?�Ͽ��l]l�b�e�����g�ٳ�7/�߽��z���c�[�E]n��Z��?~x����M��{���ǧ������8h��6i�8���R
0ϋ|�.j�95�)Ƙs�?\^}y����ݗW���8���3�Fz�̜�9g�uSPg�m�7�-��W��DV_v�
��^��z�xO�q��p�p�n���L_̷�v��h���7�K��3���Џ�t��(# ��^������?8Nf���9���������;�8��/~jI�5SPoA�g�~��-��SPO��+l�3�U�aDz:]koo��f33T �\��)��x��)g���u�8����Iź!3B�_��9uϙ ��K��KY*���@s�W{ct���s�2�a������y��P,�)*k@=�,�{�0�W��(�%0��A=#;򹂅Kk��B�q�9�5R5k�7��I��s�1�$` uL�%�USՋ�Ū���6�^TU�����9�,�A :.����%R����9u�������(%�v��s� Q���E1�~�?`��NT6�Lq3��t �?�k����-�9I�4N���R�)��	��m]�)�U1Jϙɬ1���� ꭊ�:&>R.�h�8;��K
.���E
�Br��`Q�&�h:zL��g����UP�*R�-W���Z0囼��%7�!��3�-x��+�>�4����z����O� M&�2i h�87�m�o�a�����嵏�CJpǌiH]��ч���\��
�0�UQ�T�C��#C��!��22Q
Ch��3�=�lVe�^��=�4s2��B}(�7�Ҁm��{�z��]��tb8���*2X
�Y�s�u����`�#rh2�b�����y��Eq?�S���MB�NEɫ�(V�ޯ�ۤZ���#�PP��U�h��ʸ�FG��CA)x9<x��W��Vб8��,ۇ�fA>�6�r�`h�(a�m��|h�h����0�$�U��������z�����Rdκ�����T5P?���]�T�d�!`G�(���l��v�\��Uu_��i�s�'�s�Gv�Ca C.�����?[~�Sn'�s�1�1�(����[��z�[5>�Ji�ԑ�l#�����X��߳�M�bd�^��I���T�i� ���u�(���E�*�8m4����,�Gv�>3rY�*zW6'5+�Y!�eR

�9xb�(�T��j9�_�9d�Ό� 
���^����w�֧��v���Cv|D�V*:�2}$ I����E�,���z���|�20��qP������E^�q�A�<2�0�ֈ#O�0��������V��MW�@Z�p)�x�P��D��!gD��$L��9�MĻuj�=��E���(ä˜VTG�ч�V�^Y,O(UP?H(�#��N������C~?��X���D;+�x>��r��n�é��,�����@A-,���������ۻr�$���#��]�Z�z�Ӵ���'(8�S�����������Q@�-(yQ�;�T�B���U��b�a,��܇��&�V�(����}��NS��u	_�u)����!!1-r�*��}.�1�{p�({��|U5w�|��-��Q9%��R�P�H�ٞn{�hk�Kv{�:6o�?�T�����x�$�]�3���*c��F��IP�jr�U��	��D���LK&�0����ǩg�� ���-.�j��e�UuH}�SҼe� ��x�"e09���k
��d(���n�!g{������	�$I�2%5�Q2և$Up����ŪM8�ĠTcB��� ��Dm4p%e3��sc����rI<v��	Ȣa'���D�I��J	'{=@��_뱭P($qs�b��q|�6�>����ft�#�|�B`e&2x��=>"N=&lS����Ğ�qY��X"0�3�Q�MT��@N��n���#!k��$7-����Ij�KA���>���\B�� �m}xȬ�.�(Fa��R=9OJ�73�G朳(�@��g^�U�S�7�x���D�V�ԻsJ<AQ`��R�c��@ѵv�X+e=�
�8,��H�P=	��M���$ge����\�F�"?�����*)�.�qȆ����G����?�E
I�M]��IT~ � �u��c�b�>%��'|�H���=}h���o}�}U@�2ɍC���d�J��"GҘp)�/��Y������<�����9��L�2��d�k5�P��8<?���鸑�=H����� @~
���^~td,�^��:���(�[�(P��7U=��W�$/��>?�$��D���c�@��$��eȺ�`���	��d�S]3)��>rA\��e�^G�|���#��9(�t	rֶ��U�2q��,l .�R��^5d:���E���)�	�bV��a$s,E�p�0���)(����W��/�&�L8 3�'C�v�H�r�	f}�@���|���ӧ��۝'� )3�ii�6��b�z��4ʠ�Ё!��>0a�*������	nZ:�5�1�+����Q��Ա��}���_���z�W�>���������~JC�32$��+�,����� /��^�^�0.ث�_�b�Lw#�z�7����A�8^���&��]���u��'�4E-w�{�Or���3���1�:
r����.򺩫���tm� �S>��䒜d_���u�4y�����Zq����%9Itn�#��q2�E���`�%�ǧ�$�����H.���i�1.�2�P�q��EQc!�����}14�Դ���l���*�S��Q�C������{��]wW㦘Y<��i�QѶ2��Q��e	:��@M��x�%�E�-o')9��=��H�
� +K�F� 
T$N�o�Z�M�W'�^�3�T;�i	��[�.�E��@T��e�`�l�-���O�P£��bIJ!%�MB݂��U���L��?�����$9%���>��]�c��6��(

��ч:�X�<���M�H^y=�O[�N�1�$/i�0\��Ё����q�:�w�5Zj�����eTB?�ԍ���g�v�U�{k���Fy�\I�?;gx�ب�7�B~*��b��4����OWP�+�L0��
�Yex���@�����w�&W7x�>�
�ڶs$�$�iF���7u�`C�n7����ߏ�/iK%�5@ᆛ��ͧts�V�)�w/�tWa��cQ���"�{;�c�^.��6;�����N$/�ð���[qt�&��l!(G�7�B����^��X��T�c�jr��ra��h���OD�V�@͐w�Aݐ�������6�ôѠ���/'����$^ֈ�>Jo��|Y�G#x�2���C�2E���9��/��
��+�G��p�i�&�\�Eӵ��+�3��tC���"a/��3t�j

mCA>���av�*���.���bgn$���r�QTIQ{�2���o}s�2_ܕm�pQ?��e��͈�t� X ��LP ���]^߶���-��Z�T�X��i;l1"�3������q�C�F�4f$��$�o�bѭ�(9r��C	󾼽��m:�1\9�ұPKg��;�2����� 
�3%>@�O2J1t�X,I��Lmb7�C��yyS�/|(�p%/��*+�u��T��CC8jL�R@]��ȧ��w%�o��R���
����b��Q�ߦخRҙq�G�SJzj/j��&I�����l�$u�������Ϲ/�}k,?��I���H&�E�-8�p4	u\8�������XD�z.C�$|O�S�@A��`������!��"���Mw$��h!^��}��"�����D�b�����rbt���TF{� �FW��	g��{g�Ҿ�q�*���| ������ �  ��f_�>9�5�I���U�T�Œ��| Ms���;�u�.�Ը2~ӊŒt8���ZOB�tK�V�߷�� FA�쓍����^q�e��V�#Gl
$�F$v>����:�jq"�Ƴ*���dB8y���VD��P�6K����s��|]�u�'f4�=~�J	'��m�Y��@��%m��j���{׭�zY�í��(��?�2:��#���A�����-?C��tr�Wԧ�)�d�/�p��c�f
e�;�Rs�J���|��R����ԫ�i�J�������i�7���އ�#q|ɀ�2)�7E�P��?M.��&�:{w���Q��Kct���8�X���bSPo^��^��Nk�U����vN@�\��>���է�=��X�*	v[;	���짟~�?��      N   �  x���ˎ�@ E��W8�13I)�섦[m奶(�b�~(%"���阸r;_p�=W�0�
?��*��=3O?��ed��>���\�F	�`Ŭ�5��s#=��}�Ғ�1����1V���C��������� ��?�ڏ�|��u�S,�$ǅ_g�r�� K��eIZ~:3�lv���΢Usv��4n�3�I�7ZGC\�v�WR�����e+\�=b�(���~<�$�dP���^��ԛ�=wܷ�_��i�骦�v1c�^L�q)7o^�������#�hT�ᛮ/��]��1����}�X$%0��r�d$���!���z�[֞��d�h���d�ɗ�ŭJ��r�US��K�:B������=�m�NS�`�T�`�'�3wVx.�q�\q���Ȉ����^\(g2�s��J7n��:���;� (B	�P���A�B�A�C$@$B$A$C�<[�y��G�/MQ�?#'͸      g      x������ � �      P     x���Ao� ����c�x@��H�m7v�ŨiI�K�Y\�~��u��R.�	��?E�`O%��v��o}�[���g}>�z�3,#��ڞf3��n��Ó;g7��P!�YEFW5^����$ū�;LB	��� ��m,$����q�����:o����h�}Ɛr�5L7:�֬����� %0�Hӡu���_��e�s��,�)���o(-m���n/�;J�yحQ��??,����l]���#�'���_vUU] �{�i      n   /  x�}�=N�@���9=d53;�{N�A"�hw'�[)J��b�=�e[C�勉E���^�D��[�;��<��t�{��i�=n4�<���ѥ�����������9.}m�Cz��6��������2ie)6TZ2i�qM�wICm���^y�v�1�[���7��v�}���O��e��$R�!���A3�(Š8��P�Cq(š8�PJ@	(%�v1w0fBI(	%�$��R8+��Lt��P���k*���g�y'B�#��H �@a(��0��W���^nF���_�m6����       _   <  x�}�?O�0���S�:7����)B�e0���&q���~{�A����߻�EBdb��6f�2.�<����I"4�$�
��\jFs�Q�X������L�2,)a�
)�o/��[��e�,�rvP�UYCUW�#TUUBYǺ�WQ�U.�P�_��J0~�?+�_�|�߁�q�i��1�Kx����a�漝��1��zJ�!�k�5G9��<9��g�#�a3ħG��?���[����=�z��;��>�:4��t�:3CX�p�`���D��U��L#�+D%&�)`�E���$~��`��)��4M?΋i      l   -   x�3�)��H���WHLI,NL��/���$�a�---�b���� �M�      R   `  x�}�QO�0���~E���m׍���D�!	��`��ws��1�ޤ�9�ɽ_���)�J
�2�R�m���`ڇy����'$�5;��ɠ�J��贴�֤��Q�Q�@_agf<^d����Sw�e�������%���OQH	�N��IW/e+�YQ̑q�|p��V��r°Mi[����6��]�C��ܣX/.}7``�u�w�bd0��qg�t�ْ�mL�LI6'�&/K�U��F냮1EE�q�}J�Y�J�}��
��������"����l���ɹĹ8^��>����N����D��kM����*����_^�]}��4���u����k      T   �  x���is�H�?�b��nmmь����2��v6[�A�I���;��Ď㔄����~���[��@�P�S��E�5��cF-'��.��"cw�|�p����ZZ�q2�t��V',�t���enI����~�I]��b����<d;i�W�������W�N��s�7͛�yꮜ��������2؄�ʲI[Y�＃?��N�1~�9�j�
��՜�����l�\�*�����2�BG�����T�B�X�Q��j����MV4m
jͲ9���h�2�T��1��Ы������`m Ɖ���w��M�6�Šԛ�*'�ߟ��>i�0R�x&��e��	�zI����������Y��.o�3�CU���s����O�3c԰�w�h�<�H̛�����mf����+�q�#A�L�,�� ���0 ����x��Q��(Ţ��^�<}Z$|�ޛ��=;'�8)����7<~x��]�o^y���et�˵Z�����ա;��=��ϥ[&+�o�UU��;�ۄ�	���ͨ�t+��ø����v����z#�?luNF@����_Ơ^�n����oT�h��i��}�����
*�Z�����?x��޾ �:+o��	k��f�������7�y7�����yK���?���lp89��tSEɀœ�?�;�q~�`"u��q�f �:z�)W��K?�����a�k�Q�y�������� ��a sp�k�% �a >�)�w�L�Z6�DlS[��v�����Q�)�����,��#��̩�ke�?��_nVUܤ��/J��u��ϕ�?�e
� L,�4qt�pj��a��Z�S,�(*`�m��2@���U�� ���Tp��x>�����G���X-΃�7S�.{݁�=�1~�O�|��<f�zǺia �B�a�)��S���$��/�^�4V��^�����Z��t����ٹRʺ�.�8���h6Ve�\�o��h:�¨�zql�v�B��i���F��
�jj�G�ױ�!>�q}_��7�9g�q�&�5�x�YCEy7�j#�w(�Q}W�w�#���0��HV����T�RC���W��b�2������w�	#S�b-��@���e�!U�D�i (Kp��ɿ��G�I�����>���z��e�^�'��GhW@B;���i����z<����j4��V֡      V   �  x���Ko�8��� ���ԭ�
��"�؋k�MZG2��b���NJI�-	�%��i4��3��Y}�����r���|N��?����YE�6�<����K�zu�g/�s���?3���5�k`��1����ϋ�L�Vۭ/�}u8}���y\H�SA�y�Ҽ�\,	�q2�>=�x��	�ΰ�Y�b����~v�(�nf�$��>�m�V\��ŠA���u�mJ��MY￳�̬�-3�G�����?���I$$�`Q��������ĶET�`QOq4�+�U	W�E�]w��`��	��I��p8�{"n/{��L�$ ;���%n{U��u"�El߾�`]�8}�]eCXK�\��u�*�(Ln�ZT���-��q��r詳�r���v�_���X�Z.
'.s�\�E��,ހ�X稈���v�L�	SD�E��cJi����X3K�'��������f�����,��$ �Q�́a̎;��4ٗ���b���� �zJ��oC�<|��k�O}�9�>V���K���mI?���9�=��GU��{V�ͱYC$6W�S. ��H�)���ωt�$fDJ�p|p9/Ra�jN$�tD�9�<�9i�E���Ή���9��  jN{�]2AT�=���ߖ��ץ�u�n��׫�ÿvM5dR�	���4�DIu3]��V }ȯ���P�DjH��t����b����{��n��6T�r�f6Ǭ QCސ��5$�4p�������=��&��!z������3ү��3F(-;��r"�ݯ��K ����6N@x��~'��q���NNc��\BJQ�j0KH)p�Č��e�"���)l����E�2T�Y�J���g�X�l�e������e��u��X���&���)l:�]BK)�[	������Ďm�W��8;v����`��`ǲ]=cB_��'��\Pq�      X      x������ � �     
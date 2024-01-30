PGDMP      5                 |            mmapp    16.0    16.0 ,   w           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
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
          public          postgres    false    291            �            1259    16811 	   customers    TABLE     "  CREATE TABLE public.customers (
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
    mogadishudistrict_customer text,
    nile_pin integer
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
          public          postgres    false    259                       1259    16893    vendors    TABLE     J	  CREATE TABLE public.vendors (
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
          public          postgres    false    265            '           2604    50526    apploadingscreen id    DEFAULT     z   ALTER TABLE ONLY public.apploadingscreen ALTER COLUMN id SET DEFAULT nextval('public.apploadingscreen_id_seq'::regclass);
 B   ALTER TABLE public.apploadingscreen ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    288    287    288            �           2604    50527    attributes attribute_id    DEFAULT     �   ALTER TABLE ONLY public.attributes ALTER COLUMN attribute_id SET DEFAULT nextval('public.attributes_attribute_id_seq'::regclass);
 F   ALTER TABLE public.attributes ALTER COLUMN attribute_id DROP DEFAULT;
       public          postgres    false    217    216            �           2604    50528    audioheadphones product_ah_id    DEFAULT     �   ALTER TABLE ONLY public.audioheadphones ALTER COLUMN product_ah_id SET DEFAULT nextval('public.audio_headphones_product_ah_id_seq'::regclass);
 L   ALTER TABLE public.audioheadphones ALTER COLUMN product_ah_id DROP DEFAULT;
       public          postgres    false    219    218            �           2604    50529    cameraphotography product_cp_id    DEFAULT     �   ALTER TABLE ONLY public.cameraphotography ALTER COLUMN product_cp_id SET DEFAULT nextval('public.camera_photography_product_cp_id_seq'::regclass);
 N   ALTER TABLE public.cameraphotography ALTER COLUMN product_cp_id DROP DEFAULT;
       public          postgres    false    221    220            �           2604    50530    cart cart_id    DEFAULT     l   ALTER TABLE ONLY public.cart ALTER COLUMN cart_id SET DEFAULT nextval('public.cart_cart_id_seq'::regclass);
 ;   ALTER TABLE public.cart ALTER COLUMN cart_id DROP DEFAULT;
       public          postgres    false    223    222            �           2604    50531    categories category_id    DEFAULT     �   ALTER TABLE ONLY public.categories ALTER COLUMN category_id SET DEFAULT nextval('public.categories_category_id_seq'::regclass);
 E   ALTER TABLE public.categories ALTER COLUMN category_id DROP DEFAULT;
       public          postgres    false    225    224            �           2604    50532    clothing product_fac_id    DEFAULT     �   ALTER TABLE ONLY public.clothing ALTER COLUMN product_fac_id SET DEFAULT nextval('public.fashionclothing_product_fac_id_seq'::regclass);
 F   ALTER TABLE public.clothing ALTER COLUMN product_fac_id DROP DEFAULT;
       public          postgres    false    239    226                       2604    50533    conversations conversation_id    DEFAULT     �   ALTER TABLE ONLY public.conversations ALTER COLUMN conversation_id SET DEFAULT nextval('public.conversations_conversation_id_seq'::regclass);
 L   ALTER TABLE public.conversations ALTER COLUMN conversation_id DROP DEFAULT;
       public          postgres    false    274    275    275            �           2604    50534    coupons coupon_id    DEFAULT     v   ALTER TABLE ONLY public.coupons ALTER COLUMN coupon_id SET DEFAULT nextval('public.coupons_coupon_id_seq'::regclass);
 @   ALTER TABLE public.coupons ALTER COLUMN coupon_id DROP DEFAULT;
       public          postgres    false    228    227            �           2604    50535    currency_values id    DEFAULT     x   ALTER TABLE ONLY public.currency_values ALTER COLUMN id SET DEFAULT nextval('public.currency_values_id_seq'::regclass);
 A   ALTER TABLE public.currency_values ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    230    229                       2604    50536    customer_address address_id    DEFAULT     �   ALTER TABLE ONLY public.customer_address ALTER COLUMN address_id SET DEFAULT nextval('public.customer_address_address_id_seq'::regclass);
 J   ALTER TABLE public.customer_address ALTER COLUMN address_id DROP DEFAULT;
       public          postgres    false    268    269    269            �           2604    50537    customer_delivery_address id    DEFAULT     �   ALTER TABLE ONLY public.customer_delivery_address ALTER COLUMN id SET DEFAULT nextval('public.customer_delivery_address_id_seq'::regclass);
 K   ALTER TABLE public.customer_delivery_address ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    232    231            �           2604    50538    customer_follows follow_id    DEFAULT     �   ALTER TABLE ONLY public.customer_follows ALTER COLUMN follow_id SET DEFAULT nextval('public.customer_follows_follow_id_seq'::regclass);
 I   ALTER TABLE public.customer_follows ALTER COLUMN follow_id DROP DEFAULT;
       public          postgres    false    234    233            (           2604    50539 $   customer_transactions transaction_id    DEFAULT     �   ALTER TABLE ONLY public.customer_transactions ALTER COLUMN transaction_id SET DEFAULT nextval('public.customer_transactions_transaction_id_seq'::regclass);
 S   ALTER TABLE public.customer_transactions ALTER COLUMN transaction_id DROP DEFAULT;
       public          postgres    false    290    289    290            �           2604    50540    customer_wishlist wishlist_id    DEFAULT     �   ALTER TABLE ONLY public.customer_wishlist ALTER COLUMN wishlist_id SET DEFAULT nextval('public.customer_wishlist_wishlist_id_seq'::regclass);
 L   ALTER TABLE public.customer_wishlist ALTER COLUMN wishlist_id DROP DEFAULT;
       public          postgres    false    236    235            )           2604    50541    customerclaim customer_claim_id    DEFAULT     �   ALTER TABLE ONLY public.customerclaim ALTER COLUMN customer_claim_id SET DEFAULT nextval('public.customerclaim_customer_claim_id_seq'::regclass);
 N   ALTER TABLE public.customerclaim ALTER COLUMN customer_claim_id DROP DEFAULT;
       public          postgres    false    291    292    292            �           2604    50542    customers customer_id    DEFAULT     ~   ALTER TABLE ONLY public.customers ALTER COLUMN customer_id SET DEFAULT nextval('public.customers_customer_id_seq'::regclass);
 D   ALTER TABLE public.customers ALTER COLUMN customer_id DROP DEFAULT;
       public          postgres    false    238    237                       2604    50543    homebanner id    DEFAULT     r   ALTER TABLE ONLY public.homebanner ALTER COLUMN id SET DEFAULT nextval('public.homebanner_new_id_seq'::regclass);
 <   ALTER TABLE public.homebanner ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    267    266    267            �           2604    50544    laptopcomputers product_lc_id    DEFAULT     �   ALTER TABLE ONLY public.laptopcomputers ALTER COLUMN product_lc_id SET DEFAULT nextval('public.laptopcomputers_product_lc_id_seq'::regclass);
 L   ALTER TABLE public.laptopcomputers ALTER COLUMN product_lc_id DROP DEFAULT;
       public          postgres    false    241    240            "           2604    50545    media_library media_id    DEFAULT     �   ALTER TABLE ONLY public.media_library ALTER COLUMN media_id SET DEFAULT nextval('public.media_library_media_id_seq'::regclass);
 E   ALTER TABLE public.media_library ALTER COLUMN media_id DROP DEFAULT;
       public          postgres    false    281    282    282                       2604    50546    messages message_id    DEFAULT     z   ALTER TABLE ONLY public.messages ALTER COLUMN message_id SET DEFAULT nextval('public.messages_message_id_seq'::regclass);
 B   ALTER TABLE public.messages ALTER COLUMN message_id DROP DEFAULT;
       public          postgres    false    276    277    277            �           2604    50547    mobileelectronics product_me_id    DEFAULT     �   ALTER TABLE ONLY public.mobileelectronics ALTER COLUMN product_me_id SET DEFAULT nextval('public.product_mobile_electronics_product_me_id_seq'::regclass);
 N   ALTER TABLE public.mobileelectronics ALTER COLUMN product_me_id DROP DEFAULT;
       public          postgres    false    245    242                       2604    50548    mobilehomebanner id    DEFAULT     z   ALTER TABLE ONLY public.mobilehomebanner ALTER COLUMN id SET DEFAULT nextval('public.mobilehomebanner_id_seq'::regclass);
 B   ALTER TABLE public.mobilehomebanner ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    272    273    273                       2604    50549    payments payment_id    DEFAULT     z   ALTER TABLE ONLY public.payments ALTER COLUMN payment_id SET DEFAULT nextval('public.payments_payment_id_seq'::regclass);
 B   ALTER TABLE public.payments ALTER COLUMN payment_id DROP DEFAULT;
       public          postgres    false    244    243                       2604    50550    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    247    246                       2604    50551    ratings_and_reviews id    DEFAULT     �   ALTER TABLE ONLY public.ratings_and_reviews ALTER COLUMN id SET DEFAULT nextval('public.ratings_and_reviews_id_seq'::regclass);
 E   ALTER TABLE public.ratings_and_reviews ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    249    248                       2604    50552    social_logins login_id    DEFAULT     �   ALTER TABLE ONLY public.social_logins ALTER COLUMN login_id SET DEFAULT nextval('public.social_logins_login_id_seq'::regclass);
 E   ALTER TABLE public.social_logins ALTER COLUMN login_id DROP DEFAULT;
       public          postgres    false    251    250                       2604    50553    subcategories subcategory_id    DEFAULT     �   ALTER TABLE ONLY public.subcategories ALTER COLUMN subcategory_id SET DEFAULT nextval('public.subcategories_subcategory_id_seq'::regclass);
 K   ALTER TABLE public.subcategories ALTER COLUMN subcategory_id DROP DEFAULT;
       public          postgres    false    253    252            
           2604    50554    superadmin id    DEFAULT     n   ALTER TABLE ONLY public.superadmin ALTER COLUMN id SET DEFAULT nextval('public.superadmin_id_seq'::regclass);
 <   ALTER TABLE public.superadmin ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    255    254                       2604    50555    transactions id    DEFAULT     r   ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);
 >   ALTER TABLE public.transactions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    278    279    279                       2604    50556    variantproducts variant_id    DEFAULT     �   ALTER TABLE ONLY public.variantproducts ALTER COLUMN variant_id SET DEFAULT nextval('public.variantproducts_variant_id_seq'::regclass);
 I   ALTER TABLE public.variantproducts ALTER COLUMN variant_id DROP DEFAULT;
       public          postgres    false    257    256            %           2604    50557    vendorbulkupload bulk_id    DEFAULT     �   ALTER TABLE ONLY public.vendorbulkupload ALTER COLUMN bulk_id SET DEFAULT nextval('public.vendorbulkupload_bulk_id_seq'::regclass);
 G   ALTER TABLE public.vendorbulkupload ALTER COLUMN bulk_id DROP DEFAULT;
       public          postgres    false    286    285    286                       2604    50558    vendorclaim claim_id    DEFAULT     |   ALTER TABLE ONLY public.vendorclaim ALTER COLUMN claim_id SET DEFAULT nextval('public.vendorclaim_claim_id_seq'::regclass);
 C   ALTER TABLE public.vendorclaim ALTER COLUMN claim_id DROP DEFAULT;
       public          postgres    false    271    270    271            $           2604    50559    vendorpolicies vendorpolicy_id    DEFAULT     �   ALTER TABLE ONLY public.vendorpolicies ALTER COLUMN vendorpolicy_id SET DEFAULT nextval('public.vendorpolicies_vendorpolicy_id_seq'::regclass);
 M   ALTER TABLE public.vendorpolicies ALTER COLUMN vendorpolicy_id DROP DEFAULT;
       public          postgres    false    283    284    284                       2604    50560    vendorproductorder order_id    DEFAULT     �   ALTER TABLE ONLY public.vendorproductorder ALTER COLUMN order_id SET DEFAULT nextval('public.vendorproductorder_order_id_seq'::regclass);
 J   ALTER TABLE public.vendorproductorder ALTER COLUMN order_id DROP DEFAULT;
       public          postgres    false    259    258                       2604    50561 
   vendors id    DEFAULT     h   ALTER TABLE ONLY public.vendors ALTER COLUMN id SET DEFAULT nextval('public.vendors_id_seq'::regclass);
 9   ALTER TABLE public.vendors ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    261    260                       2604    50562    vendors_notifications id    DEFAULT     �   ALTER TABLE ONLY public.vendors_notifications ALTER COLUMN id SET DEFAULT nextval('public.vendors_notifications_id_seq'::regclass);
 G   ALTER TABLE public.vendors_notifications ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    263    262                       2604    50563    withdrawals withdrawal_id    DEFAULT     �   ALTER TABLE ONLY public.withdrawals ALTER COLUMN withdrawal_id SET DEFAULT nextval('public.withdrawals_withdrawal_id_seq'::regclass);
 H   ALTER TABLE public.withdrawals ALTER COLUMN withdrawal_id DROP DEFAULT;
       public          postgres    false    265    264            p          0    42678    apploadingscreen 
   TABLE DATA           >   COPY public.apploadingscreen (id, apploading_url) FROM stdin;
    public          postgres    false    288   7�      (          0    16731 
   attributes 
   TABLE DATA           k   COPY public.attributes (attribute_id, attribute_name, attribute_values, category, subcategory) FROM stdin;
    public          postgres    false    216   ��      *          0    16737    audioheadphones 
   TABLE DATA           r  COPY public.audioheadphones (product_ah_id, ad_title, currency_symbol, city, state, country, brand, category, vendorid, is_featured, is_sold, is_negotiable, created_at, rejection_reason, status, updated_at_product, uniquepid, category_type, subcategory, condition, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, driversize, impedance, frequencyrange, additionaldescription, searchkeywords, keyfeatures, videourl, salespackage, isvariant, quantity, postalcode, inthebox, images) FROM stdin;
    public          postgres    false    218   !�      ,          0    16748    cameraphotography 
   TABLE DATA           �  COPY public.cameraphotography (product_cp_id, ad_title, currency_symbol, city, state, country, brand, category, vendorid, is_featured, is_sold, is_negotiable, created_at, subcategory, rejection_reason, status, updated_at_product, uniquepid, category_type, condition, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, modelname, storagetype, storagecapacity, displaysize, screenresolution, connectivityports, batterylife, dimensions, weight, warrantyinformation, additionaldescription, searchkeywords, keyfeatures, videourl, salespackage, isvariant, quantity, postalcode, inthebox, images) FROM stdin;
    public          postgres    false    220   	�      .          0    16759    cart 
   TABLE DATA           �   COPY public.cart (cart_id, customer_id, vendor_id, product_uniqueid, category, subcategory, quantity, addeddate, updateddate, variantlabel, mrp, sellingprice) FROM stdin;
    public          postgres    false    222   <�      0          0    16767 
   categories 
   TABLE DATA           �   COPY public.categories (category_id, category_name, category_description, category_image_url, category_status, created_at, updated_at, category_type, attribute_cat_id) FROM stdin;
    public          postgres    false    224   X�      2          0    16776    clothing 
   TABLE DATA           q  COPY public.clothing (product_fac_id, ad_title, additionaldescription, countryoforigin, manufacturername, packerdetails, searchkeywords, keyfeatures, videourl, salespackage, city, state, mrp, sellingprice, quantity, inthebox, isvariant, status, category_type, currency_symbol, uniquepid, vendorid, postalcode, country, category, subcategory, skuid, images) FROM stdin;
    public          postgres    false    226   ��      c          0    17600    conversations 
   TABLE DATA           h   COPY public.conversations (conversation_id, customer_id, vendor_id, conversation_user_type) FROM stdin;
    public          postgres    false    275   D�      3          0    16782    coupons 
   TABLE DATA           �   COPY public.coupons (coupon_id, coupon_code, discount_type, discount_amount, expiration_date, vendorid, associated_products, created_date) FROM stdin;
    public          postgres    false    227   ��      5          0    16788    currency_values 
   TABLE DATA           K   COPY public.currency_values (id, usd, kes, eur, etb, sos, inr) FROM stdin;
    public          postgres    false    229   ��      ]          0    17057    customer_address 
   TABLE DATA             COPY public.customer_address (address_id, customer_id, given_name_address, family_name_address, email_address, phone_address, country_address, zip_address, city_address, subregion_address, region_address, note_address, default_address, apt_address, phone_code) FROM stdin;
    public          postgres    false    269   ��      7          0    16794    customer_delivery_address 
   TABLE DATA           �   COPY public.customer_delivery_address (id, customer_id, first_name, last_name, selected_country, street_address, apartment, selected_city, selected_state, zip_code, email, phone_number, orderid, unique_order_id) FROM stdin;
    public          postgres    false    231   ��      9          0    16800    customer_follows 
   TABLE DATA           ]   COPY public.customer_follows (follow_id, follower_id, following_id, follow_date) FROM stdin;
    public          postgres    false    233   ��      r          0    42692    customer_transactions 
   TABLE DATA           �   COPY public.customer_transactions (transaction_id, customer_id, datetime, description, amount, closing_balance, wallet_txn_id, send_to_user, invoiceid, status, transaction_wallet_id) FROM stdin;
    public          postgres    false    290   ��      ;          0    16805    customer_wishlist 
   TABLE DATA           �   COPY public.customer_wishlist (wishlist_id, customer_id, uniqueid, label, category, subcategory, vendor_id, mrp, sellingprice, created_on) FROM stdin;
    public          postgres    false    235   V�      t          0    50434    customerclaim 
   TABLE DATA           !  COPY public.customerclaim (customer_claim_id, customer_id, customer_claim_description, customer_claim_status, customer_claim_date, customer_reply_description, customer_reply_date, customer_closure_description, customer_closure_date, customer_image_files, customer_video_files) FROM stdin;
    public          postgres    false    292   ��      =          0    16811 	   customers 
   TABLE DATA           v  COPY public.customers (customer_id, given_name, family_name, email, password, phone_number, address_line_1, address_line_2, city, state, zip_code, country, bio, verified_with, created_at, updated_at, status, picture, google_id, facebook_id, verification_code, verification_expire_date, customer_loggedid, customer_interest, mogadishudistrict_customer, nile_pin) FROM stdin;
    public          postgres    false    237   ��      [          0    17047 
   homebanner 
   TABLE DATA           A   COPY public.homebanner (id, banner_url, title, link) FROM stdin;
    public          postgres    false    267   b�      @          0    16821    laptopcomputers 
   TABLE DATA           #  COPY public.laptopcomputers (product_lc_id, ad_title, currency_symbol, city, state, country, brand, category, vendorid, is_featured, is_sold, is_negotiable, created_at, subcategory, rejection_reason, status, updated_at_product, uniquepid, category_type, condition, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, additionaldescription, searchkeywords, salespackage, keyfeatures, videourl, modelname, processor, ram, storagetype, storagecapacity, displaysize, screenresolution, graphicscard, operatingsystem, connectivityports, batterylife, keyboardtype, touchpad, dimensions, weight, warrantyinformation, isvariant, quantity, postalcode, inthebox, images) FROM stdin;
    public          postgres    false    240   �      j          0    34030    media_library 
   TABLE DATA           j   COPY public.media_library (media_id, title, description, file_path, creation_date, vendor_id) FROM stdin;
    public          postgres    false    282   �      e          0    17619    messages 
   TABLE DATA           y   COPY public.messages (message_id, conversation_id, sender_id, recipient_id, content, user_type, "timestamp") FROM stdin;
    public          postgres    false    277   ��      B          0    16832    mobileelectronics 
   TABLE DATA             COPY public.mobileelectronics (product_me_id, ad_title, created_at, updated_at, city, state, country, currency_symbol, category, subcategory, condition, brand, is_featured, vendorid, rejection_reason, status, uniquepid, category_type, modelname, storagetype, storagecapacity, displaysize, connectivityports, batterylife, dimensions, weight, warrantyinformation, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, additionaldescription, searchkeywords, keyfeatures, videourl, salespackage, isvariant, quantity, processor, ram, graphicscard, operatingsystem, keyboardtype, postalcode, simcard, unlockstatus, cameraresolution, inthebox, images) FROM stdin;
    public          postgres    false    242   ��      a          0    17588    mobilehomebanner 
   TABLE DATA           M   COPY public.mobilehomebanner (id, mobilebanner_url, title, link) FROM stdin;
    public          postgres    false    273   �      C          0    16841    payments 
   TABLE DATA           �   COPY public.payments (payment_id, customer_id, order_id, payment_date, payment_method, payment_amount, payment_status, billing_address, billing_city, billing_state, billing_zip, currency_code, payment_source, vendor_id) FROM stdin;
    public          postgres    false    243   ��      F          0    16848    products 
   TABLE DATA           l  COPY public.products (id, ad_title, city, state, country, currency_symbol, category, subcategory, vendorid, uniquepid, skuid, mrp, sellingprice, countryoforigin, manufacturername, packerdetails, additionaldescription, searchkeywords, keyfeatures, videourl, category_type, quantity, postalcode, salespackage, brand, condition, isvariant, status, updated_at_product, rejection_reason, slug_subcat, slug_cat, images, attributes_specification, prod_slug, width, length, height, weight, product_ship_from, estimate_delivery_by, nested_subcat, nested_subcat_slug, additonal_condition, mogadishudistrict_ship_from) FROM stdin;
    public          postgres    false    246   ��      H          0    16855    ratings_and_reviews 
   TABLE DATA           �   COPY public.ratings_and_reviews (id, vendor_id, customer_id, rating, review_text, medias, created_at, product_uniqueid, label, rate_order_id) FROM stdin;
    public          postgres    false    248   �#      J          0    16861    social_logins 
   TABLE DATA           Z   COPY public.social_logins (login_id, customer_id, provider, provider_user_id) FROM stdin;
    public          postgres    false    250   K$      L          0    16865    subcategories 
   TABLE DATA           �   COPY public.subcategories (subcategory_id, subcategory_name, subcategory_description, subcategory_image_url, parent_category_id, created_at, updated_at, isfeatured, subcat_status, nested_subcategories) FROM stdin;
    public          postgres    false    252   h$      N          0    16873 
   superadmin 
   TABLE DATA           j   COPY public.superadmin (id, email, password, "userId", role_id, "position", name, secret_key) FROM stdin;
    public          postgres    false    254   �6      g          0    17676    transactions 
   TABLE DATA           �   COPY public.transactions (id, transaction_id, customer_id, transaction_external_id, amount, currency_code, transaction_date, is_verified, verification_date, payment_method, notes) FROM stdin;
    public          postgres    false    279   �8      P          0    16879    variantproducts 
   TABLE DATA           �   COPY public.variantproducts (variant_id, product_uniqueid, variant_mrp, variant_sellingprice, variant_skuid, variant_quantity, variantsvalues, label, vendori_id, variant_category, variant_subcategory) FROM stdin;
    public          postgres    false    256   �8      n          0    42480    vendorbulkupload 
   TABLE DATA           \   COPY public.vendorbulkupload (bulk_id, vendor_id, productids, datetime, status) FROM stdin;
    public          postgres    false    286   �9      _          0    17517    vendorclaim 
   TABLE DATA           �   COPY public.vendorclaim (claim_id, vendor_id, claim_description, claim_status, claim_date, reply_description, reply_date, closure_description, closure_date, image_files, video_files) FROM stdin;
    public          postgres    false    271   H      l          0    42469    vendorpolicies 
   TABLE DATA           z   COPY public.vendorpolicies (vendorpolicy_id, shipping_information, return_policy, business_policy, vendor_id) FROM stdin;
    public          postgres    false    284   bI      R          0    16885    vendorproductorder 
   TABLE DATA           ,  COPY public.vendorproductorder (order_id, vendor_id, product_uniqueid, customer_id, total_amount, order_status, rejection_reason, product_name, customer_name, product_image, customer_email, customer_phone_number, currency_symbol, payment_method, payment_status, city, state, country, brand, category, subcategory, product_type, transaction_id, commission_fee, withdrawal_amount, refund_amount, fees_paid, tax_collected, orderid, quantity, label, tentative_delivery_date, skuid_order, ispickup, seller_otp, customer_otp, order_date, created_at) FROM stdin;
    public          postgres    false    258   �I      T          0    16893    vendors 
   TABLE DATA           �  COPY public.vendors (id, country_code, mobile_number, email, password, brand_name, business_model, products, trademark_certificate, company_name, company_city, company_state, company_country, company_zip_code, shipping_address, bank_name, bank_account_number, bank_routing_number, bank_account_name, bank_branch, bank_swift_code, registration_date, mobile_verification_status, email_verification_status, status, business_type, registration_number, tax_id_number, business_address, business_phone, business_email, business_website, business_description, facebook_url, instagram_url, twitter_url, linkedin_url, business_logo_url, business_license_url, return_policy, shipping_policy, terms_and_conditions, payment_info, shipping_info, support_contact, categories, average_rating, total_products, total_sales, support_contact_1, support_contact_2, vendor_profile_picture_url, brand_logo, useridvendor, vendorname, email_otp, mobile_otp, reset_otp, followers, following, vendor_username, company_district) FROM stdin;
    public          postgres    false    260   �L      V          0    16900    vendors_notifications 
   TABLE DATA           Z   COPY public.vendors_notifications (id, vendor_id, type, title, message, date) FROM stdin;
    public          postgres    false    262   �Q      X          0    16906    withdrawals 
   TABLE DATA           �   COPY public.withdrawals (withdrawal_id, vendor_id, currency_code, amount, withdrawal_date, status, bank_account_number, bank_name, bank_branch, created_at, updated_at) FROM stdin;
    public          postgres    false    264   �U      �           0    0    apploadingscreen_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.apploadingscreen_id_seq', 1, false);
          public          postgres    false    287            �           0    0    attributes_attribute_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.attributes_attribute_id_seq', 21, true);
          public          postgres    false    217            �           0    0 "   audio_headphones_product_ah_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.audio_headphones_product_ah_id_seq', 45, true);
          public          postgres    false    219            �           0    0 $   camera_photography_product_cp_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.camera_photography_product_cp_id_seq', 41, true);
          public          postgres    false    221            �           0    0    cart_cart_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.cart_cart_id_seq', 783, true);
          public          postgres    false    223            �           0    0    categories_category_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.categories_category_id_seq', 139, true);
          public          postgres    false    225            �           0    0 !   conversations_conversation_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.conversations_conversation_id_seq', 8, true);
          public          postgres    false    274            �           0    0    coupons_coupon_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.coupons_coupon_id_seq', 9, true);
          public          postgres    false    228            �           0    0    currency_values_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.currency_values_id_seq', 1, true);
          public          postgres    false    230            �           0    0    customer_address_address_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.customer_address_address_id_seq', 38, true);
          public          postgres    false    268            �           0    0     customer_delivery_address_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.customer_delivery_address_id_seq', 193, true);
          public          postgres    false    232            �           0    0    customer_follows_follow_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.customer_follows_follow_id_seq', 19, true);
          public          postgres    false    234            �           0    0 (   customer_transactions_transaction_id_seq    SEQUENCE SET     V   SELECT pg_catalog.setval('public.customer_transactions_transaction_id_seq', 5, true);
          public          postgres    false    289            �           0    0 !   customer_wishlist_wishlist_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.customer_wishlist_wishlist_id_seq', 126, true);
          public          postgres    false    236            �           0    0 #   customerclaim_customer_claim_id_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.customerclaim_customer_claim_id_seq', 36, true);
          public          postgres    false    291            �           0    0    customers_customer_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.customers_customer_id_seq', 184, true);
          public          postgres    false    238            �           0    0 "   fashionclothing_product_fac_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.fashionclothing_product_fac_id_seq', 8, true);
          public          postgres    false    239            �           0    0    homebanner_new_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.homebanner_new_id_seq', 10, true);
          public          postgres    false    266            �           0    0 !   laptopcomputers_product_lc_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.laptopcomputers_product_lc_id_seq', 121, true);
          public          postgres    false    241            �           0    0    media_library_media_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.media_library_media_id_seq', 3749, true);
          public          postgres    false    281            �           0    0    messages_message_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.messages_message_id_seq', 180, true);
          public          postgres    false    276            �           0    0    mobilehomebanner_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.mobilehomebanner_id_seq', 10, true);
          public          postgres    false    272            �           0    0    payments_payment_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.payments_payment_id_seq', 92, true);
          public          postgres    false    244            �           0    0 ,   product_mobile_electronics_product_me_id_seq    SEQUENCE SET     \   SELECT pg_catalog.setval('public.product_mobile_electronics_product_me_id_seq', 365, true);
          public          postgres    false    245            �           0    0    products_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.products_id_seq', 101669, true);
          public          postgres    false    247            �           0    0    ratings_and_reviews_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.ratings_and_reviews_id_seq', 151, true);
          public          postgres    false    249            �           0    0    social_logins_login_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.social_logins_login_id_seq', 1, false);
          public          postgres    false    251            �           0    0     subcategories_subcategory_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.subcategories_subcategory_id_seq', 224, true);
          public          postgres    false    253            �           0    0    superadmin_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.superadmin_id_seq', 23, true);
          public          postgres    false    255            �           0    0    transactions_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.transactions_id_seq', 15, true);
          public          postgres    false    278            �           0    0    transactions_id_seqs    SEQUENCE SET     C   SELECT pg_catalog.setval('public.transactions_id_seqs', 15, true);
          public          postgres    false    280            �           0    0    variantproducts_variant_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.variantproducts_variant_id_seq', 242, true);
          public          postgres    false    257            �           0    0    vendorbulkupload_bulk_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.vendorbulkupload_bulk_id_seq', 508, true);
          public          postgres    false    285            �           0    0    vendorclaim_claim_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.vendorclaim_claim_id_seq', 17, true);
          public          postgres    false    270            �           0    0 "   vendorpolicies_vendorpolicy_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.vendorpolicies_vendorpolicy_id_seq', 1, true);
          public          postgres    false    283            �           0    0    vendorproductorder_order_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.vendorproductorder_order_id_seq', 234, true);
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
       public          postgres    false    275    260    4967            �           2606    17011 2   customer_follows customer_follows_follower_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer_follows
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
       public          postgres    false    277    4983    275            �           2606    17026 ,   social_logins social_logins_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.social_logins
    ADD CONSTRAINT social_logins_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 V   ALTER TABLE ONLY public.social_logins DROP CONSTRAINT social_logins_customer_id_fkey;
       public          postgres    false    4937    237    250            �           2606    17031 3   subcategories subcategories_parent_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.subcategories
    ADD CONSTRAINT subcategories_parent_category_id_fkey FOREIGN KEY (parent_category_id) REFERENCES public.categories(category_id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.subcategories DROP CONSTRAINT subcategories_parent_category_id_fkey;
       public          postgres    false    252    224    4920            �           2606    17527 &   vendorclaim vendorclaim_vendor_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.vendorclaim
    ADD CONSTRAINT vendorclaim_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);
 P   ALTER TABLE ONLY public.vendorclaim DROP CONSTRAINT vendorclaim_vendor_id_fkey;
       public          postgres    false    4967    271    260            p   >   x�3�t,(��OL��K/N.JM��5470167��0567����IU(.�I,��K�L����� �p)      (   �   x���
�0E痯���ur�V\"H���%�諐�wC�s9\N~��W���A~D�8Pc�L���hpG����M�t���k�q��'�݇�Ә�Y�i��]�j/��
#��M
]w��'�IU>K
U٨�^)��5,      *   �  x��UMo�@=/�bO=�����R���Ur�S]j��q�FQ�{gY'nWJ*U�.�<�7o��nV69�6}G.�ə-����fmɧ6+-�v�y���ͺk�yO�!?��3.B`! �"e"�Akɝ'6�2I��R�4F '\��˺ˮ曞���ʎ��s�-���{J��yF ]��"�p3��yo��3�%�����.�ki~��'v�	���>�	�!�?�rO8_8е�ȴ�\"{�d�i��@
���'��P��)�X*x�t$�Q�3��f�+�<sx�6o�+Xv|��	س�?>�zQ/*RW�=�ٺ���Q��]��ݠ�ᛕv7ނN�J����^ۍ]C�l��H<"��o��8D8���!GD;�.fHW�R��T����1���	�X�:�'ru�o�'��Nht'�@�z\��G!�A�C��ն(�bU^䑸���*Ǔ��:�w%x�����k>/�t{:�c E�5��`"-���D�s����#��]����ϳ�=(}#̨|����U��K״��H^�Sq�BIlֻV�Lq�*�9J$�[�] %i���M�6+����1�S�BDB0	��H��Ib���!��+R0\7�f4~?�f�eyN4��?]=���sa[:-lfg/e@J��E��X�{m(4��L��9`V8�]G�'h����jo/j49�p�O�0(#Q�$���C�-�L��ly\DA�fc      ,   #  x��QMO�0=���'n�b7���!!�4q��k
ݒ�SS�⿓��I�ʓ��؎�"��l�qy���Gv�42�Z��@^�����nZT��a��,AL���j�l(OKIuU�%ﺑ�x���<�}D0�SE,�A���;PD���������Gb�@9�����Jv�`��̨p�����W�B�\I6ڧ��!N���Y���s��$ŉ8�J�:HA<'���m�q����o�[�����j{t�[���
�P��E]c�K��2On���à��n���ViE����^      .     x����j�0��}�I�*;�@��v�ة�,5[ 4ge{�9��Av����?�� o����q��o�m<��ֵ1�K7NM_�ԥin����,;]�a"E٪�O "���P�Pgᡏ�4׮Mu�\�g]����R�8O�M��fj�L�:���8�:��-�_?�>�C����ۺɈ��{�W��`BX"ۼ�B(Bpz{o.�+�MJwFAKg�U	��l��ȒY��r���eꎤ�0�,��,[ռN\~-��l���!X�      0     x��Z�r�8}F��O�ݪ%��ޜ8ٝ�$35Nվ�JE���Yt�������6HIF�DǗ$:@������,����d�t�S.r�r&2��.�.���']ջ���nɷ/o�"?7�m�6;~���ewS7���ʛ�͙vN;k�����r�<4�w�]�X_�����q]�U܃��4jJ�H�l
B�4�w]n�۬�V��u�����L˭*�.��r����݂�B0m9OAH�!���L��k��C���c�\)7�l!y�|l�*��7��z�|^�Z�3}������cLS�RP(T�A���]�^QT"�T*9H\.��g�S�
#�,��k��Uג�2�O����i�lo��D^�@w���q���9�:�Ҡ�9��e���[Upc��)k��ՒO�M�9?�68�y��U���/�.��6A
��q�aS��]�]�����������v�f��6wu��O]V^7]V��j�����߶1?3	a.��������
��32M�+ Ly�o�����Ɲk�U.��a���3W�\HQ0���l�:j���@ط/�m	�[0����}�)KA�aЖ|m����]bA1�X�m?�WlL&
n���Bx�|4䫋Ƞ���r'����%'���������%��a��Z/���́��atT1:��
.�x蚻�� ��16i9[ӅӔ�6�B�$yW^?�D����C0ũ�}SX��lI��Z��)IR����!��Tgu�4��7��m�B�o���C��Z%/(5�N2�BZ5��u �}��ql}�I���U=@c�c�@�
�%��B�+A�e�>P㌱�o��7�)��wA�Snr2��e��dΩl�d���xͱ|T�,l0�R�@u�WR�Mz�Pm���K���-��"RP(MQ�2�����m�{����d1}�Q�T�������6�ӂN3�B!=���ƻ�|R��4����/]�.�S�NN�B�6'�C��}h���GdC�r&�M�C�ْ`]Y���j�B����2���;Ƞ|���
V嚉�^!$L�$����\��┣����r�1[��Pqp>��!�:��^������mS�?dzr�c��>�+&a
�e&N�P���]]>t�*:(�S��c_0�~a���?b�+��P� ��I.�.������pd�a�� ��iF����zs��龆��;:n���`���\��Qp���a7]���C=@y���.Y^ <~M2<|�_��>��}8Q�h.R��pru[V�u�t�(�v8��'���\(S#�3)h�qH��muWV>�z�+�w�uf���>5�;���J&!�,A���9��k���e	la�n�X1��P9� !X�����z��\�e֜�lH(���"�O��>U"X! V�IRBH$Ĕ�f����ׇ�j�]�:�ji͇>7�w�)O-�)���O|B��S��Ō��8��Gߥ+��8�_�@^$��V$\x�q�-�T�T�ɾC�x�ryA.�NF��=��bX�dlQ�`|u����2�	���مOʶ*۲}zZ� (�O�	��P�[q~C���' �gCڲ�<E$���p���ǲ4�#�?׷D�_n�m�z_)'�4l�v����l�
l�����¨2�9��0�95ج�F��Z5Zs�R2���'�q��_d?c�|�g�S*�����e�|ʸRz<!
{��,��ՏU�IC�WǭL �ǥx�C��9��)�zJ�\�Y�g�PE��; ���'+S�P���Rn�x5#��y�QV%��1M]
¬�8�[~ؤ���W�G<�����x?�8I�cW�5� L��CڨW������#{���	V��B*g���:��Q3�X5
�3��SBΓ�B�Z�f�{bU�
��\@&ŵMAȪگ��qI�¢Z���AȸFƽ3R����P�������3CP�$��Z��,!{�$9���(��	��O� �p4�c�M�A!��Q������J���X�)M�h���:!*��JqI�KK�	W!.��J�)=��U "�$J1�
+$�p�bSi����į'�=��$4���r��E��8�#��!a��$��|r�#QFcG@��>XXƬ�)q��H��"��E!�l��"($����&��כ���qց D�
0!mj�v��wZ鉏C�&�Mț"vP�R�N�p!�t�	��L���)��x�B�gbQȜ���4�J=Φ�����:��(�w�p!��Q*�>�o�{J��	}� �9!���/�p���5���Y	H+���B�P�!���?v����B�,ĪT ����vR[!�d�f"'�b��`¸r<x!�|o�J	���Bj��N@�,^,�es�2������J����˟������6)�u����n�	�u
Bv=ڍԖƧp�7�֎�c���d\,_[hm�(KA�2,�LK	N���� lZ���e�p�R��R�-��q�}��U�!��+l<e60�/���kru��m�!�����ڎ���-��ku������ی:}�#!�-;⟎]����y>��@r^hf��(!d��J��pT�i�*�����6a����n5��������A8_�RM�t����!Gy���72Z(�ǞB&�d�O��Vr�Y�i��WO��i��q���&�_�-`�K6�a�}V=>e���ʒYA�A��hn�x�!3���7�&���	,�/�&�w�#7/>)��n��e�amlD�w�F��:C&�G�d ����UI�F�E#�oC�������;��SF'{/����oś7o��N,{      2   �   x�5���0���Sxb�P~WB0��K�ZIJh�� �R@��N��[b��h��7���TAt����6��Qv�O�)���=�3�64,)񫋚���3�Fmn�q�VG-��E����gwo=#��{\p9o���&PL�,��~��=�BC#Z�%���X�����1�u���[r'I��DE�      c   -   x�34�4�0�43�L.-.��M-�2� !	Yp����qqq �JV      3   -  x��S]o�@|ƿb䨒#�1&v���� q���p�Q)D'����������j�n�t3�s��BKԣ�k�4S?�uZMkjS��,[�:�S\����񷟇��h�9j;m��7��f.�ݫ���`�W������)o?��0�X9��q�Zd�nה=�z@����*�{�Wp�f��]�@n�~ Kӈ�N7]K�sL�f�^����_s1:�XӘ�ܔU����T7����M���
7���o+�!����6���g8�᩻^)���A5�/1���eUy?�~�yd��'�{Ζu�$�	\�
i�H6���,cf��6Z��9%�#�ܘ��"�ByT��a��������X�`��R�I7�bY(
�Xx<�H�5]�9"��PE���ࡒ��t%�Ky�V<�1�4�V~��y���4b.�y��� _�ߏ�������D�:K,�������ջD�9&����11s�"s�:���l9��KI��wO]�yS��)�����+����Ȁ��f{��� �~JcAY�ʃ�!~�y��?�F�v?0      5   ,   x���  �7ÕSl����01�QJw!��.���'�yv      ]   �  x��QMo�0=3�����_�%�A�F�K/l�E�c����/�$���`�&,�=����B4�iG��ﻞ�����0��e�!���"�4�����kh��.ƚ4�w����dc��g��N�W7��_V�6�vd�y7�8[���0l�3�74�>h����\�{py0{e�.����Dl�0؜Z�MH�Ԏclɿ� V���և�}����랓��,/���hP�b��:_�<�rbN]�K@�z��g2����S�/�@� �8�L5���1����.M���kQ��"��
�	�gZ�<�̠!W{�+w��+^�,�uu%�E�^�&���ߴ	��0�x�O��}��X|4�1��G��E��t3��>����      7     x����j�0 �����Ȗt[��Bw��k��4?�I)}�)�6�h�6��Y<`0�\��:�����M�@�wJ���+����!���͉wmL�r۷���`�,�ZS�!��Y�xF�e�������3,�Z���g����lh��x����KcU�b�c5Hu��U{��XWq<V�u���Sj�����z�O�S��Ru^��J1�SbS�`-�쏝PD)S�&%N=���d���a�O�?3<0*F�3�pl�G�e��/�,�ږ��      9      x������ � �      r   |  x���MS�0��ʯ��G�Z}�o�z��0�3��E`.�`�����wIp"̌3�Xz��V��� �̑5��A	����[}W7�k}߮���1U�V}L+�{�����> �Ug�Mj}&��SF=��R73� �#�֖��.��e����u���bQo�U#û靥H�0��h���Xߦ�>O�S��?/�]-I��c<XERW���+�]�z�bĹU_�M����~|���c0E��ڤ�M��K==�w(�39?`�)�& *�#���"ē�l�mZ.�Ճ��lwj�n���=��[�֏za�u`r���Cƪ��bw���[�(�LST��F��AZ�J�*mt����рޞ�zzG��b�� �?�?˲����sr����{�6����럭�h1���BnF��XD�n����
9o����8�ܸ��矠�jX"NX�vI�DY� gG�0�7���𱛔����P�4���]G�pMp��܆�d��n�&�$	Q�l�-)�	�cǢ��d�iƣ��	vN��xJ�q����SYb]����c|vۦV��Z=��ʒ=��s���9`��@�8SB�sv����K1c��`�ʡ0���xW >v�)f��_�o      ;   Q   x�342�4�0�45751���t�IM.)���L.vqq�pq�43�42!C}#K}##3+S#+C� _�=... ���      t   '  x��TMo�@=ۿb�s�ڏ���$B"Tq���uLo�8E����QI�� �%K�~og��S:�Oe?Cx�n}W�]�I.q��R8X(*�b�I�2�[�=���l�RN��;g�a���Y�Ȟ�ڇS�"�l1�8j~�ϰj+��P�>�=t���x��oX�'����_���sׄ��Y��G*&��Z���@ۄp��)�-�0�N����?4VqT����& b�n"5����(; ����C�������k�6��߷U���t5|��	;h�Ѕ��)��g��CYU�]�{�˾d��8֯d��)��@f�H�)m���>$�N;Bv�{	�'�z�EI
��r�l�u�'˒�CI;��ω�*)��>4�HU�e��D�H��ԉ�^#�Brf��u�ߥ�IVs>�K	B���u�X.��~�#8#�q�r�(�G9��K.V�P]�S�Ռ\<�:%�I���M!,s�ss!�0��$xf�#�n#�f3�#��%��Hq7D�L�J,�3$��B�Q��U�I���E/f��\��BiW�����-�ԠF�5�X�� �      =   d  x��Yio�ؖ���+r�z-u�Ŝy@j��!��~2`�`c�0���1S!tꊛ`���:{�����憫����i����o�3ǰl}�r�뿿���6��@8A��%�%��g&�����=���x�M`���n}W܈'�3���|$�S�^�b{0����͊k�&�vq���F�ۅb���@��X�)  1F%�1������C `���صe0],������	u�����	h�M�ӏ���Բ�TG�����^b/�c�L}��
� �8F��cRhF01mr����� �74����)�N�&Y�Qi׫�RV�ˍ��x�e��Lo��6`�/�VUG��HFfљ^NC}�	,�!�Q��B:b����#"nq^o�3��ω�lC��N�5���l��H�[�#}��u�@�i��v]��t��N��)�!����K!!a�����:Œ��tG�D��.�7������7�rg��
�/g6C	�Q��iI`�%�L�9��H3�X�#�P#$�d�p�.�)��d�U(f4��p	�)r�d�sĬW�\��B�Wʲ�|���tX+l����`�Y�n-�E�j����/�9R�\|1%:��O�3�5bqz1tv���A�3����RN_uڻ��iyo��7���E����.浉��¡n+O�fLn�u=��W��7���B	@uu,�3�#�� 0�đ+y�M-װ]��=ź8B(��'L��=o�@)��C���z�����q.�羝�ʚ�Xn�=�⚹���̆�R/��*\ǃ�9����A&Y��=#
j�ܾ�� �M-c����MM�VhN^Z���{��<�&K@�3�)'�L����]���i���}��r"�����8��� ��/�^��_�iUu�Z��f�����\���~�?&�#A�^��=�������<3�Pc_s��b4���R�fmH�g�J#�G�$�n�oC�^���(��BN8#� D���c���� uJ��������RF{__�{w�9@`��ʛJ���r]##��V�y�@��*(�J�U��j���G�plC�*Dt�$��g��"HU|oű@)G�&7� n�=����$�ޞ/��⠃�J{���d;%�2��͇�im������NJ�.4�h �H�>��L�а���Ύw��ڥ"%m��nڣ3<'%�gSkg,�:�۵.1�r왡�E�����E⑜�}N,��`}�, �<�UgH�[�tw%���.�*������۾|�+�GMEõ��ue�L���ͮ.�-=S]�'���N^1�bX�Mz����d�5�?��#ʔ�|��F��:����XD��R�Ύ�-��*2	�#���AԶ�vU't�4�6Y��[�F[��y��>�9���R5���>6���NU`�B��+UY@�~$����R���K�jҧ*�ф�}�j�������<?)^i����mz��M����v��U�;�֦c�]&�Tv�� ��M���	Hu0��=����������3�����\���k�t�6�lsz�Qy3��7��iU[I��­�oJ߇��. �?3]���|�vt�E�oGE���v��X̶���M�Z�Er�_j���+ma�r���Q��������j Tu�
�C�<=��$��?3�+%P��sώwS
y4�= ��i�B�Q�ꃵB�ݍ���f�f�̓.�O�Jm������$����9�a��C�T��g�hy��������-6�p����t+�ڽ��NݠVX'�Z=�׷�L��[��:جâ~H�������
V�uB�d��1]EP����#{��H2CV�0����<�K��g���˳`�J͇�N!��iq-��d2*z����)Z��H�a�Zcz�=�9�gGz��?������ ��~R������Tr�3���a�M�vðPw����
���oo����	
U�~��?��IJ?�	.�we�(���w���/~�ް0p��>����2S�ٝ7���g溷���V�֩��Ѹ���L.%�p����h
�1'�/nLW�r��ɊώJ�*�o��h���_��lό��*�I70|KKN��A3�F�ޘ;��������=�TNM�g�eQ�[�CL�ܬ�ᆷLMZ�������ujǖTM�B  ��	R����NCU��3�"cr爏�H�mLTM�|��*wfiF�މ�B��M��lUo,u*���	��a��;��>i�H�_�7W������Z�SU��kgs�a
0!��%f1x;L}XA�d,��z�-�O��sL����,u�v́�t���5D%SS��P��k;R�R�?[_���y����l��9�*j\�g�kL9=�<$`��l1�k�ZV�㝑aM����3�Mt����/��o (���Y�D��?3�����l?ŕ��f�-�B�MW3���a���f��M�}�q���\�	�j�j0gD��تC����U���� ?%Cwd6SN�Fz��{���V&2՛u�����G���a$h5�k�o������)�H�.�@�,T>3]�3*ni�G��Ԛf�_�g:�?�y�{�������x-_�yLf�n�J�Iv�{�7<F˝ڰ�Z͍�_ֶC/��t´��Ze�����7���G��ʱ�����}݋!�q$	pv��͈�1\+8.y��\�
rt/� ���E�q��� 2�>3=��"U�� �VG�uhĖƛi��Ͳ��f���%�H�b7�"�i!�R	�0����Gs�cb�)#0*�O�<�R� ��?�5��H�	��g��ѥa5�PY�+�9��k�j�V�Fz�Nf!�$�fU��d�J���$ڮ�GJ)G!r��y�hq|~0�rC��]Y���$�~���i���_wd��#��D:.��m0^M,w����M�]L���xHU����Y�����I��^���쨫����y+�����ܿ��U8�M�e�hx�
����t�����ۘ�b��o��u�GqwKz�����4�Ma��?��5t�?��6Z2�_���[�%���K5�Jf��_!ďH��t{9��B�o��H4D�G�r"�����53{��y.j�֘76	�d��b���&�Sɻ%�.]� Jd��(����|�'�[������z      [   �   x�e�K
�0�u�s�$�ԥ�>V�V(Q�R�&��Bo_�E���`�)k� �n�@�˹k���8+�1�|�U�S!�P�Ȣ�8艮�2�Gsc'�"\�YY�����8��P���e�g��f���{�}��~���X�T��DÜ��� �4>�      @   �  x���Qo� ǟ/�"O}Z,���-�4i�&E���/4��-̸M�i�}����Z�k�d���ο��f��Ej�I��N§;edL~h�m��;��@�p�J([ .�����X�q��y��뭛����[w�ם�o!1�Dp\��Ϊ�m��!EH���׆B�c�O�����'lcn][E���"�3��W�Ł���
E�DLRv@@����' ��/��*���h�hk��E0��C��%��������H�~���E��@�D�)ʠ�)8y�p�ލt�O���I���#/��a�k3 Ґ�0go�ƒ~��/7�?�F���/�Z�m�TyQQ�� \L�Z.K��ՙ���v���.�<���f�+gg�l���$�Y��8z�֞�62��EYb!J*����r[_Z{���K���c��י�������{�l�paV�<#��N!.((�u�N�U��4��fF?��6QE�x�}�^d���7$Ə�      j   �  x���Oo7���O1����DJ�6M{i�A{
`l��`ѩ��]��/�i������O��6
�滇���e��η�w�l>�󸛗k`�B�u��^��O����v���2����?��w���r|�_^#L���FD�kH5�*
�KQ���&S�a]o��������v>|����͏�ug�?}?�⯾\��(J��|+�(B����LiB�
90��٣ؘ \ʬ5b(�:hvB���e���`�=�\X���h�*�y	Bt�B+rL�б���E�VP�t)��1� �0�N�\ �h��&�}�=�\ �`�>���͟��N�������/�+�OfN�L�;fq2��� �=H;E�(3j�9�%�X�+Ő�on�1��t�9W�
�t�Ec&sHt!�T� ��sq2���us���R���ƌf�zQos��'y�{u1ȐKd�����(6f;��2f�� �v6=�$���V�q������;Er!cNL,֙���ǒ�	F��+�3RM� �b%�h&��j��c)u}�K#��4XW�N���}�G#�b/���J�ПW_��h>��H�Q���k�|���F7��f~�e�[���tP��R���v%�Ȑ�=(���Qc��K�QM��
v��3z+"Qm�H��8e�͚�e�Aˉ�E���N��6Z`T1�a�+:-�m�~�o�(��v7J�i9�P�V4H}�8-�%S.��j�;VY�K;=�v�B�P��v��,t�NϱM��">pȱ���$�~��'}�g��Ĉh�s����?��<�Y�����w����4�_O/T�]�,l��.$��d�V͒�'$�9X�1H]�$����>!�*�5��]�V���$硌� L��ۇ����-p��)���|����̧m�      e   �  x�}��n�0�מ��]u�a��MQ�F��.���7��F�IE���d�!U!����9������*eE�$��b��9�eI�dw1�KJ�Ug5/��y��;���$�����:�� fƒ�}W[�u�&����бWԭ��/H�����+�����FQt�4���W�G)� �Oq#@R'� I�Hq�7�%6��|U�-�������&k�H�.H�� �M(���˒U���!���
/�	+�F�?�K�eM;6�>PL�&�S�Z+6�M���'x1��t�/��%�ҍ�ԾB�`O��R�� ��Cf�[��C��!ּ��t�FK�mтOz8C~���s$�R�~��?�K��}���sU-Ԑ�4+������5U�2�oz׎s�0�[�Ь��G�}�����F�~t�^b���¢��U'}�H@���h�7L��ڟ;TT��iY��h� �BG��̜�Ic}?E��_�8���v���+�      B   P  x���]o� ��O~�K,�8�k�,��tռl��bpB���մ�>���J��I6�s �ׯ�$�si��BI�t�.ꍮ$PL�!#!�&Q2�i@�	y��I�ߞp}	���Mc8\TBq�}=�Y)���J�z�J���V
8��RB��}0��1����b�7��w�(���C:?�8HG��7ρ���}�VȺ��p)���@�o��'WW�߇Pn]�r�!S[_"��"W�{��Y;�'1\�J�{n��f��2W���� L����m�hv+M�"B&4��I�2F�S�/�g����K��>ba��g�q:=��!E�3��[�-�-h����iwm�=�:!�i��;�7J��vϛ�q|���m3D�����YwE"� 9��h۝�����;�uK�P�����wЗ�*YB�N���U%��"�a!�+ÝY^�;�����1ldY�^�:���$�x̞��	�J�̦�#1#��Uw%;
=�H������"��������#���
s٠^��Z�b�+��߸Q�j�{��U�h%n�����*u���@��d<v7N��G�^��^�)��u��3���_ �c�      a   r   x�3�� .��4C0�L��44@bs��'e�:%������Z�X���:�[�ǧd�'�d�&����UXd�Ż�e�s:r:r�LK,�D�=... 1�+S      C   #  x��ҽN�0��y�< �|_>�G�Ƃ����H%E%x{ܠ�bK�t?�}vR�ࢦ�,�n� +�6�L!�yer�x�߷.��C�7�4�;�>~�����MJ'�ДxniF�j��Bm,8H� �Y�`�d����������-���q�$��>L>D1��a��9H�A����]����`(�p�f�ח��L�S�0�Uvkkp�,��,m4O ,`�4��2�O -�,U�ei��)yԫ7�h�kٔgוa,�zWu������ݦ^Z��b-0�G��~�M�|�w��      F      x��}�ɕ�g��ȑ��],���fP}xڰ-	V����A!22RE�"kxH�5���ț�d��$K�.U�W�_���D=�E$y�������Oo����	{�gDy�]�m�|��o���l��y�x7����ە]�oVv��E6����~?�a��f�\�\r�_����_O�l6�h��:�������p��	�JI���R���1�������-yS\��n��_��l��ڬ'�a���l���P{9�����Yx"N
%����l�~����V+�N#�V��ƴhbZ�0M�߮l:����ٻ{�_[;�m>O�7~��$�r�؇�����l�X�L�ϵ���L`����m��7��.���|�̓��f�p���b�����Wv�.��������1��Մ�����&p�b�&���o��F�%V�c�����k��]}�,�T����2ۺ������8UHyl��!M�G91X:)���(,%��(!�]E27{x�����1����AW���Q����(�0���0�0��__�� ((��߽|��i�I�3I$N����U��q�cႫ
�r���A*n�#��l�^��8T��q �?~��}X���*���ηf��o�ֽO^&���g��b���� �S���և�'o���:\�m�z<�_oc��ޭa^nW�G?ss�?��z�~��5iA�@��V����/C��g�����6vk[#Y#	��h�q4SX��
���e��������i��`�w!#��aA%�H�,E��m	�y�)�D�� ñ����2(�%�ED�_he�
K���:�)M�s�h2�x���۟n'�}�6���&o����GB����'���x���'I���l=!4��?�¿�}x����'�F[N����֨⠚���aF�1�x*%JS��m�R��݇���o��{\8#3%e9�g�Cg
B0�>#*gw��ٯÛ�Q^ ��Y��l��o���_�m��/�y��/�/���o}�þ���c��o�-��g��*P|X�?������L�w7��k�� ������mm�}���죟���I�E��ac����y��7�w�?�6�b�G
��a�Z�F	���U�$4T������v������E� /:�&��� ��[��,�6-��U�籫ib˞�I
M���ز�i�C7?��l���"��։��.e"�¤l����$ь�nRN�&^m��H�e)�Z ��b{-�O��J֨��P�n?��<J���)&�K�'Y� �O�x��Q�eZO�,S�	�R��g _���TR��˘�>�5��R�U�ڿY�uD�҈��[}'�.sH� ����WH&o�@� Ā����tW��
̱�� 7��\y}to=��@9,�D�Aɫ� <��o�mN����ݫ��@G��@��;����ץ�:��=� �p?�]�L>�βd�d�7i<P�z��F�`��+@I��g�~�� ���W�Nٵe`l2���C���-���j����DYBRK�2��4Z|�~"�$�����:,��.u�>~�z��i����v�����I�R��D5�@�Q�mɹo�ˇ�B=��HAk��_���鷶��~HOԭm�+����Elj���(�s����6y���m��~�.�:�m�f�so_�FT�n�77�_vT�ζ�}�	(��Q�]�#��fw�(����h����|}
5l��rJ5�`Jɽ�>ꪀP����%�����aH���-vq�b{����!��z����X~���}cN��	WW~>���	�T����l�3�R�Y�A�
�"6�
'aY��6&j�����,��/�§@��P@�A4�^��T`YA~�=K�0��1H��$���4��a��3��ML��i�9^>��j�]��b�K�W��R �]\:�(�U�ۢ�_�W�W'��%k@ ��1xG������;�A�r1+���0��O�/�%.%P�T��,�ٶ'm�Q��hW��vݙtP��EW��j*�4��-�s�،pqe�SMD&1��Nq�3��8��i��J�qJ���{G����G
�$Cy &"�v�x�F8ۓ&��I�i[��U�]iR#M�iR�)M�/K���&QG<a2C�q-�,E
;�����6R��&��4�O�&y?�yd�	�eŅ��\�Yq!"A|ܣ���q\�o)_6L��Ȅ������{͐��]V�˂vn��ۻ�!ߝ�r�|�6=Ĺ�!UO�0m{���?D�jޮ�v���@p���������w>X��$=��8�`J���+�e�%�@^3�8ui�3D��8s�x��� 6w9f�*��W�~+�{���/�������Hbt��Ȁ.����� ����c����/��+�D[�rDr�#NE)W:��8w�҄��Jm��/;���.?8��H��S��>x-o����9&���������v�i,&*���8�}��V� ����1Y��M���*�Y�/5"$��6۬�<W����{���#\���ؼm�)��k�q��3���P`��&�9-^�O�ÐZ���~���oV�|��Ps��:�/O��G��M�D2���&����pc�m���U�Տ��N��? �+�����yx� Gp!"��K~^̖�aD�JNOTDHGN
�O��`�mA���+��^,����%�5$�a%貥--.ۮ��@�/C ㇎��#��;�%�L�_�d��?|!�gyf??/���j�B�N���j@�Ҡ,�\+�]GXbwM���B8��E[@�a��cA��n���� �+���Lh��P֍�}l����c%b���촨��#X��6Z@��o���&P#b�~�~y��@g�س˸�N�ޗQo@�*^��T��ƦViTq�_��-J�.{LÐ�Ő���p!f���}����n^t�}{ϵP)p$t�`Je�,'9'�R�Զ�mA�]E �B.��w�w�@{���̽Z3�(ڬ_�>���b gZ{�(&�t�t�lH��=���'���m7�<<����
�]��h�
w%�-�aU@��ޓͮ�0Je��f$w2HdY�{čҚ*lT��rZ�ۏ]k}�$�k�u$5��F_���z���oߍ�Q6�Y���E���,��6��#Eɏ�7����~H�t��&���}x��]O[M�w����E�EP�����$##�������WA�}����Mr�Z��ϰ 7��2�K.4����dq���ȥ���XѶ��­@M��G)�$
�u��ǅ�fo�s�D�1&tB��D��)ō���Uډ��ǃUȴl��'��}��gd
�����(�z��b\)
�G>�v�#)( ��"��i�S���$M1�����"�<R�ca`�f#�!�� �..y�*Ä�D-i[j�O�Y3撷T8������.u3=n�%c]�6������Pә0�(�X�3��SH猡���K&2�TǒVD\B|j�.w|��Tt����酢�)��7`� xBi��6�⍧��5���V�7<>�Bwu�3n18<.���Q�q���+�����D�QrÄ��,0���Q�%G\�Pi�5�s�)��S���8F͇:�Z�*/��`��F��]��D���./]���Y��U�3ʙ��a��Kh�0��Y�=�E;M�7T9�rlH'�@�U����y���6/uaO�����o����xJl7��s)&���QY���}�u��'
K����|%hV��i���y|�<\R~�vt�D��p�&��͝>����23FT5��%?�B�sHj�x�Si��2P��pȤ:C�h�]lםheY�<�w�V��fH�\?W�0���<B�oy���� {�3��T�����h-��9�hW�<<_�ً��ro�P��P�xNA�@/,��;��|[Ӥ�<��v���BL_,�1L��`z�y=���S�87��Ҧ�V���L��{>��a'(�B�E�F�j�Y�c�șD��n�� �Q'7Xpߵ�ssW裖�SR=�9��\
rT	֤Y�+>�V�N���    �v����Ӭ��G��;v�D.��"���K�Lpd��)���y;�YeX��a��Y�R��)i���⍳��)���V7���l�������8w���r�#�Fܤ XJ�ˍ�J1���K�Tv�c�Sl����ՋED)UA�~�Aq�����0�ϐ�&$"��PLʵ�)��eIKA�ҙ@*���&�	��`GSk:��U&5?6zJH��fXk"�B21�T�#���Tu�G��jSkԗכBg�W������ٜD���&��\�0c!���<�E�z����qzS �G����1�q�.�'F/�G��M�=:E�]7o(�xb�=q��{��������5�v����,����[e�PO�^o������0�EO��:�3dy�W�
�rD\n�e&�S����ހ�s���8����V�r�J)Jn%'4�aT�p���>n�Q}.����UK�Y��[u�/����:K��$�,T�ȉAF�qN�g�R���8���c��<�])���f]L�R�&���A9�=�G�S��=�	��CJϙI���a�:��^!�E³4�r��n�ë0���Q'����UB/1GZ�r�_�O4[w��.n����]�p=v��b�>1�Jβ2ü��!
lqE%2�Έ3Z�N�q�t,w����`9sP�y�Zd��,��j�f�Q{(���U{h�U�2jO�n�Đ������&� ���s+>��[����Ә9���$3�X�<2e�J��9qi��N��PwA=���EPs"}��o�zI$�(��,y��'\����El�p:^%]�{c�-۷FW7�K���+N
���Q���ŏv��W�kr��<D9g�5B��X�"o�B��r$�Q8�6'�㗗�Yҁ�!ڌ��f�fqUP�Ye*g��{�����R���LAb��ʉ7�x.�5ӫh��
;_��|1�9�!Pt8h%C�3u|��c��:n�J�9Fk>--`'�<�&�ۼ�ogܸ�$վ�(Ǽo�.n��o���ݜ�s��`���v����֎ �UA���E��ø����IF�:ɨ�����QD62Q�Y�"���m��]�����7��qGv���
��,�p�����J��r�U����&�92aJ�����vbA��w�����%|���`v"#T��|�����4ʇ8��.�3�G�*���8�����GD��t17F
F�2�2�b�fe����&�YK2i�~�uj�T�с\�!������i��T,��i!?ݯ���nb�+�`��1�礫���zJo6�U�������<�/)��[��Xl�g4�I�GU�j��.2Zx8\S���J��?��:�����Jմ_�{��hٵ�;��՜�-o�! z���K2�Ij3CD�<J�Z43P!-�9<@����n����Cr&��/�W�����~����c'��p}�]gѵQփ�/�Ƚ�Dg(��!�k�93:5����,����cد�V��$/鸥Ԉu�'��(G��Y�'~���v����q��Q���W���R�0�R��)�Z�G���sm��,[.�<� �A�P��4�S�gp���,�wqYQ���I��%դ�?��O�F�:	kB{���w���t�ec8#���ϖ���,�Q$6�)%$v���x�A%Ǌ�ԧ9���񎏑�U��ht�Q��Jz���蒜�R����j��b���7{���oZ)��Ծ�J���U�yqV��o8��e�4�3���!l�8ùN$�T4�$7y�ꆩR��(ys���g��栺����3!4i�ŀ�=�xv�羞+A�J~��~��/�{�?�S��C֥��R�=�����5£4s9b�.1s²N-vZE.aDK˥8���~L�ҥ���.]M4�M��ު���W��;���\�
�ԇV��`Z�;�S�kc�����jc;�����Bg,w�*d�Р|i����x��Vb�A����:�mW�ҥ�Ŏ(g-���#l������X�fU��=���!Vu��m��+�����T0��a3�ϋ4���
s�M�p�c�_�fd�,����r*��1S�4?� �s�v3�[|x��Ug+l�ɶ^	��0�9E�'�U5
2�%�$A�"�J���B�9w�a�1ʊ?�A..n807��a��p�|���0����;���W�ڵ.X)t��_C�С�g 3BX�B�X��IPs<��6�b&��T��U�#T��
�q����.S�P��B�8�(�ŏV��>��*,�OQ���t*��6_�P��PO.T�,
�WJ8�00�,G\��O2�Y�S/�g���wt��Q}B�B�����ZHܘ�9%=��h�>�v������7\��&4�f�z���Y�p�Yɘ�l�2�ǜ�Ta�2؞Y�s��N���G
K��?΀F=Ǌ_��h-Tc�������>�����çIg	�=���8Rz �\�,��p�"ny(w�5��N�����)��,w�y�M��r�4�=R����#�挦����������>ǜ��U��;���3�qmc\�ilSi��#��!�Q\Of�J�v�r��1N��=x��1�8��-��5��(V�Nj�G8�%��p�c5�3��eE��,N�=���q��9��S[jl)e�I���x,=⸌��~JD5�̝ r
r�	�\�-W<G�� &
L��s��w�K1�pBv򑪤��ccR ?3)P:��Į���Q���^7΃�u�ZH'?�:�<>]i���>�ԵA�R��,KQ�Y�@gN�t�RJ2�%k�@Y'(�s��<::wto�&�Q	�@�ό����ů���	�K��0е|�D��³��M�w#_���i�N;��G��B�Uf?��SU�Q����؃�Gp΀��Ɣ�"w�t��S���%����Vl��cޮDPp��EO\�=�q(��k��n�g�i�S(���j��L�|q�񝒅�j���b�b��\�<�����:\�-?T�ڝ���>wB��ŀ�<�{�m0f0䁝	�	'�04�dٖނHX�P���9'�b������
ӊ
�)�����eRj�
ܻ�|�@�xg`��UIŘGY�C����AwM��4N.1l����X�����b`�/�B3v���f+�J&<W�xN�4Gk���TK�u�j��W1uzc��˚U�@����yd�DvBvhxb��v�ť˭�B,.Wme� ��*�r�Gm�e5��!��r�m(l�e�p�s̩hׯ�U� ?^n���zTs���4�kM��I c|�ѝ���ӝdWw���kQw�]݉�;���JZ/�ۮ3��?]-���LNY�R('օ�,9�:�H�L;�)�RF�;Vw�����ۍm�W�f	o�b��-\D��@A���iM������l�Z�Ey�yd��7v����N�Gv���u����&������	�̽}����B�z@B5�β��Mҁ��Te(�_���S��{�?�_]ZUW�U���0�#��A��p ���f��FY�3�H�� �EP���P���@]�	�P��N�#W��L� �8��sB���];'�]<ܵ}B��]G>��	w=xB��� ���`�A�r� G%R�GR"��XH}L��'SGuO�E8��;�Z���-ʛ��RLH4Z��qq89�T�a�N��~5���#�j�e=�����q�>cHS[tzo���ˎa����ʾ��q�=t�;�����N�F=� �j��u�2S]��R��&$T��@���j���\;�0플�
p�2���+&|3{5#�5Z\,J�)ZGAp��7ŏ&J\w�})�����(���i����zj�����Q@?�,��b��A-�\��b��&�i�v]��U_w�s��� q���ӗ
c�D5)����P8�䬔֯<��u'M�;���E�_��yk�aϧB��9�4�(U�x"%��[���Pbub��QA�섘�C3M�.�{�T�.����w��(�><�Pub�z����
�m �  �Z�'&��o��Q\ѳjv+�S�shX�eZ�4M1 N9,3�Ӽ]:HrU���"�tɋ�$��xo�sm��ޘk���^p���3��;* [$�H��@.�(˅��)+p�dWqW��G�7��
v�7��Q77�7q#p�o�/��=^�^G�RM�DE������cS��bk"�-�cѢ�4�P�(gQ&1`�͚2�e�()�}~hW�۶]���}����=�%����7�ū��BAR���ª��M��Y_1�A���B�8PIS�	��H
P�!�T�2�a@vJwdBV��!�K\&`T@��O�x�S���J#�m�L�&UI��*=���N��W]���T�ክC�oG'	�V�E��G;��A���.�gO���S�9ɘK�v|�+aP[6H�R�UbM_�e���dnM�DE�)�Ø�|G��_�1]���2&���i�����{�d�pj	�܅�jP��c��&�s\�c���SdKHNYx4�F_���$u�|�u�1P�[��+gLc�{r��yr�v�[�$Sbe\�L�:L�D���������N���G�0�7�$����C��I��T��t�4N¯��<-�l�h�Y��i�)�A�G:�
e�y�3��٭m�3wm=�H�1�D*�����e��J���*dIV�h�>����q(6n�#|������l�z�g0X�)�D!�Nr@��"�)g9��xf8�
d�-|���P K��;���:�4�]���\G5�k�¥�Rɾ��=Ye�Q���[�y��0ȈxT��r+@�cϸb�s�M��LS���Q��8�x�u�)ޔ���Nbz�n;f�S3�ư�eԝᖹF��g;��ž}�ʈJ�9�Y�'ʢT3����ĸ,3��t�*O��?���t����w����{o�      H   �   x�m�K
�0������!��$9�'�&hAAZ��F��)�*d3ߟA@���2H67$Z�X=�a��3qX�*>���VP�rF����b����:��a8�&��ޑ�!���3%F��0���Z��n��:�� ��3��D�d�#b�������Gϑr�Oi��ι;��@k      J      x������ � �      L      x��\[o�H�~��Bv_6D�/zs�L����d08s0ms,�Z�JƳ��~���d�)0r���X]U]UM�3A.W���+��]�Mq[Տo��b��*��Vr)����E����>5�)Ƙs�?���������/?������l��%��)��){N���9�s�2Pꦠ?>�����ٮɛ���|v��wſf�Jd�e_��{π����[�g��?��b��/�`�/�����v�*��b���mSV���ճ��k�{����ø�hp/1c�)��O��������T�{��_�忹;�����`�`�8�J�I���?>�R�ӊ��B����O-"��f
�-"H�,��?'uj���-
[�LjU&E��N�Z����᠙��H3�,c�9>^u 園�}]�>�d�ߔA'73F�\�%����N A#s�M�u]�M5����ԅ���B!4�BJ�
	B{BP���͟��ia1�!��!)&2�v�hL2C*��Қ�1>��*3�0����Or�����7^͞�,?�lsЄʻ���}|�:��a��u�8{�o� Ŧ�"�?�xN�s& _�%��S�J� x�uV�;h=�	:�67�>���SP/��!^�h��s�2�!��)� t�yX>R�}��Pl�} ��K���^m/2g��D���H��N-3�`ga/g��izz�Ĝ�)����vϺMc���1�k��ަi�߱qj�j�H)��)�S�,y_5U�|\�����Ų�(	�����)xJ˅sݧE�?��D�����S��&�S��z�R�i_�M�%��[�,&�����I��f�)n�;?�����y�z?����4'I�f�i ��a|�s-���:7c���Eސ��������c���@�@;���U[�0N��d񼂧�e'�jڐE��8�m$�t��
ܟg����UP�*R�-��������ۼ��(��@�Li�6劼˷M��}���{��s+H�	�L�9�Mu[�ۻGX�s�*�����!%�c�4�Q�CaA^n�su�G��uQ�T�Cqx�K@�$��22Q
Kh��3��n�e�Y��8�h��3���PPo Ҁm��{�z��}���tf9���*2X
�Y�K�u����h�rh2�b�����y������)y�O�&�N����(��ޯ�ۤZ�P!�2v��ZF��f��Rp�qǍ��݇�R�rx�j��!��#��cq8�$
Y�͂|�75�����zU�Iހ&�ІѨ��CaI~�n��kH�ٛ��%}�%�Ȝu���+��V5P����]�T�dE�b'�(���b��������Uu_[��_ �b��ES�4��އ��������b�2L����M�P�8���ߒ{PW��2��~��
-��Q.఍,ׇ�vG ���g�mbf�^��I�Ο�T�i�[ δWu�,���U�.�8m6����,�'N�>3�(z[6g5+�Y��	�
�9xb�,�5�/?W�jZ��s*2(x�� 
���YÎ����Η���E��>�M+g�>����z�2_�r��o1�R+��Qf;� 
k`1������]��\l�+O,!L��5��S(,�����/}��*��j۵�'�<\J=�����9�a�Qk�*sZ��w��{�߫�9�'��˜VTG�ч�V�^Y��(U�?Hhq#��N�������C~?޿X���D;+�|>��r��~�ǭ��,�ŕ
�q���³�sn��jg�s���&IC%+�f�H(h���^�4mE!���` gs`��b��]���v6�{)4J�(�%/�|��7Hۻ�j�T�/�e����Q���
�⟻����1�h�4��*@S7��M]W�Yh���"������b��Ŝk|@�{@HG��몹k�#M�haE��Q(�BMB�#�f6иq��U�6�.��Bul^��_'�Xe�Q�IP�gw�U �Pm��y���C��p�>a '2�A#��Lt`Bk)2��K�>ԑ��[�j��m�u}H}�SҼe� ��x�"N�4q�ڇ����
�郺D�ٞf;+9��qB>I��LI�mT���#I���{�n�$1h՘�=�:
y6�d\I�Lh�ܘ� �:�\@�]�v�h8���83tR8�V)��(P�k=�� 
�$.�̷5����ǉV��L�z��P�Y���rvэ-��2T����:���a��0����e��V+pg�	Yo�cy�ϙΨ�&�P8Ky��l
~���DIr��0e<-��g�T����Ca��{肖���:��Z���(�͢X�'�I��)�ʜs�(��"����_�}T�ߟ�C�rJ}���U(��`l�(��n�a!�6Ӭ�8T�b�$	=����g
�@iqQ����J����.�s3v�Jn����mJPi08S�r�RP�H���������/�s���tLZ�H	'�	�{R!��@Oǯ/�[?�_�Mr�PL��NJ��"G�Xpp)��� 
�,i�͗y��^V��،˜?TO&h(�2ǵ�Fm�;��J����t�H�^O��}	^�
���BP��Ώ�L���ӏW�=<�:� { ��H�g�|]L���L����9>���H�\�Z���@���oIF>E�ձ>�Q��PabxnV}{����B������0����W���E:��p ����C�P?�˿?������6[d폆�̩�q �	�N��B��eUn|�5��d��������ez�����D2�CG*pv��w;�j}�*���<YI�AOK��u��cZM�Q]އ����	sT�R��/�p��1�DO	&X��˄�"��Ա��}�_����ׇl�^�ͯ���Z<�4�<#A��8͢�� �x
�����U� K`�^����Cgڼ����Mp�xE�4��@7I>����:�l���a8�~>��FΤ�Bc u�@U���MSWk����ބA��|��%9	��p��Y�8i�*�O?'��68��Kr��,�F'��dȋ��o�V+���I
+�WM#�'�w�Ƹxv9�B��!�n�E����o�P|*���tvМS��ӓ�����ڢ�g	�#�����&vӽ46�����/+N���It�2���0�c

�y�����\��v�����S�$�ི�4�@E��1�ou���y}v��8�L�ۘ֐ �qf����w
D�\���/v�r����$;-<z,��RR��$��%?���%��yY�p�N�S�L�� �o-dQP%�>��Ķ���ίK����I~��vkOI&yI�W슏�7���,%������Ĭ�R��M��\F%���+@���x���j�X����9�`��̕�N�s�/��	P�OY,��ms�K���t�����������U�G� 
�8��K�f�?����'Y��Y;̎䒤8�(W�����H�'P;~�Z|�H[*�����Ύ?pN77�MA�WJM��n�^�XTj|�q�$<�z_M���>����_���/��p���Gqt'p~m!)G�7�B���k�^���X�^W�c�j2�N�p}Z4I��WZDTV�@͐���A�P������i��i�A�E�\NJ'	
�I|$�c�P (���U�^��%��;X��)�B�hҾ|�+��_\>q�܇��M{�!�����G�x�1� Ù�2PR*]s���/���h�	���#	_����r �3c$�e�g��% l��0��s���f��"ߜ�jj,�F2��2��AM��P ��o��Ϟ��˻��J���s�,U~֑�N������*ry�׷�\�2o{��	.���d,��*CW '����@�Q���g}�C=H�*i$��$�o�bѫ�(Prd�C�������s�X2\9�kޱPKg\	;�2���=��J|���<I"����bIJLg�h�Q
���˛|�Cф�ӌ��¿#1�JrhG��&V��,��|qWbu��5պ�.� )��2kE�s��0%���}���������f���$)��P>c ;  ��M2��Q0�*| u��%�����g89�9��H&�E�-8~�k�p�$����3W����\�2I.��NE�z� ��v��/>���4]��#�$E3H�"�%�C8ѿ�g##�l��'V�X�;Met��nu�[�qVi`/�w�*��U1��($M^�78�ȷ�����L*�*����j4 ��B����@�_�~���ڔ�ij\h�bI:�gx+�'�py&���sc��'��F��O_�q�]��V�7x
$�9'VV����&Ǚ�����	���T�V[��4�¶Y�h��m0y|�o�M�������U��+%��Bl�f�Tu �w�(i'���|�9�nUիr>
M~Z�k]+��`I.6M�ｯ-?����	��/S�ɩ�Ļ�N]�(L܉�?��M�qHi/D����F�}`�RK(榡������`:�OP�U&e���>43M�w4|o��M���W`v�'r��KgŦ��
&�ބ�즵C��)����%�%W/������棇�S�_v���NBG��#�駟�~ZR      N   �  x����n�@��s�Db�(j�w_f��{ìV.ƴ�h�b�w�ĉ��K����w�܋3�/s�b6-D�:��p]���=Ĩy��v%�?���4r��X�:?S�:ӯ�	q�OSk�қ��#T-jpC�����xQ�5��P���h0(���!��]��X|��&9s��Q���W&�)����Qe�9W$=N?�*b3�0㵜h&��zL��)�Zm��߳���/�GGo�=��~�]v���kC�<P�y<��ZH�N!U=;KnEQ�e�� h�����M���̶>�&��~e�����O����9�m�k�J��*S'��s�$�%`�*��\	����玖�1�"~��lE��,�理R������ E(A""� ���2���D���G^����T���<o��Z�$%��4*�����~�P�X$�ş�g�����p�������5��F��3Y֏      g      x������ � �      P     x���Ao� ����c�x@��H�m7v�ŨiI�K�Y\�~��u��R.�	��?E�`O%��v��o}�[���g}>�z�3,#��ڞf3��n��Ó;g7��P!�YEFW5^����$ū�;LB	��� ��m,$����q�����:o����h�}Ɛr�5L7:�֬����� %0�Hӡu���_��e�s��,�)���o(-m���n/�;J�yحQ��??,����l]���#�'���_vUU] �{�i      n   !  x�}�ͮ+��׾O�}l�d�pF�'�&H��&�d��3:U��%�0�ѐ��j�]��X����1��O_���k,�y̟��q������r�e���������{��6�>ϻ����g��������ϯ��Z柵����i;�`��������1��劻��1���yX��s��u���W�/��?���ĉίO��e���`8���腿���|m܂;'��l��;���,��/�2��މGZ욿�hΧƝ�i�zr���8�?k����-�:�|�```�>/�!<D���#�3�3\���9�@g�1��?��5n��>�G|�!��H��H�z�����`��}h���=���� ����DG�8pJH��I'�C"Fb��=�ݣ�̀���"i�.�"����cXg���^��1Ȍ<XR�ji �w�~��8�;�x*�m`��H`���r`����@���O�����1�@
?0�@������V >�`��D/�^�$zI4Ot��%�K��D/�l����F/�l����F/�l�r�����@/z9�ˁ^�r�����b�4�� \�"�s+y~�ݮ��$=�O����;'�a� o�g��F��� [�<�sxn!ft�S��?RA4	9�1��@�G��0�&���Uȭ��X*C�	E�)=2Y���PR�N*?�C\��o8�����wO���A���i�1n1��f�|���y�vXH�ϕ(���0�2$H���'�K4�L&���&��$�b�q	�M@�X�2���R{"��|2t��H�h'�r����u< ���D;���0Aq�t��t�a�N�6�|2�9	:~(8�|@\ ^B��5�^��v�O�`]J�0y��pˌWֵ�m?f�:�W">*��hq2e�%��!��9�!Ld�D���1��Ԡ���ak������25L��}�I*��h F�p1>h-;�Ԑ
��w��2��R)�!��yFWM	���N��x�a��:f��ƭ�p���GexKw��t.�T�s����i�Hy��g�ï��X���(s*W�>�����a�8�Đ�M���T�G��� ֒�C	:ëq-`�'�X�H���)iw�+�����v�1_y`\9�j�#��JP���G��2>�'٢���E�$���iŒ�H��$bbaBy'̕&*�v,H���^Bք��/ib	�E�ٱ �lt)zQ��M���C>����΃����ɔy.�=|�J
�d�P�
�ĩ���<׺,	��g�$��D�?�8d��X��-k�\�1�" �C���1��k�	��R%.��]*�w�kKy;缎����~�z^�a��ơ��{�k�B��-��t]�{��Jvv:\��ZuvG�eyYXu�IDk�w�����ZR\b�>Ơ�A(ǧ��1bb �*w�?d�!c&L׮�R�+����������E��)�\{�0�%)����T�����9�E�ŏ��O݅�>]��u~�DI fM�1VG�zv ���XW@$�BAՎ���y�K��5�	��|;^�y�q/���yxn'�ġ;q�N���D Q�HT!���<q�N����D�!QH�'�DA%qfOTre�D�%QPI�$ŖD)$Q�I�B�L#hS����n���6x؈�x{���O�pmпA�j�o��'ۡ3�dCml(jC.�l���6H�@t��6��!�ohoC����ƏSe�mޮ�ً;��Qw��\7?�y���̿�N2�f~�����}��c�J�]�;�����[~qA��Z�2�g!;-d��t� ͅԳ��䷠�|� ƅL�������,�n� �P�Z�.-kAX�Zւ��� ���}Bf�Zւ��� �a-�eA.�d���O6�/���~�~�v'���a�/�Xŧ�a�e�AJ}�e�AXam���>���7o1����z�8P�AaF�
3z|P�Aa�fP�Aa1�d4D�8�!7$òfX��ٰ�@�`�	l�x5�j�����W�����M�z��5`k�ր�T�l�>��[�^��fs��5�j�����W;����50i���5nA�3�W���������v��X�%F��M[>�_~GGM}@�p���e�hf��NU9j峲9M7�Vt��مZ[��2����_��Fc����<����i�8��Zfo�����%}GZw�i?�ȣX�--FvM�W\��+9Y�f��}صv���+��|���
�*�q�á�Fqh�!*�8�qh�!�T2rH�!�TRqH�!�TRqH�!�8�p��!��jr��@�V�UG��h�b� �� ��M0t`:� �`�4<g�� ���`3�m�� ��`��>��X4��D�9ֻ���v;cx?]�<јS+�FY�s�8�}������7C�v���`ڂ4�إe(֘�EJ��v[l�D�V5�9�ot1�:����ڤ�w��M���Azit���|+���M;�6-<��A8^8!<�s�9�4:�˻͛�u\��k��^\��q\	嶯{��s�?r-��s�(�����h�C�8PU��O�Uբ�Z"<���3��� %'L��~x̕�mUaY�b-�u�Ԥl�Ŗr��������`	�� ֛>V�Y��Z�@U�`�G
Fe����?+y��h�_��7#�p!y�`�!_sU�TEfO��&�d�,�+*OG�A5�9QU˧�5ު�j���tq��F����3�{U����Bjy����5F�\n��)~aS�������K�����+E���$�\r�Wa�b绔�B|��Υj]~�I̅uq�o&e�!�T�U�5���8�..�;�l�XVcE�u��Կ*�Z�٬dsv,���C�vj�y/�6 ��:D�����`~�q�s���^}���G��ȕa�����#N��X��\Y^�8]S�?u�RIyy������6I���@��=A��V1q���4	=����;5p�Ϋ�IX���R'S�z�a_���shz�7_o�n˟�kS�}l�N�V����k�!��VIߕ��5���Pj�-	����k]��t��-�K\5ᕆ$ט Z/.E�P�|�K��<�ư&���m�����v��
N�!_���>�]�sŗ%���V��]{��I�����"\0���������)1_�ڔ�{�֔�/�>��ڍ���D�R\~������&D������
W��ecS;�7�>���\���<�f��~ޏ�����k��N�����x�sx::4�0��h��W�AC���)��B׆��xLq589��Z�L�R4����-�������Ƣ�".���D�N�5|@Z\4�8�Q�D3��{a�5�D��C����Rt{���s����s(�oP\����py��;J&�nms��_$�m%y�c��j#!��z�fu5�kz�=�Ȗ��C6Qe�ή�:ȻuZ�#��x�b����ꛓ�����Fm=e]�����{P���
,ǩ:���m籎G~����Y����۷��Y��      _   <  x�}�?O�0���S�:7����)B�e0���&q���~{�A����߻�EBdb��6f�2.�<����I"4�$�
��\jFs�Q�X������L�2,)a�
)�o/��[��e�,�rvP�UYCUW�#TUUBYǺ�WQ�U.�P�_��J0~�?+�_�|�߁�q�i��1�Kx����a�漝��1��zJ�!�k�5G9��<9��g�#�a3ħG��?���[����=�z��;��>�:4��t�:3CX�p�`���D��U��L#�+D%&�)`�E���$~��`��)��4M?΋i      l   -   x�3�)��H���WHLI,NL��/���$�a�---�b���� �M�      R   �  x���[o�0 �g�WX�����J<�+c�`�@ ��M��������m�vݸI ҨJs����q�)��*$�
)@@HB:��'W���+w�����]�8]�[�3Ɛ�˙���Ʉ�>pjO�������u��dZ�ơa?�F(�?u����-�}R��k���-��}�Y�0��c�_T���?�S��';�`i�_��\�$B��⯍�fx�M0ј�Q�"Kw��$��;d
�H�@�0 �D<$b�ȏ�=��&�ҟ���e��,�.m��Y�]��̗��N1g�0Ȑ�Q�;Wଳ�kEy��Wʤ��4��F(B-��Y�P��'�	�+�o8�����ʷ�A�2P�� �����
�����~Em�7
�p#��T0yL?N>N�gRIs�QV����K;�s��r�3ל�< ��M7�%N�ַ]��Kw�R&�/x�����<��(�)�� @Ji�2�Ԁ��P	fS�h�Q(\T:b	��@i�������8ðEqWc���k�\������k3�SZ��4M�pI~ۭ����+��M��W�y���U:aߗ�r�S���	7ߕc[<ʉ�ȅ�[�)��v���t]N�{�#QΘp��H�Y�7�v���'U���$j�?=�6�M��F�����u�X��<�{T��K�Ib���.���r�V�Q2vfs�Fhxԇ~)�r��AN��˓�����޻��52�3�'��mh����򄰁 �����F��!��z� ��mi      T   6  x���iS�F�?�bT*����H���9l��̵d���4:�.��kR��iI\,aK�u�ݣ�~�_Q�>
�1�aq�bhV�����cF]'����mm������'jn�{��t��t�aa^U������uo��Ս�I/�/�$����@&���rU����?�a,}U�n�?W�U�y�(O��);�k�i�
!w���,�W���97g֔�Ü?��û�=����_���i.]�|�Wyz�#K�!����E8��Q��j���η���#]딝i$�YǗQ��%�,oB�^g,�
Oi��U<�!�d.���%F��%b��QMf˩\�A5-�E���_�r%� �e�.�q��O����q�'�N=<�%X �Ҩa�̠�@_�j,#㑌e�� VnS��ge�2&�4��%�4q1ը����oh�bT¦�� �T���k��.,�?��k�ʩ���~j��7���H��LX7!n(��I"�r<�s��B��g���{���Ѻ�����O��5C��3�����ߗ28d�[_��a�%���l�;̴�N���)�tqd0��-�D{�}b��}�n7H�A��Y��n���˖�K�.����h;8,'�X��U����5���K�ݝKϣ��hw~���B��F[������F�d�~�# \�Kl�A[�t����px�i���ڴ�0�O��ji������w��c���矦�Y�n؏����*C2��(s�7/v��Xuf5�´H[�O���+�.V�>�IK!��Y��w}=+^�����7�v��Y�5h��f;���vNw.O�R�D�ȌO��}�v��q�N%�<	`BĐJO:e��]���5f
��f�B�qM�{�%z�@��B�f:��v��>�Uݻ�gM�kL��-��}{2x��Qw=%I/Oo��_����2�.����}��i��E�r���w��Lq���e���&Ď!7�G鍂U��(*��8�i��ԟwMF� ��2��k�z���?�����X�N��w�� ��ŏpJ ��o��5|�]_On�dR�<l�ʩ���,cIi��/���h�U����W�=.!'�Ռ������u����6��G�GU��J}O��˽�b�VF�7v���m�o����v����$�M,w�?Q�G�5	E�0M^!�Q�p#Ey�s�lv,�i?��;�	�w1��0��'xR����D���?� �������L�(хF
�dY�Y�*Vh�ЎF�,!�.]�u5�	���&�ˡ�Kq������,��KF���]پ> �T��4���(V�tWVV�_�B      V   �  x���Ko�6��� ���ԭ�@/Yd�C�^�6�d�H�[��w�H�f�0mI�/��O��|3cÆ�ͧ�o>-7O��������7���U�e���M��4�����������o8�|��e<a_������%���~��X����Y� ��O*��S�����5Ჟ��/��3�����V4�Xj���?;sX7���L_ආ�+n�k�bР\����ҷ�rWV���,�0����%K����?<vO �`	�rX/�g_Vyڅ+��M=�@0�Q�8��͍Ѫ�+�*�a8�Q�҉�D�K��t��G"no�,B1H�pI@��X��k����։PW�c�6�u���U�p�Ma-s���T�0�}�z�_g�0�Ń#஗�H��C(�#��n�b�k�(���5Fp.�l+ �Y| }�{E<M�p��M�"�_t�StL)m��:L�-�x:�}���nk��èb������L���*dc6�7�i�/-��#_iR���߆�yx[���|���i�su��~ʳC�/�O�s�5C<�������~������t��R�q��V�Z$�0I$�`����}f��� �S@"5��$R�%_���J,���I�\�0ʩ��	(4�zI$3T�e���])��D��BԒ��(f��q{��W�/?0;���Y}��z��>�ՔI��c�IC�Nŉ���n�}\ }ʯ��G\�r*��B�ǳ�R�<���Ք{w�9f������thGԔ�3������n4n���6-ѱb�v���ȸ�{
D6���J�K9���Wr�%��wr7 ��z��yl\f������,אR�?c�5��}bb'�m�����r[�$f+��mV�R����U�D��2Y�J�UH�:V�:�u��.���rۅ�`��R����]EKdc7����U�gcW��
V*LI��v��	a}���?D�      X      x������ � �     
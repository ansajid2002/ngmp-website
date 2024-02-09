PGDMP  5                    |            mmapp    16.0    16.0 ;   �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16720    mmapp    DATABASE     x   CREATE DATABASE mmapp WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE mmapp;
                postgres    false                        3079    16721 	   adminpack 	   EXTENSION     A   CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;
    DROP EXTENSION adminpack;
                   false            �           0    0    EXTENSION adminpack    COMMENT     M   COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';
                        false    2            )           1255    17696    next_transaction_id()    FUNCTION     �   CREATE FUNCTION public.next_transaction_id() RETURNS integer
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
       public          postgres    false    288            �           0    0    apploadingscreen_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.apploadingscreen_id_seq OWNED BY public.apploadingscreen.id;
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
       public          postgres    false    216            �           0    0    attributes_attribute_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.attributes_attribute_id_seq OWNED BY public.attributes.attribute_id;
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
       public          postgres    false    218            �           0    0 "   audio_headphones_product_ah_id_seq    SEQUENCE OWNED BY     h   ALTER SEQUENCE public.audio_headphones_product_ah_id_seq OWNED BY public.audioheadphones.product_ah_id;
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
    mogadishudistrict_ship_from character varying(255),
    product_policy_id integer
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
          public          postgres    false    249            &           1259    50568    return_order    TABLE     �   CREATE TABLE public.return_order (
    return_id integer NOT NULL,
    reason_return character varying(255),
    order_id integer,
    medias_return text[],
    detail_text text,
    return_status character varying(50)
);
     DROP TABLE public.return_order;
       public         heap    postgres    false            %           1259    50567    return_order_return_id_seq    SEQUENCE     �   CREATE SEQUENCE public.return_order_return_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.return_order_return_id_seq;
       public          postgres    false    294            �           0    0    return_order_return_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.return_order_return_id_seq OWNED BY public.return_order.return_id;
          public          postgres    false    293            �            1259    16861    social_logins    TABLE     �   CREATE TABLE public.social_logins (
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
          public          postgres    false    257            (           1259    58625    vendor_product_policies    TABLE     H  CREATE TABLE public.vendor_product_policies (
    policy_id integer NOT NULL,
    vendor_id integer,
    policy_name character varying(255),
    policy_type character varying(50),
    policy_description text,
    policy_status character varying(20),
    policy_created_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
 +   DROP TABLE public.vendor_product_policies;
       public         heap    postgres    false            '           1259    58624 %   vendor_product_policies_policy_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vendor_product_policies_policy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE public.vendor_product_policies_policy_id_seq;
       public          postgres    false    296            �           0    0 %   vendor_product_policies_policy_id_seq    SEQUENCE OWNED BY     o   ALTER SEQUENCE public.vendor_product_policies_policy_id_seq OWNED BY public.vendor_product_policies.policy_id;
          public          postgres    false    295                       1259    42480    vendorbulkupload    TABLE     �   CREATE TABLE public.vendorbulkupload (
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
          public          postgres    false    265            1           2604    50526    apploadingscreen id    DEFAULT     z   ALTER TABLE ONLY public.apploadingscreen ALTER COLUMN id SET DEFAULT nextval('public.apploadingscreen_id_seq'::regclass);
 B   ALTER TABLE public.apploadingscreen ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    287    288    288            �           2604    50527    attributes attribute_id    DEFAULT     �   ALTER TABLE ONLY public.attributes ALTER COLUMN attribute_id SET DEFAULT nextval('public.attributes_attribute_id_seq'::regclass);
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
       public          postgres    false    239    226            '           2604    50533    conversations conversation_id    DEFAULT     �   ALTER TABLE ONLY public.conversations ALTER COLUMN conversation_id SET DEFAULT nextval('public.conversations_conversation_id_seq'::regclass);
 L   ALTER TABLE public.conversations ALTER COLUMN conversation_id DROP DEFAULT;
       public          postgres    false    274    275    275            �           2604    50534    coupons coupon_id    DEFAULT     v   ALTER TABLE ONLY public.coupons ALTER COLUMN coupon_id SET DEFAULT nextval('public.coupons_coupon_id_seq'::regclass);
 @   ALTER TABLE public.coupons ALTER COLUMN coupon_id DROP DEFAULT;
       public          postgres    false    228    227            �           2604    50535    currency_values id    DEFAULT     x   ALTER TABLE ONLY public.currency_values ALTER COLUMN id SET DEFAULT nextval('public.currency_values_id_seq'::regclass);
 A   ALTER TABLE public.currency_values ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    230    229                       2604    50536    customer_address address_id    DEFAULT     �   ALTER TABLE ONLY public.customer_address ALTER COLUMN address_id SET DEFAULT nextval('public.customer_address_address_id_seq'::regclass);
 J   ALTER TABLE public.customer_address ALTER COLUMN address_id DROP DEFAULT;
       public          postgres    false    268    269    269            �           2604    50537    customer_delivery_address id    DEFAULT     �   ALTER TABLE ONLY public.customer_delivery_address ALTER COLUMN id SET DEFAULT nextval('public.customer_delivery_address_id_seq'::regclass);
 K   ALTER TABLE public.customer_delivery_address ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    232    231            �           2604    50538    customer_follows follow_id    DEFAULT     �   ALTER TABLE ONLY public.customer_follows ALTER COLUMN follow_id SET DEFAULT nextval('public.customer_follows_follow_id_seq'::regclass);
 I   ALTER TABLE public.customer_follows ALTER COLUMN follow_id DROP DEFAULT;
       public          postgres    false    234    233            2           2604    50539 $   customer_transactions transaction_id    DEFAULT     �   ALTER TABLE ONLY public.customer_transactions ALTER COLUMN transaction_id SET DEFAULT nextval('public.customer_transactions_transaction_id_seq'::regclass);
 S   ALTER TABLE public.customer_transactions ALTER COLUMN transaction_id DROP DEFAULT;
       public          postgres    false    290    289    290            �           2604    50540    customer_wishlist wishlist_id    DEFAULT     �   ALTER TABLE ONLY public.customer_wishlist ALTER COLUMN wishlist_id SET DEFAULT nextval('public.customer_wishlist_wishlist_id_seq'::regclass);
 L   ALTER TABLE public.customer_wishlist ALTER COLUMN wishlist_id DROP DEFAULT;
       public          postgres    false    236    235            3           2604    50541    customerclaim customer_claim_id    DEFAULT     �   ALTER TABLE ONLY public.customerclaim ALTER COLUMN customer_claim_id SET DEFAULT nextval('public.customerclaim_customer_claim_id_seq'::regclass);
 N   ALTER TABLE public.customerclaim ALTER COLUMN customer_claim_id DROP DEFAULT;
       public          postgres    false    291    292    292            �           2604    50542    customers customer_id    DEFAULT     ~   ALTER TABLE ONLY public.customers ALTER COLUMN customer_id SET DEFAULT nextval('public.customers_customer_id_seq'::regclass);
 D   ALTER TABLE public.customers ALTER COLUMN customer_id DROP DEFAULT;
       public          postgres    false    238    237                       2604    50543    homebanner id    DEFAULT     r   ALTER TABLE ONLY public.homebanner ALTER COLUMN id SET DEFAULT nextval('public.homebanner_new_id_seq'::regclass);
 <   ALTER TABLE public.homebanner ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    266    267    267                        2604    50544    laptopcomputers product_lc_id    DEFAULT     �   ALTER TABLE ONLY public.laptopcomputers ALTER COLUMN product_lc_id SET DEFAULT nextval('public.laptopcomputers_product_lc_id_seq'::regclass);
 L   ALTER TABLE public.laptopcomputers ALTER COLUMN product_lc_id DROP DEFAULT;
       public          postgres    false    241    240            ,           2604    50545    media_library media_id    DEFAULT     �   ALTER TABLE ONLY public.media_library ALTER COLUMN media_id SET DEFAULT nextval('public.media_library_media_id_seq'::regclass);
 E   ALTER TABLE public.media_library ALTER COLUMN media_id DROP DEFAULT;
       public          postgres    false    282    281    282            (           2604    50546    messages message_id    DEFAULT     z   ALTER TABLE ONLY public.messages ALTER COLUMN message_id SET DEFAULT nextval('public.messages_message_id_seq'::regclass);
 B   ALTER TABLE public.messages ALTER COLUMN message_id DROP DEFAULT;
       public          postgres    false    277    276    277                       2604    50547    mobileelectronics product_me_id    DEFAULT     �   ALTER TABLE ONLY public.mobileelectronics ALTER COLUMN product_me_id SET DEFAULT nextval('public.product_mobile_electronics_product_me_id_seq'::regclass);
 N   ALTER TABLE public.mobileelectronics ALTER COLUMN product_me_id DROP DEFAULT;
       public          postgres    false    245    242            #           2604    50548    mobilehomebanner id    DEFAULT     z   ALTER TABLE ONLY public.mobilehomebanner ALTER COLUMN id SET DEFAULT nextval('public.mobilehomebanner_id_seq'::regclass);
 B   ALTER TABLE public.mobilehomebanner ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    273    272    273                       2604    50549    payments payment_id    DEFAULT     z   ALTER TABLE ONLY public.payments ALTER COLUMN payment_id SET DEFAULT nextval('public.payments_payment_id_seq'::regclass);
 B   ALTER TABLE public.payments ALTER COLUMN payment_id DROP DEFAULT;
       public          postgres    false    244    243                       2604    50550    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    247    246                       2604    50551    ratings_and_reviews id    DEFAULT     �   ALTER TABLE ONLY public.ratings_and_reviews ALTER COLUMN id SET DEFAULT nextval('public.ratings_and_reviews_id_seq'::regclass);
 E   ALTER TABLE public.ratings_and_reviews ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    249    248            6           2604    50571    return_order return_id    DEFAULT     �   ALTER TABLE ONLY public.return_order ALTER COLUMN return_id SET DEFAULT nextval('public.return_order_return_id_seq'::regclass);
 E   ALTER TABLE public.return_order ALTER COLUMN return_id DROP DEFAULT;
       public          postgres    false    293    294    294                       2604    50552    social_logins login_id    DEFAULT     �   ALTER TABLE ONLY public.social_logins ALTER COLUMN login_id SET DEFAULT nextval('public.social_logins_login_id_seq'::regclass);
 E   ALTER TABLE public.social_logins ALTER COLUMN login_id DROP DEFAULT;
       public          postgres    false    251    250                       2604    50553    subcategories subcategory_id    DEFAULT     �   ALTER TABLE ONLY public.subcategories ALTER COLUMN subcategory_id SET DEFAULT nextval('public.subcategories_subcategory_id_seq'::regclass);
 K   ALTER TABLE public.subcategories ALTER COLUMN subcategory_id DROP DEFAULT;
       public          postgres    false    253    252                       2604    50554    superadmin id    DEFAULT     n   ALTER TABLE ONLY public.superadmin ALTER COLUMN id SET DEFAULT nextval('public.superadmin_id_seq'::regclass);
 <   ALTER TABLE public.superadmin ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    255    254            )           2604    50555    transactions id    DEFAULT     r   ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);
 >   ALTER TABLE public.transactions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    278    279    279                       2604    50556    variantproducts variant_id    DEFAULT     �   ALTER TABLE ONLY public.variantproducts ALTER COLUMN variant_id SET DEFAULT nextval('public.variantproducts_variant_id_seq'::regclass);
 I   ALTER TABLE public.variantproducts ALTER COLUMN variant_id DROP DEFAULT;
       public          postgres    false    257    256            7           2604    58628 !   vendor_product_policies policy_id    DEFAULT     �   ALTER TABLE ONLY public.vendor_product_policies ALTER COLUMN policy_id SET DEFAULT nextval('public.vendor_product_policies_policy_id_seq'::regclass);
 P   ALTER TABLE public.vendor_product_policies ALTER COLUMN policy_id DROP DEFAULT;
       public          postgres    false    296    295    296            /           2604    50557    vendorbulkupload bulk_id    DEFAULT     �   ALTER TABLE ONLY public.vendorbulkupload ALTER COLUMN bulk_id SET DEFAULT nextval('public.vendorbulkupload_bulk_id_seq'::regclass);
 G   ALTER TABLE public.vendorbulkupload ALTER COLUMN bulk_id DROP DEFAULT;
       public          postgres    false    285    286    286                        2604    50558    vendorclaim claim_id    DEFAULT     |   ALTER TABLE ONLY public.vendorclaim ALTER COLUMN claim_id SET DEFAULT nextval('public.vendorclaim_claim_id_seq'::regclass);
 C   ALTER TABLE public.vendorclaim ALTER COLUMN claim_id DROP DEFAULT;
       public          postgres    false    270    271    271            .           2604    50559    vendorpolicies vendorpolicy_id    DEFAULT     �   ALTER TABLE ONLY public.vendorpolicies ALTER COLUMN vendorpolicy_id SET DEFAULT nextval('public.vendorpolicies_vendorpolicy_id_seq'::regclass);
 M   ALTER TABLE public.vendorpolicies ALTER COLUMN vendorpolicy_id DROP DEFAULT;
       public          postgres    false    283    284    284                       2604    50560    vendorproductorder order_id    DEFAULT     �   ALTER TABLE ONLY public.vendorproductorder ALTER COLUMN order_id SET DEFAULT nextval('public.vendorproductorder_order_id_seq'::regclass);
 J   ALTER TABLE public.vendorproductorder ALTER COLUMN order_id DROP DEFAULT;
       public          postgres    false    259    258                       2604    50561 
   vendors id    DEFAULT     h   ALTER TABLE ONLY public.vendors ALTER COLUMN id SET DEFAULT nextval('public.vendors_id_seq'::regclass);
 9   ALTER TABLE public.vendors ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    261    260                       2604    50562    vendors_notifications id    DEFAULT     �   ALTER TABLE ONLY public.vendors_notifications ALTER COLUMN id SET DEFAULT nextval('public.vendors_notifications_id_seq'::regclass);
 G   ALTER TABLE public.vendors_notifications ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    263    262                       2604    50563    withdrawals withdrawal_id    DEFAULT     �   ALTER TABLE ONLY public.withdrawals ALTER COLUMN withdrawal_id SET DEFAULT nextval('public.withdrawals_withdrawal_id_seq'::regclass);
 H   ALTER TABLE public.withdrawals ALTER COLUMN withdrawal_id DROP DEFAULT;
       public          postgres    false    265    264            �          0    42678    apploadingscreen 
   TABLE DATA           >   COPY public.apploadingscreen (id, apploading_url) FROM stdin;
    public          postgres    false    288   ;�      ;          0    16731 
   attributes 
   TABLE DATA           k   COPY public.attributes (attribute_id, attribute_name, attribute_values, category, subcategory) FROM stdin;
    public          postgres    false    216   ��      =          0    16737    audioheadphones 
   TABLE DATA           r  COPY public.audioheadphones (product_ah_id, ad_title, currency_symbol, city, state, country, brand, category, vendorid, is_featured, is_sold, is_negotiable, created_at, rejection_reason, status, updated_at_product, uniquepid, category_type, subcategory, condition, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, driversize, impedance, frequencyrange, additionaldescription, searchkeywords, keyfeatures, videourl, salespackage, isvariant, quantity, postalcode, inthebox, images) FROM stdin;
    public          postgres    false    218   ��      ?          0    16748    cameraphotography 
   TABLE DATA           �  COPY public.cameraphotography (product_cp_id, ad_title, currency_symbol, city, state, country, brand, category, vendorid, is_featured, is_sold, is_negotiable, created_at, subcategory, rejection_reason, status, updated_at_product, uniquepid, category_type, condition, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, modelname, storagetype, storagecapacity, displaysize, screenresolution, connectivityports, batterylife, dimensions, weight, warrantyinformation, additionaldescription, searchkeywords, keyfeatures, videourl, salespackage, isvariant, quantity, postalcode, inthebox, images) FROM stdin;
    public          postgres    false    220   ��      A          0    16759    cart 
   TABLE DATA           �   COPY public.cart (cart_id, customer_id, vendor_id, product_uniqueid, category, subcategory, quantity, addeddate, updateddate, variantlabel, mrp, sellingprice) FROM stdin;
    public          postgres    false    222   �      C          0    16767 
   categories 
   TABLE DATA           �   COPY public.categories (category_id, category_name, category_description, category_image_url, category_status, created_at, updated_at, category_type, attribute_cat_id) FROM stdin;
    public          postgres    false    224   ,�      E          0    16776    clothing 
   TABLE DATA           q  COPY public.clothing (product_fac_id, ad_title, additionaldescription, countryoforigin, manufacturername, packerdetails, searchkeywords, keyfeatures, videourl, salespackage, city, state, mrp, sellingprice, quantity, inthebox, isvariant, status, category_type, currency_symbol, uniquepid, vendorid, postalcode, country, category, subcategory, skuid, images) FROM stdin;
    public          postgres    false    226   X�      v          0    17600    conversations 
   TABLE DATA           h   COPY public.conversations (conversation_id, customer_id, vendor_id, conversation_user_type) FROM stdin;
    public          postgres    false    275   �      F          0    16782    coupons 
   TABLE DATA           �   COPY public.coupons (coupon_id, coupon_code, discount_type, discount_amount, expiration_date, vendorid, associated_products, created_date) FROM stdin;
    public          postgres    false    227   W�      H          0    16788    currency_values 
   TABLE DATA           K   COPY public.currency_values (id, usd, kes, eur, etb, sos, inr) FROM stdin;
    public          postgres    false    229   ��      p          0    17057    customer_address 
   TABLE DATA             COPY public.customer_address (address_id, customer_id, given_name_address, family_name_address, email_address, phone_address, country_address, zip_address, city_address, subregion_address, region_address, note_address, default_address, apt_address, phone_code) FROM stdin;
    public          postgres    false    269   ��      J          0    16794    customer_delivery_address 
   TABLE DATA           �   COPY public.customer_delivery_address (id, customer_id, first_name, last_name, selected_country, street_address, apartment, selected_city, selected_state, zip_code, email, phone_number, orderid, unique_order_id) FROM stdin;
    public          postgres    false    231   ^�      L          0    16800    customer_follows 
   TABLE DATA           ]   COPY public.customer_follows (follow_id, follower_id, following_id, follow_date) FROM stdin;
    public          postgres    false    233   {�      �          0    42692    customer_transactions 
   TABLE DATA           �   COPY public.customer_transactions (transaction_id, customer_id, datetime, description, amount, closing_balance, wallet_txn_id, send_to_user, invoiceid, status, transaction_wallet_id) FROM stdin;
    public          postgres    false    290   ��      N          0    16805    customer_wishlist 
   TABLE DATA           �   COPY public.customer_wishlist (wishlist_id, customer_id, uniqueid, label, category, subcategory, vendor_id, mrp, sellingprice, created_on) FROM stdin;
    public          postgres    false    235   $�      �          0    50434    customerclaim 
   TABLE DATA           !  COPY public.customerclaim (customer_claim_id, customer_id, customer_claim_description, customer_claim_status, customer_claim_date, customer_reply_description, customer_reply_date, customer_closure_description, customer_closure_date, customer_image_files, customer_video_files) FROM stdin;
    public          postgres    false    292   A�      P          0    16811 	   customers 
   TABLE DATA           v  COPY public.customers (customer_id, given_name, family_name, email, password, phone_number, address_line_1, address_line_2, city, state, zip_code, country, bio, verified_with, created_at, updated_at, status, picture, google_id, facebook_id, verification_code, verification_expire_date, customer_loggedid, customer_interest, mogadishudistrict_customer, nile_pin) FROM stdin;
    public          postgres    false    237   x�      n          0    17047 
   homebanner 
   TABLE DATA           A   COPY public.homebanner (id, banner_url, title, link) FROM stdin;
    public          postgres    false    267   �      S          0    16821    laptopcomputers 
   TABLE DATA           #  COPY public.laptopcomputers (product_lc_id, ad_title, currency_symbol, city, state, country, brand, category, vendorid, is_featured, is_sold, is_negotiable, created_at, subcategory, rejection_reason, status, updated_at_product, uniquepid, category_type, condition, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, additionaldescription, searchkeywords, salespackage, keyfeatures, videourl, modelname, processor, ram, storagetype, storagecapacity, displaysize, screenresolution, graphicscard, operatingsystem, connectivityports, batterylife, keyboardtype, touchpad, dimensions, weight, warrantyinformation, isvariant, quantity, postalcode, inthebox, images) FROM stdin;
    public          postgres    false    240   �      }          0    34030    media_library 
   TABLE DATA           j   COPY public.media_library (media_id, title, description, file_path, creation_date, vendor_id) FROM stdin;
    public          postgres    false    282   �      x          0    17619    messages 
   TABLE DATA           y   COPY public.messages (message_id, conversation_id, sender_id, recipient_id, content, user_type, "timestamp") FROM stdin;
    public          postgres    false    277   �	      U          0    16832    mobileelectronics 
   TABLE DATA             COPY public.mobileelectronics (product_me_id, ad_title, created_at, updated_at, city, state, country, currency_symbol, category, subcategory, condition, brand, is_featured, vendorid, rejection_reason, status, uniquepid, category_type, modelname, storagetype, storagecapacity, displaysize, connectivityports, batterylife, dimensions, weight, warrantyinformation, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, additionaldescription, searchkeywords, keyfeatures, videourl, salespackage, isvariant, quantity, processor, ram, graphicscard, operatingsystem, keyboardtype, postalcode, simcard, unlockstatus, cameraresolution, inthebox, images) FROM stdin;
    public          postgres    false    242   �      t          0    17588    mobilehomebanner 
   TABLE DATA           M   COPY public.mobilehomebanner (id, mobilebanner_url, title, link) FROM stdin;
    public          postgres    false    273   T      V          0    16841    payments 
   TABLE DATA           �   COPY public.payments (payment_id, customer_id, order_id, payment_date, payment_method, payment_amount, payment_status, billing_address, billing_city, billing_state, billing_zip, currency_code, payment_source, vendor_id) FROM stdin;
    public          postgres    false    243   �      Y          0    16848    products 
   TABLE DATA             COPY public.products (id, ad_title, city, state, country, currency_symbol, category, subcategory, vendorid, uniquepid, skuid, mrp, sellingprice, countryoforigin, manufacturername, packerdetails, additionaldescription, searchkeywords, keyfeatures, videourl, category_type, quantity, postalcode, salespackage, brand, condition, isvariant, status, updated_at_product, rejection_reason, slug_subcat, slug_cat, images, attributes_specification, prod_slug, width, length, height, weight, product_ship_from, estimate_delivery_by, nested_subcat, nested_subcat_slug, additonal_condition, mogadishudistrict_ship_from, product_policy_id) FROM stdin;
    public          postgres    false    246   �      [          0    16855    ratings_and_reviews 
   TABLE DATA           �   COPY public.ratings_and_reviews (id, vendor_id, customer_id, rating, review_text, medias, created_at, product_uniqueid, label, rate_order_id) FROM stdin;
    public          postgres    false    248   �      �          0    50568    return_order 
   TABLE DATA           u   COPY public.return_order (return_id, reason_return, order_id, medias_return, detail_text, return_status) FROM stdin;
    public          postgres    false    294   }      ]          0    16861    social_logins 
   TABLE DATA           Z   COPY public.social_logins (login_id, customer_id, provider, provider_user_id) FROM stdin;
    public          postgres    false    250   �      _          0    16865    subcategories 
   TABLE DATA           �   COPY public.subcategories (subcategory_id, subcategory_name, subcategory_description, subcategory_image_url, parent_category_id, created_at, updated_at, isfeatured, subcat_status, nested_subcategories) FROM stdin;
    public          postgres    false    252   �      a          0    16873 
   superadmin 
   TABLE DATA           j   COPY public.superadmin (id, email, password, "userId", role_id, "position", name, secret_key) FROM stdin;
    public          postgres    false    254   )      z          0    17676    transactions 
   TABLE DATA           �   COPY public.transactions (id, transaction_id, customer_id, transaction_external_id, amount, currency_code, transaction_date, is_verified, verification_date, payment_method, notes) FROM stdin;
    public          postgres    false    279   +      c          0    16879    variantproducts 
   TABLE DATA           �   COPY public.variantproducts (variant_id, product_uniqueid, variant_mrp, variant_sellingprice, variant_skuid, variant_quantity, variantsvalues, label, vendori_id, variant_category, variant_subcategory) FROM stdin;
    public          postgres    false    256   8+      �          0    58625    vendor_product_policies 
   TABLE DATA           �   COPY public.vendor_product_policies (policy_id, vendor_id, policy_name, policy_type, policy_description, policy_status, policy_created_date) FROM stdin;
    public          postgres    false    296    -      �          0    42480    vendorbulkupload 
   TABLE DATA           \   COPY public.vendorbulkupload (bulk_id, vendor_id, productids, datetime, status) FROM stdin;
    public          postgres    false    286   c-      r          0    17517    vendorclaim 
   TABLE DATA           �   COPY public.vendorclaim (claim_id, vendor_id, claim_description, claim_status, claim_date, reply_description, reply_date, closure_description, closure_date, image_files, video_files) FROM stdin;
    public          postgres    false    271   /                0    42469    vendorpolicies 
   TABLE DATA           z   COPY public.vendorpolicies (vendorpolicy_id, shipping_information, return_policy, business_policy, vendor_id) FROM stdin;
    public          postgres    false    284   \0      e          0    16885    vendorproductorder 
   TABLE DATA           ,  COPY public.vendorproductorder (order_id, vendor_id, product_uniqueid, customer_id, total_amount, order_status, rejection_reason, product_name, customer_name, product_image, customer_email, customer_phone_number, currency_symbol, payment_method, payment_status, city, state, country, brand, category, subcategory, product_type, transaction_id, commission_fee, withdrawal_amount, refund_amount, fees_paid, tax_collected, orderid, quantity, label, tentative_delivery_date, skuid_order, ispickup, seller_otp, customer_otp, order_date, created_at) FROM stdin;
    public          postgres    false    258   �0      g          0    16893    vendors 
   TABLE DATA           �  COPY public.vendors (id, country_code, mobile_number, email, password, brand_name, business_model, products, trademark_certificate, company_name, company_city, company_state, company_country, company_zip_code, shipping_address, bank_name, bank_account_number, bank_routing_number, bank_account_name, bank_branch, bank_swift_code, registration_date, mobile_verification_status, email_verification_status, status, business_type, registration_number, tax_id_number, business_address, business_phone, business_email, business_website, business_description, facebook_url, instagram_url, twitter_url, linkedin_url, business_logo_url, business_license_url, return_policy, shipping_policy, terms_and_conditions, payment_info, shipping_info, support_contact, categories, average_rating, total_products, total_sales, support_contact_1, support_contact_2, vendor_profile_picture_url, brand_logo, useridvendor, vendorname, email_otp, mobile_otp, reset_otp, followers, following, vendor_username, company_district) FROM stdin;
    public          postgres    false    260   �0      i          0    16900    vendors_notifications 
   TABLE DATA           Z   COPY public.vendors_notifications (id, vendor_id, type, title, message, date) FROM stdin;
    public          postgres    false    262   6      k          0    16906    withdrawals 
   TABLE DATA           �   COPY public.withdrawals (withdrawal_id, vendor_id, currency_code, amount, withdrawal_date, status, bank_account_number, bank_name, bank_branch, created_at, updated_at) FROM stdin;
    public          postgres    false    264   �9      �           0    0    apploadingscreen_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.apploadingscreen_id_seq', 1, false);
          public          postgres    false    287            �           0    0    attributes_attribute_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.attributes_attribute_id_seq', 41, true);
          public          postgres    false    217            �           0    0 "   audio_headphones_product_ah_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.audio_headphones_product_ah_id_seq', 45, true);
          public          postgres    false    219            �           0    0 $   camera_photography_product_cp_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.camera_photography_product_cp_id_seq', 41, true);
          public          postgres    false    221            �           0    0    cart_cart_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.cart_cart_id_seq', 788, true);
          public          postgres    false    223            �           0    0    categories_category_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.categories_category_id_seq', 139, true);
          public          postgres    false    225            �           0    0 !   conversations_conversation_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.conversations_conversation_id_seq', 8, true);
          public          postgres    false    274            �           0    0    coupons_coupon_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.coupons_coupon_id_seq', 9, true);
          public          postgres    false    228            �           0    0    currency_values_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.currency_values_id_seq', 1, true);
          public          postgres    false    230            �           0    0    customer_address_address_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.customer_address_address_id_seq', 38, true);
          public          postgres    false    268            �           0    0     customer_delivery_address_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.customer_delivery_address_id_seq', 194, true);
          public          postgres    false    232            �           0    0    customer_follows_follow_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.customer_follows_follow_id_seq', 19, true);
          public          postgres    false    234            �           0    0 (   customer_transactions_transaction_id_seq    SEQUENCE SET     V   SELECT pg_catalog.setval('public.customer_transactions_transaction_id_seq', 5, true);
          public          postgres    false    289            �           0    0 !   customer_wishlist_wishlist_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.customer_wishlist_wishlist_id_seq', 141, true);
          public          postgres    false    236            �           0    0 #   customerclaim_customer_claim_id_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.customerclaim_customer_claim_id_seq', 36, true);
          public          postgres    false    291            �           0    0    customers_customer_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.customers_customer_id_seq', 184, true);
          public          postgres    false    238            �           0    0 "   fashionclothing_product_fac_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.fashionclothing_product_fac_id_seq', 8, true);
          public          postgres    false    239            �           0    0    homebanner_new_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.homebanner_new_id_seq', 10, true);
          public          postgres    false    266            �           0    0 !   laptopcomputers_product_lc_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.laptopcomputers_product_lc_id_seq', 121, true);
          public          postgres    false    241            �           0    0    media_library_media_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.media_library_media_id_seq', 3774, true);
          public          postgres    false    281            �           0    0    messages_message_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.messages_message_id_seq', 194, true);
          public          postgres    false    276            �           0    0    mobilehomebanner_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.mobilehomebanner_id_seq', 10, true);
          public          postgres    false    272            �           0    0    payments_payment_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.payments_payment_id_seq', 94, true);
          public          postgres    false    244            �           0    0 ,   product_mobile_electronics_product_me_id_seq    SEQUENCE SET     \   SELECT pg_catalog.setval('public.product_mobile_electronics_product_me_id_seq', 365, true);
          public          postgres    false    245            �           0    0    products_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.products_id_seq', 101705, true);
          public          postgres    false    247            �           0    0    ratings_and_reviews_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.ratings_and_reviews_id_seq', 155, true);
          public          postgres    false    249            �           0    0    return_order_return_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.return_order_return_id_seq', 26, true);
          public          postgres    false    293            �           0    0    social_logins_login_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.social_logins_login_id_seq', 1, false);
          public          postgres    false    251            �           0    0     subcategories_subcategory_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.subcategories_subcategory_id_seq', 224, true);
          public          postgres    false    253            �           0    0    superadmin_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.superadmin_id_seq', 23, true);
          public          postgres    false    255            �           0    0    transactions_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.transactions_id_seq', 15, true);
          public          postgres    false    278            �           0    0    transactions_id_seqs    SEQUENCE SET     C   SELECT pg_catalog.setval('public.transactions_id_seqs', 15, true);
          public          postgres    false    280            �           0    0    variantproducts_variant_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.variantproducts_variant_id_seq', 277, true);
          public          postgres    false    257            �           0    0 %   vendor_product_policies_policy_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.vendor_product_policies_policy_id_seq', 1, true);
          public          postgres    false    295            �           0    0    vendorbulkupload_bulk_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.vendorbulkupload_bulk_id_seq', 531, true);
          public          postgres    false    285            �           0    0    vendorclaim_claim_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.vendorclaim_claim_id_seq', 17, true);
          public          postgres    false    270            �           0    0 "   vendorpolicies_vendorpolicy_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.vendorpolicies_vendorpolicy_id_seq', 2, true);
          public          postgres    false    283            �           0    0    vendorproductorder_order_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.vendorproductorder_order_id_seq', 239, true);
          public          postgres    false    259            �           0    0    vendors_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.vendors_id_seq', 69, true);
          public          postgres    false    261            �           0    0    vendors_notifications_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.vendors_notifications_id_seq', 85, true);
          public          postgres    false    263            �           0    0    withdrawals_withdrawal_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.withdrawals_withdrawal_id_seq', 6, true);
          public          postgres    false    265            �           2606    42685 &   apploadingscreen apploadingscreen_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.apploadingscreen
    ADD CONSTRAINT apploadingscreen_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.apploadingscreen DROP CONSTRAINT apploadingscreen_pkey;
       public            postgres    false    288            =           2606    16938    attributes attributes_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.attributes
    ADD CONSTRAINT attributes_pkey PRIMARY KEY (attribute_id);
 D   ALTER TABLE ONLY public.attributes DROP CONSTRAINT attributes_pkey;
       public            postgres    false    216            ?           2606    16940 %   audioheadphones audio_headphones_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.audioheadphones
    ADD CONSTRAINT audio_headphones_pkey PRIMARY KEY (product_ah_id);
 O   ALTER TABLE ONLY public.audioheadphones DROP CONSTRAINT audio_headphones_pkey;
       public            postgres    false    218            A           2606    16942 )   cameraphotography camera_photography_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.cameraphotography
    ADD CONSTRAINT camera_photography_pkey PRIMARY KEY (product_cp_id);
 S   ALTER TABLE ONLY public.cameraphotography DROP CONSTRAINT camera_photography_pkey;
       public            postgres    false    220            C           2606    16944    cart cart_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (cart_id);
 8   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_pkey;
       public            postgres    false    222            E           2606    16946    categories categories_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public            postgres    false    224            �           2606    17607 5   conversations conversations_customer_id_vendor_id_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_customer_id_vendor_id_key UNIQUE (customer_id, vendor_id);
 _   ALTER TABLE ONLY public.conversations DROP CONSTRAINT conversations_customer_id_vendor_id_key;
       public            postgres    false    275    275            �           2606    17605     conversations conversations_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_pkey PRIMARY KEY (conversation_id);
 J   ALTER TABLE ONLY public.conversations DROP CONSTRAINT conversations_pkey;
       public            postgres    false    275            I           2606    16948    coupons coupons_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_pkey PRIMARY KEY (coupon_id);
 >   ALTER TABLE ONLY public.coupons DROP CONSTRAINT coupons_pkey;
       public            postgres    false    227            K           2606    16950 $   currency_values currency_values_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.currency_values
    ADD CONSTRAINT currency_values_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.currency_values DROP CONSTRAINT currency_values_pkey;
       public            postgres    false    229            |           2606    17064 &   customer_address customer_address_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.customer_address
    ADD CONSTRAINT customer_address_pkey PRIMARY KEY (address_id);
 P   ALTER TABLE ONLY public.customer_address DROP CONSTRAINT customer_address_pkey;
       public            postgres    false    269            M           2606    16952 8   customer_delivery_address customer_delivery_address_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public.customer_delivery_address
    ADD CONSTRAINT customer_delivery_address_pkey PRIMARY KEY (id);
 b   ALTER TABLE ONLY public.customer_delivery_address DROP CONSTRAINT customer_delivery_address_pkey;
       public            postgres    false    231            O           2606    16954 &   customer_follows customer_follows_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.customer_follows
    ADD CONSTRAINT customer_follows_pkey PRIMARY KEY (follow_id);
 P   ALTER TABLE ONLY public.customer_follows DROP CONSTRAINT customer_follows_pkey;
       public            postgres    false    233            �           2606    42699 0   customer_transactions customer_transactions_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public.customer_transactions
    ADD CONSTRAINT customer_transactions_pkey PRIMARY KEY (transaction_id);
 Z   ALTER TABLE ONLY public.customer_transactions DROP CONSTRAINT customer_transactions_pkey;
       public            postgres    false    290            Q           2606    16956 (   customer_wishlist customer_wishlist_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.customer_wishlist
    ADD CONSTRAINT customer_wishlist_pkey PRIMARY KEY (wishlist_id);
 R   ALTER TABLE ONLY public.customer_wishlist DROP CONSTRAINT customer_wishlist_pkey;
       public            postgres    false    235            �           2606    50443     customerclaim customerclaim_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.customerclaim
    ADD CONSTRAINT customerclaim_pkey PRIMARY KEY (customer_claim_id);
 J   ALTER TABLE ONLY public.customerclaim DROP CONSTRAINT customerclaim_pkey;
       public            postgres    false    292            T           2606    16958    customers customers_email_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_email_key UNIQUE (email);
 G   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_email_key;
       public            postgres    false    237            V           2606    16960    customers customers_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (customer_id);
 B   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_pkey;
       public            postgres    false    237            G           2606    16962    clothing fashionclothing_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.clothing
    ADD CONSTRAINT fashionclothing_pkey PRIMARY KEY (product_fac_id);
 G   ALTER TABLE ONLY public.clothing DROP CONSTRAINT fashionclothing_pkey;
       public            postgres    false    226            z           2606    17054    homebanner homebanner_new_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.homebanner
    ADD CONSTRAINT homebanner_new_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.homebanner DROP CONSTRAINT homebanner_new_pkey;
       public            postgres    false    267            X           2606    16964 $   laptopcomputers laptopcomputers_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.laptopcomputers
    ADD CONSTRAINT laptopcomputers_pkey PRIMARY KEY (product_lc_id);
 N   ALTER TABLE ONLY public.laptopcomputers DROP CONSTRAINT laptopcomputers_pkey;
       public            postgres    false    240            �           2606    34038     media_library media_library_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.media_library
    ADD CONSTRAINT media_library_pkey PRIMARY KEY (media_id);
 J   ALTER TABLE ONLY public.media_library DROP CONSTRAINT media_library_pkey;
       public            postgres    false    282            �           2606    17627    messages messages_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (message_id);
 @   ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_pkey;
       public            postgres    false    277            �           2606    17598 &   mobilehomebanner mobilehomebanner_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.mobilehomebanner
    ADD CONSTRAINT mobilehomebanner_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.mobilehomebanner DROP CONSTRAINT mobilehomebanner_pkey;
       public            postgres    false    273            �           2606    50577    return_order order_id_unique 
   CONSTRAINT     [   ALTER TABLE ONLY public.return_order
    ADD CONSTRAINT order_id_unique UNIQUE (order_id);
 F   ALTER TABLE ONLY public.return_order DROP CONSTRAINT order_id_unique;
       public            postgres    false    294            \           2606    16966    payments payments_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (payment_id);
 @   ALTER TABLE ONLY public.payments DROP CONSTRAINT payments_pkey;
       public            postgres    false    243            Z           2606    16968 1   mobileelectronics product_mobile_electronics_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public.mobileelectronics
    ADD CONSTRAINT product_mobile_electronics_pkey PRIMARY KEY (product_me_id);
 [   ALTER TABLE ONLY public.mobileelectronics DROP CONSTRAINT product_mobile_electronics_pkey;
       public            postgres    false    242            ^           2606    16970    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    246            d           2606    16972 ,   ratings_and_reviews ratings_and_reviews_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.ratings_and_reviews
    ADD CONSTRAINT ratings_and_reviews_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.ratings_and_reviews DROP CONSTRAINT ratings_and_reviews_pkey;
       public            postgres    false    248            �           2606    50575    return_order return_order_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.return_order
    ADD CONSTRAINT return_order_pkey PRIMARY KEY (return_id);
 H   ALTER TABLE ONLY public.return_order DROP CONSTRAINT return_order_pkey;
       public            postgres    false    294            f           2606    16974 4   social_logins social_logins_customer_id_provider_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.social_logins
    ADD CONSTRAINT social_logins_customer_id_provider_key UNIQUE (customer_id, provider);
 ^   ALTER TABLE ONLY public.social_logins DROP CONSTRAINT social_logins_customer_id_provider_key;
       public            postgres    false    250    250            h           2606    16976     social_logins social_logins_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.social_logins
    ADD CONSTRAINT social_logins_pkey PRIMARY KEY (login_id);
 J   ALTER TABLE ONLY public.social_logins DROP CONSTRAINT social_logins_pkey;
       public            postgres    false    250            j           2606    16978     subcategories subcategories_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.subcategories
    ADD CONSTRAINT subcategories_pkey PRIMARY KEY (subcategory_id);
 J   ALTER TABLE ONLY public.subcategories DROP CONSTRAINT subcategories_pkey;
       public            postgres    false    252            l           2606    16980    superadmin superadmin_email_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.superadmin
    ADD CONSTRAINT superadmin_email_key UNIQUE (email);
 I   ALTER TABLE ONLY public.superadmin DROP CONSTRAINT superadmin_email_key;
       public            postgres    false    254            n           2606    16982    superadmin superadmin_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.superadmin
    ADD CONSTRAINT superadmin_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.superadmin DROP CONSTRAINT superadmin_pkey;
       public            postgres    false    254            �           2606    17688    transactions transactions_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.transactions DROP CONSTRAINT transactions_pkey;
       public            postgres    false    279            `           2606    34053    products unique_skuid_vendorid 
   CONSTRAINT     d   ALTER TABLE ONLY public.products
    ADD CONSTRAINT unique_skuid_vendorid UNIQUE (skuid, vendorid);
 H   ALTER TABLE ONLY public.products DROP CONSTRAINT unique_skuid_vendorid;
       public            postgres    false    246    246            p           2606    16984 $   variantproducts variantproducts_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.variantproducts
    ADD CONSTRAINT variantproducts_pkey PRIMARY KEY (variant_id);
 N   ALTER TABLE ONLY public.variantproducts DROP CONSTRAINT variantproducts_pkey;
       public            postgres    false    256            �           2606    58633 4   vendor_product_policies vendor_product_policies_pkey 
   CONSTRAINT     y   ALTER TABLE ONLY public.vendor_product_policies
    ADD CONSTRAINT vendor_product_policies_pkey PRIMARY KEY (policy_id);
 ^   ALTER TABLE ONLY public.vendor_product_policies DROP CONSTRAINT vendor_product_policies_pkey;
       public            postgres    false    296            �           2606    42488 &   vendorbulkupload vendorbulkupload_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.vendorbulkupload
    ADD CONSTRAINT vendorbulkupload_pkey PRIMARY KEY (bulk_id);
 P   ALTER TABLE ONLY public.vendorbulkupload DROP CONSTRAINT vendorbulkupload_pkey;
       public            postgres    false    286            ~           2606    17526    vendorclaim vendorclaim_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.vendorclaim
    ADD CONSTRAINT vendorclaim_pkey PRIMARY KEY (claim_id);
 F   ALTER TABLE ONLY public.vendorclaim DROP CONSTRAINT vendorclaim_pkey;
       public            postgres    false    271            �           2606    42476 "   vendorpolicies vendorpolicies_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.vendorpolicies
    ADD CONSTRAINT vendorpolicies_pkey PRIMARY KEY (vendorpolicy_id);
 L   ALTER TABLE ONLY public.vendorpolicies DROP CONSTRAINT vendorpolicies_pkey;
       public            postgres    false    284            r           2606    16986 *   vendorproductorder vendorproductorder_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.vendorproductorder
    ADD CONSTRAINT vendorproductorder_pkey PRIMARY KEY (order_id);
 T   ALTER TABLE ONLY public.vendorproductorder DROP CONSTRAINT vendorproductorder_pkey;
       public            postgres    false    258            v           2606    16988 0   vendors_notifications vendors_notifications_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.vendors_notifications
    ADD CONSTRAINT vendors_notifications_pkey PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public.vendors_notifications DROP CONSTRAINT vendors_notifications_pkey;
       public            postgres    false    262            t           2606    16990    vendors vendors_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.vendors
    ADD CONSTRAINT vendors_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.vendors DROP CONSTRAINT vendors_pkey;
       public            postgres    false    260            x           2606    16992    withdrawals withdrawals_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.withdrawals
    ADD CONSTRAINT withdrawals_pkey PRIMARY KEY (withdrawal_id);
 F   ALTER TABLE ONLY public.withdrawals DROP CONSTRAINT withdrawals_pkey;
       public            postgres    false    264            a           1259    16993    idx_customer_id    INDEX     V   CREATE INDEX idx_customer_id ON public.ratings_and_reviews USING btree (customer_id);
 #   DROP INDEX public.idx_customer_id;
       public            postgres    false    248            �           1259    42705 %   idx_customer_transactions_customer_id    INDEX     n   CREATE INDEX idx_customer_transactions_customer_id ON public.customer_transactions USING btree (customer_id);
 9   DROP INDEX public.idx_customer_transactions_customer_id;
       public            postgres    false    290            �           1259    42706 "   idx_customer_transactions_datetime    INDEX     h   CREATE INDEX idx_customer_transactions_datetime ON public.customer_transactions USING btree (datetime);
 6   DROP INDEX public.idx_customer_transactions_datetime;
       public            postgres    false    290            R           1259    16994 !   idx_customer_wishlist_customer_id    INDEX     f   CREATE INDEX idx_customer_wishlist_customer_id ON public.customer_wishlist USING btree (customer_id);
 5   DROP INDEX public.idx_customer_wishlist_customer_id;
       public            postgres    false    235            �           1259    17694    idx_transaction_external_id    INDEX     g   CREATE INDEX idx_transaction_external_id ON public.transactions USING btree (transaction_external_id);
 /   DROP INDEX public.idx_transaction_external_id;
       public            postgres    false    279            b           1259    16995    idx_vendor_id    INDEX     R   CREATE INDEX idx_vendor_id ON public.ratings_and_reviews USING btree (vendor_id);
 !   DROP INDEX public.idx_vendor_id;
       public            postgres    false    248            �           2606    17001    cart cart_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 D   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_customer_id_fkey;
       public          postgres    false    222    4950    237            �           2606    17006    cart cart_vendor_id_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);
 B   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_vendor_id_fkey;
       public          postgres    false    260    222    4980            �           2606    17608 ,   conversations conversations_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 V   ALTER TABLE ONLY public.conversations DROP CONSTRAINT conversations_customer_id_fkey;
       public          postgres    false    237    275    4950            �           2606    17613 *   conversations conversations_vendor_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);
 T   ALTER TABLE ONLY public.conversations DROP CONSTRAINT conversations_vendor_id_fkey;
       public          postgres    false    275    260    4980            �           2606    17011 2   customer_follows customer_follows_follower_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer_follows
    ADD CONSTRAINT customer_follows_follower_id_fkey FOREIGN KEY (follower_id) REFERENCES public.customers(customer_id) ON DELETE CASCADE;
 \   ALTER TABLE ONLY public.customer_follows DROP CONSTRAINT customer_follows_follower_id_fkey;
       public          postgres    false    237    233    4950            �           2606    17016 3   customer_follows customer_follows_following_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer_follows
    ADD CONSTRAINT customer_follows_following_id_fkey FOREIGN KEY (follower_id) REFERENCES public.customers(customer_id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.customer_follows DROP CONSTRAINT customer_follows_following_id_fkey;
       public          postgres    false    4950    237    233            �           2606    17021 4   customer_wishlist customer_wishlist_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer_wishlist
    ADD CONSTRAINT customer_wishlist_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 ^   ALTER TABLE ONLY public.customer_wishlist DROP CONSTRAINT customer_wishlist_customer_id_fkey;
       public          postgres    false    4950    237    235            �           2606    50444 ,   customerclaim customerclaim_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customerclaim
    ADD CONSTRAINT customerclaim_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 V   ALTER TABLE ONLY public.customerclaim DROP CONSTRAINT customerclaim_customer_id_fkey;
       public          postgres    false    4950    237    292            �           2606    17689    transactions fk_customer    FK CONSTRAINT     �   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id) ON DELETE CASCADE;
 B   ALTER TABLE ONLY public.transactions DROP CONSTRAINT fk_customer;
       public          postgres    false    4950    237    279            �           2606    42700 !   customer_transactions fk_customer    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer_transactions
    ADD CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 K   ALTER TABLE ONLY public.customer_transactions DROP CONSTRAINT fk_customer;
       public          postgres    false    290    237    4950            �           2606    17628 &   messages messages_conversation_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(conversation_id);
 P   ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_conversation_id_fkey;
       public          postgres    false    4996    275    277            �           2606    17026 ,   social_logins social_logins_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.social_logins
    ADD CONSTRAINT social_logins_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 V   ALTER TABLE ONLY public.social_logins DROP CONSTRAINT social_logins_customer_id_fkey;
       public          postgres    false    250    237    4950            �           2606    17031 3   subcategories subcategories_parent_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.subcategories
    ADD CONSTRAINT subcategories_parent_category_id_fkey FOREIGN KEY (parent_category_id) REFERENCES public.categories(category_id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.subcategories DROP CONSTRAINT subcategories_parent_category_id_fkey;
       public          postgres    false    4933    224    252            �           2606    17527 &   vendorclaim vendorclaim_vendor_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.vendorclaim
    ADD CONSTRAINT vendorclaim_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);
 P   ALTER TABLE ONLY public.vendorclaim DROP CONSTRAINT vendorclaim_vendor_id_fkey;
       public          postgres    false    271    260    4980            �   >   x�3�t,(��OL��K/N.JM��5470167��0567����IU(.�I,��K�L����� �p)      ;   [   x�31�άJ嬎��	�����V
N�HLILR�Qr�IM.)���L.VpqqT�J''�*\��b�L9�]9�Ad���c���� �S&�      =   �  x��UMo�@=/�bO=�����R���Ur�S]j��q�FQ�{gY'nWJ*U�.�<�7o��nV69�6}G.�ə-����fmɧ6+-�v�y���ͺk�yO�!?��3.B`! �"e"�Akɝ'6�2I��R�4F '\��˺ˮ曞���ʎ��s�-���{J��yF ]��"�p3��yo��3�%�����.�ki~��'v�	���>�	�!�?�rO8_8е�ȴ�\"{�d�i��@
���'��P��)�X*x�t$�Q�3��f�+�<sx�6o�+Xv|��	س�?>�zQ/*RW�=�ٺ���Q��]��ݠ�ᛕv7ނN�J����^ۍ]C�l��H<"��o��8D8���!GD;�.fHW�R��T����1���	�X�:�'ru�o�'��Nht'�@�z\��G!�A�C��ն(�bU^䑸���*Ǔ��:�w%x�����k>/�t{:�c E�5��`"-���D�s����#��]����ϳ�=(}#̨|����U��K״��H^�Sq�BIlֻV�Lq�*�9J$�[�] %i���M�6+����1�S�BDB0	��H��Ib���!��+R0\7�f4~?�f�eyN4��?]=���sa[:-lfg/e@J��E��X�{m(4��L��9`V8�]G�'h����jo/j49�p�O�0(#Q�$���C�-�L��ly\DA�fc      ?   #  x��QMO�0=���'n�b7���!!�4q��k
ݒ�SS�⿓��I�ʓ��؎�"��l�qy���Gv�42�Z��@^�����nZT��a��,AL���j�l(OKIuU�%ﺑ�x���<�}D0�SE,�A���;PD���������Gb�@9�����Jv�`��̨p�����W�B�\I6ڧ��!N���Y���s��$ŉ8�J�:HA<'���m�q����o�[�����j{t�[���
�P��E]c�K��2On���à��n���ViE����^      A      x������ � �      C     x��[�r�F}��O�ݪ���/|�-g7��bW틫X	KL(BE@�����Hj�!Y�L��FwO��f<���V���mVM~}��*�����n������U�VOm^�ԏm����~��n���]��lo�z���}y[5��ig���"�[���P���갩�"�۬�8墠��&gt���3pF������q�6�%��d�{�Ev]�0�gg��`"gjѭ& �R��jج�&���R�O�M���ϯ��7k�5���_�\.O��o��O�B	b��ʦ $Mg���m{���u�æ�UMsY��V
U�K��ty\�Z�nA%L[�S�l�w��f�P�5W�i���1EW�6��<��P�����n����F'�g�U�Ӫ���cLS�RP(T�^���]�^QT"�T*�K\.�����#�,��1��P6wP@��
$7�~Wh����~�]�IY�D�B(��� $�f��r{�!SHkN���W=\�P|!5�Z�>\y�k���_�~]�����bpZ���*R�����!�/A���}��ۖ���@���$�,���;��Mg�>�$��%
mw����c&�N�Q�
!|�|pß�"�l�˝�Ka��ev����;a�KF��Z��M����#����Τ l�֫�|0e��b ��6�`{���竸�r���|�
�J��R�����54.])�P�/��e�<]=3� �!b�7� $LdW�m}_��G�Eik�-^��-�i�4�*3�� ��+o�!V~ެ�'��T�R�8�lI�Q*'$�@H��~��ʠ�Vwu����a��;�TB]t���~��l�V�	�N��+��V�]�[�����vs�M����V��p�l�J�%��)�dF٬˦l��V�r]f�?k�h���Dm�M�IbsA�N@8}M֔��SL!�.U0!��Nx_�_�����g������3}i�� �r��&��,�FsZ�$����kz��f!s��KAH��7�+��.�AC�=6/�ϖ&(a�Z��P���/�ɯ e~�5�������i�]�H�`�l���N:�\Ci��z_U[��m���8[�W�~䣚X��$!���s[��i�6��j�3��t�_:[ĕ�JOM�/�$�x,3�c5I�կ�D嚉Q.�&�y���C����)(F4<�X�+f�&5��[H!�.� �W�����*��T����8���8��=i
C��91@B��f��4	�1���|��M�n$,�;�GL�tDi	e
B�X�e_�-����C��0*Q;F�.�%���՟�_���8�R��'3�N�#�@�TS]�.|ï����4��|Ō�"��r�M�	T�to�\P݂"��\(C�t4 (��0���}����}��������8-�mO�`^������)!��ٜ�������	�*��X�������8!4ު��j돔�YݜlH�����PN�E~+0tAIc��1��HH��z��)���v]�������Z�|�}\0S�ZpC����|B(�U��b�lg�Y�����twg�#�SՆZ+N@S�]	��]��d\ר+'�8�B(4lͱ�_;���ǯ��~��~@uc��N<�~j�A� '��j����M�5�T؜RP��N�6�Q�ҟz��a)�Y���� ��3$����85���'�AS&(��2�������(�����*ʤ�� �q+�q)��-����TT��2��$����M	*t' ���de�����j�¤|i�U��D:��KA�U������I:e�'7��w��P�Beh���8I�cW�D&Q�!M�+�/T
v���G�JW�X9:��#W�6jz��fA���0IدS��PGʵ��}�@��MAȪB�Eܸ�>���r�\���(i:v
�K ���V�Pl�8��(KA�����$���(����x\t�Nq�|�F�A!��Q���g��/+�Rbbq�4���2Cu
BT<A����BK�W!.��d�WOee�H�[��񛫰B�W!6�fK�Y��w��(�CэJèO���Կ
�"�tX���4�	J�W%��|��#QFkG؋'8�/�1+t
B��:��	R�Y��9v�BCG����#A�g%"�l�u Ѧ
�u�v��F+=�q!�d�A3V����C��'8��B��҃���T'�^��fx�B�j+���(��R�)!�K�	M�In?D�ޡ���/W��4����졣�$D����f�4���')��0�!PM�~�zZ�)��$	�"U�����v4� �d�f�%�Y��\f\9�y!��h6�Tv˹!Bj�N@�,^,�es��Eǭ�k��>�q���?`W��H���Yw2k�c�0��NA�.�g�����]�X�F���ul������a�֖���-��rʴ��D
-A
¦Eh:n[vg��°���m�l���ӧZX5Bظ��S�!��Y� l�Xק_`�ˍO���]����.[P�<��@K43ڍ:��(N��?Y_��ʹp�-���W��0��k��v�������ɛp~���q4���!Gy��u�Z(���B&�d��@�VrX��Y��K_lWO��i��~~m2T�O��IɆ�A��ة�O������~�0(G��F�A��~{�����-��7�B�	V����u a���'e���S�|�b����C�Qng¤�l?�	"�a�S����� ��m�������ʋ�HN�^�3H��Ϸ����lҲ�>`���c ��-�W��͛���#p      E   �   x�5���0���Sxb�P~WB0��K�ZIJh�� �R@��N��[b��h��7���TAt����6��Qv�O�)���=�3�64,)񫋚���3�Fmn�q�VG-��E����gwo=#��{\p9o���&PL�,��~��=�BC#Z�%���X�����1�u���[r'I��DE�      v   -   x�34�4�0�43�L.-.��M-�2� !	Yp����qqq �JV      F   -  x��S]o�@|ƿb䨒#�1&v���� q���p�Q)D'����������j�n�t3�s��BKԣ�k�4S?�uZMkjS��,[�:�S\����񷟇��h�9j;m��7��f.�ݫ���`�W������)o?��0�X9��q�Zd�nה=�z@����*�{�Wp�f��]�@n�~ Kӈ�N7]K�sL�f�^����_s1:�XӘ�ܔU����T7����M���
7���o+�!����6���g8�᩻^)���A5�/1���eUy?�~�yd��'�{Ζu�$�	\�
i�H6���,cf��6Z��9%�#�ܘ��"�ByT��a��������X�`��R�I7�bY(
�Xx<�H�5]�9"��PE���ࡒ��t%�Ky�V<�1�4�V~��y���4b.�y��� _�ߏ�������D�:K,�������ջD�9&����11s�"s�:���l9��KI��wO]�yS��)�����+����Ȁ��f{��� �~JcAY�ʃ�!~�y��?�F�v?0      H   ,   x���  �7ÕSl����01�QJw!��.���'�yv      p   ~  x��P�O�0>��{wѕu_o&b�d_x9�u�5k��_o;��of������23�0����7-���ia�R����J��qѷ�VB��PS�促$`�$���6�oi>�4<i����ݐ����2��#+]G0ߵkR��I�1�;�>&��,u8ީ�Pza��,V�Z`�"\�ؐ�s�Jx-��kmݟ�h��x�y�O�"<����K6����޾���*���aɲ|�%i^�B+�;!W[(y��H;���S���;�����t�3]�@��Y���B���S*'kr]�/��������ƥ��NF�3F��F��X��ğ�46ci�������ʴ^&<�������u9�?d�?��v0|���      J      x������ � �      L      x������ � �      �   |  x���MS�0��ʯ��G�Z}�o�z��0�3��E`.�`�����wIp"̌3�Xz��V��� �̑5��A	����[}W7�k}߮���1U�V}L+�{�����> �Ug�Mj}&��SF=��R73� �#�֖��.��e����u���bQo�U#û靥H�0��h���Xߦ�>O�S��?/�]-I��c<XERW���+�]�z�bĹU_�M����~|���c0E��ڤ�M��K==�w(�39?`�)�& *�#���"ē�l�mZ.�Ճ��lwj�n���=��[�֏za�u`r���Cƪ��bw���[�(�LST��F��AZ�J�*mt����рޞ�zzG��b�� �?�?˲����sr����{�6����럭�h1���BnF��XD�n����
9o����8�ܸ��矠�jX"NX�vI�DY� gG�0�7���𱛔����P�4���]G�pMp��܆�d��n�&�$	Q�l�-)�	�cǢ��d�iƣ��	vN��xJ�q����SYb]����c|vۦV��Z=��ʒ=��s���9`��@�8SB�sv����K1c��`�ʡ0���xW >v�)f��_�o      N      x������ � �      �   '  x��TMo�@=ۿb�s�ڏ���$B"Tq���uLo�8E����QI�� �%K�~og��S:�Oe?Cx�n}W�]�I.q��R8X(*�b�I�2�[�=���l�RN��;g�a���Y�Ȟ�ڇS�"�l1�8j~�ϰj+��P�>�=t���x��oX�'����_���sׄ��Y��G*&��Z���@ۄp��)�-�0�N����?4VqT����& b�n"5����(; ����C�������k�6��߷U���t5|��	;h�Ѕ��)��g��CYU�]�{�˾d��8֯d��)��@f�H�)m���>$�N;Bv�{	�'�z�EI
��r�l�u�'˒�CI;��ω�*)��>4�HU�e��D�H��ԉ�^#�Brf��u�ߥ�IVs>�K	B���u�X.��~�#8#�q�r�(�G9��K.V�P]�S�Ռ\<�:%�I���M!,s�ss!�0��$xf�#�n#�f3�#��%��Hq7D�L�J,�3$��B�Q��U�I���E/f��\��BiW�����-�ԠF�5�X�� �      P   a  x��Yg��H���+z��#���TH+���F;2`�`c�G�߷Lꆦ�~-0��ԩ{�܀�Zaj�Zcj���f/6fp|K��8�e�Å�]���.��GC ��_ �QCT�LJ@���6]�� ��S�O��Z�?\�+�]��5���D,��!��&g����Eo��K��Dj�Ѡ�ߵ���fv+1h�'�,2� �D
 E�QI�d�h�?>�	��
��uƮ̓�l6�\� ��s,%��L@K����1�H�_�-ی@�%�	
��%�b9���g�D��Lp ��c�� �>F!�f##�F��y� EЀ�;���;߫�1M��3&Y�VjV��BZ��Oy�y��Tg�,-����"�/,ʎ�;|��"��=����XA��!1�t�9��	h�#"nq^o�3���H�����WN�5˵�t��H���}��u�@Ъ��fUV��7ߎ��1��z+��.��BB�(����1t�%���
�2���]o�A�5Ň�o8��N�������x% �lD�� �X' J���6r�%T�f���{."�>FHr� �]�É���F.��G�7�%X��5⍏�^�b�r�
J�T�����1��J1`�ժ揷�`�?Iٍ�?K�핥�N�b�ꉋO#�DG�U �){f�F"N�"�Ύ�V6�vv���)d�E���'����Qe0̓��p1��G��yPsY�4cts�놅/ၾ��^ P����`!����!%�\�Kdl���:��)֝�B��=a��y�JQ��2F0?��t1[|�s!9���XV��|;�x%�̤�mk��:���2��h8��R�r+�aP���%i+��R�ml�Դ�k���Kce���-�@�Fc�� ����g&����Gή��슴w~[;��9^!#W���0�䵿!������\�ie��Z����ʳ������횿?̏=|��pQ8��#f: P"��"Ǿf^��`XVE��Nې(O"�Z�-I���߮{��&X��r
9�H�巫���ǝj�.�#�M��?2��������:u���Ѕ7�:����|Y!9#��Vy:G��2(�J�U�
s���G�p,C�,Dt�$��g��"H�|o�1A)GuLnA�"{m�Wg��x{>���J�uS���̈́p��B6�׼��f^�ԩ�[	��Д��#u�}fz���=4tv��&��.)n�vS��9	a�=�Z#8a��iԮ��ٔC�\�[MϽ�5 �	�g��,����2��U0����Hw�Ro-oB����=�At[W��u������vա�����4�m����S��~������4���x����RGV^��,�0�L	�g�(�a����+�<1]��$�Ke��x[R x�"��8B/DmKX�`�uB�q�j�Eb��*�a�W��=�C�-�Uj�C�=��TF/$̿R�t�G�����O������*'}���M�Z7���>�o�)�]����������&'Kߴ�Ve�=PZd�Cbi:f�ܥ2Ni�����^Yw�=�T� 3����������h��>B[�7��|�^򺛶�z�����(�6�`9Г&*7�"�[�]�C]@ )~f�BSe#���x�߶*�����š�l���F$�Y|�]�*����KMa�r���A������݆�r Ty�
�C�<��d@@���ޔ��gǻ.�<����Y�a�T����R!H�H��skݏgI�uGM���A�iv{S�ݕ�_��0Pҡc*����[�(�j����~�}�c~ל�%i�6E���nP�-�n��ѫ�e*ɧ�dc����~H��U=���O�=�D�`���wc�
�j��=Ƌ�-F���d��4%`0jx�i`s���'�����s�\ԉ��R���h��*{�]�*��U)�����v���j��h��->�߃���X��Q�S���A�${h�A:���W��㵝e[0e~s�� �Q�R��C'���FR�qLpq�K{G�<e�S���Tu�8v����D�����b�nm̎����μ��Nv�\r0[&6��aݩR'�\
J(��Y�&�cN�ܘ�d�ݓ��$�,�&;������p]�'��z��������#|oL����a���Q(&Ƹ����d-�!�k�Op͛'F�x�`����Z�cI��X!������YHT����z���1�s�GG$�&&*����k��;�4#|�o���Du��6�:P�̄�������Kj�����;3�l�7y���D٩��̥�LF)�D`�C�6S�EDkk�5��Ș(���RΗ�;� (l���R�DUʄ?3��b��ǸTmT�7��k6�bB�p�O;x[�6�q�k�$n��>�I���D�ޕuV?���1�r˽67>��Δ:˲�A?�m0nݑ^�R�TE���\n���(H�
��d��'�.��>�2@�l�+�r	������T����Z��s�*v����a|vzw�*ȎI�����o����鞥gҥ�Lt&�}�9����2sZN����{-o��t�H8.�@�,T>3]�3*ni8G	���f�_��Z�?~���w������x._j�:3_�
��(��m�5��b�ү,S����m�Kg_[�UҬgz�"ZT��������^X�쭸hz�b�oI�o#��eJp�x�`�Y��#@��ٜ.F��p�<$Jh����,�������y�@�ez�և�uӼ��e::5�/�����2��]�A�pɈ��]<Lo�L���LJ1��?e\@�ݒ^n��%�����͒_��ߪ�9���)��A����:�z3�R�'�x8f�4DK�'��|���Mx/�`����8�$TqZm}fz<:G��QjN��9��+#276�mӍe[�����s��D�n����t0�9�aHUu�	����Z����p:�u� @_���@D�ɍp�|f��/�����Lq�4��]�Ydk�A2��tO�h�e����+����pT�
F	(�q�ȩ���fa���0�tX�H��ey�K*�S��D��0Ő��2p�C/���ؗ��{"��#B9��L?5tM���k~Z��J�1�����U�^���x�*e݂�\��H %2T�K�O0��	�߾}�b��      n   �   x�e�K
�0�u�s�$�ԥ�>V�V(Q�R�&��Bo_�E���`�)k� �n�@�˹k���8+�1�|�U�S!�P�Ȣ�8艮�2�Gsc'�"\�YY�����8��P���e�g��f���{�}��~���X�T��DÜ��� �4>�      S   �  x���Qo� ǟ/�"O}Z,���-�4i�&E���/4��-̸M�i�}����Z�k�d���ο��f��Ej�I��N§;edL~h�m��;��@�p�J([ .�����X�q��y��뭛����[w�ם�o!1�Dp\��Ϊ�m��!EH���׆B�c�O�����'lcn][E���"�3��W�Ł���
E�DLRv@@����' ��/��*���h�hk��E0��C��%��������H�~���E��@�D�)ʠ�)8y�p�ލt�O���I���#/��a�k3 Ґ�0go�ƒ~��/7�?�F���/�Z�m�TyQQ�� \L�Z.K��ՙ���v���.�<���f�+gg�l���$�Y��8z�֞�62��EYb!J*����r[_Z{���K���c��י�������{�l�paV�<#��N!.((�u�N�U��4��fF?��6QE�x�}�^d���7$Ə�      }   �  x���Mo1�s�+rG���3��+@\*U%�JŒ R���q@HX\Ɨ]���xƯ���������÷���xx\ݽ]�]�^��e�*�+�F�l7O_��������t��s����C�,�ˊ�d�� 6�FV��hcXQ]sU΢�<�FS,6��A	M��DGo��������?�����/7�w�sv����$WC��G�P�ɸ��� ܅�\m]/�#W�䫫��	w8Or�<�ɵ:�Hr�b�3�6�b8pI.H"t�cj %��8��h>�Ec.hC�,�0�u�:�	4��ʖ��*�p�T��p,�*ԟ"<U�^{'�^�B�k`�E�K�
:�̤H뭣�K�
i�p�,}G.*���3�����p!X2T�����N��X!���)�v�ί���aTj2T�	�����5*�*��:'M���!Tj2Tŧ��w��AKfJ���_�ߚD������_���      x   _  x��WMo�8]�_q�mf1m'�@6U^�iQ)T���71�jG��>���u Z@3�y��(���8��אA�C�黝��Iɼ��N\K%rVu��^��������\���6�e�8
��6�b��wn�1!�KF���5l�d��8H���)ŋ%DU%*˲N8�vN-�o)-(�uŠb�H N�lpl�@J7��"��aI�ZZW�J=J/q���v{�u��+��(�x[��N�㓦���簠��KY3��*��J$u�.�E0c�E[�b��ЍF���h)2��1X�
Tʀ�(�}Ί�Y0�=���AJ�rJ 
���J�Y+QC�1*��x�	�|U ��UP��+ޤ@1- �ݠ-�.�����ػ����Ic�'�C�n��;��gVS�6��PkoM�:�u�Y�Re��)�E����aD*�j��ER�@2�K=Xa�|�*M��et���a)/sV��I��/�b8��^]i@����j��K��R��:��=���	�E_�s�0��9LS�l�\��<�p�s��>h�X�#�r�7j�p,��z�ƌ��)i�-I�6f[}~*�����hbx������--�|��d���%͏~V<g�Js�Ϊ��el�~������9
x^$)��Ǔ���^�-��T���_B�ŧ��e�iܿ��;j�\�*����U�.�bp쀘M���/��b�E�uV���ۊ4��:����:CRJ�!wuy��J��]�d1_p����*.�M	$>�f�h�#􂯵�5�Rr�?�_G~�����n�������j��L��g'����!t���60�-�S?zAަ�:Naʫ#����}��*���	FQ8�`��>�����o�1<G#��������l�|������G�]�����s�L�/L´����7�;�z?hʿU�;��� �~�B]a[ԝ/Ფ
n�4|8�� O���h��o*Fj�!Q�W�N���5�����;r��3��Y�M`��5d���.��Ɠ�?���{8�p�xx�CNav���u8�+�-���?�fɵ�1�����G�S�΅���?��2�{"8|������5^������)�      U   P  x���]o� ��O~�K,�8�k�,��tռl��bpB���մ�>���J��I6�s �ׯ�$�si��BI�t�.ꍮ$PL�!#!�&Q2�i@�	y��I�ߞp}	���Mc8\TBq�}=�Y)���J�z�J���V
8��RB��}0��1����b�7��w�(���C:?�8HG��7ρ���}�VȺ��p)���@�o��'WW�߇Pn]�r�!S[_"��"W�{��Y;�'1\�J�{n��f��2W���� L����m�hv+M�"B&4��I�2F�S�/�g����K��>ba��g�q:=��!E�3��[�-�-h����iwm�=�:!�i��;�7J��vϛ�q|���m3D�����YwE"� 9��h۝�����;�uK�P�����wЗ�*YB�N���U%��"�a!�+ÝY^�;�����1ldY�^�:���$�x̞��	�J�̦�#1#��Uw%;
=�H������"��������#���
s٠^��Z�b�+��߸Q�j�{��U�h%n�����*u���@��d<v7N��G�^��^�)��u��3���_ �c�      t   r   x�3�� .��4C0�L��44@bs��'e�:%������Z�X���:�[�ǧd�'�d�&����UXd�Ż�e�s:r:r�LK,�D�=... 1�+S      V      x������ � �      Y   �  x��mo�6�_3�Bț�X���,}��{(���n�P��H*֦Ȇ$'˂|��$;��s`X7@���<������f�eL!o��ծ���#��P8��dB~����&������:�1g��n���(���D1#�W�?_���:&�Lb�P�el���l^ţ�{�X\&���Q�]]���Wɷح8w%z~|K����e���ȏ1_�Y��b '�٢��c\R�)�	�ұ���%Sc�:�>�f�|x����kru�u��]�ã�3�ƺpeoiZ����Cl5ş��^�]+��x�Ų��p���;�~̦��<��:mg���)��`j\@ۢ.|ĈN���/��wug��59뗝*�%Q��(�}j�Vã����ָ��q��&nE$�y�]��Sy�%.C\��˽�s2è�i7�o���z^�I&����㓎�UF�kpy�e�|��cM����~�$ �X��I�N��yX��Y5W���m� ?9\骽CQ���%	#����G�k��b5�W��g���S)|��I�́0̳�3;���G7>��>*�TZ4��S�ȣΔU0�>�i��4U��<�I3GӜGe*#����19�D�5��Tjé�cNYn��rPL������s�8��HD��Zm2�͹ˬ̥��m��� ������<Rgq5��΃�201�𡅓_K?y=���"�v�t[�i]�D��f8���7D��t oef�:��g$n��I$c�O(�3���$�1i�K+7@�M9� �u����4sL�ऀ,�(��aR�R0���/�<>��$�IMƬ5Ϩ=�����f>q��%�����I4���=�����%}�r�c1��A{!^�I��f�MĢC��|7e�|��1��	�[�>ew3���{�݂�{�Nנ��A+���h,A�{�좬�OY?&��G�0}���p�g�9�t����[#�V���������a���OB�+��<
,S�IQ+�[uʡ�W��5�-���]&~^U8L�E���$.��ʣi>Yta$9�gY#��/��4�Ә���*\���Y�n�~%��N"�Wg�׺څ-u�13c�b����uCH�OKwX�:ih�#�d���:�Ƹ^W��N��C�x�e��_s�"��ㆡ�x�������� /�����?W^ro^"WJ�(X�$��2�g��~�WJl�J٧y���qtpp��;>M      [   �   x�m�K
�0����^�!�NrO�Mт�T��F��Q�[d���jr��@�-��"I�%Y���X�A��q~נ���%(���F�]-_�#0�멟�q3�v{8�_��@*B�%dJ��a\���in,������p*�c�����߇��9���W)�+��F9��*����F��.-�1٧�B�4�JK'      �      x������ � �      ]      x������ � �      _      x��\[s�F�~��
�v_֨�_�&K����
}�J��r�$$!�.�Q������0P�rem}ꞏ==}��rf�_Wr��"���e��U���!�-vϙ�R;e��ZϞϤ��:�m7��q�)��){N��9Us�2C�j
������<���X}مe�l���|�����˷o>��=����תּݲ.�MYm��?~x����M��{���ǧ�����?q&�*�m��qF[ɥ`��fS�����c�=����ˋw�o���뛫��[�1l�g�̩�s��*P7u��5y��ߛ|�+�����˾^�g ���r3`| {�8�?D8a��qw��i��_�w�v������o��%fL=��_���PF@*Ͻp�7���;�wÉ���vq�1'���P��|��x����@7���ZDRi��[D�����-��SPO�<(l�3�U�aDz:]koo��f;3T �\��)��x��sJ��u1�\ܒ�P����s[��(�F�F�(+��� �jJ'3��)�;�O:Z��R���C�.7���	&,���mQ7�����(6�(��s�3�r.9F}e�n
��ٴ;�|2Z�����a/��j���s up��%����\��j8*j
��29e���T(��)*k@=풬v°�W�s�CB0xZ���ԩe`���,���W�0H��L�)Ϩ�B�)(�o���4�c�f
�m�&����܁��͞�:�Β�US�������1[,�����O$u휂Oi�pN�i����-�bd"n��e~��t���|��ß��E��\�����KJ'	*�Y���� :�_�5��T��Ӝ$e���D����k��Թc�.��A�x���d��Ǚa ��!4�Wm"g��ϓŠ���O@�iC��Yo#�������y�(Ȏ]e u�"%x��r]̮�M[��˺=�c�9:Sڂ�MAA�"��mSma�.���|��
�d�(��vN�sS�������\��ÿ���{H	�1Ui��PXA����@r�|k\�MU?�pb	(
�\F&�Ca	M>}�����7�3; ��f�@�Y��N�͑z�X/��/��#�Y�e���և�r��R}�}��9脜 �̱�v}(�t^�(�'tJ��'g�P�SQ�s]ko�W�mR�Y(�N;@A-#�E38��R8�*�Y�������M����x����!E4�l
���oj�����zUB&o���ІѨ��CaI~�n��k�ٛ���%���Rdκ���Yl��_V��H�T2�JV�J�jr�\V�MSnn������/�-��/i�sh�s�Gv�CaC���}q�����M��&c�c�P�oɋ=�+vh��n�n|����(�l#�����8��߳�6��bd�^��I���I��4�- 9�U]-��qvU�K0Nͣ��e��٨Ō�/��-�����,�=�� �<�X��ڗ��j5�_�9�Ό� 
���YÎ����Η���p��c�}B�V*:�2}$, I����e�*��l���K� �G�u�8(�����v���wE^op�A�<��0�ֈ�"@a	�]�8~���U�XWۮ�<�����R��F������!C͈Z�E�P�sF��w��{�߫�9$=&��I�9���>G
Zze�:�TA� �ō,Ї:��B�j�w��x�b������� 
�T+���n���Wr(� �p<�s�T;kww�6I*Y�5;E:@A� ������i+
�Q;.
Pp6��/���懴����Q@�-(yQ�{�T�A���Uۤb�a,��܇���&�Up(���]|��NS��4u	��u%����!!�,r�*z�}.(v�\̹�({�Q��j���HS1ZXѣrJ���&�ёZ�h�8^G�U�m.]��Bul^��_'�Xe�Q�IP�gw�U �Pm��y���C��U�0	��}"n�H�%%Lh-Ef��q�ه:2��]q�ǼZ�}r]CR�4/C�1�+-����<'M\���`/(恂o��5��lg%�8N�'Ir�)�����>t$��s�R|/�m��$���_G!�&�́+)�	͝@�Tǐ("�c׾��*21g�N
��UJ89�
�Z�m5�B#�������Uڠ�8��3�I�AO��
3Kq�Y�.��e4P��"��^��0�1���@�Yޣ�С���j��pj���6=F�����Zm�^i �\"�˿�`S�s�E%�M�Ô�h��^#�2Q9݇�T���-Au�u뵤#2J�Q8�E9�TOΓR�)�ʜs�(��pDVe՛����"�?37�s�)��$%��(p�B)$���P��Z�A���fš
;H$�H�Ʉ=L<SPGJ����vUb\/���u�����Wr�m�oC�8@�� �R'�8��@�B�wS�����/�s���tLZ�H	'�	�{R!��@Oǯ/�[?�_�Mr�PL�K���-�ȑ4\
���v b����˼mf/�oglƅe�'��	ZJ��q-�Q� ���[��2������/��+�'�p(��B�G�+�`�p����갇�V'd�@�)�T�l���I^}�=�I���B#�Ǟ?�Iޖ�P�������	��d�S]�3��>*L<��U�^'o��ű�#��9*�"*�v:�U�:q��,$ �>}��w��Ǣ�Z_���c��}jɜ*|�`���)(4�\V���&�,8�28C�v�Hﰱrڜf}�Hr��|�é֧���Γe�����x[��K1&�Մ��	��}���+�0F�*U���7-�N��`��q�pTD'c u� �/�Á���}}���u?��������?����
F��i��P�S�U^�f��X�����1t������x�7�W��A�9>���&��}���u��'[?E-wx{��� ��3���1�:
j���������5���to �S���䒜T_8p���u�4y�o���I���MN'䒜$:���� �8�"�����
���v����=e$��d���.P��8��Ͳ���x��O�򾘎�sj�xzR6��q��][4��!!;B=�ms/4�����3��߾�8)�v&Qe�!�0�c

�y�����\��v�����S�$�ི�4�@E��1�ou��>���,�q��j�1�!A���LC�%��>�*��_�v����IvZx��X,I	"��B�I�;���\6����/p�e�+B��$�$7�'5��t�S8��EAA8�P�ے��;�.��˫"�'�i+ۭ=%��%^�+>�� :�\>.�g���FK~7��r��O� uk�������b�N�����Q#WR:���>�16�P�
�X����P�,�Q�t�����������U�G� 
�8��K���'�����IV`x��#�$)N3�Ľ)�#	)z���;j�ّ�T����Ύ_����wSP�I����v�JǢR��2h�E�Hx �&��\��}vY�7���_�)^7��<)kSqt'p~m!(G�7�B���k�^���X�^W�e5y�N�p}Z4I��'-"*�P�f��M٠n(��jyW���4�ôѠ������I�Bd��DuL
���C�*������c�2E���9��/��
��Ƈ�'���p�i�0$Y܁;��(�2��V`8UJJ��k�<���(�n¾� %���y)�>2F�^69pfx��)(L%��/������7熸�����Lr�̡fЄE��>�0�[�����l�����-K��u$�����2~;�AE.������_�m�>5���P��ŒSe�
 ����� 
����O��q� m���X�����EOeP����!��]y{�s�X2\9�kޱPKg\	;�2���� 
���'	�	f��X�ә4��nԇ%���_�P4�a��UV�7c�!��pԘhb5���ґO�w%V�~^S�����/)c��Q4>�8Sҙq��G�K	Jzj�jl6�L�	 ;  �#�I�$3�3.��PǍ�_r����[~�����/�d\ڂ�W�&��'�@ >X??s��HP�e(��_n�TD�[P�E��{8(��9�3ȧ��0��d�\� ċ���u\ �/�4FF*��_N�.��w��(��nu�[�qVi`/�w�*��b,��(M^�78�ȷ�����L*�`ZEK5�P��m�� �4���/qp]W�r9M�+�V,���y���z
�g�O*��;7f0
zr_l�~���w��Kn5;q��@B�s�`e�o�a�/9�T�x����L'���ڊ�� 
�fɢ�j������7���FnFCW�WJ8����s͢�� 
o�(i'���|�9�nUիr�
M~[�k]+��`I.6M�ｯ-?��?��\Q_���S�w����P�*�_���bo�)��;)��At
�h����SK(榡������`:�oP�U&e���>43M�w4|o��M��������ˉ�a���Y�)���	�� �W�w����)����%�%W/������棇�S�;A�������~���>�ZR      a     x���َ�P����Shb˜ ����.(�J%�N �gL�{�&^y�O��g3�����G��ƠM�m����)}��l)�CD7�I���Z�K����o\�Q�]|�a%_*8�J^���p�-XST}��� ���q������;EZ��y� @�Gvl�}�"ò�g�JJ�5ϫp���d�`fZ嚳y��S:S)��	�������@T���[G:��^���vW��)��,�m�`�ϣ�H��M�>�F���K�;��x\�A�O��}H����0�m��"��s�]%[�JG����߀��~��X�^N�2,=co����@Qv��+\��0s�_�6�ɗ�vH�(p����KYZ�G�����A�����+�k�vK���@�<�E;�vqi�FV����|����D�1�t!�@ ,i4�)�����ֹG�ÙB����rHB
 �B""	��M���q�AЏc.��kμ[2M��_��ųu����_X���<W�^      z      x������ � �      c   �  x���]O�0���3v-Ҟ���]�DM0j�1�,l�%	#5�wO[�G��n8l�y{������	~Ji,eєM�`�#�Uo�Y��'�d3'��})VkS��Ӫ	'��y����\D8��D�(�D��Nu�?LId&E.\D���5�X��_����t�Z.�ic��&�-biĀ	5�AkBL7�9���p	��Ma�1�[w��n1��h�nAs��
Z���Y=`�g�f�.�^�Q�I�o��|,�����Q۵;�����R"T3R�������/�Ʀ�'}�4�j�G�>��}��*�2���,�w���U`O���|���[lKAT��?��L�5�,���J˘ɤ�-��Q����!���Ȧh���G���oQ(�ℷ3����cR�~#x�2�>uq0��^Lg��F{�ox|���i���4`�      �   S   x�3�42�J-)-�S0�MI�,V���L��,r*p���r����)Y�Y�YZ�k�Zp��qqq e�      �   �  x�}��q#1D�R��f��a���lm���E���	>dwCIn�?h)gѿ7�O�O�7�.��Z �;hg�}ݕl�Qh>���%���h���q���:rK��X�Q��ꝸ	��ׁ!�y�9U�*PE�ȵ-�љ��]�"̶V�W�_�<KT���mv�f����������u��)鸞����*L�YX���>�!�2�J����^i�vy���hWoB�ty�/L}��K��\�ʌ1��#|C���Iǉ՗8�aؖ��������Q�ǖ�C&B�(N��WbCG��q$^� �,%�@G�XCWt:&+�G��EW��4A����J����X+�3�P�������и웜(�[�e\�Ʋ��['��ʋ���ԕ��&|�Z�H�m���~���      r   <  x�}�?O�0���S�:7����)B�e0���&q���~{�A����߻�EBdb��6f�2.�<����I"4�$�
��\jFs�Q�X������L�2,)a�
)�o/��[��e�,�rvP�UYCUW�#TUUBYǺ�WQ�U.�P�_��J0~�?+�_�|�߁�q�i��1�Kx����a�漝��1��zJ�!�k�5G9��<9��g�#�a3ħG��?���[����=�z��;��>�:4��t�:3CX�p�`���D��U��L#�+D%&�)`�E���$~��`��)��4M?΋i         >   x�3�)��H���WHLI,NL��/���$�a�---��@"��.��`�?22����� ��s      e      x������ � �      g   .  x���is�8�?+�B��lM�F�%�ʧr �\��lm	[>��	C����l'2ɤ2e�7-����1�a2�Q�Ŭ�+'� ���~,è��1�"�-�����l�^y�{v:�N�q6R|u�/�r����wq�}p�yĿΣ���i̗j�6س���N{c��=��U32Y�|�2���5w(�Y<}���^eZyW7ڻj&�Oj�pd�������z��Do�z��y�8���?�8���i��^�q���ԗY ��i�`�ɓ,��&X?l跕�ؤD���
o:�/u/�ۉ�ͻ_}1������xadg���������Q20�[hw/O��*���D��4��ғN��U^����0��*6w�_�W*qӼu�KW�2�uU^�^��R�0G��
s
[�r�#��Y�o�����tU���0�9��e�J@B����o�.I܇�e;ڡ���R�n���~ ,�q*�H/O�'�״���.�����^�$�k��t��E�r�������La���e���&��.CM��"�a�ީh�YEL���/3TIP}^������F��Xp�Ma���k_G��!?I�X��S�c5;�� �M�v$c����0'�;�n!k�x�i�'�4�I!󰖕���,�IiC�����"w���-�G��dq;�����\)e]�-.�Mp*u9�x,�p�P�)|M
-��p�JL�Л-��Eh�߆o��N�;S�����\�����Ԕ��2����a���	�i�Z	Q��'7\���6�x�z@�H��}�s�2�[d�
ֶ�z�~#5�:�LA1�I0[��I�hH�T	5L����`C ̈��:�eag�W?�ma�B�R�&�m�\�QaPܞf�����[q������,�?Jl�5�Ю��v+W�J��h��X�b�h�ESL�řEu)51C��$yh���܋�s5�£d|��I�ݰ0o���^����3�/�}6������q\U�~�.�9B���Z�{�>�9�u�m���P7�����-�d����S&�Uu�*9��T�4���eE��`j�-]&�Y˗Q��Yޅ^5O�9�4��E<��z2��lB���j"W�����2ن?>wr%� v5��mظ��5��mظ��dV��,��
U�OcOk�=��z�e�pW���Zu5f���,tW �˨{�A��]�>p��*T�z��{��9����b�V�����p�'����,ϑ��:X����r���p�Z7C�v��<�C���no:�TD;�)���Y���O7Z.5��%��m���_���[      i   �  x���Ko�6��� ���ԭ�@/Yd�C�^�6�d�H�[��w�H�f�0mI�/��O��|3cÆ�ͧ�o>-7O��������7���U�e���M��4�����������o8�|��e<a_������%���~��X����Y� ��O*��S�����5Ჟ��/��3�����V4�Xj���?;sX7���L_ආ�+n�k�bР\����ҷ�rWV���,�0����%K����?<vO �`	�rX/�g_Vyڅ+��M=�@0�Q�8��͍Ѫ�+�*�a8�Q�҉�D�K��t��G"no�,B1H�pI@��X��k����։PW�c�6�u���U�p�Ma-s���T�0�}�z�_g�0�Ń#஗�H��C(�#��n�b�k�(���5Fp.�l+ �Y| }�{E<M�p��M�"�_t�StL)m��:L�-�x:�}���nk��èb������L���*dc6�7�i�/-��#_iR���߆�yx[���|���i�su��~ʳC�/�O�s�5C<�������~������t��R�q��V�Z$�0I$�`����}f��� �S@"5��$R�%_���J,���I�\�0ʩ��	(4�zI$3T�e���])��D��BԒ��(f��q{��W�/?0;���Y}��z��>�ՔI��c�IC�Nŉ���n�}\ }ʯ��G\�r*��B�ǳ�R�<���Ք{w�9f������thGԔ�3������n4n���6-ѱb�v���ȸ�{
D6���J�K9���Wr�%��wr7 ��z��yl\f������,אR�?c�5��}bb'�m�����r[�$f+��mV�R����U�D��2Y�J�UH�:V�:�u��.���rۅ�`��R����]EKdc7����U�gcW��
V*LI��v��	a}���?D�      k      x������ � �     
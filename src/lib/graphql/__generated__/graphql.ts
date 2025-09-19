import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { useAuthenticatedFetcher } from '../queryHooks';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  bigint: { input: number; output: number; }
  bytea: { input: Buffer; output: Buffer; }
  citext: { input: string; output: string; }
  jsonb: { input: Record<string, any>; output: Record<string, any>; }
  timestamptz: { input: string; output: string; }
  uuid: { input: string; output: string; }
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** Oauth requests, inserted before redirecting to the provider's site. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthProviderRequests = {
  __typename?: 'authProviderRequests';
  id: Scalars['uuid']['output'];
  options?: Maybe<Scalars['jsonb']['output']>;
};


/** Oauth requests, inserted before redirecting to the provider's site. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthProviderRequestsOptionsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "auth.provider_requests" */
export type AuthProviderRequests_Aggregate = {
  __typename?: 'authProviderRequests_aggregate';
  aggregate?: Maybe<AuthProviderRequests_Aggregate_Fields>;
  nodes: Array<AuthProviderRequests>;
};

/** aggregate fields of "auth.provider_requests" */
export type AuthProviderRequests_Aggregate_Fields = {
  __typename?: 'authProviderRequests_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<AuthProviderRequests_Max_Fields>;
  min?: Maybe<AuthProviderRequests_Min_Fields>;
};


/** aggregate fields of "auth.provider_requests" */
export type AuthProviderRequests_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AuthProviderRequests_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type AuthProviderRequests_Append_Input = {
  options?: InputMaybe<Scalars['jsonb']['input']>;
};

/** Boolean expression to filter rows from the table "auth.provider_requests". All fields are combined with a logical 'AND'. */
export type AuthProviderRequests_Bool_Exp = {
  _and?: InputMaybe<Array<AuthProviderRequests_Bool_Exp>>;
  _not?: InputMaybe<AuthProviderRequests_Bool_Exp>;
  _or?: InputMaybe<Array<AuthProviderRequests_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  options?: InputMaybe<Jsonb_Comparison_Exp>;
};

/** unique or primary key constraints on table "auth.provider_requests" */
export enum AuthProviderRequests_Constraint {
  /** unique or primary key constraint on columns "id" */
  ProviderRequestsPkey = 'provider_requests_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type AuthProviderRequests_Delete_At_Path_Input = {
  options?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type AuthProviderRequests_Delete_Elem_Input = {
  options?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type AuthProviderRequests_Delete_Key_Input = {
  options?: InputMaybe<Scalars['String']['input']>;
};

/** input type for inserting data into table "auth.provider_requests" */
export type AuthProviderRequests_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  options?: InputMaybe<Scalars['jsonb']['input']>;
};

/** aggregate max on columns */
export type AuthProviderRequests_Max_Fields = {
  __typename?: 'authProviderRequests_max_fields';
  id?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type AuthProviderRequests_Min_Fields = {
  __typename?: 'authProviderRequests_min_fields';
  id?: Maybe<Scalars['uuid']['output']>;
};

/** response of any mutation on the table "auth.provider_requests" */
export type AuthProviderRequests_Mutation_Response = {
  __typename?: 'authProviderRequests_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<AuthProviderRequests>;
};

/** on_conflict condition type for table "auth.provider_requests" */
export type AuthProviderRequests_On_Conflict = {
  constraint: AuthProviderRequests_Constraint;
  update_columns?: Array<AuthProviderRequests_Update_Column>;
  where?: InputMaybe<AuthProviderRequests_Bool_Exp>;
};

/** Ordering options when selecting data from "auth.provider_requests". */
export type AuthProviderRequests_Order_By = {
  id?: InputMaybe<Order_By>;
  options?: InputMaybe<Order_By>;
};

/** primary key columns input for table: auth.provider_requests */
export type AuthProviderRequests_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type AuthProviderRequests_Prepend_Input = {
  options?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "auth.provider_requests" */
export enum AuthProviderRequests_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Options = 'options'
}

/** input type for updating data in table "auth.provider_requests" */
export type AuthProviderRequests_Set_Input = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  options?: InputMaybe<Scalars['jsonb']['input']>;
};

/** Streaming cursor of the table "authProviderRequests" */
export type AuthProviderRequests_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AuthProviderRequests_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AuthProviderRequests_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  options?: InputMaybe<Scalars['jsonb']['input']>;
};

/** update columns of table "auth.provider_requests" */
export enum AuthProviderRequests_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Options = 'options'
}

export type AuthProviderRequests_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<AuthProviderRequests_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<AuthProviderRequests_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<AuthProviderRequests_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<AuthProviderRequests_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<AuthProviderRequests_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AuthProviderRequests_Set_Input>;
  /** filter the rows which have to be updated */
  where: AuthProviderRequests_Bool_Exp;
};

/** List of available Oauth providers. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthProviders = {
  __typename?: 'authProviders';
  id: Scalars['String']['output'];
  /** An array relationship */
  userProviders: Array<AuthUserProviders>;
  /** An aggregate relationship */
  userProviders_aggregate: AuthUserProviders_Aggregate;
};


/** List of available Oauth providers. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthProvidersUserProvidersArgs = {
  distinct_on?: InputMaybe<Array<AuthUserProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthUserProviders_Order_By>>;
  where?: InputMaybe<AuthUserProviders_Bool_Exp>;
};


/** List of available Oauth providers. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthProvidersUserProviders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthUserProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthUserProviders_Order_By>>;
  where?: InputMaybe<AuthUserProviders_Bool_Exp>;
};

/** aggregated selection of "auth.providers" */
export type AuthProviders_Aggregate = {
  __typename?: 'authProviders_aggregate';
  aggregate?: Maybe<AuthProviders_Aggregate_Fields>;
  nodes: Array<AuthProviders>;
};

/** aggregate fields of "auth.providers" */
export type AuthProviders_Aggregate_Fields = {
  __typename?: 'authProviders_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<AuthProviders_Max_Fields>;
  min?: Maybe<AuthProviders_Min_Fields>;
};


/** aggregate fields of "auth.providers" */
export type AuthProviders_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AuthProviders_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "auth.providers". All fields are combined with a logical 'AND'. */
export type AuthProviders_Bool_Exp = {
  _and?: InputMaybe<Array<AuthProviders_Bool_Exp>>;
  _not?: InputMaybe<AuthProviders_Bool_Exp>;
  _or?: InputMaybe<Array<AuthProviders_Bool_Exp>>;
  id?: InputMaybe<String_Comparison_Exp>;
  userProviders?: InputMaybe<AuthUserProviders_Bool_Exp>;
  userProviders_aggregate?: InputMaybe<AuthUserProviders_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "auth.providers" */
export enum AuthProviders_Constraint {
  /** unique or primary key constraint on columns "id" */
  ProvidersPkey = 'providers_pkey'
}

/** input type for inserting data into table "auth.providers" */
export type AuthProviders_Insert_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
  userProviders?: InputMaybe<AuthUserProviders_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type AuthProviders_Max_Fields = {
  __typename?: 'authProviders_max_fields';
  id?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type AuthProviders_Min_Fields = {
  __typename?: 'authProviders_min_fields';
  id?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "auth.providers" */
export type AuthProviders_Mutation_Response = {
  __typename?: 'authProviders_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<AuthProviders>;
};

/** input type for inserting object relation for remote table "auth.providers" */
export type AuthProviders_Obj_Rel_Insert_Input = {
  data: AuthProviders_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<AuthProviders_On_Conflict>;
};

/** on_conflict condition type for table "auth.providers" */
export type AuthProviders_On_Conflict = {
  constraint: AuthProviders_Constraint;
  update_columns?: Array<AuthProviders_Update_Column>;
  where?: InputMaybe<AuthProviders_Bool_Exp>;
};

/** Ordering options when selecting data from "auth.providers". */
export type AuthProviders_Order_By = {
  id?: InputMaybe<Order_By>;
  userProviders_aggregate?: InputMaybe<AuthUserProviders_Aggregate_Order_By>;
};

/** primary key columns input for table: auth.providers */
export type AuthProviders_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "auth.providers" */
export enum AuthProviders_Select_Column {
  /** column name */
  Id = 'id'
}

/** input type for updating data in table "auth.providers" */
export type AuthProviders_Set_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "authProviders" */
export type AuthProviders_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AuthProviders_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AuthProviders_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "auth.providers" */
export enum AuthProviders_Update_Column {
  /** column name */
  Id = 'id'
}

export type AuthProviders_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AuthProviders_Set_Input>;
  /** filter the rows which have to be updated */
  where: AuthProviders_Bool_Exp;
};

/** columns and relationships of "auth.refresh_token_types" */
export type AuthRefreshTokenTypes = {
  __typename?: 'authRefreshTokenTypes';
  comment?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  refreshTokens: Array<AuthRefreshTokens>;
  /** An aggregate relationship */
  refreshTokens_aggregate: AuthRefreshTokens_Aggregate;
  value: Scalars['String']['output'];
};


/** columns and relationships of "auth.refresh_token_types" */
export type AuthRefreshTokenTypesRefreshTokensArgs = {
  distinct_on?: InputMaybe<Array<AuthRefreshTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthRefreshTokens_Order_By>>;
  where?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
};


/** columns and relationships of "auth.refresh_token_types" */
export type AuthRefreshTokenTypesRefreshTokens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthRefreshTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthRefreshTokens_Order_By>>;
  where?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
};

/** aggregated selection of "auth.refresh_token_types" */
export type AuthRefreshTokenTypes_Aggregate = {
  __typename?: 'authRefreshTokenTypes_aggregate';
  aggregate?: Maybe<AuthRefreshTokenTypes_Aggregate_Fields>;
  nodes: Array<AuthRefreshTokenTypes>;
};

/** aggregate fields of "auth.refresh_token_types" */
export type AuthRefreshTokenTypes_Aggregate_Fields = {
  __typename?: 'authRefreshTokenTypes_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<AuthRefreshTokenTypes_Max_Fields>;
  min?: Maybe<AuthRefreshTokenTypes_Min_Fields>;
};


/** aggregate fields of "auth.refresh_token_types" */
export type AuthRefreshTokenTypes_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AuthRefreshTokenTypes_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "auth.refresh_token_types". All fields are combined with a logical 'AND'. */
export type AuthRefreshTokenTypes_Bool_Exp = {
  _and?: InputMaybe<Array<AuthRefreshTokenTypes_Bool_Exp>>;
  _not?: InputMaybe<AuthRefreshTokenTypes_Bool_Exp>;
  _or?: InputMaybe<Array<AuthRefreshTokenTypes_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  refreshTokens?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
  refreshTokens_aggregate?: InputMaybe<AuthRefreshTokens_Aggregate_Bool_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "auth.refresh_token_types" */
export enum AuthRefreshTokenTypes_Constraint {
  /** unique or primary key constraint on columns "value" */
  RefreshTokenTypesPkey = 'refresh_token_types_pkey'
}

export enum AuthRefreshTokenTypes_Enum {
  /** Personal access token */
  Pat = 'pat',
  /** Regular refresh token */
  Regular = 'regular'
}

/** Boolean expression to compare columns of type "authRefreshTokenTypes_enum". All fields are combined with logical 'AND'. */
export type AuthRefreshTokenTypes_Enum_Comparison_Exp = {
  _eq?: InputMaybe<AuthRefreshTokenTypes_Enum>;
  _in?: InputMaybe<Array<AuthRefreshTokenTypes_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<AuthRefreshTokenTypes_Enum>;
  _nin?: InputMaybe<Array<AuthRefreshTokenTypes_Enum>>;
};

/** input type for inserting data into table "auth.refresh_token_types" */
export type AuthRefreshTokenTypes_Insert_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  refreshTokens?: InputMaybe<AuthRefreshTokens_Arr_Rel_Insert_Input>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type AuthRefreshTokenTypes_Max_Fields = {
  __typename?: 'authRefreshTokenTypes_max_fields';
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type AuthRefreshTokenTypes_Min_Fields = {
  __typename?: 'authRefreshTokenTypes_min_fields';
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "auth.refresh_token_types" */
export type AuthRefreshTokenTypes_Mutation_Response = {
  __typename?: 'authRefreshTokenTypes_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<AuthRefreshTokenTypes>;
};

/** on_conflict condition type for table "auth.refresh_token_types" */
export type AuthRefreshTokenTypes_On_Conflict = {
  constraint: AuthRefreshTokenTypes_Constraint;
  update_columns?: Array<AuthRefreshTokenTypes_Update_Column>;
  where?: InputMaybe<AuthRefreshTokenTypes_Bool_Exp>;
};

/** Ordering options when selecting data from "auth.refresh_token_types". */
export type AuthRefreshTokenTypes_Order_By = {
  comment?: InputMaybe<Order_By>;
  refreshTokens_aggregate?: InputMaybe<AuthRefreshTokens_Aggregate_Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: auth.refresh_token_types */
export type AuthRefreshTokenTypes_Pk_Columns_Input = {
  value: Scalars['String']['input'];
};

/** select columns of table "auth.refresh_token_types" */
export enum AuthRefreshTokenTypes_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "auth.refresh_token_types" */
export type AuthRefreshTokenTypes_Set_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "authRefreshTokenTypes" */
export type AuthRefreshTokenTypes_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AuthRefreshTokenTypes_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AuthRefreshTokenTypes_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "auth.refresh_token_types" */
export enum AuthRefreshTokenTypes_Update_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value'
}

export type AuthRefreshTokenTypes_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AuthRefreshTokenTypes_Set_Input>;
  /** filter the rows which have to be updated */
  where: AuthRefreshTokenTypes_Bool_Exp;
};

/** User refresh tokens. Hasura auth uses them to rotate new access tokens as long as the refresh token is not expired. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthRefreshTokens = {
  __typename?: 'authRefreshTokens';
  createdAt: Scalars['timestamptz']['output'];
  expiresAt: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  metadata?: Maybe<Scalars['jsonb']['output']>;
  refreshTokenHash?: Maybe<Scalars['String']['output']>;
  type: AuthRefreshTokenTypes_Enum;
  /** An object relationship */
  user: Users;
  userId: Scalars['uuid']['output'];
};


/** User refresh tokens. Hasura auth uses them to rotate new access tokens as long as the refresh token is not expired. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthRefreshTokensMetadataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "auth.refresh_tokens" */
export type AuthRefreshTokens_Aggregate = {
  __typename?: 'authRefreshTokens_aggregate';
  aggregate?: Maybe<AuthRefreshTokens_Aggregate_Fields>;
  nodes: Array<AuthRefreshTokens>;
};

export type AuthRefreshTokens_Aggregate_Bool_Exp = {
  count?: InputMaybe<AuthRefreshTokens_Aggregate_Bool_Exp_Count>;
};

export type AuthRefreshTokens_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<AuthRefreshTokens_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "auth.refresh_tokens" */
export type AuthRefreshTokens_Aggregate_Fields = {
  __typename?: 'authRefreshTokens_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<AuthRefreshTokens_Max_Fields>;
  min?: Maybe<AuthRefreshTokens_Min_Fields>;
};


/** aggregate fields of "auth.refresh_tokens" */
export type AuthRefreshTokens_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AuthRefreshTokens_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "auth.refresh_tokens" */
export type AuthRefreshTokens_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<AuthRefreshTokens_Max_Order_By>;
  min?: InputMaybe<AuthRefreshTokens_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type AuthRefreshTokens_Append_Input = {
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "auth.refresh_tokens" */
export type AuthRefreshTokens_Arr_Rel_Insert_Input = {
  data: Array<AuthRefreshTokens_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<AuthRefreshTokens_On_Conflict>;
};

/** Boolean expression to filter rows from the table "auth.refresh_tokens". All fields are combined with a logical 'AND'. */
export type AuthRefreshTokens_Bool_Exp = {
  _and?: InputMaybe<Array<AuthRefreshTokens_Bool_Exp>>;
  _not?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
  _or?: InputMaybe<Array<AuthRefreshTokens_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  expiresAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  refreshTokenHash?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<AuthRefreshTokenTypes_Enum_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "auth.refresh_tokens" */
export enum AuthRefreshTokens_Constraint {
  /** unique or primary key constraint on columns "id" */
  RefreshTokensPkey = 'refresh_tokens_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type AuthRefreshTokens_Delete_At_Path_Input = {
  metadata?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type AuthRefreshTokens_Delete_Elem_Input = {
  metadata?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type AuthRefreshTokens_Delete_Key_Input = {
  metadata?: InputMaybe<Scalars['String']['input']>;
};

/** input type for inserting data into table "auth.refresh_tokens" */
export type AuthRefreshTokens_Insert_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  expiresAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  refreshTokenHash?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<AuthRefreshTokenTypes_Enum>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type AuthRefreshTokens_Max_Fields = {
  __typename?: 'authRefreshTokens_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  expiresAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  refreshTokenHash?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "auth.refresh_tokens" */
export type AuthRefreshTokens_Max_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  expiresAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  refreshTokenHash?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type AuthRefreshTokens_Min_Fields = {
  __typename?: 'authRefreshTokens_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  expiresAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  refreshTokenHash?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "auth.refresh_tokens" */
export type AuthRefreshTokens_Min_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  expiresAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  refreshTokenHash?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "auth.refresh_tokens" */
export type AuthRefreshTokens_Mutation_Response = {
  __typename?: 'authRefreshTokens_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<AuthRefreshTokens>;
};

/** on_conflict condition type for table "auth.refresh_tokens" */
export type AuthRefreshTokens_On_Conflict = {
  constraint: AuthRefreshTokens_Constraint;
  update_columns?: Array<AuthRefreshTokens_Update_Column>;
  where?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
};

/** Ordering options when selecting data from "auth.refresh_tokens". */
export type AuthRefreshTokens_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  expiresAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Order_By>;
  refreshTokenHash?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: auth.refresh_tokens */
export type AuthRefreshTokens_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type AuthRefreshTokens_Prepend_Input = {
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "auth.refresh_tokens" */
export enum AuthRefreshTokens_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  ExpiresAt = 'expiresAt',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  RefreshTokenHash = 'refreshTokenHash',
  /** column name */
  Type = 'type',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "auth.refresh_tokens" */
export type AuthRefreshTokens_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  expiresAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  refreshTokenHash?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<AuthRefreshTokenTypes_Enum>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "authRefreshTokens" */
export type AuthRefreshTokens_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AuthRefreshTokens_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AuthRefreshTokens_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  expiresAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  refreshTokenHash?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<AuthRefreshTokenTypes_Enum>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "auth.refresh_tokens" */
export enum AuthRefreshTokens_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  ExpiresAt = 'expiresAt',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  RefreshTokenHash = 'refreshTokenHash',
  /** column name */
  Type = 'type',
  /** column name */
  UserId = 'userId'
}

export type AuthRefreshTokens_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<AuthRefreshTokens_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<AuthRefreshTokens_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<AuthRefreshTokens_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<AuthRefreshTokens_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<AuthRefreshTokens_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AuthRefreshTokens_Set_Input>;
  /** filter the rows which have to be updated */
  where: AuthRefreshTokens_Bool_Exp;
};

/** Persistent Hasura roles for users. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthRoles = {
  __typename?: 'authRoles';
  role: Scalars['String']['output'];
  /** An array relationship */
  userRoles: Array<AuthUserRoles>;
  /** An aggregate relationship */
  userRoles_aggregate: AuthUserRoles_Aggregate;
  /** An array relationship */
  usersByDefaultRole: Array<Users>;
  /** An aggregate relationship */
  usersByDefaultRole_aggregate: Users_Aggregate;
};


/** Persistent Hasura roles for users. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthRolesUserRolesArgs = {
  distinct_on?: InputMaybe<Array<AuthUserRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthUserRoles_Order_By>>;
  where?: InputMaybe<AuthUserRoles_Bool_Exp>;
};


/** Persistent Hasura roles for users. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthRolesUserRoles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthUserRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthUserRoles_Order_By>>;
  where?: InputMaybe<AuthUserRoles_Bool_Exp>;
};


/** Persistent Hasura roles for users. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthRolesUsersByDefaultRoleArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


/** Persistent Hasura roles for users. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthRolesUsersByDefaultRole_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** aggregated selection of "auth.roles" */
export type AuthRoles_Aggregate = {
  __typename?: 'authRoles_aggregate';
  aggregate?: Maybe<AuthRoles_Aggregate_Fields>;
  nodes: Array<AuthRoles>;
};

/** aggregate fields of "auth.roles" */
export type AuthRoles_Aggregate_Fields = {
  __typename?: 'authRoles_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<AuthRoles_Max_Fields>;
  min?: Maybe<AuthRoles_Min_Fields>;
};


/** aggregate fields of "auth.roles" */
export type AuthRoles_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AuthRoles_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "auth.roles". All fields are combined with a logical 'AND'. */
export type AuthRoles_Bool_Exp = {
  _and?: InputMaybe<Array<AuthRoles_Bool_Exp>>;
  _not?: InputMaybe<AuthRoles_Bool_Exp>;
  _or?: InputMaybe<Array<AuthRoles_Bool_Exp>>;
  role?: InputMaybe<String_Comparison_Exp>;
  userRoles?: InputMaybe<AuthUserRoles_Bool_Exp>;
  userRoles_aggregate?: InputMaybe<AuthUserRoles_Aggregate_Bool_Exp>;
  usersByDefaultRole?: InputMaybe<Users_Bool_Exp>;
  usersByDefaultRole_aggregate?: InputMaybe<Users_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "auth.roles" */
export enum AuthRoles_Constraint {
  /** unique or primary key constraint on columns "role" */
  RolesPkey = 'roles_pkey'
}

/** input type for inserting data into table "auth.roles" */
export type AuthRoles_Insert_Input = {
  role?: InputMaybe<Scalars['String']['input']>;
  userRoles?: InputMaybe<AuthUserRoles_Arr_Rel_Insert_Input>;
  usersByDefaultRole?: InputMaybe<Users_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type AuthRoles_Max_Fields = {
  __typename?: 'authRoles_max_fields';
  role?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type AuthRoles_Min_Fields = {
  __typename?: 'authRoles_min_fields';
  role?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "auth.roles" */
export type AuthRoles_Mutation_Response = {
  __typename?: 'authRoles_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<AuthRoles>;
};

/** input type for inserting object relation for remote table "auth.roles" */
export type AuthRoles_Obj_Rel_Insert_Input = {
  data: AuthRoles_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<AuthRoles_On_Conflict>;
};

/** on_conflict condition type for table "auth.roles" */
export type AuthRoles_On_Conflict = {
  constraint: AuthRoles_Constraint;
  update_columns?: Array<AuthRoles_Update_Column>;
  where?: InputMaybe<AuthRoles_Bool_Exp>;
};

/** Ordering options when selecting data from "auth.roles". */
export type AuthRoles_Order_By = {
  role?: InputMaybe<Order_By>;
  userRoles_aggregate?: InputMaybe<AuthUserRoles_Aggregate_Order_By>;
  usersByDefaultRole_aggregate?: InputMaybe<Users_Aggregate_Order_By>;
};

/** primary key columns input for table: auth.roles */
export type AuthRoles_Pk_Columns_Input = {
  role: Scalars['String']['input'];
};

/** select columns of table "auth.roles" */
export enum AuthRoles_Select_Column {
  /** column name */
  Role = 'role'
}

/** input type for updating data in table "auth.roles" */
export type AuthRoles_Set_Input = {
  role?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "authRoles" */
export type AuthRoles_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AuthRoles_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AuthRoles_Stream_Cursor_Value_Input = {
  role?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "auth.roles" */
export enum AuthRoles_Update_Column {
  /** column name */
  Role = 'role'
}

export type AuthRoles_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AuthRoles_Set_Input>;
  /** filter the rows which have to be updated */
  where: AuthRoles_Bool_Exp;
};

/** Active providers for a given user. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthUserProviders = {
  __typename?: 'authUserProviders';
  accessToken: Scalars['String']['output'];
  createdAt: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  /** An object relationship */
  provider: AuthProviders;
  providerId: Scalars['String']['output'];
  providerUserId: Scalars['String']['output'];
  refreshToken?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['timestamptz']['output'];
  /** An object relationship */
  user: Users;
  userId: Scalars['uuid']['output'];
};

/** aggregated selection of "auth.user_providers" */
export type AuthUserProviders_Aggregate = {
  __typename?: 'authUserProviders_aggregate';
  aggregate?: Maybe<AuthUserProviders_Aggregate_Fields>;
  nodes: Array<AuthUserProviders>;
};

export type AuthUserProviders_Aggregate_Bool_Exp = {
  count?: InputMaybe<AuthUserProviders_Aggregate_Bool_Exp_Count>;
};

export type AuthUserProviders_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<AuthUserProviders_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<AuthUserProviders_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "auth.user_providers" */
export type AuthUserProviders_Aggregate_Fields = {
  __typename?: 'authUserProviders_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<AuthUserProviders_Max_Fields>;
  min?: Maybe<AuthUserProviders_Min_Fields>;
};


/** aggregate fields of "auth.user_providers" */
export type AuthUserProviders_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AuthUserProviders_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "auth.user_providers" */
export type AuthUserProviders_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<AuthUserProviders_Max_Order_By>;
  min?: InputMaybe<AuthUserProviders_Min_Order_By>;
};

/** input type for inserting array relation for remote table "auth.user_providers" */
export type AuthUserProviders_Arr_Rel_Insert_Input = {
  data: Array<AuthUserProviders_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<AuthUserProviders_On_Conflict>;
};

/** Boolean expression to filter rows from the table "auth.user_providers". All fields are combined with a logical 'AND'. */
export type AuthUserProviders_Bool_Exp = {
  _and?: InputMaybe<Array<AuthUserProviders_Bool_Exp>>;
  _not?: InputMaybe<AuthUserProviders_Bool_Exp>;
  _or?: InputMaybe<Array<AuthUserProviders_Bool_Exp>>;
  accessToken?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  provider?: InputMaybe<AuthProviders_Bool_Exp>;
  providerId?: InputMaybe<String_Comparison_Exp>;
  providerUserId?: InputMaybe<String_Comparison_Exp>;
  refreshToken?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "auth.user_providers" */
export enum AuthUserProviders_Constraint {
  /** unique or primary key constraint on columns "id" */
  UserProvidersPkey = 'user_providers_pkey',
  /** unique or primary key constraint on columns "provider_user_id", "provider_id" */
  UserProvidersProviderIdProviderUserIdKey = 'user_providers_provider_id_provider_user_id_key'
}

/** input type for inserting data into table "auth.user_providers" */
export type AuthUserProviders_Insert_Input = {
  accessToken?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  provider?: InputMaybe<AuthProviders_Obj_Rel_Insert_Input>;
  providerId?: InputMaybe<Scalars['String']['input']>;
  providerUserId?: InputMaybe<Scalars['String']['input']>;
  refreshToken?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type AuthUserProviders_Max_Fields = {
  __typename?: 'authUserProviders_max_fields';
  accessToken?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  providerId?: Maybe<Scalars['String']['output']>;
  providerUserId?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "auth.user_providers" */
export type AuthUserProviders_Max_Order_By = {
  accessToken?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  providerId?: InputMaybe<Order_By>;
  providerUserId?: InputMaybe<Order_By>;
  refreshToken?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type AuthUserProviders_Min_Fields = {
  __typename?: 'authUserProviders_min_fields';
  accessToken?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  providerId?: Maybe<Scalars['String']['output']>;
  providerUserId?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "auth.user_providers" */
export type AuthUserProviders_Min_Order_By = {
  accessToken?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  providerId?: InputMaybe<Order_By>;
  providerUserId?: InputMaybe<Order_By>;
  refreshToken?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "auth.user_providers" */
export type AuthUserProviders_Mutation_Response = {
  __typename?: 'authUserProviders_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<AuthUserProviders>;
};

/** on_conflict condition type for table "auth.user_providers" */
export type AuthUserProviders_On_Conflict = {
  constraint: AuthUserProviders_Constraint;
  update_columns?: Array<AuthUserProviders_Update_Column>;
  where?: InputMaybe<AuthUserProviders_Bool_Exp>;
};

/** Ordering options when selecting data from "auth.user_providers". */
export type AuthUserProviders_Order_By = {
  accessToken?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  provider?: InputMaybe<AuthProviders_Order_By>;
  providerId?: InputMaybe<Order_By>;
  providerUserId?: InputMaybe<Order_By>;
  refreshToken?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: auth.user_providers */
export type AuthUserProviders_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "auth.user_providers" */
export enum AuthUserProviders_Select_Column {
  /** column name */
  AccessToken = 'accessToken',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  ProviderId = 'providerId',
  /** column name */
  ProviderUserId = 'providerUserId',
  /** column name */
  RefreshToken = 'refreshToken',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "auth.user_providers" */
export type AuthUserProviders_Set_Input = {
  accessToken?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  providerId?: InputMaybe<Scalars['String']['input']>;
  providerUserId?: InputMaybe<Scalars['String']['input']>;
  refreshToken?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "authUserProviders" */
export type AuthUserProviders_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AuthUserProviders_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AuthUserProviders_Stream_Cursor_Value_Input = {
  accessToken?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  providerId?: InputMaybe<Scalars['String']['input']>;
  providerUserId?: InputMaybe<Scalars['String']['input']>;
  refreshToken?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "auth.user_providers" */
export enum AuthUserProviders_Update_Column {
  /** column name */
  AccessToken = 'accessToken',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  ProviderId = 'providerId',
  /** column name */
  ProviderUserId = 'providerUserId',
  /** column name */
  RefreshToken = 'refreshToken',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

export type AuthUserProviders_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AuthUserProviders_Set_Input>;
  /** filter the rows which have to be updated */
  where: AuthUserProviders_Bool_Exp;
};

/** Roles of users. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthUserRoles = {
  __typename?: 'authUserRoles';
  createdAt: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  role: Scalars['String']['output'];
  /** An object relationship */
  roleByRole: AuthRoles;
  /** An object relationship */
  user: Users;
  userId: Scalars['uuid']['output'];
};

/** aggregated selection of "auth.user_roles" */
export type AuthUserRoles_Aggregate = {
  __typename?: 'authUserRoles_aggregate';
  aggregate?: Maybe<AuthUserRoles_Aggregate_Fields>;
  nodes: Array<AuthUserRoles>;
};

export type AuthUserRoles_Aggregate_Bool_Exp = {
  count?: InputMaybe<AuthUserRoles_Aggregate_Bool_Exp_Count>;
};

export type AuthUserRoles_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<AuthUserRoles_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<AuthUserRoles_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "auth.user_roles" */
export type AuthUserRoles_Aggregate_Fields = {
  __typename?: 'authUserRoles_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<AuthUserRoles_Max_Fields>;
  min?: Maybe<AuthUserRoles_Min_Fields>;
};


/** aggregate fields of "auth.user_roles" */
export type AuthUserRoles_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AuthUserRoles_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "auth.user_roles" */
export type AuthUserRoles_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<AuthUserRoles_Max_Order_By>;
  min?: InputMaybe<AuthUserRoles_Min_Order_By>;
};

/** input type for inserting array relation for remote table "auth.user_roles" */
export type AuthUserRoles_Arr_Rel_Insert_Input = {
  data: Array<AuthUserRoles_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<AuthUserRoles_On_Conflict>;
};

/** Boolean expression to filter rows from the table "auth.user_roles". All fields are combined with a logical 'AND'. */
export type AuthUserRoles_Bool_Exp = {
  _and?: InputMaybe<Array<AuthUserRoles_Bool_Exp>>;
  _not?: InputMaybe<AuthUserRoles_Bool_Exp>;
  _or?: InputMaybe<Array<AuthUserRoles_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  role?: InputMaybe<String_Comparison_Exp>;
  roleByRole?: InputMaybe<AuthRoles_Bool_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "auth.user_roles" */
export enum AuthUserRoles_Constraint {
  /** unique or primary key constraint on columns "id" */
  UserRolesPkey = 'user_roles_pkey',
  /** unique or primary key constraint on columns "user_id", "role" */
  UserRolesUserIdRoleKey = 'user_roles_user_id_role_key'
}

/** input type for inserting data into table "auth.user_roles" */
export type AuthUserRoles_Insert_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  roleByRole?: InputMaybe<AuthRoles_Obj_Rel_Insert_Input>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type AuthUserRoles_Max_Fields = {
  __typename?: 'authUserRoles_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "auth.user_roles" */
export type AuthUserRoles_Max_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type AuthUserRoles_Min_Fields = {
  __typename?: 'authUserRoles_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "auth.user_roles" */
export type AuthUserRoles_Min_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "auth.user_roles" */
export type AuthUserRoles_Mutation_Response = {
  __typename?: 'authUserRoles_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<AuthUserRoles>;
};

/** on_conflict condition type for table "auth.user_roles" */
export type AuthUserRoles_On_Conflict = {
  constraint: AuthUserRoles_Constraint;
  update_columns?: Array<AuthUserRoles_Update_Column>;
  where?: InputMaybe<AuthUserRoles_Bool_Exp>;
};

/** Ordering options when selecting data from "auth.user_roles". */
export type AuthUserRoles_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  roleByRole?: InputMaybe<AuthRoles_Order_By>;
  user?: InputMaybe<Users_Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: auth.user_roles */
export type AuthUserRoles_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "auth.user_roles" */
export enum AuthUserRoles_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Role = 'role',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "auth.user_roles" */
export type AuthUserRoles_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "authUserRoles" */
export type AuthUserRoles_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AuthUserRoles_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AuthUserRoles_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "auth.user_roles" */
export enum AuthUserRoles_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Role = 'role',
  /** column name */
  UserId = 'userId'
}

export type AuthUserRoles_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AuthUserRoles_Set_Input>;
  /** filter the rows which have to be updated */
  where: AuthUserRoles_Bool_Exp;
};

/** User webauthn security keys. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthUserSecurityKeys = {
  __typename?: 'authUserSecurityKeys';
  counter: Scalars['bigint']['output'];
  credentialId: Scalars['String']['output'];
  credentialPublicKey?: Maybe<Scalars['bytea']['output']>;
  id: Scalars['uuid']['output'];
  nickname?: Maybe<Scalars['String']['output']>;
  transports: Scalars['String']['output'];
  /** An object relationship */
  user: Users;
  userId: Scalars['uuid']['output'];
};

/** aggregated selection of "auth.user_security_keys" */
export type AuthUserSecurityKeys_Aggregate = {
  __typename?: 'authUserSecurityKeys_aggregate';
  aggregate?: Maybe<AuthUserSecurityKeys_Aggregate_Fields>;
  nodes: Array<AuthUserSecurityKeys>;
};

export type AuthUserSecurityKeys_Aggregate_Bool_Exp = {
  count?: InputMaybe<AuthUserSecurityKeys_Aggregate_Bool_Exp_Count>;
};

export type AuthUserSecurityKeys_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<AuthUserSecurityKeys_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<AuthUserSecurityKeys_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "auth.user_security_keys" */
export type AuthUserSecurityKeys_Aggregate_Fields = {
  __typename?: 'authUserSecurityKeys_aggregate_fields';
  avg?: Maybe<AuthUserSecurityKeys_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<AuthUserSecurityKeys_Max_Fields>;
  min?: Maybe<AuthUserSecurityKeys_Min_Fields>;
  stddev?: Maybe<AuthUserSecurityKeys_Stddev_Fields>;
  stddev_pop?: Maybe<AuthUserSecurityKeys_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<AuthUserSecurityKeys_Stddev_Samp_Fields>;
  sum?: Maybe<AuthUserSecurityKeys_Sum_Fields>;
  var_pop?: Maybe<AuthUserSecurityKeys_Var_Pop_Fields>;
  var_samp?: Maybe<AuthUserSecurityKeys_Var_Samp_Fields>;
  variance?: Maybe<AuthUserSecurityKeys_Variance_Fields>;
};


/** aggregate fields of "auth.user_security_keys" */
export type AuthUserSecurityKeys_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AuthUserSecurityKeys_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Aggregate_Order_By = {
  avg?: InputMaybe<AuthUserSecurityKeys_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<AuthUserSecurityKeys_Max_Order_By>;
  min?: InputMaybe<AuthUserSecurityKeys_Min_Order_By>;
  stddev?: InputMaybe<AuthUserSecurityKeys_Stddev_Order_By>;
  stddev_pop?: InputMaybe<AuthUserSecurityKeys_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<AuthUserSecurityKeys_Stddev_Samp_Order_By>;
  sum?: InputMaybe<AuthUserSecurityKeys_Sum_Order_By>;
  var_pop?: InputMaybe<AuthUserSecurityKeys_Var_Pop_Order_By>;
  var_samp?: InputMaybe<AuthUserSecurityKeys_Var_Samp_Order_By>;
  variance?: InputMaybe<AuthUserSecurityKeys_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Arr_Rel_Insert_Input = {
  data: Array<AuthUserSecurityKeys_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<AuthUserSecurityKeys_On_Conflict>;
};

/** aggregate avg on columns */
export type AuthUserSecurityKeys_Avg_Fields = {
  __typename?: 'authUserSecurityKeys_avg_fields';
  counter?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Avg_Order_By = {
  counter?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "auth.user_security_keys". All fields are combined with a logical 'AND'. */
export type AuthUserSecurityKeys_Bool_Exp = {
  _and?: InputMaybe<Array<AuthUserSecurityKeys_Bool_Exp>>;
  _not?: InputMaybe<AuthUserSecurityKeys_Bool_Exp>;
  _or?: InputMaybe<Array<AuthUserSecurityKeys_Bool_Exp>>;
  counter?: InputMaybe<Bigint_Comparison_Exp>;
  credentialId?: InputMaybe<String_Comparison_Exp>;
  credentialPublicKey?: InputMaybe<Bytea_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  nickname?: InputMaybe<String_Comparison_Exp>;
  transports?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "auth.user_security_keys" */
export enum AuthUserSecurityKeys_Constraint {
  /** unique or primary key constraint on columns "credential_id" */
  UserSecurityKeyCredentialIdKey = 'user_security_key_credential_id_key',
  /** unique or primary key constraint on columns "id" */
  UserSecurityKeysPkey = 'user_security_keys_pkey'
}

/** input type for incrementing numeric columns in table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Inc_Input = {
  counter?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Insert_Input = {
  counter?: InputMaybe<Scalars['bigint']['input']>;
  credentialId?: InputMaybe<Scalars['String']['input']>;
  credentialPublicKey?: InputMaybe<Scalars['bytea']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  transports?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type AuthUserSecurityKeys_Max_Fields = {
  __typename?: 'authUserSecurityKeys_max_fields';
  counter?: Maybe<Scalars['bigint']['output']>;
  credentialId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  transports?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Max_Order_By = {
  counter?: InputMaybe<Order_By>;
  credentialId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  nickname?: InputMaybe<Order_By>;
  transports?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type AuthUserSecurityKeys_Min_Fields = {
  __typename?: 'authUserSecurityKeys_min_fields';
  counter?: Maybe<Scalars['bigint']['output']>;
  credentialId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  transports?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Min_Order_By = {
  counter?: InputMaybe<Order_By>;
  credentialId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  nickname?: InputMaybe<Order_By>;
  transports?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Mutation_Response = {
  __typename?: 'authUserSecurityKeys_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<AuthUserSecurityKeys>;
};

/** on_conflict condition type for table "auth.user_security_keys" */
export type AuthUserSecurityKeys_On_Conflict = {
  constraint: AuthUserSecurityKeys_Constraint;
  update_columns?: Array<AuthUserSecurityKeys_Update_Column>;
  where?: InputMaybe<AuthUserSecurityKeys_Bool_Exp>;
};

/** Ordering options when selecting data from "auth.user_security_keys". */
export type AuthUserSecurityKeys_Order_By = {
  counter?: InputMaybe<Order_By>;
  credentialId?: InputMaybe<Order_By>;
  credentialPublicKey?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  nickname?: InputMaybe<Order_By>;
  transports?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: auth.user_security_keys */
export type AuthUserSecurityKeys_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "auth.user_security_keys" */
export enum AuthUserSecurityKeys_Select_Column {
  /** column name */
  Counter = 'counter',
  /** column name */
  CredentialId = 'credentialId',
  /** column name */
  CredentialPublicKey = 'credentialPublicKey',
  /** column name */
  Id = 'id',
  /** column name */
  Nickname = 'nickname',
  /** column name */
  Transports = 'transports',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Set_Input = {
  counter?: InputMaybe<Scalars['bigint']['input']>;
  credentialId?: InputMaybe<Scalars['String']['input']>;
  credentialPublicKey?: InputMaybe<Scalars['bytea']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  transports?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type AuthUserSecurityKeys_Stddev_Fields = {
  __typename?: 'authUserSecurityKeys_stddev_fields';
  counter?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Stddev_Order_By = {
  counter?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type AuthUserSecurityKeys_Stddev_Pop_Fields = {
  __typename?: 'authUserSecurityKeys_stddev_pop_fields';
  counter?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Stddev_Pop_Order_By = {
  counter?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type AuthUserSecurityKeys_Stddev_Samp_Fields = {
  __typename?: 'authUserSecurityKeys_stddev_samp_fields';
  counter?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Stddev_Samp_Order_By = {
  counter?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "authUserSecurityKeys" */
export type AuthUserSecurityKeys_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AuthUserSecurityKeys_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AuthUserSecurityKeys_Stream_Cursor_Value_Input = {
  counter?: InputMaybe<Scalars['bigint']['input']>;
  credentialId?: InputMaybe<Scalars['String']['input']>;
  credentialPublicKey?: InputMaybe<Scalars['bytea']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  transports?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type AuthUserSecurityKeys_Sum_Fields = {
  __typename?: 'authUserSecurityKeys_sum_fields';
  counter?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Sum_Order_By = {
  counter?: InputMaybe<Order_By>;
};

/** update columns of table "auth.user_security_keys" */
export enum AuthUserSecurityKeys_Update_Column {
  /** column name */
  Counter = 'counter',
  /** column name */
  CredentialId = 'credentialId',
  /** column name */
  CredentialPublicKey = 'credentialPublicKey',
  /** column name */
  Id = 'id',
  /** column name */
  Nickname = 'nickname',
  /** column name */
  Transports = 'transports',
  /** column name */
  UserId = 'userId'
}

export type AuthUserSecurityKeys_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<AuthUserSecurityKeys_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AuthUserSecurityKeys_Set_Input>;
  /** filter the rows which have to be updated */
  where: AuthUserSecurityKeys_Bool_Exp;
};

/** aggregate var_pop on columns */
export type AuthUserSecurityKeys_Var_Pop_Fields = {
  __typename?: 'authUserSecurityKeys_var_pop_fields';
  counter?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Var_Pop_Order_By = {
  counter?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type AuthUserSecurityKeys_Var_Samp_Fields = {
  __typename?: 'authUserSecurityKeys_var_samp_fields';
  counter?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Var_Samp_Order_By = {
  counter?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type AuthUserSecurityKeys_Variance_Fields = {
  __typename?: 'authUserSecurityKeys_variance_fields';
  counter?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Variance_Order_By = {
  counter?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bigint']['input']>;
  _gt?: InputMaybe<Scalars['bigint']['input']>;
  _gte?: InputMaybe<Scalars['bigint']['input']>;
  _in?: InputMaybe<Array<Scalars['bigint']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['bigint']['input']>;
  _lte?: InputMaybe<Scalars['bigint']['input']>;
  _neq?: InputMaybe<Scalars['bigint']['input']>;
  _nin?: InputMaybe<Array<Scalars['bigint']['input']>>;
};

/** columns and relationships of "blog_comment_helpful" */
export type Blog_Comment_Helpful = {
  __typename?: 'blog_comment_helpful';
  /** An object relationship */
  blog_comment: Blog_Comments;
  comment_id: Scalars['uuid']['output'];
  created_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid']['output'];
};

/** aggregated selection of "blog_comment_helpful" */
export type Blog_Comment_Helpful_Aggregate = {
  __typename?: 'blog_comment_helpful_aggregate';
  aggregate?: Maybe<Blog_Comment_Helpful_Aggregate_Fields>;
  nodes: Array<Blog_Comment_Helpful>;
};

export type Blog_Comment_Helpful_Aggregate_Bool_Exp = {
  count?: InputMaybe<Blog_Comment_Helpful_Aggregate_Bool_Exp_Count>;
};

export type Blog_Comment_Helpful_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Blog_Comment_Helpful_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Blog_Comment_Helpful_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "blog_comment_helpful" */
export type Blog_Comment_Helpful_Aggregate_Fields = {
  __typename?: 'blog_comment_helpful_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Blog_Comment_Helpful_Max_Fields>;
  min?: Maybe<Blog_Comment_Helpful_Min_Fields>;
};


/** aggregate fields of "blog_comment_helpful" */
export type Blog_Comment_Helpful_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Blog_Comment_Helpful_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "blog_comment_helpful" */
export type Blog_Comment_Helpful_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Blog_Comment_Helpful_Max_Order_By>;
  min?: InputMaybe<Blog_Comment_Helpful_Min_Order_By>;
};

/** input type for inserting array relation for remote table "blog_comment_helpful" */
export type Blog_Comment_Helpful_Arr_Rel_Insert_Input = {
  data: Array<Blog_Comment_Helpful_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Blog_Comment_Helpful_On_Conflict>;
};

/** Boolean expression to filter rows from the table "blog_comment_helpful". All fields are combined with a logical 'AND'. */
export type Blog_Comment_Helpful_Bool_Exp = {
  _and?: InputMaybe<Array<Blog_Comment_Helpful_Bool_Exp>>;
  _not?: InputMaybe<Blog_Comment_Helpful_Bool_Exp>;
  _or?: InputMaybe<Array<Blog_Comment_Helpful_Bool_Exp>>;
  blog_comment?: InputMaybe<Blog_Comments_Bool_Exp>;
  comment_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "blog_comment_helpful" */
export enum Blog_Comment_Helpful_Constraint {
  /** unique or primary key constraint on columns "user_id", "comment_id" */
  BlogCommentHelpfulPkey = 'blog_comment_helpful_pkey'
}

/** input type for inserting data into table "blog_comment_helpful" */
export type Blog_Comment_Helpful_Insert_Input = {
  blog_comment?: InputMaybe<Blog_Comments_Obj_Rel_Insert_Input>;
  comment_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Blog_Comment_Helpful_Max_Fields = {
  __typename?: 'blog_comment_helpful_max_fields';
  comment_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "blog_comment_helpful" */
export type Blog_Comment_Helpful_Max_Order_By = {
  comment_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Blog_Comment_Helpful_Min_Fields = {
  __typename?: 'blog_comment_helpful_min_fields';
  comment_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "blog_comment_helpful" */
export type Blog_Comment_Helpful_Min_Order_By = {
  comment_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "blog_comment_helpful" */
export type Blog_Comment_Helpful_Mutation_Response = {
  __typename?: 'blog_comment_helpful_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Blog_Comment_Helpful>;
};

/** on_conflict condition type for table "blog_comment_helpful" */
export type Blog_Comment_Helpful_On_Conflict = {
  constraint: Blog_Comment_Helpful_Constraint;
  update_columns?: Array<Blog_Comment_Helpful_Update_Column>;
  where?: InputMaybe<Blog_Comment_Helpful_Bool_Exp>;
};

/** Ordering options when selecting data from "blog_comment_helpful". */
export type Blog_Comment_Helpful_Order_By = {
  blog_comment?: InputMaybe<Blog_Comments_Order_By>;
  comment_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: blog_comment_helpful */
export type Blog_Comment_Helpful_Pk_Columns_Input = {
  comment_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};

/** select columns of table "blog_comment_helpful" */
export enum Blog_Comment_Helpful_Select_Column {
  /** column name */
  CommentId = 'comment_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "blog_comment_helpful" */
export type Blog_Comment_Helpful_Set_Input = {
  comment_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "blog_comment_helpful" */
export type Blog_Comment_Helpful_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Blog_Comment_Helpful_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Blog_Comment_Helpful_Stream_Cursor_Value_Input = {
  comment_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "blog_comment_helpful" */
export enum Blog_Comment_Helpful_Update_Column {
  /** column name */
  CommentId = 'comment_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  UserId = 'user_id'
}

export type Blog_Comment_Helpful_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Blog_Comment_Helpful_Set_Input>;
  /** filter the rows which have to be updated */
  where: Blog_Comment_Helpful_Bool_Exp;
};

/** columns and relationships of "blog_comment_reports" */
export type Blog_Comment_Reports = {
  __typename?: 'blog_comment_reports';
  /** An object relationship */
  blog_comment: Blog_Comments;
  comment_id: Scalars['uuid']['output'];
  created_at: Scalars['timestamptz']['output'];
  details?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  reason: Scalars['String']['output'];
  reporter_id: Scalars['uuid']['output'];
  status: Scalars['String']['output'];
  /** An object relationship */
  user: Users;
};

/** aggregated selection of "blog_comment_reports" */
export type Blog_Comment_Reports_Aggregate = {
  __typename?: 'blog_comment_reports_aggregate';
  aggregate?: Maybe<Blog_Comment_Reports_Aggregate_Fields>;
  nodes: Array<Blog_Comment_Reports>;
};

export type Blog_Comment_Reports_Aggregate_Bool_Exp = {
  count?: InputMaybe<Blog_Comment_Reports_Aggregate_Bool_Exp_Count>;
};

export type Blog_Comment_Reports_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Blog_Comment_Reports_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Blog_Comment_Reports_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "blog_comment_reports" */
export type Blog_Comment_Reports_Aggregate_Fields = {
  __typename?: 'blog_comment_reports_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Blog_Comment_Reports_Max_Fields>;
  min?: Maybe<Blog_Comment_Reports_Min_Fields>;
};


/** aggregate fields of "blog_comment_reports" */
export type Blog_Comment_Reports_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Blog_Comment_Reports_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "blog_comment_reports" */
export type Blog_Comment_Reports_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Blog_Comment_Reports_Max_Order_By>;
  min?: InputMaybe<Blog_Comment_Reports_Min_Order_By>;
};

/** input type for inserting array relation for remote table "blog_comment_reports" */
export type Blog_Comment_Reports_Arr_Rel_Insert_Input = {
  data: Array<Blog_Comment_Reports_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Blog_Comment_Reports_On_Conflict>;
};

/** Boolean expression to filter rows from the table "blog_comment_reports". All fields are combined with a logical 'AND'. */
export type Blog_Comment_Reports_Bool_Exp = {
  _and?: InputMaybe<Array<Blog_Comment_Reports_Bool_Exp>>;
  _not?: InputMaybe<Blog_Comment_Reports_Bool_Exp>;
  _or?: InputMaybe<Array<Blog_Comment_Reports_Bool_Exp>>;
  blog_comment?: InputMaybe<Blog_Comments_Bool_Exp>;
  comment_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  details?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  reason?: InputMaybe<String_Comparison_Exp>;
  reporter_id?: InputMaybe<Uuid_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
};

/** unique or primary key constraints on table "blog_comment_reports" */
export enum Blog_Comment_Reports_Constraint {
  /** unique or primary key constraint on columns "id" */
  BlogCommentReportsPkey = 'blog_comment_reports_pkey',
  /** unique or primary key constraint on columns "comment_id", "reporter_id" */
  BlogCommentReportsUniquePerUser = 'blog_comment_reports_unique_per_user'
}

/** input type for inserting data into table "blog_comment_reports" */
export type Blog_Comment_Reports_Insert_Input = {
  blog_comment?: InputMaybe<Blog_Comments_Obj_Rel_Insert_Input>;
  comment_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  details?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  reporter_id?: InputMaybe<Scalars['uuid']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Blog_Comment_Reports_Max_Fields = {
  __typename?: 'blog_comment_reports_max_fields';
  comment_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  details?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  reporter_id?: Maybe<Scalars['uuid']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "blog_comment_reports" */
export type Blog_Comment_Reports_Max_Order_By = {
  comment_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  details?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  reason?: InputMaybe<Order_By>;
  reporter_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Blog_Comment_Reports_Min_Fields = {
  __typename?: 'blog_comment_reports_min_fields';
  comment_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  details?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  reporter_id?: Maybe<Scalars['uuid']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "blog_comment_reports" */
export type Blog_Comment_Reports_Min_Order_By = {
  comment_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  details?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  reason?: InputMaybe<Order_By>;
  reporter_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "blog_comment_reports" */
export type Blog_Comment_Reports_Mutation_Response = {
  __typename?: 'blog_comment_reports_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Blog_Comment_Reports>;
};

/** on_conflict condition type for table "blog_comment_reports" */
export type Blog_Comment_Reports_On_Conflict = {
  constraint: Blog_Comment_Reports_Constraint;
  update_columns?: Array<Blog_Comment_Reports_Update_Column>;
  where?: InputMaybe<Blog_Comment_Reports_Bool_Exp>;
};

/** Ordering options when selecting data from "blog_comment_reports". */
export type Blog_Comment_Reports_Order_By = {
  blog_comment?: InputMaybe<Blog_Comments_Order_By>;
  comment_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  details?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  reason?: InputMaybe<Order_By>;
  reporter_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
};

/** primary key columns input for table: blog_comment_reports */
export type Blog_Comment_Reports_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "blog_comment_reports" */
export enum Blog_Comment_Reports_Select_Column {
  /** column name */
  CommentId = 'comment_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Details = 'details',
  /** column name */
  Id = 'id',
  /** column name */
  Reason = 'reason',
  /** column name */
  ReporterId = 'reporter_id',
  /** column name */
  Status = 'status'
}

/** input type for updating data in table "blog_comment_reports" */
export type Blog_Comment_Reports_Set_Input = {
  comment_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  details?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  reporter_id?: InputMaybe<Scalars['uuid']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "blog_comment_reports" */
export type Blog_Comment_Reports_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Blog_Comment_Reports_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Blog_Comment_Reports_Stream_Cursor_Value_Input = {
  comment_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  details?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  reporter_id?: InputMaybe<Scalars['uuid']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "blog_comment_reports" */
export enum Blog_Comment_Reports_Update_Column {
  /** column name */
  CommentId = 'comment_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Details = 'details',
  /** column name */
  Id = 'id',
  /** column name */
  Reason = 'reason',
  /** column name */
  ReporterId = 'reporter_id',
  /** column name */
  Status = 'status'
}

export type Blog_Comment_Reports_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Blog_Comment_Reports_Set_Input>;
  /** filter the rows which have to be updated */
  where: Blog_Comment_Reports_Bool_Exp;
};

/** columns and relationships of "blog_comments" */
export type Blog_Comments = {
  __typename?: 'blog_comments';
  /** An array relationship */
  blog_comment_helpfuls: Array<Blog_Comment_Helpful>;
  /** An aggregate relationship */
  blog_comment_helpfuls_aggregate: Blog_Comment_Helpful_Aggregate;
  blog_slug: Scalars['String']['output'];
  body: Scalars['String']['output'];
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  is_helpful: Scalars['Int']['output'];
  /** An object relationship */
  parent?: Maybe<Blog_Comments>;
  parent_id?: Maybe<Scalars['uuid']['output']>;
  /** An array relationship */
  replies: Array<Blog_Comments>;
  /** An aggregate relationship */
  replies_aggregate: Blog_Comments_Aggregate;
  updated_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid']['output'];
};


/** columns and relationships of "blog_comments" */
export type Blog_CommentsBlog_Comment_HelpfulsArgs = {
  distinct_on?: InputMaybe<Array<Blog_Comment_Helpful_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Blog_Comment_Helpful_Order_By>>;
  where?: InputMaybe<Blog_Comment_Helpful_Bool_Exp>;
};


/** columns and relationships of "blog_comments" */
export type Blog_CommentsBlog_Comment_Helpfuls_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Blog_Comment_Helpful_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Blog_Comment_Helpful_Order_By>>;
  where?: InputMaybe<Blog_Comment_Helpful_Bool_Exp>;
};


/** columns and relationships of "blog_comments" */
export type Blog_CommentsRepliesArgs = {
  distinct_on?: InputMaybe<Array<Blog_Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Blog_Comments_Order_By>>;
  where?: InputMaybe<Blog_Comments_Bool_Exp>;
};


/** columns and relationships of "blog_comments" */
export type Blog_CommentsReplies_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Blog_Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Blog_Comments_Order_By>>;
  where?: InputMaybe<Blog_Comments_Bool_Exp>;
};

/** aggregated selection of "blog_comments" */
export type Blog_Comments_Aggregate = {
  __typename?: 'blog_comments_aggregate';
  aggregate?: Maybe<Blog_Comments_Aggregate_Fields>;
  nodes: Array<Blog_Comments>;
};

export type Blog_Comments_Aggregate_Bool_Exp = {
  count?: InputMaybe<Blog_Comments_Aggregate_Bool_Exp_Count>;
};

export type Blog_Comments_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Blog_Comments_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Blog_Comments_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "blog_comments" */
export type Blog_Comments_Aggregate_Fields = {
  __typename?: 'blog_comments_aggregate_fields';
  avg?: Maybe<Blog_Comments_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Blog_Comments_Max_Fields>;
  min?: Maybe<Blog_Comments_Min_Fields>;
  stddev?: Maybe<Blog_Comments_Stddev_Fields>;
  stddev_pop?: Maybe<Blog_Comments_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Blog_Comments_Stddev_Samp_Fields>;
  sum?: Maybe<Blog_Comments_Sum_Fields>;
  var_pop?: Maybe<Blog_Comments_Var_Pop_Fields>;
  var_samp?: Maybe<Blog_Comments_Var_Samp_Fields>;
  variance?: Maybe<Blog_Comments_Variance_Fields>;
};


/** aggregate fields of "blog_comments" */
export type Blog_Comments_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Blog_Comments_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "blog_comments" */
export type Blog_Comments_Aggregate_Order_By = {
  avg?: InputMaybe<Blog_Comments_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Blog_Comments_Max_Order_By>;
  min?: InputMaybe<Blog_Comments_Min_Order_By>;
  stddev?: InputMaybe<Blog_Comments_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Blog_Comments_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Blog_Comments_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Blog_Comments_Sum_Order_By>;
  var_pop?: InputMaybe<Blog_Comments_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Blog_Comments_Var_Samp_Order_By>;
  variance?: InputMaybe<Blog_Comments_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "blog_comments" */
export type Blog_Comments_Arr_Rel_Insert_Input = {
  data: Array<Blog_Comments_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Blog_Comments_On_Conflict>;
};

/** aggregate avg on columns */
export type Blog_Comments_Avg_Fields = {
  __typename?: 'blog_comments_avg_fields';
  is_helpful?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "blog_comments" */
export type Blog_Comments_Avg_Order_By = {
  is_helpful?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "blog_comments". All fields are combined with a logical 'AND'. */
export type Blog_Comments_Bool_Exp = {
  _and?: InputMaybe<Array<Blog_Comments_Bool_Exp>>;
  _not?: InputMaybe<Blog_Comments_Bool_Exp>;
  _or?: InputMaybe<Array<Blog_Comments_Bool_Exp>>;
  blog_comment_helpfuls?: InputMaybe<Blog_Comment_Helpful_Bool_Exp>;
  blog_comment_helpfuls_aggregate?: InputMaybe<Blog_Comment_Helpful_Aggregate_Bool_Exp>;
  blog_slug?: InputMaybe<String_Comparison_Exp>;
  body?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  is_helpful?: InputMaybe<Int_Comparison_Exp>;
  parent?: InputMaybe<Blog_Comments_Bool_Exp>;
  parent_id?: InputMaybe<Uuid_Comparison_Exp>;
  replies?: InputMaybe<Blog_Comments_Bool_Exp>;
  replies_aggregate?: InputMaybe<Blog_Comments_Aggregate_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "blog_comments" */
export enum Blog_Comments_Constraint {
  /** unique or primary key constraint on columns "id" */
  BlogCommentsPkey = 'blog_comments_pkey'
}

/** input type for incrementing numeric columns in table "blog_comments" */
export type Blog_Comments_Inc_Input = {
  is_helpful?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "blog_comments" */
export type Blog_Comments_Insert_Input = {
  blog_comment_helpfuls?: InputMaybe<Blog_Comment_Helpful_Arr_Rel_Insert_Input>;
  blog_slug?: InputMaybe<Scalars['String']['input']>;
  body?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_helpful?: InputMaybe<Scalars['Int']['input']>;
  parent?: InputMaybe<Blog_Comments_Obj_Rel_Insert_Input>;
  parent_id?: InputMaybe<Scalars['uuid']['input']>;
  replies?: InputMaybe<Blog_Comments_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Blog_Comments_Max_Fields = {
  __typename?: 'blog_comments_max_fields';
  blog_slug?: Maybe<Scalars['String']['output']>;
  body?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  is_helpful?: Maybe<Scalars['Int']['output']>;
  parent_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "blog_comments" */
export type Blog_Comments_Max_Order_By = {
  blog_slug?: InputMaybe<Order_By>;
  body?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_helpful?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Blog_Comments_Min_Fields = {
  __typename?: 'blog_comments_min_fields';
  blog_slug?: Maybe<Scalars['String']['output']>;
  body?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  is_helpful?: Maybe<Scalars['Int']['output']>;
  parent_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "blog_comments" */
export type Blog_Comments_Min_Order_By = {
  blog_slug?: InputMaybe<Order_By>;
  body?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_helpful?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "blog_comments" */
export type Blog_Comments_Mutation_Response = {
  __typename?: 'blog_comments_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Blog_Comments>;
};

/** input type for inserting object relation for remote table "blog_comments" */
export type Blog_Comments_Obj_Rel_Insert_Input = {
  data: Blog_Comments_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Blog_Comments_On_Conflict>;
};

/** on_conflict condition type for table "blog_comments" */
export type Blog_Comments_On_Conflict = {
  constraint: Blog_Comments_Constraint;
  update_columns?: Array<Blog_Comments_Update_Column>;
  where?: InputMaybe<Blog_Comments_Bool_Exp>;
};

/** Ordering options when selecting data from "blog_comments". */
export type Blog_Comments_Order_By = {
  blog_comment_helpfuls_aggregate?: InputMaybe<Blog_Comment_Helpful_Aggregate_Order_By>;
  blog_slug?: InputMaybe<Order_By>;
  body?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_helpful?: InputMaybe<Order_By>;
  parent?: InputMaybe<Blog_Comments_Order_By>;
  parent_id?: InputMaybe<Order_By>;
  replies_aggregate?: InputMaybe<Blog_Comments_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: blog_comments */
export type Blog_Comments_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "blog_comments" */
export enum Blog_Comments_Select_Column {
  /** column name */
  BlogSlug = 'blog_slug',
  /** column name */
  Body = 'body',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsHelpful = 'is_helpful',
  /** column name */
  ParentId = 'parent_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "blog_comments" */
export type Blog_Comments_Set_Input = {
  blog_slug?: InputMaybe<Scalars['String']['input']>;
  body?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_helpful?: InputMaybe<Scalars['Int']['input']>;
  parent_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Blog_Comments_Stddev_Fields = {
  __typename?: 'blog_comments_stddev_fields';
  is_helpful?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "blog_comments" */
export type Blog_Comments_Stddev_Order_By = {
  is_helpful?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Blog_Comments_Stddev_Pop_Fields = {
  __typename?: 'blog_comments_stddev_pop_fields';
  is_helpful?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "blog_comments" */
export type Blog_Comments_Stddev_Pop_Order_By = {
  is_helpful?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Blog_Comments_Stddev_Samp_Fields = {
  __typename?: 'blog_comments_stddev_samp_fields';
  is_helpful?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "blog_comments" */
export type Blog_Comments_Stddev_Samp_Order_By = {
  is_helpful?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "blog_comments" */
export type Blog_Comments_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Blog_Comments_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Blog_Comments_Stream_Cursor_Value_Input = {
  blog_slug?: InputMaybe<Scalars['String']['input']>;
  body?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_helpful?: InputMaybe<Scalars['Int']['input']>;
  parent_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type Blog_Comments_Sum_Fields = {
  __typename?: 'blog_comments_sum_fields';
  is_helpful?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "blog_comments" */
export type Blog_Comments_Sum_Order_By = {
  is_helpful?: InputMaybe<Order_By>;
};

/** update columns of table "blog_comments" */
export enum Blog_Comments_Update_Column {
  /** column name */
  BlogSlug = 'blog_slug',
  /** column name */
  Body = 'body',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsHelpful = 'is_helpful',
  /** column name */
  ParentId = 'parent_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

export type Blog_Comments_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Blog_Comments_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Blog_Comments_Set_Input>;
  /** filter the rows which have to be updated */
  where: Blog_Comments_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Blog_Comments_Var_Pop_Fields = {
  __typename?: 'blog_comments_var_pop_fields';
  is_helpful?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "blog_comments" */
export type Blog_Comments_Var_Pop_Order_By = {
  is_helpful?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Blog_Comments_Var_Samp_Fields = {
  __typename?: 'blog_comments_var_samp_fields';
  is_helpful?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "blog_comments" */
export type Blog_Comments_Var_Samp_Order_By = {
  is_helpful?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Blog_Comments_Variance_Fields = {
  __typename?: 'blog_comments_variance_fields';
  is_helpful?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "blog_comments" */
export type Blog_Comments_Variance_Order_By = {
  is_helpful?: InputMaybe<Order_By>;
};

/** columns and relationships of "storage.buckets" */
export type Buckets = {
  __typename?: 'buckets';
  cacheControl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['timestamptz']['output'];
  downloadExpiration: Scalars['Int']['output'];
  /** An array relationship */
  files: Array<Files>;
  /** An aggregate relationship */
  files_aggregate: Files_Aggregate;
  id: Scalars['String']['output'];
  maxUploadFileSize: Scalars['Int']['output'];
  minUploadFileSize: Scalars['Int']['output'];
  presignedUrlsEnabled: Scalars['Boolean']['output'];
  updatedAt: Scalars['timestamptz']['output'];
};


/** columns and relationships of "storage.buckets" */
export type BucketsFilesArgs = {
  distinct_on?: InputMaybe<Array<Files_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Files_Order_By>>;
  where?: InputMaybe<Files_Bool_Exp>;
};


/** columns and relationships of "storage.buckets" */
export type BucketsFiles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Files_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Files_Order_By>>;
  where?: InputMaybe<Files_Bool_Exp>;
};

/** aggregated selection of "storage.buckets" */
export type Buckets_Aggregate = {
  __typename?: 'buckets_aggregate';
  aggregate?: Maybe<Buckets_Aggregate_Fields>;
  nodes: Array<Buckets>;
};

/** aggregate fields of "storage.buckets" */
export type Buckets_Aggregate_Fields = {
  __typename?: 'buckets_aggregate_fields';
  avg?: Maybe<Buckets_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Buckets_Max_Fields>;
  min?: Maybe<Buckets_Min_Fields>;
  stddev?: Maybe<Buckets_Stddev_Fields>;
  stddev_pop?: Maybe<Buckets_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Buckets_Stddev_Samp_Fields>;
  sum?: Maybe<Buckets_Sum_Fields>;
  var_pop?: Maybe<Buckets_Var_Pop_Fields>;
  var_samp?: Maybe<Buckets_Var_Samp_Fields>;
  variance?: Maybe<Buckets_Variance_Fields>;
};


/** aggregate fields of "storage.buckets" */
export type Buckets_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Buckets_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Buckets_Avg_Fields = {
  __typename?: 'buckets_avg_fields';
  downloadExpiration?: Maybe<Scalars['Float']['output']>;
  maxUploadFileSize?: Maybe<Scalars['Float']['output']>;
  minUploadFileSize?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "storage.buckets". All fields are combined with a logical 'AND'. */
export type Buckets_Bool_Exp = {
  _and?: InputMaybe<Array<Buckets_Bool_Exp>>;
  _not?: InputMaybe<Buckets_Bool_Exp>;
  _or?: InputMaybe<Array<Buckets_Bool_Exp>>;
  cacheControl?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  downloadExpiration?: InputMaybe<Int_Comparison_Exp>;
  files?: InputMaybe<Files_Bool_Exp>;
  files_aggregate?: InputMaybe<Files_Aggregate_Bool_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  maxUploadFileSize?: InputMaybe<Int_Comparison_Exp>;
  minUploadFileSize?: InputMaybe<Int_Comparison_Exp>;
  presignedUrlsEnabled?: InputMaybe<Boolean_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "storage.buckets" */
export enum Buckets_Constraint {
  /** unique or primary key constraint on columns "id" */
  BucketsPkey = 'buckets_pkey'
}

/** input type for incrementing numeric columns in table "storage.buckets" */
export type Buckets_Inc_Input = {
  downloadExpiration?: InputMaybe<Scalars['Int']['input']>;
  maxUploadFileSize?: InputMaybe<Scalars['Int']['input']>;
  minUploadFileSize?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "storage.buckets" */
export type Buckets_Insert_Input = {
  cacheControl?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  downloadExpiration?: InputMaybe<Scalars['Int']['input']>;
  files?: InputMaybe<Files_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['String']['input']>;
  maxUploadFileSize?: InputMaybe<Scalars['Int']['input']>;
  minUploadFileSize?: InputMaybe<Scalars['Int']['input']>;
  presignedUrlsEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Buckets_Max_Fields = {
  __typename?: 'buckets_max_fields';
  cacheControl?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  downloadExpiration?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  maxUploadFileSize?: Maybe<Scalars['Int']['output']>;
  minUploadFileSize?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Buckets_Min_Fields = {
  __typename?: 'buckets_min_fields';
  cacheControl?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  downloadExpiration?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  maxUploadFileSize?: Maybe<Scalars['Int']['output']>;
  minUploadFileSize?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "storage.buckets" */
export type Buckets_Mutation_Response = {
  __typename?: 'buckets_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Buckets>;
};

/** input type for inserting object relation for remote table "storage.buckets" */
export type Buckets_Obj_Rel_Insert_Input = {
  data: Buckets_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Buckets_On_Conflict>;
};

/** on_conflict condition type for table "storage.buckets" */
export type Buckets_On_Conflict = {
  constraint: Buckets_Constraint;
  update_columns?: Array<Buckets_Update_Column>;
  where?: InputMaybe<Buckets_Bool_Exp>;
};

/** Ordering options when selecting data from "storage.buckets". */
export type Buckets_Order_By = {
  cacheControl?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  downloadExpiration?: InputMaybe<Order_By>;
  files_aggregate?: InputMaybe<Files_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  maxUploadFileSize?: InputMaybe<Order_By>;
  minUploadFileSize?: InputMaybe<Order_By>;
  presignedUrlsEnabled?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: storage.buckets */
export type Buckets_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "storage.buckets" */
export enum Buckets_Select_Column {
  /** column name */
  CacheControl = 'cacheControl',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DownloadExpiration = 'downloadExpiration',
  /** column name */
  Id = 'id',
  /** column name */
  MaxUploadFileSize = 'maxUploadFileSize',
  /** column name */
  MinUploadFileSize = 'minUploadFileSize',
  /** column name */
  PresignedUrlsEnabled = 'presignedUrlsEnabled',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "storage.buckets" */
export type Buckets_Set_Input = {
  cacheControl?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  downloadExpiration?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  maxUploadFileSize?: InputMaybe<Scalars['Int']['input']>;
  minUploadFileSize?: InputMaybe<Scalars['Int']['input']>;
  presignedUrlsEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Buckets_Stddev_Fields = {
  __typename?: 'buckets_stddev_fields';
  downloadExpiration?: Maybe<Scalars['Float']['output']>;
  maxUploadFileSize?: Maybe<Scalars['Float']['output']>;
  minUploadFileSize?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Buckets_Stddev_Pop_Fields = {
  __typename?: 'buckets_stddev_pop_fields';
  downloadExpiration?: Maybe<Scalars['Float']['output']>;
  maxUploadFileSize?: Maybe<Scalars['Float']['output']>;
  minUploadFileSize?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Buckets_Stddev_Samp_Fields = {
  __typename?: 'buckets_stddev_samp_fields';
  downloadExpiration?: Maybe<Scalars['Float']['output']>;
  maxUploadFileSize?: Maybe<Scalars['Float']['output']>;
  minUploadFileSize?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "buckets" */
export type Buckets_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Buckets_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Buckets_Stream_Cursor_Value_Input = {
  cacheControl?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  downloadExpiration?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  maxUploadFileSize?: InputMaybe<Scalars['Int']['input']>;
  minUploadFileSize?: InputMaybe<Scalars['Int']['input']>;
  presignedUrlsEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Buckets_Sum_Fields = {
  __typename?: 'buckets_sum_fields';
  downloadExpiration?: Maybe<Scalars['Int']['output']>;
  maxUploadFileSize?: Maybe<Scalars['Int']['output']>;
  minUploadFileSize?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "storage.buckets" */
export enum Buckets_Update_Column {
  /** column name */
  CacheControl = 'cacheControl',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DownloadExpiration = 'downloadExpiration',
  /** column name */
  Id = 'id',
  /** column name */
  MaxUploadFileSize = 'maxUploadFileSize',
  /** column name */
  MinUploadFileSize = 'minUploadFileSize',
  /** column name */
  PresignedUrlsEnabled = 'presignedUrlsEnabled',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type Buckets_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Buckets_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Buckets_Set_Input>;
  /** filter the rows which have to be updated */
  where: Buckets_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Buckets_Var_Pop_Fields = {
  __typename?: 'buckets_var_pop_fields';
  downloadExpiration?: Maybe<Scalars['Float']['output']>;
  maxUploadFileSize?: Maybe<Scalars['Float']['output']>;
  minUploadFileSize?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Buckets_Var_Samp_Fields = {
  __typename?: 'buckets_var_samp_fields';
  downloadExpiration?: Maybe<Scalars['Float']['output']>;
  maxUploadFileSize?: Maybe<Scalars['Float']['output']>;
  minUploadFileSize?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Buckets_Variance_Fields = {
  __typename?: 'buckets_variance_fields';
  downloadExpiration?: Maybe<Scalars['Float']['output']>;
  maxUploadFileSize?: Maybe<Scalars['Float']['output']>;
  minUploadFileSize?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to compare columns of type "bytea". All fields are combined with logical 'AND'. */
export type Bytea_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bytea']['input']>;
  _gt?: InputMaybe<Scalars['bytea']['input']>;
  _gte?: InputMaybe<Scalars['bytea']['input']>;
  _in?: InputMaybe<Array<Scalars['bytea']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['bytea']['input']>;
  _lte?: InputMaybe<Scalars['bytea']['input']>;
  _neq?: InputMaybe<Scalars['bytea']['input']>;
  _nin?: InputMaybe<Array<Scalars['bytea']['input']>>;
};

/** Boolean expression to compare columns of type "citext". All fields are combined with logical 'AND'. */
export type Citext_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['citext']['input']>;
  _gt?: InputMaybe<Scalars['citext']['input']>;
  _gte?: InputMaybe<Scalars['citext']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['citext']['input']>;
  _in?: InputMaybe<Array<Scalars['citext']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['citext']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['citext']['input']>;
  _lt?: InputMaybe<Scalars['citext']['input']>;
  _lte?: InputMaybe<Scalars['citext']['input']>;
  _neq?: InputMaybe<Scalars['citext']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['citext']['input']>;
  _nin?: InputMaybe<Array<Scalars['citext']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['citext']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['citext']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['citext']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['citext']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['citext']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['citext']['input']>;
};

/** columns and relationships of "comment_likes" */
export type Comment_Likes = {
  __typename?: 'comment_likes';
  comment_id: Scalars['uuid']['output'];
  created_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  post_comment: Post_Comments;
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid']['output'];
};

/** aggregated selection of "comment_likes" */
export type Comment_Likes_Aggregate = {
  __typename?: 'comment_likes_aggregate';
  aggregate?: Maybe<Comment_Likes_Aggregate_Fields>;
  nodes: Array<Comment_Likes>;
};

export type Comment_Likes_Aggregate_Bool_Exp = {
  count?: InputMaybe<Comment_Likes_Aggregate_Bool_Exp_Count>;
};

export type Comment_Likes_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Comment_Likes_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Comment_Likes_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "comment_likes" */
export type Comment_Likes_Aggregate_Fields = {
  __typename?: 'comment_likes_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Comment_Likes_Max_Fields>;
  min?: Maybe<Comment_Likes_Min_Fields>;
};


/** aggregate fields of "comment_likes" */
export type Comment_Likes_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Comment_Likes_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "comment_likes" */
export type Comment_Likes_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Comment_Likes_Max_Order_By>;
  min?: InputMaybe<Comment_Likes_Min_Order_By>;
};

/** input type for inserting array relation for remote table "comment_likes" */
export type Comment_Likes_Arr_Rel_Insert_Input = {
  data: Array<Comment_Likes_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Comment_Likes_On_Conflict>;
};

/** Boolean expression to filter rows from the table "comment_likes". All fields are combined with a logical 'AND'. */
export type Comment_Likes_Bool_Exp = {
  _and?: InputMaybe<Array<Comment_Likes_Bool_Exp>>;
  _not?: InputMaybe<Comment_Likes_Bool_Exp>;
  _or?: InputMaybe<Array<Comment_Likes_Bool_Exp>>;
  comment_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  post_comment?: InputMaybe<Post_Comments_Bool_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "comment_likes" */
export enum Comment_Likes_Constraint {
  /** unique or primary key constraint on columns "user_id", "comment_id" */
  CommentLikesPkey = 'comment_likes_pkey'
}

/** input type for inserting data into table "comment_likes" */
export type Comment_Likes_Insert_Input = {
  comment_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  post_comment?: InputMaybe<Post_Comments_Obj_Rel_Insert_Input>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Comment_Likes_Max_Fields = {
  __typename?: 'comment_likes_max_fields';
  comment_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "comment_likes" */
export type Comment_Likes_Max_Order_By = {
  comment_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Comment_Likes_Min_Fields = {
  __typename?: 'comment_likes_min_fields';
  comment_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "comment_likes" */
export type Comment_Likes_Min_Order_By = {
  comment_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "comment_likes" */
export type Comment_Likes_Mutation_Response = {
  __typename?: 'comment_likes_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Comment_Likes>;
};

/** on_conflict condition type for table "comment_likes" */
export type Comment_Likes_On_Conflict = {
  constraint: Comment_Likes_Constraint;
  update_columns?: Array<Comment_Likes_Update_Column>;
  where?: InputMaybe<Comment_Likes_Bool_Exp>;
};

/** Ordering options when selecting data from "comment_likes". */
export type Comment_Likes_Order_By = {
  comment_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  post_comment?: InputMaybe<Post_Comments_Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: comment_likes */
export type Comment_Likes_Pk_Columns_Input = {
  comment_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};

/** select columns of table "comment_likes" */
export enum Comment_Likes_Select_Column {
  /** column name */
  CommentId = 'comment_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "comment_likes" */
export type Comment_Likes_Set_Input = {
  comment_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "comment_likes" */
export type Comment_Likes_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Comment_Likes_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Comment_Likes_Stream_Cursor_Value_Input = {
  comment_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "comment_likes" */
export enum Comment_Likes_Update_Column {
  /** column name */
  CommentId = 'comment_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  UserId = 'user_id'
}

export type Comment_Likes_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Comment_Likes_Set_Input>;
  /** filter the rows which have to be updated */
  where: Comment_Likes_Bool_Exp;
};

/** columns and relationships of "contribution_bookmarks" */
export type Contribution_Bookmarks = {
  __typename?: 'contribution_bookmarks';
  /** An object relationship */
  contribution: Contributions;
  contribution_id: Scalars['uuid']['output'];
  created_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid']['output'];
};

/** aggregated selection of "contribution_bookmarks" */
export type Contribution_Bookmarks_Aggregate = {
  __typename?: 'contribution_bookmarks_aggregate';
  aggregate?: Maybe<Contribution_Bookmarks_Aggregate_Fields>;
  nodes: Array<Contribution_Bookmarks>;
};

export type Contribution_Bookmarks_Aggregate_Bool_Exp = {
  count?: InputMaybe<Contribution_Bookmarks_Aggregate_Bool_Exp_Count>;
};

export type Contribution_Bookmarks_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Contribution_Bookmarks_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Contribution_Bookmarks_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "contribution_bookmarks" */
export type Contribution_Bookmarks_Aggregate_Fields = {
  __typename?: 'contribution_bookmarks_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Contribution_Bookmarks_Max_Fields>;
  min?: Maybe<Contribution_Bookmarks_Min_Fields>;
};


/** aggregate fields of "contribution_bookmarks" */
export type Contribution_Bookmarks_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Contribution_Bookmarks_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "contribution_bookmarks" */
export type Contribution_Bookmarks_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Contribution_Bookmarks_Max_Order_By>;
  min?: InputMaybe<Contribution_Bookmarks_Min_Order_By>;
};

/** input type for inserting array relation for remote table "contribution_bookmarks" */
export type Contribution_Bookmarks_Arr_Rel_Insert_Input = {
  data: Array<Contribution_Bookmarks_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Contribution_Bookmarks_On_Conflict>;
};

/** Boolean expression to filter rows from the table "contribution_bookmarks". All fields are combined with a logical 'AND'. */
export type Contribution_Bookmarks_Bool_Exp = {
  _and?: InputMaybe<Array<Contribution_Bookmarks_Bool_Exp>>;
  _not?: InputMaybe<Contribution_Bookmarks_Bool_Exp>;
  _or?: InputMaybe<Array<Contribution_Bookmarks_Bool_Exp>>;
  contribution?: InputMaybe<Contributions_Bool_Exp>;
  contribution_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "contribution_bookmarks" */
export enum Contribution_Bookmarks_Constraint {
  /** unique or primary key constraint on columns "user_id", "contribution_id" */
  ContributionBookmarksPkey = 'contribution_bookmarks_pkey'
}

/** input type for inserting data into table "contribution_bookmarks" */
export type Contribution_Bookmarks_Insert_Input = {
  contribution?: InputMaybe<Contributions_Obj_Rel_Insert_Input>;
  contribution_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Contribution_Bookmarks_Max_Fields = {
  __typename?: 'contribution_bookmarks_max_fields';
  contribution_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "contribution_bookmarks" */
export type Contribution_Bookmarks_Max_Order_By = {
  contribution_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Contribution_Bookmarks_Min_Fields = {
  __typename?: 'contribution_bookmarks_min_fields';
  contribution_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "contribution_bookmarks" */
export type Contribution_Bookmarks_Min_Order_By = {
  contribution_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "contribution_bookmarks" */
export type Contribution_Bookmarks_Mutation_Response = {
  __typename?: 'contribution_bookmarks_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Contribution_Bookmarks>;
};

/** on_conflict condition type for table "contribution_bookmarks" */
export type Contribution_Bookmarks_On_Conflict = {
  constraint: Contribution_Bookmarks_Constraint;
  update_columns?: Array<Contribution_Bookmarks_Update_Column>;
  where?: InputMaybe<Contribution_Bookmarks_Bool_Exp>;
};

/** Ordering options when selecting data from "contribution_bookmarks". */
export type Contribution_Bookmarks_Order_By = {
  contribution?: InputMaybe<Contributions_Order_By>;
  contribution_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: contribution_bookmarks */
export type Contribution_Bookmarks_Pk_Columns_Input = {
  contribution_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};

/** select columns of table "contribution_bookmarks" */
export enum Contribution_Bookmarks_Select_Column {
  /** column name */
  ContributionId = 'contribution_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "contribution_bookmarks" */
export type Contribution_Bookmarks_Set_Input = {
  contribution_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "contribution_bookmarks" */
export type Contribution_Bookmarks_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Contribution_Bookmarks_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Contribution_Bookmarks_Stream_Cursor_Value_Input = {
  contribution_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "contribution_bookmarks" */
export enum Contribution_Bookmarks_Update_Column {
  /** column name */
  ContributionId = 'contribution_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  UserId = 'user_id'
}

export type Contribution_Bookmarks_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Contribution_Bookmarks_Set_Input>;
  /** filter the rows which have to be updated */
  where: Contribution_Bookmarks_Bool_Exp;
};

/** columns and relationships of "contribution_comments" */
export type Contribution_Comments = {
  __typename?: 'contribution_comments';
  body: Scalars['String']['output'];
  /** An object relationship */
  contribution: Contributions;
  contribution_id: Scalars['uuid']['output'];
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  is_helpful: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
  updated_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid']['output'];
};

/** aggregated selection of "contribution_comments" */
export type Contribution_Comments_Aggregate = {
  __typename?: 'contribution_comments_aggregate';
  aggregate?: Maybe<Contribution_Comments_Aggregate_Fields>;
  nodes: Array<Contribution_Comments>;
};

export type Contribution_Comments_Aggregate_Bool_Exp = {
  count?: InputMaybe<Contribution_Comments_Aggregate_Bool_Exp_Count>;
};

export type Contribution_Comments_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Contribution_Comments_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Contribution_Comments_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "contribution_comments" */
export type Contribution_Comments_Aggregate_Fields = {
  __typename?: 'contribution_comments_aggregate_fields';
  avg?: Maybe<Contribution_Comments_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Contribution_Comments_Max_Fields>;
  min?: Maybe<Contribution_Comments_Min_Fields>;
  stddev?: Maybe<Contribution_Comments_Stddev_Fields>;
  stddev_pop?: Maybe<Contribution_Comments_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Contribution_Comments_Stddev_Samp_Fields>;
  sum?: Maybe<Contribution_Comments_Sum_Fields>;
  var_pop?: Maybe<Contribution_Comments_Var_Pop_Fields>;
  var_samp?: Maybe<Contribution_Comments_Var_Samp_Fields>;
  variance?: Maybe<Contribution_Comments_Variance_Fields>;
};


/** aggregate fields of "contribution_comments" */
export type Contribution_Comments_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Contribution_Comments_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "contribution_comments" */
export type Contribution_Comments_Aggregate_Order_By = {
  avg?: InputMaybe<Contribution_Comments_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Contribution_Comments_Max_Order_By>;
  min?: InputMaybe<Contribution_Comments_Min_Order_By>;
  stddev?: InputMaybe<Contribution_Comments_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Contribution_Comments_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Contribution_Comments_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Contribution_Comments_Sum_Order_By>;
  var_pop?: InputMaybe<Contribution_Comments_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Contribution_Comments_Var_Samp_Order_By>;
  variance?: InputMaybe<Contribution_Comments_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "contribution_comments" */
export type Contribution_Comments_Arr_Rel_Insert_Input = {
  data: Array<Contribution_Comments_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Contribution_Comments_On_Conflict>;
};

/** aggregate avg on columns */
export type Contribution_Comments_Avg_Fields = {
  __typename?: 'contribution_comments_avg_fields';
  is_helpful?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "contribution_comments" */
export type Contribution_Comments_Avg_Order_By = {
  is_helpful?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "contribution_comments". All fields are combined with a logical 'AND'. */
export type Contribution_Comments_Bool_Exp = {
  _and?: InputMaybe<Array<Contribution_Comments_Bool_Exp>>;
  _not?: InputMaybe<Contribution_Comments_Bool_Exp>;
  _or?: InputMaybe<Array<Contribution_Comments_Bool_Exp>>;
  body?: InputMaybe<String_Comparison_Exp>;
  contribution?: InputMaybe<Contributions_Bool_Exp>;
  contribution_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  is_helpful?: InputMaybe<Int_Comparison_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "contribution_comments" */
export enum Contribution_Comments_Constraint {
  /** unique or primary key constraint on columns "id" */
  ContributionCommentsPkey = 'contribution_comments_pkey'
}

/** input type for incrementing numeric columns in table "contribution_comments" */
export type Contribution_Comments_Inc_Input = {
  is_helpful?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "contribution_comments" */
export type Contribution_Comments_Insert_Input = {
  body?: InputMaybe<Scalars['String']['input']>;
  contribution?: InputMaybe<Contributions_Obj_Rel_Insert_Input>;
  contribution_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_helpful?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Contribution_Comments_Max_Fields = {
  __typename?: 'contribution_comments_max_fields';
  body?: Maybe<Scalars['String']['output']>;
  contribution_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  is_helpful?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "contribution_comments" */
export type Contribution_Comments_Max_Order_By = {
  body?: InputMaybe<Order_By>;
  contribution_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_helpful?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Contribution_Comments_Min_Fields = {
  __typename?: 'contribution_comments_min_fields';
  body?: Maybe<Scalars['String']['output']>;
  contribution_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  is_helpful?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "contribution_comments" */
export type Contribution_Comments_Min_Order_By = {
  body?: InputMaybe<Order_By>;
  contribution_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_helpful?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "contribution_comments" */
export type Contribution_Comments_Mutation_Response = {
  __typename?: 'contribution_comments_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Contribution_Comments>;
};

/** on_conflict condition type for table "contribution_comments" */
export type Contribution_Comments_On_Conflict = {
  constraint: Contribution_Comments_Constraint;
  update_columns?: Array<Contribution_Comments_Update_Column>;
  where?: InputMaybe<Contribution_Comments_Bool_Exp>;
};

/** Ordering options when selecting data from "contribution_comments". */
export type Contribution_Comments_Order_By = {
  body?: InputMaybe<Order_By>;
  contribution?: InputMaybe<Contributions_Order_By>;
  contribution_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_helpful?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: contribution_comments */
export type Contribution_Comments_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "contribution_comments" */
export enum Contribution_Comments_Select_Column {
  /** column name */
  Body = 'body',
  /** column name */
  ContributionId = 'contribution_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsHelpful = 'is_helpful',
  /** column name */
  Slug = 'slug',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "contribution_comments" */
export type Contribution_Comments_Set_Input = {
  body?: InputMaybe<Scalars['String']['input']>;
  contribution_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_helpful?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Contribution_Comments_Stddev_Fields = {
  __typename?: 'contribution_comments_stddev_fields';
  is_helpful?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "contribution_comments" */
export type Contribution_Comments_Stddev_Order_By = {
  is_helpful?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Contribution_Comments_Stddev_Pop_Fields = {
  __typename?: 'contribution_comments_stddev_pop_fields';
  is_helpful?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "contribution_comments" */
export type Contribution_Comments_Stddev_Pop_Order_By = {
  is_helpful?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Contribution_Comments_Stddev_Samp_Fields = {
  __typename?: 'contribution_comments_stddev_samp_fields';
  is_helpful?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "contribution_comments" */
export type Contribution_Comments_Stddev_Samp_Order_By = {
  is_helpful?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "contribution_comments" */
export type Contribution_Comments_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Contribution_Comments_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Contribution_Comments_Stream_Cursor_Value_Input = {
  body?: InputMaybe<Scalars['String']['input']>;
  contribution_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_helpful?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type Contribution_Comments_Sum_Fields = {
  __typename?: 'contribution_comments_sum_fields';
  is_helpful?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "contribution_comments" */
export type Contribution_Comments_Sum_Order_By = {
  is_helpful?: InputMaybe<Order_By>;
};

/** update columns of table "contribution_comments" */
export enum Contribution_Comments_Update_Column {
  /** column name */
  Body = 'body',
  /** column name */
  ContributionId = 'contribution_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsHelpful = 'is_helpful',
  /** column name */
  Slug = 'slug',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

export type Contribution_Comments_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Contribution_Comments_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Contribution_Comments_Set_Input>;
  /** filter the rows which have to be updated */
  where: Contribution_Comments_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Contribution_Comments_Var_Pop_Fields = {
  __typename?: 'contribution_comments_var_pop_fields';
  is_helpful?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "contribution_comments" */
export type Contribution_Comments_Var_Pop_Order_By = {
  is_helpful?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Contribution_Comments_Var_Samp_Fields = {
  __typename?: 'contribution_comments_var_samp_fields';
  is_helpful?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "contribution_comments" */
export type Contribution_Comments_Var_Samp_Order_By = {
  is_helpful?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Contribution_Comments_Variance_Fields = {
  __typename?: 'contribution_comments_variance_fields';
  is_helpful?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "contribution_comments" */
export type Contribution_Comments_Variance_Order_By = {
  is_helpful?: InputMaybe<Order_By>;
};

/** columns and relationships of "contribution_likes" */
export type Contribution_Likes = {
  __typename?: 'contribution_likes';
  /** An object relationship */
  contribution: Contributions;
  contribution_id: Scalars['uuid']['output'];
  created_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid']['output'];
};

/** aggregated selection of "contribution_likes" */
export type Contribution_Likes_Aggregate = {
  __typename?: 'contribution_likes_aggregate';
  aggregate?: Maybe<Contribution_Likes_Aggregate_Fields>;
  nodes: Array<Contribution_Likes>;
};

export type Contribution_Likes_Aggregate_Bool_Exp = {
  count?: InputMaybe<Contribution_Likes_Aggregate_Bool_Exp_Count>;
};

export type Contribution_Likes_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Contribution_Likes_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Contribution_Likes_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "contribution_likes" */
export type Contribution_Likes_Aggregate_Fields = {
  __typename?: 'contribution_likes_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Contribution_Likes_Max_Fields>;
  min?: Maybe<Contribution_Likes_Min_Fields>;
};


/** aggregate fields of "contribution_likes" */
export type Contribution_Likes_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Contribution_Likes_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "contribution_likes" */
export type Contribution_Likes_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Contribution_Likes_Max_Order_By>;
  min?: InputMaybe<Contribution_Likes_Min_Order_By>;
};

/** input type for inserting array relation for remote table "contribution_likes" */
export type Contribution_Likes_Arr_Rel_Insert_Input = {
  data: Array<Contribution_Likes_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Contribution_Likes_On_Conflict>;
};

/** Boolean expression to filter rows from the table "contribution_likes". All fields are combined with a logical 'AND'. */
export type Contribution_Likes_Bool_Exp = {
  _and?: InputMaybe<Array<Contribution_Likes_Bool_Exp>>;
  _not?: InputMaybe<Contribution_Likes_Bool_Exp>;
  _or?: InputMaybe<Array<Contribution_Likes_Bool_Exp>>;
  contribution?: InputMaybe<Contributions_Bool_Exp>;
  contribution_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "contribution_likes" */
export enum Contribution_Likes_Constraint {
  /** unique or primary key constraint on columns "user_id", "contribution_id" */
  ContributionLikesPkey = 'contribution_likes_pkey'
}

/** input type for inserting data into table "contribution_likes" */
export type Contribution_Likes_Insert_Input = {
  contribution?: InputMaybe<Contributions_Obj_Rel_Insert_Input>;
  contribution_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Contribution_Likes_Max_Fields = {
  __typename?: 'contribution_likes_max_fields';
  contribution_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "contribution_likes" */
export type Contribution_Likes_Max_Order_By = {
  contribution_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Contribution_Likes_Min_Fields = {
  __typename?: 'contribution_likes_min_fields';
  contribution_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "contribution_likes" */
export type Contribution_Likes_Min_Order_By = {
  contribution_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "contribution_likes" */
export type Contribution_Likes_Mutation_Response = {
  __typename?: 'contribution_likes_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Contribution_Likes>;
};

/** on_conflict condition type for table "contribution_likes" */
export type Contribution_Likes_On_Conflict = {
  constraint: Contribution_Likes_Constraint;
  update_columns?: Array<Contribution_Likes_Update_Column>;
  where?: InputMaybe<Contribution_Likes_Bool_Exp>;
};

/** Ordering options when selecting data from "contribution_likes". */
export type Contribution_Likes_Order_By = {
  contribution?: InputMaybe<Contributions_Order_By>;
  contribution_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: contribution_likes */
export type Contribution_Likes_Pk_Columns_Input = {
  contribution_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};

/** select columns of table "contribution_likes" */
export enum Contribution_Likes_Select_Column {
  /** column name */
  ContributionId = 'contribution_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "contribution_likes" */
export type Contribution_Likes_Set_Input = {
  contribution_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "contribution_likes" */
export type Contribution_Likes_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Contribution_Likes_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Contribution_Likes_Stream_Cursor_Value_Input = {
  contribution_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "contribution_likes" */
export enum Contribution_Likes_Update_Column {
  /** column name */
  ContributionId = 'contribution_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  UserId = 'user_id'
}

export type Contribution_Likes_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Contribution_Likes_Set_Input>;
  /** filter the rows which have to be updated */
  where: Contribution_Likes_Bool_Exp;
};

/** columns and relationships of "contribution_reports" */
export type Contribution_Reports = {
  __typename?: 'contribution_reports';
  /** An object relationship */
  contribution: Contributions;
  contribution_id: Scalars['uuid']['output'];
  created_at: Scalars['timestamptz']['output'];
  details?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  reason: Scalars['String']['output'];
  reporter_id: Scalars['uuid']['output'];
  status: Scalars['String']['output'];
  /** An object relationship */
  user: Users;
};

/** aggregated selection of "contribution_reports" */
export type Contribution_Reports_Aggregate = {
  __typename?: 'contribution_reports_aggregate';
  aggregate?: Maybe<Contribution_Reports_Aggregate_Fields>;
  nodes: Array<Contribution_Reports>;
};

export type Contribution_Reports_Aggregate_Bool_Exp = {
  count?: InputMaybe<Contribution_Reports_Aggregate_Bool_Exp_Count>;
};

export type Contribution_Reports_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Contribution_Reports_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Contribution_Reports_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "contribution_reports" */
export type Contribution_Reports_Aggregate_Fields = {
  __typename?: 'contribution_reports_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Contribution_Reports_Max_Fields>;
  min?: Maybe<Contribution_Reports_Min_Fields>;
};


/** aggregate fields of "contribution_reports" */
export type Contribution_Reports_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Contribution_Reports_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "contribution_reports" */
export type Contribution_Reports_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Contribution_Reports_Max_Order_By>;
  min?: InputMaybe<Contribution_Reports_Min_Order_By>;
};

/** input type for inserting array relation for remote table "contribution_reports" */
export type Contribution_Reports_Arr_Rel_Insert_Input = {
  data: Array<Contribution_Reports_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Contribution_Reports_On_Conflict>;
};

/** Boolean expression to filter rows from the table "contribution_reports". All fields are combined with a logical 'AND'. */
export type Contribution_Reports_Bool_Exp = {
  _and?: InputMaybe<Array<Contribution_Reports_Bool_Exp>>;
  _not?: InputMaybe<Contribution_Reports_Bool_Exp>;
  _or?: InputMaybe<Array<Contribution_Reports_Bool_Exp>>;
  contribution?: InputMaybe<Contributions_Bool_Exp>;
  contribution_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  details?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  reason?: InputMaybe<String_Comparison_Exp>;
  reporter_id?: InputMaybe<Uuid_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
};

/** unique or primary key constraints on table "contribution_reports" */
export enum Contribution_Reports_Constraint {
  /** unique or primary key constraint on columns "id" */
  ContributionReportsPkey = 'contribution_reports_pkey',
  /** unique or primary key constraint on columns "reporter_id", "contribution_id" */
  ContributionReportsUniquePerUser = 'contribution_reports_unique_per_user'
}

/** input type for inserting data into table "contribution_reports" */
export type Contribution_Reports_Insert_Input = {
  contribution?: InputMaybe<Contributions_Obj_Rel_Insert_Input>;
  contribution_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  details?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  reporter_id?: InputMaybe<Scalars['uuid']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Contribution_Reports_Max_Fields = {
  __typename?: 'contribution_reports_max_fields';
  contribution_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  details?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  reporter_id?: Maybe<Scalars['uuid']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "contribution_reports" */
export type Contribution_Reports_Max_Order_By = {
  contribution_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  details?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  reason?: InputMaybe<Order_By>;
  reporter_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Contribution_Reports_Min_Fields = {
  __typename?: 'contribution_reports_min_fields';
  contribution_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  details?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  reporter_id?: Maybe<Scalars['uuid']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "contribution_reports" */
export type Contribution_Reports_Min_Order_By = {
  contribution_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  details?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  reason?: InputMaybe<Order_By>;
  reporter_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "contribution_reports" */
export type Contribution_Reports_Mutation_Response = {
  __typename?: 'contribution_reports_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Contribution_Reports>;
};

/** on_conflict condition type for table "contribution_reports" */
export type Contribution_Reports_On_Conflict = {
  constraint: Contribution_Reports_Constraint;
  update_columns?: Array<Contribution_Reports_Update_Column>;
  where?: InputMaybe<Contribution_Reports_Bool_Exp>;
};

/** Ordering options when selecting data from "contribution_reports". */
export type Contribution_Reports_Order_By = {
  contribution?: InputMaybe<Contributions_Order_By>;
  contribution_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  details?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  reason?: InputMaybe<Order_By>;
  reporter_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
};

/** primary key columns input for table: contribution_reports */
export type Contribution_Reports_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "contribution_reports" */
export enum Contribution_Reports_Select_Column {
  /** column name */
  ContributionId = 'contribution_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Details = 'details',
  /** column name */
  Id = 'id',
  /** column name */
  Reason = 'reason',
  /** column name */
  ReporterId = 'reporter_id',
  /** column name */
  Status = 'status'
}

/** input type for updating data in table "contribution_reports" */
export type Contribution_Reports_Set_Input = {
  contribution_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  details?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  reporter_id?: InputMaybe<Scalars['uuid']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "contribution_reports" */
export type Contribution_Reports_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Contribution_Reports_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Contribution_Reports_Stream_Cursor_Value_Input = {
  contribution_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  details?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  reporter_id?: InputMaybe<Scalars['uuid']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "contribution_reports" */
export enum Contribution_Reports_Update_Column {
  /** column name */
  ContributionId = 'contribution_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Details = 'details',
  /** column name */
  Id = 'id',
  /** column name */
  Reason = 'reason',
  /** column name */
  ReporterId = 'reporter_id',
  /** column name */
  Status = 'status'
}

export type Contribution_Reports_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Contribution_Reports_Set_Input>;
  /** filter the rows which have to be updated */
  where: Contribution_Reports_Bool_Exp;
};

/** columns and relationships of "contribution_types" */
export type Contribution_Types = {
  __typename?: 'contribution_types';
  type: Scalars['String']['output'];
};

/** aggregated selection of "contribution_types" */
export type Contribution_Types_Aggregate = {
  __typename?: 'contribution_types_aggregate';
  aggregate?: Maybe<Contribution_Types_Aggregate_Fields>;
  nodes: Array<Contribution_Types>;
};

/** aggregate fields of "contribution_types" */
export type Contribution_Types_Aggregate_Fields = {
  __typename?: 'contribution_types_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Contribution_Types_Max_Fields>;
  min?: Maybe<Contribution_Types_Min_Fields>;
};


/** aggregate fields of "contribution_types" */
export type Contribution_Types_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Contribution_Types_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "contribution_types". All fields are combined with a logical 'AND'. */
export type Contribution_Types_Bool_Exp = {
  _and?: InputMaybe<Array<Contribution_Types_Bool_Exp>>;
  _not?: InputMaybe<Contribution_Types_Bool_Exp>;
  _or?: InputMaybe<Array<Contribution_Types_Bool_Exp>>;
  type?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "contribution_types" */
export enum Contribution_Types_Constraint {
  /** unique or primary key constraint on columns "type" */
  ContributionTypesPkey = 'contribution_types_pkey'
}

export enum Contribution_Types_Enum {
  Book = 'book',
  Film = 'film',
  Music = 'music',
  Poem = 'poem',
  Quote = 'quote'
}

/** Boolean expression to compare columns of type "contribution_types_enum". All fields are combined with logical 'AND'. */
export type Contribution_Types_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Contribution_Types_Enum>;
  _in?: InputMaybe<Array<Contribution_Types_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Contribution_Types_Enum>;
  _nin?: InputMaybe<Array<Contribution_Types_Enum>>;
};

/** input type for inserting data into table "contribution_types" */
export type Contribution_Types_Insert_Input = {
  type?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Contribution_Types_Max_Fields = {
  __typename?: 'contribution_types_max_fields';
  type?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Contribution_Types_Min_Fields = {
  __typename?: 'contribution_types_min_fields';
  type?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "contribution_types" */
export type Contribution_Types_Mutation_Response = {
  __typename?: 'contribution_types_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Contribution_Types>;
};

/** on_conflict condition type for table "contribution_types" */
export type Contribution_Types_On_Conflict = {
  constraint: Contribution_Types_Constraint;
  update_columns?: Array<Contribution_Types_Update_Column>;
  where?: InputMaybe<Contribution_Types_Bool_Exp>;
};

/** Ordering options when selecting data from "contribution_types". */
export type Contribution_Types_Order_By = {
  type?: InputMaybe<Order_By>;
};

/** primary key columns input for table: contribution_types */
export type Contribution_Types_Pk_Columns_Input = {
  type: Scalars['String']['input'];
};

/** select columns of table "contribution_types" */
export enum Contribution_Types_Select_Column {
  /** column name */
  Type = 'type'
}

/** input type for updating data in table "contribution_types" */
export type Contribution_Types_Set_Input = {
  type?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "contribution_types" */
export type Contribution_Types_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Contribution_Types_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Contribution_Types_Stream_Cursor_Value_Input = {
  type?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "contribution_types" */
export enum Contribution_Types_Update_Column {
  /** column name */
  Type = 'type'
}

export type Contribution_Types_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Contribution_Types_Set_Input>;
  /** filter the rows which have to be updated */
  where: Contribution_Types_Bool_Exp;
};

/** columns and relationships of "contributions" */
export type Contributions = {
  __typename?: 'contributions';
  blog_slug: Scalars['String']['output'];
  /** An array relationship */
  contribution_bookmarks: Array<Contribution_Bookmarks>;
  /** An aggregate relationship */
  contribution_bookmarks_aggregate: Contribution_Bookmarks_Aggregate;
  /** An array relationship */
  contribution_comments: Array<Contribution_Comments>;
  /** An aggregate relationship */
  contribution_comments_aggregate: Contribution_Comments_Aggregate;
  /** An array relationship */
  contribution_likes: Array<Contribution_Likes>;
  /** An aggregate relationship */
  contribution_likes_aggregate: Contribution_Likes_Aggregate;
  created_at: Scalars['timestamptz']['output'];
  external_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  note?: Maybe<Scalars['String']['output']>;
  poster_url?: Maybe<Scalars['String']['output']>;
  source_url?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  submitted_by: Scalars['uuid']['output'];
  title: Scalars['String']['output'];
  type: Contribution_Types_Enum;
  updated_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  user: Users;
  year?: Maybe<Scalars['Int']['output']>;
};


/** columns and relationships of "contributions" */
export type ContributionsContribution_BookmarksArgs = {
  distinct_on?: InputMaybe<Array<Contribution_Bookmarks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contribution_Bookmarks_Order_By>>;
  where?: InputMaybe<Contribution_Bookmarks_Bool_Exp>;
};


/** columns and relationships of "contributions" */
export type ContributionsContribution_Bookmarks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contribution_Bookmarks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contribution_Bookmarks_Order_By>>;
  where?: InputMaybe<Contribution_Bookmarks_Bool_Exp>;
};


/** columns and relationships of "contributions" */
export type ContributionsContribution_CommentsArgs = {
  distinct_on?: InputMaybe<Array<Contribution_Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contribution_Comments_Order_By>>;
  where?: InputMaybe<Contribution_Comments_Bool_Exp>;
};


/** columns and relationships of "contributions" */
export type ContributionsContribution_Comments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contribution_Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contribution_Comments_Order_By>>;
  where?: InputMaybe<Contribution_Comments_Bool_Exp>;
};


/** columns and relationships of "contributions" */
export type ContributionsContribution_LikesArgs = {
  distinct_on?: InputMaybe<Array<Contribution_Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contribution_Likes_Order_By>>;
  where?: InputMaybe<Contribution_Likes_Bool_Exp>;
};


/** columns and relationships of "contributions" */
export type ContributionsContribution_Likes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contribution_Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contribution_Likes_Order_By>>;
  where?: InputMaybe<Contribution_Likes_Bool_Exp>;
};

/** aggregated selection of "contributions" */
export type Contributions_Aggregate = {
  __typename?: 'contributions_aggregate';
  aggregate?: Maybe<Contributions_Aggregate_Fields>;
  nodes: Array<Contributions>;
};

export type Contributions_Aggregate_Bool_Exp = {
  count?: InputMaybe<Contributions_Aggregate_Bool_Exp_Count>;
};

export type Contributions_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Contributions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Contributions_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "contributions" */
export type Contributions_Aggregate_Fields = {
  __typename?: 'contributions_aggregate_fields';
  avg?: Maybe<Contributions_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Contributions_Max_Fields>;
  min?: Maybe<Contributions_Min_Fields>;
  stddev?: Maybe<Contributions_Stddev_Fields>;
  stddev_pop?: Maybe<Contributions_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Contributions_Stddev_Samp_Fields>;
  sum?: Maybe<Contributions_Sum_Fields>;
  var_pop?: Maybe<Contributions_Var_Pop_Fields>;
  var_samp?: Maybe<Contributions_Var_Samp_Fields>;
  variance?: Maybe<Contributions_Variance_Fields>;
};


/** aggregate fields of "contributions" */
export type Contributions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Contributions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "contributions" */
export type Contributions_Aggregate_Order_By = {
  avg?: InputMaybe<Contributions_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Contributions_Max_Order_By>;
  min?: InputMaybe<Contributions_Min_Order_By>;
  stddev?: InputMaybe<Contributions_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Contributions_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Contributions_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Contributions_Sum_Order_By>;
  var_pop?: InputMaybe<Contributions_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Contributions_Var_Samp_Order_By>;
  variance?: InputMaybe<Contributions_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "contributions" */
export type Contributions_Arr_Rel_Insert_Input = {
  data: Array<Contributions_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Contributions_On_Conflict>;
};

/** aggregate avg on columns */
export type Contributions_Avg_Fields = {
  __typename?: 'contributions_avg_fields';
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "contributions" */
export type Contributions_Avg_Order_By = {
  year?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "contributions". All fields are combined with a logical 'AND'. */
export type Contributions_Bool_Exp = {
  _and?: InputMaybe<Array<Contributions_Bool_Exp>>;
  _not?: InputMaybe<Contributions_Bool_Exp>;
  _or?: InputMaybe<Array<Contributions_Bool_Exp>>;
  blog_slug?: InputMaybe<String_Comparison_Exp>;
  contribution_bookmarks?: InputMaybe<Contribution_Bookmarks_Bool_Exp>;
  contribution_bookmarks_aggregate?: InputMaybe<Contribution_Bookmarks_Aggregate_Bool_Exp>;
  contribution_comments?: InputMaybe<Contribution_Comments_Bool_Exp>;
  contribution_comments_aggregate?: InputMaybe<Contribution_Comments_Aggregate_Bool_Exp>;
  contribution_likes?: InputMaybe<Contribution_Likes_Bool_Exp>;
  contribution_likes_aggregate?: InputMaybe<Contribution_Likes_Aggregate_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  external_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  note?: InputMaybe<String_Comparison_Exp>;
  poster_url?: InputMaybe<String_Comparison_Exp>;
  source_url?: InputMaybe<String_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  submitted_by?: InputMaybe<Uuid_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<Contribution_Types_Enum_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  year?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "contributions" */
export enum Contributions_Constraint {
  /** unique or primary key constraint on columns "external_id" */
  ContributionsExternalIdKey = 'contributions_external_id_key',
  /** unique or primary key constraint on columns "id" */
  ContributionsPkey = 'contributions_pkey'
}

/** input type for incrementing numeric columns in table "contributions" */
export type Contributions_Inc_Input = {
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "contributions" */
export type Contributions_Insert_Input = {
  blog_slug?: InputMaybe<Scalars['String']['input']>;
  contribution_bookmarks?: InputMaybe<Contribution_Bookmarks_Arr_Rel_Insert_Input>;
  contribution_comments?: InputMaybe<Contribution_Comments_Arr_Rel_Insert_Input>;
  contribution_likes?: InputMaybe<Contribution_Likes_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  external_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  poster_url?: InputMaybe<Scalars['String']['input']>;
  source_url?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  submitted_by?: InputMaybe<Scalars['uuid']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Contribution_Types_Enum>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Contributions_Max_Fields = {
  __typename?: 'contributions_max_fields';
  blog_slug?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  external_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  poster_url?: Maybe<Scalars['String']['output']>;
  source_url?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  submitted_by?: Maybe<Scalars['uuid']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "contributions" */
export type Contributions_Max_Order_By = {
  blog_slug?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  external_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  note?: InputMaybe<Order_By>;
  poster_url?: InputMaybe<Order_By>;
  source_url?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  submitted_by?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Contributions_Min_Fields = {
  __typename?: 'contributions_min_fields';
  blog_slug?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  external_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  poster_url?: Maybe<Scalars['String']['output']>;
  source_url?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  submitted_by?: Maybe<Scalars['uuid']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "contributions" */
export type Contributions_Min_Order_By = {
  blog_slug?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  external_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  note?: InputMaybe<Order_By>;
  poster_url?: InputMaybe<Order_By>;
  source_url?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  submitted_by?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "contributions" */
export type Contributions_Mutation_Response = {
  __typename?: 'contributions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Contributions>;
};

/** input type for inserting object relation for remote table "contributions" */
export type Contributions_Obj_Rel_Insert_Input = {
  data: Contributions_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Contributions_On_Conflict>;
};

/** on_conflict condition type for table "contributions" */
export type Contributions_On_Conflict = {
  constraint: Contributions_Constraint;
  update_columns?: Array<Contributions_Update_Column>;
  where?: InputMaybe<Contributions_Bool_Exp>;
};

/** Ordering options when selecting data from "contributions". */
export type Contributions_Order_By = {
  blog_slug?: InputMaybe<Order_By>;
  contribution_bookmarks_aggregate?: InputMaybe<Contribution_Bookmarks_Aggregate_Order_By>;
  contribution_comments_aggregate?: InputMaybe<Contribution_Comments_Aggregate_Order_By>;
  contribution_likes_aggregate?: InputMaybe<Contribution_Likes_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  external_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  note?: InputMaybe<Order_By>;
  poster_url?: InputMaybe<Order_By>;
  source_url?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  submitted_by?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  year?: InputMaybe<Order_By>;
};

/** primary key columns input for table: contributions */
export type Contributions_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "contributions" */
export enum Contributions_Select_Column {
  /** column name */
  BlogSlug = 'blog_slug',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ExternalId = 'external_id',
  /** column name */
  Id = 'id',
  /** column name */
  Note = 'note',
  /** column name */
  PosterUrl = 'poster_url',
  /** column name */
  SourceUrl = 'source_url',
  /** column name */
  Status = 'status',
  /** column name */
  SubmittedBy = 'submitted_by',
  /** column name */
  Title = 'title',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Year = 'year'
}

/** input type for updating data in table "contributions" */
export type Contributions_Set_Input = {
  blog_slug?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  external_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  poster_url?: InputMaybe<Scalars['String']['input']>;
  source_url?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  submitted_by?: InputMaybe<Scalars['uuid']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Contribution_Types_Enum>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Contributions_Stddev_Fields = {
  __typename?: 'contributions_stddev_fields';
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "contributions" */
export type Contributions_Stddev_Order_By = {
  year?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Contributions_Stddev_Pop_Fields = {
  __typename?: 'contributions_stddev_pop_fields';
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "contributions" */
export type Contributions_Stddev_Pop_Order_By = {
  year?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Contributions_Stddev_Samp_Fields = {
  __typename?: 'contributions_stddev_samp_fields';
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "contributions" */
export type Contributions_Stddev_Samp_Order_By = {
  year?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "contributions" */
export type Contributions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Contributions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Contributions_Stream_Cursor_Value_Input = {
  blog_slug?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  external_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  poster_url?: InputMaybe<Scalars['String']['input']>;
  source_url?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  submitted_by?: InputMaybe<Scalars['uuid']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Contribution_Types_Enum>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Contributions_Sum_Fields = {
  __typename?: 'contributions_sum_fields';
  year?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "contributions" */
export type Contributions_Sum_Order_By = {
  year?: InputMaybe<Order_By>;
};

/** update columns of table "contributions" */
export enum Contributions_Update_Column {
  /** column name */
  BlogSlug = 'blog_slug',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ExternalId = 'external_id',
  /** column name */
  Id = 'id',
  /** column name */
  Note = 'note',
  /** column name */
  PosterUrl = 'poster_url',
  /** column name */
  SourceUrl = 'source_url',
  /** column name */
  Status = 'status',
  /** column name */
  SubmittedBy = 'submitted_by',
  /** column name */
  Title = 'title',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Year = 'year'
}

export type Contributions_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Contributions_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Contributions_Set_Input>;
  /** filter the rows which have to be updated */
  where: Contributions_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Contributions_Var_Pop_Fields = {
  __typename?: 'contributions_var_pop_fields';
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "contributions" */
export type Contributions_Var_Pop_Order_By = {
  year?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Contributions_Var_Samp_Fields = {
  __typename?: 'contributions_var_samp_fields';
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "contributions" */
export type Contributions_Var_Samp_Order_By = {
  year?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Contributions_Variance_Fields = {
  __typename?: 'contributions_variance_fields';
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "contributions" */
export type Contributions_Variance_Order_By = {
  year?: InputMaybe<Order_By>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** columns and relationships of "storage.files" */
export type Files = {
  __typename?: 'files';
  /** An object relationship */
  bucket: Buckets;
  bucketId: Scalars['String']['output'];
  createdAt: Scalars['timestamptz']['output'];
  etag?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  isUploaded?: Maybe<Scalars['Boolean']['output']>;
  metadata?: Maybe<Scalars['jsonb']['output']>;
  mimeType?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['timestamptz']['output'];
  uploadedByUserId?: Maybe<Scalars['uuid']['output']>;
};


/** columns and relationships of "storage.files" */
export type FilesMetadataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "storage.files" */
export type Files_Aggregate = {
  __typename?: 'files_aggregate';
  aggregate?: Maybe<Files_Aggregate_Fields>;
  nodes: Array<Files>;
};

export type Files_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Files_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Files_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Files_Aggregate_Bool_Exp_Count>;
};

export type Files_Aggregate_Bool_Exp_Bool_And = {
  arguments: Files_Select_Column_Files_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Files_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Files_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Files_Select_Column_Files_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Files_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Files_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Files_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Files_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "storage.files" */
export type Files_Aggregate_Fields = {
  __typename?: 'files_aggregate_fields';
  avg?: Maybe<Files_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Files_Max_Fields>;
  min?: Maybe<Files_Min_Fields>;
  stddev?: Maybe<Files_Stddev_Fields>;
  stddev_pop?: Maybe<Files_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Files_Stddev_Samp_Fields>;
  sum?: Maybe<Files_Sum_Fields>;
  var_pop?: Maybe<Files_Var_Pop_Fields>;
  var_samp?: Maybe<Files_Var_Samp_Fields>;
  variance?: Maybe<Files_Variance_Fields>;
};


/** aggregate fields of "storage.files" */
export type Files_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Files_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "storage.files" */
export type Files_Aggregate_Order_By = {
  avg?: InputMaybe<Files_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Files_Max_Order_By>;
  min?: InputMaybe<Files_Min_Order_By>;
  stddev?: InputMaybe<Files_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Files_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Files_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Files_Sum_Order_By>;
  var_pop?: InputMaybe<Files_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Files_Var_Samp_Order_By>;
  variance?: InputMaybe<Files_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Files_Append_Input = {
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "storage.files" */
export type Files_Arr_Rel_Insert_Input = {
  data: Array<Files_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Files_On_Conflict>;
};

/** aggregate avg on columns */
export type Files_Avg_Fields = {
  __typename?: 'files_avg_fields';
  size?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "storage.files" */
export type Files_Avg_Order_By = {
  size?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "storage.files". All fields are combined with a logical 'AND'. */
export type Files_Bool_Exp = {
  _and?: InputMaybe<Array<Files_Bool_Exp>>;
  _not?: InputMaybe<Files_Bool_Exp>;
  _or?: InputMaybe<Array<Files_Bool_Exp>>;
  bucket?: InputMaybe<Buckets_Bool_Exp>;
  bucketId?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  etag?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  isUploaded?: InputMaybe<Boolean_Comparison_Exp>;
  metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  mimeType?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  size?: InputMaybe<Int_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  uploadedByUserId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "storage.files" */
export enum Files_Constraint {
  /** unique or primary key constraint on columns "id" */
  FilesPkey = 'files_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Files_Delete_At_Path_Input = {
  metadata?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Files_Delete_Elem_Input = {
  metadata?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Files_Delete_Key_Input = {
  metadata?: InputMaybe<Scalars['String']['input']>;
};

/** input type for incrementing numeric columns in table "storage.files" */
export type Files_Inc_Input = {
  size?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "storage.files" */
export type Files_Insert_Input = {
  bucket?: InputMaybe<Buckets_Obj_Rel_Insert_Input>;
  bucketId?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  etag?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  isUploaded?: InputMaybe<Scalars['Boolean']['input']>;
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  uploadedByUserId?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Files_Max_Fields = {
  __typename?: 'files_max_fields';
  bucketId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  etag?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  mimeType?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  uploadedByUserId?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "storage.files" */
export type Files_Max_Order_By = {
  bucketId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  etag?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  mimeType?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  uploadedByUserId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Files_Min_Fields = {
  __typename?: 'files_min_fields';
  bucketId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  etag?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  mimeType?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  uploadedByUserId?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "storage.files" */
export type Files_Min_Order_By = {
  bucketId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  etag?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  mimeType?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  uploadedByUserId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "storage.files" */
export type Files_Mutation_Response = {
  __typename?: 'files_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Files>;
};

/** input type for inserting object relation for remote table "storage.files" */
export type Files_Obj_Rel_Insert_Input = {
  data: Files_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Files_On_Conflict>;
};

/** on_conflict condition type for table "storage.files" */
export type Files_On_Conflict = {
  constraint: Files_Constraint;
  update_columns?: Array<Files_Update_Column>;
  where?: InputMaybe<Files_Bool_Exp>;
};

/** Ordering options when selecting data from "storage.files". */
export type Files_Order_By = {
  bucket?: InputMaybe<Buckets_Order_By>;
  bucketId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  etag?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  isUploaded?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Order_By>;
  mimeType?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  uploadedByUserId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: storage.files */
export type Files_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Files_Prepend_Input = {
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "storage.files" */
export enum Files_Select_Column {
  /** column name */
  BucketId = 'bucketId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Etag = 'etag',
  /** column name */
  Id = 'id',
  /** column name */
  IsUploaded = 'isUploaded',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  MimeType = 'mimeType',
  /** column name */
  Name = 'name',
  /** column name */
  Size = 'size',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UploadedByUserId = 'uploadedByUserId'
}

/** select "files_aggregate_bool_exp_bool_and_arguments_columns" columns of table "storage.files" */
export enum Files_Select_Column_Files_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  IsUploaded = 'isUploaded'
}

/** select "files_aggregate_bool_exp_bool_or_arguments_columns" columns of table "storage.files" */
export enum Files_Select_Column_Files_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  IsUploaded = 'isUploaded'
}

/** input type for updating data in table "storage.files" */
export type Files_Set_Input = {
  bucketId?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  etag?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  isUploaded?: InputMaybe<Scalars['Boolean']['input']>;
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  uploadedByUserId?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Files_Stddev_Fields = {
  __typename?: 'files_stddev_fields';
  size?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "storage.files" */
export type Files_Stddev_Order_By = {
  size?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Files_Stddev_Pop_Fields = {
  __typename?: 'files_stddev_pop_fields';
  size?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "storage.files" */
export type Files_Stddev_Pop_Order_By = {
  size?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Files_Stddev_Samp_Fields = {
  __typename?: 'files_stddev_samp_fields';
  size?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "storage.files" */
export type Files_Stddev_Samp_Order_By = {
  size?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "files" */
export type Files_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Files_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Files_Stream_Cursor_Value_Input = {
  bucketId?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  etag?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  isUploaded?: InputMaybe<Scalars['Boolean']['input']>;
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  uploadedByUserId?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type Files_Sum_Fields = {
  __typename?: 'files_sum_fields';
  size?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "storage.files" */
export type Files_Sum_Order_By = {
  size?: InputMaybe<Order_By>;
};

/** update columns of table "storage.files" */
export enum Files_Update_Column {
  /** column name */
  BucketId = 'bucketId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Etag = 'etag',
  /** column name */
  Id = 'id',
  /** column name */
  IsUploaded = 'isUploaded',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  MimeType = 'mimeType',
  /** column name */
  Name = 'name',
  /** column name */
  Size = 'size',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UploadedByUserId = 'uploadedByUserId'
}

export type Files_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Files_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Files_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Files_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Files_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Files_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Files_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Files_Set_Input>;
  /** filter the rows which have to be updated */
  where: Files_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Files_Var_Pop_Fields = {
  __typename?: 'files_var_pop_fields';
  size?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "storage.files" */
export type Files_Var_Pop_Order_By = {
  size?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Files_Var_Samp_Fields = {
  __typename?: 'files_var_samp_fields';
  size?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "storage.files" */
export type Files_Var_Samp_Order_By = {
  size?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Files_Variance_Fields = {
  __typename?: 'files_variance_fields';
  size?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "storage.files" */
export type Files_Variance_Order_By = {
  size?: InputMaybe<Order_By>;
};

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']['input']>;
  _eq?: InputMaybe<Scalars['jsonb']['input']>;
  _gt?: InputMaybe<Scalars['jsonb']['input']>;
  _gte?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']['input']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']['input']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['jsonb']['input']>;
  _lte?: InputMaybe<Scalars['jsonb']['input']>;
  _neq?: InputMaybe<Scalars['jsonb']['input']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']['input']>>;
};

/** columns and relationships of "messages" */
export type Messages = {
  __typename?: 'messages';
  body: Scalars['String']['output'];
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['Int']['output'];
  /** An object relationship */
  receiver: Users;
  recipient_id: Scalars['uuid']['output'];
  /** An object relationship */
  sender: Users;
  sender_id: Scalars['uuid']['output'];
  updated_at: Scalars['timestamptz']['output'];
};

/** aggregated selection of "messages" */
export type Messages_Aggregate = {
  __typename?: 'messages_aggregate';
  aggregate?: Maybe<Messages_Aggregate_Fields>;
  nodes: Array<Messages>;
};

export type Messages_Aggregate_Bool_Exp = {
  count?: InputMaybe<Messages_Aggregate_Bool_Exp_Count>;
};

export type Messages_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Messages_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Messages_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "messages" */
export type Messages_Aggregate_Fields = {
  __typename?: 'messages_aggregate_fields';
  avg?: Maybe<Messages_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Messages_Max_Fields>;
  min?: Maybe<Messages_Min_Fields>;
  stddev?: Maybe<Messages_Stddev_Fields>;
  stddev_pop?: Maybe<Messages_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Messages_Stddev_Samp_Fields>;
  sum?: Maybe<Messages_Sum_Fields>;
  var_pop?: Maybe<Messages_Var_Pop_Fields>;
  var_samp?: Maybe<Messages_Var_Samp_Fields>;
  variance?: Maybe<Messages_Variance_Fields>;
};


/** aggregate fields of "messages" */
export type Messages_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Messages_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "messages" */
export type Messages_Aggregate_Order_By = {
  avg?: InputMaybe<Messages_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Messages_Max_Order_By>;
  min?: InputMaybe<Messages_Min_Order_By>;
  stddev?: InputMaybe<Messages_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Messages_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Messages_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Messages_Sum_Order_By>;
  var_pop?: InputMaybe<Messages_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Messages_Var_Samp_Order_By>;
  variance?: InputMaybe<Messages_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "messages" */
export type Messages_Arr_Rel_Insert_Input = {
  data: Array<Messages_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Messages_On_Conflict>;
};

/** aggregate avg on columns */
export type Messages_Avg_Fields = {
  __typename?: 'messages_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "messages" */
export type Messages_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "messages". All fields are combined with a logical 'AND'. */
export type Messages_Bool_Exp = {
  _and?: InputMaybe<Array<Messages_Bool_Exp>>;
  _not?: InputMaybe<Messages_Bool_Exp>;
  _or?: InputMaybe<Array<Messages_Bool_Exp>>;
  body?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  receiver?: InputMaybe<Users_Bool_Exp>;
  recipient_id?: InputMaybe<Uuid_Comparison_Exp>;
  sender?: InputMaybe<Users_Bool_Exp>;
  sender_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "messages" */
export enum Messages_Constraint {
  /** unique or primary key constraint on columns "id" */
  MessagesPkey = 'messages_pkey'
}

/** input type for incrementing numeric columns in table "messages" */
export type Messages_Inc_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "messages" */
export type Messages_Insert_Input = {
  body?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  receiver?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  recipient_id?: InputMaybe<Scalars['uuid']['input']>;
  sender?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  sender_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Messages_Max_Fields = {
  __typename?: 'messages_max_fields';
  body?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  recipient_id?: Maybe<Scalars['uuid']['output']>;
  sender_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "messages" */
export type Messages_Max_Order_By = {
  body?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipient_id?: InputMaybe<Order_By>;
  sender_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Messages_Min_Fields = {
  __typename?: 'messages_min_fields';
  body?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  recipient_id?: Maybe<Scalars['uuid']['output']>;
  sender_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "messages" */
export type Messages_Min_Order_By = {
  body?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipient_id?: InputMaybe<Order_By>;
  sender_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "messages" */
export type Messages_Mutation_Response = {
  __typename?: 'messages_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Messages>;
};

/** on_conflict condition type for table "messages" */
export type Messages_On_Conflict = {
  constraint: Messages_Constraint;
  update_columns?: Array<Messages_Update_Column>;
  where?: InputMaybe<Messages_Bool_Exp>;
};

/** Ordering options when selecting data from "messages". */
export type Messages_Order_By = {
  body?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  receiver?: InputMaybe<Users_Order_By>;
  recipient_id?: InputMaybe<Order_By>;
  sender?: InputMaybe<Users_Order_By>;
  sender_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: messages */
export type Messages_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "messages" */
export enum Messages_Select_Column {
  /** column name */
  Body = 'body',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  RecipientId = 'recipient_id',
  /** column name */
  SenderId = 'sender_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "messages" */
export type Messages_Set_Input = {
  body?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  recipient_id?: InputMaybe<Scalars['uuid']['input']>;
  sender_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Messages_Stddev_Fields = {
  __typename?: 'messages_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "messages" */
export type Messages_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Messages_Stddev_Pop_Fields = {
  __typename?: 'messages_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "messages" */
export type Messages_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Messages_Stddev_Samp_Fields = {
  __typename?: 'messages_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "messages" */
export type Messages_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "messages" */
export type Messages_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Messages_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Messages_Stream_Cursor_Value_Input = {
  body?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  recipient_id?: InputMaybe<Scalars['uuid']['input']>;
  sender_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Messages_Sum_Fields = {
  __typename?: 'messages_sum_fields';
  id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "messages" */
export type Messages_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** update columns of table "messages" */
export enum Messages_Update_Column {
  /** column name */
  Body = 'body',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  RecipientId = 'recipient_id',
  /** column name */
  SenderId = 'sender_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Messages_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Messages_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Messages_Set_Input>;
  /** filter the rows which have to be updated */
  where: Messages_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Messages_Var_Pop_Fields = {
  __typename?: 'messages_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "messages" */
export type Messages_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Messages_Var_Samp_Fields = {
  __typename?: 'messages_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "messages" */
export type Messages_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Messages_Variance_Fields = {
  __typename?: 'messages_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "messages" */
export type Messages_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete single row from the table: "auth.providers" */
  deleteAuthProvider?: Maybe<AuthProviders>;
  /** delete single row from the table: "auth.provider_requests" */
  deleteAuthProviderRequest?: Maybe<AuthProviderRequests>;
  /** delete data from the table: "auth.provider_requests" */
  deleteAuthProviderRequests?: Maybe<AuthProviderRequests_Mutation_Response>;
  /** delete data from the table: "auth.providers" */
  deleteAuthProviders?: Maybe<AuthProviders_Mutation_Response>;
  /** delete single row from the table: "auth.refresh_tokens" */
  deleteAuthRefreshToken?: Maybe<AuthRefreshTokens>;
  /** delete single row from the table: "auth.refresh_token_types" */
  deleteAuthRefreshTokenType?: Maybe<AuthRefreshTokenTypes>;
  /** delete data from the table: "auth.refresh_token_types" */
  deleteAuthRefreshTokenTypes?: Maybe<AuthRefreshTokenTypes_Mutation_Response>;
  /** delete data from the table: "auth.refresh_tokens" */
  deleteAuthRefreshTokens?: Maybe<AuthRefreshTokens_Mutation_Response>;
  /** delete single row from the table: "auth.roles" */
  deleteAuthRole?: Maybe<AuthRoles>;
  /** delete data from the table: "auth.roles" */
  deleteAuthRoles?: Maybe<AuthRoles_Mutation_Response>;
  /** delete single row from the table: "auth.user_providers" */
  deleteAuthUserProvider?: Maybe<AuthUserProviders>;
  /** delete data from the table: "auth.user_providers" */
  deleteAuthUserProviders?: Maybe<AuthUserProviders_Mutation_Response>;
  /** delete single row from the table: "auth.user_roles" */
  deleteAuthUserRole?: Maybe<AuthUserRoles>;
  /** delete data from the table: "auth.user_roles" */
  deleteAuthUserRoles?: Maybe<AuthUserRoles_Mutation_Response>;
  /** delete single row from the table: "auth.user_security_keys" */
  deleteAuthUserSecurityKey?: Maybe<AuthUserSecurityKeys>;
  /** delete data from the table: "auth.user_security_keys" */
  deleteAuthUserSecurityKeys?: Maybe<AuthUserSecurityKeys_Mutation_Response>;
  /** delete single row from the table: "storage.buckets" */
  deleteBucket?: Maybe<Buckets>;
  /** delete data from the table: "storage.buckets" */
  deleteBuckets?: Maybe<Buckets_Mutation_Response>;
  /** delete single row from the table: "storage.files" */
  deleteFile?: Maybe<Files>;
  /** delete data from the table: "storage.files" */
  deleteFiles?: Maybe<Files_Mutation_Response>;
  /** delete single row from the table: "auth.users" */
  deleteUser?: Maybe<Users>;
  /** delete data from the table: "auth.users" */
  deleteUsers?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "storage.virus" */
  deleteVirus?: Maybe<Virus>;
  /** delete data from the table: "storage.virus" */
  deleteViruses?: Maybe<Virus_Mutation_Response>;
  /** delete data from the table: "blog_comment_helpful" */
  delete_blog_comment_helpful?: Maybe<Blog_Comment_Helpful_Mutation_Response>;
  /** delete single row from the table: "blog_comment_helpful" */
  delete_blog_comment_helpful_by_pk?: Maybe<Blog_Comment_Helpful>;
  /** delete data from the table: "blog_comment_reports" */
  delete_blog_comment_reports?: Maybe<Blog_Comment_Reports_Mutation_Response>;
  /** delete single row from the table: "blog_comment_reports" */
  delete_blog_comment_reports_by_pk?: Maybe<Blog_Comment_Reports>;
  /** delete data from the table: "blog_comments" */
  delete_blog_comments?: Maybe<Blog_Comments_Mutation_Response>;
  /** delete single row from the table: "blog_comments" */
  delete_blog_comments_by_pk?: Maybe<Blog_Comments>;
  /** delete data from the table: "comment_likes" */
  delete_comment_likes?: Maybe<Comment_Likes_Mutation_Response>;
  /** delete single row from the table: "comment_likes" */
  delete_comment_likes_by_pk?: Maybe<Comment_Likes>;
  /** delete data from the table: "contribution_bookmarks" */
  delete_contribution_bookmarks?: Maybe<Contribution_Bookmarks_Mutation_Response>;
  /** delete single row from the table: "contribution_bookmarks" */
  delete_contribution_bookmarks_by_pk?: Maybe<Contribution_Bookmarks>;
  /** delete data from the table: "contribution_comments" */
  delete_contribution_comments?: Maybe<Contribution_Comments_Mutation_Response>;
  /** delete single row from the table: "contribution_comments" */
  delete_contribution_comments_by_pk?: Maybe<Contribution_Comments>;
  /** delete data from the table: "contribution_likes" */
  delete_contribution_likes?: Maybe<Contribution_Likes_Mutation_Response>;
  /** delete single row from the table: "contribution_likes" */
  delete_contribution_likes_by_pk?: Maybe<Contribution_Likes>;
  /** delete data from the table: "contribution_reports" */
  delete_contribution_reports?: Maybe<Contribution_Reports_Mutation_Response>;
  /** delete single row from the table: "contribution_reports" */
  delete_contribution_reports_by_pk?: Maybe<Contribution_Reports>;
  /** delete data from the table: "contribution_types" */
  delete_contribution_types?: Maybe<Contribution_Types_Mutation_Response>;
  /** delete single row from the table: "contribution_types" */
  delete_contribution_types_by_pk?: Maybe<Contribution_Types>;
  /** delete data from the table: "contributions" */
  delete_contributions?: Maybe<Contributions_Mutation_Response>;
  /** delete single row from the table: "contributions" */
  delete_contributions_by_pk?: Maybe<Contributions>;
  /** delete data from the table: "messages" */
  delete_messages?: Maybe<Messages_Mutation_Response>;
  /** delete single row from the table: "messages" */
  delete_messages_by_pk?: Maybe<Messages>;
  /** delete data from the table: "post_bookmarks" */
  delete_post_bookmarks?: Maybe<Post_Bookmarks_Mutation_Response>;
  /** delete single row from the table: "post_bookmarks" */
  delete_post_bookmarks_by_pk?: Maybe<Post_Bookmarks>;
  /** delete data from the table: "post_comments" */
  delete_post_comments?: Maybe<Post_Comments_Mutation_Response>;
  /** delete single row from the table: "post_comments" */
  delete_post_comments_by_pk?: Maybe<Post_Comments>;
  /** delete data from the table: "post_likes" */
  delete_post_likes?: Maybe<Post_Likes_Mutation_Response>;
  /** delete single row from the table: "post_likes" */
  delete_post_likes_by_pk?: Maybe<Post_Likes>;
  /** delete data from the table: "post_reports" */
  delete_post_reports?: Maybe<Post_Reports_Mutation_Response>;
  /** delete single row from the table: "post_reports" */
  delete_post_reports_by_pk?: Maybe<Post_Reports>;
  /** delete data from the table: "posts" */
  delete_posts?: Maybe<Posts_Mutation_Response>;
  /** delete single row from the table: "posts" */
  delete_posts_by_pk?: Maybe<Posts>;
  /** delete data from the table: "user_blocks" */
  delete_user_blocks?: Maybe<User_Blocks_Mutation_Response>;
  /** delete single row from the table: "user_blocks" */
  delete_user_blocks_by_pk?: Maybe<User_Blocks>;
  /** delete data from the table: "user_preferences" */
  delete_user_preferences?: Maybe<User_Preferences_Mutation_Response>;
  /** delete single row from the table: "user_preferences" */
  delete_user_preferences_by_pk?: Maybe<User_Preferences>;
  /** delete data from the table: "user_profiles" */
  delete_user_profiles?: Maybe<User_Profiles_Mutation_Response>;
  /** delete single row from the table: "user_profiles" */
  delete_user_profiles_by_pk?: Maybe<User_Profiles>;
  /** insert a single row into the table: "auth.providers" */
  insertAuthProvider?: Maybe<AuthProviders>;
  /** insert a single row into the table: "auth.provider_requests" */
  insertAuthProviderRequest?: Maybe<AuthProviderRequests>;
  /** insert data into the table: "auth.provider_requests" */
  insertAuthProviderRequests?: Maybe<AuthProviderRequests_Mutation_Response>;
  /** insert data into the table: "auth.providers" */
  insertAuthProviders?: Maybe<AuthProviders_Mutation_Response>;
  /** insert a single row into the table: "auth.refresh_tokens" */
  insertAuthRefreshToken?: Maybe<AuthRefreshTokens>;
  /** insert a single row into the table: "auth.refresh_token_types" */
  insertAuthRefreshTokenType?: Maybe<AuthRefreshTokenTypes>;
  /** insert data into the table: "auth.refresh_token_types" */
  insertAuthRefreshTokenTypes?: Maybe<AuthRefreshTokenTypes_Mutation_Response>;
  /** insert data into the table: "auth.refresh_tokens" */
  insertAuthRefreshTokens?: Maybe<AuthRefreshTokens_Mutation_Response>;
  /** insert a single row into the table: "auth.roles" */
  insertAuthRole?: Maybe<AuthRoles>;
  /** insert data into the table: "auth.roles" */
  insertAuthRoles?: Maybe<AuthRoles_Mutation_Response>;
  /** insert a single row into the table: "auth.user_providers" */
  insertAuthUserProvider?: Maybe<AuthUserProviders>;
  /** insert data into the table: "auth.user_providers" */
  insertAuthUserProviders?: Maybe<AuthUserProviders_Mutation_Response>;
  /** insert a single row into the table: "auth.user_roles" */
  insertAuthUserRole?: Maybe<AuthUserRoles>;
  /** insert data into the table: "auth.user_roles" */
  insertAuthUserRoles?: Maybe<AuthUserRoles_Mutation_Response>;
  /** insert a single row into the table: "auth.user_security_keys" */
  insertAuthUserSecurityKey?: Maybe<AuthUserSecurityKeys>;
  /** insert data into the table: "auth.user_security_keys" */
  insertAuthUserSecurityKeys?: Maybe<AuthUserSecurityKeys_Mutation_Response>;
  /** insert a single row into the table: "storage.buckets" */
  insertBucket?: Maybe<Buckets>;
  /** insert data into the table: "storage.buckets" */
  insertBuckets?: Maybe<Buckets_Mutation_Response>;
  /** insert a single row into the table: "storage.files" */
  insertFile?: Maybe<Files>;
  /** insert data into the table: "storage.files" */
  insertFiles?: Maybe<Files_Mutation_Response>;
  /** insert a single row into the table: "auth.users" */
  insertUser?: Maybe<Users>;
  /** insert data into the table: "auth.users" */
  insertUsers?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "storage.virus" */
  insertVirus?: Maybe<Virus>;
  /** insert data into the table: "storage.virus" */
  insertViruses?: Maybe<Virus_Mutation_Response>;
  /** insert data into the table: "blog_comment_helpful" */
  insert_blog_comment_helpful?: Maybe<Blog_Comment_Helpful_Mutation_Response>;
  /** insert a single row into the table: "blog_comment_helpful" */
  insert_blog_comment_helpful_one?: Maybe<Blog_Comment_Helpful>;
  /** insert data into the table: "blog_comment_reports" */
  insert_blog_comment_reports?: Maybe<Blog_Comment_Reports_Mutation_Response>;
  /** insert a single row into the table: "blog_comment_reports" */
  insert_blog_comment_reports_one?: Maybe<Blog_Comment_Reports>;
  /** insert data into the table: "blog_comments" */
  insert_blog_comments?: Maybe<Blog_Comments_Mutation_Response>;
  /** insert a single row into the table: "blog_comments" */
  insert_blog_comments_one?: Maybe<Blog_Comments>;
  /** insert data into the table: "comment_likes" */
  insert_comment_likes?: Maybe<Comment_Likes_Mutation_Response>;
  /** insert a single row into the table: "comment_likes" */
  insert_comment_likes_one?: Maybe<Comment_Likes>;
  /** insert data into the table: "contribution_bookmarks" */
  insert_contribution_bookmarks?: Maybe<Contribution_Bookmarks_Mutation_Response>;
  /** insert a single row into the table: "contribution_bookmarks" */
  insert_contribution_bookmarks_one?: Maybe<Contribution_Bookmarks>;
  /** insert data into the table: "contribution_comments" */
  insert_contribution_comments?: Maybe<Contribution_Comments_Mutation_Response>;
  /** insert a single row into the table: "contribution_comments" */
  insert_contribution_comments_one?: Maybe<Contribution_Comments>;
  /** insert data into the table: "contribution_likes" */
  insert_contribution_likes?: Maybe<Contribution_Likes_Mutation_Response>;
  /** insert a single row into the table: "contribution_likes" */
  insert_contribution_likes_one?: Maybe<Contribution_Likes>;
  /** insert data into the table: "contribution_reports" */
  insert_contribution_reports?: Maybe<Contribution_Reports_Mutation_Response>;
  /** insert a single row into the table: "contribution_reports" */
  insert_contribution_reports_one?: Maybe<Contribution_Reports>;
  /** insert data into the table: "contribution_types" */
  insert_contribution_types?: Maybe<Contribution_Types_Mutation_Response>;
  /** insert a single row into the table: "contribution_types" */
  insert_contribution_types_one?: Maybe<Contribution_Types>;
  /** insert data into the table: "contributions" */
  insert_contributions?: Maybe<Contributions_Mutation_Response>;
  /** insert a single row into the table: "contributions" */
  insert_contributions_one?: Maybe<Contributions>;
  /** insert data into the table: "messages" */
  insert_messages?: Maybe<Messages_Mutation_Response>;
  /** insert a single row into the table: "messages" */
  insert_messages_one?: Maybe<Messages>;
  /** insert data into the table: "post_bookmarks" */
  insert_post_bookmarks?: Maybe<Post_Bookmarks_Mutation_Response>;
  /** insert a single row into the table: "post_bookmarks" */
  insert_post_bookmarks_one?: Maybe<Post_Bookmarks>;
  /** insert data into the table: "post_comments" */
  insert_post_comments?: Maybe<Post_Comments_Mutation_Response>;
  /** insert a single row into the table: "post_comments" */
  insert_post_comments_one?: Maybe<Post_Comments>;
  /** insert data into the table: "post_likes" */
  insert_post_likes?: Maybe<Post_Likes_Mutation_Response>;
  /** insert a single row into the table: "post_likes" */
  insert_post_likes_one?: Maybe<Post_Likes>;
  /** insert data into the table: "post_reports" */
  insert_post_reports?: Maybe<Post_Reports_Mutation_Response>;
  /** insert a single row into the table: "post_reports" */
  insert_post_reports_one?: Maybe<Post_Reports>;
  /** insert data into the table: "posts" */
  insert_posts?: Maybe<Posts_Mutation_Response>;
  /** insert a single row into the table: "posts" */
  insert_posts_one?: Maybe<Posts>;
  /** insert data into the table: "user_blocks" */
  insert_user_blocks?: Maybe<User_Blocks_Mutation_Response>;
  /** insert a single row into the table: "user_blocks" */
  insert_user_blocks_one?: Maybe<User_Blocks>;
  /** insert data into the table: "user_preferences" */
  insert_user_preferences?: Maybe<User_Preferences_Mutation_Response>;
  /** insert a single row into the table: "user_preferences" */
  insert_user_preferences_one?: Maybe<User_Preferences>;
  /** insert data into the table: "user_profiles" */
  insert_user_profiles?: Maybe<User_Profiles_Mutation_Response>;
  /** insert a single row into the table: "user_profiles" */
  insert_user_profiles_one?: Maybe<User_Profiles>;
  /** update single row of the table: "auth.providers" */
  updateAuthProvider?: Maybe<AuthProviders>;
  /** update single row of the table: "auth.provider_requests" */
  updateAuthProviderRequest?: Maybe<AuthProviderRequests>;
  /** update data of the table: "auth.provider_requests" */
  updateAuthProviderRequests?: Maybe<AuthProviderRequests_Mutation_Response>;
  /** update data of the table: "auth.providers" */
  updateAuthProviders?: Maybe<AuthProviders_Mutation_Response>;
  /** update single row of the table: "auth.refresh_tokens" */
  updateAuthRefreshToken?: Maybe<AuthRefreshTokens>;
  /** update single row of the table: "auth.refresh_token_types" */
  updateAuthRefreshTokenType?: Maybe<AuthRefreshTokenTypes>;
  /** update data of the table: "auth.refresh_token_types" */
  updateAuthRefreshTokenTypes?: Maybe<AuthRefreshTokenTypes_Mutation_Response>;
  /** update data of the table: "auth.refresh_tokens" */
  updateAuthRefreshTokens?: Maybe<AuthRefreshTokens_Mutation_Response>;
  /** update single row of the table: "auth.roles" */
  updateAuthRole?: Maybe<AuthRoles>;
  /** update data of the table: "auth.roles" */
  updateAuthRoles?: Maybe<AuthRoles_Mutation_Response>;
  /** update single row of the table: "auth.user_providers" */
  updateAuthUserProvider?: Maybe<AuthUserProviders>;
  /** update data of the table: "auth.user_providers" */
  updateAuthUserProviders?: Maybe<AuthUserProviders_Mutation_Response>;
  /** update single row of the table: "auth.user_roles" */
  updateAuthUserRole?: Maybe<AuthUserRoles>;
  /** update data of the table: "auth.user_roles" */
  updateAuthUserRoles?: Maybe<AuthUserRoles_Mutation_Response>;
  /** update single row of the table: "auth.user_security_keys" */
  updateAuthUserSecurityKey?: Maybe<AuthUserSecurityKeys>;
  /** update data of the table: "auth.user_security_keys" */
  updateAuthUserSecurityKeys?: Maybe<AuthUserSecurityKeys_Mutation_Response>;
  /** update single row of the table: "storage.buckets" */
  updateBucket?: Maybe<Buckets>;
  /** update data of the table: "storage.buckets" */
  updateBuckets?: Maybe<Buckets_Mutation_Response>;
  /** update single row of the table: "storage.files" */
  updateFile?: Maybe<Files>;
  /** update data of the table: "storage.files" */
  updateFiles?: Maybe<Files_Mutation_Response>;
  /** update single row of the table: "auth.users" */
  updateUser?: Maybe<Users>;
  /** update data of the table: "auth.users" */
  updateUsers?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "storage.virus" */
  updateVirus?: Maybe<Virus>;
  /** update data of the table: "storage.virus" */
  updateViruses?: Maybe<Virus_Mutation_Response>;
  /** update multiples rows of table: "auth.provider_requests" */
  update_authProviderRequests_many?: Maybe<Array<Maybe<AuthProviderRequests_Mutation_Response>>>;
  /** update multiples rows of table: "auth.providers" */
  update_authProviders_many?: Maybe<Array<Maybe<AuthProviders_Mutation_Response>>>;
  /** update multiples rows of table: "auth.refresh_token_types" */
  update_authRefreshTokenTypes_many?: Maybe<Array<Maybe<AuthRefreshTokenTypes_Mutation_Response>>>;
  /** update multiples rows of table: "auth.refresh_tokens" */
  update_authRefreshTokens_many?: Maybe<Array<Maybe<AuthRefreshTokens_Mutation_Response>>>;
  /** update multiples rows of table: "auth.roles" */
  update_authRoles_many?: Maybe<Array<Maybe<AuthRoles_Mutation_Response>>>;
  /** update multiples rows of table: "auth.user_providers" */
  update_authUserProviders_many?: Maybe<Array<Maybe<AuthUserProviders_Mutation_Response>>>;
  /** update multiples rows of table: "auth.user_roles" */
  update_authUserRoles_many?: Maybe<Array<Maybe<AuthUserRoles_Mutation_Response>>>;
  /** update multiples rows of table: "auth.user_security_keys" */
  update_authUserSecurityKeys_many?: Maybe<Array<Maybe<AuthUserSecurityKeys_Mutation_Response>>>;
  /** update data of the table: "blog_comment_helpful" */
  update_blog_comment_helpful?: Maybe<Blog_Comment_Helpful_Mutation_Response>;
  /** update single row of the table: "blog_comment_helpful" */
  update_blog_comment_helpful_by_pk?: Maybe<Blog_Comment_Helpful>;
  /** update multiples rows of table: "blog_comment_helpful" */
  update_blog_comment_helpful_many?: Maybe<Array<Maybe<Blog_Comment_Helpful_Mutation_Response>>>;
  /** update data of the table: "blog_comment_reports" */
  update_blog_comment_reports?: Maybe<Blog_Comment_Reports_Mutation_Response>;
  /** update single row of the table: "blog_comment_reports" */
  update_blog_comment_reports_by_pk?: Maybe<Blog_Comment_Reports>;
  /** update multiples rows of table: "blog_comment_reports" */
  update_blog_comment_reports_many?: Maybe<Array<Maybe<Blog_Comment_Reports_Mutation_Response>>>;
  /** update data of the table: "blog_comments" */
  update_blog_comments?: Maybe<Blog_Comments_Mutation_Response>;
  /** update single row of the table: "blog_comments" */
  update_blog_comments_by_pk?: Maybe<Blog_Comments>;
  /** update multiples rows of table: "blog_comments" */
  update_blog_comments_many?: Maybe<Array<Maybe<Blog_Comments_Mutation_Response>>>;
  /** update multiples rows of table: "storage.buckets" */
  update_buckets_many?: Maybe<Array<Maybe<Buckets_Mutation_Response>>>;
  /** update data of the table: "comment_likes" */
  update_comment_likes?: Maybe<Comment_Likes_Mutation_Response>;
  /** update single row of the table: "comment_likes" */
  update_comment_likes_by_pk?: Maybe<Comment_Likes>;
  /** update multiples rows of table: "comment_likes" */
  update_comment_likes_many?: Maybe<Array<Maybe<Comment_Likes_Mutation_Response>>>;
  /** update data of the table: "contribution_bookmarks" */
  update_contribution_bookmarks?: Maybe<Contribution_Bookmarks_Mutation_Response>;
  /** update single row of the table: "contribution_bookmarks" */
  update_contribution_bookmarks_by_pk?: Maybe<Contribution_Bookmarks>;
  /** update multiples rows of table: "contribution_bookmarks" */
  update_contribution_bookmarks_many?: Maybe<Array<Maybe<Contribution_Bookmarks_Mutation_Response>>>;
  /** update data of the table: "contribution_comments" */
  update_contribution_comments?: Maybe<Contribution_Comments_Mutation_Response>;
  /** update single row of the table: "contribution_comments" */
  update_contribution_comments_by_pk?: Maybe<Contribution_Comments>;
  /** update multiples rows of table: "contribution_comments" */
  update_contribution_comments_many?: Maybe<Array<Maybe<Contribution_Comments_Mutation_Response>>>;
  /** update data of the table: "contribution_likes" */
  update_contribution_likes?: Maybe<Contribution_Likes_Mutation_Response>;
  /** update single row of the table: "contribution_likes" */
  update_contribution_likes_by_pk?: Maybe<Contribution_Likes>;
  /** update multiples rows of table: "contribution_likes" */
  update_contribution_likes_many?: Maybe<Array<Maybe<Contribution_Likes_Mutation_Response>>>;
  /** update data of the table: "contribution_reports" */
  update_contribution_reports?: Maybe<Contribution_Reports_Mutation_Response>;
  /** update single row of the table: "contribution_reports" */
  update_contribution_reports_by_pk?: Maybe<Contribution_Reports>;
  /** update multiples rows of table: "contribution_reports" */
  update_contribution_reports_many?: Maybe<Array<Maybe<Contribution_Reports_Mutation_Response>>>;
  /** update data of the table: "contribution_types" */
  update_contribution_types?: Maybe<Contribution_Types_Mutation_Response>;
  /** update single row of the table: "contribution_types" */
  update_contribution_types_by_pk?: Maybe<Contribution_Types>;
  /** update multiples rows of table: "contribution_types" */
  update_contribution_types_many?: Maybe<Array<Maybe<Contribution_Types_Mutation_Response>>>;
  /** update data of the table: "contributions" */
  update_contributions?: Maybe<Contributions_Mutation_Response>;
  /** update single row of the table: "contributions" */
  update_contributions_by_pk?: Maybe<Contributions>;
  /** update multiples rows of table: "contributions" */
  update_contributions_many?: Maybe<Array<Maybe<Contributions_Mutation_Response>>>;
  /** update multiples rows of table: "storage.files" */
  update_files_many?: Maybe<Array<Maybe<Files_Mutation_Response>>>;
  /** update data of the table: "messages" */
  update_messages?: Maybe<Messages_Mutation_Response>;
  /** update single row of the table: "messages" */
  update_messages_by_pk?: Maybe<Messages>;
  /** update multiples rows of table: "messages" */
  update_messages_many?: Maybe<Array<Maybe<Messages_Mutation_Response>>>;
  /** update data of the table: "post_bookmarks" */
  update_post_bookmarks?: Maybe<Post_Bookmarks_Mutation_Response>;
  /** update single row of the table: "post_bookmarks" */
  update_post_bookmarks_by_pk?: Maybe<Post_Bookmarks>;
  /** update multiples rows of table: "post_bookmarks" */
  update_post_bookmarks_many?: Maybe<Array<Maybe<Post_Bookmarks_Mutation_Response>>>;
  /** update data of the table: "post_comments" */
  update_post_comments?: Maybe<Post_Comments_Mutation_Response>;
  /** update single row of the table: "post_comments" */
  update_post_comments_by_pk?: Maybe<Post_Comments>;
  /** update multiples rows of table: "post_comments" */
  update_post_comments_many?: Maybe<Array<Maybe<Post_Comments_Mutation_Response>>>;
  /** update data of the table: "post_likes" */
  update_post_likes?: Maybe<Post_Likes_Mutation_Response>;
  /** update single row of the table: "post_likes" */
  update_post_likes_by_pk?: Maybe<Post_Likes>;
  /** update multiples rows of table: "post_likes" */
  update_post_likes_many?: Maybe<Array<Maybe<Post_Likes_Mutation_Response>>>;
  /** update data of the table: "post_reports" */
  update_post_reports?: Maybe<Post_Reports_Mutation_Response>;
  /** update single row of the table: "post_reports" */
  update_post_reports_by_pk?: Maybe<Post_Reports>;
  /** update multiples rows of table: "post_reports" */
  update_post_reports_many?: Maybe<Array<Maybe<Post_Reports_Mutation_Response>>>;
  /** update data of the table: "posts" */
  update_posts?: Maybe<Posts_Mutation_Response>;
  /** update single row of the table: "posts" */
  update_posts_by_pk?: Maybe<Posts>;
  /** update multiples rows of table: "posts" */
  update_posts_many?: Maybe<Array<Maybe<Posts_Mutation_Response>>>;
  /** update data of the table: "user_blocks" */
  update_user_blocks?: Maybe<User_Blocks_Mutation_Response>;
  /** update single row of the table: "user_blocks" */
  update_user_blocks_by_pk?: Maybe<User_Blocks>;
  /** update multiples rows of table: "user_blocks" */
  update_user_blocks_many?: Maybe<Array<Maybe<User_Blocks_Mutation_Response>>>;
  /** update data of the table: "user_preferences" */
  update_user_preferences?: Maybe<User_Preferences_Mutation_Response>;
  /** update single row of the table: "user_preferences" */
  update_user_preferences_by_pk?: Maybe<User_Preferences>;
  /** update multiples rows of table: "user_preferences" */
  update_user_preferences_many?: Maybe<Array<Maybe<User_Preferences_Mutation_Response>>>;
  /** update data of the table: "user_profiles" */
  update_user_profiles?: Maybe<User_Profiles_Mutation_Response>;
  /** update single row of the table: "user_profiles" */
  update_user_profiles_by_pk?: Maybe<User_Profiles>;
  /** update multiples rows of table: "user_profiles" */
  update_user_profiles_many?: Maybe<Array<Maybe<User_Profiles_Mutation_Response>>>;
  /** update multiples rows of table: "auth.users" */
  update_users_many?: Maybe<Array<Maybe<Users_Mutation_Response>>>;
  /** update multiples rows of table: "storage.virus" */
  update_virus_many?: Maybe<Array<Maybe<Virus_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDeleteAuthProviderArgs = {
  id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDeleteAuthProviderRequestArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteAuthProviderRequestsArgs = {
  where: AuthProviderRequests_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteAuthProvidersArgs = {
  where: AuthProviders_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteAuthRefreshTokenArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteAuthRefreshTokenTypeArgs = {
  value: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDeleteAuthRefreshTokenTypesArgs = {
  where: AuthRefreshTokenTypes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteAuthRefreshTokensArgs = {
  where: AuthRefreshTokens_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteAuthRoleArgs = {
  role: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDeleteAuthRolesArgs = {
  where: AuthRoles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteAuthUserProviderArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteAuthUserProvidersArgs = {
  where: AuthUserProviders_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteAuthUserRoleArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteAuthUserRolesArgs = {
  where: AuthUserRoles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteAuthUserSecurityKeyArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteAuthUserSecurityKeysArgs = {
  where: AuthUserSecurityKeys_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteBucketArgs = {
  id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDeleteBucketsArgs = {
  where: Buckets_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteFileArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteFilesArgs = {
  where: Files_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteUserArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteUsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteVirusArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteVirusesArgs = {
  where: Virus_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Blog_Comment_HelpfulArgs = {
  where: Blog_Comment_Helpful_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Blog_Comment_Helpful_By_PkArgs = {
  comment_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Blog_Comment_ReportsArgs = {
  where: Blog_Comment_Reports_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Blog_Comment_Reports_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Blog_CommentsArgs = {
  where: Blog_Comments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Blog_Comments_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Comment_LikesArgs = {
  where: Comment_Likes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Comment_Likes_By_PkArgs = {
  comment_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Contribution_BookmarksArgs = {
  where: Contribution_Bookmarks_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Contribution_Bookmarks_By_PkArgs = {
  contribution_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Contribution_CommentsArgs = {
  where: Contribution_Comments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Contribution_Comments_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Contribution_LikesArgs = {
  where: Contribution_Likes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Contribution_Likes_By_PkArgs = {
  contribution_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Contribution_ReportsArgs = {
  where: Contribution_Reports_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Contribution_Reports_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Contribution_TypesArgs = {
  where: Contribution_Types_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Contribution_Types_By_PkArgs = {
  type: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_ContributionsArgs = {
  where: Contributions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Contributions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_MessagesArgs = {
  where: Messages_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Messages_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Post_BookmarksArgs = {
  where: Post_Bookmarks_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Post_Bookmarks_By_PkArgs = {
  post_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Post_CommentsArgs = {
  where: Post_Comments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Post_Comments_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Post_LikesArgs = {
  where: Post_Likes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Post_Likes_By_PkArgs = {
  post_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Post_ReportsArgs = {
  where: Post_Reports_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Post_Reports_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_PostsArgs = {
  where: Posts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Posts_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_User_BlocksArgs = {
  where: User_Blocks_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Blocks_By_PkArgs = {
  blocked_id: Scalars['uuid']['input'];
  blocker_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_User_PreferencesArgs = {
  where: User_Preferences_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Preferences_By_PkArgs = {
  user_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_User_ProfilesArgs = {
  where: User_Profiles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Profiles_By_PkArgs = {
  user_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootInsertAuthProviderArgs = {
  object: AuthProviders_Insert_Input;
  on_conflict?: InputMaybe<AuthProviders_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthProviderRequestArgs = {
  object: AuthProviderRequests_Insert_Input;
  on_conflict?: InputMaybe<AuthProviderRequests_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthProviderRequestsArgs = {
  objects: Array<AuthProviderRequests_Insert_Input>;
  on_conflict?: InputMaybe<AuthProviderRequests_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthProvidersArgs = {
  objects: Array<AuthProviders_Insert_Input>;
  on_conflict?: InputMaybe<AuthProviders_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthRefreshTokenArgs = {
  object: AuthRefreshTokens_Insert_Input;
  on_conflict?: InputMaybe<AuthRefreshTokens_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthRefreshTokenTypeArgs = {
  object: AuthRefreshTokenTypes_Insert_Input;
  on_conflict?: InputMaybe<AuthRefreshTokenTypes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthRefreshTokenTypesArgs = {
  objects: Array<AuthRefreshTokenTypes_Insert_Input>;
  on_conflict?: InputMaybe<AuthRefreshTokenTypes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthRefreshTokensArgs = {
  objects: Array<AuthRefreshTokens_Insert_Input>;
  on_conflict?: InputMaybe<AuthRefreshTokens_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthRoleArgs = {
  object: AuthRoles_Insert_Input;
  on_conflict?: InputMaybe<AuthRoles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthRolesArgs = {
  objects: Array<AuthRoles_Insert_Input>;
  on_conflict?: InputMaybe<AuthRoles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthUserProviderArgs = {
  object: AuthUserProviders_Insert_Input;
  on_conflict?: InputMaybe<AuthUserProviders_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthUserProvidersArgs = {
  objects: Array<AuthUserProviders_Insert_Input>;
  on_conflict?: InputMaybe<AuthUserProviders_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthUserRoleArgs = {
  object: AuthUserRoles_Insert_Input;
  on_conflict?: InputMaybe<AuthUserRoles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthUserRolesArgs = {
  objects: Array<AuthUserRoles_Insert_Input>;
  on_conflict?: InputMaybe<AuthUserRoles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthUserSecurityKeyArgs = {
  object: AuthUserSecurityKeys_Insert_Input;
  on_conflict?: InputMaybe<AuthUserSecurityKeys_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthUserSecurityKeysArgs = {
  objects: Array<AuthUserSecurityKeys_Insert_Input>;
  on_conflict?: InputMaybe<AuthUserSecurityKeys_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertBucketArgs = {
  object: Buckets_Insert_Input;
  on_conflict?: InputMaybe<Buckets_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertBucketsArgs = {
  objects: Array<Buckets_Insert_Input>;
  on_conflict?: InputMaybe<Buckets_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertFileArgs = {
  object: Files_Insert_Input;
  on_conflict?: InputMaybe<Files_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertFilesArgs = {
  objects: Array<Files_Insert_Input>;
  on_conflict?: InputMaybe<Files_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertUserArgs = {
  object: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertUsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertVirusArgs = {
  object: Virus_Insert_Input;
  on_conflict?: InputMaybe<Virus_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertVirusesArgs = {
  objects: Array<Virus_Insert_Input>;
  on_conflict?: InputMaybe<Virus_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Blog_Comment_HelpfulArgs = {
  objects: Array<Blog_Comment_Helpful_Insert_Input>;
  on_conflict?: InputMaybe<Blog_Comment_Helpful_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Blog_Comment_Helpful_OneArgs = {
  object: Blog_Comment_Helpful_Insert_Input;
  on_conflict?: InputMaybe<Blog_Comment_Helpful_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Blog_Comment_ReportsArgs = {
  objects: Array<Blog_Comment_Reports_Insert_Input>;
  on_conflict?: InputMaybe<Blog_Comment_Reports_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Blog_Comment_Reports_OneArgs = {
  object: Blog_Comment_Reports_Insert_Input;
  on_conflict?: InputMaybe<Blog_Comment_Reports_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Blog_CommentsArgs = {
  objects: Array<Blog_Comments_Insert_Input>;
  on_conflict?: InputMaybe<Blog_Comments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Blog_Comments_OneArgs = {
  object: Blog_Comments_Insert_Input;
  on_conflict?: InputMaybe<Blog_Comments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Comment_LikesArgs = {
  objects: Array<Comment_Likes_Insert_Input>;
  on_conflict?: InputMaybe<Comment_Likes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Comment_Likes_OneArgs = {
  object: Comment_Likes_Insert_Input;
  on_conflict?: InputMaybe<Comment_Likes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contribution_BookmarksArgs = {
  objects: Array<Contribution_Bookmarks_Insert_Input>;
  on_conflict?: InputMaybe<Contribution_Bookmarks_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contribution_Bookmarks_OneArgs = {
  object: Contribution_Bookmarks_Insert_Input;
  on_conflict?: InputMaybe<Contribution_Bookmarks_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contribution_CommentsArgs = {
  objects: Array<Contribution_Comments_Insert_Input>;
  on_conflict?: InputMaybe<Contribution_Comments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contribution_Comments_OneArgs = {
  object: Contribution_Comments_Insert_Input;
  on_conflict?: InputMaybe<Contribution_Comments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contribution_LikesArgs = {
  objects: Array<Contribution_Likes_Insert_Input>;
  on_conflict?: InputMaybe<Contribution_Likes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contribution_Likes_OneArgs = {
  object: Contribution_Likes_Insert_Input;
  on_conflict?: InputMaybe<Contribution_Likes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contribution_ReportsArgs = {
  objects: Array<Contribution_Reports_Insert_Input>;
  on_conflict?: InputMaybe<Contribution_Reports_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contribution_Reports_OneArgs = {
  object: Contribution_Reports_Insert_Input;
  on_conflict?: InputMaybe<Contribution_Reports_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contribution_TypesArgs = {
  objects: Array<Contribution_Types_Insert_Input>;
  on_conflict?: InputMaybe<Contribution_Types_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contribution_Types_OneArgs = {
  object: Contribution_Types_Insert_Input;
  on_conflict?: InputMaybe<Contribution_Types_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ContributionsArgs = {
  objects: Array<Contributions_Insert_Input>;
  on_conflict?: InputMaybe<Contributions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contributions_OneArgs = {
  object: Contributions_Insert_Input;
  on_conflict?: InputMaybe<Contributions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_MessagesArgs = {
  objects: Array<Messages_Insert_Input>;
  on_conflict?: InputMaybe<Messages_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Messages_OneArgs = {
  object: Messages_Insert_Input;
  on_conflict?: InputMaybe<Messages_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Post_BookmarksArgs = {
  objects: Array<Post_Bookmarks_Insert_Input>;
  on_conflict?: InputMaybe<Post_Bookmarks_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Post_Bookmarks_OneArgs = {
  object: Post_Bookmarks_Insert_Input;
  on_conflict?: InputMaybe<Post_Bookmarks_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Post_CommentsArgs = {
  objects: Array<Post_Comments_Insert_Input>;
  on_conflict?: InputMaybe<Post_Comments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Post_Comments_OneArgs = {
  object: Post_Comments_Insert_Input;
  on_conflict?: InputMaybe<Post_Comments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Post_LikesArgs = {
  objects: Array<Post_Likes_Insert_Input>;
  on_conflict?: InputMaybe<Post_Likes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Post_Likes_OneArgs = {
  object: Post_Likes_Insert_Input;
  on_conflict?: InputMaybe<Post_Likes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Post_ReportsArgs = {
  objects: Array<Post_Reports_Insert_Input>;
  on_conflict?: InputMaybe<Post_Reports_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Post_Reports_OneArgs = {
  object: Post_Reports_Insert_Input;
  on_conflict?: InputMaybe<Post_Reports_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PostsArgs = {
  objects: Array<Posts_Insert_Input>;
  on_conflict?: InputMaybe<Posts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Posts_OneArgs = {
  object: Posts_Insert_Input;
  on_conflict?: InputMaybe<Posts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_BlocksArgs = {
  objects: Array<User_Blocks_Insert_Input>;
  on_conflict?: InputMaybe<User_Blocks_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Blocks_OneArgs = {
  object: User_Blocks_Insert_Input;
  on_conflict?: InputMaybe<User_Blocks_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_PreferencesArgs = {
  objects: Array<User_Preferences_Insert_Input>;
  on_conflict?: InputMaybe<User_Preferences_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Preferences_OneArgs = {
  object: User_Preferences_Insert_Input;
  on_conflict?: InputMaybe<User_Preferences_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_ProfilesArgs = {
  objects: Array<User_Profiles_Insert_Input>;
  on_conflict?: InputMaybe<User_Profiles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Profiles_OneArgs = {
  object: User_Profiles_Insert_Input;
  on_conflict?: InputMaybe<User_Profiles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdateAuthProviderArgs = {
  _set?: InputMaybe<AuthProviders_Set_Input>;
  pk_columns: AuthProviders_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateAuthProviderRequestArgs = {
  _append?: InputMaybe<AuthProviderRequests_Append_Input>;
  _delete_at_path?: InputMaybe<AuthProviderRequests_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<AuthProviderRequests_Delete_Elem_Input>;
  _delete_key?: InputMaybe<AuthProviderRequests_Delete_Key_Input>;
  _prepend?: InputMaybe<AuthProviderRequests_Prepend_Input>;
  _set?: InputMaybe<AuthProviderRequests_Set_Input>;
  pk_columns: AuthProviderRequests_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateAuthProviderRequestsArgs = {
  _append?: InputMaybe<AuthProviderRequests_Append_Input>;
  _delete_at_path?: InputMaybe<AuthProviderRequests_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<AuthProviderRequests_Delete_Elem_Input>;
  _delete_key?: InputMaybe<AuthProviderRequests_Delete_Key_Input>;
  _prepend?: InputMaybe<AuthProviderRequests_Prepend_Input>;
  _set?: InputMaybe<AuthProviderRequests_Set_Input>;
  where: AuthProviderRequests_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateAuthProvidersArgs = {
  _set?: InputMaybe<AuthProviders_Set_Input>;
  where: AuthProviders_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateAuthRefreshTokenArgs = {
  _append?: InputMaybe<AuthRefreshTokens_Append_Input>;
  _delete_at_path?: InputMaybe<AuthRefreshTokens_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<AuthRefreshTokens_Delete_Elem_Input>;
  _delete_key?: InputMaybe<AuthRefreshTokens_Delete_Key_Input>;
  _prepend?: InputMaybe<AuthRefreshTokens_Prepend_Input>;
  _set?: InputMaybe<AuthRefreshTokens_Set_Input>;
  pk_columns: AuthRefreshTokens_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateAuthRefreshTokenTypeArgs = {
  _set?: InputMaybe<AuthRefreshTokenTypes_Set_Input>;
  pk_columns: AuthRefreshTokenTypes_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateAuthRefreshTokenTypesArgs = {
  _set?: InputMaybe<AuthRefreshTokenTypes_Set_Input>;
  where: AuthRefreshTokenTypes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateAuthRefreshTokensArgs = {
  _append?: InputMaybe<AuthRefreshTokens_Append_Input>;
  _delete_at_path?: InputMaybe<AuthRefreshTokens_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<AuthRefreshTokens_Delete_Elem_Input>;
  _delete_key?: InputMaybe<AuthRefreshTokens_Delete_Key_Input>;
  _prepend?: InputMaybe<AuthRefreshTokens_Prepend_Input>;
  _set?: InputMaybe<AuthRefreshTokens_Set_Input>;
  where: AuthRefreshTokens_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateAuthRoleArgs = {
  _set?: InputMaybe<AuthRoles_Set_Input>;
  pk_columns: AuthRoles_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateAuthRolesArgs = {
  _set?: InputMaybe<AuthRoles_Set_Input>;
  where: AuthRoles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateAuthUserProviderArgs = {
  _set?: InputMaybe<AuthUserProviders_Set_Input>;
  pk_columns: AuthUserProviders_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateAuthUserProvidersArgs = {
  _set?: InputMaybe<AuthUserProviders_Set_Input>;
  where: AuthUserProviders_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateAuthUserRoleArgs = {
  _set?: InputMaybe<AuthUserRoles_Set_Input>;
  pk_columns: AuthUserRoles_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateAuthUserRolesArgs = {
  _set?: InputMaybe<AuthUserRoles_Set_Input>;
  where: AuthUserRoles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateAuthUserSecurityKeyArgs = {
  _inc?: InputMaybe<AuthUserSecurityKeys_Inc_Input>;
  _set?: InputMaybe<AuthUserSecurityKeys_Set_Input>;
  pk_columns: AuthUserSecurityKeys_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateAuthUserSecurityKeysArgs = {
  _inc?: InputMaybe<AuthUserSecurityKeys_Inc_Input>;
  _set?: InputMaybe<AuthUserSecurityKeys_Set_Input>;
  where: AuthUserSecurityKeys_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateBucketArgs = {
  _inc?: InputMaybe<Buckets_Inc_Input>;
  _set?: InputMaybe<Buckets_Set_Input>;
  pk_columns: Buckets_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateBucketsArgs = {
  _inc?: InputMaybe<Buckets_Inc_Input>;
  _set?: InputMaybe<Buckets_Set_Input>;
  where: Buckets_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateFileArgs = {
  _append?: InputMaybe<Files_Append_Input>;
  _delete_at_path?: InputMaybe<Files_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Files_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Files_Delete_Key_Input>;
  _inc?: InputMaybe<Files_Inc_Input>;
  _prepend?: InputMaybe<Files_Prepend_Input>;
  _set?: InputMaybe<Files_Set_Input>;
  pk_columns: Files_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateFilesArgs = {
  _append?: InputMaybe<Files_Append_Input>;
  _delete_at_path?: InputMaybe<Files_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Files_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Files_Delete_Key_Input>;
  _inc?: InputMaybe<Files_Inc_Input>;
  _prepend?: InputMaybe<Files_Prepend_Input>;
  _set?: InputMaybe<Files_Set_Input>;
  where: Files_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateUserArgs = {
  _append?: InputMaybe<Users_Append_Input>;
  _delete_at_path?: InputMaybe<Users_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Users_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Users_Delete_Key_Input>;
  _prepend?: InputMaybe<Users_Prepend_Input>;
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateUsersArgs = {
  _append?: InputMaybe<Users_Append_Input>;
  _delete_at_path?: InputMaybe<Users_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Users_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Users_Delete_Key_Input>;
  _prepend?: InputMaybe<Users_Prepend_Input>;
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateVirusArgs = {
  _append?: InputMaybe<Virus_Append_Input>;
  _delete_at_path?: InputMaybe<Virus_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Virus_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Virus_Delete_Key_Input>;
  _prepend?: InputMaybe<Virus_Prepend_Input>;
  _set?: InputMaybe<Virus_Set_Input>;
  pk_columns: Virus_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateVirusesArgs = {
  _append?: InputMaybe<Virus_Append_Input>;
  _delete_at_path?: InputMaybe<Virus_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Virus_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Virus_Delete_Key_Input>;
  _prepend?: InputMaybe<Virus_Prepend_Input>;
  _set?: InputMaybe<Virus_Set_Input>;
  where: Virus_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_AuthProviderRequests_ManyArgs = {
  updates: Array<AuthProviderRequests_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_AuthProviders_ManyArgs = {
  updates: Array<AuthProviders_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_AuthRefreshTokenTypes_ManyArgs = {
  updates: Array<AuthRefreshTokenTypes_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_AuthRefreshTokens_ManyArgs = {
  updates: Array<AuthRefreshTokens_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_AuthRoles_ManyArgs = {
  updates: Array<AuthRoles_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_AuthUserProviders_ManyArgs = {
  updates: Array<AuthUserProviders_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_AuthUserRoles_ManyArgs = {
  updates: Array<AuthUserRoles_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_AuthUserSecurityKeys_ManyArgs = {
  updates: Array<AuthUserSecurityKeys_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Blog_Comment_HelpfulArgs = {
  _set?: InputMaybe<Blog_Comment_Helpful_Set_Input>;
  where: Blog_Comment_Helpful_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Blog_Comment_Helpful_By_PkArgs = {
  _set?: InputMaybe<Blog_Comment_Helpful_Set_Input>;
  pk_columns: Blog_Comment_Helpful_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Blog_Comment_Helpful_ManyArgs = {
  updates: Array<Blog_Comment_Helpful_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Blog_Comment_ReportsArgs = {
  _set?: InputMaybe<Blog_Comment_Reports_Set_Input>;
  where: Blog_Comment_Reports_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Blog_Comment_Reports_By_PkArgs = {
  _set?: InputMaybe<Blog_Comment_Reports_Set_Input>;
  pk_columns: Blog_Comment_Reports_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Blog_Comment_Reports_ManyArgs = {
  updates: Array<Blog_Comment_Reports_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Blog_CommentsArgs = {
  _inc?: InputMaybe<Blog_Comments_Inc_Input>;
  _set?: InputMaybe<Blog_Comments_Set_Input>;
  where: Blog_Comments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Blog_Comments_By_PkArgs = {
  _inc?: InputMaybe<Blog_Comments_Inc_Input>;
  _set?: InputMaybe<Blog_Comments_Set_Input>;
  pk_columns: Blog_Comments_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Blog_Comments_ManyArgs = {
  updates: Array<Blog_Comments_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Buckets_ManyArgs = {
  updates: Array<Buckets_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Comment_LikesArgs = {
  _set?: InputMaybe<Comment_Likes_Set_Input>;
  where: Comment_Likes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Comment_Likes_By_PkArgs = {
  _set?: InputMaybe<Comment_Likes_Set_Input>;
  pk_columns: Comment_Likes_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Comment_Likes_ManyArgs = {
  updates: Array<Comment_Likes_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Contribution_BookmarksArgs = {
  _set?: InputMaybe<Contribution_Bookmarks_Set_Input>;
  where: Contribution_Bookmarks_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Contribution_Bookmarks_By_PkArgs = {
  _set?: InputMaybe<Contribution_Bookmarks_Set_Input>;
  pk_columns: Contribution_Bookmarks_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Contribution_Bookmarks_ManyArgs = {
  updates: Array<Contribution_Bookmarks_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Contribution_CommentsArgs = {
  _inc?: InputMaybe<Contribution_Comments_Inc_Input>;
  _set?: InputMaybe<Contribution_Comments_Set_Input>;
  where: Contribution_Comments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Contribution_Comments_By_PkArgs = {
  _inc?: InputMaybe<Contribution_Comments_Inc_Input>;
  _set?: InputMaybe<Contribution_Comments_Set_Input>;
  pk_columns: Contribution_Comments_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Contribution_Comments_ManyArgs = {
  updates: Array<Contribution_Comments_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Contribution_LikesArgs = {
  _set?: InputMaybe<Contribution_Likes_Set_Input>;
  where: Contribution_Likes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Contribution_Likes_By_PkArgs = {
  _set?: InputMaybe<Contribution_Likes_Set_Input>;
  pk_columns: Contribution_Likes_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Contribution_Likes_ManyArgs = {
  updates: Array<Contribution_Likes_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Contribution_ReportsArgs = {
  _set?: InputMaybe<Contribution_Reports_Set_Input>;
  where: Contribution_Reports_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Contribution_Reports_By_PkArgs = {
  _set?: InputMaybe<Contribution_Reports_Set_Input>;
  pk_columns: Contribution_Reports_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Contribution_Reports_ManyArgs = {
  updates: Array<Contribution_Reports_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Contribution_TypesArgs = {
  _set?: InputMaybe<Contribution_Types_Set_Input>;
  where: Contribution_Types_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Contribution_Types_By_PkArgs = {
  _set?: InputMaybe<Contribution_Types_Set_Input>;
  pk_columns: Contribution_Types_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Contribution_Types_ManyArgs = {
  updates: Array<Contribution_Types_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ContributionsArgs = {
  _inc?: InputMaybe<Contributions_Inc_Input>;
  _set?: InputMaybe<Contributions_Set_Input>;
  where: Contributions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Contributions_By_PkArgs = {
  _inc?: InputMaybe<Contributions_Inc_Input>;
  _set?: InputMaybe<Contributions_Set_Input>;
  pk_columns: Contributions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Contributions_ManyArgs = {
  updates: Array<Contributions_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Files_ManyArgs = {
  updates: Array<Files_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_MessagesArgs = {
  _inc?: InputMaybe<Messages_Inc_Input>;
  _set?: InputMaybe<Messages_Set_Input>;
  where: Messages_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Messages_By_PkArgs = {
  _inc?: InputMaybe<Messages_Inc_Input>;
  _set?: InputMaybe<Messages_Set_Input>;
  pk_columns: Messages_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Messages_ManyArgs = {
  updates: Array<Messages_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Post_BookmarksArgs = {
  _set?: InputMaybe<Post_Bookmarks_Set_Input>;
  where: Post_Bookmarks_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Post_Bookmarks_By_PkArgs = {
  _set?: InputMaybe<Post_Bookmarks_Set_Input>;
  pk_columns: Post_Bookmarks_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Post_Bookmarks_ManyArgs = {
  updates: Array<Post_Bookmarks_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Post_CommentsArgs = {
  _set?: InputMaybe<Post_Comments_Set_Input>;
  where: Post_Comments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Post_Comments_By_PkArgs = {
  _set?: InputMaybe<Post_Comments_Set_Input>;
  pk_columns: Post_Comments_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Post_Comments_ManyArgs = {
  updates: Array<Post_Comments_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Post_LikesArgs = {
  _set?: InputMaybe<Post_Likes_Set_Input>;
  where: Post_Likes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Post_Likes_By_PkArgs = {
  _set?: InputMaybe<Post_Likes_Set_Input>;
  pk_columns: Post_Likes_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Post_Likes_ManyArgs = {
  updates: Array<Post_Likes_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Post_ReportsArgs = {
  _set?: InputMaybe<Post_Reports_Set_Input>;
  where: Post_Reports_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Post_Reports_By_PkArgs = {
  _set?: InputMaybe<Post_Reports_Set_Input>;
  pk_columns: Post_Reports_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Post_Reports_ManyArgs = {
  updates: Array<Post_Reports_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_PostsArgs = {
  _set?: InputMaybe<Posts_Set_Input>;
  where: Posts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Posts_By_PkArgs = {
  _set?: InputMaybe<Posts_Set_Input>;
  pk_columns: Posts_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Posts_ManyArgs = {
  updates: Array<Posts_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_User_BlocksArgs = {
  _set?: InputMaybe<User_Blocks_Set_Input>;
  where: User_Blocks_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Blocks_By_PkArgs = {
  _set?: InputMaybe<User_Blocks_Set_Input>;
  pk_columns: User_Blocks_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_Blocks_ManyArgs = {
  updates: Array<User_Blocks_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_User_PreferencesArgs = {
  _set?: InputMaybe<User_Preferences_Set_Input>;
  where: User_Preferences_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Preferences_By_PkArgs = {
  _set?: InputMaybe<User_Preferences_Set_Input>;
  pk_columns: User_Preferences_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_Preferences_ManyArgs = {
  updates: Array<User_Preferences_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_User_ProfilesArgs = {
  _set?: InputMaybe<User_Profiles_Set_Input>;
  where: User_Profiles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Profiles_By_PkArgs = {
  _set?: InputMaybe<User_Profiles_Set_Input>;
  pk_columns: User_Profiles_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_Profiles_ManyArgs = {
  updates: Array<User_Profiles_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Users_ManyArgs = {
  updates: Array<Users_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Virus_ManyArgs = {
  updates: Array<Virus_Updates>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "post_bookmarks" */
export type Post_Bookmarks = {
  __typename?: 'post_bookmarks';
  created_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  post: Posts;
  post_id: Scalars['uuid']['output'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid']['output'];
};

/** aggregated selection of "post_bookmarks" */
export type Post_Bookmarks_Aggregate = {
  __typename?: 'post_bookmarks_aggregate';
  aggregate?: Maybe<Post_Bookmarks_Aggregate_Fields>;
  nodes: Array<Post_Bookmarks>;
};

export type Post_Bookmarks_Aggregate_Bool_Exp = {
  count?: InputMaybe<Post_Bookmarks_Aggregate_Bool_Exp_Count>;
};

export type Post_Bookmarks_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Post_Bookmarks_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Post_Bookmarks_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "post_bookmarks" */
export type Post_Bookmarks_Aggregate_Fields = {
  __typename?: 'post_bookmarks_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Post_Bookmarks_Max_Fields>;
  min?: Maybe<Post_Bookmarks_Min_Fields>;
};


/** aggregate fields of "post_bookmarks" */
export type Post_Bookmarks_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Post_Bookmarks_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "post_bookmarks" */
export type Post_Bookmarks_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Post_Bookmarks_Max_Order_By>;
  min?: InputMaybe<Post_Bookmarks_Min_Order_By>;
};

/** input type for inserting array relation for remote table "post_bookmarks" */
export type Post_Bookmarks_Arr_Rel_Insert_Input = {
  data: Array<Post_Bookmarks_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Post_Bookmarks_On_Conflict>;
};

/** Boolean expression to filter rows from the table "post_bookmarks". All fields are combined with a logical 'AND'. */
export type Post_Bookmarks_Bool_Exp = {
  _and?: InputMaybe<Array<Post_Bookmarks_Bool_Exp>>;
  _not?: InputMaybe<Post_Bookmarks_Bool_Exp>;
  _or?: InputMaybe<Array<Post_Bookmarks_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  post?: InputMaybe<Posts_Bool_Exp>;
  post_id?: InputMaybe<Uuid_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "post_bookmarks" */
export enum Post_Bookmarks_Constraint {
  /** unique or primary key constraint on columns "user_id", "post_id" */
  PostBookmarksPkey = 'post_bookmarks_pkey'
}

/** input type for inserting data into table "post_bookmarks" */
export type Post_Bookmarks_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  post?: InputMaybe<Posts_Obj_Rel_Insert_Input>;
  post_id?: InputMaybe<Scalars['uuid']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Post_Bookmarks_Max_Fields = {
  __typename?: 'post_bookmarks_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  post_id?: Maybe<Scalars['uuid']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "post_bookmarks" */
export type Post_Bookmarks_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  post_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Post_Bookmarks_Min_Fields = {
  __typename?: 'post_bookmarks_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  post_id?: Maybe<Scalars['uuid']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "post_bookmarks" */
export type Post_Bookmarks_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  post_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "post_bookmarks" */
export type Post_Bookmarks_Mutation_Response = {
  __typename?: 'post_bookmarks_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Post_Bookmarks>;
};

/** on_conflict condition type for table "post_bookmarks" */
export type Post_Bookmarks_On_Conflict = {
  constraint: Post_Bookmarks_Constraint;
  update_columns?: Array<Post_Bookmarks_Update_Column>;
  where?: InputMaybe<Post_Bookmarks_Bool_Exp>;
};

/** Ordering options when selecting data from "post_bookmarks". */
export type Post_Bookmarks_Order_By = {
  created_at?: InputMaybe<Order_By>;
  post?: InputMaybe<Posts_Order_By>;
  post_id?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: post_bookmarks */
export type Post_Bookmarks_Pk_Columns_Input = {
  post_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};

/** select columns of table "post_bookmarks" */
export enum Post_Bookmarks_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  PostId = 'post_id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "post_bookmarks" */
export type Post_Bookmarks_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  post_id?: InputMaybe<Scalars['uuid']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "post_bookmarks" */
export type Post_Bookmarks_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Post_Bookmarks_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Post_Bookmarks_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  post_id?: InputMaybe<Scalars['uuid']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "post_bookmarks" */
export enum Post_Bookmarks_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  PostId = 'post_id',
  /** column name */
  UserId = 'user_id'
}

export type Post_Bookmarks_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Post_Bookmarks_Set_Input>;
  /** filter the rows which have to be updated */
  where: Post_Bookmarks_Bool_Exp;
};

/** columns and relationships of "post_comments" */
export type Post_Comments = {
  __typename?: 'post_comments';
  /** An array relationship */
  comment_likes: Array<Comment_Likes>;
  /** An aggregate relationship */
  comment_likes_aggregate: Comment_Likes_Aggregate;
  content: Scalars['String']['output'];
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  parent_comment_id: Scalars['uuid']['output'];
  /** An object relationship */
  post: Posts;
  post_id: Scalars['uuid']['output'];
  updated_at: Scalars['timestamptz']['output'];
  user_id: Scalars['uuid']['output'];
};


/** columns and relationships of "post_comments" */
export type Post_CommentsComment_LikesArgs = {
  distinct_on?: InputMaybe<Array<Comment_Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Comment_Likes_Order_By>>;
  where?: InputMaybe<Comment_Likes_Bool_Exp>;
};


/** columns and relationships of "post_comments" */
export type Post_CommentsComment_Likes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Comment_Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Comment_Likes_Order_By>>;
  where?: InputMaybe<Comment_Likes_Bool_Exp>;
};

/** aggregated selection of "post_comments" */
export type Post_Comments_Aggregate = {
  __typename?: 'post_comments_aggregate';
  aggregate?: Maybe<Post_Comments_Aggregate_Fields>;
  nodes: Array<Post_Comments>;
};

export type Post_Comments_Aggregate_Bool_Exp = {
  count?: InputMaybe<Post_Comments_Aggregate_Bool_Exp_Count>;
};

export type Post_Comments_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Post_Comments_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Post_Comments_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "post_comments" */
export type Post_Comments_Aggregate_Fields = {
  __typename?: 'post_comments_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Post_Comments_Max_Fields>;
  min?: Maybe<Post_Comments_Min_Fields>;
};


/** aggregate fields of "post_comments" */
export type Post_Comments_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Post_Comments_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "post_comments" */
export type Post_Comments_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Post_Comments_Max_Order_By>;
  min?: InputMaybe<Post_Comments_Min_Order_By>;
};

/** input type for inserting array relation for remote table "post_comments" */
export type Post_Comments_Arr_Rel_Insert_Input = {
  data: Array<Post_Comments_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Post_Comments_On_Conflict>;
};

/** Boolean expression to filter rows from the table "post_comments". All fields are combined with a logical 'AND'. */
export type Post_Comments_Bool_Exp = {
  _and?: InputMaybe<Array<Post_Comments_Bool_Exp>>;
  _not?: InputMaybe<Post_Comments_Bool_Exp>;
  _or?: InputMaybe<Array<Post_Comments_Bool_Exp>>;
  comment_likes?: InputMaybe<Comment_Likes_Bool_Exp>;
  comment_likes_aggregate?: InputMaybe<Comment_Likes_Aggregate_Bool_Exp>;
  content?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  parent_comment_id?: InputMaybe<Uuid_Comparison_Exp>;
  post?: InputMaybe<Posts_Bool_Exp>;
  post_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "post_comments" */
export enum Post_Comments_Constraint {
  /** unique or primary key constraint on columns "id" */
  PostCommentsPkey = 'post_comments_pkey'
}

/** input type for inserting data into table "post_comments" */
export type Post_Comments_Insert_Input = {
  comment_likes?: InputMaybe<Comment_Likes_Arr_Rel_Insert_Input>;
  content?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  parent_comment_id?: InputMaybe<Scalars['uuid']['input']>;
  post?: InputMaybe<Posts_Obj_Rel_Insert_Input>;
  post_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Post_Comments_Max_Fields = {
  __typename?: 'post_comments_max_fields';
  content?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  parent_comment_id?: Maybe<Scalars['uuid']['output']>;
  post_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "post_comments" */
export type Post_Comments_Max_Order_By = {
  content?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_comment_id?: InputMaybe<Order_By>;
  post_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Post_Comments_Min_Fields = {
  __typename?: 'post_comments_min_fields';
  content?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  parent_comment_id?: Maybe<Scalars['uuid']['output']>;
  post_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "post_comments" */
export type Post_Comments_Min_Order_By = {
  content?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_comment_id?: InputMaybe<Order_By>;
  post_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "post_comments" */
export type Post_Comments_Mutation_Response = {
  __typename?: 'post_comments_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Post_Comments>;
};

/** input type for inserting object relation for remote table "post_comments" */
export type Post_Comments_Obj_Rel_Insert_Input = {
  data: Post_Comments_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Post_Comments_On_Conflict>;
};

/** on_conflict condition type for table "post_comments" */
export type Post_Comments_On_Conflict = {
  constraint: Post_Comments_Constraint;
  update_columns?: Array<Post_Comments_Update_Column>;
  where?: InputMaybe<Post_Comments_Bool_Exp>;
};

/** Ordering options when selecting data from "post_comments". */
export type Post_Comments_Order_By = {
  comment_likes_aggregate?: InputMaybe<Comment_Likes_Aggregate_Order_By>;
  content?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  parent_comment_id?: InputMaybe<Order_By>;
  post?: InputMaybe<Posts_Order_By>;
  post_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: post_comments */
export type Post_Comments_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "post_comments" */
export enum Post_Comments_Select_Column {
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  ParentCommentId = 'parent_comment_id',
  /** column name */
  PostId = 'post_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "post_comments" */
export type Post_Comments_Set_Input = {
  content?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  parent_comment_id?: InputMaybe<Scalars['uuid']['input']>;
  post_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "post_comments" */
export type Post_Comments_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Post_Comments_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Post_Comments_Stream_Cursor_Value_Input = {
  content?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  parent_comment_id?: InputMaybe<Scalars['uuid']['input']>;
  post_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "post_comments" */
export enum Post_Comments_Update_Column {
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  ParentCommentId = 'parent_comment_id',
  /** column name */
  PostId = 'post_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

export type Post_Comments_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Post_Comments_Set_Input>;
  /** filter the rows which have to be updated */
  where: Post_Comments_Bool_Exp;
};

/** columns and relationships of "post_likes" */
export type Post_Likes = {
  __typename?: 'post_likes';
  created_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  post: Posts;
  post_id: Scalars['uuid']['output'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid']['output'];
};

/** aggregated selection of "post_likes" */
export type Post_Likes_Aggregate = {
  __typename?: 'post_likes_aggregate';
  aggregate?: Maybe<Post_Likes_Aggregate_Fields>;
  nodes: Array<Post_Likes>;
};

export type Post_Likes_Aggregate_Bool_Exp = {
  count?: InputMaybe<Post_Likes_Aggregate_Bool_Exp_Count>;
};

export type Post_Likes_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Post_Likes_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Post_Likes_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "post_likes" */
export type Post_Likes_Aggregate_Fields = {
  __typename?: 'post_likes_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Post_Likes_Max_Fields>;
  min?: Maybe<Post_Likes_Min_Fields>;
};


/** aggregate fields of "post_likes" */
export type Post_Likes_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Post_Likes_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "post_likes" */
export type Post_Likes_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Post_Likes_Max_Order_By>;
  min?: InputMaybe<Post_Likes_Min_Order_By>;
};

/** input type for inserting array relation for remote table "post_likes" */
export type Post_Likes_Arr_Rel_Insert_Input = {
  data: Array<Post_Likes_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Post_Likes_On_Conflict>;
};

/** Boolean expression to filter rows from the table "post_likes". All fields are combined with a logical 'AND'. */
export type Post_Likes_Bool_Exp = {
  _and?: InputMaybe<Array<Post_Likes_Bool_Exp>>;
  _not?: InputMaybe<Post_Likes_Bool_Exp>;
  _or?: InputMaybe<Array<Post_Likes_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  post?: InputMaybe<Posts_Bool_Exp>;
  post_id?: InputMaybe<Uuid_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "post_likes" */
export enum Post_Likes_Constraint {
  /** unique or primary key constraint on columns "user_id", "post_id" */
  PostLikesPkey = 'post_likes_pkey'
}

/** input type for inserting data into table "post_likes" */
export type Post_Likes_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  post?: InputMaybe<Posts_Obj_Rel_Insert_Input>;
  post_id?: InputMaybe<Scalars['uuid']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Post_Likes_Max_Fields = {
  __typename?: 'post_likes_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  post_id?: Maybe<Scalars['uuid']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "post_likes" */
export type Post_Likes_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  post_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Post_Likes_Min_Fields = {
  __typename?: 'post_likes_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  post_id?: Maybe<Scalars['uuid']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "post_likes" */
export type Post_Likes_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  post_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "post_likes" */
export type Post_Likes_Mutation_Response = {
  __typename?: 'post_likes_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Post_Likes>;
};

/** on_conflict condition type for table "post_likes" */
export type Post_Likes_On_Conflict = {
  constraint: Post_Likes_Constraint;
  update_columns?: Array<Post_Likes_Update_Column>;
  where?: InputMaybe<Post_Likes_Bool_Exp>;
};

/** Ordering options when selecting data from "post_likes". */
export type Post_Likes_Order_By = {
  created_at?: InputMaybe<Order_By>;
  post?: InputMaybe<Posts_Order_By>;
  post_id?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: post_likes */
export type Post_Likes_Pk_Columns_Input = {
  post_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};

/** select columns of table "post_likes" */
export enum Post_Likes_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  PostId = 'post_id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "post_likes" */
export type Post_Likes_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  post_id?: InputMaybe<Scalars['uuid']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "post_likes" */
export type Post_Likes_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Post_Likes_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Post_Likes_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  post_id?: InputMaybe<Scalars['uuid']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "post_likes" */
export enum Post_Likes_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  PostId = 'post_id',
  /** column name */
  UserId = 'user_id'
}

export type Post_Likes_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Post_Likes_Set_Input>;
  /** filter the rows which have to be updated */
  where: Post_Likes_Bool_Exp;
};

/** columns and relationships of "post_reports" */
export type Post_Reports = {
  __typename?: 'post_reports';
  created_at: Scalars['timestamptz']['output'];
  details?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  /** An object relationship */
  post: Posts;
  post_id: Scalars['uuid']['output'];
  reason: Scalars['String']['output'];
  reporter_id: Scalars['uuid']['output'];
  status: Scalars['String']['output'];
  /** An object relationship */
  user: Users;
};

/** aggregated selection of "post_reports" */
export type Post_Reports_Aggregate = {
  __typename?: 'post_reports_aggregate';
  aggregate?: Maybe<Post_Reports_Aggregate_Fields>;
  nodes: Array<Post_Reports>;
};

export type Post_Reports_Aggregate_Bool_Exp = {
  count?: InputMaybe<Post_Reports_Aggregate_Bool_Exp_Count>;
};

export type Post_Reports_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Post_Reports_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Post_Reports_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "post_reports" */
export type Post_Reports_Aggregate_Fields = {
  __typename?: 'post_reports_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Post_Reports_Max_Fields>;
  min?: Maybe<Post_Reports_Min_Fields>;
};


/** aggregate fields of "post_reports" */
export type Post_Reports_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Post_Reports_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "post_reports" */
export type Post_Reports_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Post_Reports_Max_Order_By>;
  min?: InputMaybe<Post_Reports_Min_Order_By>;
};

/** input type for inserting array relation for remote table "post_reports" */
export type Post_Reports_Arr_Rel_Insert_Input = {
  data: Array<Post_Reports_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Post_Reports_On_Conflict>;
};

/** Boolean expression to filter rows from the table "post_reports". All fields are combined with a logical 'AND'. */
export type Post_Reports_Bool_Exp = {
  _and?: InputMaybe<Array<Post_Reports_Bool_Exp>>;
  _not?: InputMaybe<Post_Reports_Bool_Exp>;
  _or?: InputMaybe<Array<Post_Reports_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  details?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  post?: InputMaybe<Posts_Bool_Exp>;
  post_id?: InputMaybe<Uuid_Comparison_Exp>;
  reason?: InputMaybe<String_Comparison_Exp>;
  reporter_id?: InputMaybe<Uuid_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
};

/** unique or primary key constraints on table "post_reports" */
export enum Post_Reports_Constraint {
  /** unique or primary key constraint on columns "id" */
  PostReportsPkey = 'post_reports_pkey',
  /** unique or primary key constraint on columns "post_id", "reporter_id" */
  PostReportsUniquePerUser = 'post_reports_unique_per_user'
}

/** input type for inserting data into table "post_reports" */
export type Post_Reports_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  details?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  post?: InputMaybe<Posts_Obj_Rel_Insert_Input>;
  post_id?: InputMaybe<Scalars['uuid']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  reporter_id?: InputMaybe<Scalars['uuid']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Post_Reports_Max_Fields = {
  __typename?: 'post_reports_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  details?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  post_id?: Maybe<Scalars['uuid']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  reporter_id?: Maybe<Scalars['uuid']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "post_reports" */
export type Post_Reports_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  details?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  post_id?: InputMaybe<Order_By>;
  reason?: InputMaybe<Order_By>;
  reporter_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Post_Reports_Min_Fields = {
  __typename?: 'post_reports_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  details?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  post_id?: Maybe<Scalars['uuid']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  reporter_id?: Maybe<Scalars['uuid']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "post_reports" */
export type Post_Reports_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  details?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  post_id?: InputMaybe<Order_By>;
  reason?: InputMaybe<Order_By>;
  reporter_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "post_reports" */
export type Post_Reports_Mutation_Response = {
  __typename?: 'post_reports_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Post_Reports>;
};

/** on_conflict condition type for table "post_reports" */
export type Post_Reports_On_Conflict = {
  constraint: Post_Reports_Constraint;
  update_columns?: Array<Post_Reports_Update_Column>;
  where?: InputMaybe<Post_Reports_Bool_Exp>;
};

/** Ordering options when selecting data from "post_reports". */
export type Post_Reports_Order_By = {
  created_at?: InputMaybe<Order_By>;
  details?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  post?: InputMaybe<Posts_Order_By>;
  post_id?: InputMaybe<Order_By>;
  reason?: InputMaybe<Order_By>;
  reporter_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
};

/** primary key columns input for table: post_reports */
export type Post_Reports_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "post_reports" */
export enum Post_Reports_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Details = 'details',
  /** column name */
  Id = 'id',
  /** column name */
  PostId = 'post_id',
  /** column name */
  Reason = 'reason',
  /** column name */
  ReporterId = 'reporter_id',
  /** column name */
  Status = 'status'
}

/** input type for updating data in table "post_reports" */
export type Post_Reports_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  details?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  post_id?: InputMaybe<Scalars['uuid']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  reporter_id?: InputMaybe<Scalars['uuid']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "post_reports" */
export type Post_Reports_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Post_Reports_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Post_Reports_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  details?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  post_id?: InputMaybe<Scalars['uuid']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  reporter_id?: InputMaybe<Scalars['uuid']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "post_reports" */
export enum Post_Reports_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Details = 'details',
  /** column name */
  Id = 'id',
  /** column name */
  PostId = 'post_id',
  /** column name */
  Reason = 'reason',
  /** column name */
  ReporterId = 'reporter_id',
  /** column name */
  Status = 'status'
}

export type Post_Reports_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Post_Reports_Set_Input>;
  /** filter the rows which have to be updated */
  where: Post_Reports_Bool_Exp;
};

/** columns and relationships of "posts" */
export type Posts = {
  __typename?: 'posts';
  content: Scalars['String']['output'];
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  /** An array relationship */
  post_bookmarks: Array<Post_Bookmarks>;
  /** An aggregate relationship */
  post_bookmarks_aggregate: Post_Bookmarks_Aggregate;
  /** An array relationship */
  post_comments: Array<Post_Comments>;
  /** An aggregate relationship */
  post_comments_aggregate: Post_Comments_Aggregate;
  /** An array relationship */
  post_likes: Array<Post_Likes>;
  /** An aggregate relationship */
  post_likes_aggregate: Post_Likes_Aggregate;
  updated_at: Scalars['timestamptz']['output'];
  user_id: Scalars['uuid']['output'];
};


/** columns and relationships of "posts" */
export type PostsPost_BookmarksArgs = {
  distinct_on?: InputMaybe<Array<Post_Bookmarks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Post_Bookmarks_Order_By>>;
  where?: InputMaybe<Post_Bookmarks_Bool_Exp>;
};


/** columns and relationships of "posts" */
export type PostsPost_Bookmarks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Post_Bookmarks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Post_Bookmarks_Order_By>>;
  where?: InputMaybe<Post_Bookmarks_Bool_Exp>;
};


/** columns and relationships of "posts" */
export type PostsPost_CommentsArgs = {
  distinct_on?: InputMaybe<Array<Post_Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Post_Comments_Order_By>>;
  where?: InputMaybe<Post_Comments_Bool_Exp>;
};


/** columns and relationships of "posts" */
export type PostsPost_Comments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Post_Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Post_Comments_Order_By>>;
  where?: InputMaybe<Post_Comments_Bool_Exp>;
};


/** columns and relationships of "posts" */
export type PostsPost_LikesArgs = {
  distinct_on?: InputMaybe<Array<Post_Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Post_Likes_Order_By>>;
  where?: InputMaybe<Post_Likes_Bool_Exp>;
};


/** columns and relationships of "posts" */
export type PostsPost_Likes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Post_Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Post_Likes_Order_By>>;
  where?: InputMaybe<Post_Likes_Bool_Exp>;
};

/** aggregated selection of "posts" */
export type Posts_Aggregate = {
  __typename?: 'posts_aggregate';
  aggregate?: Maybe<Posts_Aggregate_Fields>;
  nodes: Array<Posts>;
};

export type Posts_Aggregate_Bool_Exp = {
  count?: InputMaybe<Posts_Aggregate_Bool_Exp_Count>;
};

export type Posts_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Posts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Posts_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "posts" */
export type Posts_Aggregate_Fields = {
  __typename?: 'posts_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Posts_Max_Fields>;
  min?: Maybe<Posts_Min_Fields>;
};


/** aggregate fields of "posts" */
export type Posts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Posts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "posts" */
export type Posts_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Posts_Max_Order_By>;
  min?: InputMaybe<Posts_Min_Order_By>;
};

/** input type for inserting array relation for remote table "posts" */
export type Posts_Arr_Rel_Insert_Input = {
  data: Array<Posts_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Posts_On_Conflict>;
};

/** Boolean expression to filter rows from the table "posts". All fields are combined with a logical 'AND'. */
export type Posts_Bool_Exp = {
  _and?: InputMaybe<Array<Posts_Bool_Exp>>;
  _not?: InputMaybe<Posts_Bool_Exp>;
  _or?: InputMaybe<Array<Posts_Bool_Exp>>;
  content?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  post_bookmarks?: InputMaybe<Post_Bookmarks_Bool_Exp>;
  post_bookmarks_aggregate?: InputMaybe<Post_Bookmarks_Aggregate_Bool_Exp>;
  post_comments?: InputMaybe<Post_Comments_Bool_Exp>;
  post_comments_aggregate?: InputMaybe<Post_Comments_Aggregate_Bool_Exp>;
  post_likes?: InputMaybe<Post_Likes_Bool_Exp>;
  post_likes_aggregate?: InputMaybe<Post_Likes_Aggregate_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "posts" */
export enum Posts_Constraint {
  /** unique or primary key constraint on columns "id" */
  PostsPkey = 'posts_pkey'
}

/** input type for inserting data into table "posts" */
export type Posts_Insert_Input = {
  content?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  post_bookmarks?: InputMaybe<Post_Bookmarks_Arr_Rel_Insert_Input>;
  post_comments?: InputMaybe<Post_Comments_Arr_Rel_Insert_Input>;
  post_likes?: InputMaybe<Post_Likes_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Posts_Max_Fields = {
  __typename?: 'posts_max_fields';
  content?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "posts" */
export type Posts_Max_Order_By = {
  content?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Posts_Min_Fields = {
  __typename?: 'posts_min_fields';
  content?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "posts" */
export type Posts_Min_Order_By = {
  content?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "posts" */
export type Posts_Mutation_Response = {
  __typename?: 'posts_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Posts>;
};

/** input type for inserting object relation for remote table "posts" */
export type Posts_Obj_Rel_Insert_Input = {
  data: Posts_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Posts_On_Conflict>;
};

/** on_conflict condition type for table "posts" */
export type Posts_On_Conflict = {
  constraint: Posts_Constraint;
  update_columns?: Array<Posts_Update_Column>;
  where?: InputMaybe<Posts_Bool_Exp>;
};

/** Ordering options when selecting data from "posts". */
export type Posts_Order_By = {
  content?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  post_bookmarks_aggregate?: InputMaybe<Post_Bookmarks_Aggregate_Order_By>;
  post_comments_aggregate?: InputMaybe<Post_Comments_Aggregate_Order_By>;
  post_likes_aggregate?: InputMaybe<Post_Likes_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: posts */
export type Posts_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "posts" */
export enum Posts_Select_Column {
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "posts" */
export type Posts_Set_Input = {
  content?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "posts" */
export type Posts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Posts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Posts_Stream_Cursor_Value_Input = {
  content?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "posts" */
export enum Posts_Update_Column {
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

export type Posts_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Posts_Set_Input>;
  /** filter the rows which have to be updated */
  where: Posts_Bool_Exp;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "auth.providers" using primary key columns */
  authProvider?: Maybe<AuthProviders>;
  /** fetch data from the table: "auth.provider_requests" using primary key columns */
  authProviderRequest?: Maybe<AuthProviderRequests>;
  /** fetch data from the table: "auth.provider_requests" */
  authProviderRequests: Array<AuthProviderRequests>;
  /** fetch aggregated fields from the table: "auth.provider_requests" */
  authProviderRequestsAggregate: AuthProviderRequests_Aggregate;
  /** fetch data from the table: "auth.providers" */
  authProviders: Array<AuthProviders>;
  /** fetch aggregated fields from the table: "auth.providers" */
  authProvidersAggregate: AuthProviders_Aggregate;
  /** fetch data from the table: "auth.refresh_tokens" using primary key columns */
  authRefreshToken?: Maybe<AuthRefreshTokens>;
  /** fetch data from the table: "auth.refresh_token_types" using primary key columns */
  authRefreshTokenType?: Maybe<AuthRefreshTokenTypes>;
  /** fetch data from the table: "auth.refresh_token_types" */
  authRefreshTokenTypes: Array<AuthRefreshTokenTypes>;
  /** fetch aggregated fields from the table: "auth.refresh_token_types" */
  authRefreshTokenTypesAggregate: AuthRefreshTokenTypes_Aggregate;
  /** fetch data from the table: "auth.refresh_tokens" */
  authRefreshTokens: Array<AuthRefreshTokens>;
  /** fetch aggregated fields from the table: "auth.refresh_tokens" */
  authRefreshTokensAggregate: AuthRefreshTokens_Aggregate;
  /** fetch data from the table: "auth.roles" using primary key columns */
  authRole?: Maybe<AuthRoles>;
  /** fetch data from the table: "auth.roles" */
  authRoles: Array<AuthRoles>;
  /** fetch aggregated fields from the table: "auth.roles" */
  authRolesAggregate: AuthRoles_Aggregate;
  /** fetch data from the table: "auth.user_providers" using primary key columns */
  authUserProvider?: Maybe<AuthUserProviders>;
  /** fetch data from the table: "auth.user_providers" */
  authUserProviders: Array<AuthUserProviders>;
  /** fetch aggregated fields from the table: "auth.user_providers" */
  authUserProvidersAggregate: AuthUserProviders_Aggregate;
  /** fetch data from the table: "auth.user_roles" using primary key columns */
  authUserRole?: Maybe<AuthUserRoles>;
  /** fetch data from the table: "auth.user_roles" */
  authUserRoles: Array<AuthUserRoles>;
  /** fetch aggregated fields from the table: "auth.user_roles" */
  authUserRolesAggregate: AuthUserRoles_Aggregate;
  /** fetch data from the table: "auth.user_security_keys" using primary key columns */
  authUserSecurityKey?: Maybe<AuthUserSecurityKeys>;
  /** fetch data from the table: "auth.user_security_keys" */
  authUserSecurityKeys: Array<AuthUserSecurityKeys>;
  /** fetch aggregated fields from the table: "auth.user_security_keys" */
  authUserSecurityKeysAggregate: AuthUserSecurityKeys_Aggregate;
  /** fetch data from the table: "blog_comment_helpful" */
  blog_comment_helpful: Array<Blog_Comment_Helpful>;
  /** fetch aggregated fields from the table: "blog_comment_helpful" */
  blog_comment_helpful_aggregate: Blog_Comment_Helpful_Aggregate;
  /** fetch data from the table: "blog_comment_helpful" using primary key columns */
  blog_comment_helpful_by_pk?: Maybe<Blog_Comment_Helpful>;
  /** An array relationship */
  blog_comment_reports: Array<Blog_Comment_Reports>;
  /** An aggregate relationship */
  blog_comment_reports_aggregate: Blog_Comment_Reports_Aggregate;
  /** fetch data from the table: "blog_comment_reports" using primary key columns */
  blog_comment_reports_by_pk?: Maybe<Blog_Comment_Reports>;
  /** An array relationship */
  blog_comments: Array<Blog_Comments>;
  /** An aggregate relationship */
  blog_comments_aggregate: Blog_Comments_Aggregate;
  /** fetch data from the table: "blog_comments" using primary key columns */
  blog_comments_by_pk?: Maybe<Blog_Comments>;
  /** fetch data from the table: "storage.buckets" using primary key columns */
  bucket?: Maybe<Buckets>;
  /** fetch data from the table: "storage.buckets" */
  buckets: Array<Buckets>;
  /** fetch aggregated fields from the table: "storage.buckets" */
  bucketsAggregate: Buckets_Aggregate;
  /** An array relationship */
  comment_likes: Array<Comment_Likes>;
  /** An aggregate relationship */
  comment_likes_aggregate: Comment_Likes_Aggregate;
  /** fetch data from the table: "comment_likes" using primary key columns */
  comment_likes_by_pk?: Maybe<Comment_Likes>;
  /** An array relationship */
  contribution_bookmarks: Array<Contribution_Bookmarks>;
  /** An aggregate relationship */
  contribution_bookmarks_aggregate: Contribution_Bookmarks_Aggregate;
  /** fetch data from the table: "contribution_bookmarks" using primary key columns */
  contribution_bookmarks_by_pk?: Maybe<Contribution_Bookmarks>;
  /** An array relationship */
  contribution_comments: Array<Contribution_Comments>;
  /** An aggregate relationship */
  contribution_comments_aggregate: Contribution_Comments_Aggregate;
  /** fetch data from the table: "contribution_comments" using primary key columns */
  contribution_comments_by_pk?: Maybe<Contribution_Comments>;
  /** An array relationship */
  contribution_likes: Array<Contribution_Likes>;
  /** An aggregate relationship */
  contribution_likes_aggregate: Contribution_Likes_Aggregate;
  /** fetch data from the table: "contribution_likes" using primary key columns */
  contribution_likes_by_pk?: Maybe<Contribution_Likes>;
  /** An array relationship */
  contribution_reports: Array<Contribution_Reports>;
  /** An aggregate relationship */
  contribution_reports_aggregate: Contribution_Reports_Aggregate;
  /** fetch data from the table: "contribution_reports" using primary key columns */
  contribution_reports_by_pk?: Maybe<Contribution_Reports>;
  /** fetch data from the table: "contribution_types" */
  contribution_types: Array<Contribution_Types>;
  /** fetch aggregated fields from the table: "contribution_types" */
  contribution_types_aggregate: Contribution_Types_Aggregate;
  /** fetch data from the table: "contribution_types" using primary key columns */
  contribution_types_by_pk?: Maybe<Contribution_Types>;
  /** An array relationship */
  contributions: Array<Contributions>;
  /** An aggregate relationship */
  contributions_aggregate: Contributions_Aggregate;
  /** fetch data from the table: "contributions" using primary key columns */
  contributions_by_pk?: Maybe<Contributions>;
  /** fetch data from the table: "storage.files" using primary key columns */
  file?: Maybe<Files>;
  /** An array relationship */
  files: Array<Files>;
  /** fetch aggregated fields from the table: "storage.files" */
  filesAggregate: Files_Aggregate;
  /** fetch data from the table: "messages" */
  messages: Array<Messages>;
  /** fetch aggregated fields from the table: "messages" */
  messages_aggregate: Messages_Aggregate;
  /** fetch data from the table: "messages" using primary key columns */
  messages_by_pk?: Maybe<Messages>;
  /** An array relationship */
  post_bookmarks: Array<Post_Bookmarks>;
  /** An aggregate relationship */
  post_bookmarks_aggregate: Post_Bookmarks_Aggregate;
  /** fetch data from the table: "post_bookmarks" using primary key columns */
  post_bookmarks_by_pk?: Maybe<Post_Bookmarks>;
  /** An array relationship */
  post_comments: Array<Post_Comments>;
  /** An aggregate relationship */
  post_comments_aggregate: Post_Comments_Aggregate;
  /** fetch data from the table: "post_comments" using primary key columns */
  post_comments_by_pk?: Maybe<Post_Comments>;
  /** An array relationship */
  post_likes: Array<Post_Likes>;
  /** An aggregate relationship */
  post_likes_aggregate: Post_Likes_Aggregate;
  /** fetch data from the table: "post_likes" using primary key columns */
  post_likes_by_pk?: Maybe<Post_Likes>;
  /** An array relationship */
  post_reports: Array<Post_Reports>;
  /** An aggregate relationship */
  post_reports_aggregate: Post_Reports_Aggregate;
  /** fetch data from the table: "post_reports" using primary key columns */
  post_reports_by_pk?: Maybe<Post_Reports>;
  /** An array relationship */
  posts: Array<Posts>;
  /** An aggregate relationship */
  posts_aggregate: Posts_Aggregate;
  /** fetch data from the table: "posts" using primary key columns */
  posts_by_pk?: Maybe<Posts>;
  /** fetch data from the table: "auth.users" using primary key columns */
  user?: Maybe<Users>;
  /** An array relationship */
  user_blocks: Array<User_Blocks>;
  /** An aggregate relationship */
  user_blocks_aggregate: User_Blocks_Aggregate;
  /** fetch data from the table: "user_blocks" using primary key columns */
  user_blocks_by_pk?: Maybe<User_Blocks>;
  /** An array relationship */
  user_preferences: Array<User_Preferences>;
  /** An aggregate relationship */
  user_preferences_aggregate: User_Preferences_Aggregate;
  /** fetch data from the table: "user_preferences" using primary key columns */
  user_preferences_by_pk?: Maybe<User_Preferences>;
  /** An array relationship */
  user_profiles: Array<User_Profiles>;
  /** An aggregate relationship */
  user_profiles_aggregate: User_Profiles_Aggregate;
  /** fetch data from the table: "user_profiles" using primary key columns */
  user_profiles_by_pk?: Maybe<User_Profiles>;
  /** fetch data from the table: "auth.users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "auth.users" */
  usersAggregate: Users_Aggregate;
  /** fetch data from the table: "storage.virus" using primary key columns */
  virus?: Maybe<Virus>;
  /** fetch data from the table: "storage.virus" */
  viruses: Array<Virus>;
  /** fetch aggregated fields from the table: "storage.virus" */
  virusesAggregate: Virus_Aggregate;
};


export type Query_RootAuthProviderArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootAuthProviderRequestArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootAuthProviderRequestsArgs = {
  distinct_on?: InputMaybe<Array<AuthProviderRequests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthProviderRequests_Order_By>>;
  where?: InputMaybe<AuthProviderRequests_Bool_Exp>;
};


export type Query_RootAuthProviderRequestsAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthProviderRequests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthProviderRequests_Order_By>>;
  where?: InputMaybe<AuthProviderRequests_Bool_Exp>;
};


export type Query_RootAuthProvidersArgs = {
  distinct_on?: InputMaybe<Array<AuthProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthProviders_Order_By>>;
  where?: InputMaybe<AuthProviders_Bool_Exp>;
};


export type Query_RootAuthProvidersAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthProviders_Order_By>>;
  where?: InputMaybe<AuthProviders_Bool_Exp>;
};


export type Query_RootAuthRefreshTokenArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootAuthRefreshTokenTypeArgs = {
  value: Scalars['String']['input'];
};


export type Query_RootAuthRefreshTokenTypesArgs = {
  distinct_on?: InputMaybe<Array<AuthRefreshTokenTypes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthRefreshTokenTypes_Order_By>>;
  where?: InputMaybe<AuthRefreshTokenTypes_Bool_Exp>;
};


export type Query_RootAuthRefreshTokenTypesAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthRefreshTokenTypes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthRefreshTokenTypes_Order_By>>;
  where?: InputMaybe<AuthRefreshTokenTypes_Bool_Exp>;
};


export type Query_RootAuthRefreshTokensArgs = {
  distinct_on?: InputMaybe<Array<AuthRefreshTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthRefreshTokens_Order_By>>;
  where?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
};


export type Query_RootAuthRefreshTokensAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthRefreshTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthRefreshTokens_Order_By>>;
  where?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
};


export type Query_RootAuthRoleArgs = {
  role: Scalars['String']['input'];
};


export type Query_RootAuthRolesArgs = {
  distinct_on?: InputMaybe<Array<AuthRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthRoles_Order_By>>;
  where?: InputMaybe<AuthRoles_Bool_Exp>;
};


export type Query_RootAuthRolesAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthRoles_Order_By>>;
  where?: InputMaybe<AuthRoles_Bool_Exp>;
};


export type Query_RootAuthUserProviderArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootAuthUserProvidersArgs = {
  distinct_on?: InputMaybe<Array<AuthUserProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthUserProviders_Order_By>>;
  where?: InputMaybe<AuthUserProviders_Bool_Exp>;
};


export type Query_RootAuthUserProvidersAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthUserProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthUserProviders_Order_By>>;
  where?: InputMaybe<AuthUserProviders_Bool_Exp>;
};


export type Query_RootAuthUserRoleArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootAuthUserRolesArgs = {
  distinct_on?: InputMaybe<Array<AuthUserRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthUserRoles_Order_By>>;
  where?: InputMaybe<AuthUserRoles_Bool_Exp>;
};


export type Query_RootAuthUserRolesAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthUserRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthUserRoles_Order_By>>;
  where?: InputMaybe<AuthUserRoles_Bool_Exp>;
};


export type Query_RootAuthUserSecurityKeyArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootAuthUserSecurityKeysArgs = {
  distinct_on?: InputMaybe<Array<AuthUserSecurityKeys_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthUserSecurityKeys_Order_By>>;
  where?: InputMaybe<AuthUserSecurityKeys_Bool_Exp>;
};


export type Query_RootAuthUserSecurityKeysAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthUserSecurityKeys_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthUserSecurityKeys_Order_By>>;
  where?: InputMaybe<AuthUserSecurityKeys_Bool_Exp>;
};


export type Query_RootBlog_Comment_HelpfulArgs = {
  distinct_on?: InputMaybe<Array<Blog_Comment_Helpful_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Blog_Comment_Helpful_Order_By>>;
  where?: InputMaybe<Blog_Comment_Helpful_Bool_Exp>;
};


export type Query_RootBlog_Comment_Helpful_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Blog_Comment_Helpful_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Blog_Comment_Helpful_Order_By>>;
  where?: InputMaybe<Blog_Comment_Helpful_Bool_Exp>;
};


export type Query_RootBlog_Comment_Helpful_By_PkArgs = {
  comment_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};


export type Query_RootBlog_Comment_ReportsArgs = {
  distinct_on?: InputMaybe<Array<Blog_Comment_Reports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Blog_Comment_Reports_Order_By>>;
  where?: InputMaybe<Blog_Comment_Reports_Bool_Exp>;
};


export type Query_RootBlog_Comment_Reports_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Blog_Comment_Reports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Blog_Comment_Reports_Order_By>>;
  where?: InputMaybe<Blog_Comment_Reports_Bool_Exp>;
};


export type Query_RootBlog_Comment_Reports_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootBlog_CommentsArgs = {
  distinct_on?: InputMaybe<Array<Blog_Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Blog_Comments_Order_By>>;
  where?: InputMaybe<Blog_Comments_Bool_Exp>;
};


export type Query_RootBlog_Comments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Blog_Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Blog_Comments_Order_By>>;
  where?: InputMaybe<Blog_Comments_Bool_Exp>;
};


export type Query_RootBlog_Comments_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootBucketArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootBucketsArgs = {
  distinct_on?: InputMaybe<Array<Buckets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Buckets_Order_By>>;
  where?: InputMaybe<Buckets_Bool_Exp>;
};


export type Query_RootBucketsAggregateArgs = {
  distinct_on?: InputMaybe<Array<Buckets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Buckets_Order_By>>;
  where?: InputMaybe<Buckets_Bool_Exp>;
};


export type Query_RootComment_LikesArgs = {
  distinct_on?: InputMaybe<Array<Comment_Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Comment_Likes_Order_By>>;
  where?: InputMaybe<Comment_Likes_Bool_Exp>;
};


export type Query_RootComment_Likes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Comment_Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Comment_Likes_Order_By>>;
  where?: InputMaybe<Comment_Likes_Bool_Exp>;
};


export type Query_RootComment_Likes_By_PkArgs = {
  comment_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};


export type Query_RootContribution_BookmarksArgs = {
  distinct_on?: InputMaybe<Array<Contribution_Bookmarks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contribution_Bookmarks_Order_By>>;
  where?: InputMaybe<Contribution_Bookmarks_Bool_Exp>;
};


export type Query_RootContribution_Bookmarks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contribution_Bookmarks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contribution_Bookmarks_Order_By>>;
  where?: InputMaybe<Contribution_Bookmarks_Bool_Exp>;
};


export type Query_RootContribution_Bookmarks_By_PkArgs = {
  contribution_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};


export type Query_RootContribution_CommentsArgs = {
  distinct_on?: InputMaybe<Array<Contribution_Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contribution_Comments_Order_By>>;
  where?: InputMaybe<Contribution_Comments_Bool_Exp>;
};


export type Query_RootContribution_Comments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contribution_Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contribution_Comments_Order_By>>;
  where?: InputMaybe<Contribution_Comments_Bool_Exp>;
};


export type Query_RootContribution_Comments_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootContribution_LikesArgs = {
  distinct_on?: InputMaybe<Array<Contribution_Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contribution_Likes_Order_By>>;
  where?: InputMaybe<Contribution_Likes_Bool_Exp>;
};


export type Query_RootContribution_Likes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contribution_Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contribution_Likes_Order_By>>;
  where?: InputMaybe<Contribution_Likes_Bool_Exp>;
};


export type Query_RootContribution_Likes_By_PkArgs = {
  contribution_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};


export type Query_RootContribution_ReportsArgs = {
  distinct_on?: InputMaybe<Array<Contribution_Reports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contribution_Reports_Order_By>>;
  where?: InputMaybe<Contribution_Reports_Bool_Exp>;
};


export type Query_RootContribution_Reports_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contribution_Reports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contribution_Reports_Order_By>>;
  where?: InputMaybe<Contribution_Reports_Bool_Exp>;
};


export type Query_RootContribution_Reports_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootContribution_TypesArgs = {
  distinct_on?: InputMaybe<Array<Contribution_Types_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contribution_Types_Order_By>>;
  where?: InputMaybe<Contribution_Types_Bool_Exp>;
};


export type Query_RootContribution_Types_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contribution_Types_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contribution_Types_Order_By>>;
  where?: InputMaybe<Contribution_Types_Bool_Exp>;
};


export type Query_RootContribution_Types_By_PkArgs = {
  type: Scalars['String']['input'];
};


export type Query_RootContributionsArgs = {
  distinct_on?: InputMaybe<Array<Contributions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contributions_Order_By>>;
  where?: InputMaybe<Contributions_Bool_Exp>;
};


export type Query_RootContributions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contributions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contributions_Order_By>>;
  where?: InputMaybe<Contributions_Bool_Exp>;
};


export type Query_RootContributions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootFileArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootFilesArgs = {
  distinct_on?: InputMaybe<Array<Files_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Files_Order_By>>;
  where?: InputMaybe<Files_Bool_Exp>;
};


export type Query_RootFilesAggregateArgs = {
  distinct_on?: InputMaybe<Array<Files_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Files_Order_By>>;
  where?: InputMaybe<Files_Bool_Exp>;
};


export type Query_RootMessagesArgs = {
  distinct_on?: InputMaybe<Array<Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Messages_Order_By>>;
  where?: InputMaybe<Messages_Bool_Exp>;
};


export type Query_RootMessages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Messages_Order_By>>;
  where?: InputMaybe<Messages_Bool_Exp>;
};


export type Query_RootMessages_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootPost_BookmarksArgs = {
  distinct_on?: InputMaybe<Array<Post_Bookmarks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Post_Bookmarks_Order_By>>;
  where?: InputMaybe<Post_Bookmarks_Bool_Exp>;
};


export type Query_RootPost_Bookmarks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Post_Bookmarks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Post_Bookmarks_Order_By>>;
  where?: InputMaybe<Post_Bookmarks_Bool_Exp>;
};


export type Query_RootPost_Bookmarks_By_PkArgs = {
  post_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};


export type Query_RootPost_CommentsArgs = {
  distinct_on?: InputMaybe<Array<Post_Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Post_Comments_Order_By>>;
  where?: InputMaybe<Post_Comments_Bool_Exp>;
};


export type Query_RootPost_Comments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Post_Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Post_Comments_Order_By>>;
  where?: InputMaybe<Post_Comments_Bool_Exp>;
};


export type Query_RootPost_Comments_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootPost_LikesArgs = {
  distinct_on?: InputMaybe<Array<Post_Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Post_Likes_Order_By>>;
  where?: InputMaybe<Post_Likes_Bool_Exp>;
};


export type Query_RootPost_Likes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Post_Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Post_Likes_Order_By>>;
  where?: InputMaybe<Post_Likes_Bool_Exp>;
};


export type Query_RootPost_Likes_By_PkArgs = {
  post_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};


export type Query_RootPost_ReportsArgs = {
  distinct_on?: InputMaybe<Array<Post_Reports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Post_Reports_Order_By>>;
  where?: InputMaybe<Post_Reports_Bool_Exp>;
};


export type Query_RootPost_Reports_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Post_Reports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Post_Reports_Order_By>>;
  where?: InputMaybe<Post_Reports_Bool_Exp>;
};


export type Query_RootPost_Reports_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootPostsArgs = {
  distinct_on?: InputMaybe<Array<Posts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Posts_Order_By>>;
  where?: InputMaybe<Posts_Bool_Exp>;
};


export type Query_RootPosts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Posts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Posts_Order_By>>;
  where?: InputMaybe<Posts_Bool_Exp>;
};


export type Query_RootPosts_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootUserArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootUser_BlocksArgs = {
  distinct_on?: InputMaybe<Array<User_Blocks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Blocks_Order_By>>;
  where?: InputMaybe<User_Blocks_Bool_Exp>;
};


export type Query_RootUser_Blocks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Blocks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Blocks_Order_By>>;
  where?: InputMaybe<User_Blocks_Bool_Exp>;
};


export type Query_RootUser_Blocks_By_PkArgs = {
  blocked_id: Scalars['uuid']['input'];
  blocker_id: Scalars['uuid']['input'];
};


export type Query_RootUser_PreferencesArgs = {
  distinct_on?: InputMaybe<Array<User_Preferences_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Preferences_Order_By>>;
  where?: InputMaybe<User_Preferences_Bool_Exp>;
};


export type Query_RootUser_Preferences_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Preferences_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Preferences_Order_By>>;
  where?: InputMaybe<User_Preferences_Bool_Exp>;
};


export type Query_RootUser_Preferences_By_PkArgs = {
  user_id: Scalars['uuid']['input'];
};


export type Query_RootUser_ProfilesArgs = {
  distinct_on?: InputMaybe<Array<User_Profiles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Profiles_Order_By>>;
  where?: InputMaybe<User_Profiles_Bool_Exp>;
};


export type Query_RootUser_Profiles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Profiles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Profiles_Order_By>>;
  where?: InputMaybe<User_Profiles_Bool_Exp>;
};


export type Query_RootUser_Profiles_By_PkArgs = {
  user_id: Scalars['uuid']['input'];
};


export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsersAggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootVirusArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootVirusesArgs = {
  distinct_on?: InputMaybe<Array<Virus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Virus_Order_By>>;
  where?: InputMaybe<Virus_Bool_Exp>;
};


export type Query_RootVirusesAggregateArgs = {
  distinct_on?: InputMaybe<Array<Virus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Virus_Order_By>>;
  where?: InputMaybe<Virus_Bool_Exp>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "auth.providers" using primary key columns */
  authProvider?: Maybe<AuthProviders>;
  /** fetch data from the table: "auth.provider_requests" using primary key columns */
  authProviderRequest?: Maybe<AuthProviderRequests>;
  /** fetch data from the table: "auth.provider_requests" */
  authProviderRequests: Array<AuthProviderRequests>;
  /** fetch aggregated fields from the table: "auth.provider_requests" */
  authProviderRequestsAggregate: AuthProviderRequests_Aggregate;
  /** fetch data from the table in a streaming manner: "auth.provider_requests" */
  authProviderRequests_stream: Array<AuthProviderRequests>;
  /** fetch data from the table: "auth.providers" */
  authProviders: Array<AuthProviders>;
  /** fetch aggregated fields from the table: "auth.providers" */
  authProvidersAggregate: AuthProviders_Aggregate;
  /** fetch data from the table in a streaming manner: "auth.providers" */
  authProviders_stream: Array<AuthProviders>;
  /** fetch data from the table: "auth.refresh_tokens" using primary key columns */
  authRefreshToken?: Maybe<AuthRefreshTokens>;
  /** fetch data from the table: "auth.refresh_token_types" using primary key columns */
  authRefreshTokenType?: Maybe<AuthRefreshTokenTypes>;
  /** fetch data from the table: "auth.refresh_token_types" */
  authRefreshTokenTypes: Array<AuthRefreshTokenTypes>;
  /** fetch aggregated fields from the table: "auth.refresh_token_types" */
  authRefreshTokenTypesAggregate: AuthRefreshTokenTypes_Aggregate;
  /** fetch data from the table in a streaming manner: "auth.refresh_token_types" */
  authRefreshTokenTypes_stream: Array<AuthRefreshTokenTypes>;
  /** fetch data from the table: "auth.refresh_tokens" */
  authRefreshTokens: Array<AuthRefreshTokens>;
  /** fetch aggregated fields from the table: "auth.refresh_tokens" */
  authRefreshTokensAggregate: AuthRefreshTokens_Aggregate;
  /** fetch data from the table in a streaming manner: "auth.refresh_tokens" */
  authRefreshTokens_stream: Array<AuthRefreshTokens>;
  /** fetch data from the table: "auth.roles" using primary key columns */
  authRole?: Maybe<AuthRoles>;
  /** fetch data from the table: "auth.roles" */
  authRoles: Array<AuthRoles>;
  /** fetch aggregated fields from the table: "auth.roles" */
  authRolesAggregate: AuthRoles_Aggregate;
  /** fetch data from the table in a streaming manner: "auth.roles" */
  authRoles_stream: Array<AuthRoles>;
  /** fetch data from the table: "auth.user_providers" using primary key columns */
  authUserProvider?: Maybe<AuthUserProviders>;
  /** fetch data from the table: "auth.user_providers" */
  authUserProviders: Array<AuthUserProviders>;
  /** fetch aggregated fields from the table: "auth.user_providers" */
  authUserProvidersAggregate: AuthUserProviders_Aggregate;
  /** fetch data from the table in a streaming manner: "auth.user_providers" */
  authUserProviders_stream: Array<AuthUserProviders>;
  /** fetch data from the table: "auth.user_roles" using primary key columns */
  authUserRole?: Maybe<AuthUserRoles>;
  /** fetch data from the table: "auth.user_roles" */
  authUserRoles: Array<AuthUserRoles>;
  /** fetch aggregated fields from the table: "auth.user_roles" */
  authUserRolesAggregate: AuthUserRoles_Aggregate;
  /** fetch data from the table in a streaming manner: "auth.user_roles" */
  authUserRoles_stream: Array<AuthUserRoles>;
  /** fetch data from the table: "auth.user_security_keys" using primary key columns */
  authUserSecurityKey?: Maybe<AuthUserSecurityKeys>;
  /** fetch data from the table: "auth.user_security_keys" */
  authUserSecurityKeys: Array<AuthUserSecurityKeys>;
  /** fetch aggregated fields from the table: "auth.user_security_keys" */
  authUserSecurityKeysAggregate: AuthUserSecurityKeys_Aggregate;
  /** fetch data from the table in a streaming manner: "auth.user_security_keys" */
  authUserSecurityKeys_stream: Array<AuthUserSecurityKeys>;
  /** fetch data from the table: "blog_comment_helpful" */
  blog_comment_helpful: Array<Blog_Comment_Helpful>;
  /** fetch aggregated fields from the table: "blog_comment_helpful" */
  blog_comment_helpful_aggregate: Blog_Comment_Helpful_Aggregate;
  /** fetch data from the table: "blog_comment_helpful" using primary key columns */
  blog_comment_helpful_by_pk?: Maybe<Blog_Comment_Helpful>;
  /** fetch data from the table in a streaming manner: "blog_comment_helpful" */
  blog_comment_helpful_stream: Array<Blog_Comment_Helpful>;
  /** An array relationship */
  blog_comment_reports: Array<Blog_Comment_Reports>;
  /** An aggregate relationship */
  blog_comment_reports_aggregate: Blog_Comment_Reports_Aggregate;
  /** fetch data from the table: "blog_comment_reports" using primary key columns */
  blog_comment_reports_by_pk?: Maybe<Blog_Comment_Reports>;
  /** fetch data from the table in a streaming manner: "blog_comment_reports" */
  blog_comment_reports_stream: Array<Blog_Comment_Reports>;
  /** An array relationship */
  blog_comments: Array<Blog_Comments>;
  /** An aggregate relationship */
  blog_comments_aggregate: Blog_Comments_Aggregate;
  /** fetch data from the table: "blog_comments" using primary key columns */
  blog_comments_by_pk?: Maybe<Blog_Comments>;
  /** fetch data from the table in a streaming manner: "blog_comments" */
  blog_comments_stream: Array<Blog_Comments>;
  /** fetch data from the table: "storage.buckets" using primary key columns */
  bucket?: Maybe<Buckets>;
  /** fetch data from the table: "storage.buckets" */
  buckets: Array<Buckets>;
  /** fetch aggregated fields from the table: "storage.buckets" */
  bucketsAggregate: Buckets_Aggregate;
  /** fetch data from the table in a streaming manner: "storage.buckets" */
  buckets_stream: Array<Buckets>;
  /** An array relationship */
  comment_likes: Array<Comment_Likes>;
  /** An aggregate relationship */
  comment_likes_aggregate: Comment_Likes_Aggregate;
  /** fetch data from the table: "comment_likes" using primary key columns */
  comment_likes_by_pk?: Maybe<Comment_Likes>;
  /** fetch data from the table in a streaming manner: "comment_likes" */
  comment_likes_stream: Array<Comment_Likes>;
  /** An array relationship */
  contribution_bookmarks: Array<Contribution_Bookmarks>;
  /** An aggregate relationship */
  contribution_bookmarks_aggregate: Contribution_Bookmarks_Aggregate;
  /** fetch data from the table: "contribution_bookmarks" using primary key columns */
  contribution_bookmarks_by_pk?: Maybe<Contribution_Bookmarks>;
  /** fetch data from the table in a streaming manner: "contribution_bookmarks" */
  contribution_bookmarks_stream: Array<Contribution_Bookmarks>;
  /** An array relationship */
  contribution_comments: Array<Contribution_Comments>;
  /** An aggregate relationship */
  contribution_comments_aggregate: Contribution_Comments_Aggregate;
  /** fetch data from the table: "contribution_comments" using primary key columns */
  contribution_comments_by_pk?: Maybe<Contribution_Comments>;
  /** fetch data from the table in a streaming manner: "contribution_comments" */
  contribution_comments_stream: Array<Contribution_Comments>;
  /** An array relationship */
  contribution_likes: Array<Contribution_Likes>;
  /** An aggregate relationship */
  contribution_likes_aggregate: Contribution_Likes_Aggregate;
  /** fetch data from the table: "contribution_likes" using primary key columns */
  contribution_likes_by_pk?: Maybe<Contribution_Likes>;
  /** fetch data from the table in a streaming manner: "contribution_likes" */
  contribution_likes_stream: Array<Contribution_Likes>;
  /** An array relationship */
  contribution_reports: Array<Contribution_Reports>;
  /** An aggregate relationship */
  contribution_reports_aggregate: Contribution_Reports_Aggregate;
  /** fetch data from the table: "contribution_reports" using primary key columns */
  contribution_reports_by_pk?: Maybe<Contribution_Reports>;
  /** fetch data from the table in a streaming manner: "contribution_reports" */
  contribution_reports_stream: Array<Contribution_Reports>;
  /** fetch data from the table: "contribution_types" */
  contribution_types: Array<Contribution_Types>;
  /** fetch aggregated fields from the table: "contribution_types" */
  contribution_types_aggregate: Contribution_Types_Aggregate;
  /** fetch data from the table: "contribution_types" using primary key columns */
  contribution_types_by_pk?: Maybe<Contribution_Types>;
  /** fetch data from the table in a streaming manner: "contribution_types" */
  contribution_types_stream: Array<Contribution_Types>;
  /** An array relationship */
  contributions: Array<Contributions>;
  /** An aggregate relationship */
  contributions_aggregate: Contributions_Aggregate;
  /** fetch data from the table: "contributions" using primary key columns */
  contributions_by_pk?: Maybe<Contributions>;
  /** fetch data from the table in a streaming manner: "contributions" */
  contributions_stream: Array<Contributions>;
  /** fetch data from the table: "storage.files" using primary key columns */
  file?: Maybe<Files>;
  /** An array relationship */
  files: Array<Files>;
  /** fetch aggregated fields from the table: "storage.files" */
  filesAggregate: Files_Aggregate;
  /** fetch data from the table in a streaming manner: "storage.files" */
  files_stream: Array<Files>;
  /** fetch data from the table: "messages" */
  messages: Array<Messages>;
  /** fetch aggregated fields from the table: "messages" */
  messages_aggregate: Messages_Aggregate;
  /** fetch data from the table: "messages" using primary key columns */
  messages_by_pk?: Maybe<Messages>;
  /** fetch data from the table in a streaming manner: "messages" */
  messages_stream: Array<Messages>;
  /** An array relationship */
  post_bookmarks: Array<Post_Bookmarks>;
  /** An aggregate relationship */
  post_bookmarks_aggregate: Post_Bookmarks_Aggregate;
  /** fetch data from the table: "post_bookmarks" using primary key columns */
  post_bookmarks_by_pk?: Maybe<Post_Bookmarks>;
  /** fetch data from the table in a streaming manner: "post_bookmarks" */
  post_bookmarks_stream: Array<Post_Bookmarks>;
  /** An array relationship */
  post_comments: Array<Post_Comments>;
  /** An aggregate relationship */
  post_comments_aggregate: Post_Comments_Aggregate;
  /** fetch data from the table: "post_comments" using primary key columns */
  post_comments_by_pk?: Maybe<Post_Comments>;
  /** fetch data from the table in a streaming manner: "post_comments" */
  post_comments_stream: Array<Post_Comments>;
  /** An array relationship */
  post_likes: Array<Post_Likes>;
  /** An aggregate relationship */
  post_likes_aggregate: Post_Likes_Aggregate;
  /** fetch data from the table: "post_likes" using primary key columns */
  post_likes_by_pk?: Maybe<Post_Likes>;
  /** fetch data from the table in a streaming manner: "post_likes" */
  post_likes_stream: Array<Post_Likes>;
  /** An array relationship */
  post_reports: Array<Post_Reports>;
  /** An aggregate relationship */
  post_reports_aggregate: Post_Reports_Aggregate;
  /** fetch data from the table: "post_reports" using primary key columns */
  post_reports_by_pk?: Maybe<Post_Reports>;
  /** fetch data from the table in a streaming manner: "post_reports" */
  post_reports_stream: Array<Post_Reports>;
  /** An array relationship */
  posts: Array<Posts>;
  /** An aggregate relationship */
  posts_aggregate: Posts_Aggregate;
  /** fetch data from the table: "posts" using primary key columns */
  posts_by_pk?: Maybe<Posts>;
  /** fetch data from the table in a streaming manner: "posts" */
  posts_stream: Array<Posts>;
  /** fetch data from the table: "auth.users" using primary key columns */
  user?: Maybe<Users>;
  /** An array relationship */
  user_blocks: Array<User_Blocks>;
  /** An aggregate relationship */
  user_blocks_aggregate: User_Blocks_Aggregate;
  /** fetch data from the table: "user_blocks" using primary key columns */
  user_blocks_by_pk?: Maybe<User_Blocks>;
  /** fetch data from the table in a streaming manner: "user_blocks" */
  user_blocks_stream: Array<User_Blocks>;
  /** An array relationship */
  user_preferences: Array<User_Preferences>;
  /** An aggregate relationship */
  user_preferences_aggregate: User_Preferences_Aggregate;
  /** fetch data from the table: "user_preferences" using primary key columns */
  user_preferences_by_pk?: Maybe<User_Preferences>;
  /** fetch data from the table in a streaming manner: "user_preferences" */
  user_preferences_stream: Array<User_Preferences>;
  /** An array relationship */
  user_profiles: Array<User_Profiles>;
  /** An aggregate relationship */
  user_profiles_aggregate: User_Profiles_Aggregate;
  /** fetch data from the table: "user_profiles" using primary key columns */
  user_profiles_by_pk?: Maybe<User_Profiles>;
  /** fetch data from the table in a streaming manner: "user_profiles" */
  user_profiles_stream: Array<User_Profiles>;
  /** fetch data from the table: "auth.users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "auth.users" */
  usersAggregate: Users_Aggregate;
  /** fetch data from the table in a streaming manner: "auth.users" */
  users_stream: Array<Users>;
  /** fetch data from the table: "storage.virus" using primary key columns */
  virus?: Maybe<Virus>;
  /** fetch data from the table in a streaming manner: "storage.virus" */
  virus_stream: Array<Virus>;
  /** fetch data from the table: "storage.virus" */
  viruses: Array<Virus>;
  /** fetch aggregated fields from the table: "storage.virus" */
  virusesAggregate: Virus_Aggregate;
};


export type Subscription_RootAuthProviderArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootAuthProviderRequestArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootAuthProviderRequestsArgs = {
  distinct_on?: InputMaybe<Array<AuthProviderRequests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthProviderRequests_Order_By>>;
  where?: InputMaybe<AuthProviderRequests_Bool_Exp>;
};


export type Subscription_RootAuthProviderRequestsAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthProviderRequests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthProviderRequests_Order_By>>;
  where?: InputMaybe<AuthProviderRequests_Bool_Exp>;
};


export type Subscription_RootAuthProviderRequests_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<AuthProviderRequests_Stream_Cursor_Input>>;
  where?: InputMaybe<AuthProviderRequests_Bool_Exp>;
};


export type Subscription_RootAuthProvidersArgs = {
  distinct_on?: InputMaybe<Array<AuthProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthProviders_Order_By>>;
  where?: InputMaybe<AuthProviders_Bool_Exp>;
};


export type Subscription_RootAuthProvidersAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthProviders_Order_By>>;
  where?: InputMaybe<AuthProviders_Bool_Exp>;
};


export type Subscription_RootAuthProviders_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<AuthProviders_Stream_Cursor_Input>>;
  where?: InputMaybe<AuthProviders_Bool_Exp>;
};


export type Subscription_RootAuthRefreshTokenArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootAuthRefreshTokenTypeArgs = {
  value: Scalars['String']['input'];
};


export type Subscription_RootAuthRefreshTokenTypesArgs = {
  distinct_on?: InputMaybe<Array<AuthRefreshTokenTypes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthRefreshTokenTypes_Order_By>>;
  where?: InputMaybe<AuthRefreshTokenTypes_Bool_Exp>;
};


export type Subscription_RootAuthRefreshTokenTypesAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthRefreshTokenTypes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthRefreshTokenTypes_Order_By>>;
  where?: InputMaybe<AuthRefreshTokenTypes_Bool_Exp>;
};


export type Subscription_RootAuthRefreshTokenTypes_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<AuthRefreshTokenTypes_Stream_Cursor_Input>>;
  where?: InputMaybe<AuthRefreshTokenTypes_Bool_Exp>;
};


export type Subscription_RootAuthRefreshTokensArgs = {
  distinct_on?: InputMaybe<Array<AuthRefreshTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthRefreshTokens_Order_By>>;
  where?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
};


export type Subscription_RootAuthRefreshTokensAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthRefreshTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthRefreshTokens_Order_By>>;
  where?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
};


export type Subscription_RootAuthRefreshTokens_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<AuthRefreshTokens_Stream_Cursor_Input>>;
  where?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
};


export type Subscription_RootAuthRoleArgs = {
  role: Scalars['String']['input'];
};


export type Subscription_RootAuthRolesArgs = {
  distinct_on?: InputMaybe<Array<AuthRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthRoles_Order_By>>;
  where?: InputMaybe<AuthRoles_Bool_Exp>;
};


export type Subscription_RootAuthRolesAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthRoles_Order_By>>;
  where?: InputMaybe<AuthRoles_Bool_Exp>;
};


export type Subscription_RootAuthRoles_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<AuthRoles_Stream_Cursor_Input>>;
  where?: InputMaybe<AuthRoles_Bool_Exp>;
};


export type Subscription_RootAuthUserProviderArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootAuthUserProvidersArgs = {
  distinct_on?: InputMaybe<Array<AuthUserProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthUserProviders_Order_By>>;
  where?: InputMaybe<AuthUserProviders_Bool_Exp>;
};


export type Subscription_RootAuthUserProvidersAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthUserProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthUserProviders_Order_By>>;
  where?: InputMaybe<AuthUserProviders_Bool_Exp>;
};


export type Subscription_RootAuthUserProviders_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<AuthUserProviders_Stream_Cursor_Input>>;
  where?: InputMaybe<AuthUserProviders_Bool_Exp>;
};


export type Subscription_RootAuthUserRoleArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootAuthUserRolesArgs = {
  distinct_on?: InputMaybe<Array<AuthUserRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthUserRoles_Order_By>>;
  where?: InputMaybe<AuthUserRoles_Bool_Exp>;
};


export type Subscription_RootAuthUserRolesAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthUserRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthUserRoles_Order_By>>;
  where?: InputMaybe<AuthUserRoles_Bool_Exp>;
};


export type Subscription_RootAuthUserRoles_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<AuthUserRoles_Stream_Cursor_Input>>;
  where?: InputMaybe<AuthUserRoles_Bool_Exp>;
};


export type Subscription_RootAuthUserSecurityKeyArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootAuthUserSecurityKeysArgs = {
  distinct_on?: InputMaybe<Array<AuthUserSecurityKeys_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthUserSecurityKeys_Order_By>>;
  where?: InputMaybe<AuthUserSecurityKeys_Bool_Exp>;
};


export type Subscription_RootAuthUserSecurityKeysAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthUserSecurityKeys_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthUserSecurityKeys_Order_By>>;
  where?: InputMaybe<AuthUserSecurityKeys_Bool_Exp>;
};


export type Subscription_RootAuthUserSecurityKeys_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<AuthUserSecurityKeys_Stream_Cursor_Input>>;
  where?: InputMaybe<AuthUserSecurityKeys_Bool_Exp>;
};


export type Subscription_RootBlog_Comment_HelpfulArgs = {
  distinct_on?: InputMaybe<Array<Blog_Comment_Helpful_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Blog_Comment_Helpful_Order_By>>;
  where?: InputMaybe<Blog_Comment_Helpful_Bool_Exp>;
};


export type Subscription_RootBlog_Comment_Helpful_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Blog_Comment_Helpful_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Blog_Comment_Helpful_Order_By>>;
  where?: InputMaybe<Blog_Comment_Helpful_Bool_Exp>;
};


export type Subscription_RootBlog_Comment_Helpful_By_PkArgs = {
  comment_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};


export type Subscription_RootBlog_Comment_Helpful_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Blog_Comment_Helpful_Stream_Cursor_Input>>;
  where?: InputMaybe<Blog_Comment_Helpful_Bool_Exp>;
};


export type Subscription_RootBlog_Comment_ReportsArgs = {
  distinct_on?: InputMaybe<Array<Blog_Comment_Reports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Blog_Comment_Reports_Order_By>>;
  where?: InputMaybe<Blog_Comment_Reports_Bool_Exp>;
};


export type Subscription_RootBlog_Comment_Reports_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Blog_Comment_Reports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Blog_Comment_Reports_Order_By>>;
  where?: InputMaybe<Blog_Comment_Reports_Bool_Exp>;
};


export type Subscription_RootBlog_Comment_Reports_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootBlog_Comment_Reports_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Blog_Comment_Reports_Stream_Cursor_Input>>;
  where?: InputMaybe<Blog_Comment_Reports_Bool_Exp>;
};


export type Subscription_RootBlog_CommentsArgs = {
  distinct_on?: InputMaybe<Array<Blog_Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Blog_Comments_Order_By>>;
  where?: InputMaybe<Blog_Comments_Bool_Exp>;
};


export type Subscription_RootBlog_Comments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Blog_Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Blog_Comments_Order_By>>;
  where?: InputMaybe<Blog_Comments_Bool_Exp>;
};


export type Subscription_RootBlog_Comments_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootBlog_Comments_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Blog_Comments_Stream_Cursor_Input>>;
  where?: InputMaybe<Blog_Comments_Bool_Exp>;
};


export type Subscription_RootBucketArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootBucketsArgs = {
  distinct_on?: InputMaybe<Array<Buckets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Buckets_Order_By>>;
  where?: InputMaybe<Buckets_Bool_Exp>;
};


export type Subscription_RootBucketsAggregateArgs = {
  distinct_on?: InputMaybe<Array<Buckets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Buckets_Order_By>>;
  where?: InputMaybe<Buckets_Bool_Exp>;
};


export type Subscription_RootBuckets_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Buckets_Stream_Cursor_Input>>;
  where?: InputMaybe<Buckets_Bool_Exp>;
};


export type Subscription_RootComment_LikesArgs = {
  distinct_on?: InputMaybe<Array<Comment_Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Comment_Likes_Order_By>>;
  where?: InputMaybe<Comment_Likes_Bool_Exp>;
};


export type Subscription_RootComment_Likes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Comment_Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Comment_Likes_Order_By>>;
  where?: InputMaybe<Comment_Likes_Bool_Exp>;
};


export type Subscription_RootComment_Likes_By_PkArgs = {
  comment_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};


export type Subscription_RootComment_Likes_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Comment_Likes_Stream_Cursor_Input>>;
  where?: InputMaybe<Comment_Likes_Bool_Exp>;
};


export type Subscription_RootContribution_BookmarksArgs = {
  distinct_on?: InputMaybe<Array<Contribution_Bookmarks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contribution_Bookmarks_Order_By>>;
  where?: InputMaybe<Contribution_Bookmarks_Bool_Exp>;
};


export type Subscription_RootContribution_Bookmarks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contribution_Bookmarks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contribution_Bookmarks_Order_By>>;
  where?: InputMaybe<Contribution_Bookmarks_Bool_Exp>;
};


export type Subscription_RootContribution_Bookmarks_By_PkArgs = {
  contribution_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};


export type Subscription_RootContribution_Bookmarks_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Contribution_Bookmarks_Stream_Cursor_Input>>;
  where?: InputMaybe<Contribution_Bookmarks_Bool_Exp>;
};


export type Subscription_RootContribution_CommentsArgs = {
  distinct_on?: InputMaybe<Array<Contribution_Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contribution_Comments_Order_By>>;
  where?: InputMaybe<Contribution_Comments_Bool_Exp>;
};


export type Subscription_RootContribution_Comments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contribution_Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contribution_Comments_Order_By>>;
  where?: InputMaybe<Contribution_Comments_Bool_Exp>;
};


export type Subscription_RootContribution_Comments_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootContribution_Comments_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Contribution_Comments_Stream_Cursor_Input>>;
  where?: InputMaybe<Contribution_Comments_Bool_Exp>;
};


export type Subscription_RootContribution_LikesArgs = {
  distinct_on?: InputMaybe<Array<Contribution_Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contribution_Likes_Order_By>>;
  where?: InputMaybe<Contribution_Likes_Bool_Exp>;
};


export type Subscription_RootContribution_Likes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contribution_Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contribution_Likes_Order_By>>;
  where?: InputMaybe<Contribution_Likes_Bool_Exp>;
};


export type Subscription_RootContribution_Likes_By_PkArgs = {
  contribution_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};


export type Subscription_RootContribution_Likes_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Contribution_Likes_Stream_Cursor_Input>>;
  where?: InputMaybe<Contribution_Likes_Bool_Exp>;
};


export type Subscription_RootContribution_ReportsArgs = {
  distinct_on?: InputMaybe<Array<Contribution_Reports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contribution_Reports_Order_By>>;
  where?: InputMaybe<Contribution_Reports_Bool_Exp>;
};


export type Subscription_RootContribution_Reports_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contribution_Reports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contribution_Reports_Order_By>>;
  where?: InputMaybe<Contribution_Reports_Bool_Exp>;
};


export type Subscription_RootContribution_Reports_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootContribution_Reports_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Contribution_Reports_Stream_Cursor_Input>>;
  where?: InputMaybe<Contribution_Reports_Bool_Exp>;
};


export type Subscription_RootContribution_TypesArgs = {
  distinct_on?: InputMaybe<Array<Contribution_Types_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contribution_Types_Order_By>>;
  where?: InputMaybe<Contribution_Types_Bool_Exp>;
};


export type Subscription_RootContribution_Types_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contribution_Types_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contribution_Types_Order_By>>;
  where?: InputMaybe<Contribution_Types_Bool_Exp>;
};


export type Subscription_RootContribution_Types_By_PkArgs = {
  type: Scalars['String']['input'];
};


export type Subscription_RootContribution_Types_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Contribution_Types_Stream_Cursor_Input>>;
  where?: InputMaybe<Contribution_Types_Bool_Exp>;
};


export type Subscription_RootContributionsArgs = {
  distinct_on?: InputMaybe<Array<Contributions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contributions_Order_By>>;
  where?: InputMaybe<Contributions_Bool_Exp>;
};


export type Subscription_RootContributions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contributions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contributions_Order_By>>;
  where?: InputMaybe<Contributions_Bool_Exp>;
};


export type Subscription_RootContributions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootContributions_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Contributions_Stream_Cursor_Input>>;
  where?: InputMaybe<Contributions_Bool_Exp>;
};


export type Subscription_RootFileArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootFilesArgs = {
  distinct_on?: InputMaybe<Array<Files_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Files_Order_By>>;
  where?: InputMaybe<Files_Bool_Exp>;
};


export type Subscription_RootFilesAggregateArgs = {
  distinct_on?: InputMaybe<Array<Files_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Files_Order_By>>;
  where?: InputMaybe<Files_Bool_Exp>;
};


export type Subscription_RootFiles_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Files_Stream_Cursor_Input>>;
  where?: InputMaybe<Files_Bool_Exp>;
};


export type Subscription_RootMessagesArgs = {
  distinct_on?: InputMaybe<Array<Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Messages_Order_By>>;
  where?: InputMaybe<Messages_Bool_Exp>;
};


export type Subscription_RootMessages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Messages_Order_By>>;
  where?: InputMaybe<Messages_Bool_Exp>;
};


export type Subscription_RootMessages_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootMessages_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Messages_Stream_Cursor_Input>>;
  where?: InputMaybe<Messages_Bool_Exp>;
};


export type Subscription_RootPost_BookmarksArgs = {
  distinct_on?: InputMaybe<Array<Post_Bookmarks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Post_Bookmarks_Order_By>>;
  where?: InputMaybe<Post_Bookmarks_Bool_Exp>;
};


export type Subscription_RootPost_Bookmarks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Post_Bookmarks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Post_Bookmarks_Order_By>>;
  where?: InputMaybe<Post_Bookmarks_Bool_Exp>;
};


export type Subscription_RootPost_Bookmarks_By_PkArgs = {
  post_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};


export type Subscription_RootPost_Bookmarks_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Post_Bookmarks_Stream_Cursor_Input>>;
  where?: InputMaybe<Post_Bookmarks_Bool_Exp>;
};


export type Subscription_RootPost_CommentsArgs = {
  distinct_on?: InputMaybe<Array<Post_Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Post_Comments_Order_By>>;
  where?: InputMaybe<Post_Comments_Bool_Exp>;
};


export type Subscription_RootPost_Comments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Post_Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Post_Comments_Order_By>>;
  where?: InputMaybe<Post_Comments_Bool_Exp>;
};


export type Subscription_RootPost_Comments_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootPost_Comments_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Post_Comments_Stream_Cursor_Input>>;
  where?: InputMaybe<Post_Comments_Bool_Exp>;
};


export type Subscription_RootPost_LikesArgs = {
  distinct_on?: InputMaybe<Array<Post_Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Post_Likes_Order_By>>;
  where?: InputMaybe<Post_Likes_Bool_Exp>;
};


export type Subscription_RootPost_Likes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Post_Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Post_Likes_Order_By>>;
  where?: InputMaybe<Post_Likes_Bool_Exp>;
};


export type Subscription_RootPost_Likes_By_PkArgs = {
  post_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};


export type Subscription_RootPost_Likes_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Post_Likes_Stream_Cursor_Input>>;
  where?: InputMaybe<Post_Likes_Bool_Exp>;
};


export type Subscription_RootPost_ReportsArgs = {
  distinct_on?: InputMaybe<Array<Post_Reports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Post_Reports_Order_By>>;
  where?: InputMaybe<Post_Reports_Bool_Exp>;
};


export type Subscription_RootPost_Reports_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Post_Reports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Post_Reports_Order_By>>;
  where?: InputMaybe<Post_Reports_Bool_Exp>;
};


export type Subscription_RootPost_Reports_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootPost_Reports_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Post_Reports_Stream_Cursor_Input>>;
  where?: InputMaybe<Post_Reports_Bool_Exp>;
};


export type Subscription_RootPostsArgs = {
  distinct_on?: InputMaybe<Array<Posts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Posts_Order_By>>;
  where?: InputMaybe<Posts_Bool_Exp>;
};


export type Subscription_RootPosts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Posts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Posts_Order_By>>;
  where?: InputMaybe<Posts_Bool_Exp>;
};


export type Subscription_RootPosts_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootPosts_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Posts_Stream_Cursor_Input>>;
  where?: InputMaybe<Posts_Bool_Exp>;
};


export type Subscription_RootUserArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootUser_BlocksArgs = {
  distinct_on?: InputMaybe<Array<User_Blocks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Blocks_Order_By>>;
  where?: InputMaybe<User_Blocks_Bool_Exp>;
};


export type Subscription_RootUser_Blocks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Blocks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Blocks_Order_By>>;
  where?: InputMaybe<User_Blocks_Bool_Exp>;
};


export type Subscription_RootUser_Blocks_By_PkArgs = {
  blocked_id: Scalars['uuid']['input'];
  blocker_id: Scalars['uuid']['input'];
};


export type Subscription_RootUser_Blocks_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<User_Blocks_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Blocks_Bool_Exp>;
};


export type Subscription_RootUser_PreferencesArgs = {
  distinct_on?: InputMaybe<Array<User_Preferences_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Preferences_Order_By>>;
  where?: InputMaybe<User_Preferences_Bool_Exp>;
};


export type Subscription_RootUser_Preferences_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Preferences_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Preferences_Order_By>>;
  where?: InputMaybe<User_Preferences_Bool_Exp>;
};


export type Subscription_RootUser_Preferences_By_PkArgs = {
  user_id: Scalars['uuid']['input'];
};


export type Subscription_RootUser_Preferences_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<User_Preferences_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Preferences_Bool_Exp>;
};


export type Subscription_RootUser_ProfilesArgs = {
  distinct_on?: InputMaybe<Array<User_Profiles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Profiles_Order_By>>;
  where?: InputMaybe<User_Profiles_Bool_Exp>;
};


export type Subscription_RootUser_Profiles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Profiles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Profiles_Order_By>>;
  where?: InputMaybe<User_Profiles_Bool_Exp>;
};


export type Subscription_RootUser_Profiles_By_PkArgs = {
  user_id: Scalars['uuid']['input'];
};


export type Subscription_RootUser_Profiles_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<User_Profiles_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Profiles_Bool_Exp>;
};


export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsersAggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Users_Stream_Cursor_Input>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootVirusArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootVirus_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Virus_Stream_Cursor_Input>>;
  where?: InputMaybe<Virus_Bool_Exp>;
};


export type Subscription_RootVirusesArgs = {
  distinct_on?: InputMaybe<Array<Virus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Virus_Order_By>>;
  where?: InputMaybe<Virus_Bool_Exp>;
};


export type Subscription_RootVirusesAggregateArgs = {
  distinct_on?: InputMaybe<Array<Virus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Virus_Order_By>>;
  where?: InputMaybe<Virus_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** columns and relationships of "user_blocks" */
export type User_Blocks = {
  __typename?: 'user_blocks';
  /** An object relationship */
  blocked: Users;
  blocked_id: Scalars['uuid']['output'];
  /** An object relationship */
  blocker: Users;
  blocker_id: Scalars['uuid']['output'];
  created_at: Scalars['timestamptz']['output'];
};

/** aggregated selection of "user_blocks" */
export type User_Blocks_Aggregate = {
  __typename?: 'user_blocks_aggregate';
  aggregate?: Maybe<User_Blocks_Aggregate_Fields>;
  nodes: Array<User_Blocks>;
};

export type User_Blocks_Aggregate_Bool_Exp = {
  count?: InputMaybe<User_Blocks_Aggregate_Bool_Exp_Count>;
};

export type User_Blocks_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<User_Blocks_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<User_Blocks_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "user_blocks" */
export type User_Blocks_Aggregate_Fields = {
  __typename?: 'user_blocks_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<User_Blocks_Max_Fields>;
  min?: Maybe<User_Blocks_Min_Fields>;
};


/** aggregate fields of "user_blocks" */
export type User_Blocks_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Blocks_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "user_blocks" */
export type User_Blocks_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<User_Blocks_Max_Order_By>;
  min?: InputMaybe<User_Blocks_Min_Order_By>;
};

/** input type for inserting array relation for remote table "user_blocks" */
export type User_Blocks_Arr_Rel_Insert_Input = {
  data: Array<User_Blocks_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<User_Blocks_On_Conflict>;
};

/** Boolean expression to filter rows from the table "user_blocks". All fields are combined with a logical 'AND'. */
export type User_Blocks_Bool_Exp = {
  _and?: InputMaybe<Array<User_Blocks_Bool_Exp>>;
  _not?: InputMaybe<User_Blocks_Bool_Exp>;
  _or?: InputMaybe<Array<User_Blocks_Bool_Exp>>;
  blocked?: InputMaybe<Users_Bool_Exp>;
  blocked_id?: InputMaybe<Uuid_Comparison_Exp>;
  blocker?: InputMaybe<Users_Bool_Exp>;
  blocker_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_blocks" */
export enum User_Blocks_Constraint {
  /** unique or primary key constraint on columns "blocker_id", "blocked_id" */
  UserBlocksPkey = 'user_blocks_pkey'
}

/** input type for inserting data into table "user_blocks" */
export type User_Blocks_Insert_Input = {
  blocked?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  blocked_id?: InputMaybe<Scalars['uuid']['input']>;
  blocker?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  blocker_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type User_Blocks_Max_Fields = {
  __typename?: 'user_blocks_max_fields';
  blocked_id?: Maybe<Scalars['uuid']['output']>;
  blocker_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "user_blocks" */
export type User_Blocks_Max_Order_By = {
  blocked_id?: InputMaybe<Order_By>;
  blocker_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type User_Blocks_Min_Fields = {
  __typename?: 'user_blocks_min_fields';
  blocked_id?: Maybe<Scalars['uuid']['output']>;
  blocker_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "user_blocks" */
export type User_Blocks_Min_Order_By = {
  blocked_id?: InputMaybe<Order_By>;
  blocker_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "user_blocks" */
export type User_Blocks_Mutation_Response = {
  __typename?: 'user_blocks_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Blocks>;
};

/** on_conflict condition type for table "user_blocks" */
export type User_Blocks_On_Conflict = {
  constraint: User_Blocks_Constraint;
  update_columns?: Array<User_Blocks_Update_Column>;
  where?: InputMaybe<User_Blocks_Bool_Exp>;
};

/** Ordering options when selecting data from "user_blocks". */
export type User_Blocks_Order_By = {
  blocked?: InputMaybe<Users_Order_By>;
  blocked_id?: InputMaybe<Order_By>;
  blocker?: InputMaybe<Users_Order_By>;
  blocker_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: user_blocks */
export type User_Blocks_Pk_Columns_Input = {
  blocked_id: Scalars['uuid']['input'];
  blocker_id: Scalars['uuid']['input'];
};

/** select columns of table "user_blocks" */
export enum User_Blocks_Select_Column {
  /** column name */
  BlockedId = 'blocked_id',
  /** column name */
  BlockerId = 'blocker_id',
  /** column name */
  CreatedAt = 'created_at'
}

/** input type for updating data in table "user_blocks" */
export type User_Blocks_Set_Input = {
  blocked_id?: InputMaybe<Scalars['uuid']['input']>;
  blocker_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "user_blocks" */
export type User_Blocks_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Blocks_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Blocks_Stream_Cursor_Value_Input = {
  blocked_id?: InputMaybe<Scalars['uuid']['input']>;
  blocker_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "user_blocks" */
export enum User_Blocks_Update_Column {
  /** column name */
  BlockedId = 'blocked_id',
  /** column name */
  BlockerId = 'blocker_id',
  /** column name */
  CreatedAt = 'created_at'
}

export type User_Blocks_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<User_Blocks_Set_Input>;
  /** filter the rows which have to be updated */
  where: User_Blocks_Bool_Exp;
};

/** columns and relationships of "user_preferences" */
export type User_Preferences = {
  __typename?: 'user_preferences';
  contribution_notifications: Scalars['Boolean']['output'];
  created_at: Scalars['timestamptz']['output'];
  dms_off: Scalars['Boolean']['output'];
  email_notifications: Scalars['Boolean']['output'];
  theme: Scalars['String']['output'];
  updated_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid']['output'];
};

/** aggregated selection of "user_preferences" */
export type User_Preferences_Aggregate = {
  __typename?: 'user_preferences_aggregate';
  aggregate?: Maybe<User_Preferences_Aggregate_Fields>;
  nodes: Array<User_Preferences>;
};

export type User_Preferences_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<User_Preferences_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<User_Preferences_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<User_Preferences_Aggregate_Bool_Exp_Count>;
};

export type User_Preferences_Aggregate_Bool_Exp_Bool_And = {
  arguments: User_Preferences_Select_Column_User_Preferences_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<User_Preferences_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type User_Preferences_Aggregate_Bool_Exp_Bool_Or = {
  arguments: User_Preferences_Select_Column_User_Preferences_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<User_Preferences_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type User_Preferences_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<User_Preferences_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<User_Preferences_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "user_preferences" */
export type User_Preferences_Aggregate_Fields = {
  __typename?: 'user_preferences_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<User_Preferences_Max_Fields>;
  min?: Maybe<User_Preferences_Min_Fields>;
};


/** aggregate fields of "user_preferences" */
export type User_Preferences_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Preferences_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "user_preferences" */
export type User_Preferences_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<User_Preferences_Max_Order_By>;
  min?: InputMaybe<User_Preferences_Min_Order_By>;
};

/** input type for inserting array relation for remote table "user_preferences" */
export type User_Preferences_Arr_Rel_Insert_Input = {
  data: Array<User_Preferences_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<User_Preferences_On_Conflict>;
};

/** Boolean expression to filter rows from the table "user_preferences". All fields are combined with a logical 'AND'. */
export type User_Preferences_Bool_Exp = {
  _and?: InputMaybe<Array<User_Preferences_Bool_Exp>>;
  _not?: InputMaybe<User_Preferences_Bool_Exp>;
  _or?: InputMaybe<Array<User_Preferences_Bool_Exp>>;
  contribution_notifications?: InputMaybe<Boolean_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  dms_off?: InputMaybe<Boolean_Comparison_Exp>;
  email_notifications?: InputMaybe<Boolean_Comparison_Exp>;
  theme?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_preferences" */
export enum User_Preferences_Constraint {
  /** unique or primary key constraint on columns "user_id" */
  UserPreferencesPkey = 'user_preferences_pkey'
}

/** input type for inserting data into table "user_preferences" */
export type User_Preferences_Insert_Input = {
  contribution_notifications?: InputMaybe<Scalars['Boolean']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  dms_off?: InputMaybe<Scalars['Boolean']['input']>;
  email_notifications?: InputMaybe<Scalars['Boolean']['input']>;
  theme?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type User_Preferences_Max_Fields = {
  __typename?: 'user_preferences_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  theme?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "user_preferences" */
export type User_Preferences_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  theme?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type User_Preferences_Min_Fields = {
  __typename?: 'user_preferences_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  theme?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "user_preferences" */
export type User_Preferences_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  theme?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "user_preferences" */
export type User_Preferences_Mutation_Response = {
  __typename?: 'user_preferences_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Preferences>;
};

/** on_conflict condition type for table "user_preferences" */
export type User_Preferences_On_Conflict = {
  constraint: User_Preferences_Constraint;
  update_columns?: Array<User_Preferences_Update_Column>;
  where?: InputMaybe<User_Preferences_Bool_Exp>;
};

/** Ordering options when selecting data from "user_preferences". */
export type User_Preferences_Order_By = {
  contribution_notifications?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  dms_off?: InputMaybe<Order_By>;
  email_notifications?: InputMaybe<Order_By>;
  theme?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: user_preferences */
export type User_Preferences_Pk_Columns_Input = {
  user_id: Scalars['uuid']['input'];
};

/** select columns of table "user_preferences" */
export enum User_Preferences_Select_Column {
  /** column name */
  ContributionNotifications = 'contribution_notifications',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DmsOff = 'dms_off',
  /** column name */
  EmailNotifications = 'email_notifications',
  /** column name */
  Theme = 'theme',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** select "user_preferences_aggregate_bool_exp_bool_and_arguments_columns" columns of table "user_preferences" */
export enum User_Preferences_Select_Column_User_Preferences_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  ContributionNotifications = 'contribution_notifications',
  /** column name */
  DmsOff = 'dms_off',
  /** column name */
  EmailNotifications = 'email_notifications'
}

/** select "user_preferences_aggregate_bool_exp_bool_or_arguments_columns" columns of table "user_preferences" */
export enum User_Preferences_Select_Column_User_Preferences_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  ContributionNotifications = 'contribution_notifications',
  /** column name */
  DmsOff = 'dms_off',
  /** column name */
  EmailNotifications = 'email_notifications'
}

/** input type for updating data in table "user_preferences" */
export type User_Preferences_Set_Input = {
  contribution_notifications?: InputMaybe<Scalars['Boolean']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  dms_off?: InputMaybe<Scalars['Boolean']['input']>;
  email_notifications?: InputMaybe<Scalars['Boolean']['input']>;
  theme?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "user_preferences" */
export type User_Preferences_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Preferences_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Preferences_Stream_Cursor_Value_Input = {
  contribution_notifications?: InputMaybe<Scalars['Boolean']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  dms_off?: InputMaybe<Scalars['Boolean']['input']>;
  email_notifications?: InputMaybe<Scalars['Boolean']['input']>;
  theme?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "user_preferences" */
export enum User_Preferences_Update_Column {
  /** column name */
  ContributionNotifications = 'contribution_notifications',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DmsOff = 'dms_off',
  /** column name */
  EmailNotifications = 'email_notifications',
  /** column name */
  Theme = 'theme',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

export type User_Preferences_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<User_Preferences_Set_Input>;
  /** filter the rows which have to be updated */
  where: User_Preferences_Bool_Exp;
};

/** columns and relationships of "user_profiles" */
export type User_Profiles = {
  __typename?: 'user_profiles';
  bio?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['timestamptz']['output'];
  location?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid']['output'];
  website?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "user_profiles" */
export type User_Profiles_Aggregate = {
  __typename?: 'user_profiles_aggregate';
  aggregate?: Maybe<User_Profiles_Aggregate_Fields>;
  nodes: Array<User_Profiles>;
};

export type User_Profiles_Aggregate_Bool_Exp = {
  count?: InputMaybe<User_Profiles_Aggregate_Bool_Exp_Count>;
};

export type User_Profiles_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<User_Profiles_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<User_Profiles_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "user_profiles" */
export type User_Profiles_Aggregate_Fields = {
  __typename?: 'user_profiles_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<User_Profiles_Max_Fields>;
  min?: Maybe<User_Profiles_Min_Fields>;
};


/** aggregate fields of "user_profiles" */
export type User_Profiles_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Profiles_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "user_profiles" */
export type User_Profiles_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<User_Profiles_Max_Order_By>;
  min?: InputMaybe<User_Profiles_Min_Order_By>;
};

/** input type for inserting array relation for remote table "user_profiles" */
export type User_Profiles_Arr_Rel_Insert_Input = {
  data: Array<User_Profiles_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<User_Profiles_On_Conflict>;
};

/** Boolean expression to filter rows from the table "user_profiles". All fields are combined with a logical 'AND'. */
export type User_Profiles_Bool_Exp = {
  _and?: InputMaybe<Array<User_Profiles_Bool_Exp>>;
  _not?: InputMaybe<User_Profiles_Bool_Exp>;
  _or?: InputMaybe<Array<User_Profiles_Bool_Exp>>;
  bio?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  location?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
  website?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_profiles" */
export enum User_Profiles_Constraint {
  /** unique or primary key constraint on columns "user_id" */
  UserProfilesPkey = 'user_profiles_pkey'
}

/** input type for inserting data into table "user_profiles" */
export type User_Profiles_Insert_Input = {
  bio?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type User_Profiles_Max_Fields = {
  __typename?: 'user_profiles_max_fields';
  bio?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "user_profiles" */
export type User_Profiles_Max_Order_By = {
  bio?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  website?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type User_Profiles_Min_Fields = {
  __typename?: 'user_profiles_min_fields';
  bio?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "user_profiles" */
export type User_Profiles_Min_Order_By = {
  bio?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  website?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "user_profiles" */
export type User_Profiles_Mutation_Response = {
  __typename?: 'user_profiles_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Profiles>;
};

/** on_conflict condition type for table "user_profiles" */
export type User_Profiles_On_Conflict = {
  constraint: User_Profiles_Constraint;
  update_columns?: Array<User_Profiles_Update_Column>;
  where?: InputMaybe<User_Profiles_Bool_Exp>;
};

/** Ordering options when selecting data from "user_profiles". */
export type User_Profiles_Order_By = {
  bio?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
  website?: InputMaybe<Order_By>;
};

/** primary key columns input for table: user_profiles */
export type User_Profiles_Pk_Columns_Input = {
  user_id: Scalars['uuid']['input'];
};

/** select columns of table "user_profiles" */
export enum User_Profiles_Select_Column {
  /** column name */
  Bio = 'bio',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Location = 'location',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
  /** column name */
  Website = 'website'
}

/** input type for updating data in table "user_profiles" */
export type User_Profiles_Set_Input = {
  bio?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "user_profiles" */
export type User_Profiles_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Profiles_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Profiles_Stream_Cursor_Value_Input = {
  bio?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "user_profiles" */
export enum User_Profiles_Update_Column {
  /** column name */
  Bio = 'bio',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Location = 'location',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
  /** column name */
  Website = 'website'
}

export type User_Profiles_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<User_Profiles_Set_Input>;
  /** filter the rows which have to be updated */
  where: User_Profiles_Bool_Exp;
};

/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type Users = {
  __typename?: 'users';
  activeMfaType?: Maybe<Scalars['String']['output']>;
  avatarUrl: Scalars['String']['output'];
  /** An array relationship */
  blocks_outgoing: Array<User_Blocks>;
  /** An aggregate relationship */
  blocks_outgoing_aggregate: User_Blocks_Aggregate;
  /** An array relationship */
  blog_comment_helpfuls: Array<Blog_Comment_Helpful>;
  /** An aggregate relationship */
  blog_comment_helpfuls_aggregate: Blog_Comment_Helpful_Aggregate;
  /** An array relationship */
  blog_comment_reports: Array<Blog_Comment_Reports>;
  /** An aggregate relationship */
  blog_comment_reports_aggregate: Blog_Comment_Reports_Aggregate;
  /** An array relationship */
  blog_comments: Array<Blog_Comments>;
  /** An aggregate relationship */
  blog_comments_aggregate: Blog_Comments_Aggregate;
  /** An array relationship */
  comment_likes: Array<Comment_Likes>;
  /** An aggregate relationship */
  comment_likes_aggregate: Comment_Likes_Aggregate;
  /** An array relationship */
  contribution_bookmarks: Array<Contribution_Bookmarks>;
  /** An aggregate relationship */
  contribution_bookmarks_aggregate: Contribution_Bookmarks_Aggregate;
  /** An array relationship */
  contribution_comments: Array<Contribution_Comments>;
  /** An aggregate relationship */
  contribution_comments_aggregate: Contribution_Comments_Aggregate;
  /** An array relationship */
  contribution_likes: Array<Contribution_Likes>;
  /** An aggregate relationship */
  contribution_likes_aggregate: Contribution_Likes_Aggregate;
  /** An array relationship */
  contribution_reports: Array<Contribution_Reports>;
  /** An aggregate relationship */
  contribution_reports_aggregate: Contribution_Reports_Aggregate;
  /** An array relationship */
  contributions: Array<Contributions>;
  /** An aggregate relationship */
  contributions_aggregate: Contributions_Aggregate;
  createdAt: Scalars['timestamptz']['output'];
  currentChallenge?: Maybe<Scalars['String']['output']>;
  defaultRole: Scalars['String']['output'];
  /** An object relationship */
  defaultRoleByRole: AuthRoles;
  disabled: Scalars['Boolean']['output'];
  displayName: Scalars['String']['output'];
  email?: Maybe<Scalars['citext']['output']>;
  emailVerified: Scalars['Boolean']['output'];
  id: Scalars['uuid']['output'];
  isAnonymous: Scalars['Boolean']['output'];
  lastSeen?: Maybe<Scalars['timestamptz']['output']>;
  locale: Scalars['String']['output'];
  /** An array relationship */
  messages_received: Array<Messages>;
  /** An aggregate relationship */
  messages_received_aggregate: Messages_Aggregate;
  /** An array relationship */
  messages_sent: Array<Messages>;
  /** An aggregate relationship */
  messages_sent_aggregate: Messages_Aggregate;
  metadata?: Maybe<Scalars['jsonb']['output']>;
  newEmail?: Maybe<Scalars['citext']['output']>;
  otpHash?: Maybe<Scalars['String']['output']>;
  otpHashExpiresAt: Scalars['timestamptz']['output'];
  otpMethodLastUsed?: Maybe<Scalars['String']['output']>;
  passwordHash?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  phoneNumberVerified: Scalars['Boolean']['output'];
  /** An array relationship */
  post_bookmarks: Array<Post_Bookmarks>;
  /** An aggregate relationship */
  post_bookmarks_aggregate: Post_Bookmarks_Aggregate;
  /** An array relationship */
  post_comments: Array<Post_Comments>;
  /** An aggregate relationship */
  post_comments_aggregate: Post_Comments_Aggregate;
  /** An array relationship */
  post_likes: Array<Post_Likes>;
  /** An aggregate relationship */
  post_likes_aggregate: Post_Likes_Aggregate;
  /** An array relationship */
  post_reports: Array<Post_Reports>;
  /** An aggregate relationship */
  post_reports_aggregate: Post_Reports_Aggregate;
  /** An array relationship */
  posts: Array<Posts>;
  /** An aggregate relationship */
  posts_aggregate: Posts_Aggregate;
  /** An array relationship */
  refreshTokens: Array<AuthRefreshTokens>;
  /** An aggregate relationship */
  refreshTokens_aggregate: AuthRefreshTokens_Aggregate;
  /** An array relationship */
  roles: Array<AuthUserRoles>;
  /** An aggregate relationship */
  roles_aggregate: AuthUserRoles_Aggregate;
  /** An array relationship */
  securityKeys: Array<AuthUserSecurityKeys>;
  /** An aggregate relationship */
  securityKeys_aggregate: AuthUserSecurityKeys_Aggregate;
  ticket?: Maybe<Scalars['String']['output']>;
  ticketExpiresAt: Scalars['timestamptz']['output'];
  totpSecret?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['timestamptz']['output'];
  /** An array relationship */
  userProviders: Array<AuthUserProviders>;
  /** An aggregate relationship */
  userProviders_aggregate: AuthUserProviders_Aggregate;
  /** An array relationship */
  user_blocks: Array<User_Blocks>;
  /** An aggregate relationship */
  user_blocks_aggregate: User_Blocks_Aggregate;
  /** An array relationship */
  user_preferences: Array<User_Preferences>;
  /** An aggregate relationship */
  user_preferences_aggregate: User_Preferences_Aggregate;
  /** An array relationship */
  user_profiles: Array<User_Profiles>;
  /** An aggregate relationship */
  user_profiles_aggregate: User_Profiles_Aggregate;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersBlocks_OutgoingArgs = {
  distinct_on?: InputMaybe<Array<User_Blocks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Blocks_Order_By>>;
  where?: InputMaybe<User_Blocks_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersBlocks_Outgoing_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Blocks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Blocks_Order_By>>;
  where?: InputMaybe<User_Blocks_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersBlog_Comment_HelpfulsArgs = {
  distinct_on?: InputMaybe<Array<Blog_Comment_Helpful_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Blog_Comment_Helpful_Order_By>>;
  where?: InputMaybe<Blog_Comment_Helpful_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersBlog_Comment_Helpfuls_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Blog_Comment_Helpful_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Blog_Comment_Helpful_Order_By>>;
  where?: InputMaybe<Blog_Comment_Helpful_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersBlog_Comment_ReportsArgs = {
  distinct_on?: InputMaybe<Array<Blog_Comment_Reports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Blog_Comment_Reports_Order_By>>;
  where?: InputMaybe<Blog_Comment_Reports_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersBlog_Comment_Reports_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Blog_Comment_Reports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Blog_Comment_Reports_Order_By>>;
  where?: InputMaybe<Blog_Comment_Reports_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersBlog_CommentsArgs = {
  distinct_on?: InputMaybe<Array<Blog_Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Blog_Comments_Order_By>>;
  where?: InputMaybe<Blog_Comments_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersBlog_Comments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Blog_Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Blog_Comments_Order_By>>;
  where?: InputMaybe<Blog_Comments_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersComment_LikesArgs = {
  distinct_on?: InputMaybe<Array<Comment_Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Comment_Likes_Order_By>>;
  where?: InputMaybe<Comment_Likes_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersComment_Likes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Comment_Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Comment_Likes_Order_By>>;
  where?: InputMaybe<Comment_Likes_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersContribution_BookmarksArgs = {
  distinct_on?: InputMaybe<Array<Contribution_Bookmarks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contribution_Bookmarks_Order_By>>;
  where?: InputMaybe<Contribution_Bookmarks_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersContribution_Bookmarks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contribution_Bookmarks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contribution_Bookmarks_Order_By>>;
  where?: InputMaybe<Contribution_Bookmarks_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersContribution_CommentsArgs = {
  distinct_on?: InputMaybe<Array<Contribution_Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contribution_Comments_Order_By>>;
  where?: InputMaybe<Contribution_Comments_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersContribution_Comments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contribution_Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contribution_Comments_Order_By>>;
  where?: InputMaybe<Contribution_Comments_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersContribution_LikesArgs = {
  distinct_on?: InputMaybe<Array<Contribution_Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contribution_Likes_Order_By>>;
  where?: InputMaybe<Contribution_Likes_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersContribution_Likes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contribution_Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contribution_Likes_Order_By>>;
  where?: InputMaybe<Contribution_Likes_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersContribution_ReportsArgs = {
  distinct_on?: InputMaybe<Array<Contribution_Reports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contribution_Reports_Order_By>>;
  where?: InputMaybe<Contribution_Reports_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersContribution_Reports_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contribution_Reports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contribution_Reports_Order_By>>;
  where?: InputMaybe<Contribution_Reports_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersContributionsArgs = {
  distinct_on?: InputMaybe<Array<Contributions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contributions_Order_By>>;
  where?: InputMaybe<Contributions_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersContributions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contributions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contributions_Order_By>>;
  where?: InputMaybe<Contributions_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersMessages_ReceivedArgs = {
  distinct_on?: InputMaybe<Array<Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Messages_Order_By>>;
  where?: InputMaybe<Messages_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersMessages_Received_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Messages_Order_By>>;
  where?: InputMaybe<Messages_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersMessages_SentArgs = {
  distinct_on?: InputMaybe<Array<Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Messages_Order_By>>;
  where?: InputMaybe<Messages_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersMessages_Sent_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Messages_Order_By>>;
  where?: InputMaybe<Messages_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersMetadataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersPost_BookmarksArgs = {
  distinct_on?: InputMaybe<Array<Post_Bookmarks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Post_Bookmarks_Order_By>>;
  where?: InputMaybe<Post_Bookmarks_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersPost_Bookmarks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Post_Bookmarks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Post_Bookmarks_Order_By>>;
  where?: InputMaybe<Post_Bookmarks_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersPost_CommentsArgs = {
  distinct_on?: InputMaybe<Array<Post_Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Post_Comments_Order_By>>;
  where?: InputMaybe<Post_Comments_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersPost_Comments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Post_Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Post_Comments_Order_By>>;
  where?: InputMaybe<Post_Comments_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersPost_LikesArgs = {
  distinct_on?: InputMaybe<Array<Post_Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Post_Likes_Order_By>>;
  where?: InputMaybe<Post_Likes_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersPost_Likes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Post_Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Post_Likes_Order_By>>;
  where?: InputMaybe<Post_Likes_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersPost_ReportsArgs = {
  distinct_on?: InputMaybe<Array<Post_Reports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Post_Reports_Order_By>>;
  where?: InputMaybe<Post_Reports_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersPost_Reports_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Post_Reports_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Post_Reports_Order_By>>;
  where?: InputMaybe<Post_Reports_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersPostsArgs = {
  distinct_on?: InputMaybe<Array<Posts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Posts_Order_By>>;
  where?: InputMaybe<Posts_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersPosts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Posts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Posts_Order_By>>;
  where?: InputMaybe<Posts_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersRefreshTokensArgs = {
  distinct_on?: InputMaybe<Array<AuthRefreshTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthRefreshTokens_Order_By>>;
  where?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersRefreshTokens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthRefreshTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthRefreshTokens_Order_By>>;
  where?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersRolesArgs = {
  distinct_on?: InputMaybe<Array<AuthUserRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthUserRoles_Order_By>>;
  where?: InputMaybe<AuthUserRoles_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersRoles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthUserRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthUserRoles_Order_By>>;
  where?: InputMaybe<AuthUserRoles_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersSecurityKeysArgs = {
  distinct_on?: InputMaybe<Array<AuthUserSecurityKeys_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthUserSecurityKeys_Order_By>>;
  where?: InputMaybe<AuthUserSecurityKeys_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersSecurityKeys_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthUserSecurityKeys_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthUserSecurityKeys_Order_By>>;
  where?: InputMaybe<AuthUserSecurityKeys_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersUserProvidersArgs = {
  distinct_on?: InputMaybe<Array<AuthUserProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthUserProviders_Order_By>>;
  where?: InputMaybe<AuthUserProviders_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersUserProviders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthUserProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AuthUserProviders_Order_By>>;
  where?: InputMaybe<AuthUserProviders_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersUser_BlocksArgs = {
  distinct_on?: InputMaybe<Array<User_Blocks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Blocks_Order_By>>;
  where?: InputMaybe<User_Blocks_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersUser_Blocks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Blocks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Blocks_Order_By>>;
  where?: InputMaybe<User_Blocks_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersUser_PreferencesArgs = {
  distinct_on?: InputMaybe<Array<User_Preferences_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Preferences_Order_By>>;
  where?: InputMaybe<User_Preferences_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersUser_Preferences_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Preferences_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Preferences_Order_By>>;
  where?: InputMaybe<User_Preferences_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersUser_ProfilesArgs = {
  distinct_on?: InputMaybe<Array<User_Profiles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Profiles_Order_By>>;
  where?: InputMaybe<User_Profiles_Bool_Exp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersUser_Profiles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Profiles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Profiles_Order_By>>;
  where?: InputMaybe<User_Profiles_Bool_Exp>;
};

/** aggregated selection of "auth.users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

export type Users_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Users_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Users_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Users_Aggregate_Bool_Exp_Count>;
};

export type Users_Aggregate_Bool_Exp_Bool_And = {
  arguments: Users_Select_Column_Users_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Users_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Users_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Users_Select_Column_Users_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Users_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Users_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Users_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "auth.users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "auth.users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "auth.users" */
export type Users_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Users_Max_Order_By>;
  min?: InputMaybe<Users_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Users_Append_Input = {
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "auth.users" */
export type Users_Arr_Rel_Insert_Input = {
  data: Array<Users_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** Boolean expression to filter rows from the table "auth.users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  activeMfaType?: InputMaybe<String_Comparison_Exp>;
  avatarUrl?: InputMaybe<String_Comparison_Exp>;
  blocks_outgoing?: InputMaybe<User_Blocks_Bool_Exp>;
  blocks_outgoing_aggregate?: InputMaybe<User_Blocks_Aggregate_Bool_Exp>;
  blog_comment_helpfuls?: InputMaybe<Blog_Comment_Helpful_Bool_Exp>;
  blog_comment_helpfuls_aggregate?: InputMaybe<Blog_Comment_Helpful_Aggregate_Bool_Exp>;
  blog_comment_reports?: InputMaybe<Blog_Comment_Reports_Bool_Exp>;
  blog_comment_reports_aggregate?: InputMaybe<Blog_Comment_Reports_Aggregate_Bool_Exp>;
  blog_comments?: InputMaybe<Blog_Comments_Bool_Exp>;
  blog_comments_aggregate?: InputMaybe<Blog_Comments_Aggregate_Bool_Exp>;
  comment_likes?: InputMaybe<Comment_Likes_Bool_Exp>;
  comment_likes_aggregate?: InputMaybe<Comment_Likes_Aggregate_Bool_Exp>;
  contribution_bookmarks?: InputMaybe<Contribution_Bookmarks_Bool_Exp>;
  contribution_bookmarks_aggregate?: InputMaybe<Contribution_Bookmarks_Aggregate_Bool_Exp>;
  contribution_comments?: InputMaybe<Contribution_Comments_Bool_Exp>;
  contribution_comments_aggregate?: InputMaybe<Contribution_Comments_Aggregate_Bool_Exp>;
  contribution_likes?: InputMaybe<Contribution_Likes_Bool_Exp>;
  contribution_likes_aggregate?: InputMaybe<Contribution_Likes_Aggregate_Bool_Exp>;
  contribution_reports?: InputMaybe<Contribution_Reports_Bool_Exp>;
  contribution_reports_aggregate?: InputMaybe<Contribution_Reports_Aggregate_Bool_Exp>;
  contributions?: InputMaybe<Contributions_Bool_Exp>;
  contributions_aggregate?: InputMaybe<Contributions_Aggregate_Bool_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  currentChallenge?: InputMaybe<String_Comparison_Exp>;
  defaultRole?: InputMaybe<String_Comparison_Exp>;
  defaultRoleByRole?: InputMaybe<AuthRoles_Bool_Exp>;
  disabled?: InputMaybe<Boolean_Comparison_Exp>;
  displayName?: InputMaybe<String_Comparison_Exp>;
  email?: InputMaybe<Citext_Comparison_Exp>;
  emailVerified?: InputMaybe<Boolean_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  isAnonymous?: InputMaybe<Boolean_Comparison_Exp>;
  lastSeen?: InputMaybe<Timestamptz_Comparison_Exp>;
  locale?: InputMaybe<String_Comparison_Exp>;
  messages_received?: InputMaybe<Messages_Bool_Exp>;
  messages_received_aggregate?: InputMaybe<Messages_Aggregate_Bool_Exp>;
  messages_sent?: InputMaybe<Messages_Bool_Exp>;
  messages_sent_aggregate?: InputMaybe<Messages_Aggregate_Bool_Exp>;
  metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  newEmail?: InputMaybe<Citext_Comparison_Exp>;
  otpHash?: InputMaybe<String_Comparison_Exp>;
  otpHashExpiresAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  otpMethodLastUsed?: InputMaybe<String_Comparison_Exp>;
  passwordHash?: InputMaybe<String_Comparison_Exp>;
  phoneNumber?: InputMaybe<String_Comparison_Exp>;
  phoneNumberVerified?: InputMaybe<Boolean_Comparison_Exp>;
  post_bookmarks?: InputMaybe<Post_Bookmarks_Bool_Exp>;
  post_bookmarks_aggregate?: InputMaybe<Post_Bookmarks_Aggregate_Bool_Exp>;
  post_comments?: InputMaybe<Post_Comments_Bool_Exp>;
  post_comments_aggregate?: InputMaybe<Post_Comments_Aggregate_Bool_Exp>;
  post_likes?: InputMaybe<Post_Likes_Bool_Exp>;
  post_likes_aggregate?: InputMaybe<Post_Likes_Aggregate_Bool_Exp>;
  post_reports?: InputMaybe<Post_Reports_Bool_Exp>;
  post_reports_aggregate?: InputMaybe<Post_Reports_Aggregate_Bool_Exp>;
  posts?: InputMaybe<Posts_Bool_Exp>;
  posts_aggregate?: InputMaybe<Posts_Aggregate_Bool_Exp>;
  refreshTokens?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
  refreshTokens_aggregate?: InputMaybe<AuthRefreshTokens_Aggregate_Bool_Exp>;
  roles?: InputMaybe<AuthUserRoles_Bool_Exp>;
  roles_aggregate?: InputMaybe<AuthUserRoles_Aggregate_Bool_Exp>;
  securityKeys?: InputMaybe<AuthUserSecurityKeys_Bool_Exp>;
  securityKeys_aggregate?: InputMaybe<AuthUserSecurityKeys_Aggregate_Bool_Exp>;
  ticket?: InputMaybe<String_Comparison_Exp>;
  ticketExpiresAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  totpSecret?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  userProviders?: InputMaybe<AuthUserProviders_Bool_Exp>;
  userProviders_aggregate?: InputMaybe<AuthUserProviders_Aggregate_Bool_Exp>;
  user_blocks?: InputMaybe<User_Blocks_Bool_Exp>;
  user_blocks_aggregate?: InputMaybe<User_Blocks_Aggregate_Bool_Exp>;
  user_preferences?: InputMaybe<User_Preferences_Bool_Exp>;
  user_preferences_aggregate?: InputMaybe<User_Preferences_Aggregate_Bool_Exp>;
  user_profiles?: InputMaybe<User_Profiles_Bool_Exp>;
  user_profiles_aggregate?: InputMaybe<User_Profiles_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "auth.users" */
export enum Users_Constraint {
  /** unique or primary key constraint on columns "email" */
  UsersEmailKey = 'users_email_key',
  /** unique or primary key constraint on columns "phone_number" */
  UsersPhoneNumberKey = 'users_phone_number_key',
  /** unique or primary key constraint on columns "id" */
  UsersPkey = 'users_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Users_Delete_At_Path_Input = {
  metadata?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Users_Delete_Elem_Input = {
  metadata?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Users_Delete_Key_Input = {
  metadata?: InputMaybe<Scalars['String']['input']>;
};

/** input type for inserting data into table "auth.users" */
export type Users_Insert_Input = {
  activeMfaType?: InputMaybe<Scalars['String']['input']>;
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  blocks_outgoing?: InputMaybe<User_Blocks_Arr_Rel_Insert_Input>;
  blog_comment_helpfuls?: InputMaybe<Blog_Comment_Helpful_Arr_Rel_Insert_Input>;
  blog_comment_reports?: InputMaybe<Blog_Comment_Reports_Arr_Rel_Insert_Input>;
  blog_comments?: InputMaybe<Blog_Comments_Arr_Rel_Insert_Input>;
  comment_likes?: InputMaybe<Comment_Likes_Arr_Rel_Insert_Input>;
  contribution_bookmarks?: InputMaybe<Contribution_Bookmarks_Arr_Rel_Insert_Input>;
  contribution_comments?: InputMaybe<Contribution_Comments_Arr_Rel_Insert_Input>;
  contribution_likes?: InputMaybe<Contribution_Likes_Arr_Rel_Insert_Input>;
  contribution_reports?: InputMaybe<Contribution_Reports_Arr_Rel_Insert_Input>;
  contributions?: InputMaybe<Contributions_Arr_Rel_Insert_Input>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  currentChallenge?: InputMaybe<Scalars['String']['input']>;
  defaultRole?: InputMaybe<Scalars['String']['input']>;
  defaultRoleByRole?: InputMaybe<AuthRoles_Obj_Rel_Insert_Input>;
  disabled?: InputMaybe<Scalars['Boolean']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['citext']['input']>;
  emailVerified?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  isAnonymous?: InputMaybe<Scalars['Boolean']['input']>;
  lastSeen?: InputMaybe<Scalars['timestamptz']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  messages_received?: InputMaybe<Messages_Arr_Rel_Insert_Input>;
  messages_sent?: InputMaybe<Messages_Arr_Rel_Insert_Input>;
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  newEmail?: InputMaybe<Scalars['citext']['input']>;
  otpHash?: InputMaybe<Scalars['String']['input']>;
  otpHashExpiresAt?: InputMaybe<Scalars['timestamptz']['input']>;
  otpMethodLastUsed?: InputMaybe<Scalars['String']['input']>;
  passwordHash?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  phoneNumberVerified?: InputMaybe<Scalars['Boolean']['input']>;
  post_bookmarks?: InputMaybe<Post_Bookmarks_Arr_Rel_Insert_Input>;
  post_comments?: InputMaybe<Post_Comments_Arr_Rel_Insert_Input>;
  post_likes?: InputMaybe<Post_Likes_Arr_Rel_Insert_Input>;
  post_reports?: InputMaybe<Post_Reports_Arr_Rel_Insert_Input>;
  posts?: InputMaybe<Posts_Arr_Rel_Insert_Input>;
  refreshTokens?: InputMaybe<AuthRefreshTokens_Arr_Rel_Insert_Input>;
  roles?: InputMaybe<AuthUserRoles_Arr_Rel_Insert_Input>;
  securityKeys?: InputMaybe<AuthUserSecurityKeys_Arr_Rel_Insert_Input>;
  ticket?: InputMaybe<Scalars['String']['input']>;
  ticketExpiresAt?: InputMaybe<Scalars['timestamptz']['input']>;
  totpSecret?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  userProviders?: InputMaybe<AuthUserProviders_Arr_Rel_Insert_Input>;
  user_blocks?: InputMaybe<User_Blocks_Arr_Rel_Insert_Input>;
  user_preferences?: InputMaybe<User_Preferences_Arr_Rel_Insert_Input>;
  user_profiles?: InputMaybe<User_Profiles_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  activeMfaType?: Maybe<Scalars['String']['output']>;
  avatarUrl?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  currentChallenge?: Maybe<Scalars['String']['output']>;
  defaultRole?: Maybe<Scalars['String']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['citext']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  lastSeen?: Maybe<Scalars['timestamptz']['output']>;
  locale?: Maybe<Scalars['String']['output']>;
  newEmail?: Maybe<Scalars['citext']['output']>;
  otpHash?: Maybe<Scalars['String']['output']>;
  otpHashExpiresAt?: Maybe<Scalars['timestamptz']['output']>;
  otpMethodLastUsed?: Maybe<Scalars['String']['output']>;
  passwordHash?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  ticket?: Maybe<Scalars['String']['output']>;
  ticketExpiresAt?: Maybe<Scalars['timestamptz']['output']>;
  totpSecret?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "auth.users" */
export type Users_Max_Order_By = {
  activeMfaType?: InputMaybe<Order_By>;
  avatarUrl?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  currentChallenge?: InputMaybe<Order_By>;
  defaultRole?: InputMaybe<Order_By>;
  displayName?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lastSeen?: InputMaybe<Order_By>;
  locale?: InputMaybe<Order_By>;
  newEmail?: InputMaybe<Order_By>;
  otpHash?: InputMaybe<Order_By>;
  otpHashExpiresAt?: InputMaybe<Order_By>;
  otpMethodLastUsed?: InputMaybe<Order_By>;
  passwordHash?: InputMaybe<Order_By>;
  phoneNumber?: InputMaybe<Order_By>;
  ticket?: InputMaybe<Order_By>;
  ticketExpiresAt?: InputMaybe<Order_By>;
  totpSecret?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  activeMfaType?: Maybe<Scalars['String']['output']>;
  avatarUrl?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  currentChallenge?: Maybe<Scalars['String']['output']>;
  defaultRole?: Maybe<Scalars['String']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['citext']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  lastSeen?: Maybe<Scalars['timestamptz']['output']>;
  locale?: Maybe<Scalars['String']['output']>;
  newEmail?: Maybe<Scalars['citext']['output']>;
  otpHash?: Maybe<Scalars['String']['output']>;
  otpHashExpiresAt?: Maybe<Scalars['timestamptz']['output']>;
  otpMethodLastUsed?: Maybe<Scalars['String']['output']>;
  passwordHash?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  ticket?: Maybe<Scalars['String']['output']>;
  ticketExpiresAt?: Maybe<Scalars['timestamptz']['output']>;
  totpSecret?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "auth.users" */
export type Users_Min_Order_By = {
  activeMfaType?: InputMaybe<Order_By>;
  avatarUrl?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  currentChallenge?: InputMaybe<Order_By>;
  defaultRole?: InputMaybe<Order_By>;
  displayName?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lastSeen?: InputMaybe<Order_By>;
  locale?: InputMaybe<Order_By>;
  newEmail?: InputMaybe<Order_By>;
  otpHash?: InputMaybe<Order_By>;
  otpHashExpiresAt?: InputMaybe<Order_By>;
  otpMethodLastUsed?: InputMaybe<Order_By>;
  passwordHash?: InputMaybe<Order_By>;
  phoneNumber?: InputMaybe<Order_By>;
  ticket?: InputMaybe<Order_By>;
  ticketExpiresAt?: InputMaybe<Order_By>;
  totpSecret?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "auth.users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "auth.users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** on_conflict condition type for table "auth.users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "auth.users". */
export type Users_Order_By = {
  activeMfaType?: InputMaybe<Order_By>;
  avatarUrl?: InputMaybe<Order_By>;
  blocks_outgoing_aggregate?: InputMaybe<User_Blocks_Aggregate_Order_By>;
  blog_comment_helpfuls_aggregate?: InputMaybe<Blog_Comment_Helpful_Aggregate_Order_By>;
  blog_comment_reports_aggregate?: InputMaybe<Blog_Comment_Reports_Aggregate_Order_By>;
  blog_comments_aggregate?: InputMaybe<Blog_Comments_Aggregate_Order_By>;
  comment_likes_aggregate?: InputMaybe<Comment_Likes_Aggregate_Order_By>;
  contribution_bookmarks_aggregate?: InputMaybe<Contribution_Bookmarks_Aggregate_Order_By>;
  contribution_comments_aggregate?: InputMaybe<Contribution_Comments_Aggregate_Order_By>;
  contribution_likes_aggregate?: InputMaybe<Contribution_Likes_Aggregate_Order_By>;
  contribution_reports_aggregate?: InputMaybe<Contribution_Reports_Aggregate_Order_By>;
  contributions_aggregate?: InputMaybe<Contributions_Aggregate_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  currentChallenge?: InputMaybe<Order_By>;
  defaultRole?: InputMaybe<Order_By>;
  defaultRoleByRole?: InputMaybe<AuthRoles_Order_By>;
  disabled?: InputMaybe<Order_By>;
  displayName?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  emailVerified?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  isAnonymous?: InputMaybe<Order_By>;
  lastSeen?: InputMaybe<Order_By>;
  locale?: InputMaybe<Order_By>;
  messages_received_aggregate?: InputMaybe<Messages_Aggregate_Order_By>;
  messages_sent_aggregate?: InputMaybe<Messages_Aggregate_Order_By>;
  metadata?: InputMaybe<Order_By>;
  newEmail?: InputMaybe<Order_By>;
  otpHash?: InputMaybe<Order_By>;
  otpHashExpiresAt?: InputMaybe<Order_By>;
  otpMethodLastUsed?: InputMaybe<Order_By>;
  passwordHash?: InputMaybe<Order_By>;
  phoneNumber?: InputMaybe<Order_By>;
  phoneNumberVerified?: InputMaybe<Order_By>;
  post_bookmarks_aggregate?: InputMaybe<Post_Bookmarks_Aggregate_Order_By>;
  post_comments_aggregate?: InputMaybe<Post_Comments_Aggregate_Order_By>;
  post_likes_aggregate?: InputMaybe<Post_Likes_Aggregate_Order_By>;
  post_reports_aggregate?: InputMaybe<Post_Reports_Aggregate_Order_By>;
  posts_aggregate?: InputMaybe<Posts_Aggregate_Order_By>;
  refreshTokens_aggregate?: InputMaybe<AuthRefreshTokens_Aggregate_Order_By>;
  roles_aggregate?: InputMaybe<AuthUserRoles_Aggregate_Order_By>;
  securityKeys_aggregate?: InputMaybe<AuthUserSecurityKeys_Aggregate_Order_By>;
  ticket?: InputMaybe<Order_By>;
  ticketExpiresAt?: InputMaybe<Order_By>;
  totpSecret?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  userProviders_aggregate?: InputMaybe<AuthUserProviders_Aggregate_Order_By>;
  user_blocks_aggregate?: InputMaybe<User_Blocks_Aggregate_Order_By>;
  user_preferences_aggregate?: InputMaybe<User_Preferences_Aggregate_Order_By>;
  user_profiles_aggregate?: InputMaybe<User_Profiles_Aggregate_Order_By>;
};

/** primary key columns input for table: auth.users */
export type Users_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Users_Prepend_Input = {
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "auth.users" */
export enum Users_Select_Column {
  /** column name */
  ActiveMfaType = 'activeMfaType',
  /** column name */
  AvatarUrl = 'avatarUrl',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CurrentChallenge = 'currentChallenge',
  /** column name */
  DefaultRole = 'defaultRole',
  /** column name */
  Disabled = 'disabled',
  /** column name */
  DisplayName = 'displayName',
  /** column name */
  Email = 'email',
  /** column name */
  EmailVerified = 'emailVerified',
  /** column name */
  Id = 'id',
  /** column name */
  IsAnonymous = 'isAnonymous',
  /** column name */
  LastSeen = 'lastSeen',
  /** column name */
  Locale = 'locale',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  NewEmail = 'newEmail',
  /** column name */
  OtpHash = 'otpHash',
  /** column name */
  OtpHashExpiresAt = 'otpHashExpiresAt',
  /** column name */
  OtpMethodLastUsed = 'otpMethodLastUsed',
  /** column name */
  PasswordHash = 'passwordHash',
  /** column name */
  PhoneNumber = 'phoneNumber',
  /** column name */
  PhoneNumberVerified = 'phoneNumberVerified',
  /** column name */
  Ticket = 'ticket',
  /** column name */
  TicketExpiresAt = 'ticketExpiresAt',
  /** column name */
  TotpSecret = 'totpSecret',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** select "users_aggregate_bool_exp_bool_and_arguments_columns" columns of table "auth.users" */
export enum Users_Select_Column_Users_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Disabled = 'disabled',
  /** column name */
  EmailVerified = 'emailVerified',
  /** column name */
  IsAnonymous = 'isAnonymous',
  /** column name */
  PhoneNumberVerified = 'phoneNumberVerified'
}

/** select "users_aggregate_bool_exp_bool_or_arguments_columns" columns of table "auth.users" */
export enum Users_Select_Column_Users_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Disabled = 'disabled',
  /** column name */
  EmailVerified = 'emailVerified',
  /** column name */
  IsAnonymous = 'isAnonymous',
  /** column name */
  PhoneNumberVerified = 'phoneNumberVerified'
}

/** input type for updating data in table "auth.users" */
export type Users_Set_Input = {
  activeMfaType?: InputMaybe<Scalars['String']['input']>;
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  currentChallenge?: InputMaybe<Scalars['String']['input']>;
  defaultRole?: InputMaybe<Scalars['String']['input']>;
  disabled?: InputMaybe<Scalars['Boolean']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['citext']['input']>;
  emailVerified?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  isAnonymous?: InputMaybe<Scalars['Boolean']['input']>;
  lastSeen?: InputMaybe<Scalars['timestamptz']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  newEmail?: InputMaybe<Scalars['citext']['input']>;
  otpHash?: InputMaybe<Scalars['String']['input']>;
  otpHashExpiresAt?: InputMaybe<Scalars['timestamptz']['input']>;
  otpMethodLastUsed?: InputMaybe<Scalars['String']['input']>;
  passwordHash?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  phoneNumberVerified?: InputMaybe<Scalars['Boolean']['input']>;
  ticket?: InputMaybe<Scalars['String']['input']>;
  ticketExpiresAt?: InputMaybe<Scalars['timestamptz']['input']>;
  totpSecret?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "users" */
export type Users_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Users_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Users_Stream_Cursor_Value_Input = {
  activeMfaType?: InputMaybe<Scalars['String']['input']>;
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  currentChallenge?: InputMaybe<Scalars['String']['input']>;
  defaultRole?: InputMaybe<Scalars['String']['input']>;
  disabled?: InputMaybe<Scalars['Boolean']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['citext']['input']>;
  emailVerified?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  isAnonymous?: InputMaybe<Scalars['Boolean']['input']>;
  lastSeen?: InputMaybe<Scalars['timestamptz']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  newEmail?: InputMaybe<Scalars['citext']['input']>;
  otpHash?: InputMaybe<Scalars['String']['input']>;
  otpHashExpiresAt?: InputMaybe<Scalars['timestamptz']['input']>;
  otpMethodLastUsed?: InputMaybe<Scalars['String']['input']>;
  passwordHash?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  phoneNumberVerified?: InputMaybe<Scalars['Boolean']['input']>;
  ticket?: InputMaybe<Scalars['String']['input']>;
  ticketExpiresAt?: InputMaybe<Scalars['timestamptz']['input']>;
  totpSecret?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "auth.users" */
export enum Users_Update_Column {
  /** column name */
  ActiveMfaType = 'activeMfaType',
  /** column name */
  AvatarUrl = 'avatarUrl',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CurrentChallenge = 'currentChallenge',
  /** column name */
  DefaultRole = 'defaultRole',
  /** column name */
  Disabled = 'disabled',
  /** column name */
  DisplayName = 'displayName',
  /** column name */
  Email = 'email',
  /** column name */
  EmailVerified = 'emailVerified',
  /** column name */
  Id = 'id',
  /** column name */
  IsAnonymous = 'isAnonymous',
  /** column name */
  LastSeen = 'lastSeen',
  /** column name */
  Locale = 'locale',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  NewEmail = 'newEmail',
  /** column name */
  OtpHash = 'otpHash',
  /** column name */
  OtpHashExpiresAt = 'otpHashExpiresAt',
  /** column name */
  OtpMethodLastUsed = 'otpMethodLastUsed',
  /** column name */
  PasswordHash = 'passwordHash',
  /** column name */
  PhoneNumber = 'phoneNumber',
  /** column name */
  PhoneNumberVerified = 'phoneNumberVerified',
  /** column name */
  Ticket = 'ticket',
  /** column name */
  TicketExpiresAt = 'ticketExpiresAt',
  /** column name */
  TotpSecret = 'totpSecret',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type Users_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Users_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Users_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Users_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Users_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Users_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Users_Set_Input>;
  /** filter the rows which have to be updated */
  where: Users_Bool_Exp;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']['input']>;
  _gt?: InputMaybe<Scalars['uuid']['input']>;
  _gte?: InputMaybe<Scalars['uuid']['input']>;
  _in?: InputMaybe<Array<Scalars['uuid']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['uuid']['input']>;
  _lte?: InputMaybe<Scalars['uuid']['input']>;
  _neq?: InputMaybe<Scalars['uuid']['input']>;
  _nin?: InputMaybe<Array<Scalars['uuid']['input']>>;
};

/** columns and relationships of "storage.virus" */
export type Virus = {
  __typename?: 'virus';
  createdAt: Scalars['timestamptz']['output'];
  /** An object relationship */
  file: Files;
  fileId: Scalars['uuid']['output'];
  filename: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  updatedAt: Scalars['timestamptz']['output'];
  userSession: Scalars['jsonb']['output'];
  virus: Scalars['String']['output'];
};


/** columns and relationships of "storage.virus" */
export type VirusUserSessionArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "storage.virus" */
export type Virus_Aggregate = {
  __typename?: 'virus_aggregate';
  aggregate?: Maybe<Virus_Aggregate_Fields>;
  nodes: Array<Virus>;
};

/** aggregate fields of "storage.virus" */
export type Virus_Aggregate_Fields = {
  __typename?: 'virus_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Virus_Max_Fields>;
  min?: Maybe<Virus_Min_Fields>;
};


/** aggregate fields of "storage.virus" */
export type Virus_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Virus_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Virus_Append_Input = {
  userSession?: InputMaybe<Scalars['jsonb']['input']>;
};

/** Boolean expression to filter rows from the table "storage.virus". All fields are combined with a logical 'AND'. */
export type Virus_Bool_Exp = {
  _and?: InputMaybe<Array<Virus_Bool_Exp>>;
  _not?: InputMaybe<Virus_Bool_Exp>;
  _or?: InputMaybe<Array<Virus_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  file?: InputMaybe<Files_Bool_Exp>;
  fileId?: InputMaybe<Uuid_Comparison_Exp>;
  filename?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  userSession?: InputMaybe<Jsonb_Comparison_Exp>;
  virus?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "storage.virus" */
export enum Virus_Constraint {
  /** unique or primary key constraint on columns "id" */
  VirusPkey = 'virus_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Virus_Delete_At_Path_Input = {
  userSession?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Virus_Delete_Elem_Input = {
  userSession?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Virus_Delete_Key_Input = {
  userSession?: InputMaybe<Scalars['String']['input']>;
};

/** input type for inserting data into table "storage.virus" */
export type Virus_Insert_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  file?: InputMaybe<Files_Obj_Rel_Insert_Input>;
  fileId?: InputMaybe<Scalars['uuid']['input']>;
  filename?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  userSession?: InputMaybe<Scalars['jsonb']['input']>;
  virus?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Virus_Max_Fields = {
  __typename?: 'virus_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  fileId?: Maybe<Scalars['uuid']['output']>;
  filename?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  virus?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Virus_Min_Fields = {
  __typename?: 'virus_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  fileId?: Maybe<Scalars['uuid']['output']>;
  filename?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  virus?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "storage.virus" */
export type Virus_Mutation_Response = {
  __typename?: 'virus_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Virus>;
};

/** on_conflict condition type for table "storage.virus" */
export type Virus_On_Conflict = {
  constraint: Virus_Constraint;
  update_columns?: Array<Virus_Update_Column>;
  where?: InputMaybe<Virus_Bool_Exp>;
};

/** Ordering options when selecting data from "storage.virus". */
export type Virus_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  file?: InputMaybe<Files_Order_By>;
  fileId?: InputMaybe<Order_By>;
  filename?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  userSession?: InputMaybe<Order_By>;
  virus?: InputMaybe<Order_By>;
};

/** primary key columns input for table: storage.virus */
export type Virus_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Virus_Prepend_Input = {
  userSession?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "storage.virus" */
export enum Virus_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  FileId = 'fileId',
  /** column name */
  Filename = 'filename',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserSession = 'userSession',
  /** column name */
  Virus = 'virus'
}

/** input type for updating data in table "storage.virus" */
export type Virus_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  fileId?: InputMaybe<Scalars['uuid']['input']>;
  filename?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  userSession?: InputMaybe<Scalars['jsonb']['input']>;
  virus?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "virus" */
export type Virus_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Virus_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Virus_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  fileId?: InputMaybe<Scalars['uuid']['input']>;
  filename?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  userSession?: InputMaybe<Scalars['jsonb']['input']>;
  virus?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "storage.virus" */
export enum Virus_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  FileId = 'fileId',
  /** column name */
  Filename = 'filename',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserSession = 'userSession',
  /** column name */
  Virus = 'virus'
}

export type Virus_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Virus_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Virus_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Virus_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Virus_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Virus_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Virus_Set_Input>;
  /** filter the rows which have to be updated */
  where: Virus_Bool_Exp;
};

export type GetLatestPostsQueryVariables = Exact<{
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
}>;


export type GetLatestPostsQuery = { __typename?: 'query_root', posts: Array<{ __typename?: 'posts', id: string, content: string, created_at: string, user_id: string }> };

export type GetContributionsByBlogQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetContributionsByBlogQuery = { __typename?: 'query_root', contributions: Array<{ __typename?: 'contributions', id: string, title: string, year?: number | null, note?: string | null, created_at: string, submitted_by: string, slug?: string | null, likeCount: { __typename?: 'contribution_likes_aggregate', aggregate?: { __typename?: 'contribution_likes_aggregate_fields', count: number } | null } }> };

export type InsertPostMutationVariables = Exact<{
  object: Posts_Insert_Input;
}>;


export type InsertPostMutation = { __typename?: 'mutation_root', insert_posts_one?: { __typename?: 'posts', id: string, content: string, created_at: string, user_id: string } | null };

export type GetCommentsBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
}>;


export type GetCommentsBySlugQuery = { __typename?: 'query_root', blog_comments_aggregate: { __typename?: 'blog_comments_aggregate', aggregate?: { __typename?: 'blog_comments_aggregate_fields', count: number } | null }, blog_comments: Array<{ __typename?: 'blog_comments', id: string, body: string, blog_slug: string, created_at: string, parent_id?: string | null, user: { __typename?: 'users', id: string, displayName: string, avatarUrl: string } }> };

export type InsertBlogCommentMutationVariables = Exact<{
  object: Blog_Comments_Insert_Input;
}>;


export type InsertBlogCommentMutation = { __typename?: 'mutation_root', insert_blog_comments_one?: { __typename?: 'blog_comments', id: string } | null };

export type GetContributionCommentsQueryVariables = Exact<{
  contribution_id: Scalars['uuid']['input'];
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
}>;


export type GetContributionCommentsQuery = { __typename?: 'query_root', contribution_comments_aggregate: { __typename?: 'contribution_comments_aggregate', aggregate?: { __typename?: 'contribution_comments_aggregate_fields', count: number } | null }, contribution_comments: Array<{ __typename?: 'contribution_comments', id: string, body: string, created_at: string, user: { __typename?: 'users', id: string, displayName: string, avatarUrl: string } }> };

export type InsertContributionCommentMutationVariables = Exact<{
  object: Contribution_Comments_Insert_Input;
}>;


export type InsertContributionCommentMutation = { __typename?: 'mutation_root', insert_contribution_comments_one?: { __typename?: 'contribution_comments', id: string } | null };

export type GetPopularContributionsQueryVariables = Exact<{
  slug: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPopularContributionsQuery = { __typename?: 'query_root', contributions: Array<{ __typename?: 'contributions', id: string, title: string, year?: number | null, poster_url?: string | null, source_url?: string | null, created_at: string, submitted_by: string, user: { __typename?: 'users', id: string, displayName: string, avatarUrl: string }, likes_list: Array<{ __typename?: 'contribution_likes', user_id: string }> }> };

export type GetRecentContributionsQueryVariables = Exact<{
  slug: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetRecentContributionsQuery = { __typename?: 'query_root', contributions: Array<{ __typename?: 'contributions', id: string, title: string, year?: number | null, poster_url?: string | null, source_url?: string | null, created_at: string, submitted_by: string, user: { __typename?: 'users', id: string, displayName: string, avatarUrl: string }, likes_list: Array<{ __typename?: 'contribution_likes', user_id: string }> }> };

export type InsertContributionMovieMutationVariables = Exact<{
  slug: Scalars['String']['input'];
  title: Scalars['String']['input'];
  year?: InputMaybe<Scalars['Int']['input']>;
  posterUrl?: InputMaybe<Scalars['String']['input']>;
  sourceUrl?: InputMaybe<Scalars['String']['input']>;
  externalId?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
}>;


export type InsertContributionMovieMutation = { __typename?: 'mutation_root', insert_contributions_one?: { __typename?: 'contributions', id: string, title: string, year?: number | null, poster_url?: string | null, source_url?: string | null, created_at: string, submitted_by: string, user: { __typename?: 'users', id: string, displayName: string, avatarUrl: string } } | null };

export type LikeContributionMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type LikeContributionMutation = { __typename?: 'mutation_root', insert_contribution_likes_one?: { __typename?: 'contribution_likes', contribution_id: string, user_id: string } | null };

export type UnlikeContributionMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  userId: Scalars['uuid']['input'];
}>;


export type UnlikeContributionMutation = { __typename?: 'mutation_root', delete_contribution_likes_by_pk?: { __typename?: 'contribution_likes', contribution_id: string, user_id: string } | null };

export type GetUserProfileQueryVariables = Exact<{
  userId: Scalars['uuid']['input'];
}>;


export type GetUserProfileQuery = { __typename?: 'query_root', user_profiles: Array<{ __typename?: 'user_profiles', user_id: string, bio?: string | null, location?: string | null, website?: string | null, created_at: string, updated_at: string }> };

export type UpsertUserProfileMutationVariables = Exact<{
  userId: Scalars['uuid']['input'];
  updates: User_Profiles_Set_Input;
}>;


export type UpsertUserProfileMutation = { __typename?: 'mutation_root', update_user_profiles?: { __typename?: 'user_profiles_mutation_response', affected_rows: number, returning: Array<{ __typename?: 'user_profiles', user_id: string, bio?: string | null, location?: string | null, website?: string | null, created_at: string, updated_at: string }> } | null };

export type InsertUserProfileMutationVariables = Exact<{
  object: User_Profiles_Insert_Input;
}>;


export type InsertUserProfileMutation = { __typename?: 'mutation_root', insert_user_profiles_one?: { __typename?: 'user_profiles', user_id: string, bio?: string | null, location?: string | null, website?: string | null, created_at: string, updated_at: string } | null };

export type UpdateDisplayNameMutationVariables = Exact<{
  userId: Scalars['uuid']['input'];
  displayName: Scalars['String']['input'];
}>;


export type UpdateDisplayNameMutation = { __typename?: 'mutation_root', updateUser?: { __typename?: 'users', id: string, displayName: string, avatarUrl: string } | null };

export type GetUserBasicQueryVariables = Exact<{
  userId: Scalars['uuid']['input'];
}>;


export type GetUserBasicQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', id: string, displayName: string, avatarUrl: string }> };

export type GetProfileStatsQueryVariables = Exact<{
  userId: Scalars['uuid']['input'];
}>;


export type GetProfileStatsQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', id: string, posts_aggregate: { __typename?: 'posts_aggregate', aggregate?: { __typename?: 'posts_aggregate_fields', count: number } | null }, blog_comments_aggregate: { __typename?: 'blog_comments_aggregate', aggregate?: { __typename?: 'blog_comments_aggregate_fields', count: number } | null }, post_comments_aggregate: { __typename?: 'post_comments_aggregate', aggregate?: { __typename?: 'post_comments_aggregate_fields', count: number } | null }, comment_likes_aggregate: { __typename?: 'comment_likes_aggregate', aggregate?: { __typename?: 'comment_likes_aggregate_fields', count: number } | null }, post_likes_aggregate: { __typename?: 'post_likes_aggregate', aggregate?: { __typename?: 'post_likes_aggregate_fields', count: number } | null }, contribution_likes_aggregate: { __typename?: 'contribution_likes_aggregate', aggregate?: { __typename?: 'contribution_likes_aggregate_fields', count: number } | null }, contributions_aggregate: { __typename?: 'contributions_aggregate', aggregate?: { __typename?: 'contributions_aggregate_fields', count: number } | null }, messages_sent_aggregate: { __typename?: 'messages_aggregate', aggregate?: { __typename?: 'messages_aggregate_fields', count: number } | null }, messages_received_aggregate: { __typename?: 'messages_aggregate', aggregate?: { __typename?: 'messages_aggregate_fields', count: number } | null } }> };

export type GetUserRecentActivityQueryVariables = Exact<{
  userId: Scalars['uuid']['input'];
  limit?: Scalars['Int']['input'];
}>;


export type GetUserRecentActivityQuery = { __typename?: 'query_root', posts: Array<{ __typename?: 'posts', id: string, created_at: string, content: string }>, post_comments: Array<{ __typename?: 'post_comments', id: string, created_at: string, content: string, post_id: string }>, blog_comments: Array<{ __typename?: 'blog_comments', id: string, created_at: string, body: string, blog_slug: string }> };

export type GetPostsByUserQueryVariables = Exact<{
  userId: Scalars['uuid']['input'];
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
}>;


export type GetPostsByUserQuery = { __typename?: 'query_root', posts: Array<{ __typename?: 'posts', id: string, created_at: string, content: string }> };

export type GetPostCommentsByUserQueryVariables = Exact<{
  userId: Scalars['uuid']['input'];
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
}>;


export type GetPostCommentsByUserQuery = { __typename?: 'query_root', post_comments: Array<{ __typename?: 'post_comments', id: string, created_at: string, content: string, post_id: string }> };

export type GetBlogCommentsByUserQueryVariables = Exact<{
  userId: Scalars['uuid']['input'];
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
}>;


export type GetBlogCommentsByUserQuery = { __typename?: 'query_root', blog_comments: Array<{ __typename?: 'blog_comments', id: string, created_at: string, body: string, blog_slug: string }> };

export type GetMessagesInboxQueryVariables = Exact<{
  userId: Scalars['uuid']['input'];
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
}>;


export type GetMessagesInboxQuery = { __typename?: 'query_root', messages: Array<{ __typename?: 'messages', id: number, created_at: string, body: string, sender_id: string, recipient_id: string }> };

export type GetMessagesSentQueryVariables = Exact<{
  userId: Scalars['uuid']['input'];
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
}>;


export type GetMessagesSentQuery = { __typename?: 'query_root', messages: Array<{ __typename?: 'messages', id: number, created_at: string, body: string, sender_id: string, recipient_id: string }> };

export type GetRecentMessagesQueryVariables = Exact<{
  userId: Scalars['uuid']['input'];
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
}>;


export type GetRecentMessagesQuery = { __typename?: 'query_root', messages: Array<{ __typename?: 'messages', id: number, created_at: string, body: string, sender_id: string, recipient_id: string, sender: { __typename?: 'users', id: string, displayName: string, avatarUrl: string }, receiver: { __typename?: 'users', id: string, displayName: string, avatarUrl: string } }> };

export type GetMessagesThreadQueryVariables = Exact<{
  userId: Scalars['uuid']['input'];
  otherId: Scalars['uuid']['input'];
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
}>;


export type GetMessagesThreadQuery = { __typename?: 'query_root', messages: Array<{ __typename?: 'messages', id: number, created_at: string, body: string, sender_id: string, recipient_id: string, sender: { __typename?: 'users', id: string, displayName: string, avatarUrl: string }, receiver: { __typename?: 'users', id: string, displayName: string, avatarUrl: string } }> };

export type InsertMessageMutationVariables = Exact<{
  body: Scalars['String']['input'];
  recipient_id: Scalars['uuid']['input'];
}>;


export type InsertMessageMutation = { __typename?: 'mutation_root', insert_messages_one?: { __typename?: 'messages', id: number, created_at: string } | null };

export type GetLikedCommentsByUserQueryVariables = Exact<{
  userId: Scalars['uuid']['input'];
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
}>;


export type GetLikedCommentsByUserQuery = { __typename?: 'query_root', comment_likes: Array<{ __typename?: 'comment_likes', comment_id: string, created_at: string }> };

export type GetBookmarksByUserQueryVariables = Exact<{
  userId: Scalars['uuid']['input'];
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
}>;


export type GetBookmarksByUserQuery = { __typename?: 'query_root', post_bookmarks: Array<{ __typename?: 'post_bookmarks', post_id: string, created_at: string }> };

export type GetMessageThreadQueryVariables = Exact<{
  userId: Scalars['uuid']['input'];
  otherUserId: Scalars['uuid']['input'];
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
}>;


export type GetMessageThreadQuery = { __typename?: 'query_root', messages: Array<{ __typename?: 'messages', id: number, created_at: string, body: string, sender_id: string, recipient_id: string, sender: { __typename?: 'users', id: string, displayName: string, avatarUrl: string }, receiver: { __typename?: 'users', id: string, displayName: string, avatarUrl: string } }> };

export type SendMessageMutationVariables = Exact<{
  senderId: Scalars['uuid']['input'];
  recipientId: Scalars['uuid']['input'];
  body: Scalars['String']['input'];
}>;


export type SendMessageMutation = { __typename?: 'mutation_root', insert_messages_one?: { __typename?: 'messages', id: number } | null };

export type GetMessagesForUserQueryVariables = Exact<{
  userId: Scalars['uuid']['input'];
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
}>;


export type GetMessagesForUserQuery = { __typename?: 'query_root', messages: Array<{ __typename?: 'messages', id: number, created_at: string, body: string, sender: { __typename?: 'users', id: string, displayName: string, avatarUrl: string }, receiver: { __typename?: 'users', id: string, displayName: string, avatarUrl: string } }> };



export const GetLatestPostsDocument = `
    query GetLatestPosts($limit: Int! = 10, $offset: Int! = 0) {
  posts(order_by: {created_at: desc}, limit: $limit, offset: $offset) {
    id
    content
    created_at
    user_id
  }
}
    `;

export const useGetLatestPostsQuery = <
      TData = GetLatestPostsQuery,
      TError = unknown
    >(
      variables?: GetLatestPostsQueryVariables,
      options?: Omit<UseQueryOptions<GetLatestPostsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetLatestPostsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetLatestPostsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetLatestPosts'] : ['GetLatestPosts', variables],
    queryFn: useAuthenticatedFetcher<GetLatestPostsQuery, GetLatestPostsQueryVariables>(GetLatestPostsDocument).bind(null, variables),
    ...options
  }
    )};

useGetLatestPostsQuery.getKey = (variables?: GetLatestPostsQueryVariables) => variables === undefined ? ['GetLatestPosts'] : ['GetLatestPosts', variables];

export const GetContributionsByBlogDocument = `
    query GetContributionsByBlog($slug: String!) {
  contributions(where: {blog_slug: {_eq: $slug}}, order_by: {created_at: desc}) {
    id
    slug: external_id
    title
    year
    note
    likeCount: contribution_likes_aggregate {
      aggregate {
        count
      }
    }
    created_at
    submitted_by
  }
}
    `;

export const useGetContributionsByBlogQuery = <
      TData = GetContributionsByBlogQuery,
      TError = unknown
    >(
      variables: GetContributionsByBlogQueryVariables,
      options?: Omit<UseQueryOptions<GetContributionsByBlogQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetContributionsByBlogQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetContributionsByBlogQuery, TError, TData>(
      {
    queryKey: ['GetContributionsByBlog', variables],
    queryFn: useAuthenticatedFetcher<GetContributionsByBlogQuery, GetContributionsByBlogQueryVariables>(GetContributionsByBlogDocument).bind(null, variables),
    ...options
  }
    )};

useGetContributionsByBlogQuery.getKey = (variables: GetContributionsByBlogQueryVariables) => ['GetContributionsByBlog', variables];

export const InsertPostDocument = `
    mutation InsertPost($object: posts_insert_input!) {
  insert_posts_one(object: $object) {
    id
    content
    created_at
    user_id
  }
}
    `;

export const useInsertPostMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<InsertPostMutation, TError, InsertPostMutationVariables, TContext>) => {
    
    return useMutation<InsertPostMutation, TError, InsertPostMutationVariables, TContext>(
      {
    mutationKey: ['InsertPost'],
    mutationFn: useAuthenticatedFetcher<InsertPostMutation, InsertPostMutationVariables>(InsertPostDocument),
    ...options
  }
    )};

export const GetCommentsBySlugDocument = `
    query GetCommentsBySlug($slug: String!, $limit: Int! = 5, $offset: Int! = 0) {
  blog_comments_aggregate(where: {blog_slug: {_eq: $slug}}) {
    aggregate {
      count
    }
  }
  blog_comments(
    where: {blog_slug: {_eq: $slug}}
    order_by: {created_at: desc}
    limit: $limit
    offset: $offset
  ) {
    id
    body
    blog_slug
    created_at
    parent_id
    user {
      id
      displayName
      avatarUrl
    }
  }
}
    `;

export const useGetCommentsBySlugQuery = <
      TData = GetCommentsBySlugQuery,
      TError = unknown
    >(
      variables: GetCommentsBySlugQueryVariables,
      options?: Omit<UseQueryOptions<GetCommentsBySlugQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetCommentsBySlugQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetCommentsBySlugQuery, TError, TData>(
      {
    queryKey: ['GetCommentsBySlug', variables],
    queryFn: useAuthenticatedFetcher<GetCommentsBySlugQuery, GetCommentsBySlugQueryVariables>(GetCommentsBySlugDocument).bind(null, variables),
    ...options
  }
    )};

useGetCommentsBySlugQuery.getKey = (variables: GetCommentsBySlugQueryVariables) => ['GetCommentsBySlug', variables];

export const InsertBlogCommentDocument = `
    mutation InsertBlogComment($object: blog_comments_insert_input!) {
  insert_blog_comments_one(object: $object) {
    id
  }
}
    `;

export const useInsertBlogCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<InsertBlogCommentMutation, TError, InsertBlogCommentMutationVariables, TContext>) => {
    
    return useMutation<InsertBlogCommentMutation, TError, InsertBlogCommentMutationVariables, TContext>(
      {
    mutationKey: ['InsertBlogComment'],
    mutationFn: useAuthenticatedFetcher<InsertBlogCommentMutation, InsertBlogCommentMutationVariables>(InsertBlogCommentDocument),
    ...options
  }
    )};

export const GetContributionCommentsDocument = `
    query GetContributionComments($contribution_id: uuid!, $limit: Int! = 5, $offset: Int! = 0) {
  contribution_comments_aggregate(
    where: {contribution_id: {_eq: $contribution_id}}
  ) {
    aggregate {
      count
    }
  }
  contribution_comments(
    where: {contribution_id: {_eq: $contribution_id}}
    order_by: {created_at: desc}
    limit: $limit
    offset: $offset
  ) {
    id
    body
    created_at
    user {
      id
      displayName
      avatarUrl
    }
  }
}
    `;

export const useGetContributionCommentsQuery = <
      TData = GetContributionCommentsQuery,
      TError = unknown
    >(
      variables: GetContributionCommentsQueryVariables,
      options?: Omit<UseQueryOptions<GetContributionCommentsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetContributionCommentsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetContributionCommentsQuery, TError, TData>(
      {
    queryKey: ['GetContributionComments', variables],
    queryFn: useAuthenticatedFetcher<GetContributionCommentsQuery, GetContributionCommentsQueryVariables>(GetContributionCommentsDocument).bind(null, variables),
    ...options
  }
    )};

useGetContributionCommentsQuery.getKey = (variables: GetContributionCommentsQueryVariables) => ['GetContributionComments', variables];

export const InsertContributionCommentDocument = `
    mutation InsertContributionComment($object: contribution_comments_insert_input!) {
  insert_contribution_comments_one(object: $object) {
    id
  }
}
    `;

export const useInsertContributionCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<InsertContributionCommentMutation, TError, InsertContributionCommentMutationVariables, TContext>) => {
    
    return useMutation<InsertContributionCommentMutation, TError, InsertContributionCommentMutationVariables, TContext>(
      {
    mutationKey: ['InsertContributionComment'],
    mutationFn: useAuthenticatedFetcher<InsertContributionCommentMutation, InsertContributionCommentMutationVariables>(InsertContributionCommentDocument),
    ...options
  }
    )};

export const GetPopularContributionsDocument = `
    query GetPopularContributions($slug: String!, $limit: Int = 6, $offset: Int = 0) {
  contributions(
    where: {blog_slug: {_eq: $slug}, status: {_neq: "hidden"}}
    order_by: [{created_at: desc}]
    limit: $limit
    offset: $offset
  ) {
    id
    title
    year
    poster_url
    source_url
    created_at
    submitted_by
    user: user {
      id
      displayName
      avatarUrl
    }
    likes_list: contribution_likes {
      user_id
    }
  }
}
    `;

export const useGetPopularContributionsQuery = <
      TData = GetPopularContributionsQuery,
      TError = unknown
    >(
      variables: GetPopularContributionsQueryVariables,
      options?: Omit<UseQueryOptions<GetPopularContributionsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetPopularContributionsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetPopularContributionsQuery, TError, TData>(
      {
    queryKey: ['GetPopularContributions', variables],
    queryFn: useAuthenticatedFetcher<GetPopularContributionsQuery, GetPopularContributionsQueryVariables>(GetPopularContributionsDocument).bind(null, variables),
    ...options
  }
    )};

useGetPopularContributionsQuery.getKey = (variables: GetPopularContributionsQueryVariables) => ['GetPopularContributions', variables];

export const GetRecentContributionsDocument = `
    query GetRecentContributions($slug: String!, $limit: Int = 6, $offset: Int = 0) {
  contributions(
    where: {blog_slug: {_eq: $slug}, status: {_neq: "hidden"}}
    order_by: [{created_at: desc}]
    limit: $limit
    offset: $offset
  ) {
    id
    title
    year
    poster_url
    source_url
    created_at
    submitted_by
    user: user {
      id
      displayName
      avatarUrl
    }
    likes_list: contribution_likes {
      user_id
    }
  }
}
    `;

export const useGetRecentContributionsQuery = <
      TData = GetRecentContributionsQuery,
      TError = unknown
    >(
      variables: GetRecentContributionsQueryVariables,
      options?: Omit<UseQueryOptions<GetRecentContributionsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetRecentContributionsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetRecentContributionsQuery, TError, TData>(
      {
    queryKey: ['GetRecentContributions', variables],
    queryFn: useAuthenticatedFetcher<GetRecentContributionsQuery, GetRecentContributionsQueryVariables>(GetRecentContributionsDocument).bind(null, variables),
    ...options
  }
    )};

useGetRecentContributionsQuery.getKey = (variables: GetRecentContributionsQueryVariables) => ['GetRecentContributions', variables];

export const InsertContributionMovieDocument = `
    mutation InsertContributionMovie($slug: String!, $title: String!, $year: Int, $posterUrl: String, $sourceUrl: String, $externalId: String, $note: String) {
  insert_contributions_one(
    object: {blog_slug: $slug, type: film, title: $title, year: $year, poster_url: $posterUrl, source_url: $sourceUrl, external_id: $externalId, note: $note}
  ) {
    id
    title
    year
    poster_url
    source_url
    created_at
    submitted_by
    user {
      id
      displayName
      avatarUrl
    }
  }
}
    `;

export const useInsertContributionMovieMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<InsertContributionMovieMutation, TError, InsertContributionMovieMutationVariables, TContext>) => {
    
    return useMutation<InsertContributionMovieMutation, TError, InsertContributionMovieMutationVariables, TContext>(
      {
    mutationKey: ['InsertContributionMovie'],
    mutationFn: useAuthenticatedFetcher<InsertContributionMovieMutation, InsertContributionMovieMutationVariables>(InsertContributionMovieDocument),
    ...options
  }
    )};

export const LikeContributionDocument = `
    mutation LikeContribution($id: uuid!) {
  insert_contribution_likes_one(object: {contribution_id: $id}) {
    contribution_id
    user_id
  }
}
    `;

export const useLikeContributionMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<LikeContributionMutation, TError, LikeContributionMutationVariables, TContext>) => {
    
    return useMutation<LikeContributionMutation, TError, LikeContributionMutationVariables, TContext>(
      {
    mutationKey: ['LikeContribution'],
    mutationFn: useAuthenticatedFetcher<LikeContributionMutation, LikeContributionMutationVariables>(LikeContributionDocument),
    ...options
  }
    )};

export const UnlikeContributionDocument = `
    mutation UnlikeContribution($id: uuid!, $userId: uuid!) {
  delete_contribution_likes_by_pk(contribution_id: $id, user_id: $userId) {
    contribution_id
    user_id
  }
}
    `;

export const useUnlikeContributionMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UnlikeContributionMutation, TError, UnlikeContributionMutationVariables, TContext>) => {
    
    return useMutation<UnlikeContributionMutation, TError, UnlikeContributionMutationVariables, TContext>(
      {
    mutationKey: ['UnlikeContribution'],
    mutationFn: useAuthenticatedFetcher<UnlikeContributionMutation, UnlikeContributionMutationVariables>(UnlikeContributionDocument),
    ...options
  }
    )};

export const GetUserProfileDocument = `
    query GetUserProfile($userId: uuid!) {
  user_profiles(where: {user_id: {_eq: $userId}}) {
    user_id
    bio
    location
    website
    created_at
    updated_at
  }
}
    `;

export const useGetUserProfileQuery = <
      TData = GetUserProfileQuery,
      TError = unknown
    >(
      variables: GetUserProfileQueryVariables,
      options?: Omit<UseQueryOptions<GetUserProfileQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetUserProfileQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetUserProfileQuery, TError, TData>(
      {
    queryKey: ['GetUserProfile', variables],
    queryFn: useAuthenticatedFetcher<GetUserProfileQuery, GetUserProfileQueryVariables>(GetUserProfileDocument).bind(null, variables),
    ...options
  }
    )};

useGetUserProfileQuery.getKey = (variables: GetUserProfileQueryVariables) => ['GetUserProfile', variables];

export const UpsertUserProfileDocument = `
    mutation UpsertUserProfile($userId: uuid!, $updates: user_profiles_set_input!) {
  update_user_profiles(where: {user_id: {_eq: $userId}}, _set: $updates) {
    affected_rows
    returning {
      user_id
      bio
      location
      website
      created_at
      updated_at
    }
  }
}
    `;

export const useUpsertUserProfileMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpsertUserProfileMutation, TError, UpsertUserProfileMutationVariables, TContext>) => {
    
    return useMutation<UpsertUserProfileMutation, TError, UpsertUserProfileMutationVariables, TContext>(
      {
    mutationKey: ['UpsertUserProfile'],
    mutationFn: useAuthenticatedFetcher<UpsertUserProfileMutation, UpsertUserProfileMutationVariables>(UpsertUserProfileDocument),
    ...options
  }
    )};

export const InsertUserProfileDocument = `
    mutation InsertUserProfile($object: user_profiles_insert_input!) {
  insert_user_profiles_one(object: $object) {
    user_id
    bio
    location
    website
    created_at
    updated_at
  }
}
    `;

export const useInsertUserProfileMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<InsertUserProfileMutation, TError, InsertUserProfileMutationVariables, TContext>) => {
    
    return useMutation<InsertUserProfileMutation, TError, InsertUserProfileMutationVariables, TContext>(
      {
    mutationKey: ['InsertUserProfile'],
    mutationFn: useAuthenticatedFetcher<InsertUserProfileMutation, InsertUserProfileMutationVariables>(InsertUserProfileDocument),
    ...options
  }
    )};

export const UpdateDisplayNameDocument = `
    mutation UpdateDisplayName($userId: uuid!, $displayName: String!) {
  updateUser(pk_columns: {id: $userId}, _set: {displayName: $displayName}) {
    id
    displayName
    avatarUrl
  }
}
    `;

export const useUpdateDisplayNameMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateDisplayNameMutation, TError, UpdateDisplayNameMutationVariables, TContext>) => {
    
    return useMutation<UpdateDisplayNameMutation, TError, UpdateDisplayNameMutationVariables, TContext>(
      {
    mutationKey: ['UpdateDisplayName'],
    mutationFn: useAuthenticatedFetcher<UpdateDisplayNameMutation, UpdateDisplayNameMutationVariables>(UpdateDisplayNameDocument),
    ...options
  }
    )};

export const GetUserBasicDocument = `
    query GetUserBasic($userId: uuid!) {
  users(where: {id: {_eq: $userId}}) {
    id
    displayName
    avatarUrl
  }
}
    `;

export const useGetUserBasicQuery = <
      TData = GetUserBasicQuery,
      TError = unknown
    >(
      variables: GetUserBasicQueryVariables,
      options?: Omit<UseQueryOptions<GetUserBasicQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetUserBasicQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetUserBasicQuery, TError, TData>(
      {
    queryKey: ['GetUserBasic', variables],
    queryFn: useAuthenticatedFetcher<GetUserBasicQuery, GetUserBasicQueryVariables>(GetUserBasicDocument).bind(null, variables),
    ...options
  }
    )};

useGetUserBasicQuery.getKey = (variables: GetUserBasicQueryVariables) => ['GetUserBasic', variables];

export const GetProfileStatsDocument = `
    query GetProfileStats($userId: uuid!) {
  users(where: {id: {_eq: $userId}}) {
    id
    posts_aggregate {
      aggregate {
        count
      }
    }
    blog_comments_aggregate {
      aggregate {
        count
      }
    }
    post_comments_aggregate {
      aggregate {
        count
      }
    }
    comment_likes_aggregate {
      aggregate {
        count
      }
    }
    post_likes_aggregate {
      aggregate {
        count
      }
    }
    contribution_likes_aggregate {
      aggregate {
        count
      }
    }
    contributions_aggregate {
      aggregate {
        count
      }
    }
    messages_sent_aggregate {
      aggregate {
        count
      }
    }
    messages_received_aggregate {
      aggregate {
        count
      }
    }
  }
}
    `;

export const useGetProfileStatsQuery = <
      TData = GetProfileStatsQuery,
      TError = unknown
    >(
      variables: GetProfileStatsQueryVariables,
      options?: Omit<UseQueryOptions<GetProfileStatsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetProfileStatsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetProfileStatsQuery, TError, TData>(
      {
    queryKey: ['GetProfileStats', variables],
    queryFn: useAuthenticatedFetcher<GetProfileStatsQuery, GetProfileStatsQueryVariables>(GetProfileStatsDocument).bind(null, variables),
    ...options
  }
    )};

useGetProfileStatsQuery.getKey = (variables: GetProfileStatsQueryVariables) => ['GetProfileStats', variables];

export const GetUserRecentActivityDocument = `
    query GetUserRecentActivity($userId: uuid!, $limit: Int! = 5) {
  posts(
    where: {user_id: {_eq: $userId}}
    order_by: {created_at: desc}
    limit: $limit
  ) {
    id
    created_at
    content
  }
  post_comments(
    where: {user_id: {_eq: $userId}}
    order_by: {created_at: desc}
    limit: $limit
  ) {
    id
    created_at
    content
    post_id
  }
  blog_comments(
    where: {user_id: {_eq: $userId}}
    order_by: {created_at: desc}
    limit: $limit
  ) {
    id
    created_at
    body
    blog_slug
  }
}
    `;

export const useGetUserRecentActivityQuery = <
      TData = GetUserRecentActivityQuery,
      TError = unknown
    >(
      variables: GetUserRecentActivityQueryVariables,
      options?: Omit<UseQueryOptions<GetUserRecentActivityQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetUserRecentActivityQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetUserRecentActivityQuery, TError, TData>(
      {
    queryKey: ['GetUserRecentActivity', variables],
    queryFn: useAuthenticatedFetcher<GetUserRecentActivityQuery, GetUserRecentActivityQueryVariables>(GetUserRecentActivityDocument).bind(null, variables),
    ...options
  }
    )};

useGetUserRecentActivityQuery.getKey = (variables: GetUserRecentActivityQueryVariables) => ['GetUserRecentActivity', variables];

export const GetPostsByUserDocument = `
    query GetPostsByUser($userId: uuid!, $limit: Int! = 10, $offset: Int! = 0) {
  posts(
    where: {user_id: {_eq: $userId}}
    order_by: {created_at: desc}
    limit: $limit
    offset: $offset
  ) {
    id
    created_at
    content
  }
}
    `;

export const useGetPostsByUserQuery = <
      TData = GetPostsByUserQuery,
      TError = unknown
    >(
      variables: GetPostsByUserQueryVariables,
      options?: Omit<UseQueryOptions<GetPostsByUserQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetPostsByUserQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetPostsByUserQuery, TError, TData>(
      {
    queryKey: ['GetPostsByUser', variables],
    queryFn: useAuthenticatedFetcher<GetPostsByUserQuery, GetPostsByUserQueryVariables>(GetPostsByUserDocument).bind(null, variables),
    ...options
  }
    )};

useGetPostsByUserQuery.getKey = (variables: GetPostsByUserQueryVariables) => ['GetPostsByUser', variables];

export const GetPostCommentsByUserDocument = `
    query GetPostCommentsByUser($userId: uuid!, $limit: Int! = 10, $offset: Int! = 0) {
  post_comments(
    where: {user_id: {_eq: $userId}}
    order_by: {created_at: desc}
    limit: $limit
    offset: $offset
  ) {
    id
    created_at
    content
    post_id
  }
}
    `;

export const useGetPostCommentsByUserQuery = <
      TData = GetPostCommentsByUserQuery,
      TError = unknown
    >(
      variables: GetPostCommentsByUserQueryVariables,
      options?: Omit<UseQueryOptions<GetPostCommentsByUserQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetPostCommentsByUserQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetPostCommentsByUserQuery, TError, TData>(
      {
    queryKey: ['GetPostCommentsByUser', variables],
    queryFn: useAuthenticatedFetcher<GetPostCommentsByUserQuery, GetPostCommentsByUserQueryVariables>(GetPostCommentsByUserDocument).bind(null, variables),
    ...options
  }
    )};

useGetPostCommentsByUserQuery.getKey = (variables: GetPostCommentsByUserQueryVariables) => ['GetPostCommentsByUser', variables];

export const GetBlogCommentsByUserDocument = `
    query GetBlogCommentsByUser($userId: uuid!, $limit: Int! = 10, $offset: Int! = 0) {
  blog_comments(
    where: {user_id: {_eq: $userId}}
    order_by: {created_at: desc}
    limit: $limit
    offset: $offset
  ) {
    id
    created_at
    body
    blog_slug
  }
}
    `;

export const useGetBlogCommentsByUserQuery = <
      TData = GetBlogCommentsByUserQuery,
      TError = unknown
    >(
      variables: GetBlogCommentsByUserQueryVariables,
      options?: Omit<UseQueryOptions<GetBlogCommentsByUserQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetBlogCommentsByUserQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetBlogCommentsByUserQuery, TError, TData>(
      {
    queryKey: ['GetBlogCommentsByUser', variables],
    queryFn: useAuthenticatedFetcher<GetBlogCommentsByUserQuery, GetBlogCommentsByUserQueryVariables>(GetBlogCommentsByUserDocument).bind(null, variables),
    ...options
  }
    )};

useGetBlogCommentsByUserQuery.getKey = (variables: GetBlogCommentsByUserQueryVariables) => ['GetBlogCommentsByUser', variables];

export const GetMessagesInboxDocument = `
    query GetMessagesInbox($userId: uuid!, $limit: Int! = 10, $offset: Int! = 0) {
  messages(
    where: {recipient_id: {_eq: $userId}}
    order_by: {created_at: desc}
    limit: $limit
    offset: $offset
  ) {
    id
    created_at
    body
    sender_id
    recipient_id
  }
}
    `;

export const useGetMessagesInboxQuery = <
      TData = GetMessagesInboxQuery,
      TError = unknown
    >(
      variables: GetMessagesInboxQueryVariables,
      options?: Omit<UseQueryOptions<GetMessagesInboxQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetMessagesInboxQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetMessagesInboxQuery, TError, TData>(
      {
    queryKey: ['GetMessagesInbox', variables],
    queryFn: useAuthenticatedFetcher<GetMessagesInboxQuery, GetMessagesInboxQueryVariables>(GetMessagesInboxDocument).bind(null, variables),
    ...options
  }
    )};

useGetMessagesInboxQuery.getKey = (variables: GetMessagesInboxQueryVariables) => ['GetMessagesInbox', variables];

export const GetMessagesSentDocument = `
    query GetMessagesSent($userId: uuid!, $limit: Int! = 10, $offset: Int! = 0) {
  messages(
    where: {sender_id: {_eq: $userId}}
    order_by: {created_at: desc}
    limit: $limit
    offset: $offset
  ) {
    id
    created_at
    body
    sender_id
    recipient_id
  }
}
    `;

export const useGetMessagesSentQuery = <
      TData = GetMessagesSentQuery,
      TError = unknown
    >(
      variables: GetMessagesSentQueryVariables,
      options?: Omit<UseQueryOptions<GetMessagesSentQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetMessagesSentQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetMessagesSentQuery, TError, TData>(
      {
    queryKey: ['GetMessagesSent', variables],
    queryFn: useAuthenticatedFetcher<GetMessagesSentQuery, GetMessagesSentQueryVariables>(GetMessagesSentDocument).bind(null, variables),
    ...options
  }
    )};

useGetMessagesSentQuery.getKey = (variables: GetMessagesSentQueryVariables) => ['GetMessagesSent', variables];

export const GetRecentMessagesDocument = `
    query GetRecentMessages($userId: uuid!, $limit: Int! = 50, $offset: Int! = 0) {
  messages(
    where: {_or: [{sender_id: {_eq: $userId}}, {recipient_id: {_eq: $userId}}]}
    order_by: {created_at: desc}
    limit: $limit
    offset: $offset
  ) {
    id
    created_at
    body
    sender_id
    recipient_id
    sender {
      id
      displayName
      avatarUrl
    }
    receiver {
      id
      displayName
      avatarUrl
    }
  }
}
    `;

export const useGetRecentMessagesQuery = <
      TData = GetRecentMessagesQuery,
      TError = unknown
    >(
      variables: GetRecentMessagesQueryVariables,
      options?: Omit<UseQueryOptions<GetRecentMessagesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetRecentMessagesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetRecentMessagesQuery, TError, TData>(
      {
    queryKey: ['GetRecentMessages', variables],
    queryFn: useAuthenticatedFetcher<GetRecentMessagesQuery, GetRecentMessagesQueryVariables>(GetRecentMessagesDocument).bind(null, variables),
    ...options
  }
    )};

useGetRecentMessagesQuery.getKey = (variables: GetRecentMessagesQueryVariables) => ['GetRecentMessages', variables];

export const GetMessagesThreadDocument = `
    query GetMessagesThread($userId: uuid!, $otherId: uuid!, $limit: Int! = 50, $offset: Int! = 0) {
  messages(
    where: {_or: [{sender_id: {_eq: $userId}, recipient_id: {_eq: $otherId}}, {sender_id: {_eq: $otherId}, recipient_id: {_eq: $userId}}]}
    order_by: {created_at: asc}
    limit: $limit
    offset: $offset
  ) {
    id
    created_at
    body
    sender_id
    recipient_id
    sender {
      id
      displayName
      avatarUrl
    }
    receiver {
      id
      displayName
      avatarUrl
    }
  }
}
    `;

export const useGetMessagesThreadQuery = <
      TData = GetMessagesThreadQuery,
      TError = unknown
    >(
      variables: GetMessagesThreadQueryVariables,
      options?: Omit<UseQueryOptions<GetMessagesThreadQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetMessagesThreadQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetMessagesThreadQuery, TError, TData>(
      {
    queryKey: ['GetMessagesThread', variables],
    queryFn: useAuthenticatedFetcher<GetMessagesThreadQuery, GetMessagesThreadQueryVariables>(GetMessagesThreadDocument).bind(null, variables),
    ...options
  }
    )};

useGetMessagesThreadQuery.getKey = (variables: GetMessagesThreadQueryVariables) => ['GetMessagesThread', variables];

export const InsertMessageDocument = `
    mutation InsertMessage($body: String!, $recipient_id: uuid!) {
  insert_messages_one(object: {body: $body, recipient_id: $recipient_id}) {
    id
    created_at
  }
}
    `;

export const useInsertMessageMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<InsertMessageMutation, TError, InsertMessageMutationVariables, TContext>) => {
    
    return useMutation<InsertMessageMutation, TError, InsertMessageMutationVariables, TContext>(
      {
    mutationKey: ['InsertMessage'],
    mutationFn: useAuthenticatedFetcher<InsertMessageMutation, InsertMessageMutationVariables>(InsertMessageDocument),
    ...options
  }
    )};

export const GetLikedCommentsByUserDocument = `
    query GetLikedCommentsByUser($userId: uuid!, $limit: Int! = 10, $offset: Int! = 0) {
  comment_likes(
    where: {user_id: {_eq: $userId}}
    order_by: {created_at: desc}
    limit: $limit
    offset: $offset
  ) {
    comment_id
    created_at
  }
}
    `;

export const useGetLikedCommentsByUserQuery = <
      TData = GetLikedCommentsByUserQuery,
      TError = unknown
    >(
      variables: GetLikedCommentsByUserQueryVariables,
      options?: Omit<UseQueryOptions<GetLikedCommentsByUserQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetLikedCommentsByUserQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetLikedCommentsByUserQuery, TError, TData>(
      {
    queryKey: ['GetLikedCommentsByUser', variables],
    queryFn: useAuthenticatedFetcher<GetLikedCommentsByUserQuery, GetLikedCommentsByUserQueryVariables>(GetLikedCommentsByUserDocument).bind(null, variables),
    ...options
  }
    )};

useGetLikedCommentsByUserQuery.getKey = (variables: GetLikedCommentsByUserQueryVariables) => ['GetLikedCommentsByUser', variables];

export const GetBookmarksByUserDocument = `
    query GetBookmarksByUser($userId: uuid!, $limit: Int! = 10, $offset: Int! = 0) {
  post_bookmarks(
    where: {user_id: {_eq: $userId}}
    order_by: {created_at: desc}
    limit: $limit
    offset: $offset
  ) {
    post_id
    created_at
  }
}
    `;

export const useGetBookmarksByUserQuery = <
      TData = GetBookmarksByUserQuery,
      TError = unknown
    >(
      variables: GetBookmarksByUserQueryVariables,
      options?: Omit<UseQueryOptions<GetBookmarksByUserQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetBookmarksByUserQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetBookmarksByUserQuery, TError, TData>(
      {
    queryKey: ['GetBookmarksByUser', variables],
    queryFn: useAuthenticatedFetcher<GetBookmarksByUserQuery, GetBookmarksByUserQueryVariables>(GetBookmarksByUserDocument).bind(null, variables),
    ...options
  }
    )};

useGetBookmarksByUserQuery.getKey = (variables: GetBookmarksByUserQueryVariables) => ['GetBookmarksByUser', variables];

export const GetMessageThreadDocument = `
    query GetMessageThread($userId: uuid!, $otherUserId: uuid!, $limit: Int! = 50, $offset: Int! = 0) {
  messages(
    where: {_or: [{_and: [{sender_id: {_eq: $userId}}, {recipient_id: {_eq: $otherUserId}}]}, {_and: [{sender_id: {_eq: $otherUserId}}, {recipient_id: {_eq: $userId}}]}]}
    order_by: {created_at: desc}
    limit: $limit
    offset: $offset
  ) {
    id
    created_at
    body
    sender_id
    recipient_id
    sender {
      id
      displayName
      avatarUrl
    }
    receiver {
      id
      displayName
      avatarUrl
    }
  }
}
    `;

export const useGetMessageThreadQuery = <
      TData = GetMessageThreadQuery,
      TError = unknown
    >(
      variables: GetMessageThreadQueryVariables,
      options?: Omit<UseQueryOptions<GetMessageThreadQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetMessageThreadQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetMessageThreadQuery, TError, TData>(
      {
    queryKey: ['GetMessageThread', variables],
    queryFn: useAuthenticatedFetcher<GetMessageThreadQuery, GetMessageThreadQueryVariables>(GetMessageThreadDocument).bind(null, variables),
    ...options
  }
    )};

useGetMessageThreadQuery.getKey = (variables: GetMessageThreadQueryVariables) => ['GetMessageThread', variables];

export const SendMessageDocument = `
    mutation SendMessage($senderId: uuid!, $recipientId: uuid!, $body: String!) {
  insert_messages_one(
    object: {sender_id: $senderId, recipient_id: $recipientId, body: $body}
  ) {
    id
  }
}
    `;

export const useSendMessageMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SendMessageMutation, TError, SendMessageMutationVariables, TContext>) => {
    
    return useMutation<SendMessageMutation, TError, SendMessageMutationVariables, TContext>(
      {
    mutationKey: ['SendMessage'],
    mutationFn: useAuthenticatedFetcher<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument),
    ...options
  }
    )};

export const GetMessagesForUserDocument = `
    query GetMessagesForUser($userId: uuid!, $limit: Int! = 50, $offset: Int! = 0) {
  messages(
    where: {_or: [{sender_id: {_eq: $userId}}, {recipient_id: {_eq: $userId}}]}
    order_by: {created_at: desc}
    limit: $limit
    offset: $offset
  ) {
    id
    created_at
    body
    sender {
      id
      displayName
      avatarUrl
    }
    receiver {
      id
      displayName
      avatarUrl
    }
  }
}
    `;

export const useGetMessagesForUserQuery = <
      TData = GetMessagesForUserQuery,
      TError = unknown
    >(
      variables: GetMessagesForUserQueryVariables,
      options?: Omit<UseQueryOptions<GetMessagesForUserQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetMessagesForUserQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetMessagesForUserQuery, TError, TData>(
      {
    queryKey: ['GetMessagesForUser', variables],
    queryFn: useAuthenticatedFetcher<GetMessagesForUserQuery, GetMessagesForUserQueryVariables>(GetMessagesForUserDocument).bind(null, variables),
    ...options
  }
    )};

useGetMessagesForUserQuery.getKey = (variables: GetMessagesForUserQueryVariables) => ['GetMessagesForUser', variables];
